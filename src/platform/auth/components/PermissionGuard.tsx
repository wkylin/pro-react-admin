import type { FC, ReactNode } from 'react'
import { Spin } from 'antd'
import type { PermissionCode } from '../model/permission'
import { usePermission } from '../hooks/usePermission'
import { evaluateAccessRequirements } from '../model/policy'

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

const PermissionGuard: FC<PermissionGuardProps> = ({
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
  const { current, loading: checking } = usePermission()
  const requiredPermission = permission || (permissions?.length ? permissions : undefined)
  const requiredRoles = role || (roles?.length ? roles : undefined)
  if (!requiredPermission && !requiredRoles) return <>{children}</>
  if (checking && !current) return <>{loading}</>
  const permissionAllowed =
    current && (evaluateAccessRequirements(current, { permission: requiredPermission, requireAll }) ?? true)
  const rolesAllowed =
    current && (evaluateAccessRequirements(current, { roles: requiredRoles, requireAll: requireAllRoles }) ?? true)
  return permissionAllowed && rolesAllowed ? <>{children}</> : <>{fallback}</>
}

export default PermissionGuard
