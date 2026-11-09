import { act, renderHook, waitFor } from '@testing-library/react'
import type { ChatApiOptions } from './api'
import type { ChatConnection, ChatMessage, ChatRoom } from './model'
import type { ChatChannelStatus } from './useChatRoomChannel'

const createdAt = '2026-11-09T08:00:00.000Z'
const connection: ChatConnection = {
  apiBase: 'https://chat.example.test/api',
  token: 'chat-token',
  user: { id: 'self', username: 'alex', displayName: 'Alex', role: 'user', status: 'active', createdAt },
  session: {
    imSessionId: 'session-one',
    xmppUsername: 'session-one',
    credential: 'temporary-credential',
    jid: 'self@im.example.test',
    websocketUrl: 'wss://chat.example.test/xmpp-websocket',
    domain: 'im.example.test',
  },
}
const roomA: ChatRoom = {
  id: 'room-a',
  name: 'General',
  description: 'General room',
  jid: 'room-a@conference.example.test',
  status: 'active',
  ownerId: 'owner',
  memberCount: 2,
  messageCount: 0,
  createdAt,
}
const roomB: ChatRoom = { ...roomA, id: 'room-b', name: 'Product', jid: 'room-b@conference.example.test' }
const credentials = { apiAddress: connection.apiBase, username: 'alex', password: 'account-password' }
const message = (id: string, roomId = roomA.id, userId = 'other'): ChatMessage => ({
  id,
  roomId,
  userId,
  displayName: userId === 'self' ? 'Alex' : 'Taylor',
  body: `Message ${id}`,
  status: 'visible',
  kind: 'text',
  createdAt,
})

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((done, fail) => {
    resolve = done
    reject = fail
  })
  return { promise, resolve, reject }
}

const login = jest.fn(
  async (
    _apiAddress: string,
    _username: string,
    _password: string,
    _options?: ChatApiOptions
  ): Promise<ChatConnection> => connection
)
const listRooms = jest.fn(async (_connection: ChatConnection, _options?: ChatApiOptions): Promise<ChatRoom[]> => [
  roomA,
  roomB,
])
const joinRoomApi = jest.fn(
  async (_connection: ChatConnection, _roomId: string, _options?: ChatApiOptions) => undefined
)
const listMessages = jest.fn(
  async (
    _connection: ChatConnection,
    _roomId: string,
    _limit?: number,
    _options?: ChatApiOptions
  ): Promise<ChatMessage[]> => []
)
const closeSession = jest.fn(async (_connection: ChatConnection, _options?: ChatApiOptions) => undefined)
const channel = {
  status: 'online' as ChatChannelStatus,
  error: undefined,
  connect: jest.fn(async (_connection: ChatConnection) => undefined),
  disconnect: jest.fn(async () => undefined),
  joinRoom: jest.fn(async (_room: ChatRoom) => undefined),
  sendRoom: jest.fn(async (_room: ChatRoom, _body: string) => undefined),
}
let callbacks: { onMessage: (value: ChatMessage) => void; onReconnect?: () => void | Promise<void> }
let identity = 'account-one'
let active = true
const sessionListeners = new Set<() => void>()

jest.doMock('./api', () => ({
  loginChatPlatform: login,
  listChatRooms: listRooms,
  joinChatRoom: joinRoomApi,
  listChatMessages: listMessages,
  closeChatSession: closeSession,
}))
jest.doMock('./useChatRoomChannel', () => ({
  useChatRoomChannel: (next: typeof callbacks) => {
    callbacks = next
    return channel
  },
}))
jest.doMock('@platform/keep-alive', () => ({ useKeepAliveContext: () => active }))
jest.doMock('@platform/auth/model/session', () => ({
  getSessionIdentity: () => identity,
  subscribeSession: (listener: () => void) => {
    sessionListeners.add(listener)
    return () => sessionListeners.delete(listener)
  },
}))

