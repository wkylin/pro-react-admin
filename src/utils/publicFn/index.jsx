import React from 'react'
import routes from '@src/routers/index'
import Exception404 from '@src/components/stateless/Exception/exception404'

export const flattenRoutes = (arr = []) =>
  arr.reduce((prev, item) => {
    if (!item) return prev
    prev.push(item)
    if (Array.isArray(item.children) && item.children.length > 0) {
      prev.push(...flattenRoutes(item.children))
    }
    return prev
  }, [])

export const getKeyName = (pathName = '/404') => {
  const fullPath = String(pathName || '/')
  const normalizedPath = normalizeMatchTarget(fullPath)

  const flat = flattenRoutes(routes).filter((item) => item && !item.index)

  const matched = flat
    .map((route) => buildMatchEntry(route, normalizedPath))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .at(0)

  if (!matched) {
    return {
      title: 'Not Found',
      tabKey: '/404',
      element: <Exception404 />,
      i18nKey: 'Not Found',
    }
  }

  const { route, candidate } = matched
  const { name, element, index, auth, i18nKey } = route

  const keepQuery = route.meta?.keepQueryTabs === true
  const routePattern = String(route.meta?.routeKey || route.key || route.path || candidate || '')
  const isParamRoute = routePattern.includes(':')
  const matchedByWildcard = routePattern.includes('*') || (candidate && String(candidate).includes('*'))
  const normalizedActualPath = normalizeTabKey(`/${normalizedPath}`)
  const baseTabKey = normalizeTabKey(route.meta?.routeKey || route.key || candidate || normalizedActualPath)

  let tabKey
  if (fullPath.includes('?')) {
    tabKey = fullPath
  } else if (isParamRoute || matchedByWildcard) {
    tabKey = keepQuery ? fullPath : normalizedActualPath
  } else {
    tabKey = keepQuery ? fullPath : baseTabKey
  }

  tabKey = normalizeTabKey(tabKey)

  return {
    index: index ?? false,
    path: route.meta?.routePath || route.path,
    auth,
    title: name || route.meta?.title || 'Unknown Route',
    tabKey,
    element: element || <Exception404 />,
    i18nKey,
  }
}

const buildMatchEntry = (route, normalizedPath) => {
  const candidates = collectRouteIdentifiers(route)
  let bestCandidate = null
  let bestScore = -1

  candidates.forEach((candidate) => {
    if (!doesPathMatch(normalizedPath, candidate)) return
    const score = calcMatchScore(candidate)
    if (score > bestScore) {
      bestScore = score
      bestCandidate = candidate
    }
  })

  if (!bestCandidate) return null

  return {
    route,
    candidate: bestCandidate,
    score: bestScore,
  }
}

const collectRouteIdentifiers = (route = {}) => {
  const identifiers = []
  const add = (value) => {
    if (value === undefined || value === null) return
    const val = String(value).trim()
    if (val === '') return
    identifiers.push(val)
  }

  add(route.meta?.routePath)
  add(route.meta?.routeKey)
  add(route.meta?.legacyKey)
  add(route.key)
  add(route.path)

  return Array.from(new Set(identifiers))
}

const normalizeMatchTarget = (fullPath) =>
  String(fullPath || '/')
    .split('?')[0]
    .replace(/^\//, '')

const doesPathMatch = (normalizedPath, candidate) => {
  if (candidate === undefined || candidate === null) return false
  const value = String(candidate).trim()
  const candidatePath = value.replace(/^\//, '')

  if (!candidatePath) {
    return normalizedPath === ''
  }

  if (candidatePath === normalizedPath) {
    return true
  }

  if (candidatePath.includes(':')) {
    const pattern = '^' + candidatePath.replace(/:[^/]+/g, '[^/]+') + '$'
    try {
      return new RegExp(pattern).test(normalizedPath)
    } catch (error) {
      console.warn('getKeyName: invalid route pattern', candidatePath, error)
      return false
    }
  }

  if (candidatePath.endsWith('*')) {
    const base = candidatePath.replace(/\*$/, '')
    if (!base) return false
    const normalizedBase = base.replace(/\/$/, '')
    return normalizedPath.startsWith(normalizedBase)
  }

  return false
}

const calcMatchScore = (candidate) => {
  if (!candidate) return 0
  return String(candidate).replace(/^\//, '').replace(/\*/g, '').length
}

const normalizeTabKey = (value) => {
  if (!value) return '/'
  const str = String(value)
  return str.startsWith('/') ? str : `/${str}`
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
export const formatTime = (date, format) => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date input')
  }

  const padZero = (num, len = 2) => num.toString().padStart(len, '0')

  const map = {
    yyyy: date.getFullYear(),
    MM: padZero(date.getMonth() + 1),
    dd: padZero(date.getDate()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds()),
  }

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => map[match])
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
    result = `,${numStr.slice(-3)}${result}`
    numStr = numStr.slice(0, numStr.length - 3)
  }
  if (numStr) {
    result = numStr + result
  }
  return result
}

// 获取表格序号
export const getTableNumber = (page, pageSize, index) => {
  if (pageSize === undefined && index === undefined) {
    return Number(page) + 1
  }
  if (index !== undefined) {
    return (Number(page) - 1) * Number(pageSize) + index + 1
  }
  return 0
}

// 随机排列数组
export const shuffleArray = (arr) =>
  [...Array(arr.length)]
    .map((_, i) => Math.floor(Math.random() * (i + 1)))
    .reduce((shuffled, r, i) => shuffled.map((num, j) => (j === i ? shuffled[r] : j === r ? shuffled[i] : num)), arr)

// 根据特定对象属性对数组进行分组
export const groupBy = (arr, groupFn) =>
  arr.reduce(
    (grouped, obj) => ({
      ...grouped,
      [groupFn(obj)]: [...(grouped[groupFn(obj)] || []), obj],
    }),
    {}
  )

// const fruits = [
//   {
//     name: 'apple', color: 'yellow'
//   },
//   {
//     name: 'banana', color: 'red'
//   },
//   {
//     name: 'pine', color: 'yellow'
//   },
//   {
//     name: 'berry', color: 'red'
//   },
// ]

// const groupedByName = groupBy(fruits, (fruit) => fruit.color)

// const people = [
//   { name: 'Alice', role: 'admin' },
//   { name: 'Bob', role: 'user' },
//   { name: 'Charlie', role: 'admin' },
// ];
// const grouped = people.reduce((acc, person) => {
//   (acc[person.role] = acc[person.role] || []).push(person);
//   return acc;
// }, {});

export const areEqual = (arr1, arr2) => JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
export const areEqual2 = (arr1, arr2) => arr1.sort().join(',') === arr2.sort().join(',')

export const jsonToMap = (json) => new Map(Object.entries(JSON.parse(json)))

// 蛇形转换为驼峰
export const snakeToCamelCase = (snake) => snake.toLowerCase().replace(/(_\w)/g, (word) => word.toUpperCase().substr(1))

export const mathRound = (num) => Math.round(num * 100) / 100

export const openInNewTab = (url) => {
  const win = window.open(url, '_blank')
  win.focus()
  return win
}

export const range = (start, end, step = 1) => {
  let output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}

export const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const chunkArray = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
}

export const partitionArray = (arr, fn) => {
  return arr.reduce(
    ([pass, fail], elem) => {
      if (callback(elem)) {
        pass.push(elem)
      } else {
        fail.push(elem)
      }
      return [pass, fail]
    },
    [[], []]
  )
}

export const shuffleArr = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
