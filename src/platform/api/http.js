import qs from 'qs'
import { useState, useEffect, useCallback, useRef } from 'react'
import { showMessage } from '@platform/feedback/message'
import { getEnv } from '@platform/config/env'
import { EncryptionConfig, EncryptionHandler, isFormData } from './core/encryption'
import { retry, runWithConcurrency } from './core/async'
import { assertSuccessfulPayload, RequestError, getHttpErrorMessage } from './core/response'
import {
  readStoredToken,
  readEnterpriseSession,
  getRequestIdentity,
  handleAuthenticationFailure,
} from '@platform/auth/model/session'
export { EncryptionConfig, EncryptionHandler } from './core/encryption'
import logger from '@platform/telemetry/logger'

// ==================== 工具函数 ====================
const addTimestampSuffix = (params = {}) => ({
  ...params,
  _: Date.now(),
})

export const encryptionConfig = new EncryptionConfig()

// ==================== 1. 配置常量 ====================
const CONFIG = {
  BASE_URL: getEnv('APP_BASE_URL', ''),
  TIMEOUT: 20000,
  HEADERS: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}

// ==================== 2. 错误处理 ====================
class HttpClient {
  constructor(config = {}) {
    this.config = { ...CONFIG, ...config }
    this.interceptors = {
      request: [],
      response: [],
    }

    // 添加默认请求拦截器
    this.useRequestInterceptor((config) => {
      // 1. 处理加密
      if (encryptionConfig.enabled && config.encrypt !== false) {
        // A. 处理 Body 加密 (POST/PUT/PATCH 等)
        if (config.payload || config.body) {
          const dataToEncrypt = config.payload || config.body
          try {
            const encrypted = EncryptionHandler.encryptRequestData(
              dataToEncrypt,
              encryptionConfig,
              config.encryptFields
            )
            if (encrypted && encrypted !== dataToEncrypt) {
              config.payload = encrypted
              // 确保 payload 生效，清除 body
              if (config.body) config.body = undefined

              // 如果是全量加密（没有指定 partial fields），添加 header
              if (!config.encryptFields || config.encryptFields.length === 0) {
                config.headers = {
                  ...config.headers,
                  [encryptionConfig.encryptionHeader]: encryptionConfig.mode,
                }
              }
            }
          } catch (error) {
            if (config.throwOnEncryptError !== false) throw error
          }
        }

        // B. 处理 Params 加密 (GET/DELETE 等)
        if (config.params && Object.keys(config.params).length > 0) {
          try {
            // 复用 encryptRequestData 逻辑（支持全量和部分）
            const encryptedParams = EncryptionHandler.encryptRequestData(
              config.params,
              encryptionConfig,
              config.encryptFields
            )
            if (encryptedParams && encryptedParams !== config.params) {
              config.params = encryptedParams
              // 注意：Fetch/Axios 处理 params 对象时，如果变成 { encrypted: '...' } 形式，会自动序列化为 ?encrypted=...
            }
          } catch (error) {
            if (config.throwOnEncryptError !== false) throw error
          }
        }
      }

      // 2. 为 GET/DELETE 请求添加时间戳防止缓存
      if (config.addTimestamp !== false && (config.method === 'GET' || config.method === 'DELETE')) {
        config.params = addTimestampSuffix(config.params || {})
      }
      return config
    })
  }

  // 注册请求拦截器
  useRequestInterceptor(handler) {
    this.interceptors.request.push(handler)
  }

  // 注册响应拦截器
  useResponseInterceptor(handler) {
    this.interceptors.response.push(handler)
  }

