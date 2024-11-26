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
