import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
import { EnterpriseStore } from './store.mts'
import {
  base32,
  createRecoveryCodes,
  createTotpSecret,
  decryptTotpSecret,
  encryptTotpSecret,
  matchTotp,
  otpauthUri,
  recoveryCodeHash,
} from './totp.mts'
import {
  canDelegateScope,
  scopeFor,
  scopedDecision,
  type ResourceScopes,
  type ResourceScope,
  type ScopedResource,
} from '../../src/platform/auth/model/accessDecision.ts'
import {
  BusinessError,
  fail,
  object,
  text,
  tenantId,
  email,
  password,
  onlyFields,
  permits,
  canDelegate,
  hashPassword,
  verifyPassword,
  tokenHash,
  type User,
  type Role,
  type Principal,
  type Resource,
} from './domain.mts'

const require = createRequire(import.meta.url)
const policies: Record<string, { permission?: string }> = require('../../config/route-policy.json')
const permissionCatalog = new Set([
  ...Object.values(policies).flatMap((policy) => (policy.permission ? [policy.permission] : [])),
  ...['user', 'role'].flatMap((resource) =>
    ['create', 'read', 'update', 'delete'].map((action) => `${resource}:${action}`)
  ),
  'access:read',
  'access:approve',
  'tenant:create',
  'tenant:update',
  'tenant:delete',
])
const reservedRole = 'tenant-admin'
type UserRow = User & { tenant_id: string; principal_id: string; password_hash: string | null }
type RoleRow = Omit<Role, 'permissions'> & { permissions: string }
type AccessKind = 'role' | 'user'
type AccessStatus = 'pending' | 'approved' | 'rejected' | 'stale'
type AccessRequestRow = {
  id: string
  tenant_id: string
  kind: AccessKind
  target_id: string
  actor_id: string
  actor_email: string
  before_json: string
  after_json: string
  affected_json: string
  reason: string
  fingerprint: string
  status: AccessStatus
  reviewer_id: string | null
  decision_reason: string | null
  created_at: string
  decided_at: string | null
}
type TotpRow = {
  principal_id: string
  secret_ciphertext: string
  enabled: number
  pending_expires_at: number | null
  last_used_step: number | null
}
type AffectedUsers = { count: number; digest: string; sample: Pick<User, 'id' | 'name' | 'email'>[] }
type AccessPreview = {
  kind: AccessKind
  targetId: string
  before: Role | User
  after: Role | User
  affected: AffectedUsers
  fingerprint: string
}
const publicUser = ({ id, name, email: address, role, status }: UserRow): User => ({
  id,
  name,
  email: address,
  role,
  status,
})
const publicRole = (row: RoleRow, scopes: ResourceScopes = {}): Role => ({
  ...row,
  permissions: JSON.parse(row.permissions) as string[],
  scopes,
})
const selects = {
  users: 'id,name,email,role,status',
  roles: 'id,name,code,permissions',
  audit: 'id,actor,action,resource,recordId,at',
}
const sorts = {
  users: ['name', 'email', 'status', 'id'],
  roles: ['name', 'code', 'id'],
  audit: ['at', 'actor', 'action', 'resource', 'id'],
}
const searchFields = {
  users: ['name', 'email', 'role'],
  roles: ['name', 'code'],
  audit: ['actor', 'action', 'resource', 'recordId'],
}
const resourcePermission = { users: 'user', roles: 'role', audit: 'audit' }

