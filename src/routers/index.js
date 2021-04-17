import React from 'react'
import loadable from '@loadable/component'
import Loading from 'stateless/Loading'

const rootRouter = [
  {
    path: '/',
    exact: true,
    isAuthenticated: true,
    redirect: '/layout'
  },
  {
    path: '/signin',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../pages/signin'), {
      fallback: <Loading />,
    }),
  },
  {
    path: '/layout',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../pages/layout'), {
      fallback: <Loading />,
    }),
  },
  {
    path: '/basis',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../pages/basis'), {
      fallback: <Loading />,
    }),
  },
]

export default rootRouter
