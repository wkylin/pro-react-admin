import { act, renderHook } from '@testing-library/react'
import type { loadXmppClient } from '@features/secureCommunication/xmppLoader'
import { ChatChannelError, useChatRoomChannel } from './useChatRoomChannel'
import type { ChatConnection, ChatRoom } from './model'

class Element {
  constructor(
    readonly name: string,
    readonly attrs: Record<string, string> = {},
    readonly children: Array<Element | string> = []
  ) {}
  is(name: string, namespace?: string) {
    return this.name === name && (!namespace || this.attrs.xmlns === namespace)
  }
  getChild(name: string, namespace?: string): Element | undefined {
    return this.children.find((item): item is Element => item instanceof Element && item.is(name, namespace))
  }
  getChildren(name: string, namespace?: string) {
    return this.children.filter((item): item is Element => item instanceof Element && item.is(name, namespace))
  }
  getChildText(name: string, namespace?: string) {
    return this.getChild(name, namespace)
      ?.children.filter((item) => typeof item === 'string')
      .join('')
  }
}

const xml = (name: string, attrs: Record<string, string> = {}, ...children: Array<Element | string>) =>
  new Element(name, attrs, children)
const connection: ChatConnection = {
  apiBase: 'https://chat.example.test/api',
  token: 'test-token',
  user: {
    id: 'u-guest',
    username: 'guest',
    displayName: 'Guest',
    role: 'user',
    status: 'active',
    createdAt: '2026-01-01T00:00:00Z',
  },
  session: {
    imSessionId: 'temporary-session',
    xmppUsername: 'temporary-user',
    credential: 'temporary-credential',
    jid: 'u-guest@im.example.test',
    websocketUrl: 'wss://chat.example.test/xmpp-websocket',
    domain: 'im.example.test',
  },
}
const general: ChatRoom = {
  id: 'general',
  name: 'General',
  description: 'General discussion',
  jid: 'room-general@conference.im.example.test',
  status: 'active',
  ownerId: 'owner',
  memberCount: 2,
  messageCount: 0,
  createdAt: '2026-01-01T00:00:00Z',
}
const design: ChatRoom = { ...general, id: 'design', name: 'Design', jid: 'room-design@conference.im.example.test' }
type Listener = (...args: unknown[]) => void

function selfPresence(room = general, code = '110') {
  return xml(
    'presence',
    { from: `${room.jid}/u-u-guest` },
    xml('x', { xmlns: 'http://jabber.org/protocol/muc#user' }, xml('status', { code }))
  )
}
function message(room = general, id = 'server-message', body = 'A server echo') {
  return xml(
    'message',
    { from: `${room.jid}/u-u-guest`, type: 'groupchat', id },
    xml('body', {}, body),
    xml('x', {
      xmlns: 'urn:match-chat:meta',
      userId: 'u-guest',
      displayName: 'Guest',
      createdAt: '2026-11-09T09:00:00.000Z',
    })
  )
}

function createHarness({ autoJoin = true, neverStart = false }: { autoJoin?: boolean; neverStart?: boolean } = {}) {
  const clients: Array<ReturnType<typeof makeClient>> = []
  const options: Record<string, unknown>[] = []
  const makeClient = () => {
    const listeners = new Map<string, Listener[]>()
    const transport = {
      status: 'offline',
      reconnect: { stop: jest.fn() },
      sent: [] as Element[],
      on(event: string, listener: Listener) {
        listeners.set(event, [...(listeners.get(event) ?? []), listener])
        return transport
      },
      emit(event: string, ...args: unknown[]) {
        for (const listener of listeners.get(event) ?? []) listener(...args)
      },
      start: jest.fn(async () => {
        if (neverStart) await new Promise(() => undefined)
        transport.status = 'online'
        transport.emit('online', { toString: () => connection.session.jid })
      }),
      stop: jest.fn(async () => {
        transport.status = 'offline'
      }),
      send: jest.fn(async (stanza: Element) => {
        transport.sent.push(stanza)
        if (autoJoin && stanza.name === 'presence' && stanza.attrs.to) {
          const room = stanza.attrs.to.startsWith(general.jid) ? general : design
          transport.emit('stanza', selfPresence(room))
        }
      }),
    }
    return transport
  }
  const library = {
    client: (value: Record<string, unknown>) => {
      options.push(value)
      const next = makeClient()
      clients.push(next)
      return next
    },
    xml,
    jid: (value: string) => {
      const [local, domain] = value.split('@')
      return { local, domain, toString: () => value }
    },
  }
  const loader = jest.fn(async () => library) as unknown as typeof loadXmppClient
  return { clients, options, loader, library }
}

