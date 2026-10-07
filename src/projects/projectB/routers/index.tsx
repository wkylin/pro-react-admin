import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { annotateRoutesWithPermissions, type RouteMeta } from '@src/routers/utils'

import ProjectBHome from '../pages/Home'
import ProjectBAbout from '../pages/About'
import ProjectBReuse from '../pages/Reuse'
import ProjectBNotFound from '../pages/NotFound'

type ProjectRouteObject = RouteObject & {
  auth?: boolean
  key?: string
  meta?: RouteMeta | null
  children?: ProjectRouteObject[]
}

const rawRootRouter: ProjectRouteObject[] = [
  {
    path: '/',
    auth: false,
    element: <Navigate to="/projectB/home" replace />,
  },
  {
    path: '/projectB',
    auth: false,
    element: <Navigate to="/projectB/home" replace />,
  },
  {
    path: '/projectB/home',
    auth: false,
    element: <ProjectBHome />,
  },
  {
    path: '/projectB/about',
    auth: false,
    element: <ProjectBAbout />,
  },
  {
    path: '/projectB/reuse',
    auth: false,
    element: <ProjectBReuse />,
  },
  {
    path: '*',
    auth: false,
    element: <ProjectBNotFound />,
  },
]

const rootRouter = normalizeRouteTree(rawRootRouter)
const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)

function buildFullPath(parentPath: string, routePath: string) {
  const prefix = parentPath === '/' ? '' : parentPath
  const current = routePath?.startsWith('/') ? routePath : `/${routePath || ''}`
  return `${prefix}${current}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}

function normalizeRouteTree(routes: readonly ProjectRouteObject[], parentFullPath = ''): ProjectRouteObject[] {
  if (!Array.isArray(routes)) return []

  return routes
    .filter((route): route is ProjectRouteObject => Boolean(route))
    .map((route) => {
      let fullPath = parentFullPath

      if (!route.index) {
        if (route.path) {
          fullPath = buildFullPath(parentFullPath, route.path)
        }
      }
      const normalizedKey = fullPath

      const next: ProjectRouteObject = {
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

export function flattenRoutes(routes: readonly ProjectRouteObject[]): ProjectRouteObject[] {
  if (!Array.isArray(routes)) {
    console.error('flattenRoutes: expected array, got:', typeof routes, routes)
    return []
  }

  return routes.reduce<ProjectRouteObject[]>((acc, route) => {
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

export { rootRouter, annotatedRootRouter }
export default annotatedRootRouter
