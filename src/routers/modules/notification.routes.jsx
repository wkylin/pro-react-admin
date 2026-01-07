import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

// 通知中心模块化路由
export const notificationRoutes = [
  {
    path: 'notifications',
    name: '通知中心',
    element: <lazyComponents.Notifications />,
    meta: {
      title: '通知中心',
      icon: 'BellOutlined',
      permission: 'notification',
    },
  },
  // 动态路由：通知详情（单个组件，根据 id 与 query 加载不同内容）
  {
    path: 'notification/:id',
    name: '通知详情',
    element: <lazyComponents.NotificationDetail />,
    meta: { title: '通知详情', permission: 'notification' },
  },
]
