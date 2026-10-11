import { useState, useEffect, type PropsWithChildren } from 'react'
import { Navigate, useLocation, matchRoutes, type RouteObject } from 'react-router-dom'
import { permissionService } from '@platform/auth/services/permissionService'
import { readStoredToken } from '@platform/auth/model/session'
import { evaluateAccessRequirements, type AccessRequirements } from '@platform/auth/model/policy'
import { isPublicRoute, isRouteConfigPublic } from '@src/routers/config/publicRoutes'
import { annotatedRootRouter } from '@routers'
import type { RouteNode } from '@src/routers/utils'

type AuthRouterProps = PropsWithChildren<{ route?: object }>
type AccessState = { key: string; allowed: boolean }

/** Resolve the leaf route so a parent permission never authorizes an unrelated page. */
const AuthRouterBase = ({ children, route }: AuthRouterProps) => {
  const { pathname } = useLocation()
  const token = readStoredToken()
  const matches = matchRoutes(annotatedRootRouter as RouteObject[], { pathname })
  const matchedRoute = matches?.at(-1)?.route as RouteNode | undefined
  const publicPage = isPublicRoute(pathname) || isRouteConfigPublic(matchedRoute)
  const signedInEntry = Boolean(token && (pathname === '/signin' || pathname === '/signup'))
  const key = `${pathname}:${token || ''}`
  const [access, setAccess] = useState<AccessState | null>(null)
  const cached = permissionService.peekPermissions()
  const requirements = (matchedRoute?.meta || {}) as AccessRequirements
  const cachedAccess = cached ? evaluateAccessRequirements(cached, requirements) : null

  useEffect(() => {
    if (!token || publicPage || cachedAccess !== null) return
    let active = true
    const check = async (): Promise<boolean> => {
      const current = await permissionService.getPermissions()
      const policyAccess = evaluateAccessRequirements(current, (matchedRoute?.meta || {}) as AccessRequirements)
      return policyAccess ?? permissionService.canAccessRoute(pathname)
    }
    void check().then(
      (allowed) => {
        if (active) setAccess({ key, allowed })
      },
      () => {
        if (active) setAccess({ key, allowed: false })
      }
    )
    return () => {
      active = false
    }
  }, [key, pathname, token, publicPage, matchedRoute, route, cachedAccess])

  if (signedInEntry) return <Navigate to="/" replace />
  if (publicPage) return <>{children}</>
  if (!token) return <Navigate to="/signin" replace />
  // A fresh cache decides immediately, so switching authorized routes keeps the
  // layout and its cached tab forms mounted while still checking each leaf policy.
  if (cachedAccess !== null) return cachedAccess ? <>{children}</> : <Navigate to="/403" replace />
  if (access?.key !== key || (access.allowed && !cached)) return <div role="status">正在验证访问权限...</div>
  if (!access.allowed) return <Navigate to="/403" replace />
  return <>{children}</>
}

export default AuthRouterBase
