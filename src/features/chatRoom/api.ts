import { validateApiBase } from '../secureCommunication/chatPlatform'
import {
  isChatIdentifier,
  isChatRecord,
  normalizeChatMessage,
  normalizeChatRoom,
  normalizeChatSession,
  normalizeChatUser,
  type ChatConnection,
  type ChatMessage,
  type ChatRoom,
} from './model'

export type ChatApiErrorCode =
  | 'invalidInput'
  | 'invalidResponse'
  | 'network'
  | 'timeout'
  | 'aborted'
  | 'unauthorized'
  | 'forbidden'
  | 'unavailable'
  | 'roomUnavailable'
  | 'rateLimited'

export class ChatApiError extends Error {
  constructor(public readonly code: ChatApiErrorCode) {
    super(`Chat request failed: ${code}`)
    this.name = 'ChatApiError'
  }
}

export interface ChatApiOptions {
  signal?: AbortSignal
  fetcher?: typeof fetch
  timeoutMs?: number
}

function httpError(status: number): ChatApiError {
  return new ChatApiError(
    status === 401
      ? 'unauthorized'
      : status === 403
        ? 'forbidden'
        : status === 409
          ? 'roomUnavailable'
          : status === 429
            ? 'rateLimited'
            : status === 400 || status === 404 || status === 422
              ? 'invalidInput'
              : 'unavailable'
  )
}

async function request<T>(
  apiBase: string,
  path: string,
  init: RequestInit,
  options: ChatApiOptions,
  read: (value: unknown) => T,
  onPayload?: (value: unknown) => void
): Promise<T> {
  try {
    apiBase = validateApiBase(apiBase)
  } catch {
    throw new ChatApiError('invalidInput')
  }
  if (options.signal?.aborted) throw new ChatApiError('aborted')
  const controller = new AbortController()
  let cancellation: ChatApiError | undefined
  let cancel: (code: 'aborted' | 'timeout') => void
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancel = (code) => {
      cancellation ??= new ChatApiError(code)
      reject(cancellation)
      controller.abort()
    }
  })
  const onAbort = () => cancel('aborted')
  options.signal?.addEventListener('abort', onAbort, { once: true })
  const timeoutMs =
    typeof options.timeoutMs === 'number' && Number.isFinite(options.timeoutMs) && options.timeoutMs > 0
      ? options.timeoutMs
      : 12_000
  const timer = setTimeout(() => cancel('timeout'), timeoutMs)
  const run = async () => {
    let response: Response
    try {
      response = await (options.fetcher ?? fetch)(`${apiBase}${path}`, {
        ...init,
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init.headers },
        credentials: 'omit',
        cache: 'no-store',
        redirect: 'error',
        signal: controller.signal,
      })
    } catch {
      throw new ChatApiError('network')
    }
    if (!response.ok) throw httpError(response.status)
    if (response.status === 204) return read(undefined)
    const contentType = response.headers?.get('Content-Type')
    if (contentType && !contentType.toLowerCase().includes('application/json'))
      throw new ChatApiError('invalidResponse')
    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      throw new ChatApiError('invalidResponse')
    }
    onPayload?.(payload)
    if (cancellation) throw cancellation
    try {
      return read(payload)
    } catch (error) {
      throw error instanceof ChatApiError ? error : new ChatApiError('invalidResponse')
    }
  }
  try {
    return await Promise.race([run(), cancelled])
  } catch (error) {
    throw cancellation ?? error
  } finally {
    clearTimeout(timer)
    options.signal?.removeEventListener('abort', onAbort)
  }
}

function authenticated(connection: ChatConnection) {
  if (!connection.token || typeof connection.token !== 'string') throw new ChatApiError('unauthorized')
  return { Authorization: `Bearer ${connection.token}` }
}

function roomPath(roomId: string) {
  if (!isChatIdentifier(roomId)) throw new ChatApiError('invalidInput')
  return `/rooms/${encodeURIComponent(roomId)}`
}

