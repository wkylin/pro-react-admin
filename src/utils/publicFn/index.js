import React from 'react'
import routes from '@routers/index'
import Exception403 from '@stateless/Exception/exception403'

export const flattenRoutes = (arr) =>
  arr.reduce((prev, item) => {
    if (Array.isArray(item.children)) {
      prev.push(item)
    }
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item)
  }, [])

export const getKeyName = (path = '/403') => {
  const thePath = path.split('?')[0]
  const curRoute = flattenRoutes(routes)
    .filter((item) => !item.index)
    .filter((item) => item.key?.indexOf(thePath) !== -1)
  if (!curRoute[0]) return { title: '暂无权限', tabKey: '/403', element: <Exception403 /> }
  
  const { name, key, element } = curRoute[0]
  return { title: name, tabKey: key, element }
}
