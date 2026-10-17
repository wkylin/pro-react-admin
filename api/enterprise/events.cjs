const { createHash, randomBytes, randomUUID } = require('node:crypto')
const { WebSocket, WebSocketServer } = require('ws')

const EVENT_VERSION = 1
const PROTOCOL = 'pro-admin-events-v1'
const EVENT_PATH = '/api/events'
const MAX_REPLAY_EVENTS = 1_000
const TICKET_TTL_MS = 30_000
const AUTH_TIMEOUT_MS = 5_000
const SESSION_RECHECK_MS = 15_000
const MAX_PENDING_CONNECTIONS = 200
const RESOURCE_PERMISSION = Object.freeze({
  users: 'user:read',
  roles: 'role:read',
  audit: 'audit:read',
})

const hash = (value) => createHash('sha256').update(value).digest('hex')
const latestId = (epoch, sequence) => `${epoch}:${sequence.toString(36)}`

/** Tenant-scoped invalidation log. Events intentionally contain no business records or identifiers. */
class ResourceEventHub {
  tenantStates = new Map()
  events = []
  tickets = new Map()
  ticketAttempts = new Map()

  stateFor(tenantId) {
    let state = this.tenantStates.get(tenantId)
    if (!state) {
      state = { epoch: randomUUID(), sequence: 0 }
      this.tenantStates.set(tenantId, state)
    }
    return state
  }

  issueTicket(principal, now = Date.now()) {
    this.pruneTickets(now)
    const key = `${principal.sessionHash}:${principal.tenantId}`
    const attempts = this.ticketAttempts.get(key) ?? { startedAt: now, count: 0 }
    if (now - attempts.startedAt >= 60_000) {
      attempts.startedAt = now
      attempts.count = 0
    }
    if (attempts.count >= 30) {
      const error = new Error('event_ticket_rate_limited')
      error.status = 429
      error.code = 'event_ticket_rate_limited'
      throw error
    }
    attempts.count += 1
    this.ticketAttempts.set(key, attempts)

    const ticket = randomBytes(32).toString('base64url')
    const expiresAt = now + TICKET_TTL_MS
    this.tickets.set(hash(ticket), {
      expiresAt,
      sessionHash: principal.sessionHash,
      tenantId: principal.tenantId,
      principalId: principal.principalId,
    })
    return { ticket, expiresAt }
  }

  consumeTicket(ticket, now = Date.now()) {
    if (typeof ticket !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(ticket)) return null
    const key = hash(ticket)
    const value = this.tickets.get(key)
    this.tickets.delete(key)
    return value && value.expiresAt > now ? value : null
  }

  pruneTickets(now) {
    for (const [key, ticket] of this.tickets) if (ticket.expiresAt <= now) this.tickets.delete(key)
    for (const [key, attempts] of this.ticketAttempts)
      if (now - attempts.startedAt >= 60_000) this.ticketAttempts.delete(key)
  }

  publish(tenantId, resource) {
    if (!Object.hasOwn(RESOURCE_PERMISSION, resource)) throw new Error('Unsupported resource invalidation')
    const state = this.stateFor(tenantId)
    const event = Object.freeze({
      version: EVENT_VERSION,
      type: 'resource.invalidate',
      id: latestId(state.epoch, ++state.sequence),
      scope: 'tenant',
      resource,
      occurredAt: new Date().toISOString(),
    })
    this.events.push({ event, tenantId, sequence: state.sequence })
    if (this.events.length > MAX_REPLAY_EVENTS) this.events.shift()
    return event
  }

  replay(tenantId, cursor) {
    const state = this.stateFor(tenantId)
    if (typeof cursor !== 'string') return { reset: true, reason: 'initial_sync', events: [] }
    const match = /^([0-9a-f-]{36}):([0-9a-z]+)$/.exec(cursor)
    if (!match || match[1] !== state.epoch) return { reset: true, reason: 'replay_unavailable', events: [] }
    const after = Number.parseInt(match[2], 36)
    if (!Number.isSafeInteger(after) || after < 0 || after > state.sequence)
      return { reset: true, reason: 'replay_unavailable', events: [] }
    const tenantEvents = this.events.filter((event) => event.tenantId === tenantId)
    const oldest = tenantEvents[0]?.sequence
    if (
      (oldest !== undefined && after < oldest - 1) ||
      (state.sequence > 0 && oldest === undefined && after < state.sequence)
    )
      return { reset: true, reason: 'replay_unavailable', events: [] }
    return {
      reset: false,
      reason: undefined,
      events: tenantEvents.filter((event) => event.sequence > after),
    }
  }

  currentId(tenantId) {
    const state = this.stateFor(tenantId)
    return latestId(state.epoch, state.sequence)
  }
}