const { useChatWorkspace } = require('./useChatWorkspace') as typeof import('./useChatWorkspace')

beforeEach(() => {
  identity = 'account-one'
  active = true
  sessionListeners.clear()
  jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible')
  login.mockReset().mockResolvedValue(connection)
  listRooms.mockReset().mockResolvedValue([roomA, roomB])
  joinRoomApi.mockReset().mockResolvedValue(undefined)
  listMessages.mockReset().mockResolvedValue([])
  closeSession.mockReset().mockResolvedValue(undefined)
  channel.connect.mockReset().mockResolvedValue(undefined)
  channel.disconnect.mockReset().mockResolvedValue(undefined)
  channel.joinRoom.mockReset().mockResolvedValue(undefined)
  channel.sendRoom.mockReset().mockResolvedValue(undefined)
  channel.status = 'online'
})
afterEach(() => jest.restoreAllMocks())

async function connectedWorkspace() {
  const hook = renderHook(() => useChatWorkspace())
  await act(async () => {
    expect(await hook.result.current.connect(credentials)).toBe(true)
  })
  expect(hook.result.current.room?.id).toBe(roomA.id)
  return hook
}

test('a late history response from a previous room never replaces the selected room', async () => {
  const { result } = await connectedWorkspace()
  const previousHistory = deferred<ChatMessage[]>()
  listMessages.mockImplementation(async (_connection, roomId) =>
    roomId === roomA.id ? previousHistory.promise : [message('product', roomB.id)]
  )
  let selectA!: Promise<void>
  act(() => {
    selectA = result.current.selectRoom(roomA)
  })
  await waitFor(() => expect(listMessages).toHaveBeenLastCalledWith(connection, roomA.id, 80, expect.anything()))
  const previousSignal = listMessages.mock.calls.at(-1)?.[3]?.signal
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  expect(previousSignal?.aborted).toBe(true)
  await act(async () => {
    previousHistory.resolve([message('late-general')])
    await selectA
  })
  expect(result.current.room?.id).toBe(roomB.id)
  expect(result.current.messages.map((value) => value.id)).toEqual(['product'])
  expect(result.current.cache[roomA.id]).toEqual([])
})

test('history and repeated live echoes produce one server message per id', async () => {
  const { result } = await connectedWorkspace()
  const live = message('one')
  act(() => {
    callbacks.onMessage(live)
    callbacks.onMessage(live)
  })
  listMessages.mockResolvedValueOnce([live, message('two')])
  act(() => result.current.refreshHistory())
  await waitFor(() => expect(result.current.messages.map((value) => value.id)).toEqual(['one', 'two']))
  expect(result.current.newMessages[roomA.id]).toBe(0)
})

test('only observed foreign messages in background rooms increment new-message counts', async () => {
  const { result } = await connectedWorkspace()
  await act(async () => {
    await result.current.selectRoom(roomB)
    await result.current.selectRoom(roomA)
  })
  const background = message('background', roomB.id)
  act(() => {
    callbacks.onMessage(background)
    callbacks.onMessage(background)
    callbacks.onMessage(message('own', roomB.id, 'self'))
  })
  expect(result.current.newMessages[roomB.id]).toBe(1)
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  expect(result.current.newMessages[roomB.id]).toBe(0)
})

test('an inactive cached page does not silently read the selected room', async () => {
  const { result, rerender } = await connectedWorkspace()
  active = false
  rerender()
  act(() => callbacks.onMessage(message('while-inactive')))
  expect(result.current.newMessages[roomA.id]).toBe(1)
  active = true
  rerender()
  expect(result.current.newMessages[roomA.id]).toBe(0)
})

test('the mobile room list does not mark its hidden conversation as read', async () => {
  const { result } = await connectedWorkspace()
  act(() => result.current.setReadingRoom(false))
  act(() => callbacks.onMessage(message('while-showing-room-list')))
  expect(result.current.newMessages[roomA.id]).toBe(1)
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'))
  })
  expect(result.current.newMessages[roomA.id]).toBe(1)
  act(() => result.current.setReadingRoom(true))
  expect(result.current.newMessages[roomA.id]).toBe(0)
})

