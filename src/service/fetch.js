/**
 * Fetch Api
 * 1. reqFetch(url, params)
 *    params: {
 *      method: 'GET', // 请求方式
 *      payload: null, // 入参
 *      headers: null, // 自定义 Headers
 *      isShowError: true, // 是否显示total tips
 *      timeout: 5000 // 超时
 *    }
 * 2. postFetch --- method==='POST' 其他入参同 reqFetch
 * 3. getFetch --- method==='POST'  其他入参同 reqFetch
 */

import { message } from 'antd'
// fetch(url, initParams).then((res) => res.json).then((body) = body).catch((error) => error)
// const response = fetch(url, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'text/plain;charset=UTF-8', //application/json;charset=utf-8
//   },
//   body: undefined,
//   referrer: 'about:client',
//   referrerPolicy: 'no-referrer-when-downgrade',
//   mode: 'cors',
//   credentials: 'same-origin',
//   cache: 'default',
//   redirect: 'follow',
//   integrity: '',
//   keepalive: false,
//   signal: undefined,
// })

const baseUrl = process.env.APP_BASE_URL

const parseToQuery = (query) => {
  const queryStr =
    query &&
    Object.keys(query)
      .reduce((ary, key) => {
        if (query[key]) {
          ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
        }
        return ary
      }, [])
      .join('&')
  return queryStr
}

const initOptions = {
  method: 'GET', // POST, *GET,  PUT, DELETE
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // text/plain;charset=UTF-8 *application/json;charset=utf-8
  },
  credentials: 'include', // include *same-origin
  // mode: 'cors', // no-cors, cors, *same-origin
  // redirect: 'follow', // manual, *follow, error
  // referrer: 'no-referrer', // no-referrer *client,
  // referrerPolicy: 'no-referrer-when-downgrade',
  // cache: 'default',
  // integrity: '',
  // keepalive: false,
  // signal: undefined,
}

const handleFailedResult = (result, isShowError) => {
  if (result.code !== '0' && isShowError) {
    const errMsg = result.message || result.fetchError || '服务器开小差了，稍后再试吧 failed'
    const errStr = `${result.code ? result.code : ''}${errMsg}`
    message.error(errStr, 2)
  }
  const errorMsg = 'Uncaught PromiseError: ' + (result.netStatus || '') + ' ' + (result.message || '')
  return errorMsg
}

const handleSuccessResult = (result, isShowError) => {
  if (result.code !== '0' && isShowError) {
    if (result.code === 41002) {
      // Todo clear cookie redirect login
      window.location.href = '#/signin'
      return
    } else {
      const errMsg = result.message
      const errStr = `${result.code}: ${errMsg}`
      message.error(errStr, 2)
    }
  }

  return result
}

const handleSuccessResponse = (resolve, reject, response, resBody, isShowError) => {
  if (response.ok) {
    resolve(handleSuccessResult(resBody, isShowError))
  } else {
    // message.error(response.statusText, 2)
    reject(
      handleFailedResult(
        Object.assign({}, resBody, {
          status: response.status,
          statusText: response.statusText,
        }),
        isShowError
      )
    )
  }
}

const handleErrorResponse = (reject, response, error, isShowError) => {
  let msg = '当前服务繁忙，请稍后再试!'

  // 403 500 401
  if (response.status === 404) {
    msg = '您访问的内容走丢了…'
  }
  message.error(msg, 2)
  reject(handleFailedResult({ fetchStatus: 'error', netStatus: response.status, fetchError: msg }, isShowError))
}

const handleFetchData = (url, options) => {
  const { isShowError, timeout, ...otherOptions } = options
  if (otherOptions.signal) throw new Error('Signal not supported in timeoutable fetch')
  const controller = new AbortController()
  const { signal } = controller
  const fetchPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Timeout for Promise'))
      controller.abort()
    }, timeout)
    fetch(url, { signal, ...otherOptions })
      .finally(() => clearTimeout(timer))
      .then((response) => {
        // response.text() response.json() response.blob() response.formData() response.arrayBuffer()
        // if(response.ok || (response.status >= 200 && response.status < 300)) { 成功 } else { 失败}
        // response.status
        // response.statusText

        // for (const [key, value] of response.headers.entries()) {
        //   console.log(`response ${key} : ${value}`)
        // }

        const contentType = response.headers.get('Content-Type')
        if (contentType.includes('application/json')) {
          response
            .json()
            .then((resBody) => {
              handleSuccessResponse(resolve, reject, response, resBody, isShowError)
            })
            .catch((error) => {
              handleErrorResponse(reject, response, error, isShowError)
            })
        } else if (contentType.includes('application/vnd.ms-excel')) {
          response
            .arrayBuffer()
            .then((resBuffer) => {
              const blob = new Blob([resBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              })
              const disposition = response.headers.get('content-disposition')
              const fileName = decodeURI(disposition.split('=')[1].replace(/'/g, ''))
              const objectUrl = URL.createObjectURL(blob)
              const downloadElement = document.createElement('a')
              document.body.appendChild(downloadElement)
              downloadElement.style = 'display: none'
              downloadElement.href = objectUrl
              downloadElement.download = fileName
              downloadElement.click()
              document.body.removeChild(downloadElement)
            })
            .catch((error) => {
              handleErrorResponse(reject, response, error, isShowError)
            })
        } else {
          reject(handleFailedResult({ fetchError: 'No Response Type' }, isShowError))
        }
      })
      .catch((error) => {
        const errMsg = `${error.name} ${error.message}`
        reject(handleFailedResult({ fetchStatus: 'error', fetchError: errMsg }, isShowError))
      })
  })
  return fetchPromise
}

const reqFetch = (url, params = { method: 'GET', payload: null, headers: null, isShowError: true, timeout: 20000 }) => {
  const { method = 'GET', payload = null, headers = null, isShowError = true, timeout = 20000 } = params

  const defaultOptions = {
    ...initOptions,
    method,
    headers: {
      ...initOptions.headers,
      ...headers,
    },
    isShowError,
    timeout,
  }

  // PUT DELETE
  const isGet = method.toUpperCase() === 'GET'
  // const isPost = method.toUpperCase() === 'POST'
  const options = isGet ? defaultOptions : { ...defaultOptions, body: JSON.stringify(payload) }

  const suffixPayload = isGet ? payload : null

  const queryParams = parseToQuery(suffixPayload)

  const fetchUrl = `${baseUrl}${url}${queryParams ? `?${queryParams}` : ''}`

  return handleFetchData(fetchUrl, options)
}

const getFetch = (url, params) => {
  return reqFetch(url, {
    method: 'GET',
    ...params,
  })
}

const postFetch = (url, params) => {
  return reqFetch(url, {
    method: 'POST',
    ...params,
  })
}

export default {
  reqFetch,
  postFetch,
  getFetch,
}
