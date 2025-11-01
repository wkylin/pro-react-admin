import React from 'react'

/**
 * 路由工具函数
 */

/**
 * 创建路由配置对象
 * @param {Object} config - 路由配置
 * @returns {Object} 路由对象
 */
export const createRoute = (config) => {
  const { path, element, index = false, children, name, i18nKey, key, auth = false, meta = {}, ...rest } = config

  const route = {
    path,
    element,
    ...rest,
  }

  if (index) {
    route.index = true
  }

  if (children && children.length > 0) {
    route.children = children.map((child) => createRoute(child))
  }

  // 添加路由元数据（用于菜单、权限控制等）
  if (name || i18nKey || key !== undefined || auth || Object.keys(meta).length > 0) {
    route.meta = {
      name,
      i18nKey,
      key: key || path,
      auth,
      ...meta,
    }
  }

  return route
}

/**
 * 创建带权限保护的路由
 * @param {Object} config - 路由配置
 * @param {React.Component} ProtectedComponent - 权限保护组件
 * @returns {React.Component} 保护后的元素
 */
export const createProtectedElement = (config, ProtectedComponent) => {
  return <ProtectedComponent>{config.element}</ProtectedComponent>
}

/**
 * 扁平化路由配置（用于权限检查、菜单生成等）
 * @param {Array} routes - 路由配置数组
 * @returns {Array} 扁平化的路由数组
 */
export const flattenRoutes = (routes) => {
  const result = []

  const traverse = (routeArray, parentPath = '') => {
    routeArray.forEach((route) => {
      const fullPath = parentPath ? `${parentPath}/${route.path}`.replace('//', '/') : route.path

      if (route.meta) {
        result.push({
          ...route.meta,
          path: fullPath,
          element: route.element,
        })
      }

      if (route.children && route.children.length > 0) {
        traverse(route.children, fullPath)
      }
    })
  }

  traverse(routes)
  return result
}

/**
 * 根据路径获取路由配置
 * @param {Array} routes - 路由配置数组
 * @param {String} pathname - 当前路径
 * @returns {Object|null} 路由配置对象
 */
export const getRouteByPath = (routes, pathname) => {
  for (const route of routes) {
    if (route.path === pathname || (route.path === '*' && pathname)) {
      return route
    }

    if (route.children) {
      const childRoute = getRouteByPath(route.children, pathname)
      if (childRoute) return childRoute
    }
  }

  return null
}