afterEach(() => {
  jest.useRealTimers()
})

test('authenticates with temporary PLAIN credentials and waits for the actual room self-join acknowledgement', async () => {
  const harness = createHarness({ autoJoin: false })
  const onMessage = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage }, harness.loader))
  await act(async () => result.current.connect(connection))
  expect(result.current.status).toBe('online')
  expect(harness.options[0]).toMatchObject({
    service: connection.session.websocketUrl,
    domain: connection.session.domain,
    resource: connection.session.imSessionId,
  })
  const authenticate = jest.fn(async () => undefined)
  await (harness.options[0].credentials as (fn: typeof authenticate, mechanisms: string[]) => Promise<void>)(
    authenticate,
    ['PLAIN']
  )
  expect(authenticate).toHaveBeenCalledWith({ username: 'temporary-user', password: 'temporary-credential' }, 'PLAIN')
  let joined = false
  let joining!: Promise<void>
  await act(async () => {
    joining = result.current.joinRoom(general).then(() => {
      joined = true
    })
  })
  expect(joined).toBe(false)
  expect(harness.clients[0].sent[0].attrs.to).toBe(`${general.jid}/u-u-guest`)
  await act(async () => harness.clients[0].emit('stanza', selfPresence(general, '100')))
  expect(joined).toBe(false)
  await act(async () => {
    harness.clients[0].emit('stanza', selfPresence())
    await joining
  })
  expect(joined).toBe(true)
})

test('sends trimmed plain text but only server echoes create messages; malformed and duplicate echoes are ignored', async () => {
  const harness = createHarness()
  const onMessage = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage }, harness.loader))
  await act(async () => {
    await result.current.connect(connection)
    await result.current.joinRoom(general)
    await result.current.sendRoom(general, '  Hello world  ')
  })
  const outgoing = harness.clients[0].sent.find((item) => item.name === 'message')
  expect(outgoing?.attrs).toEqual({ to: general.jid, type: 'groupchat' })
  expect(outgoing?.getChildText('body')).toBe('Hello world')
  expect(onMessage).not.toHaveBeenCalled()
  await act(async () => {
    harness.clients[0].emit('stanza', message())
    harness.clients[0].emit('stanza', message())
    harness.clients[0].emit('stanza', message(design, 'other-room'))
    harness.clients[0].emit(
      'stanza',
      xml('message', { from: general.jid, type: 'groupchat', id: 'no-meta' }, xml('body', {}, 'unsafe identity'))
    )
    harness.clients[0].emit(
      'stanza',
      xml('message', { from: general.jid, type: 'chat', id: 'not-group' }, xml('body', {}, 'direct message'))
    )
  })
  expect(onMessage).toHaveBeenCalledTimes(1)
  expect(onMessage).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 'server-message',
      roomId: 'general',
      userId: 'u-guest',
      body: 'A server echo',
      kind: 'text',
      status: 'visible',
    })
  )
})

