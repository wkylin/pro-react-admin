import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'
import { isRecord } from './response'

export type EncryptionMode = 'AES' | 'RSA' | 'HYBRID'
export const isFormData = (value: unknown): value is FormData =>
  typeof FormData !== 'undefined' && value instanceof FormData
export const isBlob = (value: unknown): value is Blob => typeof Blob !== 'undefined' && value instanceof Blob

/** Optional application protocol; configuration is scoped to each client, never shared implicitly. */
export class EncryptionConfig {
  enabled = false
  mode: EncryptionMode = 'AES'
  aesKey = ''
  rsaPublicKey = ''
  rsaPrivateKey = ''
  encryptRequest = true
  encryptResponse = true
  encryptionHeader = 'X-Encryption-Mode'
  keyExchangeUrl: string | null = null

  configureAES(key: string): void {
    if (![16, 24, 32].includes(key.length)) throw new Error('AES 密钥长度必须是 16、24 或 32 字符')
    this.mode = 'AES'
    this.aesKey = key
    this.enabled = true
  }
  configureRSA(publicKey: string, privateKey = ''): void {
    if (!publicKey) throw new Error('RSA 公钥不能为空')
    this.mode = 'RSA'
    this.rsaPublicKey = publicKey
    this.rsaPrivateKey = privateKey
    this.enabled = true
  }
  configureHybrid(publicKey: string, privateKey = ''): void {
    this.configureRSA(publicKey, privateKey)
    this.mode = 'HYBRID'
    this.aesKey = CryptoJS.lib.WordArray.random(16).toString()
  }
  disable(): void {
    this.enabled = false
  }
  reset(): void {
    this.enabled = false
    this.mode = 'AES'
    this.aesKey = this.rsaPublicKey = this.rsaPrivateKey = ''
  }
}

export class EncryptionHandler {
  static encryptAES(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data, key).toString()
  }
  static decryptAES(data: string, key: string): string {
    const plaintext = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
    if (!plaintext) throw new Error('AES 解密失败，可能是密钥错误')
    return plaintext
  }
  static encryptRSA(data: string, publicKey: string): string {
    const cipher = new JSEncrypt()
    cipher.setPublicKey(publicKey)
    const chunks: string[] = []
    // Preserve the existing application's conservative chunked wire format.
    for (let offset = 0; offset < data.length || offset === 0; offset += 117) {
      const encrypted = cipher.encrypt(data.slice(offset, offset + 117))
      if (!encrypted) throw new Error('RSA 加密失败')
      chunks.push(encrypted)
    }
    return chunks.length === 1 ? chunks[0] : JSON.stringify(chunks)
  }
  static decryptRSA(data: string, privateKey: string): string {
    const cipher = new JSEncrypt()
    cipher.setPrivateKey(privateKey)
    let chunks: unknown
    try {
      chunks = JSON.parse(data)
    } catch {
      chunks = [data]
    }
    if (!Array.isArray(chunks) || !chunks.every((chunk) => typeof chunk === 'string'))
      throw new Error('无效的分段加密数据')
    return chunks
      .map((chunk: string) => {
        const plaintext = cipher.decrypt(chunk)
        if (plaintext === false) throw new Error('RSA 解密失败')
        return plaintext
      })
      .join('')
  }
  static encryptHybrid(
    data: string,
    aesKey: string,
    publicKey: string
  ): { encryptedKey: string; encryptedData: string } {
    return { encryptedKey: this.encryptRSA(aesKey, publicKey), encryptedData: this.encryptAES(data, aesKey) }
  }
  static decryptHybrid(data: string, key: string, privateKey: string): string {
    return this.decryptAES(data, this.decryptRSA(key, privateKey))
  }
  static encryptRequestData(data: unknown, config: EncryptionConfig, fields: string[] = []): unknown {
    if (!config.enabled || !config.encryptRequest || data == null || isFormData(data) || isBlob(data)) return data
    if (fields.length && isRecord(data)) {
      const result = { ...data }
      for (const field of fields) {
        if (!Object.prototype.hasOwnProperty.call(result, field)) continue
        const value = typeof result[field] === 'string' ? result[field] : JSON.stringify(result[field])
        if (typeof value !== 'string') throw new Error('加密字段无法序列化')
        if (config.mode === 'AES') result[field] = this.encryptAES(value, config.aesKey)
        else if (config.mode === 'RSA') result[field] = this.encryptRSA(value, config.rsaPublicKey)
        else {
          const encrypted = this.encryptHybrid(value, config.aesKey, config.rsaPublicKey)
          result[field] = { encrypted: encrypted.encryptedData, key: encrypted.encryptedKey }
        }
      }
      return result
    }
    const value = typeof data === 'string' ? data : JSON.stringify(data)
    if (typeof value !== 'string') throw new Error('加密数据无法序列化')
    if (config.mode === 'AES') return { encrypted: this.encryptAES(value, config.aesKey), mode: 'AES' }
    if (config.mode === 'RSA') return { encrypted: this.encryptRSA(value, config.rsaPublicKey), mode: 'RSA' }
    const encrypted = this.encryptHybrid(value, config.aesKey, config.rsaPublicKey)
    return { encrypted: encrypted.encryptedData, key: encrypted.encryptedKey, mode: 'HYBRID' }
  }
  static decryptResponseData(data: unknown, config: EncryptionConfig): unknown {
    if (!config.enabled || !config.encryptResponse || !isRecord(data) || typeof data.encrypted !== 'string') return data
    const mode = data.mode || config.mode
    if ((mode === 'RSA' || mode === 'HYBRID') && !config.rsaPrivateKey) return data
    let plaintext: string
    if (mode === 'AES') plaintext = this.decryptAES(data.encrypted, config.aesKey)
    else if (mode === 'RSA') plaintext = this.decryptRSA(data.encrypted, config.rsaPrivateKey)
    else if (mode === 'HYBRID' && typeof data.key === 'string')
      plaintext = this.decryptHybrid(data.encrypted, data.key, config.rsaPrivateKey)
    else throw new Error('无效的加密响应')
    try {
      return JSON.parse(plaintext) as unknown
    } catch {
      return plaintext
    }
  }
}
