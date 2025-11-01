import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 异常和错误路由
 * 404、403 等错误页面路由
 */
export const errorRoutes = [
  {
    path: '/403',
    name: '403',
    key: '/403',
    auth: false,
    element: <lazyComponents.Exception403 />,
  },
  {
    path: 'error',
    name: 'Error',
    key: '/error',
    auth: false,
    element: <lazyComponents.ErrorPage />,
  },
  // 全局最终404（放在最后，匹配所有未被上述路由捕获的路径）
  {
    path: '*',
    name: 'No Match',
    key: '*',
    auth: false,
    element: <lazyComponents.NoMatch />,
  },
]
