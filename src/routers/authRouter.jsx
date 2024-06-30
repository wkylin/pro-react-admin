import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getKeyName, getLocalStorage } from '@utils/publicFn'

const AuthRouter = (props) => {
  const { pathname } = useLocation()
  const route = getKeyName(pathname)

  if (!route?.auth) return props.children

  const { token } = getLocalStorage('token') || { token: null }
  if (!token) return <Navigate to="/signin" replace />

  // * 后端返回有权限路由列表 暂时硬编码 需要结合 proSecNav组件中的menuItems
  const routerList = [
    '/',
    '/home',
    '/demo',
    '/parallax',
    '/dashboard',
    '/tilt',
    '/prism',
    '/three',
    '/echarts',
    '/video',
    '/crypto',
    '/dynamic',
  ]
  if (routerList.indexOf(pathname) === -1) return <Navigate to="/403" replace />

  return props.children
}

export default AuthRouter
