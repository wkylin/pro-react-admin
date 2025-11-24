/**
 * 权限相关 API
 * 优先调用后端接口，使用环境变量 `REACT_APP_USE_MOCK=true` 开启本地 Mock 回退
 */

import { UserPermission, Role, PermissionCode } from '../../types/permission'
import { mockGetUserPermissions, mockGetRoles, mockCheckPermission } from '../../mock/permission'
import request from '@/service/request'

export type Permission = {
  code: string
  name?: string
}

const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'

/**
 * 获取当前用户权限信息
 */
export const getUserPermissions = async (userId?: string): Promise<UserPermission> => {
  if (USE_MOCK) {
    return mockGetUserPermissions(userId)
  }

  try {
    const response = (await request.get('/api/permissions/current')) as any
    if (response && typeof response === 'object' && 'data' in response && 'code' in response) {
      return response.data as UserPermission
    }
    return response as UserPermission
  } catch (error) {
    console.error('获取用户权限失败，回退到 Mock:', error)
    return mockGetUserPermissions(userId)
  }
}

/**
 * 获取所有角色列表
 */
export const getRoles = async (): Promise<Role[]> => {
  if (USE_MOCK) {
    return mockGetRoles()
  }
  try {
    const response = (await request.get('/api/roles')) as any
    if (response && typeof response === 'object' && 'data' in response && 'code' in response) {
      return response.data as Role[]
    }
    return response as Role[]
  } catch (error) {
    console.error('获取角色列表失败，回退到 Mock:', error)
    return mockGetRoles()
  }
}

/**
 * 检查用户是否有指定权限（前端基于后端返回的权限列表在本地做高效匹配）
 */
export const checkPermission = async (permission: PermissionCode, userId?: string): Promise<boolean> => {
  const userPermissions = await getUserPermissions(userId)
  return mockCheckPermission(permission, userPermissions.permissions)
}

export const checkAllPermissions = async (permissions: PermissionCode[], userId?: string): Promise<boolean> => {
  const userPermissions = await getUserPermissions(userId)
  return permissions.every((permission) => mockCheckPermission(permission, userPermissions.permissions))
}

export const checkAnyPermission = async (permissions: PermissionCode[], userId?: string): Promise<boolean> => {
  const userPermissions = await getUserPermissions(userId)
  return userPermissions.permissions.some((p) => permissions.includes(p as PermissionCode))
}

export const getUserRoutes = async (userId?: string): Promise<string[]> => {
  const userPermissions = await getUserPermissions(userId)
  return userPermissions.routes || []
}

export async function getCurrentPermissions(): Promise<Permission[]> {
  try {
    const response = await request.get('/api/permissions/current')
    const list = (response?.data ?? response) as unknown
    if (Array.isArray(list)) return list.filter(Boolean) as Permission[]
  } catch (e) {
    console.warn('getCurrentPermissions failed, returning empty list', e)
  }
  return []
}
