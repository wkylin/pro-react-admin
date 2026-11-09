import React from 'react'
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
        <lazyComponents.Layout />
      </ProtectedRoute>
    </ApplicationModules>
  ),
  children: [
    {
      path: 'dashboard',
      name: '业务概览',
      i18nKey: 'dashboard.title',
      element: <lazyComponents.Dashboard />,
    },
    // 首页默认路由
    {
      index: true,
      name: '首页',
      i18nKey: 'home',
      element: <lazyComponents.Home />,
    },
  ],
}
