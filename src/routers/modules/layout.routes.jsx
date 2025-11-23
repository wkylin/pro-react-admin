import React from 'react'
import Layout from '@pages/layout'
import { ProtectedRoute } from '@src/components/auth/ProtectedRoute'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 独立布局路由
 * 具有独立布局的模块（不包含在主 Layout 中）
 */
export const layoutRoutes = [
  // Dashboard模块（独立布局）
  {
    path: 'dashboard/*',
    name: 'Dashboard',
    key: '/dashboard',
    auth: true,
    element: <lazyComponents.Dashboard />
  },
  // Portfilo模块（独立布局）
  {
    path: 'portfilo/*',
    name: 'My Portfilo',
    key: '/portfilo',
    auth: true,
    element: <lazyComponents.MyPortfilo />
  }
]

/**
 * 主布局路由配置
 * 包含主 Layout 和所有子路由
 */
export const mainLayoutRoute = {
  path: '/',
  name: '首页',
  i18nKey: 'home',
  key: '/',
  auth: true,
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    // 首页默认路由
    {
      index: true,
      name: '首页',
      key: '/',
      i18nKey: 'home',
      element: <lazyComponents.Home />
    }
  ]
}
