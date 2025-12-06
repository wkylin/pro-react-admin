import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useLocation, matchPath } from 'react-router-dom'
import { getLocalStorage } from '@utils/publicFn'
import { permissionService } from '@src/service/permissionService'
import { isPublicRoute, isRouteConfigPublic } from './config/publicRoutes'
import { annotatedRootRouter, flattenRoutes } from './index'
import { message } from 'antd'

/**
 * 权限路由守卫组件（简化版）
 */
const AuthRouter = (props) => {
  const location = useLocation()
  const pathname = location.pathname
  const [canAccess, setCanAccess] = useState(null)
  // navigate 不再直接使用；权限提示通过 message 实现
  const lastDeniedPathRef = useRef(null)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const resolveRoutePolicy = (targetPath) => {
      const flat = flattenRoutes(annotatedRootRouter || [])
      const normalized = String(targetPath || '').split('?')[0] || '/'

      return flat.find((route) => {
        const candidate = route?.meta?.routePath || route?.meta?.routeKey || route?.path
        if (!candidate) return false
        const pattern = candidate.startsWith('/') ? candidate : `/${candidate}`
        return (
          matchPath({ path: pattern, end: true }, normalized) ||
          matchPath({ path: pattern.endsWith('/*') ? pattern : `${pattern}/*`, end: false }, normalized)
        )
      })
    }

    const checkAuth = async () => {
      const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
      const policyRoute = resolveRoutePolicy(pathname)
      const policyMeta = policyRoute?.meta || {}
      const isPolicyPublic = policyMeta.auth === false || isRouteConfigPublic(policyRoute)

      // 已登录访问纯公开页：跳转到可访问路由的首项
      if (token && isPublicRoute(pathname)) {
        try {
          const routes = await permissionService.getAccessibleRoutes()
          const target = routes.includes('/') ? '/' : routes[0] || '/'
          setCanAccess(true)
          window.history.replaceState(null, '', target)
          return
        } catch {
          setCanAccess(true)
          window.history.replaceState(null, '', '/')
          return
        }
      }

      // 未登录：公开路由放行，其余重定向到登录
      if (!token) {
        if (isPublicRoute(pathname) || isPolicyPublic) {
          setCanAccess(true)
          return
        }
        setCanAccess(false)
        return
      }

      // 登录态下，公开路由直接放行
      if (isPublicRoute(pathname) || isPolicyPublic) {
        setCanAccess(true)
        return
      }

      // 优先使用路由策略 meta.permission / meta.roles
      const permissionsRequired = policyMeta.permission
      const rolesRequired = policyMeta.roles
      const requireAll = policyMeta.requireAll || false

      try {
        if (permissionsRequired) {
          if (Array.isArray(permissionsRequired)) {
            const result = requireAll
              ? await permissionService.hasAllPermissions(permissionsRequired)
              : await permissionService.hasAnyPermission(permissionsRequired)
            setCanAccess(result.hasPermission)
            return
          }
          const ok = await permissionService.hasPermission(permissionsRequired)
          setCanAccess(!!ok)
          return
        }

        if (rolesRequired) {
          if (Array.isArray(rolesRequired)) {
            const result = requireAll
              ? await permissionService.hasAllRoles(rolesRequired)
              : await permissionService.hasAnyRole(rolesRequired)
            setCanAccess(result.hasPermission)
            return
          }
          const ok = await permissionService.hasRole(rolesRequired)
          setCanAccess(!!ok)
          return
        }
      } catch (err) {
        console.warn('基于路由策略的权限检查失败，尝试路由白名单回退', err)
      }

      // 回退：基于可访问路由列表校验
      try {
        const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve('timeout'), 3000))
        const permissionPromise = permissionService.canAccessRoute(pathname, false).catch(() => null)
        const hasAccess = await Promise.race([permissionPromise, timeoutPromise])

        if (hasAccess === 'timeout') {
          console.warn('权限检查超时，尝试强制刷新权限并重试')
          try {
            const forced = await permissionService.canAccessRoute(pathname, true)
            setCanAccess(!!forced)
          } catch (e) {
            console.error('强制刷新权限检查失败:', e)
            setCanAccess(false)
          }
        } else if (hasAccess === null) {
          console.warn('权限检查返回 null，拒绝访问')
          setCanAccess(false)
        } else {
          setCanAccess(!!hasAccess)
        }
      } catch (error) {
        console.error('权限检查失败:', error)
        setCanAccess(false)
      }
    }

    checkAuth()
  }, [pathname, props.route])

  // 当已登录但无权限时，通过 effect 一次性提示并返回上一页
  useEffect(() => {
    if (canAccess === false) {
      const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
      // 未登录会在渲染层由 Navigate 处理，这里只处理已登录但无权限的情况
      if (!token) return

      // 仅在首次遭遇该路径时弹一次提示，且不进行任何导航或刷新
      if (lastDeniedPathRef.current === pathname) return
      lastDeniedPathRef.current = pathname

      try {
        messageApi.open({ type: 'error', content: '您没有权限访问该页面' })
      } catch (e) {
        // fallback
        try {
          message.error('您没有权限访问该页面')
        } catch (err) {
          // ignore
        }
      }
      return
    }

    // 权限恢复或路径变化时，清空记录以便未来重试能再次提示
    lastDeniedPathRef.current = null
  }, [canAccess, messageApi, pathname])

  // 检查中
  if (canAccess === null) {
    return null
  }

  // 未登录或无权限
  if (canAccess === false) {
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

export default AuthRouter
