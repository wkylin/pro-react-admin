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
    element: <lazyComponents.Demo />,
  },
  {
    path: 'business',
    name: 'Business',
    element: <lazyComponents.Business />,
  },
]
