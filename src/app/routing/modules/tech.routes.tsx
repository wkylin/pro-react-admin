import { lazy } from 'react'

const VitePage = lazy(() => import('@src/pages/build/vite'))

export const techRoutes = [
  {
    path: '/build/vite',
    element: <VitePage />,
    meta: {
      title: 'Vite',
      requiresAuth: true,
    },
  },
]
