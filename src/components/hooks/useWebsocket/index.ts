import { useCallback, useEffect, useRef, useState } from 'react'

export type WebsocketReadyState = 0 | 1 | 2 | 3
export type WebsocketReadyStateInfo = { key: WebsocketReadyState; value: string }
export type WebsocketMessageData = MessageEvent['data']
export type WebsocketSendData = Parameters<WebSocket['send']>[0]

export interface UseWebsocketOptions<TMessage = WebsocketMessageData> {
  url: string
  /** Controls whether this hook owns an active connection. Defaults to false. */
  verify?: boolean
  /** Reconnect after an unexpected close with bounded exponential backoff. */
  autoReconnect?: boolean
  reconnectDelayMs?: number
  maxReconnectDelayMs?: number
  maxReconnectAttempts?: number
  decodeMessage?: (event: MessageEvent) => TMessage
  onMessage?: (message: TMessage, event: MessageEvent) => void
}

const CLOSED_STATE: WebsocketReadyStateInfo = { key: 3, value: '连接已关闭或者没有连接成功' }
const STATE_LABELS: Record<WebsocketReadyState, string> = {
  0: '正在连接中',
  1: '已经连接并且可以通讯',
  2: '连接正在关闭',
  3: CLOSED_STATE.value,
}
const RECONNECT_STABLE_MS = 10_000

function toReadyStateInfo(readyState: number): WebsocketReadyStateInfo {
  const key = (readyState >= 0 && readyState <= 3 ? readyState : 3) as WebsocketReadyState
  return { key, value: STATE_LABELS[key] }
}

function safeDelay(value: number | undefined, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : fallback
}

function safeAttemptLimit(value: number | undefined) {
  if (value === Number.POSITIVE_INFINITY) return value
  if (typeof value !== 'number' || !Number.isFinite(value)) return 10
  return Math.max(0, Math.floor(value))
}

