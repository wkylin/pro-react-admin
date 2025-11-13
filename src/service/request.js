import axios from 'axios'
import qs from 'qs'
import { showMessage } from '@src/utils/message'
import { authService } from '@src/service/authService'
import logger from '../utils/logger' // 相对引入更稳妥

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.APP_BASE_URL, // API 基础地址
  timeout: 60000, // 请求超时时间
  withCredentials: true, // 跨域请求时发送 cookies
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 处理 Authorization 优先级：自定义 > token > 无
    if (config.headers?.Authorization) {
      // 如果请求配置中已自定义 Authorization，则使用自定义的
      // console.log('使用自定义 Authorization:', config.headers.Authorization)
      logger.log('使用自定义 Authorization:', config.headers?.Authorization)
    } else {
      // 检查是否需要添加 token（默认需要）
      const needToken = config.needToken !== false

      if (needToken) {
        // const token = localStorage.getItem("token");
        const token = authService.getToken()
        if (token) {
          config.headers = config.headers || {}
          config.headers['Authorization'] = `Bearer ${token}`
          // console.log('自动添加 token:', token)
          logger.log('自动添加 token:', token)
        }
      }
    }

    // 处理 Content-Type 和数据序列化
    const contentType = config.headers?.['Content-Type']

    // 处理 application/x-www-form-urlencoded 格式
    if (contentType === 'application/x-www-form-urlencoded') {
      // 只对对象数据进行序列化，避免重复序列化
      if (config.data && typeof config.data === 'object') {
        config.data = qs.stringify(config.data)
        console.log('序列化 form 数据:', config.data)
      }
    }

    // 处理 FormData 格式（确保不覆盖 Content-Type）
    if (config.data instanceof FormData) {
      // 让浏览器自动设置 Content-Type 和 boundary
      delete config.headers?.['Content-Type']
      console.log('检测到 FormData 数据，移除 Content-Type')
    }

    return config
  },
  (error) => {
    console.error('请求错误:', error)
    // 统一错误提示
    if (error.config?.showError !== false) {
      showMessage.error('请求发送失败: ' + (error.message || '未知错误'))
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 如果是下载文件请求，直接返回响应
    if (response.config.responseType === 'blob') {
      return response
    }

    // 根据业务状态码处理
    // 当 code 为 0 且 HTTP 状态码为 200 时，不提示错误
    // if (res.code === 0 && response.status === 200) {
    //   return res
    // }
    if (response.status === 200) {
      return res
    }

    // 当 code 不为 0（异常情况）时，根据 showError 配置决定是否提示错误
    if (res.code !== 0) {
      // 处理特定错误码
      if (res.code === 401) {
        // 未授权，清除 token 并跳转登录页
        authService.logout()
        localStorage.removeItem('token')
        window.location.href = '/signin'
      }

      // 统一错误提示（除非配置了不显示）
      if (response.config?.showError !== false) {
        showMessage.error(res.message || '请求失败')
      }

      return Promise.reject(new Error(res.message || '请求失败'))
    }

    return res
  },
  (error) => {
    console.error('响应错误:', error)

    // 处理 HTTP 错误状态码
    let errorMessage = '请求失败'

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = '未授权，请重新登录'
          // 未授权处理
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
      // 请求已发出但没有响应
      if (error.code === 'ECONNABORTED') {
        errorMessage = '请求超时'
      } else {
        errorMessage = '网络连接异常'
      }
    } else {
      // 请求配置错误
      errorMessage = error.message || '请求配置错误'
    }

    // 统一错误提示（除非配置了不显示）
    if (error.config?.showError !== false) {
      showMessage.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

// 封装请求方法
const request = {
  /**
   * GET 请求
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   */
  get(url, params = {}, config = {}) {
    return service({
      method: 'get',
      url,
      params,
      ...config,
    })
  },

  /**
   * POST 请求
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {object} config 请求配置
   */
  post(url, data = {}, config = {}) {
    return service({
      method: 'post',
      url,
      data,
      ...config,
    })
  },

  /**
   * PUT 请求
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {object} config 请求配置
   */
  put(url, data = {}, config = {}) {
    return service({
      method: 'put',
      url,
      data,
      ...config,
    })
  },

  /**
   * DELETE 请求
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   */
  delete(url, params = {}, config = {}) {
    return service({
      method: 'delete',
      url,
      params,
      ...config,
    })
  },

  /**
   * PATCH 请求
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {object} config 请求配置
   */
  patch(url, data = {}, config = {}) {
    return service({
      method: 'patch',
      url,
      data,
      ...config,
    })
  },

  /**
   * 上传文件
   * @param {string} url 请求地址
   * @param {FormData} formData 表单数据
   * @param {object} config 请求配置
   */
  upload(url, formData, config = {}) {
    // 创建一个新的配置对象，合并 headers
    const newConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config.headers || {}),
      },
    }

    return service({
      method: 'post',
      url,
      data: formData,
      ...newConfig,
    })
  },

  /**
   * 下载文件
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {string} fileName 文件名
   * @param {object} config 请求配置
   */
  download(url, params = {}, fileName, config = {}) {
    return service({
      method: 'get',
      url,
      params,
      responseType: 'blob',
      ...config,
    })
      .then((response) => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName || 'download'
        link.click()
        window.URL.revokeObjectURL(link.href)
        return response
      })
      .catch((error) => {
        // 下载失败时显示错误信息
        if (config.showError !== false) {
          showMessage.error('文件下载失败: ' + (error.message || '未知错误'))
        }
        return Promise.reject(error)
      })
  },

  /**
   * 表单提交 (application/x-www-form-urlencoded)
   * @param {string} url 请求地址
   * @param {object} data 表单数据
   * @param {object} config 请求配置
   */
  form(url, data = {}, config = {}) {
    // 创建一个新的配置对象，合并 headers
    const newConfig = {
      ...config,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(config.headers || {}),
      },
    }

    return service({
      method: 'post',
      url,
      data,
      ...newConfig,
    })
  },

  /**
   * 自定义请求方法
   * @param {string} method 请求方法
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {object} params URL参数
   * @param {object} config 请求配置
   */
  custom(method, url, data = {}, params = {}, config = {}) {
    return service({
      method,
      url,
      data,
      params,
      ...config,
    })
  },
}

export default request
