import React, { lazy } from 'react'

const WebpackPage = lazy(() => import('@src/pages/build/webpack'))
const VitePage = lazy(() => import('@src/pages/build/vite'))

export const techRoutes = [
  {
    path: '/build/webpack',
    key: '/build/webpack',
    element: <WebpackPage />,
    meta: {
      title: 'Webpack',
      requiresAuth: true
    }
  },
  {
    path: '/build/vite',
    key: '/build/vite',
    element: <VitePage />,
    meta: {
      title: 'Vite',
      requiresAuth: true
    }
  }
]
