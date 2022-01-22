import routes from '@routers/index'
import ErrorPage from '@stateless/Exception/exception403'

/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 * @param {string} child 需要递归的字段名
 */
export const flattenRoutes = (arr) =>
  arr.reduce((prev, item) => {
    if (Array.isArray(item.routes)) {
      prev.push(item)
    }
    return prev.concat(Array.isArray(item.routes) ? flattenRoutes(item.routes) : item)
  }, [])

/**
 * 根据路径获取路由的name和key
 * @param path 路由
 */
export const getKeyName = (path = '/403') => {
  const truePath = path.split('?')[0]
  const curRoute = flattenRoutes(routes).filter((item) => item.path.includes(truePath))
  if (!curRoute[0]) return { title: '暂无权限', tabKey: '403', component: ErrorPage }
  const { name, key, component } = curRoute[0]
  return { title: name, tabKey: key, component }
}