test('a room is not ready for composing until its own join acknowledgement finishes', async () => {
  const { result } = await connectedWorkspace()
  const acknowledgement = deferred<void>()
  channel.joinRoom.mockReturnValueOnce(acknowledgement.promise)
  let selecting!: Promise<void>
  act(() => {
    selecting = result.current.selectRoom(roomB)
  })
  await waitFor(() => expect(channel.joinRoom).toHaveBeenLastCalledWith(roomB))
  expect(result.current.roomReady).toBe(false)
  await act(async () => {
    acknowledgement.resolve(undefined)
    await selecting
  })
  expect(result.current.roomReady).toBe(true)
})

test('a disconnected room becomes ready only after its reconnect join is acknowledged', async () => {
  const { result, rerender } = await connectedWorkspace()
  expect(result.current.roomReady).toBe(true)
  channel.status = 'connecting'
  rerender()
  expect(result.current.roomReady).toBe(false)
  channel.status = 'online'
  rerender()
  expect(result.current.roomReady).toBe(false)

  channel.joinRoom.mockRejectedValueOnce({ code: 'joinTimeout' })
  act(() => callbacks.onReconnect?.())
  await waitFor(() => expect(result.current.historyError).toBe('joinTimeout'))
  expect(result.current.roomReady).toBe(false)

  const acknowledgement = deferred<void>()
  channel.joinRoom.mockReturnValueOnce(acknowledgement.promise)
  act(() => callbacks.onReconnect?.())
  await waitFor(() => expect(channel.joinRoom).toHaveBeenCalledTimes(3))
  expect(channel.joinRoom).toHaveBeenLastCalledWith(roomA)
  expect(result.current.roomReady).toBe(false)
  await act(async () => {
    acknowledgement.resolve(undefined)
  })
  await waitFor(() => expect(result.current.roomReady).toBe(true))
})

test('sending never clears a newer draft or invents a successful message before server echo', async () => {
  const { result } = await connectedWorkspace()
  const delivery = deferred<void>()
  channel.sendRoom.mockReturnValueOnce(delivery.promise)
  act(() => result.current.setDraft('First draft'))
  let sending!: Promise<boolean>
  act(() => {
    sending = result.current.send()
  })
  expect(result.current.sending).toBe(true)
  act(() => result.current.setDraft('A newer draft'))
  await act(async () => {
    delivery.resolve(undefined)
    await sending
  })
  expect(channel.sendRoom).toHaveBeenCalledWith(roomA, 'First draft')
  expect(result.current.draft).toBe('A newer draft')
  expect(result.current.messages).toEqual([])
  expect(result.current.sending).toBe(false)
})

test('a failed send keeps the original room draft and exposes a fixed error code', async () => {
  const { result } = await connectedWorkspace()
  channel.sendRoom.mockRejectedValueOnce({ code: 'sendFailed', message: 'provider details and credentials' })
  act(() => result.current.setDraft('Keep this draft'))
  await act(async () => {
    await result.current.send()
  })
  expect(result.current.draft).toBe('Keep this draft')
  expect(result.current.sendError).toBe('sendFailed')
  expect(result.current.messages).toEqual([])
})

