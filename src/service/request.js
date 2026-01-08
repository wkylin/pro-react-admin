import axios from 'axios'
import qs from 'qs'
import { showMessage } from '@src/utils/message'
// import { authService } from '@src/service/authService' // 移除以避免循环依赖
import logger from '../utils/logger'
import { getEnv } from '@utils/env'
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

// ==================== 1. 配置常量 ====================
const CONFIG = {
  BASE_URL: getEnv('APP_BASE_URL', ''),
  TIMEOUT: 60000,
  WITH_CREDENTIALS: true,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 500,
  DEFAULT_CONCURRENCY: 5,
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8',
}

// ==================== 2. HTTP 状态码错误消息映射 ====================
const HTTP_ERROR_MESSAGES = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '没有权限访问',
  404: '请求资源不存在',
  405: '请求方法不允许',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  default: (status) => `请求失败 (${status})`,
}

const NETWORK_ERROR_MESSAGES = {
  ECONNABORTED: '请求超时',
  ETIMEDOUT: '连接超时',
  ENOTFOUND: '域名解析失败',
  ECONNREFUSED: '连接被拒绝',
  default: '网络连接异常',
}

// ==================== 3. 加密配置管理 ====================
class EncryptionConfig {
  constructor() {
    this.enabled = false // 是否启用加密
    this.mode = 'AES' // 加密模式: 'AES' | 'RSA' | 'HYBRID'
    this.aesKey = '' // AES 密钥
    this.rsaPublicKey = '' // RSA 公钥
    this.rsaPrivateKey = '' // RSA 私钥
    this.encryptRequest = true // 是否加密请求
    this.encryptResponse = true // 是否加密响应
    this.encryptionHeader = 'X-Encryption-Mode' // 加密模式标识头
    this.keyExchangeUrl = null // 密钥交换接口（可选）
  }

  /**
   * 配置 AES 加密
   * @param {string} key - AES 密钥（16/24/32 字符）
   */
  configureAES(key) {
    if (!key || (key.length !== 16 && key.length !== 24 && key.length !== 32)) {
      throw new Error('AES 密钥长度必须是 16、24 或 32 字符')
    }
    this.mode = 'AES'
    this.aesKey = key
    this.enabled = true
    logger.info('已配置 AES 加密模式')
  }

  /**
   * 配置 RSA 加密
   * @param {string} publicKey - RSA 公钥
   * @param {string} privateKey - RSA 私钥（可选，用于解密响应）
   */
  configureRSA(publicKey, privateKey = '') {
    if (!publicKey) {
      throw new Error('RSA 公钥不能为空')
    }
    this.mode = 'RSA'
    this.rsaPublicKey = publicKey
    this.rsaPrivateKey = privateKey
    this.enabled = true
    logger.info('已配置 RSA 加密模式')
  }

  /**
   * 配置混合加密（RSA 加密 AES 密钥，AES 加密数据）
   * @param {string} rsaPublicKey - RSA 公钥
   * @param {string} rsaPrivateKey - RSA 私钥（可选）
   */
  configureHybrid(rsaPublicKey, rsaPrivateKey = '') {
    if (!rsaPublicKey) {
      throw new Error('RSA 公钥不能为空')
    }
    this.mode = 'HYBRID'
    this.rsaPublicKey = rsaPublicKey
    this.rsaPrivateKey = rsaPrivateKey
    this.enabled = true
    // 自动生成随机 AES 密钥
    this.aesKey = CryptoJS.lib.WordArray.random(16).toString()
    logger.info('已配置混合加密模式')
  }

  /**
   * 禁用加密
   */
  disable() {
    this.enabled = false
    logger.info('已禁用加密功能')
  }

  /**
   * 重置配置
   */
  reset() {
    this.enabled = false
    this.mode = 'AES'
    this.aesKey = ''
    this.rsaPublicKey = ''
    this.rsaPrivateKey = ''
    logger.info('已重置加密配置')
  }
}

const encryptionConfig = new EncryptionConfig()

// ==================== 4. 加密处理器 ====================
class EncryptionHandler {
  /**
   * AES 加密
   * @param {string} data - 待加密数据
   * @param {string} key - 密钥
   * @returns {string} 加密后的数据
   */
  static encryptAES(data, key) {
    try {
      const encrypted = CryptoJS.AES.encrypt(data, key).toString()
      logger.log('AES 加密成功')
      return encrypted
    } catch (error) {
      logger.error('AES 加密失败:', error)
      throw new Error('AES 加密失败: ' + error.message)
    }
  }

