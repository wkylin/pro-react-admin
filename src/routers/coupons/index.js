import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

const couponsRouter = [
  {
    path: '/layout/coupons',
    isAuthenticated: true,
    name: '送券活动单',
    exact: false,
    component: loadable(() => import('../../pages/coupons'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/layout/coupons',
        isAuthenticated: true,
        name: '送券活动单',
        exact: true,
        // redirect: '/layout/coupons/home', // 与component home 是有区别的
        component: loadable(() => import('../../pages/coupons/home'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/coupons/home',
        isAuthenticated: true,
        name: '新建活动单-首页',
        exact: true,
        component: loadable(() => import('../../pages/coupons/home'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/coupons/edit',
        isAuthenticated: true,
        name: '新建活动单-编辑',
        exact: true,
        component: loadable(() => import('../../pages/coupons/edit'), {
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
