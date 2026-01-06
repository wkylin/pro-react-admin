/**
 * Hash 路由工具函数
 */
export class HashRouterUtils {
  static shouldDebugNavTo(): boolean {
    try {
      const host = window.location.hostname
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0'
      if (!isLocal) return false
      return window.localStorage.getItem('DEBUG_NAV_TO') === '1'
    } catch {
      return false
    }
  }

  static debugNavToOnce(source: string, value: unknown): void {
    if (!this.shouldDebugNavTo()) return
    try {
      const key = '__WUI_DEBUG_NAV_TO_COUNT__'
      const g = globalThis as any
      g[key] = typeof g[key] === 'number' ? g[key] : 0
      if (g[key] >= 20) return
      g[key] += 1

      // 尽量输出可读信息，同时给出调用栈
       
      console.groupCollapsed(`[DEBUG_NAV_TO] non-string to/path from ${source}`)
       
      console.log('value:', value)
       
      console.trace('stack')
       
      console.groupEnd()
    } catch {
      // ignore
    }
  }

  static toPathString(to: unknown): string {
    if (typeof to === 'string') {
      return to
    }

    // 仅本地 debug：捕获是谁把对象当路径传进来
    if (to != null) {
      this.debugNavToOnce('HashRouterUtils.toPathString', to)
    }

    if (to && typeof to === 'object') {
      const maybe = to as { pathname?: unknown; search?: unknown }
      const rawPathname = typeof maybe.pathname === 'string' ? maybe.pathname : ''
      const rawSearch = typeof maybe.search === 'string' ? maybe.search : ''

      const pathname = rawPathname || '/'
      const search = rawSearch ? (rawSearch.startsWith('?') ? rawSearch : `?${rawSearch}`) : ''

      const combined = `${pathname}${search}`
      return combined.startsWith('/') ? combined : `/${combined}`
    }

    return '/'
  }

  /**
   * 获取当前 hash 路径
   */
  static getCurrentPath(): string {
    const hash = window.location.hash
    return hash ? hash.substring(1) : '/'
  }

  /**
   * 导航到指定路径
   */
  static navigate(to: unknown): void {
    window.location.hash = this.toPathString(to)
  }

  /**
   * 构建 hash URL
   */
  static buildHashUrl(to: unknown): string {
    return `#${this.toPathString(to)}`
  }

  /**
   * 从 URL 中获取查询参数
   */
  static getQueryParams(): Record<string, string> {
    const currentPath = this.getCurrentPath()
    const [, queryString] = currentPath.split('?')

    if (!queryString) return {}

    const params = new URLSearchParams(queryString)
    const result: Record<string, string> = {}

    params.forEach((value, key) => {
      result[key] = value
    })

    return result
  }

  /**
   * 处理 GitHub OAuth 回调
   */
  static handleOAuthCallback(): { code: string | null; error: string | null } {
    const params = this.getQueryParams()
    return {
      code: params.code || null,
      error: params.error || null,
    }
  }
}
