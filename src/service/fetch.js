/**
 * Fetch Api
 * 1. reqFetch(url, params)
 *    params: {
 *      method: 'GET', // 请求方式
 *      payload: null, // 入参
 *      headers: null, // 自定义 Headers
 *      isShowError: true, // 是否显示total tips
 *      timeout: 20000 // 超时
 *    }
 * 2. postFetch --- method==='POST' 其他入参同 reqFetch
 * 3. getFetch --- method==='POST'  其他入参同 reqFetch
 * 4. putFethch
 * 5. deleteFetch
 * 6. patchFetch
 */
// import { HashRouter } from 'react-router-dom'
import { message } from 'antd'
import suffix from '../utils/suffix'
// import { getToken } from '../utils/token'
// import fetchIntercept from 'fetch-intercept'
// import fetch from 'cross-fetch'
// require('isomorphic-fetch')

// fetch polyfill
// https://github.com/node-fetch/node-fetch
// https://github.com/matthew-andrews/isomorphic-fetch
// https://github.com/lquixada/cross-fetch
// https://github.com/github/fetch
// https://juejin.cn/post/7064495856220635150

// fetch(url, initParams).then((res) => res.json).then((body) = body).catch((error) => error)
// const response = fetch(url, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'text/plain;charset=UTF-8', //application/json;charset=utf-8
//   },
//   body: null,
//   referrer: 'about:client',
//   referrerPolicy: 'no-referrer-when-downgrade',
//   mode: 'cors',
//   credentials: 'same-origin',
//   cache: 'default',
//   redirect: 'follow',
//   integrity: '',
//   keepalive: false,
//   signal: null,
// })

/**
 * Timeout function
 * @param {Integer} time (miliseconds)
 * @param {Promise} promise
 */
// const timeout = (time, promise) => {
//   return new Promise(function(resolve, reject) {
//     setTimeout(() => {
//       reject(new Error('Request timed out.'))
//     }, time);
//     promise.then(resolve, reject);
//   });
// }

// https://use-http.com/#/
// https://github.com/Bigerfe/fe-learn-code/
// https://cloud.tencent.com/developer/article/1532107
// https://towardsdev.com/what-is-better-for-http-requests-fetch-or-axios-comparison-920ceffc5161
// https://javascript.info/fetch-progress
// https://github.com/AnthumChris/fetch-progress-indicators
// https://github.com/jserz/request-extensions
// allowHTTP1ForStreamingUpload
// https://medium.datadriveninvestor.com/aborting-cancelling-requests-with-fetch-or-axios-db2e93825a36
// fetch(url).then(res => consume(res.body.getReader()))
// const consume = (reader) => {
//   let total = 0
//   return new Promise((resolve, reject) => {
//     function pump() {
//       reader
//         .read()
//         .then(({ done, value }) => {
//           if (done) {
//             resolve()
//             return
//           }
//           total += value.byteLength
//           console.log(`received ${value.byteLength} bytes (${total} bytes in total)`)
//           pump()
//         })
//         .catch(reject)
//     }
//     pump()
//   })
// }

