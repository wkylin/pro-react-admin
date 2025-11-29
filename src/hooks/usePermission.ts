/**
 * 权限检查 Hook
 * 提供便捷的权限检查方法
 */

import { useState, useEffect, useCallback } from 'react'
import { PermissionCode } from '../types/permission'
import { permissionService } from '../service/permissionService'

/**
 * 使用权限检查 Hook
 */
export const usePermission = () => {
  const [permissions, setPermissions] = useState<string[]>([])
  const [roles, setRoles] = useState<string[]>([])
  const [routes, setRoutes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * 加载权限信息
   */
  const loadPermissions = useCallback(async () => {
    try {
      setLoading(true)
      const userPermissions = await permissionService.getPermissions()
      setPermissions(userPermissions.permissions)
      setRoles(userPermissions.roles.map((role) => role.code))
      setRoutes(userPermissions.routes)
    } catch (error) {
      console.error('加载权限失败:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPermissions()
  }, [loadPermissions])

  /**
   * 检查单个权限
   */
  const hasPermission = useCallback(async (permission: PermissionCode): Promise<boolean> => {
    return permissionService.hasPermission(permission)
  }, [])

  /**
   * 检查多个权限（全部需要）
   */
  const hasAllPermissions = useCallback(async (permissions: PermissionCode[]) => {
    return permissionService.hasAllPermissions(permissions)
  }, [])

  /**
   * 检查多个权限（任一即可）
   */
  const hasAnyPermission = useCallback(async (permissions: PermissionCode[]) => {
    return permissionService.hasAnyPermission(permissions)
  }, [])

  /**
   * 检查角色
   */
  const hasRole = useCallback(async (roleCode: string): Promise<boolean> => {
    return permissionService.hasRole(roleCode)
  }, [])

  /**
   * 检查多个角色（全部需要）
   */
  const hasAllRoles = useCallback(async (roleCodes: string[]) => {
    return permissionService.hasAllRoles(roleCodes)
  }, [])

  /**
   * 检查多个角色（任一即可）
   */
  const hasAnyRole = useCallback(async (roleCodes: string[]) => {
    return permissionService.hasAnyRole(roleCodes)
  }, [])

  /**
   * 检查路由权限
   */
  const canAccessRoute = useCallback(async (routePath: string): Promise<boolean> => {
    return permissionService.canAccessRoute(routePath)
  }, [])

  /**
   * 刷新权限
   */
  const refreshPermissions = useCallback(async () => {
    await permissionService.syncPermissions()
    await loadPermissions()
  }, [loadPermissions])

  return {
    // 权限列表
    permissions,
    roles,
    routes,
    loading,
    // 检查方法
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    hasRole,
    hasAllRoles,
    hasAnyRole,
    canAccessRoute,
    // 操作方法
    refreshPermissions,
  }
}

/**
 * 检查单个权限的 Hook
 */
export const useCheckPermission = (permission: PermissionCode) => {
  const [hasPermission, setHasPermission] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      try {
        setLoading(true)
        const result = await permissionService.hasPermission(permission)
        setHasPermission(result)
      } catch (error) {
        console.error('检查权限失败:', error)
        setHasPermission(false)
      } finally {
        setLoading(false)
      }
    }

    check()
  }, [permission])

  return { hasPermission, loading }
}

/**
 * 检查路由权限的 Hook
 */
export const useCheckRoute = (routePath: string) => {
  const [canAccess, setCanAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      try {
        setLoading(true)
        const result = await permissionService.canAccessRoute(routePath)
        setCanAccess(result)
      } catch (error) {
        console.error('检查路由权限失败:', error)
        setCanAccess(false)
      } finally {
        setLoading(false)
      }
    }

    check()
  }, [routePath])

  return { canAccess, loading }
}
