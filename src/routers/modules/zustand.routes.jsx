import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

export const zustandRoutes = [
  {
    path: 'zustand',
    name: 'Zustand演示',
    i18nKey: 'zustand',
    element: <lazyComponents.ZustandDemo />,
    meta: {
      permission: ['admin', 'dev', 'user'],
      keepAlive: true,
    },
  },
]