test('a late send failure stays with its room and survives editing a different room draft', async () => {
  const { result } = await connectedWorkspace()
  const delivery = deferred<void>()
  channel.sendRoom.mockReturnValueOnce(delivery.promise)
  act(() => result.current.setDraft('General draft to retry'))
  let sending!: Promise<boolean>
  act(() => {
    sending = result.current.send()
  })
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  act(() => result.current.setDraft('Product draft'))
  await act(async () => {
    delivery.reject({ code: 'sendFailed' })
    await sending
  })
  expect(result.current.sendError).toBe('')
  expect(result.current.draft).toBe('Product draft')
  act(() => result.current.setDraft('A newer Product draft'))
  await act(async () => {
    await result.current.selectRoom(roomA)
  })
  expect(channel.sendRoom).toHaveBeenCalledWith(roomA, 'General draft to retry')
  expect(result.current.sendError).toBe('sendFailed')
  expect(result.current.draft).toBe('General draft to retry')
  act(() => result.current.setDraft('Updated General draft'))
  expect(result.current.sendError).toBe('')
})

test('room drafts survive switching while a sent snapshot clears only its original room', async () => {
  const { result } = await connectedWorkspace()
  const delivery = deferred<void>()
  channel.sendRoom.mockReturnValueOnce(delivery.promise)
  act(() => result.current.setDraft('General draft'))
  let sending!: Promise<boolean>
  act(() => {
    sending = result.current.send()
  })
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  act(() => result.current.setDraft('Product draft'))
  await act(async () => {
    delivery.resolve(undefined)
    await sending
  })
  expect(result.current.draft).toBe('Product draft')
  await act(async () => {
    await result.current.selectRoom(roomA)
  })
  expect(result.current.draft).toBe('')
})

test('disconnect clears account data and ignores outstanding history and send completions', async () => {
  const { result } = await connectedWorkspace()
  const history = deferred<ChatMessage[]>()
  const delivery = deferred<void>()
  listMessages.mockReturnValueOnce(history.promise)
  channel.sendRoom.mockReturnValueOnce(delivery.promise)
  act(() => {
    callbacks.onMessage(message('cached'))
    result.current.setDraft('Private draft')
  })
  let sending!: Promise<boolean>
  act(() => {
    result.current.refreshHistory()
    sending = result.current.send()
  })
  await act(async () => {
    await result.current.disconnect()
  })
  await act(async () => {
    history.resolve([message('late')])
    delivery.resolve(undefined)
    await sending
  })
  expect(result.current.connection).toBeUndefined()
  expect(result.current.rooms).toEqual([])
  expect(result.current.cache).toEqual({})
  expect(result.current.draft).toBe('')
  expect(result.current.sendError).toBe('')
  expect(closeSession).toHaveBeenCalledWith(connection)
})

test('an application account change revokes the chat session and removes old cache and drafts', async () => {
  const { result } = await connectedWorkspace()
  act(() => {
    callbacks.onMessage(message('private'))
    result.current.setDraft('Private draft')
  })
  await act(async () => {
    identity = 'account-two'
    sessionListeners.forEach((listener) => listener())
  })
  expect(result.current.connection).toBeUndefined()
  expect(result.current.cache).toEqual({})
  expect(result.current.draft).toBe('')
  expect(result.current.resetVersion).toBe(1)
  expect(closeSession).toHaveBeenCalledTimes(1)
})

test('cancelling a pending login revokes a late-created session without connecting it', async () => {
  const loginResult = deferred<ChatConnection>()
  login.mockReturnValueOnce(loginResult.promise)
  const { result } = renderHook(() => useChatWorkspace())
  let connecting!: Promise<boolean>
  act(() => {
    connecting = result.current.connect(credentials)
  })
  await waitFor(() => expect(login).toHaveBeenCalledTimes(1))
  const signal = login.mock.calls[0][3]?.signal
  await act(async () => {
    await result.current.cancelConnection()
  })
  expect(signal?.aborted).toBe(true)
  await act(async () => {
    loginResult.resolve(connection)
    expect(await connecting).toBe(false)
  })
  expect(channel.connect).not.toHaveBeenCalled()
  expect(closeSession).toHaveBeenCalledWith(connection)
  expect(result.current.connection).toBeUndefined()
  expect(result.current.connecting).toBe(false)
})

