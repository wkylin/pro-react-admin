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
import { suffix } from '../utils/suffix'
// import { getToken } from '../utils/token'
import fetchIntercept from 'fetch-intercept'
// import fetch from 'cross-fetch'
require('isomorphic-fetch')

// fetch polyfill
// https://github.com/node-fetch/node-fetch
// https://github.com/matthew-andrews/isomorphic-fetch
// https://github.com/lquixada/cross-fetch
// https://github.com/github/fetch

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

const baseUrl = process.env.APP_BASE_URL
// const hashRouter = new HashRouter()

const parseToQuery = (query) => {
  return Object.keys(query)
    .reduce((ary, key) => {
      // if (query[key]) {
      //   ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
      // }
      ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key] === undefined ? '' : query[key]))
      return ary
    }, [])
    .join('&')
}

const initOptions = {
  method: 'GET', // POST, *GET,  PUT, DELETE, PATCH, [HEAD, CONNECT, OPTIONS, TRACE]
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8', // text/plain;charset=UTF-8 *application/json;charset=utf-8 application/x-www-form-urlencoded
    // Authorization: getToken() ? `Bearer ${getToken()}` : null,
  },
  signal: undefined,
  credentials: 'include', // include *same-origin
  // mode: 'cors', // no-cors, cors, *same-origin
  // redirect: 'follow', // manual, *follow, error
  // referrer: 'no-referrer', // no-referrer *client,
  // referrerPolicy: 'no-referrer-when-downgrade',
  // cache: 'default', // *default no-store reload no-cache force-cache only-if-cached
  // integrity: '', // sha256-abcdef
  // keepalive: false,
}

const handleFailedResult = (result, error, isShowError) => {
  if (result.code !== 0 && isShowError) {
    const errMsg = result.message || result.error || (error && error.message)
    const errStatus = result.status ? result.status : error && error.name
    const errStr = `${result.code ? result.code : errStatus}: ${errMsg}`
    if (!error || (error && error.name !== 'AbortError')) {
      message.error(errStr, 2)
    }
  }
  return result
}

const handleSuccessResult = (result, isShowError) => {
  // response.ok text/html text/plain result may be string
  if (result.code !== 0) {
    if (result.code === 41002) {
      // window.location.href = '#/signin'
      // hashRouter.history.push('/signin')
      return
    }

    if (isShowError && result.code) {
      const errStr = `${result.code}: ${result.message}`
      message.error(errStr, 2)
    }
  }
  return result
}

const handleErrorResponse = (reject, response, error, isShowError) => {
  let msg = ''
  switch (response.status) {
    case 401:
      msg = 'Unauthorized'
      break
    case 403:
      msg = 'Forbidden'
      break
    case 404:
      msg = 'Not Found'
      break
    case 405:
      msg = 'Method Not Allowed'
      break
    case 504:
      msg = 'Gateway Timeout'
      break
    default:
      msg = response.statusText
  }

  reject(handleFailedResult({ status: response.status, error: msg }, error, isShowError))
}

const handleSuccessResponse = (resolve, reject, response, resBody, isShowError) => {
  if (response.ok) {
    resolve(handleSuccessResult(resBody, isShowError))
  } else {
    handleErrorResponse(
      reject,
      response,
      Object.assign({}, resBody, { status: response.status, error: response.statusText }),
      isShowError
    )
  }
}

const handleFetchData = (url, options) => {
  const { isShowError, timeout, controller, ...otherOptions } = options
  if (otherOptions.signal) throw new Error('Signal not supported in timeoutable fetch')
  const abortController = controller || new AbortController()
  const { signal } = abortController
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        handleFailedResult(
          { error: 'Timeout for Promise' },
          new Error('TimeoutError: Timeout for Promise'),
          isShowError
        )
      )
      abortController.abort()
    }, timeout)

    fetch(url, { ...otherOptions, signal })
      .finally(() => clearTimeout(timer))
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
        if (!response.ok && !contentType) {
          handleErrorResponse(reject, response, null, isShowError)
          return
        }

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
          // application/octet-stream
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
        } else if (contentType.includes('text/html') || contentType.includes('text/plain')) {
          const resType = response.text()
          resType
            .then((resBody) => {
              handleSuccessResponse(resolve, reject, response, resBody, isShowError)
            })
            .catch((error) => {
              handleErrorResponse(reject, response, error, isShowError)
            })
        } else {
          // context-type */*
          response
            .text()
            .then((resBody) => {
              handleSuccessResponse(resolve, reject, response, resBody, isShowError)
            })
            .catch((error) => {
              handleErrorResponse(reject, response, error, isShowError)
            })
        }
      })
      .catch((error) => {
        const errMsg = `${error.name} ${error.message}`
        reject(handleFailedResult({ error: errMsg }, error, isShowError))
      })
  })
}

fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    // console.log('url', url)
    return [url, config]
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    console.log('req error', error)
    return Promise.reject(error)
  },

  response: function (response) {
    // Modify the reponse object
    // console.log('response', response)
    return response
  },

  responseError: function (error) {
    // Handle an fetch error
    // console.log('res error', error)
    return Promise.reject(error)
  },
})

export const reqFetch = (
  url,
  params = { method: 'GET', payload: null, headers: null, isShowError: true, timeout: 20000, controller: undefined }
) => {
  const {
    method = 'GET',
    payload = null,
    headers = null,
    isShowError = true,
    timeout = 20000,
    controller = undefined,
  } = params

  const defaultOptions = {
    ...initOptions,
    method,
    headers: {
      ...initOptions.headers,
      ...headers,
    },
    controller,
    isShowError,
    timeout,
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

export const getFetch = (url, params) => {
  return reqFetch(url, {
    method: 'GET',
    ...params,
  })
}

export const postFetch = (url, params) => {
  return reqFetch(url, {
    method: 'POST',
    ...params,
  })
}

export const putFetch = (url, params) => {
  return reqFetch(url, {
    method: 'PUT',
    ...params,
  })
}

export const deleteFetch = (url, params) => {
  return reqFetch(url, {
    method: 'DELETE',
    ...params,
  })
}

export const patchFetch = (url, params) => {
  return reqFetch(url, {
    method: 'PATCH',
    ...params,
  })
}
