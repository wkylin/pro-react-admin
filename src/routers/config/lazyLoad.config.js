import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'

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
  Layout: lazyLoad(() => import('@pages/layout')),
  Dashboard: lazyLoad(() => import('@/pages/dashboard'), { preload: true }),

  // 认证相关（直接导入，不需要懒加载）
  // SignIn 和 SignUp 在路由中直接导入，不使用懒加载
  AuthCallback: lazyLoad(() => import('@src/components/auth/AuthCallback')),
  Terms: lazyLoad(() => import('@pages/terms')),
  Privacy: lazyLoad(() => import('@pages/privacy')),

  // 业务页面
  Home: lazyLoad(() => import('@pages/home'), { preload: true }),
  Demo: lazyLoad(() => import('@pages/demo'), { preload: true }),
  Business: lazyLoad(() => import('@pages/business')),
  Product: lazyLoad(() => import('@pages/product'), { preload: true }),

  // UI 组件页面
  Motion: lazyLoad(() => import('@pages/motion')),
  ReactTilt: lazyLoad(() => import('@pages/tilt'), { preload: true }),
  ReactMusic: lazyLoad(() => import('@pages/music'), { preload: true }),
  MyVideo: lazyLoad(() => import('@pages/video'), { preload: true }),
  MyCrypto: lazyLoad(() => import('@pages/crypto'), { preload: true }),
  MyPortfilo: lazyLoad(() => import('@pages/portfilo'), { preload: true }),

  // 图表相关
  Echarts: lazyLoad(() => import('@pages/echarts'), { preload: true }),
  GeoChart: lazyLoad(() => import('@pages/geoChart'), { preload: true }),
  D3Chart: lazyLoad(() => import('@pages/d3Chart'), { preload: true }),
  BigScreen: lazyLoad(() => import('@pages/bigScreen'), { preload: true }),

  // 工具类页面
  QrCode: lazyLoad(() => import('@pages/qrGenerate'), { preload: true }),
  PrismRender: lazyLoad(() => import('@pages/prism'), { preload: true }),
  ChatGpt: lazyLoad(() => import('@pages/chatgpt'), { preload: true }),
  PostMessage: lazyLoad(() => import('@pages/postmessage'), { preload: true }),
  MyIframe: lazyLoad(() => import('@pages/postmessage/myIframe'), { preload: true }),
  Print: lazyLoad(() => import('@pages/print'), { preload: true }),
  PHBar: lazyLoad(() => import('@pages/phbar'), { preload: true }),

  // 用户相关
  Profile: lazyLoad(() => import('@pages/profile')),
  Contact: lazyLoad(() => import('@pages/contact')),

  // 优惠券模块（嵌套路由）
  Coupons: lazyLoad(() => import('@pages/coupons'), { preload: true }),
  CouponsHome: lazyLoad(() => import('@pages/coupons/home'), { preload: true }),
  CouponsAdd: lazyLoad(() => import('@pages/coupons/add'), { preload: true }),
  CouponsEdit: lazyLoad(() => import('@pages/coupons/edit'), { preload: true }),
  CouponsDetail: lazyLoad(() => import('@pages/coupons/detail'), { preload: true }),
  CouponsAddPlugins: lazyLoad(() => import('@pages/coupons/add/plugins'), { preload: true }),
  Vue3Plugin: lazyLoad(() => import('@pages/coupons/add/plugins/vue3'), { preload: true }),
  VuePerfPlugin: lazyLoad(() => import('@pages/coupons/add/plugins/perf'), { preload: true }),
  WebpackList: lazyLoad(() => import('@pages/coupons/list'), { preload: true }),
  ViteList: lazyLoad(() => import('@pages/order/list'), { preload: true }),

  // 异常页面
  ErrorPage: lazyLoad(() => import('@pages/error'), { preload: true }),
  Exception403: lazyLoad(() => import('@stateless/Exception/exception403'), { preload: true }),
  Exception404: lazyLoad(() => import('@stateless/Exception/exception404'), { preload: true }),
  NoMatch: lazyLoad(() => import('@stateless/NoMatch'), { preload: true }),
}

// 兼容性导出（保持原有导入方式）
export default lazyLoad
