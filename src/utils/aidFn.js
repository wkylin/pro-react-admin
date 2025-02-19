import { parse, stringify } from 'qs'
import html2canvas from 'html2canvas'

export const getEnv = () => {
  let env
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    env = 'NODE'
  }
  if (typeof XMLHttpRequest !== 'undefined') {
    env = 'BROWSER'
  }
  return env
}

export const isArray = (val) => typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]'

export const isURLSearchParams = (val) => typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams

export const isDate = (val) => typeof val === 'object' && Object.prototype.toString.call(val) === '[object Date]'

export const isObject = (val) => val !== null && typeof val === 'object'

export const getParamObject = (val) => {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), { strictNullHandling: true })
  }
  if (typeof val === 'string') {
    return [val]
  }
  return val
}

export const reqStringify = (val) => stringify(val, { arrayFormat: 'repeat', strictNullHandling: true })

export const getType = (obj) => {
  const typeString = Object.prototype.toString.call(obj)
  const match = /\[object (.*?)\]/.exec(typeString)
  return match ? match[1] : null
}

export const hidePhone = (phone) => phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

// asyncAction(action)(callback)
export const asyncAction = (action) => {
  const wait = Promise.resolve(action)
  return (cb) => {
    wait.then(() => setTimeout(() => cb()))
  }
}

export const getImgsUrl = (html) => {
  const imgReg = /<img.*?(?:>|\/>)/gi
  const srcReg = /src=['"]?([^'"]*)['"]?/i
  const arr = html.match(imgReg)
  if (!arr) return null
  const urlArr = arr.reduce((prev, next) => {
    const src = next.match(srcReg)
    return src[1] ? [...prev, src[1]] : prev
  }, [])
  return urlArr
}

export const customizeTimer = {
  intervalTimer: null,
  timeoutTimer: null,
  setTimeout(cb, interval) {
    const { now } = Date
    const stime = now()
    let etime = stime
    const loop = () => {
      this.timeoutTimer = requestAnimationFrame(loop)
      etime = now()
      if (etime - stime >= interval) {
        cb()
        cancelAnimationFrame(this.timeoutTimer)
      }
    }
    this.timeoutTimer = requestAnimationFrame(loop)
    return this.timeoutTimer
  },
  clearTimeout() {
    cancelAnimationFrame(this.timeoutTimer)
  },
  setInterval(cb, interval) {
    const { now } = Date
    let stime = now()
    let etime = stime
    const loop = () => {
      this.intervalTimer = requestAnimationFrame(loop)
      etime = now()
      if (etime - stime >= interval) {
        stime = now()
        etime = stime
        cb()
      }
    }
    this.intervalTimer = requestAnimationFrame(loop)
    return this.intervalTimer
  },
  clearInterval() {
    cancelAnimationFrame(this.intervalTimer)
  },
}

export const isDecimal = (value) => {
  const reg = /(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/
  return reg.test(value)
}

export const limitDecimal = (val) => val.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

export const passwordStrength = (pass) => {
  const reg = /^(?=.*[A-Z])(?=.*[\d])(?=.*[a-z]).{8,}$/
  return reg.test(pass)
}

/*
 ** 判断用户是否离开当前页面
 */
export const checkIsLocalPage = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      return false
    }
    if (document.visibilityState === 'visible') {
      return true
    }
    window.addEventListener(
      'pagehide',
      (event) => {
        if (event.persisted) {
          /* the page isn't being discarded, so it can be reused later */
        }
      },
      false
    )
  })
}

// Generate Random Hex
export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`

export const rgbToHex = (r, g, b) => `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`

export const fibonacci = (n) => {
  const seq = [0, 1]

  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2])
  }

  return seq.slice(0, n)
}

export const lerp = (a, b, t) => a + (b - a) * t

export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`
}

export const formatOrdinal = (num) => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  return `${num}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`
}

export const formatPercentage = (num, decimals = 2) => `${(num * 100).toFixed(decimals)}%`

export const formatRomanNumeral = (num) => {
  const romanMap = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ]
  let result = ''
  for (const { value, numeral } of romanMap) {
    while (num >= value) {
      result += numeral
      num -= value
    }
  }

  return result
}

export const formatScientific = (num, decimalPlaces = 2) => toExponential(decimalPlaces)

export const capitalizeWords = (str) => str.replace(/\b\w/g, (match) => match.toUpperCase())

export const isPalindrome = (str) => {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  return normalized === normalized.split('').reverse().join('')
}

export const toCamelCase = (str) => str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())

export const toKebabCase = (str) => {
  return str
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, '-')
    .toLowerCase()
}

export const truncate = (str, num) => (str.length > num ? str.slice(0, num) + '...' : str)

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Clear All Cookies
export const clearCookies = document.cookie
  .split(';')
  .forEach(
    (cookie) =>
      (document.cookie = cookie.replace(/^ +/, '').replace(/[=].*/, `=;expires=${new Date(0).toUTCString()};path=/`))
  )

// Find the number of days between two days
export const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

// Capitalize a String
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

// Check if the array is empty
export const isNotEmpty = (arr) => Array.isArray(arr) && arr.length > 0

// Detect Dark Mode
export const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

export const fetchSomething = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