test('cancelling during the initial disconnect prevents the queued login from starting', async () => {
  const stopped = deferred<void>()
  channel.disconnect.mockReturnValueOnce(stopped.promise)
  const { result } = renderHook(() => useChatWorkspace())
  let connecting!: Promise<boolean>
  act(() => {
    connecting = result.current.connect(credentials)
  })
  expect(login).not.toHaveBeenCalled()
  await act(async () => {
    await result.current.cancelConnection()
  })
  await act(async () => {
    stopped.resolve(undefined)
    expect(await connecting).toBe(false)
  })
  expect(login).not.toHaveBeenCalled()
  expect(result.current.connection).toBeUndefined()
})

test('two connect clicks share one in-progress attempt even before the prior socket stops', async () => {
  const stopped = deferred<void>()
  channel.disconnect.mockReturnValueOnce(stopped.promise)
  const { result } = renderHook(() => useChatWorkspace())
  let first!: Promise<boolean>
  let second!: Promise<boolean>
  act(() => {
    first = result.current.connect(credentials)
    second = result.current.connect(credentials)
  })
  await expect(second).resolves.toBe(false)
  await act(async () => {
    stopped.resolve(undefined)
    expect(await first).toBe(true)
  })
  expect(login).toHaveBeenCalledTimes(1)
})

test('a cancelled attempt arriving after a new connection cannot clear the new account data', async () => {
  const previousLogin = deferred<ChatConnection>()
  const currentConnection: ChatConnection = {
    ...connection,
    token: 'second-token',
    session: { ...connection.session, imSessionId: 'session-two' },
  }
  login.mockReturnValueOnce(previousLogin.promise).mockResolvedValueOnce(currentConnection)
  const { result } = renderHook(() => useChatWorkspace())
  let previousAttempt!: Promise<boolean>
  act(() => {
    previousAttempt = result.current.connect(credentials)
  })
  await waitFor(() => expect(login).toHaveBeenCalledTimes(1))
  await act(async () => {
    await result.current.cancelConnection()
  })
  await act(async () => {
    expect(await result.current.connect(credentials)).toBe(true)
  })
  act(() => {
    callbacks.onMessage(message('new-account'))
    result.current.setDraft('New account draft')
  })
  await act(async () => {
    previousLogin.resolve(connection)
    expect(await previousAttempt).toBe(false)
  })
  expect(result.current.connection).toBe(currentConnection)
  expect(result.current.messages.map((value) => value.id)).toEqual(['new-account'])
  expect(result.current.draft).toBe('New account draft')
  expect(closeSession).toHaveBeenCalledWith(connection)
  expect(closeSession).not.toHaveBeenCalledWith(currentConnection)
})

function communicationCalls() {
  return {
    api: [login, listRooms, joinRoomApi, listMessages, closeSession].map((mock) => mock.mock.calls.length),
    channel: [channel.connect, channel.disconnect, channel.joinRoom, channel.sendRoom].map(
      (mock) => mock.mock.calls.length
    ),
  }
}

test('a quoted wire override clears only its submitted room raw draft and preserves private drafts', async () => {
  const { result } = await connectedWorkspace()
  const delivery = deferred<void>()
  channel.sendRoom.mockReturnValueOnce(delivery.promise)
  act(() => {
    result.current.setDraft('  Original reply  ')
    result.current.setNoteDraft('Private General draft')
  })
  const body = '> **Taylor**\n> Earlier message\n\n  Original reply  '
  let sending!: Promise<boolean>
  act(() => {
    sending = result.current.send(body)
  })
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  act(() => {
    result.current.setDraft('Product public draft')
    result.current.setNoteDraft('Product private draft')
  })
  await act(async () => {
    delivery.resolve(undefined)
    expect(await sending).toBe(true)
  })
  expect(channel.sendRoom).toHaveBeenCalledWith(roomA, body.trim())
  expect(result.current.draft).toBe('Product public draft')
  expect(result.current.noteDraft).toBe('Product private draft')
  expect(result.current.messages).toEqual([])
  await act(async () => {
    await result.current.selectRoom(roomA)
  })
  expect(result.current.draft).toBe('')
  expect(result.current.noteDraft).toBe('Private General draft')
})

