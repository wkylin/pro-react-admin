/**
 * 权限服务
 * 单例模式，提供权限检查和管理功能
 */

import { UserPermission, PermissionCode, Role, PermissionCheckResult } from '../types/permission'
import * as permissionAPI from './api/permission'

class PermissionService {
  private static instance: PermissionService
  private userPermissions: UserPermission | null = null
  private loadingPromise: Promise<UserPermission> | null = null
  private cacheExpireTime: number = 30 * 60 * 1000 // 30分钟
  private lastFetchTime: number = 0

  private constructor() {
    // 从 localStorage 恢复权限信息
    this.loadFromStorage()
  }

  static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService()
    }
    return PermissionService.instance
  }

  /**
   * 从 localStorage 加载权限信息
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('user_permissions')
      const lastFetch = localStorage.getItem('permissions_fetch_time')

      if (stored && lastFetch) {
        this.userPermissions = JSON.parse(stored)
        this.lastFetchTime = parseInt(lastFetch, 10)

        // 检查缓存是否过期
        if (Date.now() - this.lastFetchTime > this.cacheExpireTime) {
          this.userPermissions = null
          this.lastFetchTime = 0
        }
      }
    } catch (error) {
      console.error('加载权限信息失败:', error)
      this.userPermissions = null
    }
  }

  /**
   * 保存权限信息到 localStorage
   */
  private saveToStorage(permissions: UserPermission): void {
    try {
      localStorage.setItem('user_permissions', JSON.stringify(permissions))
      localStorage.setItem('permissions_fetch_time', Date.now().toString())
      this.userPermissions = permissions
      this.lastFetchTime = Date.now()
    } catch (error) {
      console.error('保存权限信息失败:', error)
    }
  }

  /**
   * 清除权限缓存
   */
  clearCache(): void {
    this.userPermissions = null
    this.lastFetchTime = 0
    localStorage.removeItem('user_permissions')
    localStorage.removeItem('permissions_fetch_time')
  }

  /**
   * 获取用户权限信息（带缓存）
   * @param forceRefresh 是否强制刷新
   * @param userId 用户ID（可选，用于获取特定用户的权限）
   */
  async getPermissions(forceRefresh: boolean = false, userId?: string): Promise<UserPermission> {
    // 如果强制刷新或缓存过期，重新获取
    const now = Date.now()
    const isExpired = now - this.lastFetchTime > this.cacheExpireTime

    if (forceRefresh || !this.userPermissions || isExpired) {
      // 如果已有请求正在进行，返回该请求的 Promise（避免重复请求）
      if (this.loadingPromise) {
        return this.loadingPromise
      }

      // 发起新的请求，添加超时和错误处理
      this.loadingPromise = Promise.race([
        permissionAPI.getUserPermissions(userId),
        new Promise<UserPermission>((_, reject) => {
          setTimeout(() => {
            reject(new Error('获取权限超时'))
          }, 3000) // 3秒超时
        }),
      ]).catch((error) => {
        console.error('获取权限失败:', error)
        // 如果有缓存，返回缓存（即使过期）
        if (this.userPermissions) {
          console.warn('使用过期缓存权限')
          return this.userPermissions
        }
        // 如果没有缓存，返回默认权限（普通用户）
        return {
          userId: '',
          username: '',
          roles: [],
          permissions: [],
          routes: [],
        }
      })

      try {
        const permissions = await this.loadingPromise
        this.saveToStorage(permissions)
        return permissions
      } catch (error) {
        console.error('获取权限出错:', error)
        // 如果出错且有缓存，返回缓存
        if (this.userPermissions) {
          return this.userPermissions
        }
        // 否则返回默认权限
        return {
          userId: '',
          username: '',
          roles: [],
          permissions: [],
          routes: [],
        }
      } finally {
        this.loadingPromise = null
      }
    }

    // 返回缓存的权限信息
    return this.userPermissions!
  }

  /**
   * 检查单个权限
   * @param permission 权限代码
   * @param forceRefresh 是否强制刷新权限缓存
   */
  async hasPermission(permission: PermissionCode, forceRefresh: boolean = false): Promise<boolean> {
    const permissions = await this.getPermissions(forceRefresh)

    // 超级权限
    if (permissions.permissions.includes('*:*')) {
      return true
    }

    // 精确匹配
    if (permissions.permissions.includes(permission)) {
      return true
    }

    // 通配符匹配
    const [resource, action] = permission.split(':')
    if (action && permissions.permissions.includes(`${resource}:*` as PermissionCode)) {
      return true
    }

    // 资源级权限
    if (permissions.permissions.includes(resource as PermissionCode)) {
      return true
    }

    return false
  }

  /**
   * 检查多个权限（全部需要）
   */
  async hasAllPermissions(
    permissions: PermissionCode[],
    forceRefresh: boolean = false
  ): Promise<PermissionCheckResult> {
    const missingPermissions: PermissionCode[] = []

    for (const permission of permissions) {
      const has = await this.hasPermission(permission, forceRefresh)
      if (!has) {
        missingPermissions.push(permission)
      }
    }

    const result: PermissionCheckResult = {
      hasPermission: missingPermissions.length === 0,
    }
    if (missingPermissions.length > 0) {
      result.missingPermissions = missingPermissions
    }
    return result
  }

  /**
   * 检查多个权限（任一即可）
   */
  async hasAnyPermission(permissions: PermissionCode[], forceRefresh: boolean = false): Promise<PermissionCheckResult> {
    for (const permission of permissions) {
      if (await this.hasPermission(permission, forceRefresh)) {
        return { hasPermission: true }
      }
    }

    return {
      hasPermission: false,
      missingPermissions: permissions,
    }
  }

  /**
   * 检查角色
   */
  async hasRole(roleCode: string, forceRefresh: boolean = false): Promise<boolean> {
    const permissions = await this.getPermissions(forceRefresh)
    return permissions.roles.some((role) => role.code === roleCode)
  }

  /**
   * 检查多个角色（全部需要）
   */
  async hasAllRoles(roleCodes: string[], forceRefresh: boolean = false): Promise<PermissionCheckResult> {
    const permissions = await this.getPermissions(forceRefresh)
    const userRoleCodes = permissions.roles.map((role) => role.code)
    const missingRoles = roleCodes.filter((code) => !userRoleCodes.includes(code))

    const result: PermissionCheckResult = {
      hasPermission: missingRoles.length === 0,
    }
    if (missingRoles.length > 0) {
      result.missingRoles = missingRoles
    }
    return result
  }

  /**
   * 检查多个角色（任一即可）
   */
  async hasAnyRole(roleCodes: string[], forceRefresh: boolean = false): Promise<PermissionCheckResult> {
    const permissions = await this.getPermissions(forceRefresh)
    const userRoleCodes = permissions.roles.map((role) => role.code)
    const hasRole = roleCodes.some((code) => userRoleCodes.includes(code))

    const result: PermissionCheckResult = {
      hasPermission: hasRole,
    }
    if (!hasRole) {
      result.missingRoles = roleCodes
    }
    return result
  }

  /**
   * 检查路由权限
   */
  async canAccessRoute(routePath: string, forceRefresh: boolean = false): Promise<boolean> {
    try {
      // 优先使用缓存，避免重复请求
      const permissions = await this.getPermissions(forceRefresh)

      // 超级管理员可以访问所有路由
      if (permissions.permissions.includes('*:*')) {
        return true
      }

      // 检查路由列表
      if (permissions.routes && Array.isArray(permissions.routes)) {
        return permissions.routes.some((route) => {
          // 精确匹配
          if (route === routePath) {
            return true
          }

          // 通配符匹配（如 /coupons/edit/:id）
          const routePattern = route.replace(/:[^/]+/g, '[^/]+')
          const regex = new RegExp(`^${routePattern}$`)
          return regex.test(routePath)
        })
      }

      // 如果没有路由列表，返回 false
      return false
    } catch (error) {
      console.error('检查路由权限失败:', error)
      // 如果权限检查失败，默认返回 false
      return false
    }
  }

  /**
   * 获取用户可访问的路由列表
   */
  async getAccessibleRoutes(forceRefresh: boolean = false): Promise<string[]> {
    const permissions = await this.getPermissions(forceRefresh)
    return permissions.routes || []
  }

  /**
   * 获取用户角色列表
   */
  async getRoles(forceRefresh: boolean = false): Promise<Role[]> {
    const permissions = await this.getPermissions(forceRefresh)
    return permissions.roles || []
  }

  /**
   * 同步权限信息（用于登录后或权限变更时）
   * @param userId 用户ID（可选，用于获取特定用户的权限）
   */
  async syncPermissions(userId?: string): Promise<void> {
    this.clearCache()
    await this.getPermissions(true, userId)
  }
}

// 导出单例实例
export const permissionService = PermissionService.getInstance()
