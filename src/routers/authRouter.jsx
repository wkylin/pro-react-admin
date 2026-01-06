import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation, matchPath } from 'react-router-dom'
import { getLocalStorage } from '@utils/publicFn'
import { permissionService } from '@src/service/permissionService'
import { HashRouterUtils } from '@src/utils/hashRouter'
import { isPublicRoute, isRouteConfigPublic } from './config/publicRoutes'
import { annotatedRootRouter, flattenRoutes } from './index'
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
 * 权限路由守卫组件（简化版）
 */
const AuthRouter = (props) => {
  const location = useLocation()
  const rawPathname = location?.pathname
  const pathname = typeof rawPathname === 'string' ? rawPathname : '/'
  if (rawPathname != null && typeof rawPathname !== 'string') {
    HashRouterUtils.debugNavToOnce('AuthRouter.useLocation().pathname', rawPathname)
  }
  const [canAccess, setCanAccess] = useState(null)
  // navigate 不再直接使用；权限提示通过 message 实现
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
          matchPath({ path: pattern, end: true }, normalized) ||
          matchPath(
            {
              path: pattern.endsWith('/*') ? pattern : `${pattern}/*`,
              end: false
            },
            normalized
          )
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

      // 已登录访问纯公开页：跳转到可访问路由的首项
      if (token && isPublicRoute(pathname)) {
        try {
          await redirectLoggedInFromPublic()
          return
        } catch {
          allow()
          window.location.hash = '#/'
          return
        }
      }

      // 未登录：公开路由放行，其余重定向到登录
      if (!token) {
        if (isPublicRoute(pathname) || isPolicyPublic) {
          allow()
          return
        }
        deny()
        return
      }

      // 登录态下，公开路由直接放行
      if (isPublicRoute(pathname) || isPolicyPublic) {
        allow()
        return
      }

      // 优先使用路由策略 meta.permission / meta.roles
      try {
        const policyResult = await checkByPolicyMeta(policyMeta)
        if (policyResult !== null) {
          setCanAccess(policyResult)
          return
        }
      } catch (err) {
        console.warn('基于路由策略的权限检查失败，尝试路由白名单回退', err)
      }

      // 回退：基于可访问路由列表校验
      try {
        setCanAccess(await checkAccessWithTimeout())
      } catch (error) {
        console.error('权限检查失败:', error)
        deny()
      }
    }

    checkAuth()
  }, [pathname, props.route])

  // 当已登录但无权限时，通过 effect 一次性提示并返回上一页
  useEffect(() => {
    if (canAccess !== null && !canAccess) {
      const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
      // 未登录会在渲染层由 Navigate 处理，这里只处理已登录但无权限的情况
      if (!token) return

      // 仅在首次遭遇该路径时弹一次提示，且不进行任何导航或刷新
      if (lastDeniedPathRef.current === pathname) return
      lastDeniedPathRef.current = pathname
      showDeniedMessage(messageApi)
      return
    }

    // 权限恢复或路径变化时，清空记录以便未来重试能再次提示
    lastDeniedPathRef.current = ''
  }, [canAccess, messageApi, pathname])

  // 检查中
  if (canAccess === null) {
    return null
  }

  // 未登录或无权限
  if (!canAccess) {
    const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
    if (!token) {
      return (
        <>
          {contextHolder}
          <Navigate to='/signin' replace />
        </>
      )
    }
    // 已登录但无权限：render 空（useEffect 会显示提示并导航到安全页面）
    return <>{contextHolder}</>
  }

  // 有权限
  return (
    <>
      {contextHolder}
      {props.children}
    </>
  )
}

AuthRouter.propTypes = {
  route: PropTypes.object,
  children: PropTypes.node
}

export default AuthRouter