test('keeps subscribed rooms isolated during quick switches and uses the latest callback', async () => {
  const harness = createHarness({ autoJoin: false })
  const first = jest.fn()
  const second = jest.fn()
  const { result, rerender } = renderHook(({ onMessage }) => useChatRoomChannel({ onMessage }, harness.loader), {
    initialProps: { onMessage: first },
  })
  await act(async () => result.current.connect(connection))
  let joins!: Promise<void[]>
  await act(async () => {
    joins = Promise.all([result.current.joinRoom(general), result.current.joinRoom(design)])
  })
  await act(async () => {
    harness.clients[0].emit('stanza', selfPresence(design))
    harness.clients[0].emit('stanza', selfPresence(general))
    await joins
  })
  rerender({ onMessage: second })
  await act(async () => {
    harness.clients[0].emit('stanza', message(general, 'one'))
    harness.clients[0].emit('stanza', message(design, 'two'))
  })
  expect(first).not.toHaveBeenCalled()
  expect(second.mock.calls.map(([item]) => item.roomId)).toEqual(['general', 'design'])
})

test('rejects offline, unjoined, inactive, empty and oversized sends without pretending delivery', async () => {
  const harness = createHarness()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, harness.loader))
  await expect(result.current.sendRoom(general, 'hello')).rejects.toMatchObject({ code: 'notConnected' })
  await act(async () => result.current.connect(connection))
  await expect(result.current.sendRoom(general, 'hello')).rejects.toMatchObject({ code: 'notJoined' })
  await expect(result.current.joinRoom({ ...general, status: 'closed' })).rejects.toMatchObject({ code: 'invalidRoom' })
  await expect(result.current.joinRoom({ ...general, jid: `${general.jid}/resource` })).rejects.toMatchObject({
    code: 'invalidRoom',
  })
  await act(async () => result.current.joinRoom(general))
  for (const body of [' ', 'x'.repeat(4001)])
    await expect(result.current.sendRoom(general, body)).rejects.toMatchObject({ code: 'invalidMessage' })
  await act(async () => result.current.sendRoom(general, 'x'.repeat(4000)))
  expect(harness.clients[0].sent.filter((item) => item.name === 'message')).toHaveLength(1)
})

test('rejoins subscribed rooms after reconnect, waits for acknowledgements, then refreshes history', async () => {
  const harness = createHarness()
  const onReconnect = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn(), onReconnect }, harness.loader))
  await act(async () => {
    await result.current.connect(connection)
    await result.current.joinRoom(general)
    await result.current.joinRoom(design)
  })
  expect(onReconnect).not.toHaveBeenCalled()
  await act(async () => {
    harness.clients[0].status = 'offline'
    harness.clients[0].emit('offline')
  })
  expect(result.current.status).toBe('connecting')
  await expect(result.current.sendRoom(general, 'offline')).rejects.toMatchObject({ code: 'notConnected' })
  await act(async () => {
    harness.clients[0].status = 'online'
    harness.clients[0].emit('online')
    await Promise.resolve()
  })
  expect(onReconnect).toHaveBeenCalledTimes(1)
  expect(harness.clients[0].sent.filter((item) => item.name === 'presence')).toHaveLength(4)
  await act(async () => result.current.sendRoom(general, 'back online'))
})

test('a clean socket disconnect clears readiness and duplicate offline events do not extend the reconnect deadline', async () => {
  jest.useFakeTimers()
  const harness = createHarness()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, harness.loader))
  await act(async () => {
    await result.current.connect(connection)
    await result.current.joinRoom(general)
  })
  await act(async () => {
    harness.clients[0].status = 'disconnect'
    harness.clients[0].emit('disconnect', { clean: true, reason: '' })
  })
  expect(result.current.status).toBe('connecting')
  await expect(result.current.sendRoom(general, 'while closed')).rejects.toMatchObject({ code: 'notConnected' })
  await act(async () => jest.advanceTimersByTimeAsync(5000))
  await act(async () => {
    harness.clients[0].emit('offline')
    harness.clients[0].emit('disconnect', { clean: true })
  })
  await act(async () => jest.advanceTimersByTimeAsync(7000))
  expect(result.current.status).toBe('error')
  expect(result.current.error).toBe('reconnectTimeout')
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalledTimes(1)
})

