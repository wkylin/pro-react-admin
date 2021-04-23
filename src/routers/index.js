import React from 'react'
import loadable from '@loadable/component'
import Loading from 'stateless/Loading'

import basicRouter from './basic'
import couponsRouter from './coupons'

import basicActRouter from './basicAct'

const rootRouter = [
  ...basicRouter,
  ...basicActRouter,
  {
    path: '/layout',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../pages/layout'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/layout',
        isAuthenticated: true,
        exact: true,
        redirect: '/layout/coupons', // 默认跳转到此路由 可调整...
        // redirect: '/basis/info', // 默认跳转到此路由 可调整...
      },
      {
        path: '/layout/401',
        isAuthenticated: true,
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception401'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/403',
        isAuthenticated: true,
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception403'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/404',
        isAuthenticated: true,
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception404'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/500',
        isAuthenticated: true,
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception500'), {
          fallback: <Loading />,
        }),
      },
      ...couponsRouter,
    ],
  },
  {
    path: '*',
    exact: true,
    component: loadable(() => import('../components/stateless/NoMatch'), {
      fallback: <Loading />,
    }),
  },
]

export default rootRouter
