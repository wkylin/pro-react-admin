import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

export const zustandRoutes = [
  {
    path: 'zustand',
    name: 'Zustand演示',
    i18nKey: 'zustand',
    key: '/zustand',
    element: <lazyComponents.ZustandDemo />, // 下面会注册
    meta: {
      permission: ['admin', 'dev', 'user'], // 示例权限
      keepAlive: true
    }
  }
]
