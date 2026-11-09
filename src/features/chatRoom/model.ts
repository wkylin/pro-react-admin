import { parseEncryptedMessage, validateSocketUrl } from '../secureCommunication/crypto'
import type { ChatPlatformSession } from '../secureCommunication/chatPlatform'

export interface ChatUser {
  id: string
  username: string
  displayName: string
  role: 'user' | 'admin'
  status: 'active' | 'suspended'
  createdAt: string
}

export interface ChatRoom {
  id: string
  name: string
  description: string
  jid: string
  status: 'active' | 'paused' | 'closed'
  ownerId: string
  memberCount: number
  messageCount: number
  createdAt: string
}

export interface ChatMessage {
  id: string
  roomId: string
  userId: string
  displayName: string
  body: string
  status: 'visible' | 'removed'
  createdAt: string
  kind: 'text' | 'encrypted' | 'removed'
}

/** Private, in-memory notes are deliberately not ChatMessages and never enter the room transport. */
export interface PrivateRoomNote {
  id: string
  roomId: string
  body: string
  createdAt: string
}

export interface ChatSession extends ChatPlatformSession {
  expiresInSeconds?: number
}

export interface ChatConnection {
  apiBase: string
  token: string
  user: ChatUser
  session: ChatSession
}

export const CHAT_MESSAGE_LIMIT = 4000

export function isChatRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isChatIdentifier(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 200 &&
    !/\s/u.test(value) &&
    !Array.from(value).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)
  )
}

function label(value: unknown, maximum: number): string | null {
  return typeof value === 'string' && value.trim() ? value.trim().replace(/\s+/g, ' ').slice(0, maximum) : null
}

function date(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 80 || !Number.isFinite(Date.parse(value))) return null
  return new Date(value).toISOString()
}

function count(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
}

function bareJid(value: unknown): value is string {
  return isChatIdentifier(value) && /^[^@/]+@[^@/]+$/u.test(value)
}

export function normalizeChatUser(value: unknown): ChatUser | null {
  if (!isChatRecord(value) || !isChatIdentifier(value.id) || !isChatIdentifier(value.username)) return null
  const displayName = label(value.displayName, 120)
  const createdAt = date(value.createdAt)
  if (
    !displayName ||
    !createdAt ||
    !['user', 'admin'].includes(value.role as string) ||
    !['active', 'suspended'].includes(value.status as string)
  )
    return null
  return {
    id: value.id,
    username: value.username,
    displayName,
    role: value.role as ChatUser['role'],
    status: value.status as ChatUser['status'],
    createdAt,
  }
}

export function normalizeChatRoom(value: unknown): ChatRoom | null {
  if (
    !isChatRecord(value) ||
    !isChatIdentifier(value.id) ||
    !bareJid(value.jid) ||
    !isChatIdentifier(value.ownerId) ||
    !count(value.memberCount) ||
    !count(value.messageCount)
  )
    return null
  const name = label(value.name, 80)
  const createdAt = date(value.createdAt)
  if (
    !name ||
    !createdAt ||
    !['active', 'paused', 'closed'].includes(value.status as string) ||
    typeof value.description !== 'string'
  )
    return null
  return {
    id: value.id,
    name,
    description: value.description.slice(0, 2000),
    jid: value.jid,
    status: value.status as ChatRoom['status'],
    ownerId: value.ownerId,
    memberCount: value.memberCount,
    messageCount: value.messageCount,
    createdAt,
  }
}

export function normalizeChatSession(value: unknown): ChatSession | null {
  if (
    !isChatRecord(value) ||
    !isChatIdentifier(value.imSessionId) ||
    !isChatIdentifier(value.xmppUsername) ||
    !bareJid(value.jid) ||
    !isChatIdentifier(value.domain) ||
    typeof value.credential !== 'string' ||
    !value.credential ||
    value.credential.length > 8192 ||
    typeof value.websocketUrl !== 'string'
  )
    return null
  let websocketUrl: string
  try {
    websocketUrl = validateSocketUrl(value.websocketUrl)
  } catch {
    return null
  }
  if (value.expiresInSeconds !== undefined && (!count(value.expiresInSeconds) || !value.expiresInSeconds)) return null
  if (value.jid.split('@')[1] !== value.domain) return null
  return {
    imSessionId: value.imSessionId,
    xmppUsername: value.xmppUsername,
    credential: value.credential,
    jid: value.jid,
    domain: value.domain,
    websocketUrl,
    ...(value.expiresInSeconds === undefined ? {} : { expiresInSeconds: value.expiresInSeconds as number }),
  }
}

function messageHeader(value: unknown): Omit<ChatMessage, 'body' | 'kind'> | null {
  if (
    !isChatRecord(value) ||
    !isChatIdentifier(value.id) ||
    !isChatIdentifier(value.roomId) ||
    !isChatIdentifier(value.userId) ||
    !['visible', 'removed'].includes(value.status as string)
  )
    return null
  const displayName = label(value.displayName, 120)
  const createdAt = date(value.createdAt)
  if (!displayName || !createdAt) return null
  return {
    id: value.id,
    roomId: value.roomId,
    userId: value.userId,
    displayName,
    status: value.status as ChatMessage['status'],
    createdAt,
  }
}

export function normalizeChatMessage(value: unknown): ChatMessage | null {
  const header = messageHeader(value)
  if (!header || !isChatRecord(value)) return null
  if (header.status === 'removed') return { ...header, body: '', kind: 'removed' }
  if (typeof value.body !== 'string') return null
  if (!value.body.trim() || value.body.length > CHAT_MESSAGE_LIMIT) return null
  let encrypted = false
  try {
    parseEncryptedMessage(value.body)
    encrypted = true
  } catch {
    // JSON-looking text is still ordinary chat unless it is a valid lab envelope.
  }
  return { ...header, body: encrypted ? '' : value.body, kind: encrypted ? 'encrypted' : 'text' }
}

export function mergeChatMessages(previous: readonly ChatMessage[], incoming: readonly ChatMessage[]): ChatMessage[] {
  const messages = new Map<string, ChatMessage>()
  for (const candidate of [...previous, ...incoming]) {
    const header = messageHeader(candidate)
    if (!header) continue
    // An already-redacted envelope must remain opaque when history and live data merge.
    const safe =
      candidate.kind === 'encrypted' && candidate.body === '' && header.status === 'visible'
        ? { ...header, body: '', kind: 'encrypted' as const }
        : normalizeChatMessage(candidate)
    if (!safe) continue
    const existing = messages.get(safe.id)
    if (existing?.kind === 'removed' && safe.kind !== 'removed') continue
    messages.set(safe.id, safe)
  }
  return [...messages.values()]
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt) || left.id.localeCompare(right.id))
    .slice(-200)
}
