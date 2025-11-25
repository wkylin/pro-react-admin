import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 嵌套路由配置
 * 包含需要嵌套子路由的模块
 */
export const nestedRoutes = [
  // 技术栈模块（嵌套路由）
  {
    path: 'tech/frontend',
    name: '前端技术栈',
    key: '/tech/frontend',
    element: <lazyComponents.Coupons />,
    children: [
      {
        path: 'react',
        name: 'React',
        key: '/tech/frontend/react',
        element: <lazyComponents.CouponsHome />,
      },
      {
        path: 'vue',
        name: 'Vue',
        key: '/tech/frontend/vue',
        element: <lazyComponents.CouponsAdd />,
      },
      {
        path: 'angular',
        name: 'Angular',
        key: '/tech/frontend/angular',
        element: <lazyComponents.CouponsEdit />,
      },
      {
        path: 'node',
        name: 'Node',
        key: '/tech/frontend/node',
        element: <lazyComponents.CouponsDetail />,
      },
      // 补充中间层级路由（用于面包屑显示）
      {
        path: 'vue/plugins',
        name: 'Vue 插件',
        key: '/tech/frontend/vue/plugins',
        element: <lazyComponents.CouponsAddPlugins />,
      },
      {
        path: 'vue/plugins/vue3',
        name: 'Vue3 API',
        key: '/tech/frontend/vue/plugins/vue3',
        element: <lazyComponents.Vue3Plugin />,
      },
      {
        path: 'vue/plugins/perf',
        name: '性能优化',
        key: '/tech/frontend/vue/plugins/perf',
        element: <lazyComponents.VuePerfPlugin />,
      },
    ],
  },
]
