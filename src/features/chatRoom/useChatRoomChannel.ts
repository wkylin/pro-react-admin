import { useCallback, useEffect, useRef, useState } from 'react'
import type { XmppClient, XmppElement } from '@xmpp/client'
import { validateSocketUrl } from '@features/secureCommunication/crypto'
import { loadXmppClient } from '@features/secureCommunication/xmppLoader'
import { normalizeChatMessage, type ChatConnection, type ChatMessage, type ChatRoom } from './model'

export type ChatChannelStatus = 'disconnected' | 'connecting' | 'online' | 'error'
export type ChatChannelErrorCode =
  | 'cancelled'
  | 'invalidSession'
  | 'authentication'
  | 'connection'
  | 'connectionTimeout'
  | 'reconnectTimeout'
  | 'sessionExpired'
  | 'notConnected'
  | 'invalidRoom'
  | 'joinRejected'
  | 'joinTimeout'
  | 'notJoined'
  | 'invalidMessage'
  | 'sendFailed'

export class ChatChannelError extends Error {
  constructor(public readonly code: ChatChannelErrorCode) {
    super(`Chat channel failed: ${code}`)
    this.name = 'ChatChannelError'
  }
}

interface ChannelCallbacks {
  onMessage: (message: ChatMessage) => void
  onReconnect?: () => void | Promise<void>
}

type Library = Awaited<ReturnType<typeof loadXmppClient>>
type Timer = ReturnType<typeof setTimeout>
interface PendingJoin {
  promise: Promise<void>
  resolve: () => void
  reject: (error: ChatChannelError) => void
  timer: Timer
}
interface Runtime {
  client: XmppClient
  library: Library
  nickname: string
  rooms: Map<string, ChatRoom>
  confirmed: Set<string>
  pending: Map<string, PendingJoin>
  seen: Set<string>
  readyReject: (error: ChatChannelError) => void
  readyResolve: () => void
  readyTimer?: Timer
  reconnectTimer?: Timer
  expiryTimer?: Timer
  hasBeenOnline: boolean
  online: boolean
  rejoining: boolean
  transportEpoch: number
}

const TIMEOUT_MS = 12_000
const MUC = 'http://jabber.org/protocol/muc'
const MUC_USER = 'http://jabber.org/protocol/muc#user'
const META = 'urn:match-chat:meta'

function authenticationFailure(cause: unknown): boolean {
  if (cause instanceof ChatChannelError && cause.code === 'authentication') return true
  if (!cause || typeof cause !== 'object') return false
  const error = cause as Record<string, unknown>
  return (
    error.name === 'SASLError' ||
    [error.condition, error.code, error.message].some(
      (value) => typeof value === 'string' && /not-authorized|credentials-expired|account-disabled/.test(value)
    )
  )
}

