import policies from '../../../../config/route-policy.json'
import type { PermissionCode, UserPermission } from './permission'

export interface RoutePolicy {
  permission?: PermissionCode
  title?: string
  i18nKey?: string
  menuGroup?: boolean
}
export const routePolicies: Readonly<Record<string, RoutePolicy>> = policies as Record<string, RoutePolicy>
export const routePermissionMap: Readonly<Record<string, PermissionCode>> = Object.fromEntries(
  Object.entries(routePolicies).flatMap(([path, policy]) => (policy.permission ? [[path, policy.permission]] : []))
)

export function getRoutePolicy(path: string): RoutePolicy | undefined {
  const normalized = path.replace(/\/\*$/, '') || '/'
  if (routePolicies[normalized]) return routePolicies[normalized]
  const inherited = Object.keys(routePolicies)
    .filter((key) => key !== '/' && normalized.startsWith(`${key}/`))
    .sort((left, right) => right.length - left.length)[0]
  return inherited ? routePolicies[inherited] : undefined
}

export function matchesPermission(permission: PermissionCode, granted: readonly PermissionCode[]): boolean {
  const [resource, action] = permission.split(':')
  return (
    granted.includes('*:*') ||
    granted.includes(permission) ||
    granted.includes(resource as PermissionCode) ||
    Boolean(action && granted.includes(`${resource}:*` as PermissionCode))
  )
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
      ? combine(permissions.map((permission) => matchesPermission(permission, current.permissions)))
      : matchesPermission(permissions, current.permissions))
  const roleCodes = current.roles.map((role) => role.code)
  const roleAllowed =
    !roles ||
    (Array.isArray(roles) ? combine(roles.map((role) => roleCodes.includes(role))) : roleCodes.includes(roles))
  return permissionAllowed && roleAllowed
}
