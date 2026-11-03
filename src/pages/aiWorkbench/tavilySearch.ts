import { readEnterpriseSession } from '@platform/auth/model/session'
import { getEnv } from '@platform/config/env'

const ERROR_MESSAGES: Record<string, string> = {
  forbidden: '当前账号没有联网搜索权限。',
  invalid_query: '搜索问题不能为空，且长度不能超过 400 个字符。',
  search_rate_limited: '联网搜索次数过多，请 10 分钟后重试。',
  session_expired: '企业会话已过期，请重新登录。',
  session_revoked: '企业会话已失效，请重新登录。',
  tavily_not_configured: '联网搜索尚未配置 Tavily API Key，请联系管理员。',
  tavily_rate_limited: 'Tavily 搜索额度暂不可用，请稍后重试。',
  tavily_timeout: 'Tavily 搜索超时，请稍后重试。',
  tavily_unavailable: 'Tavily 搜索暂不可用，请稍后重试。',
  unauthorized: '企业会话已过期，请重新登录。',
}

function queryFrom(body: unknown): string {
  if (!body || typeof body !== 'object' || !('input' in body) || typeof body.input !== 'string')
    throw new Error('请输入要搜索的问题。')
  return body.input
}

async function errorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json()
    if (payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string')
      return ERROR_MESSAGES[payload.error] || `联网搜索失败（HTTP ${response.status}）。`
  } catch {
    // Keep the user-facing error generic; upstream response text may contain provider details.
  }
  return `联网搜索失败（HTTP ${response.status}）。`
}

export async function createTavilySearchFetcher(
  _apiUrl: string,
  requestInit: RequestInit | undefined,
  body: unknown
): Promise<Response> {
  const query = queryFrom(body).trim()
  if (!query) throw new Error('请输入要搜索的问题。')

  const session = readEnterpriseSession()
  if (!session) throw new Error('请先登录企业账号，再使用联网搜索。')

  const apiBase = getEnv('APP_BASE_URL').replace(/\/+$/, '')
  const headers = new Headers(requestInit?.headers)
  headers.set('Accept', 'text/event-stream')
  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `Bearer ${session.token}`)
  headers.set('X-Tenant-ID', session.tenantId)

  let response: Response
  try {
    response = await fetch(`${apiBase}/api/ai/tavily-search`, {
      ...requestInit,
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
      credentials: 'omit',
    })
  } catch (error) {
    if (requestInit?.signal?.aborted) throw error
    throw new Error('无法连接 Enterprise API，请检查服务地址和网络。', { cause: error })
  }

  if (!response.ok) throw new Error(await errorMessage(response))
  if (!response.headers.get('Content-Type')?.toLowerCase().includes('text/event-stream'))
    throw new Error('联网搜索服务返回了无效响应。')
  return response
}
