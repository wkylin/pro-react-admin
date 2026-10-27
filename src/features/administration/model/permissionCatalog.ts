import { routePolicies } from '@platform/auth/model/policy'
import { flattenRouteNodes, type RouteNode } from '@platform/navigation/routes'

/** The reference app's domain capabilities, also used by its read-only role matrix. */
export const permissionMatrixGroups = [
  { key: 'user', permissions: ['user:read', 'user:create', 'user:update', 'user:delete'] },
  { key: 'role', permissions: ['role:read', 'role:create', 'role:update', 'role:delete'] },
  { key: 'access', permissions: ['access:read', 'access:approve'] },
  { key: 'audit', permissions: ['audit:read'] },
  { key: 'tenant', permissions: ['tenant:read', 'tenant:create', 'tenant:update', 'tenant:delete'] },
] as const

export const enterprisePermissionCodes = [
  ...new Set([
    'home:read',
    ...permissionMatrixGroups.filter(({ key }) => key !== 'tenant').flatMap(({ permissions }) => permissions),
    'user:*',
    'role:*',
    'access:*',
  ]),
].sort()

/** The public showcase additionally exposes its technology demonstrations. */
export const showcasePermissionCodes = [
  ...new Set([
    ...enterprisePermissionCodes,
    '*:*',
    ...Object.values(routePolicies).flatMap((policy) => (policy.permission ? [policy.permission] : [])),
  ]),
]
  .filter((code) => !code.startsWith('tenant:'))
  .sort()

const isShowcaseProject = (projectId: string) => projectId === 'default' || projectId === 'projectA'

/** Only routes installed in this project contribute business grants. The policy file also contains unrelated showcases. */
function activeRoutePermissionCodes(routes: readonly RouteNode[]) {
  return [
    ...new Set(
      flattenRouteNodes(routes)
        .flatMap((route) => {
          const permission = route.meta?.permission
          return Array.isArray(permission) ? permission : permission ? [permission] : []
        })
        .filter((code): code is string => typeof code === 'string' && /^[a-z][a-z0-9-]*:[a-z*][a-z*0-9-]*$/.test(code))
        .filter((code) => !code.startsWith('tenant:'))
    ),
  ]
}

export function assignablePermissionCodes(
  projectId: string,
  existing: readonly string[] = [],
  routes: readonly RouteNode[] = []
) {
  const catalog = isShowcaseProject(projectId)
    ? showcasePermissionCodes
    : [...enterprisePermissionCodes, ...activeRoutePermissionCodes(routes)]
  // Keep historical grants visible while editing, even if their original route has been removed.
  return [...new Set([...catalog, ...existing])].sort()
}

export function permissionMatrixGroupsForProject(projectId: string, routes: readonly RouteNode[] = []) {
  const groups = new Map<string, string[]>(
    permissionMatrixGroups
      .filter(({ key }) => isShowcaseProject(projectId) || key !== 'tenant')
      .map(({ key, permissions }) => [key, [...permissions]])
  )
  if (!isShowcaseProject(projectId)) {
    for (const code of activeRoutePermissionCodes(routes)) {
      const [resource] = code.split(':')
      const permissions = groups.get(resource) ?? []
      if (!permissions.includes(code)) groups.set(resource, [...permissions, code])
    }
  }
  return [...groups].map(([key, permissions]) => ({ key, permissions }))
}

export function groupPermissionCodes(codes: readonly string[] = enterprisePermissionCodes) {
  const groups = new Map<string, string[]>()
  for (const code of codes) {
    const resource = code.split(':')[0]
    groups.set(resource, [...(groups.get(resource) ?? []), code])
  }
  return [...groups.entries()].map(([resource, permissions]) => ({ resource, permissions }))
}
