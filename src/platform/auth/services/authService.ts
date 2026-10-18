import { GITHUB_OAUTH_CONFIG } from '../authConfig'
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

interface GitHubTokenResponse {
  access_token?: string
  error?: string
  error_description?: string
}

interface GitHubEmailResponse {
  email: string
  primary: boolean
  verified: boolean
  visibility: string | null
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
  if (typeof jsonLike !== 'string') return null
  try {
    const obj = JSON.parse(jsonLike) as Partial<GitHubUser>
    if (obj && typeof obj === 'object' && typeof obj.id === 'number' && typeof obj.login === 'string') {
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

// ✅ 修复 3: parseToken - 修正存储格式解析逻辑
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

function extractResponseData<T>(response: unknown): T {
  // 处理 axios 风格的响应：{ data: T }
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as { data: T }).data
  }
  // 直接返回响应本身
  return response as T
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
      const tokenData = localStorage.getItem('github_token')
      const userData = localStorage.getItem('github_user')

      const token = parseToken(tokenData)
      const user = parseGitHubUser(userData)

      if (token && user) {
        this.authState = {
          token,
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

  private saveToStorage() {
    if (this.authState.token && this.authState.user) {
      localStorage.setItem('github_token', JSON.stringify({ token: this.authState.token }))
      localStorage.setItem('github_user', JSON.stringify(this.authState.user))
    } else {
      localStorage.removeItem('github_token')
      localStorage.removeItem('github_user')
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

  async setAuthenticated(isAuthenticated: boolean, user?: GitHubUser | null, token?: string | null): Promise<void> {
    this.authState.isAuthenticated = isAuthenticated

    if (user !== undefined) {
      this.authState.user = user
    }

    if (token !== undefined) {
      this.authState.token = token
    }

    if (!isAuthenticated) {
      this.authState.user = null
      this.authState.token = null
    }

    this.saveToStorage()
    window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
    this.notifyListeners()

    // 如果已登录，强制同步权限，保证菜单与路由权限为最新
    if (isAuthenticated) {
      try {
        await permissionService.syncPermissions()
      } catch (e) {
        logger.warn('同步权限失败:', e)
      }
    }

    // 保持原有的短延迟行为以兼容订阅者
    return new Promise((resolve) => setTimeout(resolve, 100))
  }

  /**
   * 测试账号登录：将 demo 登录态也纳入 authService（避免 Header/菜单逻辑分裂）。
   * - 不写入 github_token/github_user，仅依赖 localStorage.token
   */
  async setTestAccountAuthenticated(email: string): Promise<void> {
    if (!isDemoPermissionMode()) throw new Error('测试账号仅用于演示环境')
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

  async login(): Promise<void> {
    const { clientId, redirectUri, scope, authUrl } = GITHUB_OAUTH_CONFIG
    const authParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope,
      response_type: 'code',
    })
    window.location.href = `${authUrl}?${authParams.toString()}`
  }

  async handleCallback(code: string): Promise<void> {
    this.authState.isLoading = true
    this.notifyListeners()

    try {
      // 获取 access token
      // 注意：不要在浏览器端直接调用 GitHub 的 token 接口（需要 client_secret，且 GitHub token 接口不支持浏览器 CORS）。
      // 应始终将 code 发到后端，由后端使用 client_secret 与 GitHub 交换 access_token。
      // 开发模式下使用 Vite dev proxy（/api/github-token）进行本地调试；生产环境也应提供同名后端接口。
      const tokenResponse = await request.post('/api/github-token', {
        // 仅将必要信息发送给后端，后端负责与 GitHub 交互并返回统一格式的 { access_token }
        client_id: GITHUB_OAUTH_CONFIG.clientId,
        code,
        redirect_uri: GITHUB_OAUTH_CONFIG.redirectUri,
      })

      const tokenData = extractResponseData<GitHubTokenResponse>(tokenResponse)

      if (tokenData.error) {
        throw new Error(tokenData.error_description || 'Failed to get access token')
      }

      if (!tokenData.access_token) {
        throw new Error('No access token in response')
      }

      const accessToken = tokenData.access_token

      // 获取用户信息
      const userResponse = await request.get(
        '/api/github-user',
        {},
        {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )

      const userData = extractResponseData<Partial<GitHubUser>>(userResponse)

      // 获取用户邮箱
      const emailResponse = await request.get(
        '/api/github-email',
        {},
        {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )

      const emails = extractResponseData<GitHubEmailResponse[]>(emailResponse)

      const primaryEmail =
        Array.isArray(emails) && emails.length > 0
          ? emails.find((email) => email.primary)?.email || userData.email || ''
          : userData.email || ''

      const user: GitHubUser = {
        id: userData.id || 0,
        login: userData.login || '',
        name: userData.name || userData.login || '',
        email: primaryEmail,
        avatar_url: userData.avatar_url || '',
        html_url: userData.html_url || '',
      }

      this.authState = {
        user,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      }

      this.saveToStorage()
      this.notifyListeners()
    } catch (error) {
      this.authState.isLoading = false
      this.notifyListeners()
      logger.error('GitHub OAuth callback failed:', error)
      throw error
    }
  }

  logout(): void {
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
    } catch (e) {
      logger.warn('移除本地存储键失败:', e)
    }
    this.saveToStorage()
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
