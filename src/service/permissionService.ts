/**
 * 权限服务
 * 单例模式，提供权限检查和管理功能
 */

import { UserPermission, PermissionCode, Role, PermissionCheckResult } from '../types/permission'
import * as permissionAPI from './api/permission'
import { routePermissionMap } from '../mock/permission'

class PermissionService {
  private static instance: PermissionService
  private userPermissions: UserPermission | null = null
  private loadingPromise: Promise<UserPermission> | null = null
  private readonly cacheExpireTime: number = 30 * 60 * 1000 // 30分钟
  private lastFetchTime: number = 0

  private readonly STORAGE_KEYS = {
    PERMISSIONS: 'user_permissions',
    FETCH_TIME: 'permissions_fetch_time',
    AUTH_KEY: 'permissions_auth_key',
    // 用于开发/演示的本地覆盖（不应污染真实登录态）
    ROLE_OVERRIDE: 'user_role',
    FORCE_DEMO_SWITCH: 'force_demo_switch',
  } as const

  private constructor() {
    // 从 localStorage 恢复权限信息
    this.loadFromStorage()
  }

  private normalizeUserPermissions(input: UserPermission): UserPermission {
    const safe = input && typeof input === 'object' ? input : ({} as any)
    const roles = Array.isArray(safe.roles) ? safe.roles.filter(Boolean) : []
    const permissions = Array.isArray(safe.permissions) ? safe.permissions.filter(Boolean) : []
    const routes = Array.isArray(safe.routes) ? safe.routes.filter(Boolean) : []
    return {
      userId: typeof safe.userId === 'string' ? safe.userId : '',
      username: typeof safe.username === 'string' ? safe.username : '',
      roles,
      permissions,
      routes,
    }
  }

  /**
   * 当前登录身份指纹（用于避免“切换账号/登出后仍复用旧权限缓存”）
   * - 测试账号：localStorage.token = { token: email }
   * - GitHub OAuth：github_user / github_token
   * - 开发覆盖：user_role（会影响 mock 权限计算）
   */
  private safeReadStorage(key: string): string {
    try {
      return localStorage.getItem(key) || ''
    } catch {
      return ''
    }
  }

  private roleSuffix(roleOverride: string): string {
    return roleOverride ? `|role:${roleOverride}` : ''
  }

  private parseGithubIdentifier(githubUserRaw: string): string {
    try {
      const obj = JSON.parse(githubUserRaw)
      const email = obj?.email || ''
      const login = obj?.login || ''
      const id = obj?.id || ''
      return email || login || id || githubUserRaw
    } catch {
      return githubUserRaw
    }
  }

  private parseTokenIdentifier(tokenRaw: string): string {
    try {
      const obj = JSON.parse(tokenRaw)
      return obj?.token || tokenRaw
    } catch {
      return tokenRaw
    }
  }

