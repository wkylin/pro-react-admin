import React from 'react'
import routes from '@src/routers/index'
import Exception404 from '@src/components/stateless/Exception/exception404'

export const flattenRoutes = (arr) =>
  arr.reduce((prev, item) => {
    if (Array.isArray(item.children)) {
      prev.push(item)
    }
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item)
  }, [])

export const getKeyName = (pathName = '/404') => {
  const thePath = pathName.split('?')[0]
  const curRoute = flattenRoutes(routes)
    .filter((item) => !item.index)
    .filter((item) => item.key?.indexOf(thePath) !== -1)
  if (!curRoute[0]) {
    return {
      title: 'Not Found',
      tabKey: '/404',
      element: <Exception404 />,
      i18nKey: 'notFound',
    }
  }

  const { name, key, element, index, path, auth, i18nKey } = curRoute[0]
  return { index: index ?? false, path, auth, title: name, tabKey: key, element, i18nKey }
}

export const getLocalStorage = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  window.localStorage.clear()
}

/**
 * 格式化时间函数
 * @param {Date} time 需要转换的时间
 * @param {string} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export const formatTime = (time, fmt) => {
  if (!time) return ''
  const date = new Date(time)
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k].toString() : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

/**
 * 生成随机字符串函数
 * @param {number} len 随机字符串的长度，默认为32
 */
export const randomString = (len = 32) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 数字格式化函数，每三个数字加逗号
 * @param {number} num 需要格式化的数字，不能以0开头
 */
export const toThousands = (num) => {
  let result = ''
  let numStr = (num || 0).toString()
  while (numStr.length > 3) {
    result = ',' + numStr.slice(-3) + result
    numStr = numStr.slice(0, numStr.length - 3)
  }
  if (numStr) {
    result = numStr + result
  }
  return result
}