  /**
   * AES 解密
   * @param {string} cipherText - 密文
   * @param {string} key - 密钥
   * @returns {string} 解密后的数据
   */
  static decryptAES(cipherText, key) {
    try {
      const decrypted = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8)
      if (!decrypted) {
        throw new Error('解密失败，可能是密钥错误')
      }
      logger.log('AES 解密成功')
      return decrypted
    } catch (error) {
      logger.error('AES 解密失败:', error)
      throw new Error('AES 解密失败: ' + error.message)
    }
  }

  /**
   * RSA 加密
   * @param {string} data - 待加密数据
   * @param {string} publicKey - 公钥
   * @returns {string} 加密后的数据
   */
  static encryptRSA(data, publicKey) {
    try {
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(publicKey)

      // RSA 分段加密（处理长文本）
      const maxLength = 117 // RSA 2048位密钥最大加密长度
      if (data.length <= maxLength) {
        const encrypted = encrypt.encrypt(data)
        if (!encrypted) throw new Error('RSA 加密失败')
        logger.log('RSA 加密成功')
        return encrypted
      }

      // 分段加密
      const chunks = []
      for (let i = 0; i < data.length; i += maxLength) {
        const chunk = data.substring(i, i + maxLength)
        const encrypted = encrypt.encrypt(chunk)
        if (!encrypted) throw new Error('RSA 分段加密失败')
        chunks.push(encrypted)
      }

      logger.log(`RSA 分段加密成功 (${chunks.length} 段)`)
      return JSON.stringify(chunks)
    } catch (error) {
      logger.error('RSA 加密失败:', error)
      throw new Error('RSA 加密失败: ' + error.message)
    }
  }

  /**
   * RSA 解密
   * @param {string} cipherText - 密文
   * @param {string} privateKey - 私钥
   * @returns {string} 解密后的数据
   */
  static decryptRSA(cipherText, privateKey) {
    try {
      const decrypt = new JSEncrypt()
      decrypt.setPrivateKey(privateKey)

      // 尝试 JSON 解析（分段加密的情况）
      let chunks
      try {
        chunks = JSON.parse(cipherText)
      } catch {
        // 单段加密
        const decrypted = decrypt.decrypt(cipherText)
        if (!decrypted) throw new Error('RSA 解密失败')
        logger.log('RSA 解密成功')
        return decrypted
      }

      // 分段解密
      if (!Array.isArray(chunks)) {
        throw new Error('无效的分段加密数据')
      }

      const decryptedChunks = []
      for (const chunk of chunks) {
        const decrypted = decrypt.decrypt(chunk)
        if (!decrypted) throw new Error('RSA 分段解密失败')
        decryptedChunks.push(decrypted)
      }

      logger.log(`RSA 分段解密成功 (${chunks.length} 段)`)
      return decryptedChunks.join('')
    } catch (error) {
      logger.error('RSA 解密失败:', error)
      throw new Error('RSA 解密失败: ' + error.message)
    }
  }

  /**
   * 混合加密（RSA 加密 AES 密钥，AES 加密数据）
   * @param {string} data - 待加密数据
   * @param {string} aesKey - AES 密钥
   * @param {string} rsaPublicKey - RSA 公钥
   * @returns {object} { encryptedKey, encryptedData }
   */
  static encryptHybrid(data, aesKey, rsaPublicKey) {
    try {
      // 1. 使用 AES 加密数据
      const encryptedData = this.encryptAES(data, aesKey)

      // 2. 使用 RSA 加密 AES 密钥
      const encryptedKey = this.encryptRSA(aesKey, rsaPublicKey)

      logger.log('混合加密成功')
      return {
        encryptedKey,
        encryptedData,
      }
    } catch (error) {
      logger.error('混合加密失败:', error)
      throw new Error('混合加密失败: ' + error.message)
    }
  }

  /**
   * 混合解密
   * @param {string} encryptedData - 加密的数据
   * @param {string} encryptedKey - 加密的密钥
   * @param {string} rsaPrivateKey - RSA 私钥
   * @returns {string} 解密后的数据
   */
  static decryptHybrid(encryptedData, encryptedKey, rsaPrivateKey) {
    try {
      // 1. 使用 RSA 解密 AES 密钥
      const aesKey = this.decryptRSA(encryptedKey, rsaPrivateKey)

      // 2. 使用 AES 解密数据
      const decryptedData = this.decryptAES(encryptedData, aesKey)

      logger.log('混合解密成功')
      return decryptedData
    } catch (error) {
      logger.error('混合解密失败:', error)
      throw new Error('混合解密失败: ' + error.message)
    }
  }

  /**
   * 加密请求数据
   * @param {any} data - 原始数据
   * @param {EncryptionConfig} config - 加密配置
   * @returns {any} 加密后的数据
   */
  static encryptRequestData(data, config) {
    if (!config.enabled || !config.encryptRequest) {
      return data
    }

    // 不加密特殊类型
    if (RequestUtils.isFormData(data) || RequestUtils.isBlob(data)) {
      logger.warn('FormData/Blob 类型数据不进行加密')
      return data
    }

    // 转为 JSON 字符串
    const jsonData = typeof data === 'string' ? data : JSON.stringify(data)

    try {
      switch (config.mode) {
        case 'AES':
          return {
            encrypted: this.encryptAES(jsonData, config.aesKey),
            mode: 'AES',
          }

        case 'RSA':
          return {
            encrypted: this.encryptRSA(jsonData, config.rsaPublicKey),
            mode: 'RSA',
          }

        case 'HYBRID': {
          const { encryptedKey, encryptedData } = this.encryptHybrid(jsonData, config.aesKey, config.rsaPublicKey)
          return {
            encrypted: encryptedData,
            key: encryptedKey,
            mode: 'HYBRID',
          }
        }

        default:
          logger.warn('未知的加密模式:', config.mode)
          return data
      }
    } catch (error) {
      logger.error('加密请求数据失败:', error)
      throw error
    }
  }

  /**
   * 解密响应数据
   * @param {any} data - 加密的数据
   * @param {EncryptionConfig} config - 加密配置
   * @returns {any} 解密后的数据
   */
  static decryptResponseData(data, config) {
    if (!config.enabled || !config.encryptResponse) {
      return data
    }

    // 检查是否为加密数据
    if (!data || typeof data !== 'object' || !data.encrypted) {
      return data
    }

    try {
      let decrypted

      switch (data.mode || config.mode) {
        case 'AES':
          decrypted = this.decryptAES(data.encrypted, config.aesKey)
          break

        case 'RSA':
          if (!config.rsaPrivateKey) {
            logger.warn('缺少 RSA 私钥，无法解密响应')
            return data
          }
          decrypted = this.decryptRSA(data.encrypted, config.rsaPrivateKey)
          break

        case 'HYBRID':
          if (!config.rsaPrivateKey) {
            logger.warn('缺少 RSA 私钥，无法解密响应')
            return data
          }
          decrypted = this.decryptHybrid(data.encrypted, data.key, config.rsaPrivateKey)
          break

        default:
          logger.warn('未知的解密模式:', data.mode)
          return data
      }

      // 尝试解析为 JSON
      try {
        return JSON.parse(decrypted)
      } catch {
        return decrypted
      }
    } catch (error) {
      logger.error('解密响应数据失败:', error)
      throw error
    }
  }
}

