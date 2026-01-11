import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation, matchPath } from 'react-router-dom'
import { getLocalStorage } from '@utils/publicFn'
import { permissionService } from '@src/service/permissionService'
import { HashRouterUtils } from '@src/utils/hashRouter'
import { isPublicRoute, isRouteConfigPublic } from '@src/routers/config/publicRoutes'
import { annotatedRootRouter, flattenRoutes } from '@routers'
import { message } from 'antd'

const timeoutToken = (ms) => new Promise((resolve) => globalThis.setTimeout(() => resolve('timeout'), ms))

const showDeniedMessage = (messageApi) => {
  Promise.resolve()
    .then(() => messageApi.open({ type: 'error', content: '您没有权限访问该页面' }))
    .catch((e) => {
      console.warn('Failed to show permission error message:', e)
      return Promise.resolve(message.error('您没有权限访问该页面'))
    })
    .catch((e) => {
      console.warn('Failed to show permission error message:', e)
    })
}

/**
 * 权限路由守卫组件（共享实现）
 *
 * 说明：该文件会自动读取当前 alias 的 `@routers`（多项目下会被 PROJECT 覆盖）。
 */
const AuthRouterBase = (props) => {
  const location = useLocation()
  const rawPathname = location?.pathname
  const pathname = typeof rawPathname === 'string' ? rawPathname : '/'
  if (rawPathname != null && typeof rawPathname !== 'string') {
    HashRouterUtils.debugNavToOnce('AuthRouter.useLocation().pathname', rawPathname)
  }

  const [canAccess, setCanAccess] = useState(null)
  const lastDeniedPathRef = useRef('')
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const resolveRoutePolicy = (targetPath) => {
      const flat = flattenRoutes(annotatedRootRouter || [])
      const normalized = String(targetPath || '').split('?')[0] || '/'

      return flat.find((route) => {
        const candidate = route?.meta?.routePath || route?.meta?.routeKey || route?.path
        if (!candidate) return false
        const pattern = candidate.startsWith('/') ? candidate : `/${candidate}`
        return Boolean(
          (() => {
            try {
              return (
                matchPath({ path: pattern, end: true }, normalized) ||
                matchPath(
                  {
                    path: pattern.endsWith('/*') ? pattern : `${pattern}/*`,
                    end: false,
                  },
                  normalized
                )
              )
            } catch (err) {
              console.warn('AuthRouter matchPath error', pattern, normalized, err)
              return false
            }
          })()
        )
      })
    }

    const allow = () => setCanAccess(true)
    const deny = () => setCanAccess(false)

    const redirectLoggedInFromPublic = async () => {
      const routes = await permissionService.getAccessibleRoutes()
      const safeRoutes = Array.isArray(routes) ? routes : []
      const target = safeRoutes.includes('/') ? '/' : safeRoutes[0] || '/'
      allow()
      window.location.hash = `#${target}`
    }

    const checkByPolicyMeta = async (policyMeta) => {
      const permissionsRequired = policyMeta.permission
      const rolesRequired = policyMeta.roles
      const requireAll = policyMeta.requireAll || false

      if (permissionsRequired) {
        if (Array.isArray(permissionsRequired)) {
          const result = requireAll
            ? await permissionService.hasAllPermissions(permissionsRequired)
            : await permissionService.hasAnyPermission(permissionsRequired)
          return !!result.hasPermission
        }
        return !!(await permissionService.hasPermission(permissionsRequired))
      }

      if (rolesRequired) {
        if (Array.isArray(rolesRequired)) {
          const result = requireAll
            ? await permissionService.hasAllRoles(rolesRequired)
            : await permissionService.hasAnyRole(rolesRequired)
          return !!result.hasPermission
        }
        return !!(await permissionService.hasRole(rolesRequired))
      }

      return null
    }

    const checkAccessWithTimeout = async () => {
      const permissionPromise = permissionService.canAccessRoute(pathname, false).catch(() => null)
      const hasAccess = await Promise.race([permissionPromise, timeoutToken(3000)])

      if (hasAccess === 'timeout') {
        console.warn('权限检查超时，尝试强制刷新权限并重试')
        try {
          const forced = await permissionService.canAccessRoute(pathname, true)
          return !!forced
        } catch (e) {
          console.error('强制刷新权限检查失败:', e)
          return false
        }
      }

      if (hasAccess === null) {
        console.warn('权限检查返回 null，拒绝访问')
        return false
      }

      return !!hasAccess
    }

    const checkAuth = async () => {
      const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
      const policyRoute = resolveRoutePolicy(pathname)
      const policyMeta = policyRoute?.meta || {}
      const isPolicyPublic = policyMeta.auth === false || isRouteConfigPublic(policyRoute)

      if (token && isPublicRoute(pathname)) {
        try {
          await redirectLoggedInFromPublic()
        } catch {
          allow()
        }
        return
      }

      if (isPublicRoute(pathname) || isPolicyPublic) {
        allow()
        return
      }

      if (!token) {
        deny()
        return
      }

      const metaResult = await checkByPolicyMeta(policyMeta)
      if (metaResult === false) {
        deny()
        return
      }
      if (metaResult === true) {
        allow()
        return
      }

      const ok = await checkAccessWithTimeout()
      if (ok) {
        allow()
      } else {
        deny()
      }
    }

    checkAuth().catch((e) => {
      console.warn('AuthRouter checkAuth failed:', e)
      deny()
    })
  }, [pathname])

  if (canAccess === null) return null

  if (canAccess === false) {
    if (lastDeniedPathRef.current !== pathname) {
      lastDeniedPathRef.current = pathname
      showDeniedMessage(messageApi)
    }
    return (
      <>
        {contextHolder}
        <Navigate to="/signin" replace />
      </>
    )
  }

  return (
    <>
      {contextHolder}
      {props.children}
    </>
  )
}

AuthRouterBase.propTypes = {
  children: PropTypes.node,
}

export default AuthRouterBase