export class EnterpriseService {
  store: EnterpriseStore
  sessionTtlMs: number
  now: () => number
  totpKey?: Buffer
  constructor(
    store: EnterpriseStore,
    {
      sessionTtlMs = 8 * 60 * 60 * 1000,
      now = Date.now,
      totpKey,
    }: {
      sessionTtlMs?: number
      now?: () => number
      totpKey?: Buffer
    } = {}
  ) {
    if (!Number.isInteger(sessionTtlMs) || sessionTtlMs < 300_000 || sessionTtlMs > 7 * 24 * 60 * 60 * 1000)
      throw new Error('Session TTL must be between 5 minutes and 7 days')
    this.store = store
    this.sessionTtlMs = sessionTtlMs
    this.now = now
    if (totpKey && totpKey.length !== 32) throw new Error('TOTP encryption key must be 32 bytes')
    this.totpKey = totpKey
    const stored = store.one<TotpRow>('SELECT * FROM totp_credentials LIMIT 1')
    if (stored && !totpKey) throw new Error('ENTERPRISE_TOTP_KEY is required for stored authenticators')
    if (stored && totpKey) {
      try {
        decryptTotpSecret(stored.secret_ciphertext, totpKey, stored.principal_id)
      } catch {
        throw new Error('ENTERPRISE_TOTP_KEY cannot decrypt stored authenticators')
      }
    }
  }
  private audit(principal: Pick<Principal, 'tenantId' | 'user'>, action: string, resource: string, id: string) {
    this.store.run(
      'INSERT INTO audit VALUES (?,?,?,?,?,?,?)',
      randomUUID(),
      principal.tenantId,
      principal.user.email,
      action,
      resource,
      id,
      new Date(this.now()).toISOString()
    )
  }
  private parseScopes(value: unknown): ResourceScopes {
    if (value === undefined) return {}
    const input = object(value)
    onlyFields(input, ['user', 'role'])
    const scopes: ResourceScopes = {}
    for (const resource of ['user', 'role'] as const) {
      if (input[resource] === undefined) continue
      const candidate = object(input[resource])
      onlyFields(candidate, ['mode', 'ids'])
      const ids = candidate.ids
      if (!Array.isArray(ids)) return fail(400, 'invalid_scope')
      if (!['global', 'restricted', 'deny'].includes(String(candidate.mode))) return fail(400, 'invalid_scope')
      if (
        ids.length > 200 ||
        !ids.every((id: unknown) => typeof id === 'string' && id.length > 0 && id.length <= 128) ||
        (candidate.mode === 'restricted' && ids.length === 0) ||
        (candidate.mode !== 'restricted' && ids.length !== 0)
      )
        fail(400, 'invalid_scope')
      scopes[resource] = { mode: candidate.mode as ResourceScope['mode'], ids: [...new Set(ids as string[])] }
    }
    return scopes
  }
  private roleScopes(tenant: string, code: string): ResourceScopes {
    const row = this.store.one<{ scopes: string }>(
      'SELECT scopes FROM role_scopes WHERE tenant_id=? AND role_code=?',
      tenant,
      code
    )
    if (!row) return {}
    try {
      return this.parseScopes(JSON.parse(row.scopes))
    } catch {
      return fail(500, 'invalid_stored_scope')
    }
  }
  private publicRole(tenant: string, row: RoleRow): Role {
    return publicRole(row, this.roleScopes(tenant, row.code))
  }
  private saveScopes(tenant: string, code: string, scopes: ResourceScopes) {
    this.store.run(
      `INSERT INTO role_scopes (tenant_id,role_code,scopes) VALUES (?,?,?)
       ON CONFLICT(tenant_id,role_code) DO UPDATE SET scopes=excluded.scopes`,
      tenant,
      code,
      JSON.stringify(scopes)
    )
  }
  private canDelegateRole(actor: Principal, role: Pick<Role, 'permissions' | 'scopes'>): boolean {
    return (
      canDelegate(actor.role.permissions, role.permissions) &&
      (['user', 'role'] as const).every((resource) =>
        canDelegateScope(scopeFor(actor.role.scopes, resource), scopeFor(role.scopes, resource))
      )
    )
  }
  /** Explicit operator provisioning, never automatic startup seeds or public tenant registration. */
  async bootstrap(value: unknown) {
    const input = object(value)
    onlyFields(input, ['tenantId', 'tenantName', 'name', 'email', 'password'])
    const id = tenantId(input.tenantId),
      name = text(input.name, 'name'),
      address = email(input.email)
    const tenantName = text(input.tenantName, 'tenant_name')
    const hash = await hashPassword(password(input.password))
    return this.store.transaction(() => {
      if (this.store.one('SELECT id FROM tenants WHERE id=?', id)) fail(409, 'tenant_exists')
      this.store.run('INSERT INTO tenants VALUES (?,?,?)', id, tenantName, 'active')
      this.store.run('INSERT INTO roles VALUES (?,?,?,?,?)', randomUUID(), id, '租户管理员', reservedRole, '["*:*"]')
      const user: User = { id: randomUUID(), name, email: address, role: reservedRole, status: 'active' }
      const principalId = randomUUID()
      this.store.run(
        'INSERT INTO principals (id,created_at) VALUES (?,?)',
        principalId,
        new Date(this.now()).toISOString()
      )
      this.store.run(
        'INSERT INTO users (id,tenant_id,name,email,role,status,password_hash,principal_id) VALUES (?,?,?,?,?,?,?,?)',
        user.id,
        id,
        name,
        address,
        user.role,
        user.status,
        hash,
        principalId
      )
      this.audit({ tenantId: id, user }, 'bootstrap', 'tenants', id)
      return user
    })
  }
  /** Operator-only provisioning, never exposed as an HTTP route. */
  grantPlatformAdmin(value: unknown, address: unknown) {
    const id = tenantId(value)
    const account = email(address)
    return this.store.transaction(() => {
      const row = this.store.one<UserRow>(
        "SELECT * FROM users WHERE tenant_id=? AND email=? AND role=? AND status='active'",
        id,
        account,
        reservedRole
      )
      if (!row) return fail(404, 'tenant_admin_not_found')
      const changed = this.store.run(
        'INSERT OR IGNORE INTO platform_admins (principal_id,granted_at) VALUES (?,?)',
        row.principal_id,
        new Date(this.now()).toISOString()
      )
      if (changed.changes)
        this.audit({ tenantId: id, user: publicUser(row) }, 'platform_admin_grant', 'principals', row.principal_id)
      return row.principal_id
    })
  }
  revokePlatformAdmin(value: unknown, address: unknown) {
    const id = tenantId(value)
    const account = email(address)
    return this.store.transaction(() => {
      const row = this.store.one<UserRow>(
        'SELECT * FROM users WHERE tenant_id=? AND email=? AND role=?',
        id,
        account,
        reservedRole
      )
      if (!row || !this.store.one('SELECT principal_id FROM platform_admins WHERE principal_id=?', row.principal_id))
        return fail(404, 'platform_admin_not_found')
      const remaining = this.store.one<{ principal_id: string }>(
        `SELECT p.principal_id FROM platform_admins p
         WHERE p.principal_id<>? AND EXISTS (
           SELECT 1 FROM users u JOIN tenants t ON t.id=u.tenant_id
           WHERE u.principal_id=p.principal_id AND u.status='active' AND t.status='active'
         ) LIMIT 1`,
        row.principal_id
      )
      if (!remaining) return fail(409, 'last_platform_admin')
      this.store.run('DELETE FROM platform_admins WHERE principal_id=?', row.principal_id)
      this.audit({ tenantId: id, user: publicUser(row) }, 'platform_admin_revoke', 'principals', row.principal_id)
      this.store.run(
        'DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE principal_id=?)',
        row.principal_id
      )
      return row.principal_id
    })
  }
  async login(value: unknown) {
    const input = object(value)
    onlyFields(input, ['tenantId', 'email', 'password', 'totpCode', 'recoveryCode'])
    const id = tenantId(input.tenantId),
      address = email(input.email)
    const suppliedPassword =
      typeof input.password === 'string' && input.password.length <= 256
        ? input.password
        : fail(400, 'invalid_password')
    const initial = this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND email=?', id, address)
    const valid = await verifyPassword(suppliedPassword, initial?.password_hash ?? null)
    if (valid && initial && (input.totpCode !== undefined || input.recoveryCode !== undefined)) {
      const credential = this.store.one<TotpRow>(
        'SELECT * FROM totp_credentials WHERE principal_id=?',
        initial.principal_id
      )
      if (credential?.enabled) this.chargeSecondFactor(initial.principal_id)
    }
    return this.store.transaction(() => {
      const user = this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND email=?', id, address)
      const tenant = this.store.one<{ status: string }>('SELECT status FROM tenants WHERE id=?', id)
      if (
        !valid ||
        !user ||
        user.status !== 'active' ||
        tenant?.status !== 'active' ||
        user.principal_id !== initial?.principal_id ||
        user.password_hash !== initial?.password_hash
      )
        return fail(401, 'invalid_credentials')
      const authenticator = this.store.one<TotpRow>(
        'SELECT * FROM totp_credentials WHERE principal_id=?',
        user.principal_id
      )
      let usedRecovery = false
      if (authenticator?.enabled) {
        if (input.totpCode === undefined && input.recoveryCode === undefined) return { totpRequired: true as const }
        usedRecovery = this.consumeSecondFactor(authenticator, input.totpCode, input.recoveryCode) === 'recovery'
        this.clearSecondFactorLimit(user.principal_id)
      } else if (input.totpCode !== undefined || input.recoveryCode !== undefined) {
        return fail(400, 'totp_not_enabled')
      }
      const token = randomBytes(32).toString('base64url'),
        expiresAt = this.now() + this.sessionTtlMs
      this.store.run('DELETE FROM sessions WHERE expires_at<=?', this.now())
      // Bound active session count for one account; oldest sessions lose access immediately.
      this.store.run(
        'DELETE FROM sessions WHERE hash IN (SELECT hash FROM sessions WHERE tenant_id=? AND user_id=? ORDER BY expires_at DESC LIMIT -1 OFFSET 9)',
        id,
        user.id
      )
      this.store.run('INSERT INTO sessions VALUES (?,?,?,?)', tokenHash(token), id, user.id, expiresAt)
      this.audit({ tenantId: id, user }, 'login', 'sessions', user.id)
      if (usedRecovery) this.audit({ tenantId: id, user }, 'totp_recovery_login', 'authenticators', user.principal_id)
      return { token, tenantId: id, expiresAt, user: publicUser(user) }
    })
  }
  /** Durable per-account limit; failed OTP transactions cannot roll back this charge. */
  private chargeSecondFactor(principalId: string) {
    this.store.transaction(() => {
      const row = this.store.one<{ window_started_at: number; attempts: number }>(
        'SELECT window_started_at,attempts FROM totp_rate_limits WHERE principal_id=?',
        principalId
      )
      const now = this.now()
      if (!row || now - row.window_started_at >= 10 * 60_000) {
        this.store.run(
          `INSERT INTO totp_rate_limits (principal_id,window_started_at,attempts) VALUES (?,?,1)
           ON CONFLICT(principal_id) DO UPDATE SET window_started_at=excluded.window_started_at,attempts=1`,
          principalId,
          now
        )
      } else {
        if (row.attempts >= 10) return fail(429, 'totp_rate_limited')
        this.store.run('UPDATE totp_rate_limits SET attempts=attempts+1 WHERE principal_id=?', principalId)
      }
    })
  }
  private clearSecondFactorLimit(principalId: string) {
    this.store.run('DELETE FROM totp_rate_limits WHERE principal_id=?', principalId)
  }
  private requireTotpKey(): Buffer {
    return this.totpKey ?? fail(503, 'totp_unavailable')
  }
  private consumeSecondFactor(row: TotpRow, totpCode: unknown, recoveryCode: unknown): 'totp' | 'recovery' {
    if (totpCode !== undefined && recoveryCode !== undefined) return fail(400, 'multiple_second_factors')
    if (totpCode !== undefined) {
      const secret = decryptTotpSecret(row.secret_ciphertext, this.requireTotpKey(), row.principal_id)
      const step = matchTotp(secret, totpCode, this.now())
      if (step === null || (row.last_used_step !== null && step <= row.last_used_step))
        return fail(401, 'invalid_second_factor')
      this.store.run('UPDATE totp_credentials SET last_used_step=? WHERE principal_id=?', step, row.principal_id)
      return 'totp'
    }
    const hash = recoveryCodeHash(row.principal_id, recoveryCode)
    if (!hash) return fail(401, 'invalid_second_factor')
    const removed = this.store.run(
      'DELETE FROM totp_recovery_codes WHERE principal_id=? AND code_hash=?',
      row.principal_id,
      hash
    )
    if (!removed.changes) return fail(401, 'invalid_second_factor')
    return 'recovery'
  }
  private async checkCurrentPassword(principal: Principal, value: unknown): Promise<string> {
    const supplied = typeof value === 'string' && value.length <= 256 ? value : fail(400, 'invalid_password')
    const row = this.store.one<UserRow>(
      'SELECT * FROM users WHERE tenant_id=? AND id=?',
      principal.tenantId,
      principal.user.id
    )
    if (!(await verifyPassword(supplied, row?.password_hash ?? null))) return fail(401, 'invalid_credentials')
    return row!.password_hash!
  }
  private reauthenticate(principal: Principal, expectedHash: string): Principal {
    const actor = this.authenticateHash(principal.sessionHash)
    const row = this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND id=?', actor.tenantId, actor.user.id)
    if (
      actor.principalId !== principal.principalId ||
      actor.user.id !== principal.user.id ||
      row?.password_hash !== expectedHash
    )
      return fail(401, 'invalid_credentials')
    return actor
  }
  private revokeOtherPrincipalSessions(principal: Principal) {
    this.store.run(
      `DELETE FROM sessions WHERE hash<>? AND EXISTS (
         SELECT 1 FROM users u WHERE u.tenant_id=sessions.tenant_id AND u.id=sessions.user_id AND u.principal_id=?
       )`,
      principal.sessionHash,
      principal.principalId
    )
  }
  private saveRecoveryCodes(principalId: string): string[] {
    this.store.run('DELETE FROM totp_recovery_codes WHERE principal_id=?', principalId)
    const codes = createRecoveryCodes()
    const createdAt = new Date(this.now()).toISOString()
    for (const code of codes)
      this.store.run(
        'INSERT INTO totp_recovery_codes (principal_id,code_hash,created_at) VALUES (?,?,?)',
        principalId,
        recoveryCodeHash(principalId, code)!,
        createdAt
      )
    return codes
  }
  totpStatus(principal: Principal) {
    const actor = this.authenticateHash(principal.sessionHash)
    const row = this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
    const remaining = row?.enabled
      ? (this.store.one<{ count: number }>(
          'SELECT COUNT(*) AS count FROM totp_recovery_codes WHERE principal_id=?',
          actor.principalId
        )?.count ?? 0)
      : 0
    return { enabled: Boolean(row?.enabled), available: Boolean(this.totpKey), recoveryCodesRemaining: remaining }
  }
  async beginTotp(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['password'])
    const key = this.requireTotpKey()
    const expectedHash = await this.checkCurrentPassword(principal, input.password)
    return this.store.transaction(() => {
      const actor = this.reauthenticate(principal, expectedHash)
      const previous = this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (previous?.enabled) return fail(409, 'totp_already_enabled')
      const secret = createTotpSecret()
      const cipher = encryptTotpSecret(secret, key, actor.principalId)
      const expiresAt = this.now() + 10 * 60_000
      this.store.run(
        `INSERT INTO totp_credentials
         (principal_id,secret_ciphertext,enabled,pending_expires_at,last_used_step,created_at,enabled_at)
         VALUES (?,?,0,?,NULL,?,NULL)
         ON CONFLICT(principal_id) DO UPDATE SET
           secret_ciphertext=excluded.secret_ciphertext,pending_expires_at=excluded.pending_expires_at,
           last_used_step=NULL,created_at=excluded.created_at`,
        actor.principalId,
        cipher,
        expiresAt,
        new Date(this.now()).toISOString()
      )
      this.audit(actor, 'totp_setup', 'authenticators', actor.principalId)
      const encoded = base32(secret)
      return { secret: encoded, uri: otpauthUri(actor.user.email, encoded), expiresAt }
    })
  }
  confirmTotp(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['code'])
    this.chargeSecondFactor(principal.principalId)
    return this.store.transaction(() => {
      const actor = this.authenticateHash(principal.sessionHash)
      const row = this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (!row || row.enabled) return fail(409, 'totp_setup_required')
      if (row.pending_expires_at === null || row.pending_expires_at <= this.now())
        return fail(409, 'totp_setup_expired')
      const secret = decryptTotpSecret(row.secret_ciphertext, this.requireTotpKey(), actor.principalId)
      const step = matchTotp(secret, input.code, this.now())
      if (step === null) return fail(401, 'invalid_second_factor')
      this.store.run(
        `UPDATE totp_credentials SET enabled=1,pending_expires_at=NULL,last_used_step=?,enabled_at=?
         WHERE principal_id=?`,
        step,
        new Date(this.now()).toISOString(),
        actor.principalId
      )
      const recoveryCodes = this.saveRecoveryCodes(actor.principalId)
      this.clearSecondFactorLimit(actor.principalId)
      this.revokeOtherPrincipalSessions(actor)
      this.audit(actor, 'totp_enable', 'authenticators', actor.principalId)
      return { enabled: true, recoveryCodes }
    })
  }
  async disableTotp(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['password', 'totpCode', 'recoveryCode'])
    const expectedHash = await this.checkCurrentPassword(principal, input.password)
    this.chargeSecondFactor(principal.principalId)
    return this.store.transaction(() => {
      const actor = this.reauthenticate(principal, expectedHash)
      const row = this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (!row?.enabled) return fail(409, 'totp_not_enabled')
      this.consumeSecondFactor(row, input.totpCode, input.recoveryCode)
      this.store.run('DELETE FROM totp_recovery_codes WHERE principal_id=?', actor.principalId)
      this.store.run('DELETE FROM totp_credentials WHERE principal_id=?', actor.principalId)
      this.clearSecondFactorLimit(actor.principalId)
      this.revokeOtherPrincipalSessions(actor)
      this.audit(actor, 'totp_disable', 'authenticators', actor.principalId)
      return { enabled: false }
    })
  }
  async rotateTotpRecoveryCodes(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['password', 'totpCode', 'recoveryCode'])
    const expectedHash = await this.checkCurrentPassword(principal, input.password)
    this.chargeSecondFactor(principal.principalId)
    return this.store.transaction(() => {
      const actor = this.reauthenticate(principal, expectedHash)
      const row = this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (!row?.enabled) return fail(409, 'totp_not_enabled')
      this.consumeSecondFactor(row, input.totpCode, input.recoveryCode)
      const recoveryCodes = this.saveRecoveryCodes(actor.principalId)
      this.clearSecondFactorLimit(actor.principalId)
      this.audit(actor, 'totp_recovery_rotate', 'authenticators', actor.principalId)
      return { recoveryCodes }
    })
  }
  private authenticateHash(hash: string): Principal {
    const session = this.store.one<{ tenant_id: string; user_id: string; principal_id: string }>(
      `SELECT s.tenant_id,s.user_id,u.principal_id
       FROM sessions s JOIN users u ON u.tenant_id=s.tenant_id AND u.id=s.user_id
       WHERE s.hash=? AND s.expires_at>?`,
      hash,
      this.now()
    )
    if (!session) return fail(401, 'session_expired')
    const user = this.store.one<UserRow>(
      'SELECT * FROM users WHERE tenant_id=? AND id=?',
      session.tenant_id,
      session.user_id
    )
    const tenant = this.store.one<{ status: string }>('SELECT status FROM tenants WHERE id=?', session.tenant_id)
    if (!user || user.status !== 'active' || tenant?.status !== 'active') return fail(401, 'session_revoked')
    return {
      principalId: session.principal_id,
      tenantId: session.tenant_id,
      user: publicUser(user),
      role: this.role(session.tenant_id, user.role),
      sessionHash: hash,
    }
  }
  authenticate(token: unknown, requestedTenant?: unknown): Principal {
    if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) return fail(401, 'unauthorized')
    const principal = this.authenticateHash(tokenHash(token))
    if (requestedTenant !== undefined && requestedTenant !== principal.tenantId) fail(403, 'tenant_mismatch')
    return principal
  }
  /** Revalidate long-lived transports against the live session and the tenant captured at upgrade time. */
  authenticateSession(sessionHash: string, expectedTenantId: string, expectedPrincipalId: string): Principal {
    const principal = this.authenticateHash(sessionHash)
    if (principal.tenantId !== expectedTenantId || principal.principalId !== expectedPrincipalId)
      return fail(401, 'session_identity_changed')
    return principal
  }
  listTenants(principal: Principal) {
    return this.store.all<{ id: string; name: string }>(
      `SELECT t.id,t.name FROM tenant_memberships m
       JOIN tenants t ON t.id=m.tenant_id
       JOIN users u ON u.tenant_id=m.tenant_id AND u.id=m.user_id AND u.principal_id=m.principal_id
       WHERE m.principal_id=? AND t.status='active' AND u.status='active'
       ORDER BY t.name COLLATE NOCASE,t.id`,
      principal.principalId
    )
  }
  private isPlatformAdmin(principal: Principal): boolean {
    return Boolean(
      this.store.one('SELECT principal_id FROM platform_admins WHERE principal_id=?', principal.principalId)
    )
  }
  private requirePlatformAdmin(principal: Principal): Principal {
    const actor = this.authenticateHash(principal.sessionHash)
    if (actor.principalId !== principal.principalId || !this.isPlatformAdmin(actor))
      return fail(403, 'platform_admin_required')
    return actor
  }
  private tenantRecord(id: string) {
    const row = this.store.one<{
      id: string
      name: string
      status: 'active' | 'disabled'
      adminEmail: string | null
      userCount: number
    }>(
      `SELECT t.id,t.name,t.status,
         (SELECT u.email FROM users u WHERE u.tenant_id=t.id AND u.role=? ORDER BY u.id LIMIT 1) AS adminEmail,
         (SELECT COUNT(*) FROM users u WHERE u.tenant_id=t.id) AS userCount
       FROM tenants t WHERE t.id=?`,
      reservedRole,
      id
    )
    return row ?? fail(404, 'tenant_not_found')
  }
  listManagedTenants(principal: Principal, value: unknown) {
    this.requirePlatformAdmin(principal)
    const query = object(value)
    onlyFields(query, ['page', 'pageSize', 'search', 'sort', 'order'])
    const page = Number(query.page ?? 1)
    const pageSize = Number(query.pageSize ?? 10)
    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      page > 1_000_000 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 200
    )
      return fail(400, 'invalid_pagination')
    const sort = query.sort === undefined ? 'name' : text(query.sort, 'sort')
    if (!['id', 'name', 'status'].includes(sort)) return fail(400, 'invalid_sort')
    const order = query.order ?? 'asc'
    if (order !== 'asc' && order !== 'desc') return fail(400, 'invalid_order')
    if (query.search !== undefined && (typeof query.search !== 'string' || query.search.length > 200))
      return fail(400, 'invalid_search')
    const term = typeof query.search === 'string' ? query.search.trim() : ''
    const pattern = `%${term.replace(/[\\%_]/g, '\\$&')}%`
    const where = term ? "WHERE t.id LIKE ? ESCAPE '\\' OR t.name LIKE ? ESCAPE '\\'" : ''
    const bindings = term ? [pattern, pattern] : []
    const total =
      this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM tenants t ${where}`, ...bindings)?.total ?? 0
    const rows = this.store.all<{ id: string }>(
      `SELECT t.id FROM tenants t ${where} ORDER BY t.${sort} ${order},t.id ASC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return { items: rows.map((row) => this.tenantRecord(row.id)), total }
  }
  getManagedTenant(principal: Principal, value: unknown) {
    this.requirePlatformAdmin(principal)
    return this.tenantRecord(tenantId(value))
  }
  async createManagedTenant(principal: Principal, value: unknown) {
    this.requirePlatformAdmin(principal)
    const input = object(value)
    onlyFields(input, ['tenantId', 'name', 'adminName', 'adminEmail', 'adminPassword'])
    const id = tenantId(input.tenantId)
    const name = text(input.name, 'name')
    const adminName = text(input.adminName, 'admin_name')
    const adminEmail = email(input.adminEmail)
    const hash = await hashPassword(password(input.adminPassword))
    return this.store.transaction(() => {
      const actor = this.requirePlatformAdmin(principal)
      if (this.store.one('SELECT id FROM tenants WHERE id=?', id)) return fail(409, 'tenant_exists')
      this.store.run('INSERT INTO tenants VALUES (?,?,?)', id, name, 'active')
      this.store.run('INSERT INTO roles VALUES (?,?,?,?,?)', randomUUID(), id, '租户管理员', reservedRole, '["*:*"]')
      const principalId = randomUUID()
      this.store.run(
        'INSERT INTO principals (id,created_at) VALUES (?,?)',
        principalId,
        new Date(this.now()).toISOString()
      )
      const userId = randomUUID()
      this.store.run(
        `INSERT INTO users (id,tenant_id,name,email,role,status,password_hash,principal_id)
         VALUES (?,?,?,?,?,'active',?,?)`,
        userId,
        id,
        adminName,
        adminEmail,
        reservedRole,
        hash,
        principalId
      )
      this.audit(actor, 'tenant_create', 'tenants', id)
      this.audit({ tenantId: id, user: actor.user }, 'tenant_created', 'tenants', id)
      return this.tenantRecord(id)
    })
  }
  updateManagedTenant(principal: Principal, value: unknown, inputValue: unknown) {
    this.requirePlatformAdmin(principal)
    const id = tenantId(value)
    const input = object(inputValue)
    onlyFields(input, ['name', 'status'])
    if (!Object.keys(input).length) return fail(400, 'empty_update')
    const name = input.name === undefined ? undefined : text(input.name, 'name')
    if (input.status !== undefined && input.status !== 'active' && input.status !== 'disabled')
      return fail(400, 'invalid_status')
    const status = input.status as 'active' | 'disabled' | undefined
    return this.store.transaction(() => {
      const actor = this.requirePlatformAdmin(principal)
      const current = this.tenantRecord(id)
      if (status === 'disabled' && id === actor.tenantId) return fail(409, 'cannot_disable_current_tenant')
      this.store.run(
        'UPDATE tenants SET name=?,status=? WHERE id=?',
        name ?? current.name,
        status ?? current.status,
        id
      )
      if (status === 'disabled') this.store.run('DELETE FROM sessions WHERE tenant_id=?', id)
      this.audit(actor, 'tenant_update', 'tenants', id)
      return this.tenantRecord(id)
    })
  }
  removeManagedTenant(principal: Principal, value: unknown) {
    this.requirePlatformAdmin(principal)
    const id = tenantId(value)
    return this.store.transaction(() => {
      const actor = this.requirePlatformAdmin(principal)
      const current = this.tenantRecord(id)
      if (id === actor.tenantId) return fail(409, 'cannot_disable_current_tenant')
      if (current.status === 'disabled') return fail(409, 'tenant_already_disabled')
      this.store.run("UPDATE tenants SET status='disabled' WHERE id=?", id)
      this.store.run('DELETE FROM sessions WHERE tenant_id=?', id)
      this.audit(actor, 'tenant_disable', 'tenants', id)
    })
  }
  switchTenant(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['tenantId'])
    const nextTenantId = tenantId(input.tenantId)
    return this.store.transaction(() => {
      const actor = this.authenticateHash(principal.sessionHash)
      if (actor.principalId !== principal.principalId) return fail(401, 'session_identity_changed')

      const membership = this.store.one<UserRow>(
        `SELECT u.* FROM tenant_memberships m
         JOIN users u ON u.tenant_id=m.tenant_id AND u.id=m.user_id AND u.principal_id=m.principal_id
         JOIN tenants t ON t.id=m.tenant_id
         WHERE m.tenant_id=? AND m.principal_id=? AND u.status='active' AND t.status='active'`,
        nextTenantId,
        actor.principalId
      )
      if (!membership) return fail(403, 'active_tenant_membership_required')
      if (nextTenantId === actor.tenantId) {
        const session = this.store.one<{ expires_at: number }>(
          'SELECT expires_at FROM sessions WHERE hash=?',
          actor.sessionHash
        )
        return { tenantId: actor.tenantId, user: actor.user, expiresAt: session?.expires_at }
      }

      const session = this.store.one<{ expires_at: number }>(
        'SELECT expires_at FROM sessions WHERE hash=? AND expires_at>? ',
        actor.sessionHash,
        this.now()
      )
      if (!session) return fail(401, 'session_expired')
      this.store.run(
        'UPDATE sessions SET tenant_id=?,user_id=? WHERE hash=?',
        nextTenantId,
        membership.id,
        actor.sessionHash
      )
      this.audit(actor, 'tenant_switch_out', 'tenants', nextTenantId)
      this.audit(
        { tenantId: nextTenantId, user: publicUser(membership) },
        'tenant_switch_in',
        'tenants',
        actor.tenantId
      )
      return { tenantId: nextTenantId, user: publicUser(membership), expiresAt: session.expires_at }
    })
  }
  private require(principal: Principal, permission: string, recordId?: string, scopedList = false) {
    const decision = scopedDecision(principal.role.permissions, principal.role.scopes, permission, recordId)
    if (decision.allowed) return
    if (scopedList && decision.reason === 'outside_scope') return
    fail(403, 'forbidden')
  }
  canReadEvent(principal: Principal, resource: 'users' | 'roles' | 'audit' | 'access_requests'): boolean {
    const permission = resource === 'access_requests' ? 'access:read' : `${resourcePermission[resource]}:read`
    const decision = scopedDecision(principal.role.permissions, principal.role.scopes, permission)
    return decision.allowed || decision.reason === 'outside_scope'
  }
  permissions(principal: Principal) {
    const platformRole: Role | undefined = this.isPlatformAdmin(principal)
      ? { id: 'platform-admin', name: '平台管理员', code: 'platform-admin', permissions: ['tenant:*'] }
      : undefined
    const roles = platformRole ? [principal.role, platformRole] : [principal.role]
    return {
      userId: principal.user.id,
      username: principal.user.name,
      roles,
      permissions: roles.flatMap((role) => role.permissions),
      routes: Object.entries(policies)
        .filter(([, policy]) => {
          if (!policy.permission || !roles.some((role) => permits(role.permissions, policy.permission!))) return false
          const resource = policy.permission.split(':', 1)[0]
          return (
            (resource !== 'user' && resource !== 'role') || scopeFor(principal.role.scopes, resource).mode !== 'deny'
          )
        })
        .map(([path]) => path)
        .concat('/account/security'),
    }
  }
  logout(principal: Principal) {
    this.store.transaction(() => {
      this.store.run('DELETE FROM sessions WHERE hash=?', principal.sessionHash)
      this.audit(principal, 'logout', 'sessions', principal.user.id)
    })
  }
  private role(tenant: string, code: string): Role {
    const row = this.store.one<RoleRow>(
      'SELECT id,name,code,permissions FROM roles WHERE tenant_id=? AND code=?',
      tenant,
      code
    )
    if (!row) return fail(400, 'invalid_role')
    return this.publicRole(tenant, row)
  }
  list(principal: Principal, resource: Resource, value: unknown) {
    this.require(principal, `${resourcePermission[resource]}:read`, undefined, true)
    const query = object(value)
    const page = Number(query.page ?? 1),
      pageSize = Number(query.pageSize ?? 10)
    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      page > 1_000_000 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 200
    )
      fail(400, 'invalid_pagination')
    const sort = query.sort === undefined ? (resource === 'audit' ? 'at' : 'name') : text(query.sort, 'sort')
    if (!sorts[resource].includes(sort)) fail(400, 'invalid_sort')
    const order = query.order ?? (resource === 'audit' ? 'desc' : 'asc')
    if (!['asc', 'desc'].includes(String(order))) fail(400, 'invalid_order')
    if (query.search !== undefined && (typeof query.search !== 'string' || query.search.length > 200))
      fail(400, 'invalid_search')
    const term = typeof query.search === 'string' ? query.search.trim() : ''
    const pattern = `%${term.replace(/[\\%_]/g, '\\$&')}%`
    const scope =
      resource === 'audit' ? undefined : scopeFor(principal.role.scopes, resourcePermission[resource] as ScopedResource)
    const selected = scope?.mode === 'restricted' ? scope.ids : undefined
    const where = `tenant_id=?${selected ? ` AND id IN (${selected.map(() => '?').join(',')})` : ''}${term ? ` AND (${searchFields[resource].map((field) => `${field} LIKE ? ESCAPE '\\'`).join(' OR ')})` : ''}`
    const bindings = [
      principal.tenantId,
      ...(selected ?? []),
      ...(term ? searchFields[resource].map(() => pattern) : []),
    ]
    const total =
      this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM ${resource} WHERE ${where}`, ...bindings)
        ?.total ?? 0
    const rows = this.store.all<Record<string, unknown>>(
      `SELECT ${selects[resource]} FROM ${resource} WHERE ${where} ORDER BY ${sort} ${order},id ASC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return {
      items:
        resource === 'roles' ? rows.map((row) => this.publicRole(principal.tenantId, row as unknown as RoleRow)) : rows,
      total,
    }
  }
  getOne(principal: Principal, resource: Resource, id: string) {
    this.require(principal, `${resourcePermission[resource]}:read`, id)
    const row = this.store.one<Record<string, unknown>>(
      `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
      principal.tenantId,
      id
    )
    if (!row) return fail(404, 'record_not_found')
    return resource === 'roles' ? this.publicRole(principal.tenantId, row as unknown as RoleRow) : row
  }
  private approvers(tenant: string, exceptUserId?: string, exceptRole?: string): User[] {
    const users = this.store.all<User>(
      "SELECT id,name,email,role,status FROM users WHERE tenant_id=? AND status='active' ORDER BY id",
      tenant
    )
    return users.filter(
      (user) =>
        user.id !== exceptUserId &&
        user.role !== exceptRole &&
        permits(this.role(tenant, user.role).permissions, 'access:approve')
    )
  }
  governance(principal: Principal) {
    if (
      !['access:read', 'role:update', 'user:update'].some((permission) =>
        permits(principal.role.permissions, permission)
      )
    )
      fail(403, 'forbidden')
    const reviewers = this.approvers(principal.tenantId, principal.user.id)
    return { requiresApproval: reviewers.length > 0, independentReviewers: reviewers.length }
  }
  private affectedUsers(tenant: string, kind: AccessKind, targetId: string, roleCode?: string): AffectedUsers {
    const users =
      kind === 'role'
        ? this.store.all<Pick<User, 'id' | 'name' | 'email'>>(
            'SELECT id,name,email FROM users WHERE tenant_id=? AND role=? ORDER BY id',
            tenant,
            roleCode ?? ''
          )
        : this.store.all<Pick<User, 'id' | 'name' | 'email'>>(
            'SELECT id,name,email FROM users WHERE tenant_id=? AND id=? ORDER BY id',
            tenant,
            targetId
          )
    return {
      count: users.length,
      digest: createHash('sha256')
        .update(users.map(({ id }) => id).join('\0'))
        .digest('hex'),
      sample: users.slice(0, 20),
    }
  }
  previewAccess(principal: Principal, value: unknown): AccessPreview {
    const input = object(value)
    onlyFields(input, ['kind', 'targetId', 'change'])
    if (input.kind !== 'role' && input.kind !== 'user') return fail(400, 'invalid_access_kind')
    const kind = input.kind
    const targetId = text(input.targetId, 'target_id', 128)
    const change = object(input.change)
    const permission = `${kind}:update`
    this.require(principal, permission, targetId)
    let before: Role | User
    let after: Role | User
    let affected: AffectedUsers
    if (kind === 'role') {
      onlyFields(change, ['permissions', 'scopes'])
      const row = this.store.one<RoleRow>(
        'SELECT id,name,code,permissions FROM roles WHERE tenant_id=? AND id=?',
        principal.tenantId,
        targetId
      )
      if (!row) return fail(404, 'record_not_found')
      before = this.publicRole(principal.tenantId, row)
      if (before.code === reservedRole || !this.canDelegateRole(principal, before)) return fail(403, 'protected_role')
      after = { ...before, ...this.parseRole({ ...before, ...change }) }
      if (!this.canDelegateRole(principal, after)) return fail(403, 'grant_escalation')
      this.protectReviewerRole(principal.tenantId, before, after)
      if (
        JSON.stringify({ permissions: before.permissions, scopes: before.scopes }) ===
        JSON.stringify({ permissions: after.permissions, scopes: after.scopes })
      )
        return fail(400, 'no_access_change')
      affected = this.affectedUsers(principal.tenantId, kind, targetId, before.code)
    } else {
      onlyFields(change, ['role', 'status'])
      const row = this.store.one<User>(
        'SELECT id,name,email,role,status FROM users WHERE tenant_id=? AND id=?',
        principal.tenantId,
        targetId
      )
      if (!row) return fail(404, 'record_not_found')
      before = row
      after = { ...before, ...change } as User
      if (after.status !== 'active' && after.status !== 'disabled') return fail(400, 'invalid_status')
      const nextRole = this.role(principal.tenantId, text(after.role, 'role', 64))
      if (
        !this.canDelegateRole(principal, this.role(principal.tenantId, before.role)) ||
        !this.canDelegateRole(principal, nextRole)
      )
        return fail(403, 'grant_escalation')
      this.protectLastAdmin(principal, before, after)
      this.protectReviewer(principal.tenantId, before, after)
      if (before.role === after.role && before.status === after.status) return fail(400, 'no_access_change')
      affected = this.affectedUsers(principal.tenantId, kind, targetId)
    }
    const fingerprint = createHash('sha256')
      .update(JSON.stringify([principal.tenantId, kind, targetId, before, after, affected.digest]))
      .digest('hex')
    return { kind, targetId, before, after, affected, fingerprint }
  }
  private publicAccessRequest(row: AccessRequestRow) {
    return {
      id: row.id,
      kind: row.kind,
      targetId: row.target_id,
      actorId: row.actor_id,
      actor: row.actor_email,
      before: JSON.parse(row.before_json) as Role | User,
      after: JSON.parse(row.after_json) as Role | User,
      affected: JSON.parse(row.affected_json) as AffectedUsers,
      reason: row.reason,
      fingerprint: row.fingerprint,
      status: row.status,
      reviewerId: row.reviewer_id,
      decisionReason: row.decision_reason,
      createdAt: row.created_at,
      decidedAt: row.decided_at,
    }
  }
  listAccessRequests(principal: Principal, value: unknown) {
    this.require(principal, 'access:read')
    const query = object(value)
    onlyFields(query, ['page', 'pageSize', 'status'])
    const page = Number(query.page ?? 1)
    const pageSize = Number(query.pageSize ?? 20)
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100)
      return fail(400, 'invalid_pagination')
    const status = query.status
    if (status !== undefined && !['pending', 'approved', 'rejected', 'stale'].includes(String(status)))
      return fail(400, 'invalid_access_status')
    const where = `tenant_id=?${status ? ' AND status=?' : ''}`
    const bindings = status ? [principal.tenantId, String(status)] : [principal.tenantId]
    const total =
      this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM access_requests WHERE ${where}`, ...bindings)
        ?.total ?? 0
    const rows = this.store.all<AccessRequestRow>(
      `SELECT * FROM access_requests WHERE ${where} ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return { items: rows.map((row) => this.publicAccessRequest(row)), total }
  }
  proposeAccess(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['kind', 'targetId', 'change', 'reason', 'fingerprint'])
    const reason = text(input.reason, 'reason', 500)
    const expected = text(input.fingerprint, 'fingerprint', 64)
    return this.store.transaction(() => {
      const actor = this.authenticateHash(principal.sessionHash)
      const preview = this.previewAccess(actor, { kind: input.kind, targetId: input.targetId, change: input.change })
      if (preview.fingerprint !== expected) return fail(409, 'stale_access_preview')
      const excludedRole = preview.kind === 'role' ? (preview.before as Role).code : undefined
      const reviewers = this.approvers(actor.tenantId, actor.user.id, excludedRole).filter(
        (user) => preview.kind !== 'user' || user.id !== preview.targetId
      )
      if (!reviewers.length) return fail(409, 'independent_reviewer_required')
      const id = randomUUID()
      this.store.run(
        `INSERT INTO access_requests
         (id,tenant_id,kind,target_id,actor_id,actor_email,before_json,after_json,affected_json,reason,
          fingerprint,status,reviewer_id,decision_reason,created_at,decided_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,'pending',NULL,NULL,?,NULL)`,
        id,
        actor.tenantId,
        preview.kind,
        preview.targetId,
        actor.user.id,
        actor.user.email,
        JSON.stringify(preview.before),
        JSON.stringify(preview.after),
        JSON.stringify(preview.affected),
        reason,
        preview.fingerprint,
        new Date(this.now()).toISOString()
      )
      this.audit(actor, 'access_propose', 'access_requests', id)
      return this.publicAccessRequest(this.store.one<AccessRequestRow>('SELECT * FROM access_requests WHERE id=?', id)!)
    })
  }
  decideAccess(principal: Principal, id: string, value: unknown) {
    const input = object(value)
    onlyFields(input, ['decision', 'reason'])
    if (input.decision !== 'approve' && input.decision !== 'reject') return fail(400, 'invalid_access_decision')
    const reason = text(input.reason, 'reason', 500)
    const requestId = text(id, 'id', 128)
    return this.store.transaction(() => {
      const reviewer = this.authenticateHash(principal.sessionHash)
      this.require(reviewer, 'access:approve')
      const row = this.store.one<AccessRequestRow>(
        'SELECT * FROM access_requests WHERE tenant_id=? AND id=?',
        reviewer.tenantId,
        requestId
      )
      if (!row) return fail(404, 'record_not_found')
      if (row.status !== 'pending') return fail(409, 'access_request_closed')
      const before = JSON.parse(row.before_json) as Role | User
      if (
        row.actor_id === reviewer.user.id ||
        (row.kind === 'user' && row.target_id === reviewer.user.id) ||
        (row.kind === 'role' && reviewer.user.role === (before as Role).code)
      )
        return fail(403, 'independent_review_required')
      const decidedAt = new Date(this.now()).toISOString()
      const complete = (status: AccessStatus, decisionReason: string) => {
        this.store.run(
          `UPDATE access_requests SET status=?,reviewer_id=?,decision_reason=?,decided_at=?
           WHERE tenant_id=? AND id=? AND status='pending'`,
          status,
          reviewer.user.id,
          decisionReason,
          decidedAt,
          reviewer.tenantId,
          requestId
        )
        this.audit(reviewer, `access_${status}`, 'access_requests', requestId)
        return this.publicAccessRequest(
          this.store.one<AccessRequestRow>('SELECT * FROM access_requests WHERE id=?', requestId)!
        )
      }
      if (input.decision === 'reject') return complete('rejected', reason)

      const proposer = this.store.one<UserRow>(
        "SELECT * FROM users WHERE tenant_id=? AND id=? AND status='active'",
        reviewer.tenantId,
        row.actor_id
      )
      if (!proposer) return complete('stale', 'proposer_unavailable')
      let current: AccessPreview
      try {
        const actor: Principal = {
          principalId: proposer.principal_id,
          tenantId: reviewer.tenantId,
          user: publicUser(proposer),
          role: this.role(reviewer.tenantId, proposer.role),
          sessionHash: '',
        }
        const desired = JSON.parse(row.after_json) as Role | User
        const change =
          row.kind === 'role'
            ? { permissions: (desired as Role).permissions, scopes: (desired as Role).scopes }
            : { role: (desired as User).role, status: (desired as User).status }
        current = this.previewAccess(actor, { kind: row.kind, targetId: row.target_id, change })
      } catch (error) {
        if (error instanceof BusinessError) return complete('stale', 'target_or_authority_changed')
        throw error
      }
      if (current.fingerprint !== row.fingerprint) return complete('stale', 'target_or_impact_changed')
      if (row.kind === 'role') {
        const next = current.after as Role
        this.store.run(
          'UPDATE roles SET permissions=? WHERE tenant_id=? AND id=?',
          JSON.stringify(next.permissions),
          reviewer.tenantId,
          row.target_id
        )
        this.saveScopes(reviewer.tenantId, next.code, next.scopes ?? {})
      } else {
        const next = current.after as User
        this.store.run(
          'UPDATE users SET role=?,status=? WHERE tenant_id=? AND id=?',
          next.role,
          next.status,
          reviewer.tenantId,
          row.target_id
        )
        this.store.run('DELETE FROM sessions WHERE tenant_id=? AND user_id=?', reviewer.tenantId, row.target_id)
      }
      return complete('approved', reason)
    })
  }
  private parseRole(input: Record<string, unknown>): Omit<Role, 'id'> {
    const code = text(input.code, 'role_code', 64)
    if (!/^[a-z][a-z0-9_-]*$/.test(code)) fail(400, 'invalid_role_code')
    if (
      !Array.isArray(input.permissions) ||
      input.permissions.length > 200 ||
      !input.permissions.every(
        (permission) =>
          typeof permission === 'string' &&
          (permissionCatalog.has(permission) ||
            permission === '*:*' ||
            (/^[a-z][a-z0-9-]*:\*$/.test(permission) &&
              [...permissionCatalog].some((entry) => entry.startsWith(permission.split(':')[0] + ':'))))
      )
    )
      return fail(400, 'invalid_permissions')
    return {
      name: text(input.name, 'name'),
      code,
      permissions: [...new Set(input.permissions as string[])],
      scopes: this.parseScopes(input.scopes),
    }
  }
  private protectLastAdmin(principal: Principal, old: User, next?: Omit<User, 'id'>) {
    if (
      old.role !== reservedRole ||
      old.status !== 'active' ||
      (next?.role === reservedRole && next.status === 'active')
    )
      return
    const count =
      this.store.one<{ total: number }>(
        'SELECT COUNT(*) AS total FROM users WHERE tenant_id=? AND role=? AND status=?',
        principal.tenantId,
        reservedRole,
        'active'
      )?.total ?? 0
    if (count <= 1) fail(409, 'last_tenant_admin')
  }
  private protectReviewer(tenant: string, old: User, next?: Pick<User, 'role' | 'status'>) {
    if (
      old.status !== 'active' ||
      !permits(this.role(tenant, old.role).permissions, 'access:approve') ||
      (next?.status === 'active' && permits(this.role(tenant, next.role).permissions, 'access:approve'))
    )
      return
    if (this.approvers(tenant).filter((user) => user.id !== old.id).length < 2) fail(409, 'last_reviewer')
  }
  private protectReviewerRole(tenant: string, old: Role, next: Role) {
    if (!permits(old.permissions, 'access:approve') || permits(next.permissions, 'access:approve')) return
    if (this.approvers(tenant, undefined, old.code).length < 2) fail(409, 'last_reviewer')
  }
  async write(
    principal: Principal,
    resource: 'users' | 'roles',
    action: 'create' | 'update' | 'delete',
    id: string | undefined,
    value: unknown
  ) {
    this.require(principal, `${resourcePermission[resource]}:${action}`, id)
    const input = action === 'delete' ? {} : object(value)
    onlyFields(
      input,
      resource === 'users' ? ['name', 'email', 'role', 'status', 'password'] : ['name', 'code', 'permissions', 'scopes']
    )
    const passwordHash = input.password === undefined ? undefined : await hashPassword(password(input.password))
    try {
      return this.store.transaction(() => {
        // Recheck after asynchronous password hashing, inside the write transaction.
        const actor = this.authenticateHash(principal.sessionHash)
        this.require(actor, `${resourcePermission[resource]}:${action}`, id)
        const recordId = action === 'create' ? randomUUID() : text(id, 'id', 128)
        const old =
          action === 'create'
            ? undefined
            : this.store.one<Record<string, unknown>>(
                `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
                actor.tenantId,
                recordId
              )
        if (action !== 'create' && !old) fail(404, 'record_not_found')
        if (resource === 'roles') {
          const previous = old ? this.publicRole(actor.tenantId, old as unknown as RoleRow) : undefined
          if (previous?.code === reservedRole || input.code === reservedRole) fail(409, 'protected_role')
          if (previous && !this.canDelegateRole(actor, previous)) fail(403, 'grant_escalation')
          if (action === 'delete') {
            if (
              this.store.one(
                'SELECT id FROM users WHERE tenant_id=? AND role=? LIMIT 1',
                actor.tenantId,
                previous!.code
              )
            )
              fail(409, 'role_in_use')
            this.store.run('DELETE FROM roles WHERE tenant_id=? AND id=?', actor.tenantId, recordId)
          } else {
            const next = this.parseRole({ ...previous, ...input })
            if (!this.canDelegateRole(actor, next as Role)) fail(403, 'grant_escalation')
            if (previous) this.protectReviewerRole(actor.tenantId, previous, { ...previous, ...next })
            if (
              this.approvers(actor.tenantId, actor.user.id).length > 0 &&
              ((action === 'create' && next.permissions.length > 0) ||
                (previous &&
                  JSON.stringify({ permissions: previous.permissions, scopes: previous.scopes }) !==
                    JSON.stringify({ permissions: next.permissions, scopes: next.scopes })))
            )
              fail(409, 'approval_required')
            if (
              previous &&
              previous.code !== next.code &&
              this.store.one('SELECT id FROM users WHERE tenant_id=? AND role=? LIMIT 1', actor.tenantId, previous.code)
            )
              fail(409, 'role_in_use')
            if (action === 'create')
              this.store.run(
                'INSERT INTO roles VALUES (?,?,?,?,?)',
                recordId,
                actor.tenantId,
                next.name,
                next.code,
                JSON.stringify(next.permissions)
              )
            else
              this.store.run(
                'UPDATE roles SET name=?,code=?,permissions=? WHERE tenant_id=? AND id=?',
                next.name,
                next.code,
                JSON.stringify(next.permissions),
                actor.tenantId,
                recordId
              )
            this.saveScopes(actor.tenantId, next.code, next.scopes ?? {})
          }
        } else {
          const previous = old as unknown as User | undefined
          if (previous && !this.canDelegateRole(actor, this.role(actor.tenantId, previous.role)))
            fail(403, 'grant_escalation')
          if (action === 'delete') {
            this.protectLastAdmin(actor, previous!)
            this.protectReviewer(actor.tenantId, previous!)
            this.store.run('DELETE FROM users WHERE tenant_id=? AND id=?', actor.tenantId, recordId)
          } else {
            const merged = { ...previous, ...input }
            const next = {
              name: text(merged.name, 'name'),
              email: email(merged.email),
              role: text(merged.role, 'role', 64),
              status: merged.status,
            }
            if (next.status !== 'active' && next.status !== 'disabled') fail(400, 'invalid_status')
            const role = this.role(actor.tenantId, next.role)
            if (!this.canDelegateRole(actor, role)) fail(403, 'grant_escalation')
            if (previous) this.protectLastAdmin(actor, previous, next as Omit<User, 'id'>)
            if (previous) this.protectReviewer(actor.tenantId, previous, next as Pick<User, 'role' | 'status'>)
            if (
              this.approvers(actor.tenantId, actor.user.id).length > 0 &&
              ((action === 'create' && next.status === 'active' && role.permissions.length > 0) ||
                (previous &&
                  (next.role !== previous.role || (previous.status === 'disabled' && next.status === 'active'))))
            )
              fail(409, 'approval_required')
            if (action === 'create') {
              const principalId = randomUUID()
              this.store.run(
                'INSERT INTO principals (id,created_at) VALUES (?,?)',
                principalId,
                new Date(this.now()).toISOString()
              )
              this.store.run(
                `INSERT INTO users (id,tenant_id,name,email,role,status,password_hash,principal_id)
                 VALUES (?,?,?,?,?,?,?,?)`,
                recordId,
                actor.tenantId,
                next.name,
                next.email,
                next.role,
                String(next.status),
                passwordHash ?? null,
                principalId
              )
            } else {
              this.store.run(
                'UPDATE users SET name=?,email=?,role=?,status=? WHERE tenant_id=? AND id=?',
                next.name,
                next.email,
                next.role,
                String(next.status),
                actor.tenantId,
                recordId
              )
              if (passwordHash !== undefined)
                this.store.run(
                  'UPDATE users SET password_hash=? WHERE tenant_id=? AND id=?',
                  passwordHash,
                  actor.tenantId,
                  recordId
                )
              if (passwordHash !== undefined)
                this.store.run('DELETE FROM sessions WHERE tenant_id=? AND user_id=?', actor.tenantId, recordId)
              if (next.role !== previous!.role || next.status !== previous!.status || next.email !== previous!.email)
                this.store.run('DELETE FROM sessions WHERE tenant_id=? AND user_id=?', actor.tenantId, recordId)
            }
          }
        }
        this.audit(actor, action, resource, recordId)
        if (action === 'delete') return undefined
        const row = this.store.one<Record<string, unknown>>(
          `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
          actor.tenantId,
          recordId
        )!
        return resource === 'roles' ? this.publicRole(actor.tenantId, row as unknown as RoleRow) : row
      })
    } catch (error) {
      if (error instanceof BusinessError) throw error
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) fail(409, 'duplicate_record')
      throw error
    }
  }
}
