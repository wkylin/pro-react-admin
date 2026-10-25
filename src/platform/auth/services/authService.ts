import request from '@platform/api/request'
import logger from '@platform/telemetry/logger'
import { permissionService } from './permissionService'
import { isDemoPermissionMode } from '../api/permission'
import {
  readEnterpriseSession,
  saveEnterpriseSession,
  subscribeSession,
  SESSION_CHANGED_EVENT,
  clearSession,
  type EnterpriseSession,
} from '../model/session'

export interface GitHubUser {
  id: number
  login: string
  name: string
  email: string
  avatar_url: string
  html_url: string
}

export interface AuthState {
  user: GitHubUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

function isLikelyEmail(value: string): boolean {
  if (typeof value !== 'string') return false
  if (value.length > 320) return false
  if (value.includes(' ')) return false

  const at = value.indexOf('@')
  if (at <= 0 || at !== value.lastIndexOf('@')) return false

  const dot = value.indexOf('.', at + 2)
  if (dot === -1 || dot >= value.length - 1) return false

  return true
}

function buildTestAccountUser(email: string): GitHubUser {
  // 用于“测试账号登录”展示；不代表真实 GitHub 用户
  const login = email
  return {
    id: 0,
    login,
    name: login,
    email,
    avatar_url: '',
    html_url: '',
  }
}

function parseGitHubUser(jsonLike: unknown): GitHubUser | null {
  try {
    const obj = (typeof jsonLike === 'string' ? JSON.parse(jsonLike) : jsonLike) as Partial<GitHubUser>
    if (
      obj &&
      typeof obj === 'object' &&
      typeof obj.id === 'number' &&
      Number.isSafeInteger(obj.id) &&
      obj.id > 0 &&
      typeof obj.login === 'string' &&
      obj.login
    ) {
      return {
        id: obj.id,
        login: obj.login,
        name: obj.name || obj.login,
        email: obj.email || '',
        avatar_url: obj.avatar_url || '',
        html_url: obj.html_url || '',
      }
    }
    return null
  } catch (err) {
    logger.error('Failed to parse GitHub user:', err)
    return null
  }
}

function parseToken(jsonLike: unknown): string | null {
  if (typeof jsonLike !== 'string') return null
  try {
    const obj: unknown = JSON.parse(jsonLike)
    if (obj && typeof obj === 'object' && !Array.isArray(obj) && 'token' in obj && typeof obj.token === 'string') {
      return obj.token
    }
    return null
  } catch {
    return null
  }
}

class AuthService {
  private static instance: AuthService
  private authState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  }
  private listeners: ((state: AuthState) => void)[] = []

