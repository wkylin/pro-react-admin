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

export const getKeyName = (path = '/404') => {
  const thePath = path.split('?')[0]
  const curRoute = flattenRoutes(routes)
    .filter((item) => !item.index)
    .filter((item) => item.key?.indexOf(thePath) !== -1)
  if (!curRoute[0])
    return {
      title: 'Not Found',
      tabKey: '/404',
      element: <Exception404 />,
    }

  const { name, key, element } = curRoute[0]
  return { title: name, tabKey: key, element }
}
