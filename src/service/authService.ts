import { GITHUB_OAUTH_CONFIG } from '@src/config/auth'
import request from '@src/service/request'

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
    // 从 localStorage 恢复状态
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
      const token = localStorage.getItem('github_token')
      const userData = localStorage.getItem('github_user')
      if (token && userData) {
        this.authState = {
          token,
          user: JSON.parse(userData as any),
          isAuthenticated: true,
          isLoading: false,
        }
      }
    } catch (error) {
      console.error('Failed to load auth state from storage:', error)
    }
  }

  private saveToStorage() {
    if (this.authState.token) {
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

  /**
   * 直接设置认证状态
   * @param isAuthenticated 是否已认证
   * @param user 可选，用户信息
   * @param token 可选，访问令牌
   */
  setAuthenticated(isAuthenticated: boolean, user?: GitHubUser | null, token?: string | null): Promise<void> {
    return new Promise((resolve) => {
      // 更新状态
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

      // 保存到存储
      this.saveToStorage()

      // 通知监听者
      this.notifyListeners()

      // 延迟解析以确保状态更新
      setTimeout(resolve, 100)
    })
  }
  /**
   * 设置加载状态
   * @param isLoading 是否正在加载
   */
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
      const tokenData: any = await request.post(
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

      if (tokenData.error) {
        throw new Error(tokenData?.error_description || 'Failed to get access token')
      }

      const accessToken = tokenData.access_token

      // 获取用户信息
      const userResponse: any = await request.get(
        process.env.NODE_ENV === 'production' ? GITHUB_OAUTH_CONFIG.userUrl : '/api/github-user',
        {},
        {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )

      // 获取用户邮箱
      const emails: any = await request.get(
        process.env.NODE_ENV === 'production' ? GITHUB_OAUTH_CONFIG.emailUrl : '/api/github-email',
        {},
        {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )

      const primaryEmail = emails.find((email: any) => email.primary)?.email || userResponse.email

      const user: GitHubUser = {
        ...userResponse,
        email: primaryEmail,
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
    this.saveToStorage()
    this.notifyListeners()
  }

  getToken(): string | null {
    return this.authState.token
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated
  }
}

export const authService = AuthService.getInstance()
