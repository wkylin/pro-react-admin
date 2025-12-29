import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

import Home from '@pages/home'
import Layout from '@pages/layout'
import MyPortfilo from '@pages/portfilo'

/**
 * 统一懒加载处理函数
 * @param {Function} importFunc - 动态导入函数
 * @param {Object} options - 加载选项
 * @returns {React.Component} 懒加载组件
 */
const lazyLoad = (importFunc, options = {}) => loadable(importFunc, { fallback: <Loading />, ...options })

/**
 * 路由组件懒加载配置
 * 统一管理所有页面的懒加载，便于维护和复用
 */
export const lazyComponents = {
  // 布局组件
  // Layout: lazyLoad(() => import('@pages/layout')),
  Layout, // 布局改为同步加载，避免白屏
  Dashboard: lazyLoad(() => import('@pages/dashboard'), { preload: true }),
  MyPortfilo, // MyPortfilo 改为同步加载，避免刷新时一直 loading

  // 认证相关（直接导入，不需要懒加载）
  // SignIn 和 SignUp 在路由中直接导入，不使用懒加载
  AuthCallback: lazyLoad(() => import('@src/components/auth/AuthCallback')),
  Terms: lazyLoad(() => import('@pages/terms')),
  Privacy: lazyLoad(() => import('@pages/privacy')),

  // 业务页面
  // Home: lazyLoad(() => import('@pages/home'), { preload: true }),
  Home, // 首页改为同步加载，避免首屏白屏闪烁
  Demo: lazyLoad(() => import('@pages/demo'), { preload: true }),
  Business: lazyLoad(() => import('@pages/business')),
  ZustandDemo: lazyLoad(() => import('@pages/zustand'), { preload: true }),

  // UI 组件页面
  Motion: lazyLoad(() => import('@pages/motion')),
  ReactTilt: lazyLoad(() => import('@pages/tilt'), { preload: true }),
  ReactMusic: lazyLoad(() => import('@pages/music'), { preload: true }),
  MyVideo: lazyLoad(() => import('@pages/video'), { preload: true }),
  MyCrypto: lazyLoad(() => import('@pages/crypto'), { preload: true }),

  // 图表相关
  Echarts: lazyLoad(() => import('@pages/echarts'), { preload: true }),
  GeoChart: lazyLoad(() => import('@pages/geoChart'), { preload: true }),
  BigScreen: lazyLoad(() => import('@pages/bigScreen'), { preload: true }),
  SvgViewer: lazyLoad(() => import('@pages/svgViewer'), { preload: true }),
  Topology: lazyLoad(() => import('@pages/topology'), { preload: true }),

  // 工具类页面
  QrCode: lazyLoad(() => import('@pages/qrGenerate'), { preload: true }),
  PrismRender: lazyLoad(() => import('@pages/prism'), { preload: true }),
  ChatGpt: lazyLoad(() => import('@pages/chatgpt'), { preload: true }),
  Mermaid: lazyLoad(() => import('@pages/mermaid'), { preload: true }),
  PostMessage: lazyLoad(() => import('@pages/postmessage'), { preload: true }),
  MyIframe: lazyLoad(() => import('@pages/postmessage/myIframe'), {
    preload: true,
  }),
  Print: lazyLoad(() => import('@pages/print'), { preload: true }),
  // 通知页面
  Notifications: lazyLoad(() => import('@pages/notifications'), {
    preload: true,
  }),
  NotificationDetail: lazyLoad(() => import('@pages/notifications/NotificationDetail'), { preload: true }),
  PHBar: lazyLoad(() => import('@pages/phbar'), { preload: true }),

  // 权限示例页面
  PermissionExample: lazyLoad(() => import('@pages/permission'), {
    preload: true,
  }),

  // 示例：如果新增一个按需加载的路由组件，请在此处注册（示例）
  // 例如：新增 pages/alerts/AlertDetail.jsx
  // AlertDetail: lazyLoad(() => import('@pages/alerts/AlertDetail'), { preload: false }),
  // 注意：如果你的构建/运行时使用 chunk 名称或外部映射，请同时在
  // `src/routers/config/lazyLoad.config.js` 中维护对应条目，确保首次访问时能够正确加载。

  // 用户相关
  Profile: lazyLoad(() => import('@pages/profile')),
  Contact: lazyLoad(() => import('@pages/contact')),

  // 嵌套路由
  BackendStack: lazyLoad(() => import('@pages/tech/backend'), {
    preload: true,
  }),
  FrontendStack: lazyLoad(() => import('@pages/tech/frontend'), {
    preload: true,
  }),
  ReactDemo: lazyLoad(() => import('@pages/tech/demos/react'), {
    preload: true,
  }),
  VueDemo: lazyLoad(() => import('@pages/tech/demos/vue'), { preload: true }),
  AngularDemo: lazyLoad(() => import('@pages/tech/demos/angular'), {
    preload: true,
  }),
  NodeDemo: lazyLoad(() => import('@pages/tech/demos/node'), { preload: true }),
  VuePlugins: lazyLoad(() => import('@pages/tech/demos/vue/plugins'), {
    preload: true,
  }),
  Vue3Plugin: lazyLoad(() => import('@pages/tech/demos/vue/plugins/vue3'), {
    preload: true,
  }),
  VuePerfPlugin: lazyLoad(() => import('@pages/tech/demos/vue/plugins/perf'), {
    preload: true,
  }),
  WebpackList: lazyLoad(() => import('@pages/tech/demos/webpack'), {
    preload: true,
  }),
  ViteList: lazyLoad(() => import('@pages/order/list'), { preload: true }),

  // 异常页面
  ErrorPage: lazyLoad(() => import('@pages/error'), { preload: true }),
  Exception403: lazyLoad(() => import('@stateless/Exception/exception403'), {
    preload: true,
  }),
  Exception404: lazyLoad(() => import('@stateless/Exception/exception404'), {
    preload: true,
  }),
  NoMatch: lazyLoad(() => import('@stateless/NoMatch'), { preload: true }),
  SectionNotFound: lazyLoad(() => import('@stateless/SectionNotFound'), {
    preload: true,
  }),
}

// 兼容性导出（保持原有导入方式）
export default lazyLoad
