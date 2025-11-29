import axios from 'axios'
import qs from 'qs'
import { showMessage } from '@src/utils/message'
import { authService } from '@src/service/authService'
import logger from '../utils/logger' // 相对引入更稳妥

// 全局可配置项
const globalConfig = {
  baseURL: process.env.APP_BASE_URL || '',
  timeout: 60000,
  withCredentials: true,
  defaultHeaders: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}

// 创建 axios 实例（会在 setBaseUrl 时更新）
let service = axios.create({
  baseURL: globalConfig.baseURL,
  timeout: globalConfig.timeout,
  withCredentials: globalConfig.withCredentials,
  headers: { ...globalConfig.defaultHeaders },
})

// allow replacing axios instance (for testing or advanced customization)
export function setAxiosInstance(instance) {
  service = instance
}

export function setBaseURL(url) {
  globalConfig.baseURL = url
  service.defaults.baseURL = url
}

export function setDefaultHeaders(headers) {
  service.defaults.headers = { ...service.defaults.headers, ...headers }
}

// 内部：标准化错误显示
function handleShowError(errorMessage, showError = true) {
  if (!showError) return
  try {
    showMessage.error(errorMessage)
  } catch (e) {
    // fallback to console
    console.error('showMessage failed:', e, errorMessage)
  }
}

// 请求拦截器：加入 token 与序列化等通用逻辑
service.interceptors.request.use(
  (config) => {
    // Authorization 处理
    if (!config.headers) config.headers = {}
    if (!config.headers.Authorization) {
      const needToken = config.needToken !== false
      if (needToken) {
        const token = authService.getToken()
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
          logger.log('自动添加 token:', token)
        }
      }
    } else {
      logger.log('使用自定义 Authorization:', config.headers.Authorization)
    }

    // form 序列化
    const contentType = config.headers['Content-Type'] || config.headers['content-type']
    if (contentType === 'application/x-www-form-urlencoded' && config.data && typeof config.data === 'object') {
      config.data = qs.stringify(config.data)
      logger.log('序列化 form 数据')
    }

    // FormData 不要覆盖 Content-Type
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => {
    logger.error('请求拦截器错误', error)
    handleShowError('请求发送失败: ' + (error.message || '未知错误'), error.config?.showError !== false)
    return Promise.reject(error)
  }
)

