import { isRecord } from '@platform/api/core/response'
import type { ResourceDefinitions } from '@platform/data/provider'

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
  return {
    id: text(value.id, 'id'),
    name: text(value.name, 'name'),
    code,
    permissions: [...new Set(value.permissions as string[])],
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
export const administrationResources: ResourceDefinitions<AdministrationSchema> = {
  users: { path: '/api/admin/users', parse: parseUser },
  roles: { path: '/api/admin/roles', parse: parseRole },
  audit: { path: '/api/admin/audit', parse: parseAudit, readOnly: true },
}
