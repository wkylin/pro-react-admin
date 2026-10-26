import { webcrypto } from 'node:crypto'
import { act, renderHook, waitFor } from '@testing-library/react'
import { encryptMessage, generateSessionKey } from './crypto'
import { useXmppChannel } from './useXmppChannel'
import type { loadXmppClient } from './xmppLoader'

type MockStanza = { name: string; attrs: Record<string, string>; children: Array<MockStanza | string> }

const listeners = new Map<string, Array<(...args: unknown[]) => void>>()
const sent: MockStanza[] = []
const clientOptions: Array<Record<string, unknown>> = []
const stop = jest.fn(async () => undefined)
const stopReconnect = jest.fn()
const mockClient = {
  status: 'offline',
  reconnect: { stop: stopReconnect },
  on(event: string, listener: (...args: unknown[]) => void) {
    listeners.set(event, [...(listeners.get(event) ?? []), listener])
    return this
  },
  async start() {
    this.status = 'online'
    for (const listener of listeners.get('online') ?? [])
      listener({ toString: () => 'sender@example.com/pro-react-admin' })
  },
  async stop() {
    this.status = 'offline'
    await stop()
  },
  async send(stanza: MockStanza) {
    sent.push(stanza)
  },
}

const mockLoadClient = async () =>
  ({
    client: (options: Record<string, unknown>) => {
      clientOptions.push(options)
      return mockClient
    },
    jid: (value: string) => {
      const [local, domain] = value.split('@')
      return { local, domain, toString: () => value }
    },
    xml: (name: string, attrs: Record<string, string> = {}, ...children: Array<MockStanza | string>): MockStanza => ({
      name,
      attrs,
      children,
    }),
  }) as unknown as Awaited<ReturnType<typeof loadXmppClient>>

const originalCrypto = globalThis.crypto
beforeAll(() => Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto }))
afterAll(() => Object.defineProperty(globalThis, 'crypto', { configurable: true, value: originalCrypto }))

beforeEach(() => {
  listeners.clear()
  sent.length = 0
  clientOptions.length = 0
  stop.mockClear()
  stopReconnect.mockClear()
  mockClient.status = 'offline'
})

test('uses temporary SASL credentials and exchanges encrypted groupchat messages in a joined room', async () => {
  const sessionKey = generateSessionKey()
  const { result } = renderHook(() => useXmppChannel(sessionKey, mockLoadClient))
  await act(async () => {
    await result.current.connect({
      service: 'ws://localhost:8787/xmpp-websocket',
      jid: 'usr123@im.localhost',
      authUsername: 'temporary-session',
      password: 'temporary-credential',
      resource: 'temporary-session',
    })
  })
  expect(clientOptions[0]).toMatchObject({ domain: 'im.localhost', resource: 'temporary-session' })
  expect(stopReconnect).not.toHaveBeenCalled()
  const authenticate = jest.fn(async () => undefined)
  await (clientOptions[0]?.credentials as (auth: typeof authenticate, mechanisms: string[]) => Promise<void>)(
    authenticate,
    ['PLAIN']
  )
  expect(authenticate).toHaveBeenCalledWith(
    { username: 'temporary-session', password: 'temporary-credential' },
    'PLAIN'
  )

  await act(async () => result.current.joinRoom('room-one@conference.im.localhost'))
  const join = sent.find((stanza) => stanza.name === 'presence' && stanza.attrs.to)
  expect(join?.attrs.to).toBe('room-one@conference.im.localhost/pro-react-admin')
  expect((join?.children[0] as MockStanza).attrs.xmlns).toBe('http://jabber.org/protocol/muc')

  await act(async () => result.current.sendRoom('encrypted room message'))
  const outgoing = sent.find((stanza) => stanza.name === 'message')
  expect(outgoing?.attrs).toMatchObject({ to: 'room-one@conference.im.localhost', type: 'groupchat' })
  const body = (outgoing?.children[0] as MockStanza).children[0] as string
  expect(body).not.toContain('encrypted room message')
  expect(result.current.messages).toHaveLength(0)

  await act(async () => {
    for (const listener of listeners.get('stanza') ?? [])
      listener({
        attrs: { from: 'room-one@conference.im.localhost/other', type: 'groupchat' },
        is: (name: string) => name === 'message',
        getChildText: () => 'ordinary room message',
      })
  })
  expect(result.current.messages).toHaveLength(0)
  expect(result.current.error).toBe('')

  await act(async () => {
    for (const listener of listeners.get('stanza') ?? [])
      listener({
        attrs: { from: 'room-one@conference.im.localhost/member', type: 'groupchat' },
        is: (name: string) => name === 'message',
        getChildText: () => body,
      })
  })
  await waitFor(() => expect(result.current.messages.at(-1)?.text).toBe('encrypted room message'))

  await act(async () => {
    for (const listener of listeners.get('offline') ?? []) listener()
    for (const listener of listeners.get('online') ?? [])
      listener({ toString: () => 'usr123@im.localhost/temporary-session' })
  })
  expect(sent.filter((stanza) => stanza.name === 'presence' && stanza.attrs.to).length).toBe(2)
})

test('sends encrypted XMPP chat stanzas, decrypts inbound stanzas and stops on unmount', async () => {
  const sessionKey = generateSessionKey()
  const { result, unmount } = renderHook(() => useXmppChannel(sessionKey, mockLoadClient))
  await act(async () => {
    await result.current.connect({
      service: 'ws://localhost:5280/xmpp-websocket',
      jid: 'sender@example.com',
      password: 'test-only',
    })
  })
  expect(result.current.status).toBe('online')
  expect(sent[0]?.name).toBe('presence')

  await act(async () => {
    await result.current.send('receiver@example.com', 'hello through XMPP')
  })
  const outgoing = sent.find((stanza) => stanza.name === 'message')
  expect(outgoing?.attrs.to).toBe('receiver@example.com')
  expect(outgoing?.attrs.type).toBe('chat')
  const body = (outgoing?.children[0] as MockStanza).children[0] as string
  expect(body).not.toContain('hello through XMPP')
  expect(result.current.messages.at(-1)?.text).toBe('hello through XMPP')

  const inbound = await encryptMessage('reply from XMPP', sessionKey)
  await act(async () => {
    for (const listener of listeners.get('stanza') ?? [])
      listener({
        attrs: { from: 'receiver@example.com' },
        is: (name: string) => name === 'message',
        getChildText: () => JSON.stringify(inbound),
      })
  })
  await waitFor(() => expect(result.current.messages.at(-1)?.text).toBe('reply from XMPP'))
  unmount()
  expect(stopReconnect).toHaveBeenCalled()
  expect(stop).toHaveBeenCalled()
})