test('a disconnect rejects an old pending join and reconnect sends a fresh presence before reporting success', async () => {
  const harness = createHarness({ autoJoin: false })
  const onReconnect = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn(), onReconnect }, harness.loader))
  await act(async () => result.current.connect(connection))
  let previousJoin!: Promise<unknown>
  await act(async () => {
    previousJoin = result.current.joinRoom(general).catch((cause: unknown) => cause)
  })
  expect(harness.clients[0].sent).toHaveLength(1)
  await act(async () => {
    harness.clients[0].status = 'disconnect'
    harness.clients[0].emit('disconnect', { clean: true })
    harness.clients[0].emit('offline')
    harness.clients[0].status = 'online'
    harness.clients[0].emit('online')
  })
  await expect(previousJoin).resolves.toMatchObject({ code: 'notConnected' })
  expect(harness.clients[0].sent).toHaveLength(2)
  expect(result.current.status).toBe('connecting')
  expect(onReconnect).not.toHaveBeenCalled()
  await expect(result.current.sendRoom(general, 'not ready')).rejects.toMatchObject({ code: 'notConnected' })
  await act(async () => {
    harness.clients[0].emit('stanza', selfPresence())
    await Promise.resolve()
  })
  expect(result.current.status).toBe('online')
  expect(onReconnect).toHaveBeenCalledTimes(1)
})

test('reconnecting remains non-sendable until every subscribed room acknowledges its new join', async () => {
  const harness = createHarness({ autoJoin: false })
  const onReconnect = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn(), onReconnect }, harness.loader))
  await act(async () => result.current.connect(connection))
  let joining!: Promise<void[]>
  await act(async () => {
    joining = Promise.all([result.current.joinRoom(general), result.current.joinRoom(design)])
  })
  await act(async () => {
    harness.clients[0].emit('stanza', selfPresence(general))
    harness.clients[0].emit('stanza', selfPresence(design))
    await joining
  })
  await act(async () => {
    harness.clients[0].status = 'disconnect'
    harness.clients[0].emit('disconnect')
    harness.clients[0].status = 'online'
    harness.clients[0].emit('online')
  })
  await act(async () => harness.clients[0].emit('stanza', selfPresence(general)))
  expect(result.current.status).toBe('connecting')
  expect(onReconnect).not.toHaveBeenCalled()
  await expect(result.current.sendRoom(general, 'one room remains pending')).rejects.toMatchObject({
    code: 'notConnected',
  })
  await act(async () => {
    harness.clients[0].emit('stanza', selfPresence(design))
    await Promise.resolve()
  })
  expect(result.current.status).toBe('online')
  expect(onReconnect).toHaveBeenCalledTimes(1)
})

test('a rejected room rejoin fails the reconnect conservatively without declaring success or keeping another room sendable', async () => {
  const harness = createHarness()
  const onReconnect = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn(), onReconnect }, harness.loader))
  await act(async () => {
    await result.current.connect(connection)
    await result.current.joinRoom(general)
    await result.current.joinRoom(design)
  })
  harness.clients[0].send.mockImplementation(async (stanza: Element) => {
    harness.clients[0].sent.push(stanza)
  })
  await act(async () => {
    harness.clients[0].status = 'disconnect'
    harness.clients[0].emit('disconnect')
    harness.clients[0].status = 'online'
    harness.clients[0].emit('online')
  })
  await act(async () => {
    harness.clients[0].emit('stanza', selfPresence(general))
    harness.clients[0].emit('stanza', xml('presence', { from: design.jid, type: 'error' }))
    await Promise.resolve()
  })
  expect(result.current.status).toBe('error')
  expect(result.current.error).toBe('joinRejected')
  expect(onReconnect).not.toHaveBeenCalled()
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalled()
  await expect(result.current.sendRoom(general, 'must reconnect first')).rejects.toMatchObject({ code: 'notConnected' })
})