  private constructor() {
    this.loadFromStorage()
    if (typeof window !== 'undefined')
      subscribeSession(() => {
        this.authState = { user: null, token: null, isAuthenticated: false, isLoading: false }
        this.loadFromStorage()
        this.notifyListeners()
      })
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private loadFromStorage() {
    try {
      localStorage.removeItem('github_token')
      localStorage.removeItem('github_user')
      const enterprise = readEnterpriseSession()
      if (enterprise) {
        this.authState = {
          user: {
            id: 0,
            login: enterprise.user.email,
            name: enterprise.user.name,
            email: enterprise.user.email,
            avatar_url: '',
            html_url: '',
          },
          token: enterprise.token,
          isAuthenticated: true,
          isLoading: false,
        }
        return
      }
      if (localStorage.getItem('enterprise_session') || !isDemoPermissionMode()) return
      const user = parseGitHubUser(localStorage.getItem('github_demo_user'))
      if (user) {
        this.authState = {
          token: `github-demo:${user.id}`,
          user,
          isAuthenticated: true,
          isLoading: false,
        }
        return
      }

      // 兼容“测试账号登录”：localStorage.token = { token: email }
      const testTokenData = localStorage.getItem('token')
      const testToken = parseToken(testTokenData)
      if (isDemoPermissionMode() && testToken && isLikelyEmail(testToken)) {
        this.authState = {
          token: testToken,
          user: buildTestAccountUser(testToken),
          isAuthenticated: true,
          isLoading: false,
        }
      }
    } catch (error) {
      logger.error('Failed to load auth state from storage:', error)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.authState))
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getState(): AuthState {
    return { ...this.authState }
  }

  async setEnterpriseAuthenticated(session: EnterpriseSession): Promise<void> {
    saveEnterpriseSession(session)
    await permissionService.syncPermissions()
  }

  /**
   * 测试账号登录：将 demo 登录态也纳入 authService（避免 Header/菜单逻辑分裂）。
   * - 仅依赖 localStorage.token，不复用 GitHub 演示身份
   */
  async setTestAccountAuthenticated(email: string): Promise<void> {
    if (!isDemoPermissionMode()) throw new Error('测试账号仅用于演示环境')
    if (localStorage.getItem('github_demo_user')) await this.revokeDemoSession()
    this.authState = {
      user: buildTestAccountUser(email),
      token: email,
      isAuthenticated: true,
      isLoading: false,
    }

    // 避免残留 GitHub 登录态影响鉴权逻辑
    try {
      localStorage.removeItem('enterprise_session')
      localStorage.removeItem('github_token')
      localStorage.removeItem('github_user')
      localStorage.removeItem('github_demo_user')
    } catch (e) {
      console.warn('移除本地存储键失败:', e)
    }

    window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
    this.notifyListeners()

    try {
      await permissionService.syncPermissions()
    } catch (e) {
      logger.warn('同步权限失败:', e)
    }

    return new Promise((resolve) => setTimeout(resolve, 100))
  }

  setLoading(isLoading: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.authState.isLoading = isLoading
      this.notifyListeners()
      setTimeout(resolve, 50)
    })
  }

  login(): void {
    if (!isDemoPermissionMode()) throw new Error('GitHub 登录仅用于演示环境')
    window.location.assign('/api/demo/github/start')
  }

  private async fetchDemoUser(): Promise<GitHubUser> {
    const response = await fetch('/api/demo/github/session', {
      credentials: 'same-origin',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) throw new Error('GitHub 演示会话已失效')
    const payload: unknown = await response.json()
    const user = payload && typeof payload === 'object' && 'user' in payload ? parseGitHubUser(payload.user) : null
    if (!user) throw new Error('GitHub 演示用户资料无效')
    return user
  }

  async restoreDemoSession(): Promise<void> {
    if (
      !isDemoPermissionMode() ||
      !localStorage.getItem('github_demo_user') ||
      localStorage.getItem('enterprise_session')
    )
      return
    try {
      const user = await this.fetchDemoUser()
      localStorage.setItem('github_demo_user', JSON.stringify(user))
      this.authState = { user, token: `github-demo:${user.id}`, isAuthenticated: true, isLoading: false }
    } catch {
      localStorage.removeItem('github_demo_user')
      this.authState = { user: null, token: null, isAuthenticated: false, isLoading: false }
      window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
    }
    this.notifyListeners()
  }

  async handleCallback(): Promise<void> {
    if (!isDemoPermissionMode()) throw new Error('GitHub 登录仅用于演示环境')
    this.authState.isLoading = true
    this.notifyListeners()

    try {
      const user = await this.fetchDemoUser()
      for (const key of ['enterprise_session', 'token', 'github_token', 'github_user', 'user_role'])
        localStorage.removeItem(key)
      localStorage.setItem('github_demo_user', JSON.stringify(user))
      this.authState = { user, token: `github-demo:${user.id}`, isAuthenticated: true, isLoading: false }
      window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
      try {
        await permissionService.syncPermissions()
      } catch (error) {
        logger.warn('GitHub 演示权限同步失败:', error)
      }
      this.notifyListeners()
    } catch (error) {
      this.authState.isLoading = false
      this.notifyListeners()
      logger.error('GitHub demo callback failed:', error)
      throw error
    }
  }

  private async revokeDemoSession(): Promise<void> {
    try {
      await fetch('/api/demo/github/session', {
        method: 'DELETE',
        credentials: 'same-origin',
        keepalive: true,
        signal: AbortSignal.timeout(5000),
      })
    } catch (error) {
      logger.warn('GitHub 演示会话注销失败:', error)
    }
  }

  logout(): void {
    if (localStorage.getItem('github_demo_user')) void this.revokeDemoSession()
    const enterprise = readEnterpriseSession()
    if (enterprise)
      void request
        .delete(
          '/api/auth/session',
          {},
          {
            headers: { Authorization: `Bearer ${enterprise.token}` },
            showError: false,
            encrypt: false,
          }
        )
        .catch((error: unknown) =>
          logger.warn('服务端会话注销失败:', error instanceof Error ? error.message : 'unknown')
        )
    this.authState = {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    }
    // 登出时清理权限相关缓存与覆盖，避免下次登录残留旧权限
    try {
      permissionService.logoutCleanup()
    } catch (e) {
      logger.warn('清除权限相关缓存失败:', e)
    }

    // 清除所有相关的 localStorage 键（token 等）
    try {
      localStorage.removeItem('token') // 测试账号登录的 token
      localStorage.removeItem('github_token') // GitHub OAuth token
      localStorage.removeItem('github_user') // GitHub user info
      localStorage.removeItem('github_demo_user')
    } catch (e) {
      logger.warn('移除本地存储键失败:', e)
    }
    clearSession()
    this.notifyListeners()
    // SPA 跳转到登录页
    if (typeof window !== 'undefined') {
      window.location.href = '#/signin'
    }
  }

  getToken(): string | null {
    return this.authState.token
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated
  }
}

export const authService = AuthService.getInstance()
