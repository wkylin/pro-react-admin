import { Navigate, useLocation, matchRoutes, type RouteObject } from 'react-router-dom'
import type { PropsWithChildren } from 'react'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { readStoredToken } from '@platform/auth/model/session'
import { evaluateAccessRequirements, canAccessPath, type AccessRequirements } from '@platform/auth/model/policy'
import { isPublicRoute, isRouteConfigPublic } from '@app/routing/config/publicRoutes'
import rootRouter from '@routers'
import type { RouteNode } from '@platform/navigation/routes'
import { useTranslation } from 'react-i18next'

/** Check the matched leaf against the same live snapshot as menus and action guards. */
export default function AuthRouterBase({ children }: PropsWithChildren<{ route?: object }>) {
  const { pathname } = useLocation()
  const { current, loading } = usePermission()
  const { t } = useTranslation()
  const token = readStoredToken()
  const matched = matchRoutes(rootRouter as RouteObject[], { pathname })?.at(-1)?.route as RouteNode | undefined
  if (token && (pathname === '/signin' || pathname === '/signup')) return <Navigate to="/" replace />
  const overviewRoute =
    !token && pathname === '/'
      ? (matchRoutes(rootRouter as RouteObject[], { pathname: '/overview' })?.at(-1)?.route as RouteNode | undefined)
      : undefined
  if (overviewRoute?.path === 'overview' || overviewRoute?.path === '/overview')
    return <Navigate to="/overview" replace />
  if (isPublicRoute(pathname) || isRouteConfigPublic(matched)) return <>{children}</>
  if (!token) return <Navigate to="/signin" replace />
  if (!current && loading) return <div role="status">{t('identity.checkingPermissions')}</div>
  const allowed =
    current &&
    (evaluateAccessRequirements(current, (matched?.meta ?? {}) as AccessRequirements) ??
      canAccessPath(current, pathname))
  return allowed ? <>{children}</> : <Navigate to="/403" replace />
}