/** Chat Platform's ordinary text protocol; the encryption laboratory remains independent. */
export function useChatRoomChannel(callbacks: ChannelCallbacks, loadClient: typeof loadXmppClient = loadXmppClient) {
  const [status, setStatus] = useState<ChatChannelStatus>('disconnected')
  const [error, setError] = useState<ChatChannelErrorCode>()
  const callbacksRef = useRef(callbacks)
  const runtimeRef = useRef<Runtime | null>(null)
  const generation = useRef(0)
  const mounted = useRef(true)
  const pendingImport = useRef<{ reject: (error: ChatChannelError) => void; timer: Timer } | null>(null)
  callbacksRef.current = callbacks

  const clearRuntime = useCallback((runtime: Runtime, code: ChatChannelErrorCode) => {
    runtime.online = false
    runtime.rejoining = false
    clearTimeout(runtime.readyTimer)
    clearTimeout(runtime.reconnectTimer)
    clearTimeout(runtime.expiryTimer)
    runtime.readyReject(new ChatChannelError(code))
    for (const pending of runtime.pending.values()) {
      clearTimeout(pending.timer)
      pending.reject(new ChatChannelError(code))
    }
    runtime.pending.clear()
    runtime.confirmed.clear()
    runtime.client.reconnect.stop()
  }, [])

  const disconnect = useCallback(async () => {
    generation.current += 1
    if (pendingImport.current) {
      clearTimeout(pendingImport.current.timer)
      pendingImport.current.reject(new ChatChannelError('cancelled'))
      pendingImport.current = null
    }
    const runtime = runtimeRef.current
    runtimeRef.current = null
    if (mounted.current) {
      setStatus('disconnected')
      setError(undefined)
    }
    if (!runtime) return
    clearRuntime(runtime, 'cancelled')
    try {
      await runtime.client.stop()
    } catch {
      // A closed transport still counts as disconnected.
    }
  }, [clearRuntime])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      void disconnect()
    }
  }, [disconnect])

  const fail = useCallback(
    (runtime: Runtime, code: ChatChannelErrorCode) => {
      if (runtimeRef.current !== runtime) return
      runtimeRef.current = null
      generation.current += 1
      clearRuntime(runtime, code)
      if (mounted.current) {
        setError(code)
        setStatus('error')
      }
      void Promise.resolve()
        .then(() => runtime.client.stop())
        .catch(() => undefined)
    },
    [clearRuntime]
  )

  const joinRuntime = useCallback((runtime: Runtime, room: ChatRoom): Promise<void> => {
    if (runtimeRef.current !== runtime || !runtime.online || runtime.client.status !== 'online')
      return Promise.reject(new ChatChannelError('notConnected'))
    let jid: string
    try {
      const parsed = runtime.library.jid(room.jid.trim())
      if (!parsed.local || !parsed.domain || room.jid.includes('/') || room.status !== 'active')
        throw new Error('invalid')
      jid = parsed.toString()
    } catch {
      return Promise.reject(new ChatChannelError('invalidRoom'))
    }
    if (runtime.rooms.get(jid)?.id !== undefined && runtime.rooms.get(jid)?.id !== room.id)
      return Promise.reject(new ChatChannelError('invalidRoom'))
    if (runtime.confirmed.has(jid)) return Promise.resolve()
    const existing = runtime.pending.get(jid)
    if (existing) return existing.promise
    runtime.rooms.set(jid, room)
    let resolve!: () => void
    let reject!: (error: ChatChannelError) => void
    const promise = new Promise<void>((done, failed) => {
      resolve = done
      reject = failed
    })
    const timer = setTimeout(() => {
      if (runtime.pending.get(jid)?.promise !== promise) return
      runtime.pending.delete(jid)
      runtime.rooms.delete(jid)
      reject(new ChatChannelError('joinTimeout'))
    }, TIMEOUT_MS)
    runtime.pending.set(jid, { promise, resolve, reject, timer })
    void Promise.resolve()
      .then(() => {
        if (runtimeRef.current !== runtime || !runtime.online || runtime.pending.get(jid)?.promise !== promise) return
        return runtime.client.send(
          runtime.library.xml(
            'presence',
            { to: `${jid}/${runtime.nickname}` },
            runtime.library.xml('x', { xmlns: MUC })
          )
        )
      })
      .catch(() => {
        const pending = runtime.pending.get(jid)
        if (pending?.promise !== promise) return
        clearTimeout(pending.timer)
        runtime.pending.delete(jid)
        runtime.rooms.delete(jid)
        reject(new ChatChannelError('joinRejected'))
      })
    return promise
  }, [])

  const connect = useCallback(
    async (connection: ChatConnection) => {
      const attempt = generation.current + 1
      await disconnect()
      if (!mounted.current || generation.current !== attempt) throw new ChatChannelError('cancelled')
      const deadline = Date.now() + TIMEOUT_MS
      if (mounted.current) {
        setStatus('connecting')
        setError(undefined)
      }
      let library: Library
      try {
        validateSocketUrl(connection.session.websocketUrl)
        if (!connection.session.credential || !connection.session.xmppUsername || !connection.session.imSessionId)
          throw new Error('invalid')
      } catch {
        if (mounted.current && generation.current === attempt) {
          setStatus('error')
          setError('invalidSession')
        }
        throw new ChatChannelError('invalidSession')
      }
      let rejectImport!: (error: ChatChannelError) => void
      const importCancelled = new Promise<never>((_resolve, reject) => {
        rejectImport = reject
      })
      const importTimer = setTimeout(() => rejectImport(new ChatChannelError('connectionTimeout')), TIMEOUT_MS)
      const currentImport = { reject: rejectImport, timer: importTimer }
      pendingImport.current = currentImport
      try {
        library = await Promise.race([Promise.resolve().then(loadClient), importCancelled])
      } catch (cause) {
        const code = cause instanceof ChatChannelError ? cause.code : 'connection'
        if (mounted.current && generation.current === attempt) {
          setStatus('error')
          setError(code)
        }
        throw new ChatChannelError(code)
      } finally {
        clearTimeout(importTimer)
        if (pendingImport.current === currentImport) pendingImport.current = null
      }
      if (!mounted.current || generation.current !== attempt) throw new ChatChannelError('cancelled')
      let readyResolve!: () => void
      let readyReject!: (error: ChatChannelError) => void
      const ready = new Promise<void>((resolve, reject) => {
        readyResolve = resolve
        readyReject = reject
      })
      let client: XmppClient
      try {
        client = library.client({
          service: validateSocketUrl(connection.session.websocketUrl),
          domain: connection.session.domain,
          resource: connection.session.imSessionId,
          credentials: async (authenticate, mechanisms) => {
            if (!mechanisms.includes('PLAIN')) throw new ChatChannelError('authentication')
            await authenticate(
              { username: connection.session.xmppUsername, password: connection.session.credential },
              'PLAIN'
            )
          },
        })
      } catch {
        if (mounted.current && generation.current === attempt) {
          setStatus('error')
          setError('connection')
        }
        throw new ChatChannelError('connection')
      }
      const runtime: Runtime = {
        client,
        library,
        nickname: `u-${connection.user.id.slice(0, 10)}`,
        rooms: new Map(),
        confirmed: new Set(),
        pending: new Map(),
        seen: new Set(),
        readyResolve,
        readyReject,
        hasBeenOnline: false,
        online: false,
        rejoining: false,
        transportEpoch: 0,
      }
      runtimeRef.current = runtime
      const isCurrent = () => mounted.current && runtimeRef.current === runtime && generation.current === attempt
      runtime.readyTimer = setTimeout(() => fail(runtime, 'connectionTimeout'), Math.max(1, deadline - Date.now()))
      const lifetime = connection.session.expiresInSeconds
      if (typeof lifetime === 'number' && Number.isFinite(lifetime) && lifetime > 0)
        runtime.expiryTimer = setTimeout(
          () => fail(runtime, 'sessionExpired'),
          Math.min(lifetime * 1000, 2_147_483_647)
        )

      const beginReconnectWindow = () => {
        if (runtime.reconnectTimer) return
        runtime.reconnectTimer = setTimeout(() => fail(runtime, 'reconnectTimeout'), TIMEOUT_MS)
      }
      const transportLost = () => {
        if (!isCurrent()) return
        runtime.transportEpoch += 1
        runtime.online = false
        runtime.rejoining = false
        runtime.confirmed.clear()
        for (const pending of runtime.pending.values()) {
          clearTimeout(pending.timer)
          pending.reject(new ChatChannelError('notConnected'))
        }
        runtime.pending.clear()
        setStatus('connecting')
        beginReconnectWindow()
      }
      client.on('online', () => {
        if (!isCurrent() || runtime.online) return
        const transportEpoch = ++runtime.transportEpoch
        const reconnecting = runtime.hasBeenOnline
        runtime.hasBeenOnline = true
        runtime.online = true
        clearTimeout(runtime.readyTimer)
        clearTimeout(runtime.reconnectTimer)
        runtime.reconnectTimer = undefined
        setError(undefined)
        runtime.readyResolve()
        if (reconnecting) {
          runtime.rejoining = true
          setStatus('connecting')
          runtime.confirmed.clear()
          const rooms = [...runtime.rooms.values()]
          const isThisTransport = () => isCurrent() && runtime.transportEpoch === transportEpoch
          void Promise.all(rooms.map((room) => joinRuntime(runtime, room))).then(
            () => {
              if (!isThisTransport()) return
              runtime.rejoining = false
              setStatus('online')
              void Promise.resolve()
                .then(() => {
                  if (isThisTransport()) return callbacksRef.current.onReconnect?.()
                })
                .catch(() => {
                  if (isThisTransport()) setError('connection')
                })
            },
            (cause: unknown) => {
              if (isThisTransport()) fail(runtime, cause instanceof ChatChannelError ? cause.code : 'joinRejected')
            }
          )
        } else {
          setStatus('online')
        }
      })
      client.on('stanza', (stanza: XmppElement) => {
        if (!isCurrent()) return
        const roomJid = stanza.attrs.from?.split('/')[0] ?? ''
        if (stanza.is('presence')) {
          if (stanza.attrs.type === 'error') {
            const affected = roomJid ? [[roomJid, runtime.pending.get(roomJid)] as const] : [...runtime.pending]
            for (const [jid, pending] of affected) {
              if (!pending) continue
              clearTimeout(pending.timer)
              runtime.pending.delete(jid)
              runtime.rooms.delete(jid)
              pending.reject(new ChatChannelError('joinRejected'))
            }
            return
          }
          const pending = runtime.pending.get(roomJid)
          const selfJoin = stanza
            .getChild('x', MUC_USER)
            ?.getChildren('status')
            .some((item) => item.attrs.code === '110')
          if (pending && selfJoin && stanza.attrs.type !== 'unavailable') {
            clearTimeout(pending.timer)
            runtime.pending.delete(roomJid)
            runtime.confirmed.add(roomJid)
            pending.resolve()
          }
          return
        }
        if (!stanza.is('message') || stanza.attrs.type !== 'groupchat' || !runtime.confirmed.has(roomJid)) return
        const room = runtime.rooms.get(roomJid)
        const meta = stanza.getChild('x', META)
        if (!room || !meta) return
        const message = normalizeChatMessage({
          id: stanza.attrs.id,
          roomId: room.id,
          userId: meta.attrs.userId,
          displayName: meta.attrs.displayName,
          createdAt: meta.attrs.createdAt,
          body: stanza.getChildText('body'),
          status: 'visible',
        })
        if (!message || runtime.seen.has(message.id)) return
        runtime.seen.add(message.id)
        if (runtime.seen.size > 500) runtime.seen.delete(runtime.seen.values().next().value!)
        callbacksRef.current.onMessage(message)
      })
      // @xmpp/connection emits disconnect for socket close; offline is reserved for explicit stop.
      client.on('disconnect', transportLost)
      client.on('offline', transportLost)
      client.on('error', (cause) => {
        if (!isCurrent()) return
        if (authenticationFailure(cause) || (cause instanceof ChatChannelError && cause.code === 'authentication')) {
          fail(runtime, 'authentication')
        } else if (!runtime.hasBeenOnline) {
          fail(runtime, 'connection')
        } else {
          transportLost()
          setError('connection')
        }
      })
      void Promise.resolve()
        .then(() => client.start())
        .then(() => {
          if (isCurrent() && client.status !== 'online') fail(runtime, 'connection')
        })
        .catch((cause: unknown) => {
          if (isCurrent()) fail(runtime, authenticationFailure(cause) ? 'authentication' : 'connection')
        })
      await ready
    },
    [disconnect, fail, joinRuntime, loadClient]
  )

  const joinRoom = useCallback(
    (room: ChatRoom) => {
      const runtime = runtimeRef.current
      return runtime ? joinRuntime(runtime, room) : Promise.reject(new ChatChannelError('notConnected'))
    },
    [joinRuntime]
  )

  const sendRoom = useCallback(async (room: ChatRoom, value: string) => {
    const body = value.trim()
    if (!body || body.length > 4000) throw new ChatChannelError('invalidMessage')
    const runtime = runtimeRef.current
    if (!runtime || !runtime.online || runtime.rejoining || runtime.client.status !== 'online')
      throw new ChatChannelError('notConnected')
    if (!runtime.confirmed.has(room.jid) || runtime.rooms.get(room.jid)?.id !== room.id)
      throw new ChatChannelError('notJoined')
    try {
      await runtime.client.send(
        runtime.library.xml('message', { to: room.jid, type: 'groupchat' }, runtime.library.xml('body', {}, body))
      )
    } catch {
      throw new ChatChannelError('sendFailed')
    }
    if (runtimeRef.current !== runtime || !runtime.online || runtime.rejoining || runtime.client.status !== 'online')
      throw new ChatChannelError('cancelled')
  }, [])

  return { status, error, connect, disconnect, joinRoom, sendRoom }
}
