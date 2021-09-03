/* eslint-disable no-useless-call */
import { parse, stringify } from 'qs'

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

export const isArray = (val) => {
  return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]'
}

export const isURLSearchParams = (val) => {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

export const isDate = (val) => {
  return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Date]'
}

export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}

export const forEach2ObjArr = (target, callback) => {
  if (!target) return

  if (typeof target !== 'object') {
    target = [target]
  }

  if (isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      callback.call(null, target[i], i, target)
    }
  } else {
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        callback.call(null, target[key], key, target)
      }
    }
  }
}

export const getParamObject = (val) => {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), { strictNullHandling: true })
  }
  if (typeof val === 'string') {
    return [val]
  }
  return val
}

export const reqStringify = (val) => {
  return stringify(val, { arrayFormat: 'repeat', strictNullHandling: true })
}

export const getType = (obj) => {
  const type = typeof obj
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^$/, '$1')
}

export const hidePhone = (phone) => phone && phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

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
  const reg = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
  return reg.test(value)
}

export const limitDecimal = (val) => val.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
