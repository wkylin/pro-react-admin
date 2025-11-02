/**
 * 权限守卫组件
 * 根据权限控制子组件的显示/隐藏
 */

import React, { useState, useEffect, ReactNode } from 'react'
import { PermissionCode } from '../../types/permission'
import { permissionService } from '../../service/permissionService'
import { Spin } from 'antd'

interface PermissionGuardProps {
  /**
   * 单个权限代码
   */
  permission?: PermissionCode
  /**
   * 多个权限代码（任一满足即可）
   */
  permissions?: PermissionCode[]
  /**
   * 多个权限代码（全部需要）
   */
  requireAll?: boolean
  /**
   * 角色代码
   */
  role?: string
  /**
   * 多个角色代码（任一满足即可）
   */
  roles?: string[]
  /**
   * 是否要求拥有所有角色（默认是或关系）
   */
  requireAllRoles?: boolean
  /**
   * 无权限时显示的内容
   */
  fallback?: ReactNode
  /**
   * 权限检查中显示的内容
   */
  loading?: ReactNode
  /**
   * 子组件
   */
  children: ReactNode
}

/**
 * 权限守卫组件
 * 根据权限控制子组件的渲染
 */
const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  requireAllRoles = false,
  fallback = null,
  loading = <Spin size="small" />,
  children,
}) => {
  const [hasPermission, setHasPermission] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkPermission = async () => {
      try {
        setIsLoading(true)
        let result = false

        // 检查权限
        if (permission) {
          result = await permissionService.hasPermission(permission)
        } else if (permissions && permissions.length > 0) {
          if (requireAll) {
            const checkResult = await permissionService.hasAllPermissions(permissions)
            result = checkResult.hasPermission
          } else {
            const checkResult = await permissionService.hasAnyPermission(permissions)
            result = checkResult.hasPermission
          }
        }

        // 检查角色（如果权限检查通过，才检查角色）
        if (result && role) {
          result = await permissionService.hasRole(role)
        } else if (result && roles && roles.length > 0) {
          if (requireAllRoles) {
            const checkResult = await permissionService.hasAllRoles(roles)
            result = checkResult.hasPermission
          } else {
            const checkResult = await permissionService.hasAnyRole(roles)
            result = checkResult.hasPermission
          }
        }

        // 如果既没有权限也没有角色要求，默认显示
        if (!permission && !permissions && !role && !roles) {
          result = true
        }

        setHasPermission(result)
      } catch (error) {
        console.error('权限检查失败:', error)
        setHasPermission(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPermission()
  }, [permission, permissions, requireAll, role, roles, requireAllRoles])

  if (isLoading) {
    return <>{loading}</>
  }

  if (!hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default PermissionGuard
