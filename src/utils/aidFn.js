import { parse, stringify } from 'qs'

const toString = Object.prototype.toString

// Check env is browser or node
export function getEnv() {
  let env
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    env = 'NODE'
  }
  if (typeof XMLHttpRequest !== 'undefined') {
    env = 'BROWSER'
  }
  return env
}

export function isArray(val) {
  return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]'
}

export function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

export function isDate(val) {
  return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val) {
  return val !== null && typeof val === 'object'
}

export function forEach2ObjArr(target, callback) {
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

export function getParamObject(val) {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), { strictNullHandling: true })
  }
  if (typeof val === 'string') {
    return [val]
  }
  return val
}

export function reqStringify(val) {
  return stringify(val, { arrayFormat: 'repeat', strictNullHandling: true })
}
