import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

const basicRouter = [
  {
    path: '/',
    exact: true,
    isAuthenticated: true,
    // redirect: '/layout',
    component: loadable(() => import('../../pages'), {
      fallback: <Loading />,
    }),
  },
  {
    path: '/signup',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../../pages/signup'), {
      fallback: <Loading />,
    }),
  },
  {
    path: '/signin',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../../pages/signin'), {
      fallback: <Loading />,
    }),
  },
  {
    path: '/404',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../../components/stateless/NoMatch'), {
      fallback: <Loading />,
    }),
  },
]

export default basicRouter