test('a quoted send never clears a replacement raw draft entered while delivery is pending', async () => {
  const { result } = await connectedWorkspace()
  const delivery = deferred<void>()
  channel.sendRoom.mockReturnValueOnce(delivery.promise)
  act(() => result.current.setDraft('First reply'))
  let sending!: Promise<boolean>
  act(() => {
    sending = result.current.send('> Context\n\nFirst reply')
  })
  act(() => result.current.setDraft('A replacement reply'))
  await act(async () => {
    delivery.resolve(undefined)
    expect(await sending).toBe(true)
  })
  expect(result.current.draft).toBe('A replacement reply')
  expect(result.current.messages).toEqual([])
})

test('a failed quoted send returns false and keeps the editable raw reply', async () => {
  const { result } = await connectedWorkspace()
  channel.sendRoom.mockRejectedValueOnce({ code: 'sendFailed' })
  act(() => result.current.setDraft('Retry this raw reply'))
  await act(async () => {
    expect(await result.current.send('> Context\n\nRetry this raw reply')).toBe(false)
  })
  expect(result.current.draft).toBe('Retry this raw reply')
  expect(result.current.sendError).toBe('sendFailed')
})

test('an old account send cannot clear a new account draft or settle its pending send', async () => {
  const { result } = await connectedWorkspace()
  const previous = deferred<void>()
  const current = deferred<void>()
  channel.sendRoom.mockReturnValueOnce(previous.promise).mockReturnValueOnce(current.promise)
  act(() => result.current.setDraft('Old account reply'))
  let oldSend!: Promise<boolean>
  act(() => {
    oldSend = result.current.send('> Old context\n\nOld account reply')
  })
  await act(async () => {
    identity = 'account-two'
    sessionListeners.forEach((listener) => listener())
  })
  await act(async () => {
    expect(await result.current.connect(credentials)).toBe(true)
  })
  act(() => result.current.setDraft('Current account reply'))
  let currentSend!: Promise<boolean>
  act(() => {
    currentSend = result.current.send('> Current context\n\nCurrent account reply')
  })
  act(() => result.current.setDraft('A newer current-account draft'))
  await act(async () => {
    previous.resolve(undefined)
    expect(await oldSend).toBe(false)
  })
  expect(result.current.sending).toBe(true)
  expect(result.current.draft).toBe('A newer current-account draft')
  await act(async () => {
    current.resolve(undefined)
    expect(await currentSend).toBe(true)
  })
  expect(result.current.sending).toBe(false)
  expect(result.current.draft).toBe('A newer current-account draft')
})

test('an oversized quoted body is rejected before wire transmission without falling back to the raw draft', async () => {
  const { result } = await connectedWorkspace()
  act(() => result.current.setDraft('Small valid draft'))
  const before = communicationCalls()
  await act(async () => {
    expect(await result.current.send('a'.repeat(3999) + '🙂')).toBe(false)
  })
  expect(result.current.sendError).toBe('invalidMessage')
  expect(result.current.draft).toBe('Small valid draft')
  expect(communicationCalls()).toEqual(before)
  await act(async () => {
    expect(await result.current.send('a'.repeat(3998) + '🙂')).toBe(true)
  })
  expect(channel.sendRoom.mock.calls[0][1]).toHaveLength(4000)
})

test('an explicit empty override does not accidentally send the nonempty raw draft', async () => {
  const { result } = await connectedWorkspace()
  act(() => result.current.setDraft('Keep this draft'))
  await act(async () => {
    expect(await result.current.send('   ')).toBe(false)
  })
  expect(channel.sendRoom).not.toHaveBeenCalled()
  expect(result.current.draft).toBe('Keep this draft')
})