test('an unacknowledged room rejoin times out into a fixed error instead of calling onReconnect', async () => {
  jest.useFakeTimers()
  const harness = createHarness()
  const onReconnect = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn(), onReconnect }, harness.loader))
  await act(async () => {
    await result.current.connect(connection)
    await result.current.joinRoom(general)
  })
  harness.clients[0].send.mockImplementation(async (stanza: Element) => {
    harness.clients[0].sent.push(stanza)
  })
  await act(async () => {
    harness.clients[0].status = 'disconnect'
    harness.clients[0].emit('disconnect')
    harness.clients[0].status = 'online'
    harness.clients[0].emit('online')
  })
  expect(result.current.status).toBe('connecting')
  await act(async () => jest.advanceTimersByTimeAsync(12_000))
  expect(result.current.status).toBe('error')
  expect(result.current.error).toBe('joinTimeout')
  expect(onReconnect).not.toHaveBeenCalled()
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalled()
})

test('disconnect cancels room joins and stale transport events cannot cross into a replacement session', async () => {
  const harness = createHarness({ autoJoin: false })
  const onMessage = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage }, harness.loader))
  await act(async () => result.current.connect(connection))
  const joining = result.current.joinRoom(general).catch((cause: unknown) => cause)
  await act(async () => result.current.disconnect())
  await expect(joining).resolves.toMatchObject({ code: 'cancelled' })
  await act(async () => result.current.connect(connection))
  await act(async () => {
    harness.clients[0].emit('online')
    harness.clients[0].emit('stanza', selfPresence())
    harness.clients[0].emit('stanza', message())
    harness.clients[0].emit('error', new Error('old'))
  })
  expect(onMessage).not.toHaveBeenCalled()
  expect(result.current.status).toBe('online')
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalled()
  expect(harness.clients[0].stop).toHaveBeenCalled()
})

test('connection and join timeouts stop or reject without leaving unresolved operations', async () => {
  jest.useFakeTimers()
  const harness = createHarness({ neverStart: true })
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, harness.loader))
  let connecting!: Promise<unknown>
  await act(async () => {
    connecting = result.current.connect(connection).catch((cause: unknown) => cause)
  })
  await act(async () => jest.advanceTimersByTimeAsync(12_000))
  await expect(connecting).resolves.toMatchObject({ code: 'connectionTimeout' })
  expect(result.current.status).toBe('error')
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalled()
  const second = createHarness({ autoJoin: false })
  const next = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, second.loader))
  await act(async () => next.result.current.connect(connection))
  const joining = next.result.current.joinRoom(general).catch((cause: unknown) => cause)
  await act(async () => jest.advanceTimersByTimeAsync(12_000))
  await expect(joining).resolves.toMatchObject({ code: 'joinTimeout' })
  expect(next.result.current.status).toBe('online')
  await expect(next.result.current.sendRoom(general, 'unconfirmed')).rejects.toMatchObject({ code: 'notJoined' })
})

test('lazy library loading can be cancelled and does not open a late socket', async () => {
  const harness = createHarness()
  let finish!: (value: unknown) => void
  const delayed = jest.fn(
    () =>
      new Promise((resolve) => {
        finish = resolve
      })
  ) as unknown as typeof loadXmppClient
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, delayed))
  let connecting!: Promise<unknown>
  await act(async () => {
    connecting = result.current.connect(connection).catch((cause: unknown) => cause)
  })
  await act(async () => result.current.disconnect())
  await expect(connecting).resolves.toMatchObject({ code: 'cancelled' })
  await act(async () => finish(harness.library))
  expect(harness.clients).toHaveLength(0)
  expect(result.current.status).toBe('disconnected')
})

test('a newer connection attempt wins even while an earlier transport is still stopping', async () => {
  const harness = createHarness()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, harness.loader))
  await act(async () => result.current.connect(connection))
  let finishStop!: () => void
  harness.clients[0].stop.mockImplementationOnce(
    () =>
      new Promise<void>((resolve) => {
        finishStop = resolve
      })
  )
  let earlier!: Promise<unknown>
  await act(async () => {
    earlier = result.current.connect(connection).catch((cause: unknown) => cause)
  })
  await act(async () => result.current.connect(connection))
  await act(async () => finishStop())
  await expect(earlier).resolves.toMatchObject({ code: 'cancelled' })
  expect(harness.clients).toHaveLength(2)
  expect(result.current.status).toBe('online')
})

