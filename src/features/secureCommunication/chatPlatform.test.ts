import { CHAT_PLATFORM_API, openChatPlatformConnection, validateApiBase } from './chatPlatform'

const originalFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = originalFetch
})

test('logs in, lists active rooms and obtains temporary XMPP credentials without a manually supplied JID', async () => {
  const requests: Array<{ url: string; init: RequestInit }> = []
  const payloads = [
    { token: 'api-token' },
    {
      rooms: [
        { id: 'one', name: 'General', jid: 'room-one@conference.im.example', status: 'active' },
        { id: 'two', name: 'Closed', jid: 'room-two@conference.im.example', status: 'closed' },
      ],
    },
    {
      imSessionId: 'session-id',
      xmppUsername: 'session-id',
      credential: 'temporary-secret',
      jid: 'user@im.example',
      websocketUrl: 'wss://im.example/api/xmpp-websocket',
      domain: 'im.example',
    },
  ]
  globalThis.fetch = jest.fn(async (url: string, init: RequestInit) => {
    requests.push({ url, init })
    return { ok: true, json: async () => payloads.shift() } as Response
  }) as typeof fetch

  const result = await openChatPlatformConnection(CHAT_PLATFORM_API, 'guest', 'guest123!')
  expect(requests.map((request) => request.url)).toEqual([
    `${CHAT_PLATFORM_API}/auth/login`,
    `${CHAT_PLATFORM_API}/rooms`,
    `${CHAT_PLATFORM_API}/im/session`,
  ])
  expect(requests[1]?.init.headers).toMatchObject({ authorization: 'Bearer api-token' })
  expect(result.rooms.map((room) => room.id)).toEqual(['one'])
  expect(result.session.xmppUsername).toBe('session-id')
})

test('rejects insecure or credential-bearing API URLs', () => {
  expect(() => validateApiBase('http://example.com/api')).toThrow()
  expect(() => validateApiBase('https://user:password@example.com/api')).toThrow()
  expect(() => validateApiBase('https://example.com/api?token=secret')).toThrow()
})
