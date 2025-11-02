/**
 * 权限相关 API
 * 在实际项目中，这里应该调用真实的后端 API
 * 目前使用 Mock 数据模拟
 */

import { UserPermission, Role, PermissionCode } from '../../types/permission'
import { mockGetUserPermissions, mockGetRoles, mockCheckPermission } from '../../mock/permission'
import request from '../request'

/**
 * 获取当前用户权限信息
 */
export const getUserPermissions = async (userId?: string): Promise<UserPermission> => {
  // 开发环境使用 Mock 数据
  if (process.env.NODE_ENV === 'development' || !process.env.APP_BASE_URL) {
    return mockGetUserPermissions(userId)
  }

  // 生产环境调用真实 API
  try {
    const response = (await request.get('/api/permissions/current')) as any
    // 如果返回的是包装结构 { code, message, data }，则取 data
    // 如果返回的直接是数据，则直接使用
    if (response && typeof response === 'object' && 'data' in response && 'code' in response) {
      return response.data as UserPermission
    }
    return response as UserPermission
  } catch (error) {
    console.error('获取用户权限失败:', error)
    // 降级到 Mock 数据
    return mockGetUserPermissions(userId)
  }
}

/**
 * 获取所有角色列表
 */
export const getRoles = async (): Promise<Role[]> => {
  // 开发环境使用 Mock 数据
  if (process.env.NODE_ENV === 'development' || !process.env.APP_BASE_URL) {
    return mockGetRoles()
  }

  // 生产环境调用真实 API
  try {
    const response = (await request.get('/api/roles')) as any
    // 如果返回的是包装结构 { code, message, data }，则取 data
    // 如果返回的直接是数据，则直接使用
    if (response && typeof response === 'object' && 'data' in response && 'code' in response) {
      return response.data as Role[]
    }
    return response as Role[]
  } catch (error) {
    console.error('获取角色列表失败:', error)
    return mockGetRoles()
  }
}

/**
 * 检查用户是否有指定权限
 */
export const checkPermission = async (permission: PermissionCode, userId?: string): Promise<boolean> => {
  // 获取用户权限
  const userPermissions = await getUserPermissions(userId)
  return mockCheckPermission(permission, userPermissions.permissions)
}

/**
 * 检查用户是否有多个权限（全部需要）
 */
export const checkAllPermissions = async (permissions: PermissionCode[], userId?: string): Promise<boolean> => {
  const userPermissions = await getUserPermissions(userId)
  return permissions.every((permission) => mockCheckPermission(permission, userPermissions.permissions))
}

/**
 * 检查用户是否有多个权限（任一即可）
 */
export const checkAnyPermission = async (permissions: PermissionCode[], userId?: string): Promise<boolean> => {
  const userPermissions = await getUserPermissions(userId)
  return permissions.some((permission) => mockCheckPermission(permission, userPermissions.permissions))
}

/**
 * 获取用户可访问的路由列表
 */
export const getUserRoutes = async (userId?: string): Promise<string[]> => {
  const userPermissions = await getUserPermissions(userId)
  return userPermissions.routes || []
}
