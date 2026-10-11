import React from 'react'
import Layout from '@layouts'
import { ApplicationModules } from '@platform/modules'
import { defaultModules } from '@app/modules/default'
import { ProtectedRoute } from '@platform/auth/components/ProtectedRoute'
import type { RouteNode } from '@app/routing/utils'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 独立布局路由
 * 具有独立布局的模块（不包含在主 Layout 中）
 */
export const layoutRoutes: RouteNode[] = [
  // Dashboard模块（独立布局）
  {
    path: 'dashboard/*',
    name: 'Dashboard',
    auth: true,
    element: <lazyComponents.Dashboard />,
  },
  // Portfilo模块（独立布局）
  {
    path: 'portfilo/*',
    name: 'My Portfilo',
    auth: true,
    element: <lazyComponents.MyPortfilo />,
  },
]

/**
 * 主布局路由配置
 * 包含主 Layout 和所有子路由
 */
export const mainLayoutRoute: RouteNode = {
  path: '/',
  name: '首页',
  i18nKey: 'home',
  auth: true,
  element: (
    <ApplicationModules registry={defaultModules}>
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    </ApplicationModules>
  ),
  children: [
    // 首页默认路由
    {
      index: true,
      name: '首页',
      i18nKey: 'home',
      element: <lazyComponents.Home />,
    },
  ],
}
