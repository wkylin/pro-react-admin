import { validateSocketUrl } from './crypto'

export const CHAT_PLATFORM_API = 'https://match-chat-server-seven.vercel.app/api'

export interface ChatPlatformRoom {
  id: string
  name: string
  jid: string
  status: 'active' | 'paused' | 'closed'
}

export interface ChatPlatformSession {
  imSessionId: string
  xmppUsername: string
  credential: string
  jid: string
  websocketUrl: string
  domain: string
}

export interface ChatPlatformConnection {
  apiBase: string
  token: string
  rooms: ChatPlatformRoom[]
  session: ChatPlatformSession
}

export function validateApiBase(value: string): string {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    throw new Error('请输入完整的 Chat Platform API 地址')
  }
  const localPage =
    typeof window !== 'undefined' && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
  const localTarget = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  if (
    (url.protocol !== 'https:' && !(url.protocol === 'http:' && localPage && localTarget)) ||
    url.username ||
    url.password ||
    url.hash ||
    url.search ||
    !url.pathname.replace(/\/$/, '').endsWith('/api')
  ) {
    throw new Error('请使用 https:// 服务端 /api 地址；本地开发可使用 http://localhost')
  }
  return `${url.origin}${url.pathname.replace(/\/$/, '')}`
}

async function request<T>(apiBase: string, path: string, init: RequestInit): Promise<T> {
  let response: Response
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12_000)
  try {
    response = await fetch(`${apiBase}${path}`, {
      ...init,
      headers: { 'content-type': 'application/json', ...init.headers },
      cache: 'no-store',
      signal: controller.signal,
    })
  } catch {
    throw new Error('Chat Platform API 不可达，请检查服务地址和网络')
  } finally {
    clearTimeout(timer)
  }
  const payload: unknown = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
        ? payload.error
        : `HTTP ${response.status}`
    throw new Error(`Chat Platform 请求失败：${message}`)
  }
  return payload as T
}

export async function openChatPlatformConnection(
  apiAddress: string,
  username: string,
  password: string
): Promise<ChatPlatformConnection> {
  const apiBase = validateApiBase(apiAddress)
  if (!username.trim() || !password) throw new Error('请输入 Chat Platform 用户名和密码')
  const auth = await request<{ token?: string }>(apiBase, '/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: username.trim(), password }),
  })
  if (typeof auth?.token !== 'string' || !auth.token) throw new Error('Chat Platform 登录响应缺少令牌')
  const headers = { authorization: `Bearer ${auth.token}` }
  const roomResult = await request<{ rooms?: ChatPlatformRoom[] }>(apiBase, '/rooms', { method: 'GET', headers })
  const session = await request<ChatPlatformSession>(apiBase, '/im/session', { method: 'POST', headers })
  if (
    !session ||
    typeof session.imSessionId !== 'string' ||
    typeof session.xmppUsername !== 'string' ||
    typeof session.credential !== 'string' ||
    typeof session.jid !== 'string' ||
    typeof session.domain !== 'string' ||
    typeof session.websocketUrl !== 'string'
  ) {
    throw new Error('Chat Platform 返回的 XMPP 会话不完整')
  }
  validateSocketUrl(session.websocketUrl)
  return {
    apiBase,
    token: auth.token,
    rooms: Array.isArray(roomResult?.rooms)
      ? roomResult.rooms.filter((room) => room && room.status === 'active' && room.id && room.jid)
      : [],
    session,
  }
}

export async function closeChatPlatformSession(connection: ChatPlatformConnection): Promise<void> {
  await request(connection.apiBase, '/im/session', {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${connection.token}`,
      'x-im-session-id': connection.session.imSessionId,
    },
  })
}
