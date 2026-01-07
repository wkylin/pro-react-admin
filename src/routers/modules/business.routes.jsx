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
    path: 'zustand',
    name: 'Zustand演示',
    i18nKey: 'zustand',
    element: <lazyComponents.ZustandDemo />,
  },
  {
    path: 'motion',
    name: 'Motion',
    element: <lazyComponents.Motion />,
  },
  {
    path: 'business',
    name: 'Business',
    element: <lazyComponents.Business />,
  },
  {
    path: 'build/vite',
    name: 'Vite',
    element: <lazyComponents.ViteList />,
  },
  {
    path: 'build/webpack',
    name: 'Webpack',
    element: <lazyComponents.WebpackList />,
  },
]
