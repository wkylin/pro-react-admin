/**
 * 将路由树扁平化
 * @param {Array} routes
 * @returns {Array}
 */
const flattenRoutes = (routes) => {
  let flat = []
  routes.forEach((route) => {
    flat.push(route)
    if (route.children) {
      flat = flat.concat(flattenRoutes(route.children))
    }
  })
  return flat
}

/**
 * 递归查找匹配当前路径的路由链
 * 改为基于路径片段的查找算法，支持扁平化路由配置中的层级还原
 * @param {Array} routes 路由配置数组
 * @param {string} pathname 当前访问路径
 * @returns {Array} 匹配到的路由对象数组（从根到叶子）
 */
export const findRouteChain = (routes, pathname) => {
  if (!routes || !Array.isArray(routes)) return []

  const flatRoutes = flattenRoutes(routes)
  const chain = []

  // 1. 分割路径并生成所有父级路径
  // /coupons/add/plugins/perf -> ['/', '/coupons', '/coupons/add', '/coupons/add/plugins', '/coupons/add/plugins/perf']
  const parts = pathname.split('/').filter(Boolean)
  const pathsToCheck = ['/']

  let currentPath = ''
  parts.forEach((part) => {
    currentPath += `/${part}`
    pathsToCheck.push(currentPath)
  })

  // 2. 遍历检查每个路径是否存在于路由表中
  pathsToCheck.forEach((pathToCheck) => {
    // 查找匹配该路径的路由
    const matched = flatRoutes.find((route) => {
      // 精确匹配
      if (route.key === pathToCheck || route.path === pathToCheck) return true

      // 动态路由匹配
      if (route?.key?.includes(':')) {
        const pattern = route?.key.replace(/:[^/]+/g, '[^/]+')
        const regex = new RegExp(`^${pattern}$`)
        return regex.test(pathToCheck)
      }
      return false
    })

    if (matched) {
      // 去重：避免重复添加（例如根路径可能被匹配多次）
      if (!chain.some((item) => item.key === matched.key)) {
        chain.push(matched)
      }
    }
  })

  return chain
}

// 保持兼容导出（如果其他地方用了这两个函数，建议逐步替换）
export const getRouteItem = (arrList, queryItem) => {
  // 简单实现，仅用于兼容旧代码引用，实际逻辑已移至 findRouteChain
  const chain = findRouteChain(arrList, queryItem)
  return chain.length > 0 ? chain[0] : undefined
}

export const getRouteList = (result, arrList, queryItem) => {
  // 适配旧接口：result 是传入的空数组，arrList 是当前层级路由（旧逻辑很奇怪）
  // 这里直接用新逻辑重写
  const chain = findRouteChain(arrList, queryItem)
  chain.forEach((item) => {
    result.push({
      path: item.path,
      key: item.key,
      name: item.name,
      i18nKey: item.i18nKey,
    })
  })
  return result
}
