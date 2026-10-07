import type { ReactNode } from 'react'
import { matchPath } from 'react-router-dom'
import routes from '@src/routers/index'
import Exception404 from '@src/components/stateless/Exception/exception404'

interface RouteMeta {
  title?: string
  i18nKey?: string
  [key: string]: unknown
}

interface RouteEntry {
  auth?: boolean
  children?: RouteEntry[]
  element?: ReactNode
  i18nKey?: string
  key?: string
  meta?: RouteMeta | null
  name?: string
  path?: string
}

export const flattenRoutes = (arr: readonly RouteEntry[] = []): RouteEntry[] =>
  arr.reduce<RouteEntry[]>((prev, item) => {
    if (!item) return prev
    prev.push(item)
    if (Array.isArray(item.children) && item.children.length > 0) {
      prev.push(...flattenRoutes(item.children))
    }
    return prev
  }, [])

/**
 * 根据当前 pathname 获取路由配置详情（支持动态路由匹配）
 */
export const getKeyName = (pathname: string = location.pathname) => {
  // 1. 移除参数，标准化路径
  const purePath = pathname.split('?')[0]

  // 2. 获取扁平化路由表 (缓存起来性能更好，这里演示逻辑)
  const allRoutes = flattenRoutes(routes)

  // 3. 查找匹配的路由
  // 优先精确匹配 key
  let route = allRoutes.find((r) => r.key === purePath)

  // 如果没找到，尝试 pattern 匹配 (处理 /user/:id 这种情况)
  if (!route) {
    route = allRoutes.find((r) => {
      // 忽略 layout 路由或无 path 路由
      if (!r.path && !r.key) return false

      // 确保 key 是字符串，避免 matchPath 报错
      if (typeof r.key !== 'string') return false

      try {
        // 使用 react-router 的 matchPath 算法
        return matchPath({ path: r.key, end: true, caseSensitive: false }, purePath)
      } catch (error) {
        console.warn('matchPath error for key:', r.key, error)
        return false
      }
    })
  }

  // 4. 兜底处理 (404)
  if (!route) {
    return {
      title: 'Not Found',
      tabKey: '/404',
      element: <Exception404 />,
      i18nKey: 'route.404',
      path: purePath,
      auth: false,
    }
  }

  // 5. 返回统一结构供 ProTabs/KeepAlive 使用
  // 🔥 关键修正：动态路由处理
  // 如果是静态路由，使用标准化的 route.key (保证 /qrcode 和 qrcode 命中同一个)
  // 如果是动态路由 (含 : 或 *)，使用当前真实路径 purePath (保证 /detail/1 和 /detail/2 是两个 Tab)
  const isDynamic = route.key?.includes(':') || route.key?.includes('*')
  const finalTabKey = isDynamic ? purePath : route.key

  return {
    title: route.meta?.title || route.name || 'New Tab',
    tabKey: finalTabKey,
    element: route.element,
    i18nKey: route.i18nKey || route.meta?.i18nKey,
    auth: route.auth,
    path: purePath, // 真实访问的路径 (带参数)
    closable: route.key !== '/', // 首页不可关闭
    // 传递 meta 用于后续判断
    meta: route.meta,
  }
}

// 移除不再使用的废弃函数 (buildMatchEntry, collectRouteIdentifiers, doesPathMatch, calcMatchScore, normalizeMatchTarget, normalizeTabKey)
// 这些函数已在上述 getKeyName 重构中被标准 React Router 逻辑替代

export const getLocalStorage = <T = unknown,>(key: string): T | string | null => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value ?? 'null') as T
  } catch (error) {
    console.log('getLocalStorage parse error:', error, value)
    return value
  }
}

export const setLocalStorage = (key: string, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key)
}

export const clearLocalStorage = (): void => {
  window.localStorage.clear()
}

/**
 * 格式化时间函数
 * @param {Date} time 需要转换的时间
 * @param {string} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export const formatTime = (date: Date, format: string): string => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date input')
  }

  const padZero = (num: number, len = 2): string => num.toString().padStart(len, '0')

  const map: Record<string, string> = {
    yyyy: String(date.getFullYear()),
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
export const randomString = (len = 32): string => {
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
export const toThousands = (num?: number | string): string => {
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
export const getTableNumber = (page: number | string, pageSize?: number | string, index?: number): number => {
  if (pageSize === undefined && index === undefined) {
    return Number(page) + 1
  }
  if (index !== undefined) {
    return (Number(page) - 1) * Number(pageSize) + index + 1
  }
  return 0
}

// 随机排列数组
export const shuffleArray = <T,>(arr: T[]): T[] =>
  [...Array(arr.length)]
    .map((_, i) => Math.floor(Math.random() * (i + 1)))
    .reduce(
      (shuffled, r, i) =>
        shuffled.map((num, j) => {
          if (j === i) return shuffled[r]
          if (j === r) return shuffled[i]
          return num
        }),
      arr
    )

// 根据特定对象属性对数组进行分组
export const groupBy = <T, K extends PropertyKey>(arr: T[], groupFn: (obj: T) => K): Record<K, T[]> =>
  arr.reduce<Record<K, T[]>>(
    (grouped, obj) => {
      const key = groupFn(obj)
      return { ...grouped, [key]: [...(grouped[groupFn(obj)] || []), obj] }
    },
    {} as Record<K, T[]>
  )

export const areEqual = <T,>(arr1: T[], arr2: T[]): boolean =>
  JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
export const areEqual2 = <T,>(arr1: T[], arr2: T[]): boolean => arr1.sort().join(',') === arr2.sort().join(',')

export const jsonToMap = (json: string): Map<string, unknown> => {
  const parsed: unknown = JSON.parse(json)
  return new Map(Object.entries(parsed as object))
}

// 蛇形转换为驼峰
export const snakeToCamelCase = (snake: string): string =>
  snake.toLowerCase().replace(/(_\w)/g, (word: string) => word.toUpperCase().substr(1))

export const mathRound = (num: number): number => Math.round(num * 100) / 100

export const openInNewTab = (url: string): Window | null => {
  const win = window.open(url, '_blank')
  if (win) {
    win.focus()
  }
  return win
}

export const range = (start: number, end?: number, step = 1): number[] => {
  const output: number[] = []
  const rangeEnd = end === undefined ? start : end
  const rangeStart = end === undefined ? 0 : start
  for (let i = rangeStart; i < rangeEnd; i += step) {
    output.push(i)
  }
  return output
}

export const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}

export const shuffleArr = <T,>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