test('a hanging lazy import shares the connection deadline and ignores a late module', async () => {
  jest.useFakeTimers()
  const harness = createHarness()
  let finish!: (library: typeof harness.library) => void
  const loader = (() =>
    new Promise<typeof harness.library>((resolve) => {
      finish = resolve
    })) as unknown as typeof loadXmppClient
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, loader))
  let connecting!: Promise<unknown>
  await act(async () => {
    connecting = result.current.connect(connection).catch((cause: unknown) => cause)
  })
  await act(async () => jest.advanceTimersByTimeAsync(12_000))
  await expect(connecting).resolves.toMatchObject({ code: 'connectionTimeout' })
  await act(async () => finish(harness.library))
  expect(harness.clients).toHaveLength(0)
  expect(result.current.error).toBe('connectionTimeout')
})

test('an authentication rejection from start remains an authentication error and disables reconnect', async () => {
  const harness = createHarness()
  const loader = (async () => ({
    ...harness.library,
    client: (options: Record<string, unknown>) => {
      const client = harness.library.client(options)
      client.start.mockRejectedValueOnce(new ChatChannelError('authentication'))
      return client
    },
  })) as unknown as typeof loadXmppClient
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, loader))
  await act(async () => {
    await expect(result.current.connect(connection)).rejects.toMatchObject({ code: 'authentication' })
  })
  expect(result.current.error).toBe('authentication')
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalled()
})

test('authentication failure and exhausted reconnect window stop automatic retries', async () => {
  jest.useFakeTimers()
  const harness = createHarness()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, harness.loader))
  await act(async () => result.current.connect(connection))
  await act(async () => harness.clients[0].emit('error', { name: 'SASLError', condition: 'not-authorized' }))
  expect(result.current.error).toBe('authentication')
  expect(result.current.status).toBe('error')
  expect(harness.clients[0].reconnect.stop).toHaveBeenCalled()
  await act(async () => result.current.connect(connection))
  await act(async () => {
    harness.clients[1].status = 'offline'
    harness.clients[1].emit('offline')
  })
  await act(async () => jest.advanceTimersByTimeAsync(12_000))
  expect(result.current.error).toBe('reconnectTimeout')
  expect(harness.clients[1].reconnect.stop).toHaveBeenCalled()
})

test('temporary session expiry and unmount cancel transports and pending room joins', async () => {
  jest.useFakeTimers()
  const harness = createHarness({ autoJoin: false })
  const { result, unmount } = renderHook(() => useChatRoomChannel({ onMessage: jest.fn() }, harness.loader))
  await act(async () =>
    result.current.connect({ ...connection, session: { ...connection.session, expiresInSeconds: 1 } })
  )
  const joining = result.current.joinRoom(general).catch((cause: unknown) => cause)
  await act(async () => jest.advanceTimersByTimeAsync(1000))
  await expect(joining).resolves.toMatchObject({ code: 'sessionExpired' })
  expect(result.current.error).toBe('sessionExpired')
  await act(async () => result.current.connect(connection))
  const anotherJoin = result.current.joinRoom(general).catch((cause: unknown) => cause)
  unmount()
  await expect(anotherJoin).resolves.toMatchObject({ code: 'cancelled' })
  expect(harness.clients[1].stop).toHaveBeenCalled()
})

test('rejects join errors without accepting messages from an unconfirmed room', async () => {
  const harness = createHarness({ autoJoin: false })
  const onMessage = jest.fn()
  const { result } = renderHook(() => useChatRoomChannel({ onMessage }, harness.loader))
  await act(async () => result.current.connect(connection))
  const joining = result.current.joinRoom(general).catch((cause: unknown) => cause)
  await act(async () => {
    harness.clients[0].emit('stanza', xml('presence', { type: 'error' }))
    harness.clients[0].emit('stanza', message())
  })
  await expect(joining).resolves.toMatchObject({ code: 'joinRejected' })
  expect(onMessage).not.toHaveBeenCalled()
})
