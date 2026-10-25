import { withTimeout } from '@platform/api/core/async'
/**
 * 权限服务
 * 单例模式，提供权限检查和管理功能
 */

import type { UserPermission, PermissionCode, Role, PermissionCheckResult } from '../model/permission'
import * as permissionAPI from '../api/permission'
import { canAccessPath, matchesPermission } from '../model/policy'
import { readStoredToken, readEnterpriseSession, SESSION_CHANGED_EVENT } from '../model/session'

export interface PermissionSnapshot {
  permissions: UserPermission | null
  status: 'idle' | 'loading' | 'ready' | 'error'
}
const emptySnapshot: PermissionSnapshot = { permissions: null, status: 'idle' }

class PermissionService {
  private static instance: PermissionService
  private userPermissions: UserPermission | null = null
  private cachedAuthKey = ''
  private loadingPromise: Promise<UserPermission> | null = null
  private loadingAuthKey = ''
  private cacheGeneration = 0
  private get cacheExpireTime(): number {
    return permissionAPI.isDemoPermissionMode?.() ? 30 * 60 * 1000 : 60_000
  }
  private lastFetchTime: number = 0
  private listeners = new Set<() => void>()
  private snapshot: PermissionSnapshot = emptySnapshot
  private expiryTimer: ReturnType<typeof setTimeout> | undefined

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
    if (this.peekPermissions()) this.publish('ready')
  }

  getSnapshot = (): PermissionSnapshot =>
    this.snapshot.permissions && !this.peekPermissions() ? emptySnapshot : this.snapshot

  private onSessionChanged = (): void => {
    this.clearCache()
    if (readStoredToken()) void this.getPermissions()
  }

  private onStorage = (event: StorageEvent): void => {
    if (event.key === null || ['enterprise_session', 'token', 'github_demo_user', 'user_role'].includes(event.key))
      this.onSessionChanged()
  }

  subscribe = (listener: () => void): (() => void) => {
    if (this.listeners.size === 0 && typeof window !== 'undefined') {
      window.addEventListener('storage', this.onStorage)
      window.addEventListener(SESSION_CHANGED_EVENT, this.onSessionChanged)
      window.addEventListener('focus', this.onFocus)
    }
    this.listeners.add(listener)
    this.scheduleExpiry()
    return () => {
      this.listeners.delete(listener)
      if (this.listeners.size === 0 && typeof window !== 'undefined') {
        window.removeEventListener('storage', this.onStorage)
        window.removeEventListener(SESSION_CHANGED_EVENT, this.onSessionChanged)
        window.removeEventListener('focus', this.onFocus)
        clearTimeout(this.expiryTimer)
      }
    }
  }

  private publish(status: PermissionSnapshot['status']): void {
    this.snapshot = { permissions: this.peekPermissions(), status }
    this.scheduleExpiry()
    for (const listener of this.listeners) listener()
  }

  private onFocus = (): void => {
    if (readEnterpriseSession()) {
      void this.getPermissions(true)
      return
    }
    if (this.snapshot.status === 'ready' && !this.peekPermissions()) this.onSessionChanged()
  }

  private scheduleExpiry(): void {
    clearTimeout(this.expiryTimer)
    if (this.listeners.size && this.userPermissions && this.snapshot.status === 'ready') {
      this.expiryTimer = setTimeout(
        this.onSessionChanged,
        Math.max(1, this.lastFetchTime + this.cacheExpireTime - Date.now() + 1)
      )
    }
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
   * Bind cache identity to the credential used by the request layer, plus the
   * mock role override. Legacy GitHub profiles are never credentials.
   */
  private safeReadStorage(key: string): string {
    try {
      return localStorage.getItem(key) || ''
    } catch {
      return ''
    }
  }

  private getCurrentAuthKey(): string {
    const roleOverride = this.safeReadStorage(this.STORAGE_KEYS.ROLE_OVERRIDE)
    const suffix = roleOverride ? `|role:${roleOverride}` : ''
    const token = readStoredToken()
    const enterprise = readEnterpriseSession()
    return enterprise
      ? `tenant:${enterprise.tenantId}|token:${enterprise.token}`
      : token
        ? `token:${token}${suffix}`
        : `anonymous${suffix}`
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
        this.cachedAuthKey = currentAuthKey
        this.lastFetchTime = parseInt(lastFetch, 10)

        // 检查缓存是否过期
        if (
          !Number.isFinite(this.lastFetchTime) ||
          Date.now() - this.lastFetchTime > this.cacheExpireTime ||
          this.lastFetchTime > Date.now()
        ) {
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
    const normalized = this.normalizeUserPermissions(permissions)
    this.userPermissions = normalized
    this.cachedAuthKey = this.getCurrentAuthKey()
    this.lastFetchTime = Date.now()
    try {
      localStorage.setItem(this.STORAGE_KEYS.PERMISSIONS, JSON.stringify(normalized))
      localStorage.setItem(this.STORAGE_KEYS.FETCH_TIME, Date.now().toString())
      localStorage.setItem(this.STORAGE_KEYS.AUTH_KEY, this.getCurrentAuthKey())
    } catch (error) {
      console.error('保存权限信息失败:', error)
    }
    this.publish('ready')
  }

  /**
   * 清除权限缓存
   */
  clearCache(): void {
    this.cacheGeneration += 1
    this.userPermissions = null
    this.cachedAuthKey = ''
    this.lastFetchTime = 0
    this.loadingPromise = null
    for (const key of [this.STORAGE_KEYS.PERMISSIONS, this.STORAGE_KEYS.FETCH_TIME, this.STORAGE_KEYS.AUTH_KEY]) {
      try {
        localStorage.removeItem(key)
      } catch {
        /* Storage unavailable. */
      }
    }
    this.publish('idle')
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
  async getPermissions(forceRefresh = false, userId?: string): Promise<UserPermission> {
    const denied = (): UserPermission => ({ userId: '', username: '', roles: [], permissions: [], routes: [] })
    if (!readStoredToken()) {
      if (this.userPermissions || this.loadingPromise) this.clearCache()
      this.publish('error')
      return denied()
    }
    const authKey = this.getCurrentAuthKey()
    const storedAuthKey = this.safeReadStorage(this.STORAGE_KEYS.AUTH_KEY)
    if (
      (this.userPermissions && this.cachedAuthKey !== authKey) ||
      (storedAuthKey && storedAuthKey !== authKey) ||
      (this.loadingPromise && this.loadingAuthKey !== authKey)
    ) {
      this.clearCache()
    }
    if (!forceRefresh && this.userPermissions && Date.now() - this.lastFetchTime <= this.cacheExpireTime) {
      return this.userPermissions
    }
    if (this.loadingPromise && this.loadingAuthKey === authKey) return this.loadingPromise

    const generation = this.cacheGeneration
    this.loadingAuthKey = authKey
    this.publish('loading')
    const pending = (async (): Promise<UserPermission> => {
      try {
        const permissions = this.normalizeUserPermissions(
          await withTimeout(permissionAPI.getUserPermissions(userId), 3000, '获取权限超时')
        )
        if (generation !== this.cacheGeneration || authKey !== this.getCurrentAuthKey()) return denied()
        this.saveToStorage(permissions)
        return permissions
      } catch (error) {
        if (generation === this.cacheGeneration && authKey === this.getCurrentAuthKey()) {
          this.clearCache()
          this.publish('error')
        }
        console.warn('获取权限失败，拒绝授权:', error)
        return denied()
      }
    })()
    this.loadingPromise = pending
    try {
      return await pending
    } finally {
      if (this.loadingPromise === pending) this.loadingPromise = null
    }
  }

  /** Read only a fresh cache for this identity, without starting a request. */
  peekPermissions(): UserPermission | null {
    if (this.cachedAuthKey !== this.getCurrentAuthKey() || Date.now() - this.lastFetchTime > this.cacheExpireTime)
      return null
    return this.userPermissions
  }

  /**
   * 检查单个权限
   * @param permission 权限代码
   * @param forceRefresh 是否强制刷新权限缓存
   */
  async hasPermission(permission: PermissionCode, forceRefresh: boolean = false): Promise<boolean> {
    const permissions = await this.getPermissions(forceRefresh)

    return matchesPermission(permission, permissions.permissions)
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
    if (typeof routePath !== 'string' || !routePath) return false
    return canAccessPath(await this.getPermissions(forceRefresh), routePath)
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
