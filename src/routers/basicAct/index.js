import React from 'react'
import loadable from '@loadable/component'
import Loading from 'stateless/Loading'

const basicActRouter = [
  {
    path: '/basis',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../../pages/basis'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/basis',
        isAuthenticated: true,
        exact: true,
        redirect: '/basis/info',
      },
      {
        path: '/basis/404',
        isAuthenticated: true,
        exact: false,
        component: loadable(() => import('../../components/stateless/Exception/exception404'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/basis/deduct',
        isAuthenticated: true,
        exact: true,
        component: loadable(() => import('../../pages/basis/promoDeduct'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/basis/info',
        isAuthenticated: true,
        exact: true,
        component: loadable(() => import('../../pages/basis/basicInfo'), {
          fallback: <Loading />,
        }),
      },
    ],
  },
]

export default basicActRouter
