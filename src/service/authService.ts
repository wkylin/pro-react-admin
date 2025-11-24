import { GITHUB_OAUTH_CONFIG } from '@src/config/auth'
import request from '@src/service/request'
import logger from '@/utils/logger'
import { permissionService } from './permissionService'

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

// ✅ 修复 1: 定义 GitHub API 响应类型
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

// ✅ 修复 2: parseGitHubUser - 正确的类型守卫
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
    // 尝试解析为对象（新格式：{ token: "xxx" }）
    const obj = JSON.parse(jsonLike)
    if (obj && typeof obj === 'object' && typeof obj.token === 'string') {
      return obj.token
    }
    // 兼容直接字符串格式（旧版本）
    if (typeof obj === 'string') {
      return obj
    }
    return null
  } catch {
    // 如果解析失败，可能本身就是纯字符串 token（最旧版本）
    return jsonLike
  }
}

// ✅ 修复 4: 安全的类型提取辅助函数
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
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private loadFromStorage() {
    try {
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
      }
    } catch (error) {
      logger.error('Failed to load auth state from storage:', error)
    }
  }

  private saveToStorage() {
    if (this.authState.token && this.authState.user) {
      // 存储为对象格式，方便后续扩展
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

  // ✅ 修复 5: 正确处理 request 响应，避免类型错误
  async handleCallback(code: string): Promise<void> {
    this.authState.isLoading = true
    this.notifyListeners()

    try {
      // 获取 access token
      const tokenResponse = await request.post(
        process.env.NODE_ENV === 'production' ? GITHUB_OAUTH_CONFIG.tokenUrl : '/api/github-token',
        {
          client_id: GITHUB_OAUTH_CONFIG.clientId,
          client_secret: GITHUB_OAUTH_CONFIG.clientSecret,
          code,
          redirect_uri: GITHUB_OAUTH_CONFIG.redirectUri,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

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
        process.env.NODE_ENV === 'production' ? GITHUB_OAUTH_CONFIG.userUrl : '/api/github-user',
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
        process.env.NODE_ENV === 'production' ? GITHUB_OAUTH_CONFIG.emailUrl : '/api/github-email',
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
    this.authState = {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    }
    // 清除权限缓存，确保下次登录时重新获取并刷新菜单
    try {
      permissionService.clearCache()
    } catch (e) {
      logger.warn('清除权限缓存失败:', e)
    }
    // 保险措施：确保 localStorage 中的权限相关键被移除
    try {
      localStorage.removeItem('user_permissions')
      localStorage.removeItem('permissions_fetch_time')
    } catch (e) {
      logger.warn('移除本地权限存储键失败:', e)
    }
    this.saveToStorage()
    this.notifyListeners()
    // SPA 跳转到登录页
    if (typeof window !== 'undefined') {
      window.location.href = '/signin'
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
