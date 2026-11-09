import { expect, type Page, type Route, type WebSocketRoute } from '@playwright/test'

export const chatApi = 'https://chat.example.test/api'
const domain = 'chat.test'
const user = {
  id: 'guest-user',
  username: 'guest',
  displayName: 'Guest member',
  role: 'user',
  status: 'active',
  createdAt: '2026-11-01T09:00:00.000Z',
}

export interface FixtureMessage {
  id: string
  roomId: string
  userId: string
  displayName: string
  body: string
  status: 'visible' | 'removed'
  createdAt: string
}

export function chatMessage(id: string, roomId: string, body: string, index = 0): FixtureMessage {
  return {
    id,
    roomId,
    userId: 'member-ada',
    displayName: 'Ada Lin',
    body,
    status: 'visible',
    createdAt: new Date(Date.UTC(2026, 10, 8, 9, index)).toISOString(),
  }
}

const room = (id: string, name: string, status: string = 'active') => ({
  id,
  name,
  description: `${name} team conversation`,
  jid: `${id}@conference.${domain}`,
  status,
  ownerId: 'member-ada',
  memberCount: 3,
  messageCount: 2,
  createdAt: '2026-11-01T09:00:00.000Z',
})

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function decodeXml(value: string): string {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&amp;', '&')
}

function attribute(xml: string, name: string): string {
  return decodeXml(xml.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, 's'))?.[2] ?? '')
}

function childText(xml: string, name: string): string {
  return decodeXml(xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))?.[1] ?? '')
}

