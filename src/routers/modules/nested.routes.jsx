import React from 'react'
import { Outlet } from 'react-router-dom'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 嵌套路由配置
 * 包含需要嵌套子路由的模块
 */
export const nestedRoutes = [
  // 前端技术栈模块（嵌套路由）
  {
    path: 'tech/frontend',
    name: '前端技术栈',
    key: '/tech/frontend',
    element: <Outlet />,
    children: [
      {
        index: true,
        name: '前端技术栈',
        key: '/tech/frontend/index',
        element: <lazyComponents.FrontendStack />,
      },
      {
        path: 'react',
        name: 'React',
        key: '/tech/frontend/react',
        element: <lazyComponents.ReactDemo />,
      },
      {
        path: 'vue',
        name: 'Vue',
        key: '/tech/frontend/vue',
        element: <lazyComponents.VueDemo />,
      },
      {
        path: 'angular',
        name: 'Angular',
        key: '/tech/frontend/angular',
        element: <lazyComponents.AngularDemo />,
      },
      {
        path: 'node',
        name: 'Node',
        key: '/tech/frontend/node',
        element: <lazyComponents.NodeDemo />,
      },
      // 补充中间层级路由（用于面包屑显示）
      {
        path: 'vue/plugins',
        name: 'Vue 插件',
        key: '/tech/frontend/vue/plugins',
        element: <Outlet />,
        children: [
          {
            index: true,
            name: 'Vue 插件列表',
            key: '/tech/frontend/vue/plugins/index',
            element: <lazyComponents.VuePlugins />,
          },
          {
            path: 'vue3',
            name: 'Vue3 API',
            key: '/tech/frontend/vue/plugins/vue3',
            element: <lazyComponents.Vue3Plugin />,
          },
          {
            path: 'perf',
            name: '性能优化',
            key: '/tech/frontend/vue/plugins/perf',
            element: <lazyComponents.VuePerfPlugin />,
          },
        ],
      },
    ],
  },
  // 后端技术栈模块（嵌套路由）
  {
    path: 'tech/backend',
    name: '后端技术栈',
    key: '/tech/backend',
    element: <Outlet />,
    children: [
      {
        index: true,
        name: '后端技术栈',
        key: '/tech/backend/index',
        element: <lazyComponents.BackendStack />,
      },
      {
        path: 'java',
        name: 'Java',
        key: '/tech/backend/java',
        element: <lazyComponents.NodeDemo />,
      },
      {
        path: 'go',
        name: 'Go',
        key: '/tech/backend/go',
        element: <lazyComponents.NodeDemo />,
      },
    ],
  },
]
