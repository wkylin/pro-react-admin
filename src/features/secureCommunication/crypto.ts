/** Wire format for the communication lab. It is independent of Request.js encryption. */
export interface EncryptedMessage {
  version: 1
  algorithm: 'AES-GCM-256'
  iv: string
  ciphertext: string
}

const MAX_PLAINTEXT_BYTES = 4_096
const MAX_ENVELOPE_CHARS = 12_000
const associatedData = new TextEncoder().encode('pro-react-admin:secure-message:1')

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('密文或密钥格式无效')
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))
  const bytes = new Uint8Array(new ArrayBuffer(binary.length))
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index)
  if (toBase64Url(bytes) !== value) throw new Error('密文或密钥格式无效')
  return bytes
}

function requireCrypto(): Crypto {
  if (!globalThis.crypto?.subtle) throw new Error('当前环境不支持 Web Crypto，请使用 HTTPS 或 localhost')
  return globalThis.crypto
}

async function importSessionKey(value: string): Promise<CryptoKey> {
  const bytes = fromBase64Url(value.trim())
  if (bytes.length !== 32) throw new Error('会话密钥必须为 256 位 Base64URL 字符串')
  return requireCrypto().subtle.importKey('raw', bytes, 'AES-GCM', false, ['encrypt', 'decrypt'])
}

export function generateSessionKey(): string {
  return toBase64Url(requireCrypto().getRandomValues(new Uint8Array(32)))
}

export function parseEncryptedMessage(value: unknown): EncryptedMessage {
  let record = value
  if (typeof value === 'string') {
    if (value.length > MAX_ENVELOPE_CHARS) throw new Error('不支持的加密消息格式')
    try {
      record = JSON.parse(value)
    } catch {
      throw new Error('不支持的加密消息格式')
    }
  }
  if (
    !record ||
    typeof record !== 'object' ||
    Array.isArray(record) ||
    Object.keys(record).sort().join(',') !== 'algorithm,ciphertext,iv,version' ||
    !('version' in record) ||
    record.version !== 1 ||
    !('algorithm' in record) ||
    record.algorithm !== 'AES-GCM-256' ||
    !('iv' in record) ||
    typeof record.iv !== 'string' ||
    !('ciphertext' in record) ||
    typeof record.ciphertext !== 'string' ||
    record.ciphertext.length > MAX_ENVELOPE_CHARS
  ) {
    throw new Error('不支持的加密消息格式')
  }
  const envelope = record as EncryptedMessage
  if (fromBase64Url(envelope.iv).length !== 12 || fromBase64Url(envelope.ciphertext).length < 16)
    throw new Error('不支持的加密消息格式')
  return envelope
}

export async function encryptMessage(plaintext: string, sessionKey: string): Promise<EncryptedMessage> {
  const bytes = new TextEncoder().encode(plaintext)
  if (!bytes.length || bytes.length > MAX_PLAINTEXT_BYTES) throw new Error('消息须为 1 至 4096 字节')
  const key = await importSessionKey(sessionKey)
  const iv = requireCrypto().getRandomValues(new Uint8Array(12))
  const ciphertext = await requireCrypto().subtle.encrypt(
    { name: 'AES-GCM', iv, additionalData: associatedData, tagLength: 128 },
    key,
    bytes
  )
  return {
    version: 1,
    algorithm: 'AES-GCM-256',
    iv: toBase64Url(iv),
    ciphertext: toBase64Url(new Uint8Array(ciphertext)),
  }
}

export async function decryptMessage(value: unknown, sessionKey: string): Promise<string> {
  const envelope = parseEncryptedMessage(value)
  const key = await importSessionKey(sessionKey)
  try {
    const plaintext = await requireCrypto().subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64Url(envelope.iv), additionalData: associatedData, tagLength: 128 },
      key,
      fromBase64Url(envelope.ciphertext)
    )
    return new TextDecoder('utf-8', { fatal: true }).decode(plaintext)
  } catch {
    throw new Error('解密失败：密钥不匹配或消息已被修改')
  }
}

export function validateSocketUrl(value: string): string {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    throw new Error('请输入完整的 WebSocket 服务地址')
  }
  const localPage =
    typeof window !== 'undefined' && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
  const localTarget = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  if (
    (url.protocol !== 'wss:' && !(url.protocol === 'ws:' && localPage && localTarget)) ||
    url.username ||
    url.password ||
    url.hash ||
    url.search
  ) {
    throw new Error('请使用 wss://；仅本地开发允许 ws://localhost，且地址不能包含凭据或参数')
  }
  return url.href
}