// 响应处理 helper（统一处理 status + code）
function normalizeResponse(response, config = {}) {
  if (response.config && response.config.responseType === 'blob') {
    return response
  }
  // axios 默认将 response.status 包装；部分后端返回 { code, data }
  if (response.status === 200) {
    const res = response.data
    // 如果后端有 code 约定
    if (res && typeof res === 'object' && 'code' in res) {
      if (res.code === 0) return res
      // 特殊处理 401
      if (res.code === 401) {
        authService.logout()
        localStorage.removeItem('token')
        window.location.href = '/signin'
      }
      handleShowError(res.message || '请求失败', config.showError !== false)
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  }
  return Promise.reject(new Error(`HTTP ${response.status}`))
}

function handleAxiosError(error, config = {}) {
  let errorMessage = '请求失败'
  if (error.response) {
    switch (error.response.status) {
      case 401:
        errorMessage = '未授权，请重新登录'
        localStorage.removeItem('token')
        window.location.href = '/signin'
        break
      case 403:
        errorMessage = '没有权限访问'
        break
      case 404:
        errorMessage = '请求资源不存在'
        break
      case 500:
        errorMessage = '服务器错误'
        break
      case 502:
        errorMessage = '网关错误'
        break
      case 503:
        errorMessage = '服务不可用'
        break
      case 504:
        errorMessage = '网关超时'
        break
      default:
        errorMessage = `未知错误: ${error.response.status}`
    }
  } else if (error.request) {
    if (error.code === 'ECONNABORTED') errorMessage = '请求超时'
    else errorMessage = '网络连接异常'
  } else {
    errorMessage = error.message || '请求配置错误'
  }

  handleShowError(errorMessage, config.showError !== false)
  return Promise.reject(error)
}

// 创建可取消的请求（返回 promise 且附带 cancel 方法）
function makeCancelableAxios(config) {
  const controller = new AbortController()
  const merged = { signal: controller.signal, timeout: globalConfig.timeout, ...config }
  const p = service.request(merged).then(
    (res) => normalizeResponse(res, config),
    (err) => handleAxiosError(err, config)
  )
  p.cancel = () => controller.abort()
  return p
}

// 并发控制（简单实现）：限制并发数量
async function runWithConcurrency(tasks, concurrency = 5) {
  const results = []
  const executing = []
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task())
    results.push(p)
    if (concurrency <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= concurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(results)
}

// 主导出的 request 对象，兼容之前的方法签名，同时增强功能
const request = {
  // 全局配置接口
  setBaseURL,
  setDefaultHeaders,
  setAxiosInstance,

  // 基础方法：返回一个带 cancel 的 promise
  request(config) {
    return makeCancelableAxios(config)
  },

  get(url, params = {}, config = {}) {
    return makeCancelableAxios({ method: 'get', url, params, ...config })
  },

  post(url, data = {}, config = {}) {
    return makeCancelableAxios({ method: 'post', url, data, ...config })
  },

  put(url, data = {}, config = {}) {
    return makeCancelableAxios({ method: 'put', url, data, ...config })
  },

  delete(url, params = {}, config = {}) {
    return makeCancelableAxios({ method: 'delete', url, params, ...config })
  },

  patch(url, data = {}, config = {}) {
    return makeCancelableAxios({ method: 'patch', url, data, ...config })
  },

  form(url, data = {}, config = {}) {
    const newConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...(config.headers || {}) },
      method: 'post',
      url,
      data,
      ...config,
    }
    return makeCancelableAxios(newConfig)
  },

  upload(url, formData, config = {}) {
    const onUploadProgress = config.onUploadProgress || config.onProgress
    const newConfig = {
      method: 'post',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) onUploadProgress(progressEvent)
      },
      ...config,
    }
    return makeCancelableAxios(newConfig)
  },

  // 下载并提供进度回调
  download(url, params = {}, fileName, config = {}) {
    const onDownloadProgress = config.onDownloadProgress || config.onProgress
    const newConfig = { method: 'get', url, params, responseType: 'blob', onDownloadProgress, ...config }

    const p = makeCancelableAxios(newConfig)
    const wrapped = p.then((response) => {
      // 如果 axios 被 normalize 成 data（不是原始 response），尝试从 response.data 获取
      const res = response && response.data ? response.data : response
      const blob = new Blob([res])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName || 'download'
      link.click()
      window.URL.revokeObjectURL(link.href)
      return response
    })
    wrapped.cancel = p.cancel
    return wrapped
  },

  custom(method, url, data = {}, params = {}, config = {}) {
    return makeCancelableAxios({ method, url, data, params, ...config })
  },

  // 并行，支持并发数限制：accepts array of functions that return promises or array of configs
  parallel(requests = [], concurrency = 5) {
    const tasks = requests.map((r) => {
      if (typeof r === 'function') return () => r()
      return () => {
        // r can be a config object or [method, url, data, config]
        if (r.method && r.url) return makeCancelableAxios(r)
        if (Array.isArray(r)) {
          const [method, url, body, cfg] = r
          return makeCancelableAxios({ method, url, ...(body ? { data: body } : {}), ...(cfg || {}) })
        }
        return Promise.reject(new Error('Invalid request descriptor'))
      }
    })
    return runWithConcurrency(tasks, concurrency)
  },

  // 串行执行
  series(requests = []) {
    const run = async () => {
      const results = []
      for (const r of requests) {
        if (typeof r === 'function') results.push(await r())
        else if (r.method && r.url) results.push(await makeCancelableAxios(r))
        else if (Array.isArray(r)) {
          const [method, url, body, cfg] = r
          results.push(await makeCancelableAxios({ method, url, ...(body ? { data: body } : {}), ...(cfg || {}) }))
        } else results.push(Promise.reject(new Error('Invalid request descriptor')))
      }
      return results
    }
    return run()
  },

  // 简单重试工具：fn 返回 promise
  retry(fn, attempts = 3, delayMs = 500) {
    return new Promise((resolve, reject) => {
      let i = 0
      const attempt = () => {
        i++
        Promise.resolve()
          .then(() => fn())
          .then(resolve)
          .catch((err) => {
            if (i >= attempts) return reject(err)
            setTimeout(attempt, delayMs)
          })
      }
      attempt()
    })
  },

  // expose underlying axios instance for advanced use
  axios: () => service,
}

export default request
