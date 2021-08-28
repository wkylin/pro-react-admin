import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

import basicRouter from './basic'
import couponsRouter from './coupons'
import productRouter from './product'

import basicActRouter from './basicAct'

const rootRouter = [
  ...basicRouter,
  ...basicActRouter,
  {
    path: '/layout',
    isAuthenticated: true,
    exact: false,
    name: 'Layout首页',
    component: loadable(() => import('../pages/layout'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/layout',
        isAuthenticated: true,
        exact: true,
        name: 'Layout首页',
        // redirect: '/layout/coupons', // 默认跳转到此路由 可调整...
        // redirect: '/basis', // 默认跳转到此路由 可调整...
        component: loadable(() => import('../pages/home'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/401',
        isAuthenticated: true,
        name: '401',
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception401'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/403',
        isAuthenticated: true,
        name: '403',
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception403'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/404',
        isAuthenticated: true,
        name: '404',
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception404'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/500',
        isAuthenticated: true,
        name: '500',
        exact: false,
        component: loadable(() => import('../components/stateless/Exception/exception500'), {
          fallback: <Loading />,
        }),
      },
      ...couponsRouter,
      ...productRouter,
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
