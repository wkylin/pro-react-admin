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
import { errorRoutes } from './modules/error.routes'
import { annotateRoutesWithPermissions, filterRoutesByAccessiblePaths } from './utils'
import type { RouteNode } from './utils'
import { applyRoutePolicy, mainRouteGroups } from './routeRegistry'
import { permissionService } from '@platform/auth/services/permissionService'
import { matchRoutes, type RouteObject } from 'react-router-dom'

const groupedMainRoutes = mainRouteGroups.flatMap((group) =>
  applyRoutePolicy(group.routes, {
    category: group.category,
    access: group.access,
    layout: group.layout,
  })
)

const mainRoute = applyRoutePolicy(
  [
    {
      ...mainLayoutRoute,
      children: [...(mainLayoutRoute.children ?? []), ...groupedMainRoutes],
    },
  ],
  { category: 'application', access: 'authenticated', layout: 'primary' }
)[0]

// 构建完整路由配置（原始数据）
const rawRootRouter: RouteNode[] = [
  // 主布局路由（包含所有子路由）
  mainRoute,
  // 认证相关路由
  ...applyRoutePolicy(authRoutes, { category: 'authentication', access: 'public', layout: 'none' }),
  // 独立布局路由
  ...applyRoutePolicy(layoutRoutes, { category: 'application', access: 'authenticated', layout: 'standalone' }),
  // 错误路由（404 放在最后）
  ...applyRoutePolicy(
    errorRoutes.filter((route) => route.path !== '*'),
    { category: 'system', access: 'public', layout: 'none' }
  ),
  // 全局 404（必须放在最后）
  ...applyRoutePolicy(
    errorRoutes.filter((route) => route.path === '*'),
    { category: 'system', access: 'public', layout: 'none' }
  ),
].filter(Boolean)

const rootRouter = normalizeRouteTree(rawRootRouter)

const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)

function buildFullPath(parentPath, routePath) {
  const prefix = parentPath === '/' ? '' : parentPath
  const current = routePath?.startsWith('/') ? routePath : `/${routePath || ''}`
  return `${prefix}${current}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}

function normalizeRouteTree(routes: readonly RouteNode[], parentFullPath = ''): RouteNode[] {
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
      const hasChildren = Array.isArray(route.children) && route.children.length > 0
      const routeMeta = route.meta || {}

      const next: RouteNode = {
        ...route,
        key: normalizedKey,
        handle: {
          ...(route.handle || {}),
          routeKey: route.handle?.routeKey || normalizedKey,
          routePath: route.handle?.routePath || fullPath,
          title: route.handle?.title || routeMeta.title || route.name,
          i18nKey: route.handle?.i18nKey || route.i18nKey || routeMeta.i18nKey,
          tab: route.handle?.tab ?? routeMeta.tab ?? (!hasChildren && Boolean(route.element)),
          tabKey: route.handle?.tabKey || routeMeta.tabKey,
        },
        meta: {
          ...routeMeta,
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
  const pathname = String(path || '/').split('?')[0] || '/'
  const matches = matchRoutes(annotatedRootRouter as RouteObject[], { pathname })
  const route = matches?.at(-1)?.route as RouteNode | undefined
  if (!route) return path
  return route.handle?.tabKey || route.meta?.key || route.key || route.meta?.routeKey || route.meta?.title || path
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