function createEnterpriseEvents(service, { isAllowedOrigin = () => false } = {}) {
  const hub = new ResourceEventHub()
  const wss = new WebSocketServer({ noServer: true, maxPayload: 4_096, perMessageDeflate: false })
  const clients = new Map()
  let closed = false

  const send = (socket, message) => {
    if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message))
  }

  function authorizeEvent(client, record) {
    if (record.tenantId !== client.tenantId) return false
    try {
      const principal = service.authenticateSession(client.sessionHash, client.tenantId, client.principalId)
      return principal.role.permissions.includes('*:*') ||
        principal.role.permissions.includes(RESOURCE_PERMISSION[record.event.resource]) ||
        principal.role.permissions.includes(`${RESOURCE_PERMISSION[record.event.resource].split(':')[0]}:*`)
    } catch {
      return false
    }
  }

  function publish(tenantId, resource) {
    const event = hub.publish(tenantId, resource)
    for (const [socket, client] of clients) {
      if (authorizeEvent(client, { event, tenantId })) send(socket, event)
      else if (socket.readyState === WebSocket.OPEN) {
        // A lost session or changed active organization ends the transport immediately.
        try {
          service.authenticateSession(client.sessionHash, client.tenantId, client.principalId)
        } catch {
          send(socket, { version: EVENT_VERSION, type: 'session.revoked', reason: 'session_changed' })
          socket.close(4401, 'session_changed')
        }
      }
    }
    return event
  }

  wss.on('connection', (socket, request) => {
    const address = request.socket.remoteAddress || 'unknown'
    const pendingCount = [...clients.values()].filter((client) => !client.authenticated && client.address === address).length
    if (clients.size >= MAX_PENDING_CONNECTIONS || pendingCount >= 5) {
      socket.close(4429, 'connection_limit')
      return
    }

    const client = { authenticated: false, address, sessionHash: '', tenantId: '', principalId: '' }
    clients.set(socket, client)
    const authTimer = setTimeout(() => socket.close(4401, 'authentication_required'), AUTH_TIMEOUT_MS)
    authTimer.unref?.()

    socket.once('message', (data, isBinary) => {
      if (isBinary || data.length > 2_048) {
        socket.close(4400, 'invalid_auth_message')
        return
      }
      let message
      try {
        message = JSON.parse(data.toString())
      } catch {
        socket.close(4400, 'invalid_auth_message')
        return
      }
      if (
        !message ||
        message.type !== 'authenticate' ||
        typeof message.ticket !== 'string' ||
        (message.lastEventId !== undefined && typeof message.lastEventId !== 'string')
      ) {
        socket.close(4400, 'invalid_auth_message')
        return
      }
      const ticket = hub.consumeTicket(message.ticket)
      if (!ticket) {
        socket.close(4401, 'invalid_or_expired_ticket')
        return
      }
      let principal
      try {
        principal = service.authenticateSession(ticket.sessionHash, ticket.tenantId, ticket.principalId)
      } catch {
        socket.close(4401, 'session_changed')
        return
      }

      clearTimeout(authTimer)
      client.authenticated = true
      client.sessionHash = ticket.sessionHash
      client.tenantId = ticket.tenantId
      client.principalId = ticket.principalId
      client.permissions = principal.role.permissions
      client.isAlive = true
      socket.on('pong', () => {
        client.isAlive = true
      })

      const replay = hub.replay(ticket.tenantId, message.lastEventId)
      if (replay.reset) {
        send(socket, {
          version: EVENT_VERSION,
          type: 'reset',
          reason: replay.reason,
          latestEventId: hub.currentId(ticket.tenantId),
        })
      } else {
        for (const record of replay.events) {
          if (authorizeEvent(client, record)) send(socket, record.event)
          else {
            try {
              service.authenticateSession(client.sessionHash, client.tenantId, client.principalId)
            } catch {
              send(socket, { version: EVENT_VERSION, type: 'session.revoked', reason: 'session_changed' })
              socket.close(4401, 'session_changed')
              return
            }
          }
        }
      }
      send(socket, { version: EVENT_VERSION, type: 'ready', latestEventId: hub.currentId(ticket.tenantId) })

      const recheck = setInterval(() => {
        if (socket.readyState !== WebSocket.OPEN) return
        if (!client.isAlive) {
          socket.terminate()
          return
        }
        client.isAlive = false
        try {
          const current = service.authenticateSession(client.sessionHash, client.tenantId, client.principalId)
          client.permissions = current.role.permissions
          socket.ping()
        } catch {
          send(socket, { version: EVENT_VERSION, type: 'session.revoked', reason: 'session_changed' })
          socket.close(4401, 'session_changed')
        }
      }, SESSION_RECHECK_MS)
      recheck.unref?.()
      socket.once('close', () => clearInterval(recheck))
      socket.on('message', (payload, binary) => {
        if (binary || payload.length > 128) {
          socket.close(4400, 'invalid_message')
          return
        }
        try {
          const incoming = JSON.parse(payload.toString())
          if (incoming?.type !== 'ping') socket.close(4400, 'unsupported_message')
          else send(socket, { version: EVENT_VERSION, type: 'pong', at: Date.now() })
        } catch {
          socket.close(4400, 'invalid_message')
        }
      })
    })

    socket.once('close', () => {
      clearTimeout(authTimer)
      clients.delete(socket)
    })
    socket.once('error', () => {
      clearTimeout(authTimer)
      clients.delete(socket)
    })
  })

  function attach(server) {
    server.on('upgrade', (request, socket, head) => {
      let pathname
      try {
        pathname = new URL(request.url, 'http://localhost').pathname
      } catch {
        socket.destroy()
        return
      }
      if (pathname !== EVENT_PATH) {
        socket.destroy()
        return
      }
      const origin = request.headers.origin
      if (request.method !== 'GET' || (origin && !isAllowedOrigin(origin))) {
        socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\nCache-Control: no-store\r\n\r\n')
        socket.destroy()
        return
      }
      const protocolHeader = request.headers['sec-websocket-protocol'] || ''
      if (!protocolHeader.split(',').map((value) => value.trim()).includes(PROTOCOL)) {
        socket.write('HTTP/1.1 400 Bad Request\r\nConnection: close\r\nCache-Control: no-store\r\n\r\n')
        socket.destroy()
        return
      }
      wss.handleUpgrade(request, socket, head, (client) => wss.emit('connection', client, request))
    })
  }

  function close() {
    if (closed) return
    closed = true
    for (const [socket] of clients) socket.close(1001, 'server_shutdown')
    clients.clear()
    wss.close()
  }

  return { attach, close, issueTicket: (principal) => hub.issueTicket(principal), publish, hub }
}

module.exports = { createEnterpriseEvents, ResourceEventHub, EVENT_PATH, PROTOCOL }
