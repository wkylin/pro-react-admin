/**
 * 权限相关 API
 * 优先调用后端接口，使用环境变量 `REACT_APP_USE_MOCK=true` 开启本地 Mock 回退
 */

import { UserPermission, Role, PermissionCode } from '../../types/permission'
import { mockGetUserPermissions, mockGetRoles, mockCheckPermission } from '../../mock/permission'
import request from '@/service/request'
import { getEnv, getEnvBool } from '@utils/env'

export type Permission = {
  code: string
  name?: string
}

// Prefer mock when backend base URL is not configured to avoid 404s during static preview
const BASE_URL = getEnv('APP_BASE_URL', '')
const USE_MOCK = getEnvBool('REACT_APP_USE_MOCK', false) || !BASE_URL

const normalizeUserPermissions = (input: any): UserPermission => {
  const safe = input && typeof input === 'object' ? input : {}
  return {
    userId: typeof safe.userId === 'string' ? safe.userId : '',
    username: typeof safe.username === 'string' ? safe.username : '',
    roles: Array.isArray(safe.roles) ? safe.roles.filter(Boolean) : [],
    permissions: Array.isArray(safe.permissions) ? safe.permissions.filter(Boolean) : [],
    routes: Array.isArray(safe.routes) ? safe.routes.filter(Boolean) : [],
  }
}

/**
 * 获取当前用户权限信息
 */
export const getUserPermissions = async (userId?: string): Promise<UserPermission> => {
  if (USE_MOCK) {
    return normalizeUserPermissions(await mockGetUserPermissions(userId))
  }

  try {
    const response = (await request.get('/api/permissions/current')) as any
    if (response && typeof response === 'object' && 'data' in response && 'code' in response) {
      return normalizeUserPermissions(response.data)
    }
    return normalizeUserPermissions(response)
  } catch (error) {
    console.error('获取用户权限失败，回退到 Mock:', error)
    return normalizeUserPermissions(await mockGetUserPermissions(userId))
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
  return userPermissions.permissions.some((p) => permissions.includes(p))
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
