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
import { annotateRoutesWithPermissions, normalizeRouteTree } from './utils'
import type { RouteNode } from './utils'
import { applyRoutePolicy, mainRouteGroups } from './routeRegistry'
import { matchRoutes, type RouteObject } from 'react-router-dom'
import { defaultModules } from '@app/modules/default'

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
      children: [...(mainLayoutRoute.children ?? []), ...defaultModules.routes, ...groupedMainRoutes],
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

export { flattenRouteNodes as flattenRoutes } from '@platform/navigation/routes'

export function getKeyName(path = '/') {
  const pathname = String(path || '/').split('?')[0] || '/'
  const matches = matchRoutes(annotatedRootRouter as RouteObject[], { pathname })
  const route = matches?.at(-1)?.route as RouteNode | undefined
  if (!route) return path
  return route.handle?.tabKey || route.meta?.key || route.key || route.meta?.routeKey || route.meta?.title || path
}

// ✅ 命名导出（供其他模块使用）
export { rootRouter, annotatedRootRouter }

// ✅ 默认导出注入权限后的路由（保持原有导出方式，增强功能）
export default annotatedRootRouter