test('private notes save while transport is offline without touching public cache, drafts or APIs', async () => {
  const { result, rerender } = await connectedWorkspace()
  act(() => {
    callbacks.onMessage(message('public-history'))
    result.current.setDraft('Public reply stays separate')
    result.current.setNoteDraft('  Local private memo  ')
  })
  channel.status = 'disconnected'
  rerender()
  const before = communicationCalls()
  const publicCache = result.current.cache
  act(() => {
    expect(result.current.savePrivateNote(result.current.noteDraft)).toBe(true)
  })
  expect(result.current.privateNotes).toHaveLength(1)
  expect(result.current.privateNotes[0]).toMatchObject({ roomId: roomA.id, body: 'Local private memo' })
  expect(Number.isFinite(Date.parse(result.current.privateNotes[0].createdAt))).toBe(true)
  expect(result.current.noteDraft).toBe('')
  expect(result.current.draft).toBe('Public reply stays separate')
  expect(result.current.cache).toBe(publicCache)
  expect(result.current.messages.map((item) => item.id)).toEqual(['public-history'])
  expect(communicationCalls()).toEqual(before)
})

test('private drafts and saved notes remain independent per room and deletion is local to the selected room', async () => {
  const { result } = await connectedWorkspace()
  act(() => {
    result.current.setNoteDraft('General memo')
    expect(result.current.savePrivateNote('General memo')).toBe(true)
    result.current.setNoteDraft('Unsaved General memo')
  })
  const generalId = result.current.privateNotes[0].id
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  expect(result.current.noteDraft).toBe('')
  expect(result.current.privateNotes).toEqual([])
  act(() => {
    expect(result.current.savePrivateNote('Product memo')).toBe(true)
    result.current.setNoteDraft('Unsaved Product memo')
  })
  const productId = result.current.privateNotes[0].id
  await act(async () => {
    await result.current.selectRoom(roomA)
  })
  expect(result.current.noteDraft).toBe('Unsaved General memo')
  expect(result.current.privateNotes.map((item) => item.body)).toEqual(['General memo'])
  const before = communicationCalls()
  act(() => {
    result.current.deletePrivateNote(productId)
  })
  expect(result.current.privateNotes[0].id).toBe(generalId)
  act(() => result.current.deletePrivateNote(generalId))
  expect(result.current.privateNotes).toEqual([])
  expect(communicationCalls()).toEqual(before)
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  expect(result.current.noteDraft).toBe('Unsaved Product memo')
  expect(result.current.privateNotes.map((item) => item.body)).toEqual(['Product memo'])
})

test('saving a private snapshot preserves a newer private draft and rejects blank or oversized notes', async () => {
  const { result } = await connectedWorkspace()
  act(() => result.current.setNoteDraft('A newer private draft'))
  const before = communicationCalls()
  act(() => {
    expect(result.current.savePrivateNote('Earlier private snapshot')).toBe(true)
    expect(result.current.savePrivateNote('  ')).toBe(false)
    expect(result.current.savePrivateNote('a'.repeat(3999) + '🙂')).toBe(false)
    expect(result.current.savePrivateNote('a'.repeat(3998) + '🙂')).toBe(true)
  })
  expect(result.current.noteDraft).toBe('A newer private draft')
  expect(result.current.privateNotes).toHaveLength(2)
  expect(result.current.privateNotes.at(-1)?.body).toHaveLength(4000)
  expect(communicationCalls()).toEqual(before)
})