// const baseUrl = process.env.APP_BASE_URL
const baseUrl = process?.env?.APP_BASE_URL ? process.env.APP_BASE_URL : import.meta.env?.APP_BASE_URL ?? ''
// const hashRouter = new HashRouter()
const parseToQuery = (query) =>
  Object.keys(query)
    .reduce((ary, key) => {
      // if (query[key]) {
      //   ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
      // }
      ary.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key] === undefined ? '' : query[key])}`)
      return ary
    }, [])
    .join('&')

const initOptions = {
  method: 'GET', // POST, *GET,  PUT, DELETE, PATCH, [HEAD, CONNECT, OPTIONS, TRACE]
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8', // text/plain;charset=UTF-8 *application/json;charset=utf-8 application/x-www-form-urlencoded
    // Authorization: getToken() ? `Bearer ${getToken()}` : null,
  },
  signal: null,
  credentials: 'include', // include *same-origin
  // mode: 'cors', // no-cors, cors, *same-origin
  // redirect: 'follow', // manual, *follow, error
  // referrer: 'no-referrer', // no-referrer *client,
  // referrerPolicy: 'no-referrer-when-downgrade',
  // cache: 'default', // *default no-store reload no-cache force-cache only-if-cached
  // integrity: '', // sha256-abcdef
  // keepalive: false,
}

const handleFailedResult = (response, error, isShowError, reject) => {
  const { status } = response

  if (((status && status !== 200) || error) && isShowError) {
    message.error(`${status ? status + response.statusText : error.message}`, 2)
  }
  if (reject) reject(response)
}

const handleSuccessResult = (reslove, result, isShowError) => {
  // response.ok text/html text/plain result may be string
  if (result.code !== 0) {
    if (result.code === 41002) {
      window.location.href = '/signin'
      return
    }

    if (isShowError && result.code) {
      const errStr = `${result.code}: ${result.message}`
      message.error(errStr, 2)
    }
  }
  reslove(result)
}

const handleFetchData = (url, options) => {
  const { isShowError, timeout, controller, ...otherOptions } = options
  if (otherOptions.signal) throw new Error('Signal not supported in timeoutable fetch')
  const abortController = controller || new AbortController()
  const { signal } = abortController
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      handleFailedResult(
        { status: 50000, statusText: 'Time out' },
        new Error('TimeoutError: Timeout for Promise'),
        isShowError
      )
      abortController.abort()
    }, timeout)

    fetch(url, { ...otherOptions, signal })
      .then((response) => {
        // response.text() response.json() response.blob() response.formData() response.arrayBuffer() response.clone()
        // if(response.ok || (response.status >= 200 && response.status < 300)) { 成功 } else { 失败}
        // response.status
        // response.statusText
        // response.type >> *basic cors opaque error opaqueredirect(manual)
        // cors >> Cache-Control, Content-Language, Content-Type, Expores, Last-Modified, Progma
        // res.body.getReader()
        // for (const [key, value] of response.headers.entries()) {
        //   console.log(`response ${key} : ${value}`)
        // }

        const contentType = response.headers.get('Content-Type')
        if (response.status >= 200 && response.status < 300) {
          if (contentType.includes('application/json')) {
            response
              .json()
              .then((resBody) => {
                handleSuccessResult(resolve, resBody, isShowError)
              })
              .catch((error) => {
                handleFailedResult(response, error, isShowError)
              })
          } else if (contentType.includes('application/vnd.ms-excel')) {
            // application/octet-stream
            response
              .arrayBuffer()
              .then((resBuffer) => {
                const blob = new Blob([resBuffer], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                })
                const disposition = response.headers.get('content-disposition')
                const fileName = decodeURI(disposition?.split('=')[1].replace(/'/g, '')).replace("utf-8''", '') || ''
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
                handleFailedResult(response, error, isShowError)
              })
          } else if (contentType.includes('text/html') || contentType.includes('text/plain')) {
            response
              .text()
              .then((resBody) => {
                handleSuccessResult(resolve, resBody, isShowError)
              })
              .catch((error) => {
                handleFailedResult(response, error, isShowError, reject)
              })
          }
        } else {
          handleFailedResult(response, response, isShowError, reject)
        }
      })
      .catch((error) => {
        handleFailedResult(error, error, isShowError)
      })
      .finally(() => clearTimeout(timer))
  })
}

export const reqFetch = (
  url,
  params = { method: 'GET', payload: null, headers: null, isShowError: true, timeout: 20000, controller: null }
) => {
  const {
    method = 'GET',
    payload = null,
    headers = null,
    isShowError = true,
    timeout = 20000,
    controller = null,
  } = params

  const defaultOptions = {
    ...initOptions,
    method,
    headers: {
      ...initOptions.headers,
      ...headers,
    },
    controller,
    timeout,
    isShowError,
  }

  // POST, *GET,  PUT, DELETE, PATCH, [HEAD, CONNECT, OPTIONS, TRACE]
  const noReqBody = ['GET', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE']

  const isNoReqBody = noReqBody.includes(method.toUpperCase())

  const options = isNoReqBody ? defaultOptions : { ...defaultOptions, body: JSON.stringify(payload) }

  const suffixPayload = isNoReqBody ? { ...payload } : {}

  const signedPayload = suffix(suffixPayload)

  const queryParams = parseToQuery(signedPayload)

  const fetchUrl = `${baseUrl}${url}?${queryParams}`

  return handleFetchData(fetchUrl, options)
}

export const getFetch = (url, params) =>
  reqFetch(url, {
    method: 'GET',
    ...params,
  })

export const postFetch = (url, params) =>
  reqFetch(url, {
    method: 'POST',
    ...params,
  })

export const putFetch = (url, params) =>
  reqFetch(url, {
    method: 'PUT',
    ...params,
  })

export const deleteFetch = (url, params) =>
  reqFetch(url, {
    method: 'DELETE',
    ...params,
  })

export const patchFetch = (url, params) =>
  reqFetch(url, {
    method: 'PATCH',
    ...params,
  })
