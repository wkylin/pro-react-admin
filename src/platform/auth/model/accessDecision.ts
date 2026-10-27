/** The same grant and resource-scope rules are used by the browser and enterprise API. */
export type ScopedResource = 'user' | 'role'
export type ScopeMode = 'global' | 'restricted' | 'deny'
export interface ResourceScope {
  mode: ScopeMode
  ids: string[]
}
export type ResourceScopes = Partial<Record<ScopedResource, ResourceScope>>

export function permits(grants: readonly string[], permission: string): boolean {
  const resource = permission.split(':', 1)[0]
  // Tenant administration is platform-wide; a tenant's *:* must never grant it.
  if (resource === 'tenant') return grants.includes(permission) || grants.includes('tenant:*')
  return grants.includes('*:*') || grants.includes(permission) || grants.includes(`${resource}:*`)
}

export function canDelegate(grants: readonly string[], requested: readonly string[]): boolean {
  return requested.every((permission) => permits(grants, permission))
}

export function scopeFor(scopes: ResourceScopes | undefined, resource: ScopedResource): ResourceScope {
  return scopes?.[resource] ?? { mode: 'global', ids: [] }
}

export function canUseScope(scope: ResourceScope, recordId?: string): boolean {
  if (scope.mode === 'deny') return false
  if (scope.mode === 'global') return true
  return Boolean(recordId && scope.ids.includes(recordId))
}

export function canDelegateScope(actor: ResourceScope, requested: ResourceScope): boolean {
  if (requested.mode === 'deny') return true
  if (actor.mode === 'global') return true
  if (actor.mode === 'deny' || requested.mode === 'global') return false
  return requested.ids.every((id) => actor.ids.includes(id))
}

export function scopedDecision(
  grants: readonly string[],
  scopes: ResourceScopes | undefined,
  permission: string,
  recordId?: string
): { allowed: boolean; reason: 'missing_permission' | 'scope_denied' | 'outside_scope' | 'allowed' } {
  if (!permits(grants, permission)) return { allowed: false, reason: 'missing_permission' }
  const resource = permission.split(':', 1)[0]
  if (resource !== 'user' && resource !== 'role') return { allowed: true, reason: 'allowed' }
  const scope = scopeFor(scopes, resource)
  if (scope.mode === 'deny') return { allowed: false, reason: 'scope_denied' }
  if (scope.mode === 'restricted' && !canUseScope(scope, recordId)) return { allowed: false, reason: 'outside_scope' }
  return { allowed: true, reason: 'allowed' }
}
