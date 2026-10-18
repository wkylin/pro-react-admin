import { EncryptionConfig, EncryptionHandler } from './encryption'

test('round-trips existing AES envelopes and preserves unencrypted data', () => {
  const config = new EncryptionConfig()
  const original = { name: '测试', count: 2 }
  expect(EncryptionHandler.encryptRequestData(original, config)).toBe(original)
  config.configureAES('1234567890123456')
  const encrypted = EncryptionHandler.encryptRequestData(original, config)
  expect(EncryptionHandler.decryptResponseData(encrypted, config)).toEqual(original)
})

test('encrypts selected fields without mutating the input or leaking configuration between clients', () => {
  const config = new EncryptionConfig()
  config.configureAES('1234567890123456')
  const original = { name: 'reader', secret: 'value' }
  const encrypted = EncryptionHandler.encryptRequestData(original, config, ['secret']) as typeof original
  expect(encrypted.name).toBe('reader')
  expect(encrypted.secret).not.toBe('value')
  expect(original.secret).toBe('value')
  expect(new EncryptionConfig().enabled).toBe(false)
  expect(EncryptionHandler.encryptRequestData(new FormData(), config)).toBeInstanceOf(FormData)
})
