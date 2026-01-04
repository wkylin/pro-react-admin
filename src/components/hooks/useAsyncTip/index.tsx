import { useCallback, type DependencyList } from 'react'
import { showMessage } from '@src/utils/message'
import { RequestUtils } from '@src/service/request'

type AnyFn = (...args: any[]) => any
type TipHandler = (val: any) => void

type UseAsyncTipOptions = {
  loadingText?: string
  successText?: string
  onError?: TipHandler
}

const isBusinessEnvelope = (val: any) => {
  return !!(val && typeof val === 'object' && Object.hasOwn(val, 'code'))
}

const isOk = (res: any) => {
  if (!res || typeof res !== 'object') return !!res
  // 兼容 { success: true/false }
  if (Object.hasOwn(res, 'success')) return !!res.success
  // 兼容 { code: 0/200 }
  if (isBusinessEnvelope(res)) return res.code === 0 || res.code === 200
  // 兼容 axios error 分支可能返回 { status: 4xx/5xx, data: {...} }
  if (Object.hasOwn(res, 'status')) return res.status >= 200 && res.status < 300
  return true
}

const getErrorMessage = (err: any) => {
  if (!err) return '请求失败'
  if (typeof err === 'string') return err

  // request.js 的自定义错误可能带 status / code / response
  const status = err.status || err.response?.status
  if (typeof status === 'number') {
    return err.message || RequestUtils.getHttpErrorMessage(status) || '请求失败'
  }

  // axios 网络错误会有 code
  if (typeof err.code === 'string') {
    return err.message || RequestUtils.getNetworkErrorMessage(err.code) || '网络连接异常'
  }

  // axios interceptor 里可能 resolve(err.response) 或抛出 { data: ... }
  const data = err.data || err.response?.data
  if (data && typeof data === 'object') {
    return data.message || data.msg || data.error || data.code || err.message || '请求失败'
  }

  return err.message || err.msg || (err.error && (err.error.message || err.error.code)) || '请求失败'
}

const shouldShowErrorByDefault = (err: any) => {
  // request.js/http.js 默认会 showError/isShowError=true 并自行 showMessage.error
  // 这里尽量避免重复弹错：如果错误包含明显的 service 痕迹（status/code/response），默认不再重复提示
  if (err && typeof err === 'object') {
    if ('response' in err || 'status' in err || 'code' in err) return false
  }
  return true
}

export default (fn: AnyFn, options?: UseAsyncTipOptions, deps?: DependencyList) => {
  const callback = useCallback(
    (...args: any[]) => {
      const key = `async-tip-${Date.now()}-${Math.random().toString(16).slice(2)}`
      const loadingText = options?.loadingText || '加载中...'
      showMessage.loading(loadingText, key)

      let handled = false

      return Promise.resolve()
        .then(() => fn(...args))
        .then((res) => {
          if (isOk(res)) {
            showMessage.open({
              type: 'success',
              content: options?.successText || '完成',
              key,
              duration: 0.5,
            })
            return res
          }

          handled = true
          if (typeof options?.onError === 'function') {
            showMessage.destroy(key)
            options.onError(res)
          } else if (shouldShowErrorByDefault(res)) {
            showMessage.open({ type: 'error', content: getErrorMessage(res), key, duration: 2 })
          } else {
            showMessage.destroy(key)
          }
          return Promise.reject(res)
        })
        .catch((err) => {
          if (!handled) {
            if (typeof options?.onError === 'function') {
              showMessage.destroy(key)
              options.onError(err)
            } else if (shouldShowErrorByDefault(err)) {
              showMessage.open({ type: 'error', content: getErrorMessage(err), key, duration: 2 })
            } else {
              showMessage.destroy(key)
            }
          }
          return Promise.reject(err)
        })
    },
    Array.isArray(deps) ? deps : [fn, options]
  )
  return callback
}
