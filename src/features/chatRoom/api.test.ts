import { ChatApiError, closeChatSession, joinChatRoom, listChatMessages, listChatRooms, loginChatPlatform } from './api'
import type { ChatConnection } from './model'

const apiBase = 'https://chat.example.test/api'
const createdAt = '2026-11-09T08:00:00.000Z'
const user = {
  id: 'usr_one',
  username: 'ada',
  displayName: 'Ada',
  role: 'user' as const,
  status: 'active' as const,
  createdAt,
}
const session = {
  imSessionId: 'session_one',
  xmppUsername: 'session_one',
  credential: 'test-session-credential',
  jid: 'usr_one@im.example.test',
  websocketUrl: 'wss://im.example.test/api/xmpp-websocket',
  domain: 'im.example.test',
}
const connection: ChatConnection = { apiBase, token: 'test-platform-token', user, session }
const room = {
  id: 'room_one',
  name: 'General',
  description: 'Team discussion',
  jid: 'room-room_one@conference.example.test',
  status: 'active',
  ownerId: user.id,
  memberCount: 3,
  messageCount: 9,
  createdAt,
}
const message = {
  id: 'msg_one',
  roomId: room.id,
  userId: user.id,
  displayName: user.displayName,
  body: 'Hello',
  status: 'visible',
  createdAt,
}

function response(payload: unknown, status = 200, contentType = 'application/json'): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'Content-Type': contentType }),
    json: jest.fn(async () => payload),
  } as unknown as Response
}

function mockFetch(implementation?: typeof fetch): jest.MockedFunction<typeof fetch> {
  return jest.fn(implementation) as jest.MockedFunction<typeof fetch>
}

function deferred<T>() {
  let resolve: (value: T) => void
  let reject: (reason: unknown) => void
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })
  return { promise, resolve: (value: T) => resolve(value), reject: (reason: unknown) => reject(reason) }
}

afterEach(() => jest.useRealTimers())