function deferred() {
  let resolve: () => void = () => undefined
  const promise = new Promise<void>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

export async function installChatPlatform(page: Page) {
  await page.addInitScript(() => {
    const control = { failNextMessage: false }
    Object.defineProperty(window, '__chatPlatformSendControl', { value: control })
    const originalSend = WebSocket.prototype.send
    WebSocket.prototype.send = function (data) {
      if (control.failNextMessage && typeof data === 'string' && data.startsWith('<message')) {
        control.failNextMessage = false
        throw new DOMException('Controlled message transport failure', 'NetworkError')
      }
      return originalSend.call(this, data)
    }
  })
  const rooms = [room('general', 'General'), room('design', 'Design'), room('archive', 'Archive', 'closed')]
  const histories = new Map<string, FixtureMessage[]>([
    [
      'general',
      [
        chatMessage('general-first', 'general', 'Welcome to General.'),
        chatMessage('general-second', 'general', 'The team review starts at ten.', 1),
      ],
    ],
    ['design', [chatMessage('design-first', 'design', 'The updated design notes are ready.')]],
  ])
  const requests: { method: string; path: string; query: string }[] = []
  const settledHistories: string[] = []
  const sent: { roomId: string; body: string }[] = []
  const frames: string[] = []
  const joins: string[] = []
  const sockets: WebSocketRoute[] = []
  const unexpected: string[] = []
  let sessionGate: ReturnType<typeof deferred> | undefined
  const historyGates = new Map<string, ReturnType<typeof deferred>>()
  const retainedGates: ReturnType<typeof deferred>[] = []

  const fulfill = async (route: Route, json: unknown, status = 200) => {
    try {
      await route.fulfill({ status, headers: cors, ...(status === 204 ? { body: '' } : { json }) })
    } catch {
      // The browser may have deliberately aborted this controlled request.
    }
  }
  await page.route('https://match-chat-server-seven.vercel.app/api/**', (route) => {
    unexpected.push(route.request().url())
    return route.abort('blockedbyclient')
  })
  await page.route('https://chat.example.test/api/**', async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    if (request.method() === 'OPTIONS') return fulfill(route, undefined, 204)
    requests.push({ method: request.method(), path: url.pathname, query: url.search })
    if (url.pathname === '/api/auth/login' && request.method() === 'POST') {
      expect(request.postDataJSON()).toMatchObject({ username: 'guest', password: 'guest123!' })
      return fulfill(route, { token: 'chat-access-token', user })
    }
    expect(request.headers().authorization).toBe('Bearer chat-access-token')
    if (url.pathname === '/api/im/session' && request.method() === 'POST') {
      const gate = sessionGate
      sessionGate = undefined
      if (gate) await gate.promise
      return fulfill(
        route,
        {
          imSessionId: 'im-test-session',
          xmppUsername: 'im-test-session',
          credential: 'controlled-xmpp-credential',
          jid: `${user.id}@${domain}`,
          websocketUrl: 'wss://chat.example.test/xmpp-websocket',
          domain,
          expiresInSeconds: 3600,
        },
        201
      )
    }
    if (url.pathname === '/api/im/session' && request.method() === 'DELETE') {
      expect(request.headers()['x-im-session-id']).toBe('im-test-session')
      return fulfill(route, undefined, 204)
    }
    if (url.pathname === '/api/rooms' && request.method() === 'GET') return fulfill(route, { rooms })
    const match = /^\/api\/rooms\/([^/]+)\/(join|messages)$/.exec(url.pathname)
    const currentRoom = rooms.find((item) => item.id === match?.[1])
    if (match && currentRoom && match[2] === 'join' && request.method() === 'POST')
      return fulfill(route, { room: currentRoom })
    if (match && currentRoom && match[2] === 'messages' && request.method() === 'GET') {
      const gate = historyGates.get(currentRoom.id)
      historyGates.delete(currentRoom.id)
      if (gate) await gate.promise
      const limit = Number(url.searchParams.get('limit') ?? 80)
      await fulfill(route, { messages: (histories.get(currentRoom.id) ?? []).slice(-limit) })
      settledHistories.push(currentRoom.id)
      return
    }
    unexpected.push(request.url())
    return route.abort('blockedbyclient')
  })

  const stanza = (message: FixtureMessage) =>
    `<message xmlns="jabber:client" from="${message.roomId}@conference.${domain}/u-${message.userId.slice(0, 10)}" type="groupchat" id="${escapeXml(message.id)}"><body>${escapeXml(message.body)}</body><x xmlns="urn:match-chat:meta" userId="${escapeXml(message.userId)}" displayName="${escapeXml(message.displayName)}" createdAt="${escapeXml(message.createdAt)}"/></message>`
  await page.routeWebSocket('wss://chat.example.test/xmpp-websocket', (socket) => {
    sockets.push(socket)
    let authenticated = false
    let bound = false
    socket.onMessage((data) => {
      const xml = String(data)
      frames.push(xml)
      if (xml.startsWith('<open')) {
        socket.send(
          `<open xmlns="urn:ietf:params:xml:ns:xmpp-framing" from="${domain}" id="fixture-stream" version="1.0"/>`
        )
        socket.send(
          authenticated
            ? '<stream:features xmlns:stream="http://etherx.jabber.org/streams"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"/></stream:features>'
            : '<stream:features xmlns:stream="http://etherx.jabber.org/streams"><mechanisms xmlns="urn:ietf:params:xml:ns:xmpp-sasl"><mechanism>PLAIN</mechanism></mechanisms></stream:features>'
        )
      } else if (xml.startsWith('<auth')) {
        expect(attribute(xml, 'mechanism')).toBe('PLAIN')
        const credentials = Buffer.from(childText(xml, 'auth'), 'base64').toString('utf8').split('\0')
        expect(credentials.slice(-2)).toEqual(['im-test-session', 'controlled-xmpp-credential'])
        authenticated = true
        socket.send('<success xmlns="urn:ietf:params:xml:ns:xmpp-sasl"/>')
      } else if (xml.startsWith('<iq')) {
        const id = attribute(xml, 'id')
        if (xml.includes('urn:ietf:params:xml:ns:xmpp-bind')) {
          bound = true
          socket.send(
            `<iq xmlns="jabber:client" type="result" id="${escapeXml(id)}"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><jid>${user.id}@${domain}/im-test-session</jid></bind></iq>`
          )
        } else socket.send(`<iq xmlns="jabber:client" type="result" id="${escapeXml(id)}"/>`)
      } else if (xml.startsWith('<presence') && attribute(xml, 'to') && attribute(xml, 'type') !== 'unavailable') {
        expect(bound).toBe(true)
        const to = attribute(xml, 'to')
        joins.push(to)
        socket.send(
          `<presence xmlns="jabber:client" from="${escapeXml(to)}" to="${user.id}@${domain}/im-test-session"><x xmlns="http://jabber.org/protocol/muc#user"><item affiliation="member" role="participant" jid="${user.id}@${domain}/im-test-session"/><status code="110"/></x></presence>`
        )
      } else if (xml.startsWith('<message')) {
        expect(attribute(xml, 'type')).toBe('groupchat')
        const roomId = attribute(xml, 'to').split('@')[0]
        const body = childText(xml, 'body')
        sent.push({ roomId, body })
        const message = {
          ...chatMessage(`persisted-${sent.length}`, roomId, body),
          userId: user.id,
          displayName: user.displayName,
          createdAt: new Date(Date.UTC(2026, 10, 9, 9, sent.length)).toISOString(),
        }
        histories.set(roomId, [...(histories.get(roomId) ?? []), message])
        // A duplicate echo and later REST refresh must still render one persisted message.
        socket.send(stanza(message))
        socket.send(stanza(message))
      } else if (xml.startsWith('<close')) {
        socket.send('<close xmlns="urn:ietf:params:xml:ns:xmpp-framing"/>')
        socket.close()
      }
    })
  })
  return {
    rooms,
    histories,
    requests,
    settledHistories,
    sent,
    frames,
    joins,
    sockets,
    unexpected,
    async failNextMessageSend() {
      await page.evaluate(() => {
        const control = (window as Window & { __chatPlatformSendControl?: { failNextMessage: boolean } })
          .__chatPlatformSendControl
        if (!control) throw new Error('The controlled WebSocket transport is not installed')
        control.failNextMessage = true
      })
    },
    async closeSocket() {
      const socket = sockets.at(-1)
      if (!socket) throw new Error('No chat WebSocket is connected')
      await socket.close({ code: 1000, reason: 'Chat service restarting' })
    },
    holdSession() {
      const gate = deferred()
      sessionGate = gate
      retainedGates.push(gate)
      return gate.resolve
    },
    holdHistory(roomId: string) {
      const gate = deferred()
      historyGates.set(roomId, gate)
      retainedGates.push(gate)
      return gate.resolve
    },
    emit(message: FixtureMessage) {
      for (const socket of sockets) socket.send(stanza(message))
    },
    release() {
      for (const gate of retainedGates) gate.resolve()
    },
  }
}
