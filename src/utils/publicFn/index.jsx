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