// ==================== 5. 请求管理 ====================
class RequestManager {
  constructor() {
    this.pendingRequests = new Map()
  }

  // 4. 生成唯一请求标识
  generateRequestKey(config) {
    const { method, url, params, data } = config
    return [method?.toUpperCase(), url, JSON.stringify(params || {}), JSON.stringify(data || {})].join('&')
  }

  // 5. 取消相同的进行中请求
  cancelDuplicateRequest(config) {
    const requestKey = this.generateRequestKey(config)

    if (this.pendingRequests.has(requestKey)) {
      const controller = this.pendingRequests.get(requestKey)
      controller.abort()
      logger.warn('取消重复请求:', requestKey)
    }

    const controller = new AbortController()
    this.pendingRequests.set(requestKey, controller)

    return { requestKey, controller }
  }

  // 6. 移除请求
  removeRequest(requestKey) {
    if (this.pendingRequests.has(requestKey)) {
      this.pendingRequests.delete(requestKey)
    }
  }

  // 7. 清空所有请求
  clearAllRequests() {
    this.pendingRequests.forEach((controller) => {
      controller.abort()
    })
    this.pendingRequests.clear()
    logger.info('已清空所有待处理请求')
  }

  getActiveCount() {
    return this.pendingRequests.size
  }
}

