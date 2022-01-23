import routes from '@routers/index'
import ErrorPage from '@stateless/Exception/exception403'

export const flattenRoutes = (arr) =>
  arr.reduce((prev, item) => {
    if (Array.isArray(item.children)) {
      prev.push(item)
    }
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item)
  }, [])

export const getKeyName = (path = '/403') => {
  const thePath = path.split('?')[0]
  console.log('thePath', thePath)
  console.log(
    'flattenRoutes(routes)',
    flattenRoutes(routes).filter((item) => !item.index)
  )
  const curRoute = flattenRoutes(routes)
    .filter((item) => !item.index)
    .filter((item) => item.key?.indexOf(thePath) !== -1)
  if (!curRoute[0]) return { title: '暂无权限', tabKey: '403', component: ErrorPage }
  console.log('curRoute', curRoute)
  const { name, key, component } = curRoute[0]
  return { title: name, tabKey: key, component }
}