  // 核心请求方法
  async request(url, options = {}) {
    let config = {
      url,
      method: 'GET',
      timeout: this.config.TIMEOUT,
      baseURL: this.config.BASE_URL,
      isShowError: true,
      ...options,
      headers: { ...this.config.HEADERS, ...options.headers },
    }
    if (
      config.needToken !== false &&
      !Object.keys(config.headers).some((key) => key.toLowerCase() === 'authorization')
    ) {
      const token = readStoredToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      const enterprise = readEnterpriseSession()
      if (enterprise) config.headers['X-Tenant-ID'] = enterprise.tenantId
    }

    // 1. 执行请求拦截器
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config)
    }
    config._sessionIdentity = getRequestIdentity(
      Object.entries(config.headers).find(([key]) => key.toLowerCase() === 'authorization')?.[1]
    )

    // 2. 处理 URL 和参数
    const fullUrl = this._buildUrl(config)
    const fetchOptions = this._buildOptions(config)

    // 3. 超时控制
    const controller = config.controller || new AbortController()
    const signal = config.signal ? AbortSignal.any([controller.signal, config.signal]) : controller.signal
    const timeoutId = setTimeout(() => controller.abort(), config.timeout)

    try {
      const response = await fetch(fullUrl, { ...fetchOptions, signal })
      // 4. 处理响应数据
      let result = await this._handleResponseData(response, config)

      // 5. 执行响应拦截器
      for (const interceptor of this.interceptors.response) {
        result = await interceptor(result, config)
      }

      return result
    } catch (error) {
      return this._handleError(error, config)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  // ===== 辅助方法 =====

  _buildUrl(config) {
    let { url, baseURL, params } = config
    if (baseURL && !url.startsWith('http')) {
      url = `${baseURL}${url}`
    }

    if (params) {
      const queryString = qs.stringify(params, { addQueryPrefix: true })
      url += url.includes('?') ? queryString.replace(/^\?/, '&') : queryString
    }
    return url
  }

  _buildOptions(config) {
    const { method, headers, payload, body } = config
    const cleanHeaders = Object.fromEntries(Object.entries(headers).filter(([, value]) => value !== undefined))
    if (isFormData(body) || isFormData(payload)) {
      for (const key of Object.keys(cleanHeaders)) if (key.toLowerCase() === 'content-type') delete cleanHeaders[key]
    }
    const options = { method, headers: cleanHeaders, credentials: config.credentials || 'same-origin' }

    if (body !== undefined) {
      options.body = body
    } else if (payload !== undefined) {
      if (headers['Content-Type']?.includes('application/json')) {
        options.body = JSON.stringify(payload)
      } else {
        options.body = payload
      }
    }
    return options
  }

  async _handleResponseData(response, config) {
    if (!response.ok) {
      const error = new RequestError(getHttpErrorMessage(response.status), response.status, undefined, response)
      throw error
    }

    if (config.responseType === 'raw') return response
    if (response.status === 204 || response.status === 205) return undefined
    const contentType = response.headers.get('Content-Type') || ''

    if (
      config.responseType === 'blob' ||
      contentType.includes('application/vnd.ms-excel') ||
      contentType.includes('application/octet-stream')
    ) {
      return response.blob()
    }

    if (contentType.includes('application/json')) {
      let data = await response.json()

      // 尝试解密响应数据
      if (encryptionConfig.enabled && config.decrypt !== false) {
        const isEncrypted = response.headers.get(encryptionConfig.encryptionHeader) || data.encrypted
        if (isEncrypted) {
          try {
            data = EncryptionHandler.decryptResponseData(data, encryptionConfig)
          } catch (error) {
            if (config.throwOnDecryptError !== false) throw error
          }
        }
      }

      assertSuccessfulPayload(data, response.status)
      return data
    }

    return response.text()
  }

  _handleError(error, config) {
    if (config.needToken !== false) handleAuthenticationFailure(error.status, error.code, config._sessionIdentity)
    const isShowError = config.isShowError !== false && config.showError !== false
    let errorMsg = error.message

    if (error.name === 'AbortError') {
      errorMsg = '请求超时或被取消'
    } else if (error.message === 'Failed to fetch') {
      errorMsg = '网络连接失败'
    }

    if (isShowError) {
      showMessage.error(errorMsg)
    }

    throw error
  }

  // ===== 常用方法封装 =====

  get(url, params = {}, config = {}) {
    return this.request(url, { ...config, method: 'GET', params })
  }

  post(url, payload = {}, config = {}) {
    return this.request(url, { ...config, method: 'POST', payload })
  }

  put(url, payload = {}, config = {}) {
    return this.request(url, { ...config, method: 'PUT', payload })
  }

  delete(url, params = {}, config = {}) {
    return this.request(url, { ...config, method: 'DELETE', params })
  }

  patch(url, payload = {}, config = {}) {
    return this.request(url, { ...config, method: 'PATCH', payload })
  }

  // 文件上传
  upload(url, formData, config = {}) {
    return this.request(url, {
      ...config,
      method: 'POST',
      body: formData,
      headers: {
        // Fetch 会自动设置 multipart/form-data 的 boundary，所以这里删除 Content-Type
        ...config.headers,
        'Content-Type': undefined,
      },
    })
  }

  /**
   * 下载文件 (支持进度)
   * @param {string} url - 下载地址
   * @param {string} [fileName] - 文件名 (可选)
   * @param {object} [params] - 查询参数
   * @param {object} [config] - 其他 Fetch 配置
   */
  async download(url, fileName, params = {}, config = {}) {
    const response = await this.request(url, { ...config, method: 'GET', params, responseType: 'raw' })

    const reader = response.body.getReader()
    const contentLength = +response.headers.get('Content-Length')
    let receivedLength = 0
    const chunks = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      receivedLength += value.length

      if (config.onProgress && contentLength) {
        config.onProgress({
          loaded: receivedLength,
          total: contentLength,
          percent: Math.round((receivedLength / contentLength) * 100),
        })
      }
    }

    const blob = new Blob(chunks)

    // 提取文件名
    let finalFileName = fileName
    if (!finalFileName) {
      const disposition = response.headers.get('content-disposition')
      if (disposition) {
        finalFileName = decodeURI(disposition.split('filename=')[1]?.replace(/['"]/g, '') || '')
      }
    }
    finalFileName = finalFileName || `download_${Date.now()}`

    // 触发下载
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = finalFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)

    return blob
  }

  // ===== 高级功能 =====

  // 重试
  retry(task, attempts = 3, delayMs = 1000) {
    return retry(task, attempts, delayMs)
  }
  parallel(tasks, concurrency = 5) {
    return runWithConcurrency(
      tasks.map((task) => () => (typeof task === 'function' ? task() : this.request(task.url, task))),
      concurrency
    )
  }
}

// 创建默认 HTTP 客户端实例
export { HttpClient }
export const http = new HttpClient()

// ==================== React Hooks ====================

/**
 * useRequest Hook - 通用请求 Hook
 * @param {string} url - 请求地址
 * @param {object} options - 请求配置项
 * @returns {[any, boolean, Error|null, Function]} [data, loading, error, refetch]
 */
export const useRequest = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const abortControllerRef = useRef(null)
  const optionsRef = useRef(options)

  // 更新 options ref，避免 useEffect 依赖 options 对象导致死循环
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      // 取消上一次请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const controller = new AbortController()
      abortControllerRef.current = controller

      setLoading(true)
      setError(null)

      try {
        const res = await http.request(url, {
          ...optionsRef.current,
          ...overrideOptions,
          controller,
        })
        if (abortControllerRef.current === controller && !controller.signal.aborted) setData(res)
        return res
      } catch (err) {
        if (abortControllerRef.current === controller && err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setLoading(false)
          abortControllerRef.current = null
        }
      }
    },
    [url]
  )

  useEffect(() => {
    let active = true
    queueMicrotask(() => {
      if (active) fetchData()
    })
    return () => {
      active = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  return [data, loading, error, fetchData]
}

export const useGet = (url, options) => useRequest(url, { ...options, method: 'GET' })
export const usePost = (url, options) => useRequest(url, { ...options, method: 'POST' })
export const usePut = (url, options) => useRequest(url, { ...options, method: 'PUT' })
export const useDelete = (url, options) => useRequest(url, { ...options, method: 'DELETE' })
export const usePatch = (url, options) => useRequest(url, { ...options, method: 'PATCH' })

export default http
