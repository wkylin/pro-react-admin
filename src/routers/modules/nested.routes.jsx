import React from 'react'
import { Outlet } from 'react-router-dom'
import { lazyComponents } from '../config/lazyLoad.config'
import RouterErrorElement from '@/components/RouterErrorElement'

/**
 * 嵌套路由配置
 * 规则总结：
 * 1. 所有 key 必须等于该路由真实匹配的完整 URL
 * 2. index: true 的路由，其 key = 父路由的完整路径（绝不能写成 /xxx/index）
 * 3. 中间层级路由（有子路由）必须使用 <Outlet />
 * 4. 面包屑、菜单高亮、权限控制全部依赖 key，保持一致极为重要
 */
export const nestedRoutes = [
  // 前端技术栈模块（嵌套路由）
  {
    path: 'tech/frontend',
    name: '前端技术栈',
    key: '/tech/frontend',
    element: <Outlet />,
    errorElement: <RouterErrorElement />,
    children: [
      {
        index: true,
        name: '前端技术栈首页',
        key: '/tech/frontend',
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
        path: 'plugins',
        name: 'Vue 插件',
        key: '/tech/frontend/plugins',
        element: <Outlet />,
        errorElement: <RouterErrorElement />,
        children: [
          {
            index: true,
            name: '插件总览',
            key: '/tech/frontend/plugins',
            element: <lazyComponents.VuePlugins />,
          },
          {
            path: 'vue3',
            name: 'Vue3 插件开发',
            key: '/tech/frontend/plugins/vue3',
            element: <lazyComponents.Vue3Plugin />,
          },
          {
            path: 'perf',
            name: '性能优化插件',
            key: '/tech/frontend/plugins/perf',
            element: <lazyComponents.VuePerfPlugin />,
          },
          {
            path: '*',
            name: '插件页面未找到',
            key: '/tech/frontend/plugins/*',
            element: <lazyComponents.SectionNotFound />,
          },
        ],
      },

      // 前端模块 404
      {
        path: '*',
        name: '前端页面未找到',
        key: '/tech/frontend/*',
        element: <lazyComponents.SectionNotFound />,
      },
    ],
  },

  // 后端技术栈模块（嵌套路由）
  {
    path: 'tech/backend',
    name: '后端技术栈',
    key: '/tech/backend',
    element: <Outlet />,
    errorElement: <RouterErrorElement />,
    children: [
      {
        index: true,
        name: '后端技术栈首页',
        key: '/tech/backend',
        element: <lazyComponents.BackendStack />,
      },
      {
        path: 'node',
        name: 'Node.js',
        key: '/tech/backend/node',
        element: <lazyComponents.NodeDemo />,
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

      // 后端模块 404
      {
        path: '*',
        name: '后端页面未找到',
        key: '/tech/backend/*',
        element: <lazyComponents.SectionNotFound />,
      },
    ],
  },
]
