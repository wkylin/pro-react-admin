export const TRACKING_API_BASE = '/api/tracking'

export const getTrackingJson = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.toLowerCase().includes('json')) {
    const isLocalDevelopment =
      typeof window !== 'undefined' && ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
    const guidance = isLocalDevelopment
      ? '当前请求落到了前端 HTML 回退页。请停止旧服务并运行 pnpm start，再访问终端输出的前端地址。'
      : '请检查部署环境中的 /api/tracking 服务端代理配置。'

    throw new Error(
      `埋点 API ${response.url} 返回 HTTP ${response.status}，Content-Type 为 ${contentType || '未知'}；预期 JSON。${guidance}`
    )
  }

  const payload = (await response.json()) as T & { error?: string; message?: string }
  if (!response.ok) {
    const message = payload?.message || payload?.error || response.statusText
    throw new Error(`埋点 API 请求失败（HTTP ${response.status}）：${message}`)
  }
  return payload
}