const requestManager = new RequestManager()

// ==================== 7. 工具函数 ====================
class RequestUtils {
  // 添加时间戳后缀（防缓存）
  static addTimestampSuffix(params = {}) {
    return {
      ...params,
      _: Date.now(),
    }
  }

  // 延迟函数
  static delay(ms) {
    return new Promise((resolve) => globalThis.setTimeout(resolve, ms))
  }

  // 判断是否为 FormData
  static isFormData(data) {
    return typeof FormData !== 'undefined' && data instanceof FormData
  }

  // 判断是否为 Blob
  static isBlob(data) {
    return typeof Blob !== 'undefined' && data instanceof Blob
  }

  // 获取错误消息
  static getHttpErrorMessage(status) {
    return HTTP_ERROR_MESSAGES[status] || HTTP_ERROR_MESSAGES.default(status)
  }

  static getNetworkErrorMessage(code) {
    return NETWORK_ERROR_MESSAGES[code] || NETWORK_ERROR_MESSAGES.default
  }

  // 处理错误显示
  static handleShowError(message, showError = true) {
    if (!showError) return
    try {
      showMessage.error(message)
    } catch (e) {
      showMessage.error(e.message)
    }
  }

  // 从响应头获取文件名
  static getFileNameFromResponse(response) {
    const contentDisposition = response.headers['content-disposition']
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (match?.[1]) {
        return decodeURIComponent(match[1].replace(/['"]/g, ''))
      }
    }
    return null
  }

  // 触发文件下载
  static triggerDownload(blob, fileName) {
    const link = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    link.href = url
    link.download = fileName || `download_${Date.now()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

// ==================== 8. Axios 实例 ====================
let axiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: CONFIG.TIMEOUT,
  withCredentials: CONFIG.WITH_CREDENTIALS,
  headers: { ...DEFAULT_HEADERS },
})

// 导出配置方法
export function setAxiosInstance(instance) {
  axiosInstance = instance
  logger.info('Axios 实例已更新')
}

export function setBaseURL(url) {
  CONFIG.BASE_URL = url
  axiosInstance.defaults.baseURL = url
  logger.info('BaseURL 已更新:', url)
}

export function setDefaultHeaders(headers) {
  axiosInstance.defaults.headers = {
    ...axiosInstance.defaults.headers,
    ...headers,
  }
  logger.info('默认请求头已更新:', headers)
}

export function setTimeout(timeout) {
  CONFIG.TIMEOUT = timeout
  axiosInstance.defaults.timeout = timeout
  logger.info('请求超时时间已更新:', timeout)
}

const ensureHeaders = (config) => {
  if (!config.headers) config.headers = {}
}

const applyDedup = (config) => {
  if (config.cancelDuplicate !== false) {
    const { requestKey, controller } = requestManager.cancelDuplicateRequest(config)
    config.signal = controller.signal
    config._requestKey = requestKey
  }
}

const applyTimestampSuffix = (config) => {
  const method = config.method?.toUpperCase()
  const shouldAdd = (method === 'GET' || method === 'DELETE') && config.addTimestamp !== false
  if (shouldAdd) {
    config.params = RequestUtils.addTimestampSuffix(config.params)
    logger.log('已添加时间戳参数')
  }
}

const readGithubToken = () => {
  try {
    const tokenData = localStorage.getItem('github_token')
    if (!tokenData) return null
    return JSON.parse(tokenData).token || null
  } catch (e) {
    logger.warn('读取 token 失败', e)
    return null
  }
}

const applyAuthorization = (config) => {
  if (config.headers.Authorization || config.needToken === false) return
  const token = readGithubToken()
  if (!token) return
  config.headers.Authorization = `Bearer ${token}`
  logger.log('已添加 Authorization:', `Bearer ${token.substring(0, 20)}...`)
}

const applyDataFormat = (config) => {
  const contentType = config.headers['Content-Type'] || config.headers['content-type']

  if (RequestUtils.isFormData(config.data)) {
    delete config.headers['Content-Type']
    logger.log('检测到 FormData，已删除 Content-Type')
    return
  }

  if (contentType === 'application/x-www-form-urlencoded' && config.data && typeof config.data === 'object') {
    config.data = qs.stringify(config.data, { arrayFormat: 'brackets' })
    logger.log('表单数据已序列化')
  }
}

const applyEncryption = (config) => {
  // 检查是否需要加密（可通过 config.encrypt 单独控制）
  if (config.encrypt === false) return

  try {
    config.data = EncryptionHandler.encryptRequestData(config.data, encryptionConfig)

    // 添加加密标识头
    if (encryptionConfig.enabled && encryptionConfig.encryptRequest) {
      config.headers[encryptionConfig.encryptionHeader] = encryptionConfig.mode
      logger.log('已添加加密标识头')
    }
  } catch (error) {
    logger.error('请求数据加密失败:', error)
    if (config.throwOnEncryptError !== false) {
      throw error
    }
  }
}

const applyRequestMetadata = (config) => {
  config.metadata = { startTime: Date.now() }
}

const applyRequestId = (config) => {
  if (config.requestId) {
    config.headers['X-Request-ID'] = config.requestId
  }
}

// ==================== 9. 请求拦截器 ====================
axiosInstance.interceptors.request.use(
  (config) => {
    ensureHeaders(config)
    applyDedup(config)
    applyTimestampSuffix(config)
    applyAuthorization(config)
    applyDataFormat(config)
    applyEncryption(config) // 新增：加密请求数据
    applyRequestMetadata(config)
    applyRequestId(config)

    logger.log(`发起请求: ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: RequestUtils.isFormData(config.data) ? '[FormData]' : config.data,
    })

    return config
  },
  (error) => {
    logger.error('请求拦截器错误:', error)
    RequestUtils.handleShowError('请求配置失败: ' + error.message, error.config?.showError !== false)
    return Promise.reject(error)
  }
)