  private getCurrentAuthKey(): string {
    const roleOverride = this.safeReadStorage(this.STORAGE_KEYS.ROLE_OVERRIDE)
    const suffix = this.roleSuffix(roleOverride)

    const githubUserRaw = this.safeReadStorage('github_user')
    if (githubUserRaw) {
      const identifier = this.parseGithubIdentifier(githubUserRaw)
      return `github:${identifier}${suffix}`
    }

    const githubToken = this.safeReadStorage('github_token')
    if (githubToken) {
      return `githubToken:${githubToken}${suffix}`
    }

    // 测试账号 token
    const rawToken = this.safeReadStorage('token')
    if (rawToken) {
      const identifier = this.parseTokenIdentifier(rawToken)
      return `token:${identifier}${suffix}`
    }

    // 未登录但存在 roleOverride 的情况（演示页）
    if (roleOverride) return `anonymous${suffix}`
    return 'anonymous'
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
      const stored = localStorage.getItem(this.STORAGE_KEYS.PERMISSIONS)
      const lastFetch = localStorage.getItem(this.STORAGE_KEYS.FETCH_TIME)
      const storedAuthKey = localStorage.getItem(this.STORAGE_KEYS.AUTH_KEY)
      const currentAuthKey = this.getCurrentAuthKey()

      // 如果登录身份发生变化，直接丢弃旧缓存，避免残留旧权限
      if (storedAuthKey && storedAuthKey !== currentAuthKey) {
        this.clearCache()
        return
      }

      // 兼容旧版本：若存在权限缓存但没有 authKey，视为不可信，直接丢弃
      if (!storedAuthKey && stored) {
        this.clearCache()
        return
      }

      if (stored && lastFetch) {
        this.userPermissions = this.normalizeUserPermissions(JSON.parse(stored))
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
      const normalized = this.normalizeUserPermissions(permissions)
      localStorage.setItem(this.STORAGE_KEYS.PERMISSIONS, JSON.stringify(normalized))
      localStorage.setItem(this.STORAGE_KEYS.FETCH_TIME, Date.now().toString())
      localStorage.setItem(this.STORAGE_KEYS.AUTH_KEY, this.getCurrentAuthKey())
      this.userPermissions = normalized
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
    localStorage.removeItem(this.STORAGE_KEYS.PERMISSIONS)
    localStorage.removeItem(this.STORAGE_KEYS.FETCH_TIME)
    localStorage.removeItem(this.STORAGE_KEYS.AUTH_KEY)
  }

  /**
   * 登出时清理（仅清理“权限相关”本地状态，不直接清理 token）
   * - 解决：登录/登出或 401 跳转时权限缓存残留，导致下个账号复用旧权限
   */
  logoutCleanup(): void {
    this.clearCache()
    try {
      localStorage.removeItem(this.STORAGE_KEYS.ROLE_OVERRIDE)
      localStorage.removeItem(this.STORAGE_KEYS.FORCE_DEMO_SWITCH)
    } catch (e) {
      console.warn('清理权限相关本地覆盖失败:', e)
    }
  }

  /**
   * 获取用户权限信息（带缓存）
   * @param forceRefresh 是否强制刷新
   * @param userId 用户ID（可选，用于获取特定用户的权限）
   */
  async getPermissions(forceRefresh: boolean = false, userId?: string): Promise<UserPermission> {
    // 若登录身份发生变化，强制清理旧缓存并重新获取
    try {
      const storedAuthKey = localStorage.getItem(this.STORAGE_KEYS.AUTH_KEY)
      const currentAuthKey = this.getCurrentAuthKey()
      if (storedAuthKey && storedAuthKey !== currentAuthKey) {
        this.clearCache()
        forceRefresh = true
      }
    } catch {
      // ignore
    }

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
        const permissions = this.normalizeUserPermissions(await this.loadingPromise)
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
    return this.userPermissions
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
      const normalizedRoutePath = typeof routePath === 'string' ? routePath : ''
      if (!normalizedRoutePath) {
        // 运行时兜底：避免非字符串 routePath 导致 split/match 崩溃
        if (process.env.NODE_ENV === 'development') {
          console.warn('[permissionService.canAccessRoute] invalid routePath (non-string):', routePath)
        }
        return false
      }

      // 优先使用缓存，避免重复请求
      const permissions = await this.getPermissions(forceRefresh)

      // 超级管理员可以访问所有路由
      if (permissions.permissions.includes('*:*')) {
        return true
      }

      const escapeRegexPart = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      const makeRouteRegexFromPattern = (patternKey: string): RegExp | null => {
        if (!patternKey) return null
        if (patternKey === '*') return /^.*$/

        const parts = patternKey.split('/').map((part) => {
          if (part === '*') return '.*'
          if (part.startsWith(':')) return '[^/]+'
          return escapeRegexPart(part)
        })

        try {
          return new RegExp(`^${parts.join('/')}$`)
        } catch {
          return null
        }
      }

      // 优先基于 route -> permission 映射进行检查（permission-code 为主）
      const findPermissionForRoute = (path: string): PermissionCode | null => {
        if (!routePermissionMap) return null
        // 直接精确匹配
        if (routePermissionMap[path]) return routePermissionMap[path]
        // 否则尝试使用 pattern 匹配（支持 :param 风格）
        const keys = Object.keys(routePermissionMap)
        for (const key of keys) {
          if (key === '*') continue
          const regex = makeRouteRegexFromPattern(key)
          if (regex?.test(path)) return routePermissionMap[key]
        }

        // 兜底规则（如 '*'）
        return routePermissionMap['*'] ?? null
      }

      const mappedPerm = findPermissionForRoute(normalizedRoutePath)
      if (mappedPerm) {
        // 若存在映射，则以 permission-code 为准（优先）。若 forceRefresh 为 true，传递到 hasPermission
        const ok = await this.hasPermission(mappedPerm, forceRefresh)
        return !!ok
      }

      // 内部函数：使用给定权限列表检查路由
      const matchWithRoutes = (routes: string[] | undefined) => {
        if (!routes || !Array.isArray(routes)) return false
        return routes.some((route) => {
          // 精确匹配
          if (route === normalizedRoutePath) {
            return true
          }

          // 通配符：允许 routes 列表中存在 '*' 作为全量
          if (route === '*') {
            return true
          }

          // 通配符匹配（如 /coupons/edit/:id）
          const regex = makeRouteRegexFromPattern(route)
          return !!regex?.test(normalizedRoutePath)
        })
      }

      // 首次尝试使用当前缓存的 routes
      if (matchWithRoutes(permissions.routes)) {
        return true
      }

      // 如果未匹配且不是强制刷新，尝试强制刷新一次权限并重试（处理缓存旧数据场景）
      if (!forceRefresh) {
        try {
          const refreshed = await this.getPermissions(true)
          if (refreshed.permissions.includes('*:*')) return true
          return matchWithRoutes(refreshed.routes)
        } catch (e) {
          console.warn('刷新权限以检查路由时失败，继续返回 false', e)
        }
      }

      // 如果没有路由列表或未匹配，返回 false
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
