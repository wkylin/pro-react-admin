import { createServer } from 'node:http'
import type { IncomingMessage } from 'node:http'
import type { Duplex } from 'node:stream'
import pg from 'pg'
import { WebSocket, WebSocketServer } from 'ws'
import type { RawData } from 'ws'
import type { PostgresEnterpriseService } from './postgres-service.mts'

const PROTOCOL = 'pro-admin-events-v1'
const CHANNEL = 'enterprise_resource_events'
const AUTH_TIMEOUT_MS = 5_000
const SESSION_RECHECK_MS = 15_000
const MAX_CONNECTIONS = 200

export type AuditNotice = { tenantId: string; seq: string; resource: string; action: string }
type Listener = { close(): Promise<void> }
export type ListenerFactory = (notify: (notice: AuditNotice) => void, failed: () => void) => Promise<Listener>
type ClientState = {
  address: string
  sessionHash?: string
  tenantId?: string
  principalId?: string
  cursor?: string
  alive: boolean
  queue: Promise<void>
}

/** One direct PostgreSQL connection per Function instance with active sockets. */
export function postgresAuditListener(connectionString: string): ListenerFactory {
  const url = new URL(connectionString)
  if (!/^postgres(?:ql)?:$/.test(url.protocol) || url.hostname.includes('-pooler.'))
    throw new Error('DATABASE_URL_UNPOOLED must be a direct PostgreSQL URL')
  url.searchParams.set('sslmode', 'verify-full')
  return async (notify, failed) => {
    const client = new pg.Client({ connectionString: String(url), connectionTimeoutMillis: 5_000, keepAlive: true })
    let closing = false
    client.on('notification', (message) => {
      if (message.channel !== CHANNEL || !message.payload) return
      try {
        const value: unknown = JSON.parse(message.payload)
        if (!value || typeof value !== 'object') return
        const record = value as Record<string, unknown>
        if (
          typeof record.tenantId !== 'string' ||
          typeof record.seq !== 'string' ||
          !/^\d+$/.test(record.seq) ||
          typeof record.resource !== 'string' ||
          typeof record.action !== 'string'
        )
          return
        notify(record as AuditNotice)
      } catch {
        // The database trigger owns this private channel; ignore malformed payloads.
      }
    })
    client.on('error', () => {
      if (!closing) failed()
    })
    client.on('end', () => {
      if (!closing) failed()
    })
    try {
      await client.connect()
      await client.query(`LISTEN ${CHANNEL}`)
    } catch (error) {
      closing = true
      await client.end().catch(() => undefined)
      throw error
    }
    return {
      async close() {
        closing = true
        await client.end().catch(() => undefined)
      },
    }
  }
}

