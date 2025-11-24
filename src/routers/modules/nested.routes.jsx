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
        element: <lazyComponents.CouponsHome />
      },
      {
        path: 'add',
        name: 'Vue',
        key: '/coupons/add',
        element: <lazyComponents.CouponsAdd />
      },
      {
        path: 'edit',
        name: 'Angular',
        key: '/coupons/edit',
        element: <lazyComponents.CouponsEdit />
      },
      {
        path: 'detail',
        name: 'Node',
        key: '/coupons/detail',
        element: <lazyComponents.CouponsDetail />
      },
      {
        path: 'add/plugins/vue3',
        name: 'Vue3 API',
        key: '/coupons/add/plugins/vue3',
        element: <lazyComponents.Vue3Plugin />
      },
      {
        path: 'add/plugins/perf',
        name: '性能优化',
        key: '/coupons/add/plugins/perf',
        element: <lazyComponents.VuePerfPlugin />
      },
      {
        path: 'list',
        name: 'Webpack',
        key: '/coupons/list',
        element: <lazyComponents.WebpackList />
      }
    ]
  }
]
