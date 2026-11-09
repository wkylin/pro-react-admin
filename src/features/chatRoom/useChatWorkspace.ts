import { useCallback, useEffect, useRef, useState } from 'react'
import { getSessionIdentity, subscribeSession } from '@platform/auth/model/session'
import { useKeepAliveContext } from '@platform/keep-alive'
import { closeChatSession, joinChatRoom, listChatMessages, listChatRooms, loginChatPlatform } from './api'
import {
  CHAT_MESSAGE_LIMIT,
  mergeChatMessages,
  type ChatConnection,
  type ChatMessage,
  type ChatRoom,
  type PrivateRoomNote,
} from './model'
import { useChatRoomChannel } from './useChatRoomChannel'

export interface ChatCredentials {
  apiAddress: string
  username: string
  password: string
}

function codeFrom(error: unknown): string {
  return error && typeof error === 'object' && 'code' in error && typeof error.code === 'string'
    ? error.code
    : 'unavailable'
}

export function useChatWorkspace() {
  const [connection, setConnection] = useState<ChatConnection>()
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [readyRoomId, setReadyRoomId] = useState('')
  const [cache, setCache] = useState<Record<string, ChatMessage[]>>({})
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({})
  const [privateNotes, setPrivateNotes] = useState<Record<string, PrivateRoomNote[]>>({})
  const [pinnedRoomIds, setPinnedRoomIds] = useState<string[]>([])
  const [newMessages, setNewMessages] = useState<Record<string, number>>({})
  const [connecting, setConnecting] = useState(false)
  const [joining, setJoining] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [sending, setSending] = useState(false)
  const [historyLimit, setHistoryLimit] = useState(80)
  const [connectionError, setConnectionError] = useState('')
  const [historyError, setHistoryError] = useState('')
  const [sendErrors, setSendErrors] = useState<Record<string, string>>({})
  const [resetVersion, setResetVersion] = useState(0)
  const connectionRef = useRef<ChatConnection | undefined>(undefined)
  const selectedRef = useRef('')
  const cacheRef = useRef<Record<string, ChatMessage[]>>({})
  const draftsRef = useRef<Record<string, string>>({})
  const noteDraftsRef = useRef<Record<string, string>>({})
  const noteSequence = useRef(0)
  const roomsRef = useRef<ChatRoom[]>([])
  const epoch = useRef(0)
  const roomOperation = useRef(0)
  const historyOperation = useRef(0)
  const connectAbort = useRef<AbortController | undefined>(undefined)
  const historyAbort = useRef<AbortController | undefined>(undefined)
  const reconnectRef = useRef<() => void>(() => undefined)
  const disconnectRef = useRef<() => Promise<void>>(async () => undefined)
  const mounted = useRef(true)
  const sendGuard = useRef(false)
  const connectGuard = useRef(false)
  const readingRef = useRef(true)
  const active = useKeepAliveContext()
  const activeRef = useRef(active)
  activeRef.current = active

  const channel = useChatRoomChannel({
    onMessage: (message) => {
      if (!connectionRef.current) return
      const previous = cacheRef.current[message.roomId] ?? []
      const unseen = !previous.some((item) => item.id === message.id)
      cacheRef.current = { ...cacheRef.current, [message.roomId]: mergeChatMessages(previous, [message]) }
      setCache(cacheRef.current)
      if (
        unseen &&
        message.userId !== connectionRef.current.user.id &&
        (selectedRef.current !== message.roomId ||
          !readingRef.current ||
          activeRef.current === false ||
          document.visibilityState === 'hidden')
      ) {
        setNewMessages((value) => ({ ...value, [message.roomId]: (value[message.roomId] ?? 0) + 1 }))
      }
    },
    onReconnect: () => reconnectRef.current(),
  })

  const clear = () => {
    roomsRef.current = []
    selectedRef.current = ''
    cacheRef.current = {}
    draftsRef.current = {}
    noteDraftsRef.current = {}
    setConnection(undefined)
    setRooms([])
    setSelectedId('')
    setReadyRoomId('')
    setCache({})
    setDrafts({})
    setNoteDrafts({})
    setPrivateNotes({})
    setPinnedRoomIds([])
    setNewMessages({})
    setConnecting(false)
    setJoining(false)
    setLoadingHistory(false)
    setSending(false)
    setHistoryLimit(80)
    setConnectionError('')
    setHistoryError('')
    setSendErrors({})
  }
  const disconnect = async () => {
    const operation = ++epoch.current
    roomOperation.current += 1
    historyOperation.current += 1
    connectAbort.current?.abort()
    connectAbort.current = undefined
    historyAbort.current?.abort()
    const previous = connectionRef.current
    connectionRef.current = undefined
    sendGuard.current = false
    connectGuard.current = false
    clear()
    await channel.disconnect()
    if (previous) {
      try {
        await closeChatSession(previous)
      } catch (error) {
        if (mounted.current && epoch.current === operation) setConnectionError(codeFrom(error))
      }
    }
  }
  disconnectRef.current = disconnect

  useEffect(() => {
    mounted.current = true
    let identity = getSessionIdentity()
    const unsubscribe = subscribeSession(() => {
      const current = getSessionIdentity()
      if (current === identity) return
      identity = current
      setResetVersion((value) => value + 1)
      void disconnectRef.current()
    })
    return () => {
      mounted.current = false
      unsubscribe()
      epoch.current += 1
      connectAbort.current?.abort()
      historyAbort.current?.abort()
      const previous = connectionRef.current
      connectionRef.current = undefined
      if (previous) void closeChatSession(previous).catch(() => undefined)
    }
  }, [])

  useEffect(() => {
    const seen = () => {
      if (
        readingRef.current &&
        activeRef.current !== false &&
        document.visibilityState !== 'hidden' &&
        selectedRef.current
      ) {
        setNewMessages((value) => ({ ...value, [selectedRef.current]: 0 }))
      }
    }
    seen()
    document.addEventListener('visibilitychange', seen)
    return () => document.removeEventListener('visibilitychange', seen)
  }, [active, selectedId])

  const loadHistory = async (room: ChatRoom, limit = 80) => {
    const current = connectionRef.current
    if (!current) return
    const scope = epoch.current
    const operation = ++historyOperation.current
    historyAbort.current?.abort()
    const controller = new AbortController()
    historyAbort.current = controller
    setLoadingHistory(true)
    setHistoryError('')
    try {
      const messages = await listChatMessages(current, room.id, limit, { signal: controller.signal })
      if (
        !mounted.current ||
        epoch.current !== scope ||
        historyOperation.current !== operation ||
        selectedRef.current !== room.id
      )
        return
      cacheRef.current = {
        ...cacheRef.current,
        [room.id]: mergeChatMessages(cacheRef.current[room.id] ?? [], messages),
      }
      setCache(cacheRef.current)
      setHistoryLimit(limit)
    } catch (error) {
      if (
        mounted.current &&
        epoch.current === scope &&
        historyOperation.current === operation &&
        codeFrom(error) !== 'aborted'
      )
        setHistoryError(codeFrom(error))
    } finally {
      if (mounted.current && epoch.current === scope && historyOperation.current === operation) setLoadingHistory(false)
    }
  }
  reconnectRef.current = () => {
    const room = roomsRef.current.find((item) => item.id === selectedRef.current)
    if (room) void selectRoom(room)
  }

  useEffect(() => {
    if (channel.status !== 'online') setReadyRoomId('')
  }, [channel.status])

  const selectRoom = async (room: ChatRoom) => {
    const current = connectionRef.current
    if (!current || room.status !== 'active') return
    const scope = epoch.current
    const operation = ++roomOperation.current
    historyOperation.current += 1
    historyAbort.current?.abort()
    selectedRef.current = room.id
    setSelectedId(room.id)
    setReadyRoomId('')
    setNewMessages((value) => ({ ...value, [room.id]: 0 }))
    setHistoryError('')
    setJoining(true)
    setLoadingHistory(false)
    setHistoryLimit(80)
    try {
      await joinChatRoom(current, room.id, { signal: connectAbort.current?.signal })
      if (!mounted.current || epoch.current !== scope || roomOperation.current !== operation) return
      await channel.joinRoom(room)
      if (!mounted.current || epoch.current !== scope || roomOperation.current !== operation) return
      setReadyRoomId(room.id)
      setJoining(false)
      await loadHistory(room)
    } catch (error) {
      if (
        mounted.current &&
        epoch.current === scope &&
        roomOperation.current === operation &&
        !['aborted', 'cancelled'].includes(codeFrom(error))
      )
        setHistoryError(codeFrom(error))
    } finally {
      if (mounted.current && epoch.current === scope && roomOperation.current === operation) setJoining(false)
    }
  }

  const connect = async (credentials: ChatCredentials): Promise<boolean> => {
    if (connectGuard.current || connectAbort.current) return false
    const preparation = disconnect()
    const scope = epoch.current
    const controller = new AbortController()
    connectAbort.current = controller
    connectGuard.current = true
    setConnecting(true)
    setConnectionError('')
    let opened: ChatConnection | undefined
    try {
      await preparation
      if (!mounted.current || scope !== epoch.current || controller.signal.aborted) return false
      opened = await loginChatPlatform(credentials.apiAddress, credentials.username, credentials.password, {
        signal: controller.signal,
      })
      if (!mounted.current || scope !== epoch.current) {
        void closeChatSession(opened).catch(() => undefined)
        return false
      }
      connectionRef.current = opened
      setConnection(opened)
      const available = await listChatRooms(opened, { signal: controller.signal })
      if (!mounted.current || scope !== epoch.current) return false
      roomsRef.current = available
      setRooms(available)
      await channel.connect(opened)
      if (!mounted.current || scope !== epoch.current) return false
      const first = available.find((room) => room.status === 'active')
      if (first) await selectRoom(first)
      return true
    } catch (error) {
      if (mounted.current && scope === epoch.current) {
        setConnectionError(codeFrom(error))
        connectionRef.current = undefined
        setConnection(undefined)
        setRooms([])
        await channel.disconnect()
        if (opened) void closeChatSession(opened).catch(() => undefined)
      }
      return false
    } finally {
      if (scope === epoch.current) {
        connectGuard.current = false
        connectAbort.current = undefined
        if (mounted.current) setConnecting(false)
      }
    }
  }

  const setDraft = (value: string) => {
    const roomId = selectedRef.current
    if (!roomId) return
    draftsRef.current = { ...draftsRef.current, [roomId]: value }
    setDrafts(draftsRef.current)
    setSendErrors((value) => ({ ...value, [roomId]: '' }))
  }
  const send = async (bodyOverride?: string): Promise<boolean> => {
    const current = connectionRef.current
    const room = roomsRef.current.find((item) => item.id === selectedRef.current)
    const snapshot = draftsRef.current[selectedRef.current] ?? ''
    const body = (bodyOverride ?? snapshot).trim()
    if (!current || !room || sendGuard.current || !body) return false
    if (body.length > CHAT_MESSAGE_LIMIT) {
      setSendErrors((value) => ({ ...value, [room.id]: 'invalidMessage' }))
      return false
    }
    const scope = epoch.current
    sendGuard.current = true
    setSending(true)
    setSendErrors((value) => ({ ...value, [room.id]: '' }))
    try {
      await channel.sendRoom(room, body)
      if (!mounted.current || epoch.current !== scope) return false
      if (draftsRef.current[room.id] === snapshot) {
        draftsRef.current = { ...draftsRef.current, [room.id]: '' }
        setDrafts(draftsRef.current)
      }
      return true
    } catch (error) {
      if (mounted.current && epoch.current === scope)
        setSendErrors((value) => ({ ...value, [room.id]: codeFrom(error) }))
      return false
    } finally {
      if (mounted.current && epoch.current === scope) {
        sendGuard.current = false
        setSending(false)
      }
    }
  }
  const setNoteDraft = (value: string) => {
    const roomId = selectedRef.current
    if (!roomId || !connectionRef.current) return
    noteDraftsRef.current = { ...noteDraftsRef.current, [roomId]: value }
    setNoteDrafts(noteDraftsRef.current)
  }
  const savePrivateNote = (body: string): boolean => {
    const roomId = selectedRef.current
    const value = body.trim()
    if (!connectionRef.current || !roomId || !value || value.length > CHAT_MESSAGE_LIMIT) return false
    const note: PrivateRoomNote = {
      id: 'private-note-' + ++noteSequence.current,
      roomId,
      body: value,
      createdAt: new Date().toISOString(),
    }
    setPrivateNotes((previous) => ({ ...previous, [roomId]: [...(previous[roomId] ?? []), note].slice(-100) }))
    if ((noteDraftsRef.current[roomId] ?? '').trim() === value) {
      noteDraftsRef.current = { ...noteDraftsRef.current, [roomId]: '' }
      setNoteDrafts(noteDraftsRef.current)
    }
    return true
  }
  const deletePrivateNote = (id: string) => {
    const roomId = selectedRef.current
    if (!connectionRef.current || !roomId) return
    setPrivateNotes((previous) => ({
      ...previous,
      [roomId]: (previous[roomId] ?? []).filter((note) => note.id !== id),
    }))
  }
  const togglePinRoom = (id: string) => {
    if (!connectionRef.current || !roomsRef.current.some((item) => item.id === id)) return
    setPinnedRoomIds((previous) =>
      previous.includes(id) ? previous.filter((roomId) => roomId !== id) : [...previous, id]
    )
  }
  const markRoomRead = (id: string) => {
    if (!connectionRef.current || !roomsRef.current.some((item) => item.id === id)) return
    setNewMessages((previous) => ({ ...previous, [id]: 0 }))
  }
  const refreshRooms = async () => {
    const current = connectionRef.current
    const scope = epoch.current
    if (!current) return
    try {
      const available = await listChatRooms(current)
      if (!mounted.current || epoch.current !== scope) return
      roomsRef.current = available
      setRooms(available)
    } catch (error) {
      if (mounted.current && epoch.current === scope) setConnectionError(codeFrom(error))
    }
  }

  const room = rooms.find((item) => item.id === selectedId)
  const setReadingRoom = useCallback((reading: boolean) => {
    if (readingRef.current === reading) return
    readingRef.current = reading
    if (reading && selectedRef.current && activeRef.current !== false && document.visibilityState !== 'hidden')
      setNewMessages((value) => ({ ...value, [selectedRef.current]: 0 }))
  }, [])
  return {
    connection,
    rooms,
    room,
    cache,
    messages: cache[selectedId] ?? [],
    draft: drafts[selectedId] ?? '',
    noteDraft: noteDrafts[selectedId] ?? '',
    privateNotes: privateNotes[selectedId] ?? [],
    pinnedRoomIds,
    newMessages,
    status: channel.status,
    connecting,
    joining,
    loadingHistory,
    sending,
    historyLimit,
    roomReady: Boolean(room && room.id === readyRoomId),
    setReadingRoom,
    connectionError: connectionError || channel.error || '',
    historyError,
    sendError: sendErrors[selectedId] ?? '',
    resetVersion,
    connect,
    disconnect,
    cancelConnection: disconnect,
    selectRoom,
    setDraft,
    setNoteDraft,
    savePrivateNote,
    deletePrivateNote,
    togglePinRoom,
    markRoomRead,
    send,
    refreshRooms,
    refreshHistory: () => room && void loadHistory(room, historyLimit),
    loadMoreHistory: () => room && void loadHistory(room, Math.min(200, historyLimit + 40)),
  }
}

export type ChatWorkspace = ReturnType<typeof useChatWorkspace>
