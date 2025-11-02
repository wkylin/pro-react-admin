/**
 * 权限按钮组件
 * 根据权限控制按钮的显示/隐藏和禁用状态
 */

import React from 'react'
import { Button, ButtonProps } from 'antd'
import PermissionGuard from './PermissionGuard'

interface AuthButtonProps extends ButtonProps {
  /**
   * 权限代码
   */
  permission?: string
  /**
   * 多个权限代码（任一满足即可）
   */
  permissions?: string[]
  /**
   * 是否要求拥有所有权限
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
   * 是否要求拥有所有角色
   */
  requireAllRoles?: boolean
  /**
   * 无权限时是否禁用按钮（默认隐藏）
   */
  hideWhenNoPermission?: boolean
  /**
   * 无权限时的提示文本
   */
  noPermissionText?: string
  /**
   * 按钮文本
   */
  children: React.ReactNode
}

/**
 * 权限按钮组件
 */
const AuthButton: React.FC<AuthButtonProps> = ({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  requireAllRoles = false,
  hideWhenNoPermission = true,
  noPermissionText = '无权限',
  children,
  ...buttonProps
}) => {
  // 构建 PermissionGuard 的 props
  const guardProps: any = {
    permission: permission as any,
    permissions: permissions as any,
    requireAll,
    requireAllRoles,
  }

  // 只有当 role 或 roles 有值时才添加
  if (role) {
    guardProps.role = role
  }
  if (roles) {
    guardProps.roles = roles
  }

  if (hideWhenNoPermission) {
    // 隐藏按钮
    return (
      <PermissionGuard {...guardProps}>
        <Button {...buttonProps}>{children}</Button>
      </PermissionGuard>
    )
  } else {
    // 禁用按钮
    return (
      <PermissionGuard
        {...guardProps}
        fallback={
          <Button {...buttonProps} disabled title={noPermissionText}>
            {children}
          </Button>
        }
      >
        <Button {...buttonProps}>{children}</Button>
      </PermissionGuard>
    )
  }
}

export default AuthButton
