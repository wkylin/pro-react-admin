import { apiClient } from '@platform/api/client'
import { isRecord } from '@platform/api/core/response'
import { getEnv } from '@platform/config/env'
import { getSessionIdentity, handleAuthenticationFailure, readEnterpriseSession } from '@platform/auth/model/session'

export type InvalidatedResource = 'users' | 'roles' | 'audit' | 'access_requests'

const isResource = (value: unknown): value is InvalidatedResource =>
  value === 'users' || value === 'roles' || value === 'audit' || value === 'access_requests'

function getEventsUrl(): string {
  const configuredBase = getEnv('APP_BASE_URL', '').replace(/\/+$/, '')
  const url = new URL(`${configuredBase}/api/events`, window.location.href)
  if (url.protocol === 'https:') url.protocol = 'wss:'
  else if (url.protocol === 'http:') url.protocol = 'ws:'
  else throw new Error('Unsupported WebSocket URL protocol')
  return url.toString()
}

/**
 * Tenant-scoped resource invalidations. Reconnects use short-lived one-time tickets;
 * a lost replay window causes a full cache invalidation before the cursor advances.
 */
export function subscribeResourceEvents(onInvalidate: (resource?: InvalidatedResource) => void): () => void {
  if (typeof window === 'undefined') return () => undefined
  const initialSession = readEnterpriseSession()
  if (!initialSession) return () => undefined
  const identity = getSessionIdentity()
  let stopped = false
  let attempt = 0
  let lastEventId: string | undefined
  let socket: WebSocket | undefined
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined
  let pollTimer: ReturnType<typeof setInterval> | undefined
  let polling = false
  let pollCursor: string | undefined

  const clearReconnect = () => {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    reconnectTimer = undefined
  }
  const stop = () => {
    stopped = true
    clearReconnect()
    if (pollTimer) clearInterval(pollTimer)
    pollTimer = undefined
    const activeSocket = socket
    socket = undefined
    if (activeSocket && activeSocket.readyState < WebSocket.CLOSING) activeSocket.close(1000, 'provider_disposed')
  }
  const scheduleReconnect = () => {
    if (stopped || reconnectTimer) return
    if (getSessionIdentity() !== identity || !readEnterpriseSession()) return stop()
    attempt += 1
    const delay = Math.min(30_000, 500 * 2 ** Math.min(attempt - 1, 6)) + Math.floor(Math.random() * 250)
    reconnectTimer = setTimeout(() => {
      reconnectTimer = undefined
      void connect()
    }, delay)
  }
  const poll = async () => {
    if (polling || stopped) return
    if (getSessionIdentity() !== identity || !readEnterpriseSession()) return stop()
    polling = true
    try {
      const value: unknown = await apiClient.get(
        '/api/events/poll',
        pollCursor === undefined ? {} : { cursor: pollCursor },
        { showError: false, cancelDuplicate: false }
      )
      if (!isRecord(value) || typeof value.cursor !== 'string' || !Array.isArray(value.resources))
        throw new Error('Invalid event poll response')
      if (stopped || getSessionIdentity() !== identity) return stop()
      pollCursor = value.cursor
      if (value.reset === true) onInvalidate()
      else for (const resource of value.resources) if (isResource(resource)) onInvalidate(resource)
      if (!pollTimer) pollTimer = setInterval(() => void poll(), 10_000)
    } catch {
      if (!pollTimer) scheduleReconnect()
    } finally {
      polling = false
    }
  }
  const connect = async () => {
    if (stopped || getSessionIdentity() !== identity || !readEnterpriseSession()) return stop()
    try {
      const issued: unknown = await apiClient.post(
        '/api/events/ticket',
        {},
        { showError: false, cancelDuplicate: false }
      )
      if (stopped || getSessionIdentity() !== identity || !readEnterpriseSession()) return stop()
      if (!isRecord(issued) || typeof issued.ticket !== 'string' || typeof issued.expiresAt !== 'number') {
        void poll()
        return
      }

      const activeSocket = new WebSocket(getEventsUrl(), 'pro-admin-events-v1')
      socket = activeSocket
      activeSocket.addEventListener('open', () => {
        if (stopped || socket !== activeSocket) return activeSocket.close(1000, 'provider_disposed')
        activeSocket.send(JSON.stringify({ type: 'authenticate', ticket: issued.ticket, lastEventId }))
      })
      activeSocket.addEventListener('message', (message) => {
        if (typeof message.data !== 'string' || message.data.length > 4_096) return
        let event: unknown
        try {
          event = JSON.parse(message.data)
        } catch {
          activeSocket.close(4400, 'invalid_server_message')
          return
        }
        if (!isRecord(event) || event.version !== 1 || typeof event.type !== 'string') return
        if (event.type === 'reset') {
          onInvalidate()
          if (typeof event.latestEventId === 'string') lastEventId = event.latestEventId
        } else if (event.type === 'resource.invalidate' && isResource(event.resource)) {
          if (typeof event.id === 'string') lastEventId = event.id
          onInvalidate(event.resource)
        } else if (event.type === 'ready') {
          attempt = 0
          if (typeof event.latestEventId === 'string') lastEventId = event.latestEventId
        } else if (event.type === 'session.revoked') {
          handleAuthenticationFailure(401, undefined, identity)
          stop()
        }
      })
      activeSocket.addEventListener('close', (event) => {
        if (socket === activeSocket) socket = undefined
        if (stopped) return
        if (event.code === 4401) {
          handleAuthenticationFailure(401, undefined, identity)
          stop()
          return
        }
        scheduleReconnect()
      })
      activeSocket.addEventListener('error', () => {
        // Close owns retries; errors are intentionally not logged with session identifiers.
      })
    } catch {
      void poll()
    }
  }

  if (typeof WebSocket === 'undefined') void poll()
  else void connect()
  return stop
}
