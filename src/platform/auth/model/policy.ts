import defaultPolicies from '../../../../config/route-policy.json'
import enterprisePolicies from '../../../../config/route-policy.enterprise.json'
import type { PermissionCode, UserPermission } from './permission'
import { matchPath } from 'react-router-dom'
import { getEnvBool } from '@platform/config/env'
import { permits, scopeFor, canUseScope } from './accessDecision'

export interface RoutePolicy {
  permission?: PermissionCode
  title?: string
  i18nKey?: string
  availability?: 'enterprise'
  access?: 'authenticated'
  menuGroup?: boolean
  menu?: { parent?: string; order: number; icon?: string }
}
export const routePolicies: Readonly<Record<string, RoutePolicy>> = (
  typeof __APP_ENTERPRISE__ !== 'undefined' && __APP_ENTERPRISE__ ? enterprisePolicies : defaultPolicies
) as Record<string, RoutePolicy>
export const routePermissionMap: Readonly<Record<string, PermissionCode>> = Object.fromEntries(
  Object.entries(routePolicies).flatMap(([path, policy]) => (policy.permission ? [[path, policy.permission]] : []))
)

export function getRoutePolicy(path: string): RoutePolicy | undefined {
  const normalized = path.replace(/\/\*$/, '') || '/'
  if (routePolicies[normalized]) return routePolicies[normalized]
  const dynamic = Object.keys(routePolicies)
    .filter((key) => key.includes(':') && matchPath({ path: key, end: true }, normalized))
    .sort((left, right) => right.length - left.length)[0]
  if (dynamic) return routePolicies[dynamic]
  const inherited = Object.keys(routePolicies)
    .filter((key) => key !== '/' && normalized.startsWith(`${key}/`))
    .sort((left, right) => right.length - left.length)[0]
  return inherited ? routePolicies[inherited] : undefined
}

export function matchesPermission(permission: PermissionCode, granted: readonly PermissionCode[]): boolean {
  return permits(granted, permission)
}

/** Keep one role's grant and scope together; never combine them across roles. */
export function hasEffectivePermission(
  current: UserPermission,
  permission: PermissionCode,
  recordId?: string
): boolean {
  if (!current.roles.length) return matchesPermission(permission, current.permissions)
  const resource = permission.split(':', 1)[0]
  return current.roles.some((role) => {
    if (!permits(role.permissions, permission)) return false
    if (resource !== 'user' && resource !== 'role') return true
    const scope = scopeFor(role.scopes, resource)
    return scope.mode !== 'deny' && (!recordId || canUseScope(scope, recordId))
  })
}

export interface AccessRequirements {
  permission?: PermissionCode | PermissionCode[]
  roles?: string | string[]
  requireAll?: boolean
}

/** null means the route whitelist must decide; permissions and roles are combined. */
export function evaluateAccessRequirements(current: UserPermission, required: AccessRequirements): boolean | null {
  const permissions = required.permission
  const roles = required.roles
  if (!permissions && !roles) return null
  const combine = (values: boolean[]) => (required.requireAll ? values.every(Boolean) : values.some(Boolean))
  const permissionAllowed =
    !permissions ||
    (Array.isArray(permissions)
      ? combine(permissions.map((permission) => hasEffectivePermission(current, permission)))
      : hasEffectivePermission(current, permissions))
  const roleCodes = current.roles.map((role) => role.code)
  const roleAllowed =
    !roles ||
    (Array.isArray(roles) ? combine(roles.map((role) => roleCodes.includes(role))) : roleCodes.includes(roles))
  return permissionAllowed && roleAllowed
}

/** Route policies override broad route grants; unmapped pages need an explicit whitelist. */
export function canAccessPath(current: UserPermission, pathname: string): boolean {
  const policy = getRoutePolicy(pathname)
  if (policy?.availability === 'enterprise' && getEnvBool('REACT_APP_USE_MOCK', false)) return false
  if (policy?.permission) return hasEffectivePermission(current, policy.permission)
  return (
    current.permissions.includes('*:*') ||
    current.routes.some((path) => path === '*' || Boolean(matchPath({ path, end: true }, pathname)))
  )
}
