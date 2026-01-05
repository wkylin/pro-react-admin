import React from 'react'
import { routePermissionMap } from '@src/mock/permission'

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

  const safeMeta = meta && typeof meta === 'object' ? meta : {}

  const route = {
    path,
    element,
    ...rest
  }

  if (index) {
    route.index = true
  }

  if (children && children.length > 0) {
    route.children = children.map((child) => createRoute(child))
  }

  // 添加路由元数据（用于菜单、权限控制等）
  if (name || i18nKey || key !== undefined || auth || Object.keys(safeMeta).length > 0) {
    route.meta = {
      name,
      i18nKey,
      key: key || path,
      auth,
      ...safeMeta
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
          ...(route.meta && typeof route.meta === 'object' ? route.meta : {}),
          path: fullPath,
          element: route.element
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

/**
 * 为路由批量注入 meta.permission（依据 route.key 与 routePermissionMap）
 * 会保留已有 meta 字段
 * @param {Array} routes - 路由配置数组
 * @returns {Array} 注入权限后的路由数组
 */
export const annotateRoutesWithPermissions = (routes = []) => {
  const walk = (arr = []) =>
    arr.map((r) => {
      const meta = { ...(r.meta || {}) }
      // 首先按 key 匹配 permission map
      const identifiers = collectRouteIdentifiers(r)
      const matched = identifiers.find((id) => routePermissionMap[id])
      if (matched) {
        meta.permission = routePermissionMap[matched]
      }
      const next = { ...r, meta }
      if (Array.isArray(r.children)) {
        next.children = walk(r.children)
      }
      return next
    })
  return walk(routes)
}

/**
 * 依据可访问路径列表，过滤路由树（用于菜单/导航）
 * 规则：
 * - route.auth === false 的公开路由保留
 * - 其余根据 key 或 path 与 accessiblePaths 匹配；若有子路由，保留有可访问子路由的父节点
 * @param {Array} routes - 路由配置数组
 * @param {Array} accessiblePaths - 可访问路径列表
 * @returns {Array} 过滤后的路由数组
 */
export const filterRoutesByAccessiblePaths = (routes = [], accessiblePaths = []) => {
  const set = new Set(accessiblePaths)
  const match = (route) => {
    const identifiers = collectRouteIdentifiers(route)
    return identifiers.some((id) => set.has(id))
  }

  const walk = (arr = []) =>
    arr
      .map((r) => {
        const children = Array.isArray(r.children) ? walk(r.children) : []
        const open = r.auth === false || match(r) || children.length > 0
        if (!open) return null
        return { ...r, children }
      })
      .filter(Boolean)

  return walk(routes)
}

const collectRouteIdentifiers = (route = {}) => {
  const identifiers = []
  const add = (value) => {
    if (!value) return
    if (value === '*') {
      identifiers.push('/*')
      return
    }
    const normalized = value.startsWith('/') ? value : `/${value}`
    identifiers.push(normalized)
  }

  add(route.key)
  add(route.meta?.routeKey)
  add(route.meta?.routePath)
  add(route.meta?.legacyKey)
  add(route.path)

  return Array.from(new Set(identifiers))
}
