import { isRecord } from '@platform/api/core/response'
import type { ResourceDefinitions } from '@platform/data/provider'
import type { ResourceScopes } from '@platform/auth/model/accessDecision'

export interface ManagedUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'disabled'
}
export interface ManagedRole {
  id: string
  name: string
  code: string
  permissions: string[]
  scopes?: ResourceScopes
}
export interface ManagedTenant {
  id: string
  name: string
  status: 'active' | 'disabled'
  adminEmail?: string | null
  userCount?: number
  tenantId?: string
  adminName?: string
  adminPassword?: string
}
export interface AuditEntry {
  id: string
  actor: string
  action: string
  resource: string
  recordId: string
  at: string
}
export interface AdministrationSchema {
  users: ManagedUser
  roles: ManagedRole
  tenants: ManagedTenant
  audit: AuditEntry
}
const text = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid ${field}`)
  return value.trim()
}
export function parseUser(value: unknown): ManagedUser {
  if (!isRecord(value) || !['active', 'disabled'].includes(String(value.status))) throw new Error('Invalid user')
  const email = text(value.email, 'email')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email')
  return {
    id: text(value.id, 'id'),
    name: text(value.name, 'name'),
    email,
    role: text(value.role, 'role'),
    status: value.status as ManagedUser['status'],
  }
}
export function parseRole(value: unknown): ManagedRole {
  if (
    !isRecord(value) ||
    !Array.isArray(value.permissions) ||
    !value.permissions.every(
      (entry) =>
        typeof entry === 'string' &&
        /^(?:[a-z][a-z0-9-]*:(?:create|read|update|delete|export|import|approve|reject|\*)|\*:\*)$/.test(entry)
    )
  )
    throw new Error('Invalid role')
  const code = text(value.code, 'code')
  if (!/^[a-z][a-z0-9_-]*$/.test(code)) throw new Error('Invalid role code')
  const scopes: ResourceScopes = {}
  if (value.scopes !== undefined) {
    if (!isRecord(value.scopes) || Object.keys(value.scopes).some((key) => key !== 'user' && key !== 'role'))
      throw new Error('Invalid role scopes')
    for (const resource of ['user', 'role'] as const) {
      const scope = value.scopes[resource]
      if (scope === undefined) continue
      if (
        !isRecord(scope) ||
        !['global', 'restricted', 'deny'].includes(String(scope.mode)) ||
        !Array.isArray(scope.ids) ||
        !scope.ids.every((id) => typeof id === 'string' && id.length > 0) ||
        (scope.mode !== 'restricted' && scope.ids.length > 0)
      )
        throw new Error('Invalid role scopes')
      scopes[resource] = {
        mode: scope.mode as 'global' | 'restricted' | 'deny',
        ids: [...new Set(scope.ids as string[])],
      }
    }
  }
  return {
    id: text(value.id, 'id'),
    name: text(value.name, 'name'),
    code,
    permissions: [...new Set(value.permissions as string[])],
    scopes,
  }
}
export function parseAudit(value: unknown): AuditEntry {
  if (!isRecord(value) || typeof value.at !== 'string' || !Number.isFinite(Date.parse(value.at)))
    throw new Error('Invalid audit event')
  return {
    id: text(value.id, 'id'),
    actor: text(value.actor, 'actor'),
    action: text(value.action, 'action'),
    resource: text(value.resource, 'resource'),
    recordId: text(value.recordId, 'recordId'),
    at: value.at,
  }
}
export function parseTenant(value: unknown): ManagedTenant {
  if (!isRecord(value) || !['active', 'disabled'].includes(String(value.status))) throw new Error('Invalid tenant')
  const id = text(value.id, 'tenant ID')
  if (!/^[a-z][a-z0-9_-]*$/.test(id)) throw new Error('Invalid tenant ID')
  if (value.adminEmail !== null && value.adminEmail !== undefined && typeof value.adminEmail !== 'string')
    throw new Error('Invalid tenant admin email')
  if (value.userCount !== undefined && (!Number.isSafeInteger(value.userCount) || Number(value.userCount) < 0))
    throw new Error('Invalid tenant user count')
  return {
    id,
    name: text(value.name, 'tenant name'),
    status: value.status as ManagedTenant['status'],
    adminEmail: value.adminEmail as string | null | undefined,
    userCount: value.userCount as number | undefined,
  }
}
export const administrationResources: ResourceDefinitions<AdministrationSchema> = {
  users: { path: '/api/admin/users', parse: parseUser },
  roles: { path: '/api/admin/roles', parse: parseRole },
  tenants: { path: '/api/admin/tenants', parse: parseTenant },
  audit: { path: '/api/admin/audit', parse: parseAudit, readOnly: true },
}
