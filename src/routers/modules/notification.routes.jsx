import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'
// 通知中心模块化路由
export const notificationRoutes = [
  {
    path: 'notifications',
    name: '通知中心',
    key: '/notifications',
    element: <lazyComponents.Notifications />,
    meta: {
      title: '通知中心',
      icon: 'BellOutlined',
      permission: 'notification',
    },
  },
]
