import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
export const TOTP_PERIOD_SECONDS = 30
export const TOTP_DIGITS = 6

export function base32(bytes: Buffer): string {
  let bits = 0
  let value = 0
  let result = ''
  for (const byte of bytes) {
    value = (value << 8) | byte
    bits += 8
    while (bits >= 5) {
      result += alphabet[(value >>> (bits -= 5)) & 31]
    }
  }
  if (bits) result += alphabet[(value << (5 - bits)) & 31]
  return result
}

export function createTotpSecret(): Buffer {
  return randomBytes(20)
}

export function totpAtStep(secret: Buffer, step: number, digits = TOTP_DIGITS): string {
  if (!Number.isSafeInteger(step) || step < 0) throw new Error('Invalid TOTP step')
  const counter = Buffer.alloc(8)
  counter.writeBigUInt64BE(BigInt(step))
  const digest = createHmac('sha1', secret).update(counter).digest()
  const offset = digest[digest.length - 1] & 15
  const number = (digest.readUInt32BE(offset) & 0x7fffffff) % 10 ** digits
  return String(number).padStart(digits, '0')
}

/** One adjacent step covers modest clock drift; callers persist the accepted step to reject replay. */
export function matchTotp(secret: Buffer, code: unknown, nowMs: number): number | null {
  if (typeof code !== 'string' || !/^\d{6}$/.test(code)) return null
  const step = Math.floor(nowMs / (TOTP_PERIOD_SECONDS * 1_000))
  const supplied = Buffer.from(code)
  for (const candidate of [step, step - 1, step + 1]) {
    if (candidate >= 0 && timingSafeEqual(Buffer.from(totpAtStep(secret, candidate)), supplied)) return candidate
  }
  return null
}

export function otpauthUri(email: string, secret: string): string {
  const issuer = 'Pro React Admin'
  const query = new URLSearchParams({
    secret,
    issuer,
    algorithm: 'SHA1',
    digits: String(TOTP_DIGITS),
    period: String(TOTP_PERIOD_SECONDS),
  })
  return `otpauth://totp/${encodeURIComponent(`${issuer}:${email}`)}?${query}`
}

export function encryptTotpSecret(secret: Buffer, key: Buffer, principalId: string): string {
  const nonce = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, nonce)
  cipher.setAAD(Buffer.from(principalId))
  const ciphertext = Buffer.concat([cipher.update(secret), cipher.final()])
  return [nonce, ciphertext, cipher.getAuthTag()].map((part) => part.toString('base64url')).join('.')
}

export function decryptTotpSecret(value: string, key: Buffer, principalId: string): Buffer {
  const parts = value.split('.')
  if (parts.length !== 3) throw new Error('Invalid encrypted TOTP secret')
  const [nonce, ciphertext, tag] = parts.map((part) => Buffer.from(part, 'base64url'))
  if (nonce.length !== 12 || ciphertext.length !== 20 || tag.length !== 16)
    throw new Error('Invalid encrypted TOTP secret')
  const decipher = createDecipheriv('aes-256-gcm', key, nonce)
  decipher.setAAD(Buffer.from(principalId))
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()])
}

export function createRecoveryCodes(): string[] {
  return Array.from({ length: 10 }, () => {
    const value = base32(randomBytes(10))
    return value.match(/.{4}/g)!.join('-')
  })
}

export function recoveryCodeHash(principalId: string, value: unknown): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.replace(/-/g, '').toUpperCase()
  if (!/^[A-Z2-7]{16}$/.test(normalized)) return null
  return createHash('sha256').update(`${principalId}\0${normalized}`).digest('hex')
}