test('each room retains only its latest 100 private notes without publishing them', async () => {
  const { result } = await connectedWorkspace()
  const before = communicationCalls()
  act(() => {
    for (let index = 0; index < 105; index += 1)
      expect(result.current.savePrivateNote('General note ' + index)).toBe(true)
  })
  expect(result.current.privateNotes).toHaveLength(100)
  expect(result.current.privateNotes[0].body).toBe('General note 5')
  expect(result.current.privateNotes.at(-1)?.body).toBe('General note 104')
  expect(new Set(result.current.privateNotes.map((note) => note.id)).size).toBe(100)
  expect(result.current.messages).toEqual([])
  expect(communicationCalls()).toEqual(before)
  await act(async () => {
    await result.current.selectRoom(roomB)
  })
  act(() => {
    expect(result.current.savePrivateNote('One Product memo')).toBe(true)
  })
  expect(result.current.privateNotes).toHaveLength(1)
  await act(async () => {
    await result.current.selectRoom(roomA)
  })
  expect(result.current.privateNotes).toHaveLength(100)
})

test('private notes and local pin/read controls cannot create account state before connection', () => {
  const { result } = renderHook(() => useChatWorkspace())
  const before = communicationCalls()
  act(() => {
    result.current.setNoteDraft('Should not be retained')
    expect(result.current.savePrivateNote('Should not be retained')).toBe(false)
    result.current.togglePinRoom(roomA.id)
    result.current.markRoomRead(roomA.id)
  })
  expect(result.current.noteDraft).toBe('')
  expect(result.current.privateNotes).toEqual([])
  expect(result.current.pinnedRoomIds).toEqual([])
  expect(result.current.newMessages).toEqual({})
  expect(communicationCalls()).toEqual(before)
})

test('pinning and marking observed messages read change only connection-local state', async () => {
  const { result } = await connectedWorkspace()
  act(() => callbacks.onMessage(message('background', roomB.id)))
  expect(result.current.newMessages[roomB.id]).toBe(1)
  const cached = result.current.cache
  const before = communicationCalls()
  act(() => {
    result.current.togglePinRoom(roomA.id)
    result.current.togglePinRoom(roomB.id)
    result.current.togglePinRoom(roomA.id)
    result.current.togglePinRoom('unknown-room')
    result.current.markRoomRead(roomB.id)
    result.current.markRoomRead('unknown-room')
  })
  expect(result.current.pinnedRoomIds).toEqual([roomB.id])
  expect(result.current.newMessages[roomB.id]).toBe(0)
  expect(result.current.newMessages['unknown-room']).toBeUndefined()
  expect(result.current.cache).toBe(cached)
  expect(result.current.cache[roomB.id].map((item) => item.id)).toEqual(['background'])
  expect(communicationCalls()).toEqual(before)
})

test.each(['disconnect', 'host account change'] as const)(
  '%s clears every room private note, draft, pin and local unread counter',
  async (action) => {
    const { result } = await connectedWorkspace()
    act(() => {
      expect(result.current.savePrivateNote('General private note')).toBe(true)
      result.current.setNoteDraft('General unsaved note')
      result.current.togglePinRoom(roomA.id)
    })
    await act(async () => {
      await result.current.selectRoom(roomB)
    })
    act(() => {
      expect(result.current.savePrivateNote('Product private note')).toBe(true)
      result.current.setNoteDraft('Product unsaved note')
      result.current.togglePinRoom(roomB.id)
      callbacks.onMessage(message('background', roomA.id))
    })
    await act(async () => {
      if (action === 'disconnect') await result.current.disconnect()
      else {
        identity = 'account-two'
        sessionListeners.forEach((listener) => listener())
      }
    })
    expect(result.current.connection).toBeUndefined()
    expect(result.current.noteDraft).toBe('')
    expect(result.current.privateNotes).toEqual([])
    expect(result.current.pinnedRoomIds).toEqual([])
    expect(result.current.newMessages).toEqual({})
    await act(async () => {
      expect(await result.current.connect(credentials)).toBe(true)
    })
    expect(result.current.noteDraft).toBe('')
    expect(result.current.privateNotes).toEqual([])
    await act(async () => {
      await result.current.selectRoom(roomB)
    })
    expect(result.current.noteDraft).toBe('')
    expect(result.current.privateNotes).toEqual([])
  }
)
