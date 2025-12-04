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
    element: <lazyComponents.Exception403 />
  },
  {
    path: 'error',
    name: 'Error',
    key: '/error',
    element: <lazyComponents.ErrorPage />
  },
  // 显式 404 路由，避免访问 /404 时被 * 捕获显示 "No match for /404"
  {
    path: '/404',
    name: '404',
    key: '/404',
    element: <lazyComponents.Exception404 />
  },
  // 全局最终404（放在最后，匹配所有未被上述路由捕获的路径）
  {
    path: '*',
    name: 'No Match',
    key: '/404/*',
    element: <lazyComponents.NoMatch />
  }
]
