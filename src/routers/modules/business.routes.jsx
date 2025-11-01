import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 业务功能路由
 * 主要的业务页面路由配置
 */
export const businessRoutes = [
  {
    path: 'demo',
    name: 'Demo',
    i18nKey: 'demo',
    key: '/demo',
    auth: true,
    element: <lazyComponents.Demo />,
  },
  {
    path: 'motion',
    name: 'Motion',
    key: '/motion',
    auth: true,
    element: <lazyComponents.Motion />,
  },
  {
    path: 'business',
    name: 'Business',
    key: '/business',
    auth: false,
    element: <lazyComponents.Business />,
  },
  {
    path: 'product',
    name: '后端技术栈',
    key: '/product',
    auth: false,
    element: <lazyComponents.Product />,
  },
]
