import qs from 'qs'
import { useState, useEffect, useCallback, useRef } from 'react'
import { showMessage } from '@src/utils/message'
import { getEnv } from '@utils/env'

// ==================== 工具函数 ====================
const addTimestampSuffix = (params = {}) => ({
  ...params,
  _: Date.now()
})

// ==================== 1. 配置常量 ====================
const CONFIG = {
  BASE_URL: getEnv('APP_BASE_URL', ''),
  TIMEOUT: 20000,
  HEADERS: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

// ==================== 2. 错误处理 ====================
const HTTP_STATUS_MSG = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求资源不存在',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  default: '请求失败'
}

class HttpClient {
  constructor (config = {}) {
    this.config = { ...CONFIG, ...config }
    this.interceptors = {
      request: [],
      response: []
    }

    // 添加默认请求拦截器：为 GET/DELETE 请求添加时间戳防止缓存
    this.useRequestInterceptor((config) => {
      if (config.addTimestamp !== false && (config.method === 'GET' || config.method === 'DELETE')) {
        config.params = addTimestampSuffix(config.params || {})
      }
      return config
    })
  }

  // 注册请求拦截器
  useRequestInterceptor (handler) {
    this.interceptors.request.push(handler)
  }

  // 注册响应拦截器
  useResponseInterceptor (handler) {
    this.interceptors.response.push(handler)
  }

  // 核心请求方法
  async request (url, options = {}) {
    let config = {
      url,
      method: 'GET',
      headers: { ...this.config.HEADERS },
      timeout: this.config.TIMEOUT,
      baseURL: this.config.BASE_URL,
      isShowError: true,
      ...options
    }

    // 1. 执行请求拦截器
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config)
    }

    // 2. 处理 URL 和参数
    const fullUrl = this._buildUrl(config)
    const fetchOptions = this._buildOptions(config)

    // 3. 超时控制
    const controller = config.controller || new AbortController()
    const { signal } = controller
    const timeoutId = setTimeout(() => controller.abort(), config.timeout)

    try {
      const response = await fetch(fullUrl, { ...fetchOptions, signal })
      clearTimeout(timeoutId)

      // 4. 处理响应数据
      let result = await this._handleResponseData(response, config)

      // 5. 执行响应拦截器
      for (const interceptor of this.interceptors.response) {
        result = await interceptor(result, config)
      }

      return result
    } catch (error) {
      clearTimeout(timeoutId)
      return this._handleError(error, config)
    }
  }

  // ===== 辅助方法 =====

  _buildUrl (config) {
    let { url, baseURL, params } = config
    if (baseURL && !url.startsWith('http')) {
      url = `${baseURL}${url}`
    }

    if (params) {
      const queryString = qs.stringify(params, { addQueryPrefix: true })
      url += queryString
    }
    return url
  }

  _buildOptions (config) {
    const { method, headers, payload, body } = config
    const options = { method, headers }

    if (body) {
      options.body = body
    } else if (payload) {
      if (headers['Content-Type']?.includes('application/json')) {
        options.body = JSON.stringify(payload)
      } else {
        options.body = payload
      }
    }
    return options
  }

  async _handleResponseData (response, config) {
    if (!response.ok) {
      const error = new Error(response.statusText || HTTP_STATUS_MSG[response.status] || HTTP_STATUS_MSG.default)
      error.status = response.status
      error.response = response
      throw error
    }

    const contentType = response.headers.get('Content-Type') || ''

    if (
      config.responseType === 'blob' ||
      contentType.includes('application/vnd.ms-excel') ||
      contentType.includes('application/octet-stream')
    ) {
      return response.blob()
    }

    if (contentType.includes('application/json')) {
      const data = await response.json()
      // 业务状态码检查 (参考原 fetch.js 逻辑)
      if (data.code !== undefined && data.code !== 0 && data.code !== 200) {
        if (data.code === 41002) {
          // 项目使用 createHashRouter，必须使用 hash 跳转
          try {
            window.location.hash = '#/signin'
          } catch (e) {
            console.warn('跳转登录页失败，尝试使用 location.href:', e)
            window.location.href = '#/signin'
          }
        }
        throw new Error(data.message || `Error Code: ${data.code}`)
      }
      return data
    }

    return response.text()
  }

  _handleError (error, config) {
    const isShowError = config.isShowError !== false
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

  get (url, params = {}, config = {}) {
    return this.request(url, { ...config, method: 'GET', params })
  }

  post (url, payload = {}, config = {}) {
    return this.request(url, { ...config, method: 'POST', payload })
  }

  put (url, payload = {}, config = {}) {
    return this.request(url, { ...config, method: 'PUT', payload })
  }

  delete (url, params = {}, config = {}) {
    return this.request(url, { ...config, method: 'DELETE', params })
  }

  patch (url, payload = {}, config = {}) {
    return this.request(url, { ...config, method: 'PATCH', payload })
  }

  // 文件上传
  upload (url, formData, config = {}) {
    return this.request(url, {
      ...config,
      method: 'POST',
      body: formData,
      headers: {
        // Fetch 会自动设置 multipart/form-data 的 boundary，所以这里删除 Content-Type
        ...config.headers,
        'Content-Type': undefined
      }
    })
  }

  // 文件下载 (支持进度)
  async download (url, fileName, params = {}, config = {}) {
    const fullUrl = this._buildUrl({ url, baseURL: this.config.BASE_URL, params })
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: { ...this.config.HEADERS, ...config.headers }
    })

    if (!response.ok) throw new Error(`Download failed: ${response.statusText}`)

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
          percent: Math.round((receivedLength / contentLength) * 100)
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
  async retry (fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn()
      } catch (error) {
        if (i === retries - 1) throw error
        await new Promise((r) => setTimeout(r, delay))
      }
    }
  }

  // 并发控制 (简单实现)
  parallel (tasks) {
    return Promise.all(tasks.map((task) => (typeof task === 'function' ? task() : this.request(task.url, task))))
  }
}

// 创建默认 HTTP 客户端实例
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
          controller
        })
        setData(res)
        return res
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setLoading(false)
        abortControllerRef.current = null
      }
    },
    [url]
  )

  useEffect(() => {
    fetchData()
    return () => {
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
