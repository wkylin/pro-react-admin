import React from 'react'
const Exception403 = React.lazy(() => import('@stateless/Exception/exception403'))
const Exception404 = React.lazy(() => import('@stateless/Exception/exception404'))
const ErrorPage = React.lazy(() => import('@pages/error'))
const NoMatch = React.lazy(() => import('@stateless/NoMatch'))

/**
 * 异常和错误路由
 * 404、403 等错误页面路由
 */
export const errorRoutes = [
  {
    path: '/403',
    name: '403',
    element: <Exception403 />,
  },
  {
    path: 'error',
    name: 'Error',
    element: <ErrorPage />,
  },
  // 显式 404 路由，避免访问 /404 时被 * 捕获显示 "No match for /404"
  {
    path: '/404',
    name: '404',
    element: <Exception404 />,
  },
  // 全局最终404（放在最后，匹配所有未被上述路由捕获的路径）
  {
    path: '*',
    name: 'No Match',
    element: <NoMatch />,
  },
]
