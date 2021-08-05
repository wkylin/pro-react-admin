import { parse, stringify } from 'qs'

// Check env is browser or node
export const getEnv = () => {
  let env
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
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
    for (let key in target) {
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
  let type = typeof obj
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^$/, '$1')
}