// 处理未授权
function handleUnauthorized(message) {
  // authService.logout() // 移除以避免循环依赖
  // 清理权限缓存与开发覆盖，避免跳转登录后仍沿用旧权限
  try {
    localStorage.removeItem('user_permissions')
    localStorage.removeItem('permissions_fetch_time')
    localStorage.removeItem('permissions_auth_key')
    localStorage.removeItem('user_role')
    localStorage.removeItem('force_demo_switch')
  } catch (e) {
    console.warn('清理权限缓存失败:', e)
  }

  localStorage.removeItem('token')
  localStorage.removeItem('github_token')
  localStorage.removeItem('github_user')

  const isAtSignIn = () => {
    const hash = String(window?.location?.hash || '')
    return hash === '#/signin' || hash.startsWith('#/signin?') || hash.startsWith('#/signin/')
  }

  // 延迟跳转，确保消息显示
  globalThis.setTimeout(() => {
    // 项目使用 createHashRouter，必须使用 hash 跳转；否则静态部署下 /signin 会导致页面空白
    if (!isAtSignIn()) window.location.hash = '#/signin'
  }, 500)

  logger.warn('用户未授权，已清除登录信息')
  logger.warn(message)
}

const isHttpOk = (status) => status >= 200 && status < 300

const isBusinessEnvelope = (data) => {
  return !!(data && typeof data === 'object' && 'code' in data)
}

const resolveResponseData = (response) => {
  const config = response.config

  if (config.responseType === 'blob') return response

  let { data, status } = response

  // 尝试解密响应数据
  try {
    data = EncryptionHandler.decryptResponseData(data, encryptionConfig)
  } catch (error) {
    logger.error('响应数据解密失败:', error)
    if (config.throwOnDecryptError !== false) {
      throw error
    }
  }

  if (!isHttpOk(status)) {
    const errorMsg = RequestUtils.getHttpErrorMessage(status)
    RequestUtils.handleShowError(errorMsg, config.showError !== false)
    throw new Error(errorMsg)
  }

  if (!isBusinessEnvelope(data)) {
    return config.returnFullResponse ? { ...response, data } : data
  }

  if (data.code === 0 || data.code === 200) {
    return config.returnFullResponse ? { ...response, data } : data
  }

  const errorMsg = data.message || data.msg || '请求失败'
  if (data.code === 401 || data.code === 403) {
    handleUnauthorized(errorMsg)
  }

  RequestUtils.handleShowError(errorMsg, config.showError !== false)
  const error = new Error(errorMsg)
  error.code = data.code
  error.response = { ...response, data }
  throw error
}

