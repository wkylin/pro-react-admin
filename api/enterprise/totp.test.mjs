import { test } from 'node:test'
import assert from 'node:assert/strict'
import { base32, decryptTotpSecret, encryptTotpSecret, matchTotp, totpAtStep } from './totp.mts'

test('TOTP matches the RFC 6238 SHA-1 reference vectors', () => {
  const secret = Buffer.from('12345678901234567890')
  for (const [time, expected] of [
    [59, '94287082'],
    [1111111109, '07081804'],
    [1111111111, '14050471'],
    [1234567890, '89005924'],
    [2000000000, '69279037'],
    [20000000000, '65353130'],
  ]) {
    assert.equal(totpAtStep(secret, Math.floor(time / 30), 8), expected)
  }
  assert.equal(base32(secret), 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ')
})

test('verification tolerates one adjacent period and encrypted secrets are account bound', () => {
  const secret = Buffer.from('12345678901234567890')
  const now = 1234567890 * 1000
  const current = Math.floor(now / 30000)
  assert.equal(matchTotp(secret, totpAtStep(secret, current - 1), now), current - 1)
  assert.equal(matchTotp(secret, totpAtStep(secret, current + 1), now), current + 1)
  assert.equal(matchTotp(secret, totpAtStep(secret, current + 2), now), null)
  assert.equal(matchTotp(secret, '12345a', now), null)
  const key = Buffer.alloc(32, 9)
  const encrypted = encryptTotpSecret(secret, key, 'account-1')
  assert.deepEqual(decryptTotpSecret(encrypted, key, 'account-1'), secret)
  assert.throws(() => decryptTotpSecret(encrypted, key, 'account-2'))
  assert.throws(() => decryptTotpSecret(encrypted, Buffer.alloc(32, 8), 'account-1'))
})
