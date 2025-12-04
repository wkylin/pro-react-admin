import React, { lazy } from 'react'

const Vue3Api = lazy(() => import('@src/pages/tech/vue/Vue3Api'))
const VuePerf = lazy(() => import('@src/pages/tech/vue/VuePerf'))
const AngularPage = lazy(() => import('@src/pages/tech/angular'))
const BackendPage = lazy(() => import('@src/pages/tech/backend'))
const WebpackPage = lazy(() => import('@src/pages/build/webpack'))
const VitePage = lazy(() => import('@src/pages/build/vite'))

export const techRoutes = [
  {
    path: '/tech/frontend/vue/plugins/vue3',
    element: <Vue3Api />,
    meta: {
      title: 'Vue3 API',
      requiresAuth: true,
    },
  },
  {
    path: '/tech/frontend/vue/plugins/perf',
    element: <VuePerf />,
    meta: {
      title: 'Vue 性能优化',
      requiresAuth: true,
    },
  },
  {
    path: '/tech/frontend/angular',
    element: <AngularPage />,
    meta: {
      title: 'Angular',
      requiresAuth: true,
    },
  },
  {
    path: '/tech/backend',
    element: <BackendPage />,
    meta: {
      title: '后端技术栈',
      requiresAuth: true,
    },
  },
  {
    path: '/build/webpack',
    element: <WebpackPage />,
    meta: {
      title: 'Webpack',
      requiresAuth: true,
    },
  },
  {
    path: '/build/vite',
    element: <VitePage />,
    meta: {
      title: 'Vite',
      requiresAuth: true,
    },
  },
]
