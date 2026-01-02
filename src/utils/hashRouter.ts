/**
 * Hash 路由工具函数
 */
export class HashRouterUtils {
  /**
   * 获取当前 hash 路径
   */
  static getCurrentPath(): string {
    const hash = window.location.hash
    return hash ? hash.substring(1) : '/' // 去掉 # 符号
  }

  /**
   * 导航到指定路径
   */
  static navigate(path: string): void {
    window.location.hash = path
  }

  /**
   * 构建 hash URL
   */
  static buildHashUrl(path: string): string {
    return `#${path}`
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
