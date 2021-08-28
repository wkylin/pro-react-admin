import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

const basicActRouter = [
  {
    path: '/basis',
    isAuthenticated: true,
    name: 'Basis首页',
    exact: false,
    component: loadable(() => import('../../pages/basis'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/basis',
        isAuthenticated: true,
        name: 'Basis首页',
        exact: true,
        // redirect: '/basis/info', // 默认跳转路由
        component: loadable(() => import('../../pages/demo'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/basis/deduct',
        isAuthenticated: true,
        name: '促销扣款',
        exact: true,
        component: loadable(() => import('../../pages/basis/promoDeduct'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/basis/info',
        isAuthenticated: true,
        name: '基本信息',
        exact: true,
        component: loadable(() => import('../../pages/basis/basicInfo'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/basis/404',
        isAuthenticated: true,
        name: '404',
        exact: false,
        component: loadable(() => import('../../components/stateless/Exception/exception404'), {
          fallback: <Loading />,
        }),
      },
    ],
  },
]

export default basicActRouter
