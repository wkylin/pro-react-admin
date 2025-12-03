import axios from 'axios'
import qs from 'qs'
import { showMessage } from '@src/utils/message'
// import { authService } from '@src/service/authService' // 移除以避免循环依赖
import logger from '../utils/logger'

// ==================== 1. 配置常量 ====================
const CONFIG = {
  BASE_URL: process.env.APP_BASE_URL || '',
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

// ==================== 3. 请求管理 ====================
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
    return new Promise((resolve) => setTimeout(resolve, ms))
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
      console.error('消息提示失败:', e, message)
    }
  }

  // 从响应头获取文件名
  static getFileNameFromResponse(response) {
    const contentDisposition = response.headers['content-disposition']
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (match && match[1]) {
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
  axiosInstance.defaults.headers = { ...axiosInstance.defaults.headers, ...headers }
  logger.info('默认请求头已更新:', headers)
}

export function setTimeout(timeout) {
  CONFIG.TIMEOUT = timeout
  axiosInstance.defaults.timeout = timeout
  logger.info('请求超时时间已更新:', timeout)
}

// ==================== 9. 请求拦截器 ====================
axiosInstance.interceptors.request.use(
  (config) => {
    // 确保 headers 存在
    if (!config.headers) config.headers = {}

    // 1. 请求去重处理
    if (config.cancelDuplicate !== false) {
      const { requestKey, controller } = requestManager.cancelDuplicateRequest(config)
      config.signal = controller.signal
      config._requestKey = requestKey
    }

    // 2. 为 GET/DELETE 请求添加时间戳防止缓存
    if (
      (config.method?.toUpperCase() === 'GET' || config.method?.toUpperCase() === 'DELETE') &&
      config.addTimestamp !== false
    ) {
      config.params = RequestUtils.addTimestampSuffix(config.params)
      logger.log('已添加时间戳参数')
    }

    // 3. Authorization 处理
    if (!config.headers.Authorization && config.needToken !== false) {
      // 直接从 localStorage 获取 token，避免循环依赖
      let token = null
      try {
        const tokenData = localStorage.getItem('github_token')
        if (tokenData) {
          token = JSON.parse(tokenData).token
        }
      } catch (e) {
        logger.warn('读取 token 失败', e)
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        logger.log('已添加 Authorization:', `Bearer ${token.substring(0, 20)}...`)
      }
    }

    // 4. 处理请求数据格式
    const contentType = config.headers['Content-Type'] || config.headers['content-type']

    // FormData: 删除 Content-Type 让浏览器自动设置
    if (RequestUtils.isFormData(config.data)) {
      delete config.headers['Content-Type']
      logger.log('检测到 FormData，已删除 Content-Type')
    }
    // application/x-www-form-urlencoded: 序列化对象
    else if (contentType === 'application/x-www-form-urlencoded' && config.data && typeof config.data === 'object') {
      config.data = qs.stringify(config.data, { arrayFormat: 'brackets' })
      logger.log('表单数据已序列化')
    }

    // 5. 添加请求时间戳（用于性能监控）
    config.metadata = { startTime: Date.now() }

    // 6. 添加自定义标识
    if (config.requestId) {
      config.headers['X-Request-ID'] = config.requestId
    }

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
  localStorage.removeItem('token')
  localStorage.removeItem('github_token')
  localStorage.removeItem('github_user')

  // 延迟跳转，确保消息显示
  setTimeout(() => {
    if (window.location.pathname !== '/signin') {
      window.location.href = '/signin'
    }
  }, 500)

  logger.warn('用户未授权，已清除登录信息')
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

    // 3. 处理 Blob 类型响应（文件下载）
    if (config.responseType === 'blob') {
      return response
    }

    // 4. 统一响应格式处理
    const { data, status } = response

    // HTTP 状态码检查
    if (status >= 200 && status < 300) {
      // 后端使用统一格式 { code, data, message }
      if (data && typeof data === 'object' && 'code' in data) {
        // 业务成功
        if (data.code === 0 || data.code === 200) {
          return config.returnFullResponse ? response : data
        }

        // 业务失败
        const errorMsg = data.message || data.msg || '请求失败'

        // 特殊业务码处理
        if (data.code === 401 || data.code === 403) {
          handleUnauthorized(errorMsg)
        }

        RequestUtils.handleShowError(errorMsg, config.showError !== false)

        const error = new Error(errorMsg)
        error.code = data.code
        error.response = response
        return Promise.reject(error)
      }

      // 返回原始数据
      return config.returnFullResponse ? response : data
    }

    // HTTP 状态码异常
    const errorMsg = RequestUtils.getHttpErrorMessage(status)
    RequestUtils.handleShowError(errorMsg, config.showError !== false)
    return Promise.reject(new Error(errorMsg))
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
    return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时')), timeout))])
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
  async download(url, params = {}, fileName, config = {}) {
    const onDownloadProgress = config.onProgress || config.onDownloadProgress

    const response = await axiosInstance.request({
      method: 'GET',
      url,
      params,
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
      ...config,
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
export { RequestUtils, RequestManager, DownloadHandler, RequestEnhancer }
