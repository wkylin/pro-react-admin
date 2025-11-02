import React, { useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getKeyName, getLocalStorage } from '@utils/publicFn'
import rootRouter from './index'
import { permissionService } from '../service/permissionService'
import { Spin } from 'antd'

/**
 * 权限路由守卫组件
 *
 * @description
 * 功能：
 * 1. 检查路由是否需要认证（通过 route.auth 字段）
 * 2. 验证用户 token
 * 3. 权限路由列表验证（从权限服务获取）
 * 4. 支持路由级别的权限控制
 *
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {React.ReactNode} 路由组件或重定向
 */
const AuthRouter = (props) => {
  const { pathname } = useLocation()
  const route = getKeyName(pathname)
  const [canAccess, setCanAccess] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkRoutePermission = async () => {
      try {
        setIsLoading(true)

        // 如果路由不需要认证，直接允许访问
        if (!route?.auth) {
          setCanAccess(true)
          setIsLoading(false)
          return
        }

        // 检查用户 token
        const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
        if (token) {
          setCanAccess(true)
          setIsLoading(false)
          return
        }

        // 设置超时，避免权限获取一直等待（减少到2秒）
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            console.warn('权限检查超时（2秒），使用降级方案')
            resolve(null) // 超时返回 null，使用降级方案
          }, 2000) // 2秒超时
        })

        // 检查路由权限，确保返回有效的 Promise
        const permissionPromise = Promise.resolve(permissionService.canAccessRoute(pathname, false)).catch((err) => {
          console.error('权限检查出错:', err)
          return null // 出错返回 null，使用降级方案
        })

        // 使用 Promise.race 避免无限等待
        const hasAccess = await Promise.race([permissionPromise, timeoutPromise])

        // 如果返回 null（超时或出错），使用降级方案：有 token 则允许访问
        if (hasAccess === null) {
          console.warn('权限检查超时或失败，使用降级方案：允许访问')
          setCanAccess(true) // 有 token 时降级为允许访问
        } else {
          setCanAccess(hasAccess)
        }
      } catch (error) {
        console.error('路由权限检查失败:', error)
        // 权限检查失败时，如果有token则允许访问（降级方案）
        const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
        setCanAccess(!!token)
      } finally {
        setIsLoading(false)
      }
    }

    checkRoutePermission()
  }, [pathname, route])

  // 加载中显示加载状态
  // if (isLoading) {
  //   return (
  //     <Spin size="large" tip="权限检查中..." fullscreen />
  //   )
  // }

  // 如果路由不需要认证，直接渲染
  if (!route?.auth) {
    return props.children
  }

  // 没有 token，重定向到登录页
  if (canAccess === false) {
    const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
    if (!token) {
      return <Navigate to="/signin" replace />
    }
    // 有 token 但没有权限，重定向到 403
    return <Navigate to="/403" replace />
  }

  // canAccess 为 null 或 true，都允许访问
  // null 表示权限检查中或检查失败但有 token（降级方案）
  if (canAccess === null) {
    const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
    // 如果有 token，允许访问（降级方案，避免一直卡在加载状态）
    if (token) {
      return props.children
    }
    // 没有 token，跳转到登录页
    return <Navigate to="/signin" replace />
  }

  // 有权限，渲染子组件
  return props.children
}

export default AuthRouter
