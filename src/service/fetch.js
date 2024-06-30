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
 * 4. putFetch
 * 5. deleteFetch
 * 6. patchFetch
 */
import { message } from 'antd'
import suffix from '../utils/suffix'

// const baseUrl = process?.env?.APP_BASE_URL ? process?.env?.APP_BASE_URL : import.meta.env?.APP_BASE_URL ?? ''
const baseUrl = ''
const parseToQuery = (query) =>
  Object.keys(query)
    .reduce((ary, key) => {
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
  const { status, statusText } = response

  if (((status && status !== 200) || error) && isShowError) {
    const statusTips = `${status}: ${statusText}`
    message.error(`${status ? statusTips : error?.message}`, 2)
  }
  if (reject) reject(response)
}

const handleSuccessResult = (resolve, result, isShowError) => {
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
  resolve(result)
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
    const fetchStartTime = +new Date()
    fetch(url, { ...otherOptions, signal })
      .then((response) => {
        const fetchEndTime = +new Date()
        const delay = fetchEndTime - fetchStartTime
        fetch('http://localhost:5200/apis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url.split('?')[0], delay }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => {
            console.error('err.name', err.name)
            console.error('err.message', err.message)
          })
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