// ==================== 10. 响应拦截器 ====================
axiosInstance.interceptors.response.use(
  (response) => {
    const config = response.config

    // 1. 移除已完成的请求
    if (config._requestKey) {
      requestManager.removeRequest(config._requestKey)
    }

    // 2. 记录响应时间
    if (config.metadata?.startTime) {
      const duration = Date.now() - config.metadata.startTime
      logger.log(`请求完成: ${config.method?.toUpperCase()} ${config.url} [${duration}ms]`)
    }

    try {
      return resolveResponseData(response)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  (error) => {
    // 1. 移除失败的请求
    if (error.config?._requestKey) {
      requestManager.removeRequest(error.config._requestKey)
    }

    // 2. 请求被取消
    if (axios.isCancel(error) || error.name === 'AbortError') {
      logger.warn('请求已取消:', error.config?.url)
      return Promise.reject(error)
    }

    // 3. 响应错误
    if (error.response) {
      const { status, data } = error.response
      let errorMessage = RequestUtils.getHttpErrorMessage(status)

      // 优先使用后端返回的错误信息
      if (data && typeof data === 'object') {
        errorMessage = data.message || data.msg || errorMessage
      }

      // 401/403 特殊处理
      if (status === 401 || status === 403) {
        handleUnauthorized(errorMessage)
      }

      RequestUtils.handleShowError(errorMessage, error.config?.showError !== false)

      const customError = new Error(errorMessage)
      customError.status = status
      customError.response = error.response
      return Promise.reject(customError)
    }

    // 4. 网络错误
    if (error.request) {
      const errorMessage = RequestUtils.getNetworkErrorMessage(error.code)
      RequestUtils.handleShowError(errorMessage, error.config?.showError !== false)
      return Promise.reject(new Error(errorMessage))
    }

    // 5. 其他错误
    const errorMessage = error.message || '请求配置错误'
    RequestUtils.handleShowError(errorMessage, error.config?.showError !== false)
    return Promise.reject(error)
  }
)

// ==================== 11. 文件下载处理 ====================
class DownloadHandler {
  static async handleDownload(response, fileName) {
    try {
      const blob = response.data

      if (!RequestUtils.isBlob(blob)) {
        throw new Error('响应数据不是 Blob 类型')
      }

      // 尝试从响应头获取文件名
      const headerFileName = RequestUtils.getFileNameFromResponse(response)
      const finalFileName = fileName || headerFileName || `download_${Date.now()}`

      // 触发下载
      RequestUtils.triggerDownload(blob, finalFileName)

      logger.info('文件下载成功:', finalFileName)
      return { success: true, fileName: finalFileName, blob }
    } catch (error) {
      logger.error('文件下载失败:', error)
      throw error
    }
  }
}

// ==================== 高级功能：并发控制与重试 ====================
class RequestEnhancer {
  // 并发控制
  static async runWithConcurrency(tasks, concurrency = CONFIG.DEFAULT_CONCURRENCY) {
    const results = []
    const executing = []

    for (const task of tasks) {
      const promise = Promise.resolve().then(() => (typeof task === 'function' ? task() : task))
      results.push(promise)

      if (concurrency <= tasks.length) {
        const executingPromise = promise.then(() => executing.splice(executing.indexOf(executingPromise), 1))
        executing.push(executingPromise)

        if (executing.length >= concurrency) {
          await Promise.race(executing)
        }
      }
    }

    return Promise.all(results)
  }

  // 重试机制
  static async retry(fn, attempts = CONFIG.RETRY_ATTEMPTS, delay = CONFIG.RETRY_DELAY) {
    let lastError

    for (let i = 0; i < attempts; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error

        // 最后一次尝试不延迟
        if (i < attempts - 1) {
          logger.warn(`请求失败，第 ${i + 1}/${attempts} 次重试...`)
          await RequestUtils.delay(delay * (i + 1)) // 指数退避
        }
      }
    }

    logger.error(`请求失败，已重试 ${attempts} 次`)
    throw lastError
  }

  // 超时控制
  static withTimeout(promise, timeout = CONFIG.TIMEOUT) {
    return Promise.race([
      promise,
      new Promise((_, reject) => globalThis.setTimeout(() => reject(new Error('请求超时')), timeout)),
    ])
  }
}

// ==================== 12. 封装请求方法 ====================
const request = {
  // ===== 配置管理 =====
  setBaseURL,
  setDefaultHeaders,
  setAxiosInstance,
  setTimeout,

  // 获取配置
  getConfig: () => ({ ...CONFIG }),

  // 请求管理
  cancelAllRequests: () => requestManager.clearAllRequests(),
  getActiveRequestCount: () => requestManager.getActiveCount(),

  // ===== 加密配置 =====

  /**
   * 配置 AES 加密
   * @param {string} key - AES 密钥（16/24/32 字符）
   * @example
   * request.configureAES('1234567890123456')
   */
  configureAES(key) {
    encryptionConfig.configureAES(key)
    return this
  },

  /**
   * 配置 RSA 加密
   * @param {string} publicKey - RSA 公钥
   * @param {string} privateKey - RSA 私钥（可选，用于解密响应）
   * @example
   * request.configureRSA(PUBLIC_KEY, PRIVATE_KEY)
   */
  configureRSA(publicKey, privateKey) {
    encryptionConfig.configureRSA(publicKey, privateKey)
    return this
  },

  /**
   * 配置混合加密（推荐：兼顾安全性和性能）
   * @param {string} rsaPublicKey - RSA 公钥
   * @param {string} rsaPrivateKey - RSA 私钥（可选）
   * @example
   * request.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)
   */
  configureHybrid(rsaPublicKey, rsaPrivateKey) {
    encryptionConfig.configureHybrid(rsaPublicKey, rsaPrivateKey)
    return this
  },

  /**
   * 禁用加密
   * @example
   * request.disableEncryption()
   */
  disableEncryption() {
    encryptionConfig.disable()
    return this
  },

  /**
   * 启用加密
   * @example
   * request.enableEncryption()
   */
  enableEncryption() {
    encryptionConfig.enabled = true
    return this
  },

  /**
   * 获取加密配置
   * @returns {object} 加密配置对象
   */
  getEncryptionConfig() {
    return {
      enabled: encryptionConfig.enabled,
      mode: encryptionConfig.mode,
      encryptRequest: encryptionConfig.encryptRequest,
      encryptResponse: encryptionConfig.encryptResponse,
    }
  },

  /**
   * 设置是否加密请求
   * @param {boolean} enabled
   */
  setEncryptRequest(enabled) {
    encryptionConfig.encryptRequest = enabled
    return this
  },

  /**
   * 设置是否加密响应
   * @param {boolean} enabled
   */
  setEncryptResponse(enabled) {
    encryptionConfig.encryptResponse = enabled
    return this
  },

  // ===== 基础请求方法 =====

  /**
   * GET 请求
   * @param {string} url - 请求地址
   * @param {object} params - 查询参数
   * @param {object} config - axios 配置
   */
  get(url, params = {}, config = {}) {
    return axiosInstance.request({
      method: 'GET',
      url,
      params,
      ...config,
    })
  },

  /**
   * POST 请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求体数据
   * @param {object} config - axios 配置
   */
  post(url, data = {}, config = {}) {
    return axiosInstance.request({
      method: 'POST',
      url,
      data,
      ...config,
    })
  },

  /**
   * PUT 请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求体数据
   * @param {object} config - axios 配置
   */
  put(url, data = {}, config = {}) {
    return axiosInstance.request({
      method: 'PUT',
      url,
      data,
      ...config,
    })
  },

  /**
   * DELETE 请求
   * @param {string} url - 请求地址
   * @param {object} params - 查询参数
   * @param {object} config - axios 配置
   */
  delete(url, params = {}, config = {}) {
    return axiosInstance.request({
      method: 'DELETE',
      url,
      params,
      ...config,
    })
  },

  /**
   * PATCH 请求
   * @param {string} url - 请求地址
   * @param {object} data - 请求体数据
   * @param {object} config - axios 配置
   */
  patch(url, data = {}, config = {}) {
    return axiosInstance.request({
      method: 'PATCH',
      url,
      data,
      ...config,
    })
  },

  // ===== 特殊请求方法 =====

  /**
   * 表单请求 (application/x-www-form-urlencoded)
   * @param {string} url - 请求地址
   * @param {object} data - 表单数据
   * @param {object} config - axios 配置
   */
  form(url, data = {}, config = {}) {
    return axiosInstance.request({
      method: 'POST',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(config.headers || {}),
      },
      ...config,
    })
  },

  /**
   * 文件上传
   * @param {string} url - 上传地址
   * @param {FormData|object} data - 文件数据或普通对象（会自动转为 FormData）
   * @param {object} config - axios 配置
   * @param {function} config.onProgress - 上传进度回调
   */
  upload(url, data, config = {}) {
    let formData = data

    // 如果传入的不是 FormData，则转换
    if (!RequestUtils.isFormData(data)) {
      formData = new FormData()
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }

    const onUploadProgress = config.onProgress || config.onUploadProgress

    return axiosInstance.request({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config.headers || {}),
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onUploadProgress({
            percent,
            loaded: progressEvent.loaded,
            total: progressEvent.total,
          })
        }
      },
      ...config,
    })
  },

  /**
   * 文件下载
   * @param {string} url - 下载地址
   * @param {object} params - 查询参数
   * @param {string} fileName - 保存的文件名
   * @param {object} config - axios 配置
   * @param {function} config.onProgress - 下载进度回调
   */
  async download(url, params, fileName, config) {
    const safeConfig = config ?? {}
    const safeParams = params ?? {}
    const onDownloadProgress = safeConfig.onProgress || safeConfig.onDownloadProgress

    const response = await axiosInstance.request({
      method: 'GET',
      url,
      params: safeParams,
      responseType: 'blob',
      returnFullResponse: true, // 需要完整响应以获取 headers
      onDownloadProgress: (progressEvent) => {
        if (onDownloadProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onDownloadProgress({
            percent,
            loaded: progressEvent.loaded,
            total: progressEvent.total,
          })
        }
      },
      ...safeConfig,
    })

    return DownloadHandler.handleDownload(response, fileName)
  },

  /**
   * 自定义请求
   * @param {string} method - 请求方法
   * @param {string} url - 请求地址
   * @param {object} data - 请求体数据
   * @param {object} params - 查询参数
   * @param {object} config - axios 配置
   */
  custom(method, url, data = {}, params = {}, config = {}) {
    return axiosInstance.request({
      method: method.toUpperCase(),
      url,
      data,
      params,
      ...config,
    })
  },

  /**
   * 通用请求方法
   * @param {object} config - axios 配置
   */
  request(config) {
    return axiosInstance.request(config)
  },

  // ===== 高级功能 =====

  /**
   * 并行请求（支持并发控制）
   * @param {Array} requests - 请求数组（可以是函数、配置对象或参数数组）
   * @param {number} concurrency - 并发数
   */
  parallel(requests = [], concurrency = CONFIG.DEFAULT_CONCURRENCY) {
    const tasks = requests.map((req) => {
      if (typeof req === 'function') {
        return req
      }
      if (req.method && req.url) {
        return () => axiosInstance.request(req)
      }
      if (Array.isArray(req)) {
        const [method, url, data, config] = req
        return () => axiosInstance.request({ method, url, data, ...config })
      }
      throw new Error('无效的请求描述符')
    })

    return RequestEnhancer.runWithConcurrency(tasks, concurrency)
  },

  /**
   * 串行请求
   * @param {Array} requests - 请求数组
   */
  async series(requests = []) {
    const results = []

    for (const req of requests) {
      try {
        let result

        if (typeof req === 'function') {
          result = await req()
        } else if (req.method && req.url) {
          result = await axiosInstance.request(req)
        } else if (Array.isArray(req)) {
          const [method, url, data, config] = req
          result = await axiosInstance.request({ method, url, data, ...config })
        } else {
          throw new Error('无效的请求描述符')
        }

        results.push(result)
      } catch (error) {
        logger.error('串行请求失败:', error)
        throw error
      }
    }

    return results
  },

  /**
   * 重试请求
   * @param {function} fn - 返回 Promise 的函数
   * @param {number} attempts - 重试次数
   * @param {number} delay - 重试延迟（毫秒）
   */
  retry(fn, attempts = CONFIG.RETRY_ATTEMPTS, delay = CONFIG.RETRY_DELAY) {
    return RequestEnhancer.retry(fn, attempts, delay)
  },

  /**
   * 获取底层 axios 实例（用于高级定制）
   */
  axios: () => axiosInstance,
}

// ==================== 导出 ====================
export default request

// 导出工具类（可选）
export { RequestUtils, RequestManager, DownloadHandler, RequestEnhancer, EncryptionConfig, EncryptionHandler }
