import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const lastDeniedPathRef = useRef(null)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const checkAuth = async () => {
      const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }

      // 已登录访问 signin/signup 等公开页：重定向到可访问路由首项
      if (token && isPublicRoute(pathname)) {
        try {
          const routes = await permissionService.getAccessibleRoutes()
          const target = routes.includes('/') ? '/' : routes[0] || '/'
          setCanAccess(true)
          // 使用 replace 避免产生历史记录
          window.history.replaceState(null, '', target)
          return
        } catch {
          setCanAccess(true)
          window.history.replaceState(null, '', '/')
          return
        }
      }
      // 未登录访问公开路由（路径或路由配置标记）直接放行
      if (!token && (isPublicRoute(pathname) || isRouteConfigPublic(props.route))) {
        setCanAccess(true)
        return
      }

      if (!token) {
        setCanAccess(false)
        return
      }

      // 路由配置标记公开
      if (isRouteConfigPublic(props.route)) {
        setCanAccess(true)
        return
      }

      // 优先基于路由元数据做精确权限检查（在路由渲染前拦截）
      try {
        const flat = flattenRoutes(annotatedRootRouter || [])
        const target = flat.find((r) => r.path === pathname)
        const permissionMeta = target?.meta?.permission
        const requireAll = target?.meta?.requireAll || false

        if (permissionMeta) {
          // 支持单个 permission 或数组
          if (Array.isArray(permissionMeta)) {
            const result = requireAll
              ? await permissionService.hasAllPermissions(permissionMeta)
              : await permissionService.hasAnyPermission(permissionMeta)
            if (!result.hasPermission) {
              setCanAccess(false)
              return
            }
          } else {
            const ok = await permissionService.hasPermission(permissionMeta)
            if (!ok) {
              setCanAccess(false)
              return
            }
          }
        }
      } catch (err) {
        // 如果元数据检查出现错误，不阻塞后续检查（但已在超时/异常处采取保守拒绝）
        console.warn('基于 meta.permission 的前置检查失败，继续使用路径检查', err)
      }

      try {
        // 带超时的权限检查
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
          setCanAccess(hasAccess)
        }
      } catch (error) {
        console.error('权限检查失败:', error)
        // 出错时采用保守策略，拒绝访问
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

      // 防止重复处理同一路径导致循环跳转
      if (lastDeniedPathRef.current === pathname) return
      lastDeniedPathRef.current = pathname

      // 异步获取可跳转的安全目标，避免 navigate(-1) 导致跳回仍受限的页面
      ;(async () => {
        try {
          const routes = await permissionService.getAccessibleRoutes().catch(() => ['/'])
          const target = Array.isArray(routes) && routes.length > 0 ? (routes.includes('/') ? '/' : routes[0]) : '/'
          messageApi.error('您没有权限访问该页面')
          navigate(target, { replace: true })
        } catch (e) {
          messageApi.error('您没有权限访问该页面')
          try {
            navigate('/', { replace: true })
          } catch (err) {
            window.location.href = '/'
          }
        }
      })()
    }
  }, [canAccess, navigate, messageApi, pathname])

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
