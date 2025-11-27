import React from 'react'
// 通知中心模块化路由
export const notificationRoutes = [
  {
    path: 'notifications',
    name: '通知中心',
    key: '/notifications',
    element: React.createElement(React.lazy(() => import('../../pages/notifications'))),
    meta: {
      title: '通知中心',
      icon: 'BellOutlined',
      permission: 'notification',
    },
  },
]
