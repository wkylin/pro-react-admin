import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getKeyName, getLocalStorage } from '@utils/publicFn'
import rootRouter from './index'

/**
 * 权限路由守卫组件
 *
 * @description
 * 功能：
 * 1. 检查路由是否需要认证（通过 route.auth 字段）
 * 2. 验证用户 token
 * 3. 权限路由列表验证（可选，从后端获取）
 *
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {React.ReactNode} 路由组件或重定向
 */
const AuthRouter = (props) => {
  const { pathname } = useLocation()
  const route = getKeyName(pathname)

  // 如果路由不需要认证，直接渲染
  if (!route?.auth) {
    return props.children
  }

  // 检查用户 token
  const { token } = getLocalStorage('token') || { token: null }
  if (!token) {
    return <Navigate to="/signin" replace />
  }

  // TODO: 从后端获取用户权限路由列表，替换硬编码
  // 这里可以结合后端返回的用户权限列表进行验证
  // 暂时保留硬编码列表作为兜底方案
  const routerList = [
    '/',
    '/home',
    '/demo',
    '/parallax',
    '/dashboard',
    '/portfilo',
    '/tilt',
    '/prism',
    '/three',
    '/echarts',
    '/video',
    '/crypto',
    '/dynamic',
    '/sandbox',
    '/motion',
  ]

  // 如果路由在权限列表中，允许访问
  if (routerList.includes(pathname)) {
    return props.children
  }

  // 如果路由不在权限列表中，重定向到 403
  return <Navigate to="/403" replace />
}

export default AuthRouter
