/** Service permissions fail closed. Demo permissions require an explicit build flag. */
import type { UserPermission, Role, PermissionCode } from '../model/permission'
import { mockGetUserPermissions, mockGetRoles } from '@platform/auth/mocks/permission'
import { hasEffectivePermission } from '../model/policy'
import request from '@platform/api/request'
import { getEnvBool } from '@platform/config/env'
import { isRecord, unwrapPayload } from '@platform/api/core/response'

export type Permission = { code: string; name?: string }
export const isDemoPermissionMode = (): boolean => getEnvBool('REACT_APP_USE_MOCK', false)

const isStringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isRole = (value: unknown): value is Role =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.name === 'string' &&
  typeof value.code === 'string' &&
  isStringList(value.permissions) &&
  (value.scopes === undefined ||
    (isRecord(value.scopes) &&
      Object.entries(value.scopes).every(
        ([resource, scope]) =>
          (resource === 'user' || resource === 'role') &&
          isRecord(scope) &&
          (scope.mode === 'global' || scope.mode === 'restricted' || scope.mode === 'deny') &&
          isStringList(scope.ids) &&
          (scope.mode === 'restricted' || scope.ids.length === 0)
      )))

export function parseUserPermissions(value: unknown): UserPermission {
  if (
    !isRecord(value) ||
    typeof value.userId !== 'string' ||
    typeof value.username !== 'string' ||
    !Array.isArray(value.roles) ||
    !value.roles.every(isRole) ||
    !isStringList(value.permissions) ||
    !isStringList(value.routes)
  ) {
    throw new Error('权限响应格式无效')
  }
  return {
    userId: value.userId,
    username: value.username,
    roles: value.roles,
    permissions: value.permissions as PermissionCode[],
    routes: value.routes,
  }
}

export async function getUserPermissions(userId?: string): Promise<UserPermission> {
  if (typeof __APP_DEMO__ !== 'undefined' ? __APP_DEMO__ : isDemoPermissionMode()) {
    return parseUserPermissions(await mockGetUserPermissions(userId))
  }
  const response: unknown = await request.get('/api/permissions/current', {}, { showError: false })
  return parseUserPermissions(unwrapPayload(response))
}

export async function getRoles(): Promise<Role[]> {
  if (typeof __APP_DEMO__ !== 'undefined' ? __APP_DEMO__ : isDemoPermissionMode()) {
    return mockGetRoles()
  }
  const response: unknown = await request.get('/api/roles', {}, { showError: false })
  const roles = unwrapPayload(response)
  if (!Array.isArray(roles) || !roles.every(isRole)) throw new Error('角色响应格式无效')
  return roles
}

export async function checkPermission(permission: PermissionCode, userId?: string): Promise<boolean> {
  return hasEffectivePermission(await getUserPermissions(userId), permission)
}

export async function checkAllPermissions(permissions: PermissionCode[], userId?: string): Promise<boolean> {
  const current = await getUserPermissions(userId)
  return permissions.every((permission) => hasEffectivePermission(current, permission))
}

export async function checkAnyPermission(permissions: PermissionCode[], userId?: string): Promise<boolean> {
  const current = await getUserPermissions(userId)
  return permissions.some((permission) => hasEffectivePermission(current, permission))
}

export async function getUserRoutes(userId?: string): Promise<string[]> {
  return (await getUserPermissions(userId)).routes
}

export async function getCurrentPermissions(): Promise<Permission[]> {
  return (await getUserPermissions()).permissions.map((code) => ({ code }))
}
