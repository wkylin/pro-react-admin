import { webcrypto } from 'node:crypto'
import { decryptMessage, encryptMessage, generateSessionKey, parseEncryptedMessage, validateSocketUrl } from './crypto'

const originalCrypto = globalThis.crypto

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto })
})

afterAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: originalCrypto })
})

test('encrypts and decrypts Unicode messages with a fresh nonce per message', async () => {
  const key = generateSessionKey()
  const first = await encryptMessage('你好，WebSocket 与 XMPP', key)
  const second = await encryptMessage('你好，WebSocket 与 XMPP', key)
  expect(first.iv).not.toBe(second.iv)
  expect(first.ciphertext).not.toBe(second.ciphertext)
  expect(JSON.stringify(first)).not.toContain('你好')
  expect(await decryptMessage(JSON.stringify(first), key)).toBe('你好，WebSocket 与 XMPP')
})

test('rejects altered ciphertext, a different key and malformed envelopes', async () => {
  const key = generateSessionKey()
  const envelope = await encryptMessage('private', key)
  await expect(decryptMessage(envelope, generateSessionKey())).rejects.toThrow('解密失败')
  const changed = `${envelope.ciphertext[0] === 'A' ? 'B' : 'A'}${envelope.ciphertext.slice(1)}`
  await expect(decryptMessage({ ...envelope, ciphertext: changed }, key)).rejects.toThrow('解密失败')
  expect(() => parseEncryptedMessage({ ...envelope, extra: 'ignored' })).toThrow('不支持')
  await expect(encryptMessage('private', 'invalid')).rejects.toThrow('格式无效')
})

test('requires encrypted socket transports outside local development', () => {
  expect(validateSocketUrl('wss://example.com/messages')).toBe('wss://example.com/messages')
  expect(() => validateSocketUrl('ws://example.com/messages')).toThrow('wss://')
  expect(() => validateSocketUrl('wss://user:pass@example.com/messages')).toThrow('凭据')
  expect(() => validateSocketUrl('wss://example.com/messages?token=secret')).toThrow('参数')
})
