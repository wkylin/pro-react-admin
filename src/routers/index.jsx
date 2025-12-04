/**
 * 路由配置主文件
 * 整合所有模块化的路由配置
 *
 * @description
 * 路由结构说明：
 * 1. 主布局路由（/）：包含 Layout 和所有需要布局的子路由
 * 2. 认证路由：登录、注册、回调等公开路由
 * 3. 独立布局路由：Dashboard、Portfilo 等独立布局的模块
 * 4. 错误路由：404、403 等异常页面
 */

import React from 'react'
import { mainLayoutRoute } from './modules/layout.routes'
import { authRoutes } from './modules/auth.routes'
import { businessRoutes } from './modules/business.routes'
import { uiRoutes } from './modules/ui.routes'
import { chartRoutes } from './modules/chart.routes'
import { nestedRoutes } from './modules/nested.routes'
import { layoutRoutes } from './modules/layout.routes'
import { errorRoutes } from './modules/error.routes'
import { notificationRoutes } from './modules/notification.routes'
import { techRoutes } from './modules/tech.routes'
import { annotateRoutesWithPermissions, filterRoutesByAccessiblePaths } from './utils'
import { permissionService } from '@src/service/permissionService'

// 整合主布局的子路由
mainLayoutRoute.children = [
  ...mainLayoutRoute.children,
  ...businessRoutes,
  ...uiRoutes,
  ...chartRoutes,
  ...nestedRoutes,
  ...notificationRoutes,
  ...techRoutes,
]

// 构建完整路由配置
const rootRouter = [
  // 主布局路由（包含所有子路由）
  mainLayoutRoute,
  // 认证相关路由
  ...authRoutes,
  // 独立布局路由
  ...layoutRoutes,
  // 错误路由（404 放在最后）
  ...errorRoutes.filter((route) => route.path !== '*'),
  // 全局 404（必须放在最后）
  ...errorRoutes.filter((route) => route.path === '*'),
]

// ✅ 注入 meta.permission（不改变现有结构，仅增强）
const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)

// ✅ 新增：扁平化路由工具函数（authRouter.jsx 需要）
export function flattenRoutes(routes) {
  if (!Array.isArray(routes)) {
    console.error('flattenRoutes: expected array, got:', typeof routes, routes)
    return []
  }

  return routes.reduce((acc, route) => {
    if (!route || typeof route !== 'object') {
      console.warn('flattenRoutes: invalid route item:', route)
      return acc
    }

    acc.push(route)

    if (Array.isArray(route.children) && route.children.length > 0) {
      const childRoutes = flattenRoutes(route.children)
      acc.push(...childRoutes)
    }

    return acc
  }, [])
}

// ✅ 新增：根据路径获取路由 key
export function getKeyName(path = '/') {
  try {
    const flatRoutes = flattenRoutes(annotatedRootRouter)

    if (!flatRoutes || flatRoutes.length === 0) {
      console.warn('getKeyName: no routes available')
      return path
    }

    // normalize incoming path (remove leading slash and query)
    const normalized = String(path || '')
      .split('?')[0]
      .replace(/^\//, '')

    const matchRoute = (r) => {
      if (!r || !r.path) return false
      const rp = String(r.path).replace(/^\//, '')
      if (rp === normalized) return true
      // support param routes like 'notification/:id' -> match '/notification/1'
      if (rp.includes(':')) {
        const pattern = '^' + rp.replace(/:[^/]+/g, '[^/]+') + '$'
        try {
          const re = new RegExp(pattern)
          return re.test(normalized)
        } catch (err) {
          return false
        }
      }
      // support wildcard routes ending with *
      if (rp.endsWith('*')) {
        const base = rp.replace(/\*$/, '')
        return normalized.startsWith(base)
      }
      return false
    }

    const route = flatRoutes.find(matchRoute)

    if (!route) {
      console.warn(`getKeyName: route not found for path "${path}"`)
      return path
    }

    // prefer explicit meta.key, then route.key, then meta.title, then path
    return route.meta?.key || route.key || route.meta?.title || path
  } catch (error) {
    console.error('getKeyName error:', error)
    return path
  }
}

/**
 * ✅ 新增：菜单/导航可见路由（异步按需获取）
 * 仅对主布局的 children 做过滤；其余（auth/error/独立布局）不参与菜单
 * @returns {Promise<Array>} 过滤后的路由配置
 */
export async function getVisibleMenuRoutes() {
  try {
    const accessible = await permissionService.getAccessibleRoutes()
    const main = annotatedRootRouter.find((r) => r.key === '/')
    if (!main) return []
    const filteredChildren = filterRoutesByAccessiblePaths(main.children || [], accessible)
    return [{ ...main, children: filteredChildren }]
  } catch (error) {
    console.error('getVisibleMenuRoutes error:', error)
    return []
  }
}

// ✅ 命名导出（供其他模块使用）
export { rootRouter, annotatedRootRouter }

// ✅ 默认导出注入权限后的路由（保持原有导出方式，增强功能）
export default annotatedRootRouter
