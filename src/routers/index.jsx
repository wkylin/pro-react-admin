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

import { mainLayoutRoute, layoutRoutes } from './modules/layout.routes'
import { authRoutes } from './modules/auth.routes'
import { businessRoutes } from './modules/business.routes'
import { uiRoutes } from './modules/ui.routes'
import { chartRoutes } from './modules/chart.routes'
import { nestedRoutes } from './modules/nested.routes'
import { errorRoutes } from './modules/error.routes'
import { notificationRoutes } from './modules/notification.routes'
import { techRoutes } from './modules/tech.routes'
import { zustandRoutes } from './modules/zustand.routes'
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
  ...zustandRoutes,
]

// 构建完整路由配置（原始数据）
const rawRootRouter = [
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
].filter(Boolean)

const rootRouter = normalizeRouteTree(rawRootRouter)

const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)

function buildFullPath(parentPath, routePath) {
  const prefix = parentPath === '/' ? '' : parentPath
  const current = routePath?.startsWith('/') ? routePath : `/${routePath || ''}`
  return `${prefix}${current}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}

function normalizeRouteTree(routes, parentFullPath = '') {
  if (!Array.isArray(routes)) return []

  return routes
    .filter((route) => !!route)
    .map((route) => {
      let fullPath = parentFullPath

      if (!route.index) {
        if (route.path) {
          fullPath = buildFullPath(parentFullPath, route.path)
        }
      }
      const normalizedKey = fullPath

      const next = {
        ...route,
        key: normalizedKey,
        meta: {
          ...(route.meta || {}),
          routePath: fullPath,
          routeKey: normalizedKey,
          ...(route.key && route.key !== normalizedKey ? { legacyKey: route.key } : {}),
        },
      }

      if (Array.isArray(route.children) && route.children.length > 0) {
        next.children = normalizeRouteTree(route.children, fullPath)
      }

      return next
    })
}
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

export function getKeyName(path = '/') {
  try {
    const flatRoutes = flattenRoutes(annotatedRootRouter)

    if (!flatRoutes || flatRoutes.length === 0) {
      console.warn('getKeyName: no routes available')
      return path
    }

    const normalized = String(path || '')
      .split('?')[0]
      .replace(/^\//, '')

    const doesMatch = (candidate) => {
      if (!candidate && candidate !== '') return false
      const value = String(candidate).trim()
      if (!value) {
        return normalized === ''
      }
      const candidatePath = value.replace(/^\//, '')

      if (candidatePath === '' && normalized === '') {
        return true
      }

      if (candidatePath === normalized) {
        return true
      }

      if (candidatePath.includes(':')) {
        const pattern = '^' + candidatePath.replace(/:[^/]+/g, '[^/]+') + '$'
        try {
          return new RegExp(pattern).test(normalized)
        } catch (err) {
          console.warn('getKeyName: invalid route pattern', candidatePath, err)
          return false
        }
      }

      if (candidatePath.endsWith('*')) {
        const base = candidatePath.replace(/\*$/, '')
        if (!base) {
          return false
        }
        return normalized.startsWith(base.replace(/\/$/, ''))
      }

      return false
    }

    const matchRoute = (r) => {
      if (!r) return false
      const candidates = [r.meta?.routePath, r.key, r.meta?.legacyKey, r.path]
      return candidates.some((candidate) => doesMatch(candidate))
    }

    const route = flatRoutes.find(matchRoute)

    if (!route) {
      console.warn(`getKeyName: route not found for path "${path}"`)
      return path
    }

    // prefer explicit meta.key, then existing key, then normalized path, title, fallback path
    return route.meta?.key || route.key || route.meta?.routeKey || route.meta?.title || path
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
