// $fetch(url, params)
// fetch(url, initParams).then((res) => res.json).then((body) = body).catch((error) => error)

import { message } from 'antd'

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
  const queryStr = query
    ? Object.keys(query)
      .reduce((ary, key) => {
        if (query[key]) {
          ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
        }
        return ary
      }, [])
      .join('&')
    : ''

  return queryStr
}

const initOptions = {
  method: 'GET', // POST, *GET,  PUT, DELETE
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // text/plain;charset=UTF-8 *application/json;charset=utf-8
  },
  credentials: 'include',
  // mode: 'cors', // no-cors, cors, *same-origin
  // redirect: 'follow', // manual, *follow, error
  // referrer: 'no-referrer', // no-referrer *client,
  // referrerPolicy: 'no-referrer-when-downgrade',
  // cache: 'default',
  // integrity: '',
  // keepalive: false,
  // signal: undefined,
}

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// console.log('sleep', sleep)

const handleFailedResult = (result, cusOptions) => {
  console.log('failedResult', result)

  if (result.status && cusOptions.isHandleError) {
    const errMsg = result.msg || result.message || '服务器开小差了，稍后再试吧'
    const errStr = `${errMsg}（${result.status}）`
    message.info(errStr, 2)
  }
  const errorMsg =
    'Uncaught PromiseError: ' + (result.netStatus || '') + ' ' + (result.error || result.msg || result.message || '')
  return errorMsg
}

const handleSuccessResult = (result, cusOptions) => {
  console.log('successResult', result)
  console.log('cusOptions', cusOptions)
  if (result.status && cusOptions.isHandleError) {
    const errMsg = result.msg || result.message || '服务器开小差了，稍后再试吧'
    const errStr = `${errMsg}（${result.status}）`
    message.info(errStr, 2)
  }
  return result
}

const handleSuccessResponse = (resolve, reject, response, resBody, cusOptions) => {
  if (response.ok) {
    resolve(handleSuccessResult(resBody, cusOptions)) // arrayBuffer fix todo
  } else {
    message.error(response.statusText, 2)
    reject(
      handleFailedResult(
        Object.assign({}, resBody, {
          status: response.status,
          statusText: response.statusText,
        }),
        cusOptions
      )
    )
  }
}

const handleErrorResponse = (reject, response, error, cusOptions) => {
  console.log('error', error)
  console.log('fetch error')
  let msg = '当前服务繁忙，请稍后再试'
  // 403 500 401
  if (response.status === 404) {
    msg = '您访问的内容走丢了…'
  }
  message.error(msg, 2)
  reject(handleFailedResult({ fetchStatus: 'error', netStatus: response.status, fetchError: msg }, cusOptions))
}

const fetchTimeoutPromise = (cusOptions) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      if (!cusOptions.isFetched) {
        cusOptions.isAbort = true
        message.info('网络开小差了，稍后再试吧', 2)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ fetchStatus: 'timeout' })
      }
    }, cusOptions.timeout)
  })
}

const handleFetchData = (url, options, cusOptions) => {
  // cusOptions.isFetched = false
  // cusOptions.isAbort = false

  const fetchPromise = new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (cusOptions.isAbort) {
          return
        }
        cusOptions.isFetched = true

        // response.text() response.json() response.blob() response.formData() response.arrayBuffer()
        // if(response.ok || (response.status >= 200 && response.status < 300)) { 成功 } else { 失败}
        // response.status
        // response.statusText

        console.log('fetch success')

        for (const [key, value] of response.headers.entries()) {
          console.log(`response ${key} : ${value}`)
        }

        const contentType = response.headers.get('Content-Type')
        if (contentType.includes('application/json')) {
          response.json()
            .then((resBody) => {
              handleSuccessResponse(resolve, reject, response, resBody, cusOptions)
            })
            .catch((error) => {
              handleErrorResponse(reject, response, error, cusOptions)
            })
        } else if (contentType.includes('text/html')) {
          // todo text blob formData arrayBuffer
        }

        // response
        //   .json()
        //   .then((res) => {
        //     resolve(res)
        //   })
        //   .catch((err) => {
        //     reject(err)
        //   })
      })
      .catch((error) => {
        // reject(error)
        const errMsg = `${error.name} ${error.message}`
        if (cusOptions.isAbort) {
          return
        }
        cusOptions.isFetched = true
        cusOptions.isHandleError && message.error('网络开小差了，稍后再试吧', 2)
        reject(handleFailedResult({ fetchStatus: 'error', fetchError: errMsg }, cusOptions))
      })
  })

  // const timerPromise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject(new Error('Request Timeout'))
  //   }, cusOptions.timeout)
  // })
  console.log('fetchPromise', fetchPromise)
  console.log('promise race', Promise.race([fetchPromise, fetchTimeoutPromise]))
  return Promise.race([fetchPromise, fetchTimeoutPromise])
  // return fetchPromise
}

const httpFetch = (
  url,
  params = { method: 'GET', payload: null, header: null },
  cusParams = { isHandleError: true, isLoading: true, timeout: 2000 }
) => {
  const { method, payload, headers } = params

  const defaultOptions = {
    ...initOptions,
    method,
    headers: {
      ...initOptions.headers,
      ...headers,
    },
  }

  // PUT DELETE
  const isGet = method.toUpperCase() === 'GET'
  // const isPost = method.toUpperCase() === 'POST'
  const options = isGet ? initOptions : { defaultOptions, body: JSON.stringify(payload) }
  const fetchUrl = isGet
    ? `${baseUrl}${url}${parseToQuery(payload) ? `?${parseToQuery(payload)}` : ''}`
    : `${baseUrl}${url}`
  return handleFetchData(fetchUrl, options, cusParams)
}

export default httpFetch
