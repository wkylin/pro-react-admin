import { useEffect, useMemo, useSyncExternalStore } from 'react'
import type { PermissionCode } from '../model/permission'
import { permissionService } from '../services/permissionService'
import { matchesPermission, canAccessPath } from '../model/policy'

const emptyList: string[] = []
const actions = {
  hasPermission: (permission: PermissionCode) => permissionService.hasPermission(permission),
  hasAllPermissions: (permissions: PermissionCode[]) => permissionService.hasAllPermissions(permissions),
  hasAnyPermission: (permissions: PermissionCode[]) => permissionService.hasAnyPermission(permissions),
  hasRole: (role: string) => permissionService.hasRole(role),
  hasAllRoles: (roles: string[]) => permissionService.hasAllRoles(roles),
  hasAnyRole: (roles: string[]) => permissionService.hasAnyRole(roles),
  canAccessRoute: (path: string) => permissionService.canAccessRoute(path),
  refreshPermissions: () => permissionService.syncPermissions(),
}

/** All consumers observe one snapshot, including refresh, revocation and cross-tab logout. */
export function usePermission() {
  const snapshot = useSyncExternalStore(permissionService.subscribe, permissionService.getSnapshot)
  useEffect(() => {
    if (snapshot.status === 'idle') void permissionService.getPermissions()
  }, [snapshot.status])
  const current = snapshot.permissions
  const roles = useMemo(() => current?.roles.map((role) => role.code) ?? emptyList, [current])
  return {
    current,
    permissions: current?.permissions ?? emptyList,
    roles,
    routes: current?.routes ?? emptyList,
    loading: snapshot.status === 'idle' || snapshot.status === 'loading',
    status: snapshot.status,
    ...actions,
  }
}

export function useCheckPermission(permission: PermissionCode) {
  const { current, loading } = usePermission()
  return { hasPermission: Boolean(current && matchesPermission(permission, current.permissions)), loading }
}

export function useCheckRoute(routePath: string) {
  const { current, loading } = usePermission()
  return { canAccess: Boolean(current && canAccessPath(current, routePath)), loading }
}