export async function loginChatPlatform(
  apiAddress: string,
  username: string,
  password: string,
  options: ChatApiOptions = {}
): Promise<ChatConnection> {
  let apiBase: string
  try {
    apiBase = validateApiBase(apiAddress)
  } catch {
    throw new ChatApiError('invalidInput')
  }
  if (
    typeof username !== 'string' ||
    !/^[a-z0-9._-]{3,32}$/i.test(username.trim()) ||
    typeof password !== 'string' ||
    !password ||
    password.length > 8192
  )
    throw new ChatApiError('invalidInput')
  const auth = await request(
    apiBase,
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ username: username.trim().toLowerCase(), password }) },
    options,
    (value) => {
      const user = isChatRecord(value) ? normalizeChatUser(value.user) : null
      if (
        !isChatRecord(value) ||
        typeof value.token !== 'string' ||
        !value.token ||
        value.token.length > 16_384 ||
        /\s/.test(value.token) ||
        !user
      )
        throw new ChatApiError('invalidResponse')
      if (user.status !== 'active') throw new ChatApiError('forbidden')
      return { token: value.token, user }
    }
  )
  let cleanupStarted = false
  const revoke = (payload: unknown) => {
    if (cleanupStarted || !isChatRecord(payload) || !isChatIdentifier(payload.imSessionId)) return
    cleanupStarted = true
    void request(
      apiBase,
      '/im/session',
      { method: 'DELETE', headers: { Authorization: `Bearer ${auth.token}`, 'X-IM-Session-ID': payload.imSessionId } },
      { fetcher: options.fetcher, timeoutMs: options.timeoutMs },
      () => undefined
    ).catch(() => undefined)
  }
  let seenPayload: unknown
  let ended = false
  try {
    const session = await request(
      apiBase,
      '/im/session',
      { method: 'POST', headers: { Authorization: `Bearer ${auth.token}` } },
      options,
      (value) => {
        const normalized = normalizeChatSession(value)
        if (!normalized) throw new ChatApiError('invalidResponse')
        return normalized
      },
      (value) => {
        seenPayload = value
        if (ended || options.signal?.aborted) revoke(value)
      }
    )
    if (options.signal?.aborted) {
      revoke(session)
      throw new ChatApiError('aborted')
    }
    return { apiBase, ...auth, session }
  } catch (error) {
    ended = true
    revoke(seenPayload)
    throw error
  }
}

export async function listChatRooms(connection: ChatConnection, options: ChatApiOptions = {}): Promise<ChatRoom[]> {
  return request(
    connection.apiBase,
    '/rooms',
    { method: 'GET', headers: authenticated(connection) },
    options,
    (value) => {
      if (!isChatRecord(value) || !Array.isArray(value.rooms)) throw new ChatApiError('invalidResponse')
      return value.rooms.slice(0, 500).flatMap((item) => {
        const room = normalizeChatRoom(item)
        return room ? [room] : []
      })
    }
  )
}

export async function joinChatRoom(
  connection: ChatConnection,
  roomId: string,
  options: ChatApiOptions = {}
): Promise<void> {
  await request(
    connection.apiBase,
    `${roomPath(roomId)}/join`,
    { method: 'POST', headers: authenticated(connection) },
    options,
    (value) => {
      const room = isChatRecord(value) ? normalizeChatRoom(value.room) : null
      if (!room || room.id !== roomId) throw new ChatApiError('invalidResponse')
    }
  )
}

export async function listChatMessages(
  connection: ChatConnection,
  roomId: string,
  limit = 80,
  options: ChatApiOptions = {}
): Promise<ChatMessage[]> {
  if (!Number.isInteger(limit) || limit < 1 || limit > 200) throw new ChatApiError('invalidInput')
  return request(
    connection.apiBase,
    `${roomPath(roomId)}/messages?limit=${limit}`,
    { method: 'GET', headers: authenticated(connection) },
    options,
    (value) => {
      if (!isChatRecord(value) || !Array.isArray(value.messages)) throw new ChatApiError('invalidResponse')
      return value.messages.slice(-200).flatMap((item) => {
        const message = normalizeChatMessage(item)
        return message?.roomId === roomId ? [message] : []
      })
    }
  )
}

export async function closeChatSession(connection: ChatConnection, options: ChatApiOptions = {}): Promise<void> {
  if (!isChatIdentifier(connection.session.imSessionId)) throw new ChatApiError('invalidInput')
  await request(
    connection.apiBase,
    '/im/session',
    { method: 'DELETE', headers: { ...authenticated(connection), 'X-IM-Session-ID': connection.session.imSessionId } },
    options,
    () => undefined
  )
}
