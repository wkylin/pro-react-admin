import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 嵌套路由配置
 * 包含需要嵌套子路由的模块
 */
export const nestedRoutes = [
  // 优惠券模块（嵌套路由）
  {
    path: 'coupons',
    name: '前端技术栈',
    isSubMenu: true, // 是否是子菜单 proSecNav
    key: '/coupons',
    element: <lazyComponents.Coupons />,
    children: [
      {
        path: 'home',
        name: 'React',
        key: '/coupons/home',
        auth: false,
        element: <lazyComponents.CouponsHome />,
      },
      {
        path: 'add',
        name: 'Vue',
        key: '/coupons/add',
        auth: false,
        element: <lazyComponents.CouponsAdd />,
      },
      {
        path: 'edit',
        name: 'Angular',
        key: '/coupons/edit',
        auth: false,
        element: <lazyComponents.CouponsEdit />,
      },
      {
        path: 'detail',
        name: 'Node',
        key: '/coupons/detail',
        auth: false,
        element: <lazyComponents.CouponsDetail />,
      },
    ],
  },
]
