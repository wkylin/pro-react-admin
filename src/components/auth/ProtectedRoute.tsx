import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from '@utils/publicFn'
import { permissionService } from '@src/service/permissionService'
import type { PermissionCode } from '@src/types/permission'

interface ProtectedRouteProps {
  children: React.ReactNode
  // 可选的权限/角色检查
  permission?: PermissionCode | PermissionCode[]
  roles?: string[]
  requireAll?: boolean
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  roles,
  requireAll = false,
  fallback,
}) => {
  // Token 检查（保持原有逻辑）
  const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  // 如果没有传入权限/角色要求，直接渲染（保持向下兼容）
  const needCheck = !!permission || (roles && roles.length > 0)
  const [allowed, setAllowed] = useState<boolean>(!needCheck)
  const [checking, setChecking] = useState<boolean>(!!needCheck)

  useEffect(() => {
    if (!needCheck) return

    let alive = true
    const checkPermissions = async () => {
      try {
        let hasAccess = true

        // 权限检查
        if (permission) {
          if (Array.isArray(permission)) {
            if (requireAll) {
              const result = await permissionService.hasAllPermissions(permission)
              hasAccess = result.hasPermission
            } else {
              const result = await permissionService.hasAnyPermission(permission)
              hasAccess = result.hasPermission
            }
          } else {
            hasAccess = await permissionService.hasPermission(permission)
          }
        }

        // 角色检查
        if (hasAccess && roles && roles.length > 0) {
          if (requireAll) {
            const result = await permissionService.hasAllRoles(roles)
            hasAccess = result.hasPermission
          } else {
            const result = await permissionService.hasAnyRole(roles)
            hasAccess = result.hasPermission
          }
        }

        if (alive) {
          setAllowed(hasAccess)
        }
      } catch (error) {
        console.error('ProtectedRoute 权限检查失败:', error)
        if (alive) {
          setAllowed(false)
        }
      } finally {
        if (alive) {
          setChecking(false)
        }
      }
    }

    checkPermissions()

    return () => {
      alive = false
    }
  }, [permission, roles, requireAll, needCheck])

  // 权限检查中，显示空白或加载状态
  if (checking) {
    return null
  }

  // 权限不足，显示 fallback 或跳转 403
  if (!allowed) {
    return fallback ? <>{fallback}</> : <Navigate to="/403" replace />
  }

  return <>{children}</>
}
