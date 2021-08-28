import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

const productRouter = [
  {
    path: '/layout/product',
    isAuthenticated: true,
    name: '商品调价单',
    exact: false,
    component: loadable(() => import('../../pages/product'), {
      fallback: <Loading />,
    }),
    routes: [
      {
        path: '/layout/product',
        isAuthenticated: true,
        name: '商品调价单',
        exact: true,
        component: loadable(() => import('../../pages/product/home'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/product/edit',
        isAuthenticated: true,
        name: '商品调价单-编辑',
        exact: true,
        component: loadable(() => import('../../pages/product/edit'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/product/add',
        isAuthenticated: true,
        name: '商品调价单-创建',
        exact: true,
        component: loadable(() => import('../../pages/product/add'), {
          fallback: <Loading />,
        }),
      },
      {
        path: '/layout/product/detail',
        isAuthenticated: true,
        name: '商品调价单-详情',
        exact: true,
        component: loadable(() => import('../../pages/product/detail'), {
          fallback: <Loading />,
        }),
      },
    ],
  },
]

export default productRouter