describe('platform login and ephemeral session', () => {
  it('logs in then creates a temporary session and returns only the connection contract', async () => {
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce(response({ token: connection.token, user, unexpected: 'omit-me' }))
      .mockResolvedValueOnce(response({ ...session, debug: 'omit-me' }, 201))
    await expect(loginChatPlatform(`${apiBase}/`, ' ADA ', 'private test password', { fetcher })).resolves.toEqual(
      connection
    )
    expect(fetcher.mock.calls.map(([url]) => url)).toEqual([`${apiBase}/auth/login`, `${apiBase}/im/session`])
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ username: 'ada', password: 'private test password' })
    expect(fetcher.mock.calls[0][1]).toMatchObject({
      method: 'POST',
      credentials: 'omit',
      cache: 'no-store',
      redirect: 'error',
    })
    expect(fetcher.mock.calls[1][1]).toMatchObject({
      method: 'POST',
      headers: { Authorization: `Bearer ${connection.token}` },
    })
    expect(fetcher.mock.calls[1][1].body).toBeUndefined()
  })

  it.each([
    ['http://remote.example.test/api', 'ada', 'password'],
    ['https://name:secret@chat.example.test/api', 'ada', 'password'],
    [apiBase, '', 'password'],
    [apiBase, 'invalid name', 'password'],
    [apiBase, 'ada', ''],
  ])('rejects invalid login data before any request', async (address, username, password) => {
    const fetcher = mockFetch()
    await expect(loginChatPlatform(address, username, password, { fetcher })).rejects.toMatchObject({
      code: 'invalidInput',
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it.each([
    { token: '', user },
    { token: 'bad\ntoken', user },
    { token: connection.token },
    { token: connection.token, user: { ...user, role: 'invalid' } },
  ])('rejects malformed login payloads', async (payload) => {
    const fetcher = mockFetch(async () => response(payload))
    await expect(loginChatPlatform(apiBase, 'ada', 'test-password', { fetcher })).rejects.toMatchObject({
      code: 'invalidResponse',
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('reports suspended accounts without creating an IM session', async () => {
    const fetcher = mockFetch(async () => response({ token: connection.token, user: { ...user, status: 'suspended' } }))
    await expect(loginChatPlatform(apiBase, 'ada', 'test-password', { fetcher })).rejects.toMatchObject({
      code: 'forbidden',
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('revokes a created session when its remaining payload is malformed', async () => {
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce(response({ token: connection.token, user }))
      .mockResolvedValueOnce(response({ ...session, websocketUrl: 'ws://invalid.example.test/xmpp' }, 201))
      .mockResolvedValueOnce(response(undefined, 204))
    await expect(loginChatPlatform(apiBase, 'ada', 'test-password', { fetcher })).rejects.toMatchObject({
      code: 'invalidResponse',
    })
    expect(fetcher).toHaveBeenCalledTimes(3)
    expect(fetcher.mock.calls[2]).toEqual([
      `${apiBase}/im/session`,
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: `Bearer ${connection.token}`,
          'X-IM-Session-ID': session.imSessionId,
        }),
      }),
    ])
  })

  it('revokes a late temporary session after the caller has cancelled login', async () => {
    const controller = new AbortController()
    const pending = deferred<unknown>()
    const bodyStarted = deferred<void>()
    const sessionResponse = response(undefined, 201)
    sessionResponse.json = jest.fn(() => {
      bodyStarted.resolve()
      return pending.promise
    })
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce(response({ token: connection.token, user }))
      .mockResolvedValueOnce(sessionResponse)
      .mockResolvedValueOnce(response(undefined, 204))
    const result = loginChatPlatform(apiBase, 'ada', 'test-password', { fetcher, signal: controller.signal })
    const rejected = expect(result).rejects.toMatchObject({ code: 'aborted' })
    await bodyStarted.promise
    controller.abort()
    await rejected
    pending.resolve(session)
    await Promise.resolve()
    await Promise.resolve()
    expect(fetcher).toHaveBeenCalledTimes(3)
    expect(fetcher.mock.calls[2][1].signal.aborted).toBe(false)
  })

  it('revokes a late temporary session after the session request timed out', async () => {
    jest.useFakeTimers()
    const pending = deferred<unknown>()
    const bodyStarted = deferred<void>()
    const sessionResponse = response(undefined, 201)
    sessionResponse.json = jest.fn(() => {
      bodyStarted.resolve()
      return pending.promise
    })
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce(response({ token: connection.token, user }))
      .mockResolvedValueOnce(sessionResponse)
      .mockResolvedValueOnce(response(undefined, 204))
    const result = loginChatPlatform(apiBase, 'ada', 'test-password', { fetcher, timeoutMs: 100 })
    const rejected = expect(result).rejects.toMatchObject({ code: 'timeout' })
    await bodyStarted.promise
    await jest.advanceTimersByTimeAsync(101)
    await rejected
    pending.resolve(session)
    await Promise.resolve()
    await Promise.resolve()
    expect(fetcher).toHaveBeenCalledTimes(3)
    expect(fetcher.mock.calls[2][1].method).toBe('DELETE')
  })
})

describe('room and history API', () => {
  it('lists validated room data using the chat token, without platform or cookie credentials', async () => {
    const fetcher = mockFetch(async () =>
      response({ rooms: [room, { ...room, id: 'closed', status: 'closed' }, { id: 'invalid' }] })
    )
    const rooms = await listChatRooms(connection, { fetcher })
    expect(rooms).toHaveLength(2)
    expect(rooms[0]).toEqual(room)
    expect(fetcher.mock.calls[0]).toEqual([
      `${apiBase}/rooms`,
      expect.objectContaining({
        method: 'GET',
        credentials: 'omit',
        headers: expect.objectContaining({ Authorization: `Bearer ${connection.token}` }),
      }),
    ])
  })

  it('joins a room through the real idempotent endpoint and rejects mismatched responses', async () => {
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce(response({ room }))
      .mockResolvedValueOnce(response({ room: { ...room, id: 'wrong_room' } }))
    await expect(joinChatRoom(connection, room.id, { fetcher })).resolves.toBeUndefined()
    expect(fetcher.mock.calls[0][0]).toBe(`${apiBase}/rooms/${room.id}/join`)
    expect(fetcher.mock.calls[0][1].method).toBe('POST')
    await expect(joinChatRoom(connection, room.id, { fetcher })).rejects.toMatchObject({ code: 'invalidResponse' })
  })

  it('uses bounded history and filters wrong-room or malformed records before display', async () => {
    const fetcher = mockFetch(async () =>
      response({
        messages: [
          message,
          { ...message, id: 'removed', body: 'never-display-this', status: 'removed' },
          { ...message, id: 'other', roomId: 'wrong_room' },
          { id: 'invalid' },
        ],
      })
    )
    const messages = await listChatMessages(connection, room.id, 200, { fetcher })
    expect(fetcher.mock.calls[0][0]).toBe(`${apiBase}/rooms/${room.id}/messages?limit=200`)
    expect(messages).toHaveLength(2)
    expect(messages[1]).toMatchObject({ body: '', kind: 'removed' })
    expect(JSON.stringify(messages)).not.toContain('never-display-this')
  })

  it('encodes room identifiers as a single URL segment', async () => {
    const roomId = 'room/other?x=1'
    const fetcher = mockFetch(async () => response({ messages: [] }))
    await listChatMessages(connection, roomId, 80, { fetcher })
    expect(fetcher.mock.calls[0][0]).toBe(`${apiBase}/rooms/room%2Fother%3Fx%3D1/messages?limit=80`)
  })

  it.each([0, 201, -1, 1.5, NaN])('rejects invalid history limit %j without sending', async (limit) => {
    const fetcher = mockFetch()
    await expect(listChatMessages(connection, room.id, limit, { fetcher })).rejects.toMatchObject({
      code: 'invalidInput',
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('closes only the current temporary session and handles an empty 204 body', async () => {
    const reply = response(undefined, 204)
    const fetcher = mockFetch(async () => reply)
    await expect(closeChatSession(connection, { fetcher })).resolves.toBeUndefined()
    expect(reply.json).not.toHaveBeenCalled()
    expect(fetcher.mock.calls[0][1]).toMatchObject({
      method: 'DELETE',
      headers: { 'X-IM-Session-ID': session.imSessionId },
    })
  })

  it.each([{ rooms: undefined }, null, [], 'not an object'])('rejects malformed room lists', async (payload) => {
    const fetcher = mockFetch(async () => response(payload))
    await expect(listChatRooms(connection, { fetcher })).rejects.toMatchObject({ code: 'invalidResponse' })
  })
})

describe('request errors and cancellation', () => {
  it.each([
    [400, 'invalidInput'],
    [401, 'unauthorized'],
    [403, 'forbidden'],
    [404, 'invalidInput'],
    [409, 'roomUnavailable'],
    [429, 'rateLimited'],
    [500, 'unavailable'],
  ] as const)('maps HTTP %s without exposing provider text', async (status, code) => {
    const fetcher = mockFetch(async () => response({ error: 'private provider details' }, status))
    const result = listChatRooms(connection, { fetcher })
    await expect(result).rejects.toEqual(new ChatApiError(code))
  })

  it('does not expose a network rejection cause or secrets', async () => {
    const fetcher = mockFetch(async () => {
      throw new Error('private provider secret')
    })
    await expect(listChatRooms(connection, { fetcher })).rejects.toEqual(new ChatApiError('network'))
  })

  it('rejects non-JSON and malformed JSON responses', async () => {
    await expect(
      listChatRooms(connection, { fetcher: jest.fn(async () => response('html', 200, 'text/html')) })
    ).rejects.toMatchObject({ code: 'invalidResponse' })
    const malformed = response(null)
    malformed.json = jest.fn(async () => {
      throw new SyntaxError('private response')
    })
    await expect(listChatRooms(connection, { fetcher: jest.fn(async () => malformed) })).rejects.toMatchObject({
      code: 'invalidResponse',
    })
  })

  it('does not send an already-aborted request', async () => {
    const controller = new AbortController()
    controller.abort()
    const fetcher = mockFetch()
    await expect(listChatRooms(connection, { fetcher, signal: controller.signal })).rejects.toMatchObject({
      code: 'aborted',
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('cancels even when a fetch substitute ignores AbortSignal', async () => {
    const controller = new AbortController()
    const pending = deferred<Response>()
    const fetcher = mockFetch(() => pending.promise)
    const result = listChatRooms(connection, { fetcher, signal: controller.signal })
    const rejected = expect(result).rejects.toMatchObject({ code: 'aborted' })
    controller.abort()
    await rejected
    pending.resolve(response({ rooms: [room] }))
    await Promise.resolve()
    expect(fetcher.mock.calls[0][1].signal.aborted).toBe(true)
  })

  it('enforces timeout through JSON reading and clears its timer after settlement', async () => {
    jest.useFakeTimers()
    const pending = deferred<unknown>()
    const reply = response(null)
    reply.json = jest.fn(() => pending.promise)
    const fetcher = mockFetch(async () => reply)
    const result = listChatRooms(connection, { fetcher, timeoutMs: 100 })
    const rejected = expect(result).rejects.toMatchObject({ code: 'timeout' })
    await jest.advanceTimersByTimeAsync(101)
    await rejected
    expect(jest.getTimerCount()).toBe(0)
    pending.resolve({ rooms: [room] })
    await Promise.resolve()
  })

  it('rejects unsafe API bases on follow-up operations before attaching credentials', async () => {
    const fetcher = mockFetch()
    await expect(
      listChatRooms({ ...connection, apiBase: 'https://name:secret@chat.example.test/api' }, { fetcher })
    ).rejects.toMatchObject({ code: 'invalidInput' })
    expect(fetcher).not.toHaveBeenCalled()
  })
})
