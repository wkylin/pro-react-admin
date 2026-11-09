import {
  mergeChatMessages,
  normalizeChatMessage,
  normalizeChatRoom,
  normalizeChatSession,
  normalizeChatUser,
  type ChatMessage,
} from './model'

const createdAt = '2026-11-09T08:00:00.000Z'
const rawMessage = {
  id: 'msg_one',
  roomId: 'room_one',
  userId: 'usr_one',
  displayName: 'Ada',
  body: 'Hello world',
  status: 'visible',
  createdAt,
}
const envelope = JSON.stringify({
  version: 1,
  algorithm: 'AES-GCM-256',
  iv: btoa('0'.repeat(12)).replace(/=/g, ''),
  ciphertext: btoa('1'.repeat(16)).replace(/=/g, ''),
})
const rawUser = { id: 'usr_one', username: 'ada', displayName: 'Ada', role: 'user', status: 'active', createdAt }
const rawRoom = {
  id: 'room_one',
  name: 'General',
  description: 'Team discussion',
  jid: 'room-room_one@conference.example.test',
  status: 'active',
  ownerId: 'usr_one',
  memberCount: 3,
  messageCount: 9,
  createdAt,
}
const rawSession = {
  imSessionId: 'session_one',
  xmppUsername: 'session_one',
  credential: 'test-session-credential',
  jid: 'usr_one@im.example.test',
  websocketUrl: 'wss://im.example.test/api/xmpp-websocket',
  domain: 'im.example.test',
  expiresInSeconds: 3600,
}

describe('chat messages', () => {
  it('keeps the actual platform fields and ignores upstream extras without mutating the response', () => {
    const raw = { ...rawMessage, body: '  Preserve formatting\n  ', privateField: 'omit-me' }
    expect(normalizeChatMessage(raw)).toEqual({ ...rawMessage, body: raw.body, kind: 'text' })
    expect(raw.privateField).toBe('omit-me')
  })

  it('redacts removed bodies before any view or merge can consume them', () => {
    for (const body of ['private removed message', undefined, { private: 'text' }]) {
      const result = normalizeChatMessage({ ...rawMessage, body, status: 'removed' })
      expect(result).toEqual({ ...rawMessage, body: '', status: 'removed', kind: 'removed' })
      expect(JSON.stringify(result)).not.toContain('private')
    }
  })

  it('recognizes only strict lab envelopes and never exposes their encrypted payload', () => {
    const result = normalizeChatMessage({ ...rawMessage, body: envelope })
    expect(result).toEqual({ ...rawMessage, body: '', kind: 'encrypted' })
    for (const body of [
      JSON.stringify({ version: 1, algorithm: 'AES-GCM-256' }),
      JSON.stringify({ ...JSON.parse(envelope), extra: true }),
      JSON.stringify({ ...JSON.parse(envelope), iv: 'invalid' }),
      '{"ordinary":"JSON text"}',
    ]) {
      expect(normalizeChatMessage({ ...rawMessage, body })).toMatchObject({ body, kind: 'text' })
    }
  })

  it('matches the actual server 4000 JS-character message boundary', () => {
    for (const body of ['a'.repeat(4000), '文'.repeat(4000), '🙂'.repeat(2000)])
      expect(normalizeChatMessage({ ...rawMessage, body })?.body).toBe(body)
    for (const body of ['', '  \n', 'a'.repeat(4001), '🙂'.repeat(2001)])
      expect(normalizeChatMessage({ ...rawMessage, body })).toBeNull()
  })

  it.each(['id', 'roomId', 'userId'])('rejects missing, unsafe or ambiguous %s identifiers', (field) => {
    for (const value of ['', undefined, 42, 'id with space', 'id\nother', 'x'.repeat(201)])
      expect(normalizeChatMessage({ ...rawMessage, [field]: value })).toBeNull()
  })

  it.each([
    undefined,
    null,
    false,
    'message',
    [],
    {},
    { ...rawMessage, status: 'sent' },
    { ...rawMessage, status: ['visible'] },
    { ...rawMessage, status: ['removed'] },
    { ...rawMessage, createdAt: 'not-a-date' },
    { ...rawMessage, body: 42 },
    { ...rawMessage, displayName: '' },
  ])('rejects an invalid message: %j', (value) => {
    expect(normalizeChatMessage(value)).toBeNull()
  })

  it('merges history and live messages by persisted ID in stable chronological order', () => {
    const first = normalizeChatMessage(rawMessage)!
    const older = normalizeChatMessage({ ...rawMessage, id: 'msg_old', createdAt: '2026-11-08T08:00:00Z' })!
    const updated = normalizeChatMessage({ ...rawMessage, body: 'Server copy' })!
    const before = JSON.stringify([first])
    expect(mergeChatMessages([first], [updated, older])).toEqual([older, updated])
    expect(JSON.stringify([first])).toBe(before)
  })

  it('keeps a removal authoritative when a stale visible echo arrives later', () => {
    const visible = normalizeChatMessage(rawMessage)!
    const removed = normalizeChatMessage({ ...rawMessage, status: 'removed' })!
    expect(mergeChatMessages([visible], [removed])[0]).toEqual(removed)
    expect(mergeChatMessages([removed], [visible])[0]).toEqual(removed)
  })

  it('retains already-redacted encrypted records during history reconciliation', () => {
    const encrypted = normalizeChatMessage({ ...rawMessage, body: envelope })!
    expect(mergeChatMessages([encrypted], [encrypted])).toEqual([encrypted])
  })

  it('keeps the latest 200 records and sorts same-time IDs deterministically', () => {
    const messages = Array.from({ length: 220 }, (_, index) =>
      normalizeChatMessage({ ...rawMessage, id: `msg_${String(index).padStart(3, '0')}` })!
    )
    const merged = mergeChatMessages([], messages.reverse())
    expect(merged).toHaveLength(200)
    expect(merged[0].id).toBe('msg_020')
    expect(merged.at(-1)?.id).toBe('msg_219')
    expect(mergeChatMessages([], [{ ...messages[0], id: '' } as ChatMessage])).toEqual([])
  })
})