const useWebsocket = <TMessage = WebsocketMessageData>({
  url,
  verify = false,
  autoReconnect = false,
  reconnectDelayMs = 1_000,
  maxReconnectDelayMs = 30_000,
  maxReconnectAttempts = 10,
  decodeMessage,
  onMessage,
}: UseWebsocketOptions<TMessage>) => {
  const socketRef = useRef<WebSocket | null>(null)
  const connectRef = useRef<(() => void) | null>(null)
  const retryTimerRef = useRef<number | null>(null)
  const stableTimerRef = useRef<number | null>(null)
  const retryAttemptsRef = useRef(0)
  const manuallyClosedRef = useRef(true)
  const connectionEnabledRef = useRef(Boolean(verify && url))
  const decodeMessageRef = useRef(decodeMessage)
  const onMessageRef = useRef(onMessage)
  const [wsData, setWsData] = useState<TMessage | null>(null)
  const [readyState, setReadyState] = useState<WebsocketReadyStateInfo>({ key: 0, value: STATE_LABELS[0] })
  const [lastError, setLastError] = useState<unknown>(null)

  connectionEnabledRef.current = Boolean(verify && url)
  decodeMessageRef.current = decodeMessage
  onMessageRef.current = onMessage

  const clearTimer = (timerRef: { current: number | null }) => {
    if (timerRef.current === null) return
    window.clearTimeout(timerRef.current)
    timerRef.current = null
  }

  const detachAndClose = (socket: WebSocket | null) => {
    if (!socket) return
    socket.onopen = null
    socket.onmessage = null
    socket.onerror = null
    socket.onclose = null
    if (socket.readyState < 2) socket.close()
  }

  useEffect(() => {
    let active = true
    let effectSocket: WebSocket | null = null
    const baseDelay = safeDelay(reconnectDelayMs, 1_000)
    const maxDelay = Math.max(baseDelay, safeDelay(maxReconnectDelayMs, 30_000))
    const attemptLimit = safeAttemptLimit(maxReconnectAttempts)

    const scheduleReconnect = () => {
      if (
        !active ||
        !autoReconnect ||
        manuallyClosedRef.current ||
        retryAttemptsRef.current >= attemptLimit ||
        retryTimerRef.current !== null
      ) {
        return
      }

      const delay = Math.min(baseDelay * 2 ** retryAttemptsRef.current, maxDelay)
      retryAttemptsRef.current += 1
      retryTimerRef.current = window.setTimeout(connect, delay)
    }

    const connect = () => {
      clearTimer(retryTimerRef)
      if (!active || !verify || !url || manuallyClosedRef.current) {
        setReadyState(CLOSED_STATE)
        return
      }
      if (socketRef.current && socketRef.current.readyState < 2) return

      setReadyState({ key: 0, value: STATE_LABELS[0] })
      setLastError(null)

      let socket: WebSocket
      try {
        socket = new WebSocket(url)
      } catch (error) {
        setLastError(error)
        setReadyState(CLOSED_STATE)
        scheduleReconnect()
        return
      }

      effectSocket = socket
      socketRef.current = socket
      setReadyState(toReadyStateInfo(socket.readyState))

      socket.onopen = () => {
        if (!active || socketRef.current !== socket) return
        setReadyState(toReadyStateInfo(socket.readyState))
        setLastError(null)
        clearTimer(stableTimerRef)
        stableTimerRef.current = window.setTimeout(() => {
          if (socketRef.current === socket) retryAttemptsRef.current = 0
          stableTimerRef.current = null
        }, RECONNECT_STABLE_MS)
      }

      socket.onmessage = (event) => {
        if (!active || socketRef.current !== socket) return
        try {
          const message = decodeMessageRef.current ? decodeMessageRef.current(event) : (event.data as TMessage)
          setWsData(message)
          setLastError(null)
          onMessageRef.current?.(message, event)
        } catch (error) {
          setLastError(error)
        }
      }

      socket.onerror = (event) => {
        if (!active || socketRef.current !== socket) return
        setLastError(event)
        setReadyState(toReadyStateInfo(socket.readyState))
      }

      socket.onclose = () => {
        if (!active || socketRef.current !== socket) return
        socketRef.current = null
        effectSocket = null
        clearTimer(stableTimerRef)
        setReadyState(CLOSED_STATE)
        scheduleReconnect()
      }
    }

    connectRef.current = connect
    manuallyClosedRef.current = !(verify && url)
    retryAttemptsRef.current = 0
    setWsData(null)

    if (verify && url) connect()
    else {
      setReadyState(CLOSED_STATE)
      setLastError(null)
    }

    return () => {
      active = false
      manuallyClosedRef.current = true
      clearTimer(retryTimerRef)
      clearTimer(stableTimerRef)
      if (connectRef.current === connect) connectRef.current = null
      if (socketRef.current === effectSocket) {
        socketRef.current = null
        detachAndClose(effectSocket)
      }
    }
  }, [autoReconnect, maxReconnectAttempts, maxReconnectDelayMs, reconnectDelayMs, url, verify])

  const closeWebSocket = useCallback(() => {
    manuallyClosedRef.current = true
    retryAttemptsRef.current = 0
    clearTimer(retryTimerRef)
    clearTimer(stableTimerRef)
    const socket = socketRef.current
    socketRef.current = null
    detachAndClose(socket)
    setReadyState(CLOSED_STATE)
  }, [])

  const reconnect = useCallback(() => {
    if (!connectionEnabledRef.current) return
    manuallyClosedRef.current = false
    retryAttemptsRef.current = 0
    clearTimer(retryTimerRef)
    clearTimer(stableTimerRef)
    const socket = socketRef.current
    socketRef.current = null
    detachAndClose(socket)
    connectRef.current?.()
  }, [])

  const sendMessage = useCallback((message: WebsocketSendData) => {
    const socket = socketRef.current
    if (!socket || socket.readyState !== 1) return false
    try {
      socket.send(message)
      return true
    } catch (error) {
      setLastError(error)
      return false
    }
  }, [])

  return {
    wsData,
    readyState,
    lastError,
    sendMessage,
    closeWebSocket,
    reconnect,
  }
}

export default useWebsocket
