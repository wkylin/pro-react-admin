import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

const couponsRouter = [
  {
    path: '/layout/coupons',
    isAuthenticated: true,
    exact: false,
    component: loadable(() => import('../../pages/coupons'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/layout/coupons',
        isAuthenticated: true,
        name: '新建活动单',
        exact: true,
        redirect: '/layout/coupons/home',
      },
      {
        path: '/layout/coupons/home',
        name: '新建活动单-首页',
        isAuthenticated: true,
        exact: true,
        component: loadable(() => import('../../pages/coupons/home'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/coupons/add',
        isAuthenticated: true,
        name: '新建活动单-创建',
        exact: true,
        component: loadable(() => import('../../pages/coupons/add'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/coupons/detail',
        isAuthenticated: true,
        name: '新建活动单-详情',
        exact: true,
        component: loadable(() => import('../../pages/coupons/detail'), {
          fallback: <Loading />,
        }),
      },
    ],
  },
]

export default couponsRouter
