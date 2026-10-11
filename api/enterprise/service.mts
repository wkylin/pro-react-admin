import { randomBytes, randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
import { EnterpriseStore } from './store.mts'
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
])
const reservedRole = 'tenant-admin'
type UserRow = User & { tenant_id: string; password_hash: string | null }
type RoleRow = Omit<Role, 'permissions'> & { permissions: string }
const publicUser = ({ id, name, email: address, role, status }: UserRow): User => ({
  id,
  name,
  email: address,
  role,
  status,
})
const publicRole = (row: RoleRow): Role => ({ ...row, permissions: JSON.parse(row.permissions) as string[] })
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
  constructor(store: EnterpriseStore, { sessionTtlMs = 8 * 60 * 60 * 1000, now = Date.now } = {}) {
    if (!Number.isInteger(sessionTtlMs) || sessionTtlMs < 300_000 || sessionTtlMs > 7 * 24 * 60 * 60 * 1000)
      throw new Error('Session TTL must be between 5 minutes and 7 days')
    this.store = store
    this.sessionTtlMs = sessionTtlMs
    this.now = now
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
      this.store.run(
        'INSERT INTO users VALUES (?,?,?,?,?,?,?)',
        user.id,
        id,
        name,
        address,
        user.role,
        user.status,
        hash
      )
      this.audit({ tenantId: id, user }, 'bootstrap', 'tenants', id)
      return user
    })
  }
  async login(value: unknown) {
    const input = object(value)
    onlyFields(input, ['tenantId', 'email', 'password'])
    const id = tenantId(input.tenantId),
      address = email(input.email)
    const suppliedPassword =
      typeof input.password === 'string' && input.password.length <= 256
        ? input.password
        : fail(400, 'invalid_password')
    const initial = this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND email=?', id, address)
    const valid = await verifyPassword(suppliedPassword, initial?.password_hash ?? null)
    return this.store.transaction(() => {
      const user = this.store.one<UserRow>('SELECT * FROM users WHERE tenant_id=? AND email=?', id, address)
      const tenant = this.store.one<{ status: string }>('SELECT status FROM tenants WHERE id=?', id)
      if (
        !valid ||
        !user ||
        user.status !== 'active' ||
        tenant?.status !== 'active' ||
        user.password_hash !== initial?.password_hash
      )
        return fail(401, 'invalid_credentials')
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
      return { token, tenantId: id, expiresAt, user: publicUser(user) }
    })
  }
  private authenticateHash(hash: string): Principal {
    const session = this.store.one<{ tenant_id: string; user_id: string }>(
      'SELECT tenant_id,user_id FROM sessions WHERE hash=? AND expires_at>?',
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
  private require(principal: Principal, permission: string) {
    if (!permits(principal.role.permissions, permission)) fail(403, 'forbidden')
  }
  permissions(principal: Principal) {
    return {
      userId: principal.user.id,
      username: principal.user.name,
      roles: [principal.role],
      permissions: principal.role.permissions,
      routes: Object.entries(policies)
        .filter(([, policy]) => policy.permission && permits(principal.role.permissions, policy.permission))
        .map(([path]) => path),
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
    return publicRole(row)
  }
  list(principal: Principal, resource: Resource, value: unknown) {
    this.require(principal, `${resourcePermission[resource]}:read`)
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
    const where = `tenant_id=?${term ? ` AND (${searchFields[resource].map((field) => `${field} LIKE ? ESCAPE '\\'`).join(' OR ')})` : ''}`
    const bindings = [principal.tenantId, ...(term ? searchFields[resource].map(() => pattern) : [])]
    const total =
      this.store.one<{ total: number }>(`SELECT COUNT(*) AS total FROM ${resource} WHERE ${where}`, ...bindings)
        ?.total ?? 0
    const rows = this.store.all<Record<string, unknown>>(
      `SELECT ${selects[resource]} FROM ${resource} WHERE ${where} ORDER BY ${sort} ${order},id ASC LIMIT ? OFFSET ?`,
      ...bindings,
      pageSize,
      (page - 1) * pageSize
    )
    return { items: resource === 'roles' ? rows.map((row) => publicRole(row as unknown as RoleRow)) : rows, total }
  }
  getOne(principal: Principal, resource: Resource, id: string) {
    this.require(principal, `${resourcePermission[resource]}:read`)
    const row = this.store.one<Record<string, unknown>>(
      `SELECT ${selects[resource]} FROM ${resource} WHERE tenant_id=? AND id=?`,
      principal.tenantId,
      id
    )
    if (!row) return fail(404, 'record_not_found')
    return resource === 'roles' ? publicRole(row as unknown as RoleRow) : row
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
    return { name: text(input.name, 'name'), code, permissions: [...new Set(input.permissions as string[])] }
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
  async write(
    principal: Principal,
    resource: 'users' | 'roles',
    action: 'create' | 'update' | 'delete',
    id: string | undefined,
    value: unknown
  ) {
    this.require(principal, `${resourcePermission[resource]}:${action}`)
    const input = action === 'delete' ? {} : object(value)
    onlyFields(
      input,
      resource === 'users' ? ['name', 'email', 'role', 'status', 'password'] : ['name', 'code', 'permissions']
    )
    const passwordHash = input.password === undefined ? undefined : await hashPassword(password(input.password))
    try {
      return this.store.transaction(() => {
        // Recheck after asynchronous password hashing, inside the write transaction.
        const actor = this.authenticateHash(principal.sessionHash)
        this.require(actor, `${resourcePermission[resource]}:${action}`)
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
          const previous = old ? publicRole(old as unknown as RoleRow) : undefined
          if (previous?.code === reservedRole || input.code === reservedRole) fail(409, 'protected_role')
          if (previous && !canDelegate(actor.role.permissions, previous.permissions)) fail(403, 'grant_escalation')
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
            if (!canDelegate(actor.role.permissions, next.permissions)) fail(403, 'grant_escalation')
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
          }
        } else {
          const previous = old as unknown as User | undefined
          if (previous && !canDelegate(actor.role.permissions, this.role(actor.tenantId, previous.role).permissions))
            fail(403, 'grant_escalation')
          if (action === 'delete') {
            this.protectLastAdmin(actor, previous!)
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
            if (!canDelegate(actor.role.permissions, role.permissions)) fail(403, 'grant_escalation')
            if (previous) this.protectLastAdmin(actor, previous, next as Omit<User, 'id'>)
            if (action === 'create')
              this.store.run(
                'INSERT INTO users VALUES (?,?,?,?,?,?,?)',
                recordId,
                actor.tenantId,
                next.name,
                next.email,
                next.role,
                String(next.status),
                passwordHash ?? null
              )
            else {
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
              if (
                passwordHash !== undefined ||
                next.role !== previous!.role ||
                next.status !== previous!.status ||
                next.email !== previous!.email
              )
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
        return resource === 'roles' ? publicRole(row as unknown as RoleRow) : row
      })
    } catch (error) {
      if (error instanceof BusinessError) throw error
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) fail(409, 'duplicate_record')
      throw error
    }
  }
}