describe('platform records', () => {
  it('uses user displayName and the platform role/status shape without extra fields', () => {
    expect(normalizeChatUser({ ...rawUser, token: 'not-public' })).toEqual(rawUser)
    expect(normalizeChatUser({ ...rawUser, role: 'admin', status: 'suspended' })).toMatchObject({
      role: 'admin',
      status: 'suspended',
    })
    for (const patch of [
      { displayName: undefined },
      { status: 'online' },
      { role: 'owner' },
      { role: ['user'] },
      { status: ['active'] },
      { createdAt: 'invalid' },
      { id: '' },
    ])
      expect(normalizeChatUser({ ...rawUser, ...patch })).toBeNull()
  })

  it('retains room metadata without inventing online or unread counts', () => {
    expect(normalizeChatRoom({ ...rawRoom, unread: 5, online: 3 })).toEqual(rawRoom)
    for (const status of ['active', 'paused', 'closed'])
      expect(normalizeChatRoom({ ...rawRoom, status })?.status).toBe(status)
    for (const patch of [
      { memberCount: -1 },
      { messageCount: NaN },
      { memberCount: 1.5 },
      { jid: 'invalid' },
      { jid: 'room@host/resource' },
      { ownerId: '' },
      { status: 'online' },
      { status: ['active'] },
    ])
      expect(normalizeChatRoom({ ...rawRoom, ...patch })).toBeNull()
  })

  it('validates temporary sessions without allowing credential-bearing or insecure socket URLs', () => {
    expect(normalizeChatSession({ ...rawSession, unexpected: 'omit-me' })).toEqual(rawSession)
    for (const patch of [
      { websocketUrl: 'ws://remote.example.test/xmpp' },
      { websocketUrl: 'wss://name:secret@im.example.test/xmpp' },
      { websocketUrl: 'wss://im.example.test/xmpp?token=secret' },
      { domain: 'other.example.test' },
      { credential: '' },
      { expiresInSeconds: 0 },
      { jid: 'usr@im.example.test/resource' },
    ])
      expect(normalizeChatSession({ ...rawSession, ...patch })).toBeNull()
  })
})
