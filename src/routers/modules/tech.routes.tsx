import { lazy } from 'react'

const WebpackPage = lazy(() => import('@src/pages/build/webpack'))

export const techRoutes = [
  {
    path: '/build/webpack',
    element: <WebpackPage />,
    meta: {
      title: 'Webpack',
      requiresAuth: true,
    },
  },
]