/** Database notifications carry only tenant/resource names and a durable audit cursor. */
export function createPostgresEnterpriseEventsServer(
  service: PostgresEnterpriseService,
  { origins, listen }: { origins: ReadonlySet<string>; listen: ListenerFactory }
) {
  const server = createServer((_request, response) => {
    response.writeHead(426, { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: 'websocket_upgrade_required' }))
  })
  const wss = new WebSocketServer({
    noServer: true,
    maxPayload: 4_096,
    perMessageDeflate: false,
    handleProtocols: (protocols) => (protocols.has(PROTOCOL) ? PROTOCOL : false),
  })
  const clients = new Map<WebSocket, ClientState>()
  let listener: Listener | undefined
  let connecting: Promise<void> | undefined
  let idleTimer: ReturnType<typeof setTimeout> | undefined

  const send = (socket: WebSocket, message: Record<string, unknown>) => {
    if (socket.readyState !== WebSocket.OPEN) return
    if (socket.bufferedAmount > 1_000_000) return socket.close(1013, 'slow_consumer')
    socket.send(JSON.stringify({ version: 1, ...message }))
  }
  const closeForError = (socket: WebSocket, error: unknown) => {
    if (socket.readyState !== WebSocket.OPEN) return
    const status = error && typeof error === 'object' && 'status' in error ? error.status : undefined
    if (status === 401 || status === 403) {
      send(socket, { type: 'session.revoked', reason: 'session_changed' })
      socket.close(4401, 'session_changed')
    } else socket.close(1013, 'event_source_unavailable')
  }
  const listenerFailed = () => {
    const previous = listener
    listener = undefined
    void previous?.close()
    for (const socket of clients.keys())
      if (socket.readyState === WebSocket.OPEN) socket.close(1013, 'event_source_unavailable')
  }
  const maybeCloseListener = () => {
    if (clients.size || idleTimer) return
    idleTimer = setTimeout(() => {
      idleTimer = undefined
      if (clients.size) return
      const previous = listener
      listener = undefined
      void previous?.close()
    }, 5_000)
    idleTimer.unref?.()
  }
  const ensureListener = async () => {
    if (idleTimer) clearTimeout(idleTimer)
    idleTimer = undefined
    if (listener) return
    connecting ??= listen(onNotice, listenerFailed)
      .then((connected) => {
        listener = connected
        maybeCloseListener()
      })
      .finally(() => {
        connecting = undefined
      })
    await connecting
  }
  const onNotice = (notice: AuditNotice) => {
    for (const [socket, state] of clients) {
      if (!state.sessionHash || state.tenantId !== notice.tenantId) continue
      state.queue = state.queue
        .then(async () => {
          if (socket.readyState !== WebSocket.OPEN || !state.sessionHash || !state.tenantId || !state.principalId)
            return
          if (state.cursor && BigInt(notice.seq) <= BigInt(state.cursor)) return
          const principal = await service.authenticateSession(state.sessionHash, state.tenantId, state.principalId)
          const resources = new Set<'users' | 'roles' | 'audit' | 'access_requests'>(['audit'])
          if (notice.resource === 'users' || notice.resource === 'roles' || notice.resource === 'access_requests')
            resources.add(notice.resource)
          if (notice.resource === 'access_requests' && notice.action === 'access_approved') {
            resources.add('users')
            resources.add('roles')
          }
          for (const resource of resources)
            if (service.canReadEvent(principal, resource))
              send(socket, {
                type: 'resource.invalidate',
                id: notice.seq,
                scope: 'tenant',
                resource,
                occurredAt: new Date().toISOString(),
              })
          state.cursor = notice.seq
        })
        .catch((error: unknown) => closeForError(socket, error))
    }
  }

  server.on('upgrade', (request: IncomingMessage, socket: Duplex, head: Buffer) => {
    const origin = request.headers.origin
    const protocols = String(request.headers['sec-websocket-protocol'] ?? '')
      .split(',')
      .map((value) => value.trim())
    const pathname = new URL(request.url ?? '/', 'http://internal').pathname
    if (
      request.method !== 'GET' ||
      pathname !== '/api/resource-stream' ||
      (origin && !origins.has(origin)) ||
      !protocols.includes(PROTOCOL)
    ) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\nCache-Control: no-store\r\n\r\n')
      socket.destroy()
      return
    }
    wss.handleUpgrade(request, socket, head, (client) => wss.emit('connection', client, request))
  })

  wss.on('connection', (socket: WebSocket, request: IncomingMessage) => {
    const address = request.socket.remoteAddress || 'unknown'
    if (
      clients.size >= MAX_CONNECTIONS ||
      [...clients.values()].filter((client) => !client.sessionHash && client.address === address).length >= 5
    ) {
      socket.close(4429, 'connection_limit')
      return
    }
    const state: ClientState = { address, alive: true, queue: Promise.resolve() }
    clients.set(socket, state)
    const authTimer = setTimeout(() => socket.close(4401, 'authentication_required'), AUTH_TIMEOUT_MS)
    authTimer.unref?.()
    socket.once('message', async (payload: RawData, binary: boolean) => {
      if (binary || Buffer.byteLength(payload.toString()) > 2_048) return socket.close(4400, 'invalid_auth_message')
      let message: unknown
      try {
        message = JSON.parse(payload.toString())
      } catch {
        return socket.close(4400, 'invalid_auth_message')
      }
      if (!message || typeof message !== 'object' || (message as Record<string, unknown>).type !== 'authenticate')
        return socket.close(4400, 'invalid_auth_message')
      try {
        const principal = await service.consumeEventTicket((message as Record<string, unknown>).ticket)
        if (!principal) return socket.close(4403, 'invalid_or_expired_ticket')
        clearTimeout(authTimer)
        state.sessionHash = principal.sessionHash
        state.tenantId = principal.tenantId
        state.principalId = principal.principalId
        state.queue = ensureListener()
          .then(async () => {
            const current = await service.authenticateSession(
              principal.sessionHash,
              principal.tenantId,
              principal.principalId
            )
            const result = await service.pollEvents(current, undefined)
            state.cursor = result.cursor
            send(socket, { type: 'reset', reason: 'initial_sync', latestEventId: result.cursor })
            send(socket, { type: 'ready', latestEventId: result.cursor })
          })
          .catch((error: unknown) => closeForError(socket, error))
        socket.on('pong', () => {
          state.alive = true
        })
        socket.on('message', (data: RawData, isBinary: boolean) => {
          if (isBinary || Buffer.byteLength(data.toString()) > 128) return socket.close(4400, 'invalid_message')
          try {
            const input: unknown = JSON.parse(data.toString())
            if (!input || typeof input !== 'object' || (input as Record<string, unknown>).type !== 'ping')
              return socket.close(4400, 'unsupported_message')
            send(socket, { type: 'pong', at: Date.now() })
          } catch {
            socket.close(4400, 'invalid_message')
          }
        })
      } catch (error) {
        closeForError(socket, error)
      }
    })
    socket.once('close', () => {
      clearTimeout(authTimer)
      clients.delete(socket)
      maybeCloseListener()
    })
    socket.once('error', () => {
      clearTimeout(authTimer)
      clients.delete(socket)
      maybeCloseListener()
    })
  })

  const heartbeat = setInterval(() => {
    for (const [socket, state] of clients) {
      if (!state.sessionHash || !state.tenantId || !state.principalId || socket.readyState !== WebSocket.OPEN) continue
      if (!state.alive) {
        socket.terminate()
        continue
      }
      state.alive = false
      socket.ping()
      state.queue = state.queue
        .then(async () => {
          await service.authenticateSession(state.sessionHash!, state.tenantId!, state.principalId!)
        })
        .catch((error: unknown) => closeForError(socket, error))
    }
  }, SESSION_RECHECK_MS)
  heartbeat.unref?.()
  server.once('close', () => {
    clearInterval(heartbeat)
    if (idleTimer) clearTimeout(idleTimer)
    for (const socket of clients.keys()) socket.close(1001, 'server_shutdown')
    void listener?.close()
    wss.close()
  })
  return server
}
