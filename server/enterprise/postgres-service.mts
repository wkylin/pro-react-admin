import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
import { PostgresEnterpriseStore } from './postgres-store.mts'
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
  audit: 'id,actor,action,resource,"recordId",at',
}
const sorts = {
  users: ['name', 'email', 'status', 'id'],
  roles: ['name', 'code', 'id'],
  audit: ['at', 'actor', 'action', 'resource', 'id'],
}
const searchFields = {
  users: ['name', 'email', 'role'],
  roles: ['name', 'code'],
  audit: ['actor', 'action', 'resource', '"recordId"'],
}
const resourcePermission = { users: 'user', roles: 'role', audit: 'audit' }

export class PostgresEnterpriseService {
  store: PostgresEnterpriseStore
  sessionTtlMs: number
  now: () => number
  totpKey?: Buffer
  constructor(
    store: PostgresEnterpriseStore,
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

  }
  async ensureReady() {
    const stored = await this.store.one<TotpRow>('SELECT * FROM totp_credentials LIMIT 1')
    if (stored && !this.totpKey) throw new Error('ENTERPRISE_TOTP_KEY is required for stored authenticators')
    if (stored && this.totpKey) {
      try {
        decryptTotpSecret(stored.secret_ciphertext, this.totpKey, stored.principal_id)
      } catch {
        throw new Error('ENTERPRISE_TOTP_KEY cannot decrypt stored authenticators')
      }
    }
  }
  private async audit(principal: Pick<Principal, 'tenantId' | 'user'>, action: string, resource: string, id: string) {
    // Serialize audit sequence allocation so polling cannot skip a later commit.
    await this.store.query('SELECT pg_advisory_xact_lock(70618352)')
    await this.store.run(
      'INSERT INTO audit (id,tenant_id,actor,action,resource,"recordId",at) VALUES (?,?,?,?,?,?,?)',
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
  private async roleScopes(tenant: string, code: string): Promise<ResourceScopes> {
    const row = await this.store.one<{ scopes: string }>(
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
  private async publicRole(tenant: string, row: RoleRow): Promise<Role> {
    return publicRole(row, await this.roleScopes(tenant, row.code))
  }
  private async saveScopes(tenant: string, code: string, scopes: ResourceScopes) {
    await this.store.run(
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
    return await this.store.transaction(async () => {
      if (await this.store.one('SELECT id FROM tenants WHERE id=?', id)) fail(409, 'tenant_exists')
      await this.store.run('INSERT INTO tenants VALUES (?,?,?)', id, tenantName, 'active')
      await this.store.run('INSERT INTO roles VALUES (?,?,?,?,?)', randomUUID(), id, '租户管理员', reservedRole, '["*:*"]')
      const user: User = { id: randomUUID(), name, email: address, role: reservedRole, status: 'active' }
      const principalId = randomUUID()
      await this.store.run(
        'INSERT INTO principals (id,created_at) VALUES (?,?)',
        principalId,
        new Date(this.now()).toISOString()
      )
      await this.store.run(
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
      await this.audit({ tenantId: id, user }, 'bootstrap', 'tenants', id)
      return user
    })
  }
  /** Operator-only provisioning, never exposed as an HTTP route. */
  async grantPlatformAdmin(value: unknown, address: unknown) {
    const id = tenantId(value)
    const account = email(address)
    return await this.store.transaction(async () => {
      const row = await this.store.one<UserRow>(
        "SELECT * FROM users WHERE tenant_id=? AND email=? AND role=? AND status='active'",
        id,
        account,
        reservedRole
      )
      if (!row) return fail(404, 'tenant_admin_not_found')
      const changed = await this.store.run(
        'INSERT INTO platform_admins (principal_id,granted_at) VALUES (?,?) ON CONFLICT DO NOTHING',
        row.principal_id,
        new Date(this.now()).toISOString()
      )
      if (changed.changes)
        await this.audit({ tenantId: id, user: publicUser(row) }, 'platform_admin_grant', 'principals', row.principal_id)
      return row.principal_id
    })
  }
  async revokePlatformAdmin(value: unknown, address: unknown) {
    const id = tenantId(value)
    const account = email(address)
    return await this.store.transaction(async () => {
      const row = await this.store.one<UserRow>(
        'SELECT * FROM users WHERE tenant_id=? AND email=? AND role=?',
        id,
        account,
        reservedRole
      )
      if (!row || !await this.store.one('SELECT principal_id FROM platform_admins WHERE principal_id=?', row.principal_id))
        return fail(404, 'platform_admin_not_found')
      const remaining = await this.store.one<{ principal_id: string }>(
        `SELECT p.principal_id FROM platform_admins p
         WHERE p.principal_id<>? AND EXISTS (
           SELECT 1 FROM users u JOIN tenants t ON t.id=u.tenant_id
           WHERE u.principal_id=p.principal_id AND u.status='active' AND t.status='active'
         ) LIMIT 1`,
        row.principal_id
      )
      if (!remaining) return fail(409, 'last_platform_admin')
      await this.store.run('DELETE FROM platform_admins WHERE principal_id=?', row.principal_id)
      await this.audit({ tenantId: id, user: publicUser(row) }, 'platform_admin_revoke', 'principals', row.principal_id)
      await this.store.run(
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
    const initial = await this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND email=?', id, address)
    const valid = await verifyPassword(suppliedPassword, initial?.password_hash ?? null)
    if (valid && initial && (input.totpCode !== undefined || input.recoveryCode !== undefined)) {
      const credential = await this.store.one<TotpRow>(
        'SELECT * FROM totp_credentials WHERE principal_id=?',
        initial.principal_id
      )
      if (credential?.enabled) await this.chargeSecondFactor(initial.principal_id)
    }
    return await this.store.transaction(async () => {
      const user = await this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND email=?', id, address)
      const tenant = await this.store.one<{ status: string }>('SELECT status FROM tenants WHERE id=?', id)
      if (
        !valid ||
        !user ||
        user.status !== 'active' ||
        tenant?.status !== 'active' ||
        user.principal_id !== initial?.principal_id ||
        user.password_hash !== initial?.password_hash
      )
        return fail(401, 'invalid_credentials')
      const authenticator = await this.store.one<TotpRow>(
        'SELECT * FROM totp_credentials WHERE principal_id=?',
        user.principal_id
      )
      let usedRecovery = false
      if (authenticator?.enabled) {
        if (input.totpCode === undefined && input.recoveryCode === undefined) return { totpRequired: true as const }
        usedRecovery = await this.consumeSecondFactor(authenticator, input.totpCode, input.recoveryCode) === 'recovery'
        await this.clearSecondFactorLimit(user.principal_id)
      } else if (input.totpCode !== undefined || input.recoveryCode !== undefined) {
        return fail(400, 'totp_not_enabled')
      }
      const token = randomBytes(32).toString('base64url'),
        expiresAt = this.now() + this.sessionTtlMs
      await this.store.run('DELETE FROM sessions WHERE expires_at<=?', this.now())
      // Bound active session count for one account; oldest sessions lose access immediately.
      await this.store.run(
        'DELETE FROM sessions WHERE hash IN (SELECT hash FROM sessions WHERE tenant_id=? AND user_id=? ORDER BY expires_at DESC OFFSET 9)',
        id,
        user.id
      )
      await this.store.run('INSERT INTO sessions VALUES (?,?,?,?)', tokenHash(token), id, user.id, expiresAt)
      await this.audit({ tenantId: id, user }, 'login', 'sessions', user.id)
      if (usedRecovery) await this.audit({ tenantId: id, user }, 'totp_recovery_login', 'authenticators', user.principal_id)
      return { token, tenantId: id, expiresAt, user: publicUser(user) }
    })
  }
  /** One atomic charge across all serverless instances; rejected attempts remain charged. */
  async chargeLoginLimit(clientKey: string, limit = 20) {
    const now = this.now()
    const key = createHash('sha256').update(clientKey).digest('hex')
    const row = await this.store.one<{ attempts: number; window_started_at: number }>(
      `INSERT INTO login_rate_limits (client_key,window_started_at,attempts) VALUES (?,?,1)
       ON CONFLICT (client_key) DO UPDATE SET
         attempts=CASE WHEN ?-login_rate_limits.window_started_at>=600000 THEN 1
           ELSE login_rate_limits.attempts+1 END,
         window_started_at=CASE WHEN ?-login_rate_limits.window_started_at>=600000 THEN ?
           ELSE login_rate_limits.window_started_at END
       RETURNING attempts,window_started_at`,
      key, now, now, now, now
    )
    if (row && row.attempts > limit) return fail(429, 'login_rate_limited')
  }
  /** Durable per-account limit; failed OTP transactions cannot roll back this charge. */
  private async chargeSecondFactor(principalId: string) {
    await this.store.transaction(async () => {
      const row = await this.store.one<{ window_started_at: number; attempts: number }>(
        'SELECT window_started_at,attempts FROM totp_rate_limits WHERE principal_id=?',
        principalId
      )
      const now = this.now()
      if (!row || now - row.window_started_at >= 10 * 60_000) {
        await this.store.run(
          `INSERT INTO totp_rate_limits (principal_id,window_started_at,attempts) VALUES (?,?,1)
           ON CONFLICT(principal_id) DO UPDATE SET window_started_at=excluded.window_started_at,attempts=1`,
          principalId,
          now
        )
      } else {
        if (row.attempts >= 10) return fail(429, 'totp_rate_limited')
        await this.store.run('UPDATE totp_rate_limits SET attempts=attempts+1 WHERE principal_id=?', principalId)
      }
    })
  }
  private async clearSecondFactorLimit(principalId: string) {
    await this.store.run('DELETE FROM totp_rate_limits WHERE principal_id=?', principalId)
  }
  private requireTotpKey(): Buffer {
    return this.totpKey ?? fail(503, 'totp_unavailable')
  }
  private async consumeSecondFactor(row: TotpRow, totpCode: unknown, recoveryCode: unknown): Promise<'totp' | 'recovery'> {
    if (totpCode !== undefined && recoveryCode !== undefined) return fail(400, 'multiple_second_factors')
    if (totpCode !== undefined) {
      const secret = decryptTotpSecret(row.secret_ciphertext, this.requireTotpKey(), row.principal_id)
      const step = matchTotp(secret, totpCode, this.now())
      if (step === null || (row.last_used_step !== null && step <= row.last_used_step))
        return fail(401, 'invalid_second_factor')
      await this.store.run('UPDATE totp_credentials SET last_used_step=? WHERE principal_id=?', step, row.principal_id)
      return 'totp'
    }
    const hash = recoveryCodeHash(row.principal_id, recoveryCode)
    if (!hash) return fail(401, 'invalid_second_factor')
    const removed = await this.store.run(
      'DELETE FROM totp_recovery_codes WHERE principal_id=? AND code_hash=?',
      row.principal_id,
      hash
    )
    if (!removed.changes) return fail(401, 'invalid_second_factor')
    return 'recovery'
  }
  private async checkCurrentPassword(principal: Principal, value: unknown): Promise<string> {
    const supplied = typeof value === 'string' && value.length <= 256 ? value : fail(400, 'invalid_password')
    const row = await this.store.one<UserRow>(
      'SELECT * FROM users WHERE tenant_id=? AND id=?',
      principal.tenantId,
      principal.user.id
    )
    if (!(await verifyPassword(supplied, row?.password_hash ?? null))) return fail(401, 'invalid_credentials')
    return row!.password_hash!
  }
  private async reauthenticate(principal: Principal, expectedHash: string): Promise<Principal> {
    const actor = await this.authenticateHash(principal.sessionHash)
    const row = await this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND id=?', actor.tenantId, actor.user.id)
    if (
      actor.principalId !== principal.principalId ||
      actor.user.id !== principal.user.id ||
      row?.password_hash !== expectedHash
    )
      return fail(401, 'invalid_credentials')
    return actor
  }
  private async revokeOtherPrincipalSessions(principal: Principal) {
    await this.store.run(
      `DELETE FROM sessions WHERE hash<>? AND EXISTS (
         SELECT 1 FROM users u WHERE u.tenant_id=sessions.tenant_id AND u.id=sessions.user_id AND u.principal_id=?
       )`,
      principal.sessionHash,
      principal.principalId
    )
  }
  private async saveRecoveryCodes(principalId: string): Promise<string[]> {
    await this.store.run('DELETE FROM totp_recovery_codes WHERE principal_id=?', principalId)
    const codes = createRecoveryCodes()
    const createdAt = new Date(this.now()).toISOString()
    for (const code of codes)
      await this.store.run(
        'INSERT INTO totp_recovery_codes (principal_id,code_hash,created_at) VALUES (?,?,?)',
        principalId,
        recoveryCodeHash(principalId, code)!,
        createdAt
      )
    return codes
  }
  async totpStatus(principal: Principal) {
    const actor = await this.authenticateHash(principal.sessionHash)
    const row = await this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
    const remaining = row?.enabled
      ? ((await this.store.one<{ count: number }>(
          'SELECT COUNT(*) AS count FROM totp_recovery_codes WHERE principal_id=?',
          actor.principalId
        ))?.count ?? 0)
      : 0
    return { enabled: Boolean(row?.enabled), available: Boolean(this.totpKey), recoveryCodesRemaining: remaining }
  }
  async beginTotp(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['password'])
    const key = this.requireTotpKey()
    const expectedHash = await this.checkCurrentPassword(principal, input.password)
    return await this.store.transaction(async () => {
      const actor = await this.reauthenticate(principal, expectedHash)
      const previous = await this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (previous?.enabled) return fail(409, 'totp_already_enabled')
      const secret = createTotpSecret()
      const cipher = encryptTotpSecret(secret, key, actor.principalId)
      const expiresAt = this.now() + 10 * 60_000
      await this.store.run(
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
      await this.audit(actor, 'totp_setup', 'authenticators', actor.principalId)
      const encoded = base32(secret)
      return { secret: encoded, uri: otpauthUri(actor.user.email, encoded), expiresAt }
    })
  }
  async confirmTotp(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['code'])
    await this.chargeSecondFactor(principal.principalId)
    return await this.store.transaction(async () => {
      const actor = await this.authenticateHash(principal.sessionHash)
      const row = await this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (!row || row.enabled) return fail(409, 'totp_setup_required')
      if (row.pending_expires_at === null || row.pending_expires_at <= this.now())
        return fail(409, 'totp_setup_expired')
      const secret = decryptTotpSecret(row.secret_ciphertext, this.requireTotpKey(), actor.principalId)
      const step = matchTotp(secret, input.code, this.now())
      if (step === null) return fail(401, 'invalid_second_factor')
      await this.store.run(
        `UPDATE totp_credentials SET enabled=1,pending_expires_at=NULL,last_used_step=?,enabled_at=?
         WHERE principal_id=?`,
        step,
        new Date(this.now()).toISOString(),
        actor.principalId
      )
      const recoveryCodes = await this.saveRecoveryCodes(actor.principalId)
      await this.clearSecondFactorLimit(actor.principalId)
      await this.revokeOtherPrincipalSessions(actor)
      await this.audit(actor, 'totp_enable', 'authenticators', actor.principalId)
      return { enabled: true, recoveryCodes }
    })
  }
  async disableTotp(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['password', 'totpCode', 'recoveryCode'])
    const expectedHash = await this.checkCurrentPassword(principal, input.password)
    await this.chargeSecondFactor(principal.principalId)
    return await this.store.transaction(async () => {
      const actor = await this.reauthenticate(principal, expectedHash)
      const row = await this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (!row?.enabled) return fail(409, 'totp_not_enabled')
      await this.consumeSecondFactor(row, input.totpCode, input.recoveryCode)
      await this.store.run('DELETE FROM totp_recovery_codes WHERE principal_id=?', actor.principalId)
      await this.store.run('DELETE FROM totp_credentials WHERE principal_id=?', actor.principalId)
      await this.clearSecondFactorLimit(actor.principalId)
      await this.revokeOtherPrincipalSessions(actor)
      await this.audit(actor, 'totp_disable', 'authenticators', actor.principalId)
      return { enabled: false }
    })
  }
  async rotateTotpRecoveryCodes(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['password', 'totpCode', 'recoveryCode'])
    const expectedHash = await this.checkCurrentPassword(principal, input.password)
    await this.chargeSecondFactor(principal.principalId)
    return await this.store.transaction(async () => {
      const actor = await this.reauthenticate(principal, expectedHash)
      const row = await this.store.one<TotpRow>('SELECT * FROM totp_credentials WHERE principal_id=?', actor.principalId)
      if (!row?.enabled) return fail(409, 'totp_not_enabled')
      await this.consumeSecondFactor(row, input.totpCode, input.recoveryCode)
      const recoveryCodes = await this.saveRecoveryCodes(actor.principalId)
      await this.clearSecondFactorLimit(actor.principalId)
      await this.audit(actor, 'totp_recovery_rotate', 'authenticators', actor.principalId)
      return { recoveryCodes }
    })
  }
  private async authenticateHash(hash: string): Promise<Principal> {
    const session = await this.store.one<{ tenant_id: string; user_id: string; principal_id: string }>(
      `SELECT s.tenant_id,s.user_id,u.principal_id
       FROM sessions s JOIN users u ON u.tenant_id=s.tenant_id AND u.id=s.user_id
       WHERE s.hash=? AND s.expires_at>?`,
      hash,
      this.now()
    )
    if (!session) return fail(401, 'session_expired')
    const user = await this.store.one<UserRow>(
      'SELECT * FROM users WHERE tenant_id=? AND id=?',
      session.tenant_id,
      session.user_id
    )
    const tenant = await this.store.one<{ status: string }>('SELECT status FROM tenants WHERE id=?', session.tenant_id)
    if (!user || user.status !== 'active' || tenant?.status !== 'active') return fail(401, 'session_revoked')
    return {
      principalId: session.principal_id,
      tenantId: session.tenant_id,
      user: publicUser(user),
      role: await this.role(session.tenant_id, user.role),
      sessionHash: hash,
    }
  }
  async authenticate(token: unknown, requestedTenant?: unknown): Promise<Principal> {
    if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) return fail(401, 'unauthorized')
    const principal = await this.authenticateHash(tokenHash(token))
    if (requestedTenant !== undefined && requestedTenant !== principal.tenantId) fail(403, 'tenant_mismatch')
    return principal
  }
  /** Revalidate long-lived transports against the live session and the tenant captured at upgrade time. */
  async authenticateSession(sessionHash: string, expectedTenantId: string, expectedPrincipalId: string): Promise<Principal> {
    const principal = await this.authenticateHash(sessionHash)
    if (principal.tenantId !== expectedTenantId || principal.principalId !== expectedPrincipalId)
      return fail(401, 'session_identity_changed')
    return principal
  }
  async issueEventTicket(principal: Principal) {
    const now = this.now()
    const ticket = randomBytes(32).toString('base64url')
    const expiresAt = now + 30_000
    return this.store.transaction(async () => {
      const available = await this.store.one<{ name: string | null }>(
        "SELECT to_regclass('event_tickets')::text AS name"
      )
      if (!available?.name) return fail(503, 'events_not_configured')
      const session = await this.store.one<{ hash: string }>(
        'SELECT hash FROM sessions WHERE hash=? AND expires_at>? FOR UPDATE', principal.sessionHash, now
      )
      if (!session) return fail(401, 'session_expired')
      const limit = await this.store.one<{ window_started_at: number; attempts: number }>(
        'SELECT window_started_at,attempts FROM event_ticket_limits WHERE session_hash=?', principal.sessionHash
      )
      if (limit && now - limit.window_started_at < 60_000 && limit.attempts >= 30)
        return fail(429, 'event_ticket_rate_limited')
      if (!limit || now - limit.window_started_at >= 60_000) {
        await this.store.run(
          `INSERT INTO event_ticket_limits (session_hash,window_started_at,attempts) VALUES (?,?,1)
           ON CONFLICT(session_hash) DO UPDATE SET window_started_at=excluded.window_started_at,attempts=1`,
          principal.sessionHash, now
        )
      } else {
        await this.store.run('UPDATE event_ticket_limits SET attempts=attempts+1 WHERE session_hash=?', principal.sessionHash)
      }
      await this.store.run('DELETE FROM event_tickets WHERE expires_at<=?', now)
      await this.store.run(
        'INSERT INTO event_tickets (hash,session_hash,tenant_id,principal_id,expires_at) VALUES (?,?,?,?,?)',
        createHash('sha256').update(ticket).digest('hex'), principal.sessionHash, principal.tenantId,
        principal.principalId, expiresAt
      )
      return { ticket, expiresAt, path: '/api/resource-stream' }
    })
  }
  async consumeEventTicket(ticket: unknown) {
    if (typeof ticket !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(ticket)) return null
    const row = await this.store.one<{ session_hash: string; tenant_id: string; principal_id: string }>(
      `DELETE FROM event_tickets WHERE hash=? AND expires_at>? RETURNING session_hash,tenant_id,principal_id`,
      createHash('sha256').update(ticket).digest('hex'), this.now()
    )
    if (!row) return null
    const principal = await this.authenticateSession(row.session_hash, row.tenant_id, row.principal_id)
    return principal
  }
  async listTenants(principal: Principal) {
    return await this.store.all<{ id: string; name: string }>(
      `SELECT t.id,t.name FROM tenant_memberships m
       JOIN tenants t ON t.id=m.tenant_id
       JOIN users u ON u.tenant_id=m.tenant_id AND u.id=m.user_id AND u.principal_id=m.principal_id
       WHERE m.principal_id=? AND t.status='active' AND u.status='active'
       ORDER BY lower(t.name),t.id`,
      principal.principalId
    )
  }
  private async isPlatformAdmin(principal: Principal): Promise<boolean> {
    return Boolean(
      await this.store.one('SELECT principal_id FROM platform_admins WHERE principal_id=?', principal.principalId)
    )
  }
  private async requirePlatformAdmin(principal: Principal): Promise<Principal> {
    const actor = await this.authenticateHash(principal.sessionHash)
    if (actor.principalId !== principal.principalId || !await this.isPlatformAdmin(actor))
      return fail(403, 'platform_admin_required')
    return actor
  }
  private async tenantRecord(id: string) {
    const row = await this.store.one<{
      id: string
      name: string
      status: 'active' | 'disabled'
      adminEmail: string | null
      userCount: number
    }>(
      `SELECT t.id,t.name,t.status,
         (SELECT u.email FROM users u WHERE u.tenant_id=t.id AND u.role=? ORDER BY u.id LIMIT 1) AS "adminEmail",
         (SELECT COUNT(*)::integer FROM users u WHERE u.tenant_id=t.id) AS "userCount"
       FROM tenants t WHERE t.id=?`,
      reservedRole,
      id
    )
    return row ?? fail(404, 'tenant_not_found')
  }
  async listManagedTenants(principal: Principal, value: unknown) {
    await this.requirePlatformAdmin(principal)
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
    const where = term ? "WHERE t.id ILIKE ? ESCAPE '\\' OR t.name ILIKE ? ESCAPE '\\'" : ''
    const bindings = term ? [pattern, pattern] : []
    const total =
      (await this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM tenants t ${where}`, ...bindings))?.total ?? 0
    const rows = await this.store.all<{ id: string }>(
      `SELECT t.id FROM tenants t ${where} ORDER BY t.${sort} ${order},t.id ASC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return { items: await Promise.all(rows.map((row) => this.tenantRecord(row.id))), total }
  }
  async getManagedTenant(principal: Principal, value: unknown) {
    await this.requirePlatformAdmin(principal)
    return await this.tenantRecord(tenantId(value))
  }
  async createManagedTenant(principal: Principal, value: unknown) {
    await this.requirePlatformAdmin(principal)
    const input = object(value)
    onlyFields(input, ['tenantId', 'name', 'adminName', 'adminEmail', 'adminPassword'])
    const id = tenantId(input.tenantId)
    const name = text(input.name, 'name')
    const adminName = text(input.adminName, 'admin_name')
    const adminEmail = email(input.adminEmail)
    const hash = await hashPassword(password(input.adminPassword))
    return await this.store.transaction(async () => {
      const actor = await this.requirePlatformAdmin(principal)
      if (await this.store.one('SELECT id FROM tenants WHERE id=?', id)) return fail(409, 'tenant_exists')
      await this.store.run('INSERT INTO tenants VALUES (?,?,?)', id, name, 'active')
      await this.store.run('INSERT INTO roles VALUES (?,?,?,?,?)', randomUUID(), id, '租户管理员', reservedRole, '["*:*"]')
      const principalId = randomUUID()
      await this.store.run(
        'INSERT INTO principals (id,created_at) VALUES (?,?)',
        principalId,
        new Date(this.now()).toISOString()
      )
      const userId = randomUUID()
      await this.store.run(
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
      await this.audit(actor, 'tenant_create', 'tenants', id)
      await this.audit({ tenantId: id, user: actor.user }, 'tenant_created', 'tenants', id)
      return await this.tenantRecord(id)
    })
  }
  async updateManagedTenant(principal: Principal, value: unknown, inputValue: unknown) {
    await this.requirePlatformAdmin(principal)
    const id = tenantId(value)
    const input = object(inputValue)
    onlyFields(input, ['name', 'status'])
    if (!Object.keys(input).length) return fail(400, 'empty_update')
    const name = input.name === undefined ? undefined : text(input.name, 'name')
    if (input.status !== undefined && input.status !== 'active' && input.status !== 'disabled')
      return fail(400, 'invalid_status')
    const status = input.status as 'active' | 'disabled' | undefined
    return await this.store.transaction(async () => {
      const actor = await this.requirePlatformAdmin(principal)
      const current = await this.tenantRecord(id)
      if (status === 'disabled' && id === actor.tenantId) return fail(409, 'cannot_disable_current_tenant')
      await this.store.run(
        'UPDATE tenants SET name=?,status=? WHERE id=?',
        name ?? current.name,
        status ?? current.status,
        id
      )
      if (status === 'disabled') await this.store.run('DELETE FROM sessions WHERE tenant_id=?', id)
      await this.audit(actor, 'tenant_update', 'tenants', id)
      return await this.tenantRecord(id)
    })
  }
  async removeManagedTenant(principal: Principal, value: unknown) {
    await this.requirePlatformAdmin(principal)
    const id = tenantId(value)
    return await this.store.transaction(async () => {
      const actor = await this.requirePlatformAdmin(principal)
      const current = await this.tenantRecord(id)
      if (id === actor.tenantId) return fail(409, 'cannot_disable_current_tenant')
      if (current.status === 'disabled') return fail(409, 'tenant_already_disabled')
      await this.store.run("UPDATE tenants SET status='disabled' WHERE id=?", id)
      await this.store.run('DELETE FROM sessions WHERE tenant_id=?', id)
      await this.audit(actor, 'tenant_disable', 'tenants', id)
    })
  }
  async switchTenant(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['tenantId'])
    const nextTenantId = tenantId(input.tenantId)
    return await this.store.transaction(async () => {
      const actor = await this.authenticateHash(principal.sessionHash)
      if (actor.principalId !== principal.principalId) return fail(401, 'session_identity_changed')

      const membership = await this.store.one<UserRow>(
        `SELECT u.* FROM tenant_memberships m
         JOIN users u ON u.tenant_id=m.tenant_id AND u.id=m.user_id AND u.principal_id=m.principal_id
         JOIN tenants t ON t.id=m.tenant_id
         WHERE m.tenant_id=? AND m.principal_id=? AND u.status='active' AND t.status='active'`,
        nextTenantId,
        actor.principalId
      )
      if (!membership) return fail(403, 'active_tenant_membership_required')
      if (nextTenantId === actor.tenantId) {
        const session = await this.store.one<{ expires_at: number }>(
          'SELECT expires_at FROM sessions WHERE hash=?',
          actor.sessionHash
        )
        return { tenantId: actor.tenantId, user: actor.user, expiresAt: session?.expires_at }
      }

      const session = await this.store.one<{ expires_at: number }>(
        'SELECT expires_at FROM sessions WHERE hash=? AND expires_at>? ',
        actor.sessionHash,
        this.now()
      )
      if (!session) return fail(401, 'session_expired')
      await this.store.run(
        'UPDATE sessions SET tenant_id=?,user_id=? WHERE hash=?',
        nextTenantId,
        membership.id,
        actor.sessionHash
      )
      await this.audit(actor, 'tenant_switch_out', 'tenants', nextTenantId)
      await this.audit(
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
  async pollEvents(principal: Principal, value: unknown) {
    const raw = value === undefined ? undefined : String(value)
    if (raw !== undefined && !/^(0|[1-9]\d{0,15})$/.test(raw)) return fail(400, 'invalid_event_cursor')
    if (raw === undefined) {
      const latest = await this.store.one<{ seq: string }>(
        'SELECT COALESCE(MAX(seq),0) AS seq FROM audit WHERE tenant_id=?', principal.tenantId
      )
      return { cursor: String(latest?.seq ?? 0), resources: [], reset: false }
    }
    const rows = await this.store.all<{ seq: string; resource: string; action: string; record_id: string }>(
      'SELECT seq,resource,action,"recordId" AS record_id FROM audit WHERE tenant_id=? AND seq>? ORDER BY seq ASC LIMIT 101',
      principal.tenantId, Number(raw)
    )
    const window = rows.slice(0, 100)
    const resources = new Set<'users' | 'roles' | 'audit' | 'access_requests'>()
    for (const row of window) {
      if (this.canReadEvent(principal, 'audit')) resources.add('audit')
      const resource = row.resource === 'users' || row.resource === 'roles' || row.resource === 'access_requests'
        ? row.resource : undefined
      if (resource && this.canReadEvent(principal, resource)) resources.add(resource)
      if (row.resource === 'access_requests' && row.action === 'access_approved') {
        const changed = await this.store.one<{ kind: 'role' | 'user' }>(
          'SELECT kind FROM access_requests WHERE tenant_id=? AND id=?', principal.tenantId, row.record_id
        )
        const changedResource = changed?.kind === 'role' ? 'roles' : changed?.kind === 'user' ? 'users' : undefined
        if (changedResource && this.canReadEvent(principal, changedResource)) resources.add(changedResource)
      }
    }
    return {
      cursor: String(window.at(-1)?.seq ?? raw),
      resources: [...resources],
      reset: rows.length > 100,
    }
  }
  async permissions(principal: Principal) {
    const platformRole: Role | undefined = await this.isPlatformAdmin(principal)
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
  async logout(principal: Principal) {
    await this.store.transaction(async () => {
      await this.store.run('DELETE FROM sessions WHERE hash=?', principal.sessionHash)
      await this.audit(principal, 'logout', 'sessions', principal.user.id)
    })
  }
  private async role(tenant: string, code: string): Promise<Role> {
    const row = await this.store.one<RoleRow>(
      'SELECT id,name,code,permissions FROM roles WHERE tenant_id=? AND code=?',
      tenant,
      code
    )
    if (!row) return fail(400, 'invalid_role')
    return await this.publicRole(tenant, row)
  }
  async list(principal: Principal, resource: Resource, value: unknown) {
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
    const where = `tenant_id=?${selected ? ` AND id IN (${selected.map(() => '?').join(',')})` : ''}${term ? ` AND (${searchFields[resource].map((field) => `${field} ILIKE ? ESCAPE '\\'`).join(' OR ')})` : ''}`
    const bindings = [
      principal.tenantId,
      ...(selected ?? []),
      ...(term ? searchFields[resource].map(() => pattern) : []),
    ]
    const total =
      (await this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM ${resource} WHERE ${where}`, ...bindings))
        ?.total ?? 0
    const rows = await this.store.all<Record<string, unknown>>(
      `SELECT ${selects[resource]} FROM ${resource} WHERE ${where} ORDER BY ${sort} ${order},id ASC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return {
      items:
        resource === 'roles'
          ? await Promise.all(rows.map((row) => this.publicRole(principal.tenantId, row as unknown as RoleRow)))
          : rows,
      total,
    }
  }
  async getOne(principal: Principal, resource: Resource, id: string) {
    this.require(principal, `${resourcePermission[resource]}:read`, id)
    const row = await this.store.one<Record<string, unknown>>(
      `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
      principal.tenantId,
      id
    )
    if (!row) return fail(404, 'record_not_found')
    return resource === 'roles' ? await this.publicRole(principal.tenantId, row as unknown as RoleRow) : row
  }
  private async approvers(tenant: string, exceptUserId?: string, exceptRole?: string): Promise<User[]> {
    const users = await this.store.all<User>(
      "SELECT id,name,email,role,status FROM users WHERE tenant_id=? AND status='active' ORDER BY id",
      tenant
    )
    const approved: User[] = []
    for (const user of users) {
      if (user.id !== exceptUserId && user.role !== exceptRole &&
        permits((await this.role(tenant, user.role)).permissions, 'access:approve')) approved.push(user)
    }
    return approved
  }
  async governance(principal: Principal) {
    if (
      !['access:read', 'role:update', 'user:update'].some((permission) =>
        permits(principal.role.permissions, permission)
      )
    )
      fail(403, 'forbidden')
    const reviewers = await this.approvers(principal.tenantId, principal.user.id)
    return { requiresApproval: reviewers.length > 0, independentReviewers: reviewers.length }
  }
  private async affectedUsers(tenant: string, kind: AccessKind, targetId: string, roleCode?: string): Promise<AffectedUsers> {
    const users =
      kind === 'role'
        ? await this.store.all<Pick<User, 'id' | 'name' | 'email'>>(
            'SELECT id,name,email FROM users WHERE tenant_id=? AND role=? ORDER BY id',
            tenant,
            roleCode ?? ''
          )
        : await this.store.all<Pick<User, 'id' | 'name' | 'email'>>(
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
  async previewAccess(principal: Principal, value: unknown): Promise<AccessPreview> {
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
      const row = await this.store.one<RoleRow>(
        'SELECT id,name,code,permissions FROM roles WHERE tenant_id=? AND id=?',
        principal.tenantId,
        targetId
      )
      if (!row) return fail(404, 'record_not_found')
      before = await this.publicRole(principal.tenantId, row)
      if (before.code === reservedRole || !this.canDelegateRole(principal, before)) return fail(403, 'protected_role')
      after = { ...before, ...this.parseRole({ ...before, ...change }) }
      if (!this.canDelegateRole(principal, after)) return fail(403, 'grant_escalation')
      await this.protectReviewerRole(principal.tenantId, before, after)
      if (
        JSON.stringify({ permissions: before.permissions, scopes: before.scopes }) ===
        JSON.stringify({ permissions: after.permissions, scopes: after.scopes })
      )
        return fail(400, 'no_access_change')
      affected = await this.affectedUsers(principal.tenantId, kind, targetId, before.code)
    } else {
      onlyFields(change, ['role', 'status'])
      const row = await this.store.one<User>(
        'SELECT id,name,email,role,status FROM users WHERE tenant_id=? AND id=?',
        principal.tenantId,
        targetId
      )
      if (!row) return fail(404, 'record_not_found')
      before = row
      after = { ...before, ...change } as User
      if (after.status !== 'active' && after.status !== 'disabled') return fail(400, 'invalid_status')
      const nextRole = await this.role(principal.tenantId, text(after.role, 'role', 64))
      if (
        !this.canDelegateRole(principal, await this.role(principal.tenantId, before.role)) ||
        !this.canDelegateRole(principal, nextRole)
      )
        return fail(403, 'grant_escalation')
      await this.protectLastAdmin(principal, before, after)
      await this.protectReviewer(principal.tenantId, before, after)
      if (before.role === after.role && before.status === after.status) return fail(400, 'no_access_change')
      affected = await this.affectedUsers(principal.tenantId, kind, targetId)
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
  async listAccessRequests(principal: Principal, value: unknown) {
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
      (await this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM access_requests WHERE ${where}`, ...bindings))
        ?.total ?? 0
    const rows = await this.store.all<AccessRequestRow>(
      `SELECT * FROM access_requests WHERE ${where} ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return { items: rows.map((row) => this.publicAccessRequest(row)), total }
  }
  async proposeAccess(principal: Principal, value: unknown) {
    const input = object(value)
    onlyFields(input, ['kind', 'targetId', 'change', 'reason', 'fingerprint'])
    const reason = text(input.reason, 'reason', 500)
    const expected = text(input.fingerprint, 'fingerprint', 64)
    return await this.store.transaction(async () => {
      const actor = await this.authenticateHash(principal.sessionHash)
      const preview = await this.previewAccess(actor, { kind: input.kind, targetId: input.targetId, change: input.change })
      if (preview.fingerprint !== expected) return fail(409, 'stale_access_preview')
      const excludedRole = preview.kind === 'role' ? (preview.before as Role).code : undefined
      const reviewers = (await this.approvers(actor.tenantId, actor.user.id, excludedRole)).filter(
        (user) => preview.kind !== 'user' || user.id !== preview.targetId
      )
      if (!reviewers.length) return fail(409, 'independent_reviewer_required')
      const id = randomUUID()
      await this.store.run(
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
      await this.audit(actor, 'access_propose', 'access_requests', id)
      return this.publicAccessRequest((await this.store.one<AccessRequestRow>('SELECT * FROM access_requests WHERE id=?', id))!)
    })
  }
  async decideAccess(principal: Principal, id: string, value: unknown) {
    const input = object(value)
    onlyFields(input, ['decision', 'reason'])
    if (input.decision !== 'approve' && input.decision !== 'reject') return fail(400, 'invalid_access_decision')
    const reason = text(input.reason, 'reason', 500)
    const requestId = text(id, 'id', 128)
    return await this.store.transaction(async () => {
      const reviewer = await this.authenticateHash(principal.sessionHash)
      this.require(reviewer, 'access:approve')
      const row = await this.store.one<AccessRequestRow>(
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
      const complete = async (status: AccessStatus, decisionReason: string) => {
        await this.store.run(
          `UPDATE access_requests SET status=?,reviewer_id=?,decision_reason=?,decided_at=?
           WHERE tenant_id=? AND id=? AND status='pending'`,
          status,
          reviewer.user.id,
          decisionReason,
          decidedAt,
          reviewer.tenantId,
          requestId
        )
        await this.audit(reviewer, `access_${status}`, 'access_requests', requestId)
        return this.publicAccessRequest(
          (await this.store.one<AccessRequestRow>('SELECT * FROM access_requests WHERE id=?', requestId))!
        )
      }
      if (input.decision === 'reject') return complete('rejected', reason)

      const proposer = await this.store.one<UserRow>(
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
          role: await this.role(reviewer.tenantId, proposer.role),
          sessionHash: '',
        }
        const desired = JSON.parse(row.after_json) as Role | User
        const change =
          row.kind === 'role'
            ? { permissions: (desired as Role).permissions, scopes: (desired as Role).scopes }
            : { role: (desired as User).role, status: (desired as User).status }
        current = await this.previewAccess(actor, { kind: row.kind, targetId: row.target_id, change })
      } catch (error) {
        if (error instanceof BusinessError) return complete('stale', 'target_or_authority_changed')
        throw error
      }
      if (current.fingerprint !== row.fingerprint) return complete('stale', 'target_or_impact_changed')
      if (row.kind === 'role') {
        const next = current.after as Role
        await this.store.run(
          'UPDATE roles SET permissions=? WHERE tenant_id=? AND id=?',
          JSON.stringify(next.permissions),
          reviewer.tenantId,
          row.target_id
        )
        await this.saveScopes(reviewer.tenantId, next.code, next.scopes ?? {})
      } else {
        const next = current.after as User
        await this.store.run(
          'UPDATE users SET role=?,status=? WHERE tenant_id=? AND id=?',
          next.role,
          next.status,
          reviewer.tenantId,
          row.target_id
        )
        await this.store.run('DELETE FROM sessions WHERE tenant_id=? AND user_id=?', reviewer.tenantId, row.target_id)
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
  private async protectLastAdmin(principal: Principal, old: User, next?: Omit<User, 'id'>) {
    if (
      old.role !== reservedRole ||
      old.status !== 'active' ||
      (next?.role === reservedRole && next.status === 'active')
    )
      return
    const count =
      (await this.store.one<{ total: number }>(
        'SELECT COUNT(*) AS total FROM users WHERE tenant_id=? AND role=? AND status=?',
        principal.tenantId,
        reservedRole,
        'active'
      ))?.total ?? 0
    if (count <= 1) fail(409, 'last_tenant_admin')
  }
  private async protectReviewer(tenant: string, old: User, next?: Pick<User, 'role' | 'status'>) {
    if (
      old.status !== 'active' ||
      !permits((await this.role(tenant, old.role)).permissions, 'access:approve') ||
      (next?.status === 'active' && permits((await this.role(tenant, next.role)).permissions, 'access:approve'))
    )
      return
    if ((await this.approvers(tenant)).filter((user) => user.id !== old.id).length < 2) fail(409, 'last_reviewer')
  }
  private async protectReviewerRole(tenant: string, old: Role, next: Role) {
    if (!permits(old.permissions, 'access:approve') || permits(next.permissions, 'access:approve')) return
    if ((await this.approvers(tenant, undefined, old.code)).length < 2) fail(409, 'last_reviewer')
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
      return await this.store.transaction(async () => {
        // Recheck after asynchronous password hashing, inside the write transaction.
        const actor = await this.authenticateHash(principal.sessionHash)
        this.require(actor, `${resourcePermission[resource]}:${action}`, id)
        const recordId = action === 'create' ? randomUUID() : text(id, 'id', 128)
        const old =
          action === 'create'
            ? undefined
            : await this.store.one<Record<string, unknown>>(
                `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
                actor.tenantId,
                recordId
              )
        if (action !== 'create' && !old) fail(404, 'record_not_found')
        if (resource === 'roles') {
          const previous = old ? await this.publicRole(actor.tenantId, old as unknown as RoleRow) : undefined
          if (previous?.code === reservedRole || input.code === reservedRole) fail(409, 'protected_role')
          if (previous && !this.canDelegateRole(actor, previous)) fail(403, 'grant_escalation')
          if (action === 'delete') {
            if (
              await this.store.one(
                'SELECT id FROM users WHERE tenant_id=? AND role=? LIMIT 1',
                actor.tenantId,
                previous!.code
              )
            )
              fail(409, 'role_in_use')
            await this.store.run('DELETE FROM roles WHERE tenant_id=? AND id=?', actor.tenantId, recordId)
          } else {
            const next = this.parseRole({ ...previous, ...input })
            if (!this.canDelegateRole(actor, next as Role)) fail(403, 'grant_escalation')
            if (previous) await this.protectReviewerRole(actor.tenantId, previous, { ...previous, ...next })
            if (
              (await this.approvers(actor.tenantId, actor.user.id)).length > 0 &&
              ((action === 'create' && next.permissions.length > 0) ||
                (previous &&
                  JSON.stringify({ permissions: previous.permissions, scopes: previous.scopes }) !==
                    JSON.stringify({ permissions: next.permissions, scopes: next.scopes })))
            )
              fail(409, 'approval_required')
            if (
              previous &&
              previous.code !== next.code &&
              await this.store.one('SELECT id FROM users WHERE tenant_id=? AND role=? LIMIT 1', actor.tenantId, previous.code)
            )
              fail(409, 'role_in_use')
            if (action === 'create')
              await this.store.run(
                'INSERT INTO roles VALUES (?,?,?,?,?)',
                recordId,
                actor.tenantId,
                next.name,
                next.code,
                JSON.stringify(next.permissions)
              )
            else
              await this.store.run(
                'UPDATE roles SET name=?,code=?,permissions=? WHERE tenant_id=? AND id=?',
                next.name,
                next.code,
                JSON.stringify(next.permissions),
                actor.tenantId,
                recordId
              )
            await this.saveScopes(actor.tenantId, next.code, next.scopes ?? {})
          }
        } else {
          const previous = old as unknown as User | undefined
          if (previous && !this.canDelegateRole(actor, await this.role(actor.tenantId, previous.role)))
            fail(403, 'grant_escalation')
          if (action === 'delete') {
            await this.protectLastAdmin(actor, previous!)
            await this.protectReviewer(actor.tenantId, previous!)
            await this.store.run('DELETE FROM users WHERE tenant_id=? AND id=?', actor.tenantId, recordId)
          } else {
            const merged = { ...previous, ...input }
            const next = {
              name: text(merged.name, 'name'),
              email: email(merged.email),
              role: text(merged.role, 'role', 64),
              status: merged.status,
            }
            if (next.status !== 'active' && next.status !== 'disabled') fail(400, 'invalid_status')
            const role = await this.role(actor.tenantId, next.role)
            if (!this.canDelegateRole(actor, role)) fail(403, 'grant_escalation')
            if (previous) await this.protectLastAdmin(actor, previous, next as Omit<User, 'id'>)
            if (previous) await this.protectReviewer(actor.tenantId, previous, next as Pick<User, 'role' | 'status'>)
            if (
              (await this.approvers(actor.tenantId, actor.user.id)).length > 0 &&
              ((action === 'create' && next.status === 'active' && role.permissions.length > 0) ||
                (previous &&
                  (next.role !== previous.role || (previous.status === 'disabled' && next.status === 'active'))))
            )
              fail(409, 'approval_required')
            if (action === 'create') {
              const principalId = randomUUID()
              await this.store.run(
                'INSERT INTO principals (id,created_at) VALUES (?,?)',
                principalId,
                new Date(this.now()).toISOString()
              )
              await this.store.run(
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
              await this.store.run(
                'UPDATE users SET name=?,email=?,role=?,status=? WHERE tenant_id=? AND id=?',
                next.name,
                next.email,
                next.role,
                String(next.status),
                actor.tenantId,
                recordId
              )
              if (passwordHash !== undefined)
                await this.store.run(
                  'UPDATE users SET password_hash=? WHERE tenant_id=? AND id=?',
                  passwordHash,
                  actor.tenantId,
                  recordId
                )
              if (passwordHash !== undefined)
                await this.store.run('DELETE FROM sessions WHERE tenant_id=? AND user_id=?', actor.tenantId, recordId)
              if (next.role !== previous!.role || next.status !== previous!.status || next.email !== previous!.email)
                await this.store.run('DELETE FROM sessions WHERE tenant_id=? AND user_id=?', actor.tenantId, recordId)
            }
          }
        }
        await this.audit(actor, action, resource, recordId)
        if (action === 'delete') return undefined
        const row = (await this.store.one<Record<string, unknown>>(
          `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
          actor.tenantId,
          recordId
        ))!
        return resource === 'roles' ? await this.publicRole(actor.tenantId, row as unknown as RoleRow) : row
      })
    } catch (error) {
      if (error instanceof BusinessError) throw error
      if (error && typeof error === 'object' && 'code' in error && error.code === '23505')
        fail(409, 'duplicate_record')
      throw error
    }
  }
}