export const toFixed = (number, m) => {
  if (typeof number !== 'number') {
    throw new Error('number不是数字')
  }
  let result = Math.round(10 ** m * number) / 10 ** m
  result = String(result)
  if (result.indexOf('.') === -1) {
    if (m !== 0) {
      result += '.'
      result += new Array(m + 1).join('0')
    }
  } else {
    const arr = result.split('.')
    if (arr[1].length < m) {
      arr[1] += new Array(m - arr[1].length + 1).join('0')
    }
    result = arr.join('.')
  }
  return result
}
export const toFixedBug = (n, fixed) => ~~(10 ** fixed * n) / 10 ** fixed

export const promiseWithTimeout = (promise, timeout) => {
  const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve('Time Out!'), timeout))
  return Promise.race([timeoutPromise, promise])
}

export const shuffleArr = (arr) => arr.sort(() => 0.5 - Math.random())
export const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time))
// const handleNotification = async (message) => {
//     setShowNotification(true);
//     await sleep("3000ms");
//     setShowNotification(false);
//   };
export const ThousandNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const RandomId = (len) => Math.random().toString(36).substring(3, len)
export const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const isEmptyArray = (arr) => Array.isArray(arr) && !arr.length
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const asyncTo = (promise) => promise.then((data) => [null, data]).catch((err) => [err])
export const hasFocus = (element) => element === document.activeElement
export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
export const randomString = () => Math.random().toString(36).slice(2)
export const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
export const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
export const pause = (millions) => new Promise((resolve) => setTimeout(resolve, millions))
export const camelizeCamelCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase()))
    .replace(/\s+/g, '')

export const copyTextToClipboard = async (textToCopy) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy)
      console.log('已成功复制到剪贴板')
    }
  } catch (err) {
    console.error(`复制到剪贴板失败:${err.message}`)
  }
}

export const getRandomId = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// https://github.com/Azure/fetch-event-source
// https://github.com/mpetazzoni/sse.js
// https://nodejs.org/api/http.html#httprequesturl-options-callback
export const oneApiChat = (chatList, token, signal) =>
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: chatList,
      stream: true,
    }),
  })

export const getCurrentDate = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const exportJsonData = (data) => {
  const date = getCurrentDate()
  const jsonString = JSON.stringify(JSON.parse(data), null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `chat-store_${date}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const saveHtmlToPng = async (eleHtml, successFun, errorFun) => {
  try {
    const ele = eleHtml ?? document.getElementById('image-wrapper')
    const canvas = await html2canvas(ele, {
      useCORS: true,
    })
    const imgUrl = canvas.toDataURL('image/png')
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = imgUrl
    tempLink.setAttribute('download', 'chat-shot.png')
    if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank')

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(imgUrl)
    if (successFun) successFun()
    Promise.resolve()
  } catch (error) {
    if (errorFun) errorFun(error.message)
  }
}

export const trimTopic = (topic) => topic.replace(/[，。！？”“"、,.!?]*$/, '')

// onClick={() => importFromFile()}
// readFromFile().then((content) => { JSON.parse(content)})

export const readFromFile = () =>
  new Promise((res, rej) => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'application/json'

    fileInput.onchange = (event) => {
      const file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        res(e.target.result)
      }
      fileReader.onerror = (e) => rej(new Error(e))
      fileReader.readAsText(file)
    }

    fileInput.click()
  })

export const prettyObject = (msg) => {
  let obj = ''
  if (typeof msg !== 'string') {
    obj = JSON.stringify(msg, null, '  ')
  }
  if (obj === '{}') {
    return obj.toString()
  }
  if (obj.startsWith('```json')) {
    return obj
  }
  return ['```json', obj, '```'].join('\n')
}

export const getFileType = (data, fileName) => {
  // 根据文件扩展名判断类型
  const extension = fileName.split('.').pop().toLowerCase()
  switch (extension) {
    case 'txt':
      return 'text/plain'
    case 'json':
      return 'application/json'
    case 'doc':
      return 'application/msword'
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    case 'xls':
      return 'application/vnd.ms-excel'
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    case 'ppt':
      return 'application/vnd.ms-powerpoint'
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    case 'pdf':
      return 'application/pdf'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'gif':
      return 'image/gif'
    case 'zip':
      return 'application/zip'
    case 'rar':
      return 'application/x-rar-compressed'
    // 可以继续添加其他类型...
    default:
      // 如果无法根据扩展名判断，则尝试根据数据内容判断或返回默认类型
      if (typeof data === 'string') {
        try {
          JSON.parse(data)
          return 'application/json'
        } catch (event) {
          console.log('event', event)
          return 'text/plain'
        }
      } else if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        return 'application/octet-stream' // 默认二进制流
      } else {
        return 'application/octet-stream' // 默认类型，无法确定时使用
      }
  }
}
// 导出
export const exportFile = (res, fileName) => {
  if (res?.headers['content-type']?.indexOf('application/json') !== -1) {
    return
  }
  const disposition =
    (res.headers && res.headers['content-disposition']) || `attachment;filename=${fileName || 'file'}.xlsx`
  const disName = decodeURI(disposition?.split('=')[1].replace(/'/g, '')).replace(/"/g, '').replace("utf-8''", '') || ''

  const fileType = getFileType(res.data, fileName || disName)
  const blob = new Blob([res.data], { type: fileType })

  const objectUrl = URL.createObjectURL(blob)
  const downloadElement = document.createElement('a')
  document.body.appendChild(downloadElement)
  downloadElement.style = 'display: none'
  downloadElement.href = objectUrl
  downloadElement.download = disName
  downloadElement.click()
  document.body.removeChild(downloadElement)
}

export const getDirection = (ev, obj) => {
  const { width: w, height: h, left, top } = obj.getBoundingClientRect()
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1)
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1)
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
  return d
}
