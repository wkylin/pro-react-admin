import type { ComponentType, PropsWithChildren, ReactNode } from 'react'
import { routePermissionMap } from '@src/mock/permission'

/**
 * 路由工具函数
 */

export interface RouteMeta extends Record<string, unknown> {
  routeKey?: string
  routePath?: string
  legacyKey?: string
  permission?: string
}

export interface RouteNode {
  path?: string
  element?: ReactNode
  index?: boolean
  children?: RouteNode[]
  name?: string
  i18nKey?: string
  key?: string
  auth?: boolean
  meta?: RouteMeta | null
  [property: string]: unknown
}

export type FlattenedRoute = RouteMeta & {
  path: string | undefined
  element?: ReactNode
}

const isRouteMeta = (value: unknown): value is RouteMeta => typeof value === 'object' && value !== null

/**
 * 创建路由配置对象
 * @param config 路由配置
 * @returns 路由对象
 */
export const createRoute = (config: RouteNode): RouteNode => {
  const { path, element, index = false, children, name, i18nKey, key, auth = false, meta = {}, ...rest } = config
  const safeMeta = isRouteMeta(meta) ? meta : {}
  const route: RouteNode = {
    path,
    element,
    ...rest,
  }

  if (index) {
    route.index = true
  }

  if (children && children.length > 0) {
    route.children = children.map((child: RouteNode): RouteNode => createRoute(child))
  }

  if (name || i18nKey || key !== undefined || auth || Object.keys(safeMeta).length > 0) {
    route.meta = {
      name,
      i18nKey,
      key: key || path,
      auth,
      ...safeMeta,
    }
  }

  return route
}

/**
 * 创建带权限保护的路由
 * @param config 路由配置
 * @param ProtectedComponent 权限保护组件
 * @returns 保护后的元素
 */
export const createProtectedElement = (
  config: RouteNode,
  ProtectedComponent: ComponentType<PropsWithChildren>
): ReactNode => <ProtectedComponent>{config.element}</ProtectedComponent>

/**
 * 扁平化路由配置（用于权限检查、菜单生成等）
 * @param routes 路由配置数组
 * @returns 扁平化的路由数组
 */
export const flattenRoutes = (routes: readonly RouteNode[]): FlattenedRoute[] => {
  const result: FlattenedRoute[] = []

  const traverse = (routeArray: readonly RouteNode[], parentPath: string | undefined = ''): void => {
    routeArray.forEach((route: RouteNode): void => {
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
 * @param routes 路由配置数组
 * @param pathname 当前路径
 * @returns 路由配置对象
 */
export const getRouteByPath = (routes: readonly RouteNode[], pathname: string): RouteNode | null => {
  for (const route of routes) {
    if (route.path === pathname || (route.path === '*' && pathname)) {
      return route
    }

    if (route.children) {
      const childRoute: RouteNode | null = getRouteByPath(route.children, pathname)
      if (childRoute) return childRoute
    }
  }

  return null
}

/**
 * 为路由批量注入 meta.permission（依据 route.key 与 routePermissionMap）
 * 会保留已有 meta 字段
 * @param routes 路由配置数组
 * @returns 注入权限后的路由数组
 */
export const annotateRoutesWithPermissions = (routes: readonly RouteNode[] = []): RouteNode[] => {
  const walk = (routeNodes: readonly RouteNode[] = []): RouteNode[] =>
    routeNodes.map((route: RouteNode): RouteNode => {
      const meta: RouteMeta = { ...(route.meta ?? {}) }
      const identifiers = collectRouteIdentifiers(route)
      const matched = identifiers.find((identifier: string): boolean => Boolean(routePermissionMap[identifier]))
      if (matched) {
        meta.permission = routePermissionMap[matched]
      }
      const next: RouteNode = { ...route, meta }
      if (Array.isArray(route.children)) {
        next.children = walk(route.children)
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
 * @param routes 路由配置数组
 * @param accessiblePaths 可访问路径列表
 * @returns 过滤后的路由数组
 */
export const filterRoutesByAccessiblePaths = (
  routes: readonly RouteNode[] = [],
  accessiblePaths: readonly string[] = []
): RouteNode[] => {
  const accessiblePathSet = new Set<string>(accessiblePaths)
  const matchesAccessiblePath = (route: RouteNode): boolean =>
    collectRouteIdentifiers(route).some((identifier: string): boolean => accessiblePathSet.has(identifier))

  const walk = (routeNodes: readonly RouteNode[] = []): RouteNode[] =>
    routeNodes.reduce<RouteNode[]>((filteredRoutes, route) => {
      const children = Array.isArray(route.children) ? walk(route.children) : []
      const open = route.auth === false || matchesAccessiblePath(route) || children.length > 0
      if (open) {
        filteredRoutes.push({ ...route, children })
      }
      return filteredRoutes
    }, [])

  return walk(routes)
}

const collectRouteIdentifiers = (route: RouteNode): string[] => {
  const identifiers: string[] = []
  const add = (value: string | undefined): void => {
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
