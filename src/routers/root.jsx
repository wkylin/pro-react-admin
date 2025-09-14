import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'
import SignIn from '@pages/signin'
import SignUp from '@pages/signup'
import Layout from '@pages/layout'
import { ProtectedRoute } from '@src/components/auth/ProtectedRoute'
import { AuthCallback } from '@src/components/auth/AuthCallback'

// 统一懒加载处理函数
const lazyLoad = (importFunc, options = {}) => loadable(importFunc, { fallback: <Loading />, ...options })

// 路由组件懒加载定义
const Dashboard = lazyLoad(() => import('@/pages/dashboard'), { preload: true })
const Home = lazyLoad(() => import('@pages/home'), { preload: true })
const Demo = lazyLoad(() => import('@pages/demo'), { preload: true })
const Coupons = lazyLoad(() => import('@pages/coupons'), { preload: true })
const CouponsHome = lazyLoad(() => import('@pages/coupons/home'), { preload: true })
const CouponsAdd = lazyLoad(() => import('@pages/coupons/add'), { preload: true })
const CouponsEdit = lazyLoad(() => import('@pages/coupons/edit'), { preload: true })
const CouponsDetail = lazyLoad(() => import('@pages/coupons/detail'), { preload: true })
const Product = lazyLoad(() => import('@pages/product'), { preload: true })
const ErrorPage = lazyLoad(() => import('@pages/error'), { preload: true })
const MyPortfilo = lazyLoad(() => import('@pages/portfilo'), { preload: true })
const ReactTilt = lazyLoad(() => import('@pages/tilt'), { preload: true })
const ReactMusic = lazyLoad(() => import('@pages/music'), { preload: true })
const MyVideo = lazyLoad(() => import('@pages/video'), { preload: true })
const MyCrypto = lazyLoad(() => import('@pages/crypto'), { preload: true })
const ChatGpt = lazyLoad(() => import('@pages/chatgpt'), { preload: true })
const Echarts = lazyLoad(() => import('@pages/echarts'), { preload: true })
const QrCode = lazyLoad(() => import('@pages/qrGenerate'), { preload: true })
const PrismRender = lazyLoad(() => import('@pages/prism'), { preload: true })
const BigScreen = lazyLoad(() => import('@pages/bigScreen'), { preload: true })
const D3Chart = lazyLoad(() => import('@pages/d3Chart'), { preload: true })
const Print = lazyLoad(() => import('@pages/print'), { preload: true })
const PostMessage = lazyLoad(() => import('@pages/postmessage'), { preload: true })
const GeoChart = lazyLoad(() => import('@pages/geoChart'), { preload: true })
const Motion = lazyLoad(() => import('@pages/motion'))
const Business = lazyLoad(() => import('@pages/business'))
const MyIframe = lazyLoad(() => import('@pages/postmessage/myIframe'))
const Exception403 = lazyLoad(() => import('@stateless/Exception/exception403'))
const NoMatch = lazyLoad(() => import('@stateless/NoMatch'))
const Profile = lazyLoad(() => import('@pages/profile'))
const Contact = lazyLoad(() => import('@pages/contact'))
const PHBar = lazyLoad(() => import('@pages/phbar'))

// react-router-dom 7.9.1 路由配置
const rootRouter = [
  // 根路由（带布局）
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      // 首页默认路由
      { index: true, element: <Home /> },

      // 一级功能路由
      { path: 'demo', element: <Demo /> },
      { path: 'motion', element: <Motion /> },
      { path: 'business', element: <Business /> },
      { path: 'qrcode', element: <QrCode /> },
      { path: 'tilt', element: <ReactTilt /> },
      { path: 'music', element: <ReactMusic /> },
      { path: 'video', element: <MyVideo /> },
      { path: 'crypto', element: <MyCrypto /> },
      { path: 'markmap', element: <ChatGpt /> },
      { path: 'prism', element: <PrismRender /> },
      { path: 'geo', element: <GeoChart /> },
      { path: 'echarts', element: <Echarts /> },
      { path: 'big-screen', element: <BigScreen /> },
      { path: 'ph-bar', element: <PHBar /> },
      { path: 'postmessage', element: <PostMessage /> },
      { path: 'my-iframe', element: <MyIframe /> },
      { path: 'd3-chart', element: <D3Chart /> },
      { path: 'print', element: <Print /> },
      { path: 'profile', element: <Profile /> },
      { path: 'contact', element: <Contact /> },
      { path: 'product', element: <Product /> },
      { path: 'error', element: <ErrorPage /> },

      // 优惠券模块（嵌套路由）
      {
        path: 'coupons',
        element: <Coupons />,
        children: [
          { path: 'home', element: <CouponsHome /> },
          { path: 'add', element: <CouponsAdd /> },
          { path: 'edit', element: <CouponsEdit /> },
          { path: 'detail', element: <CouponsDetail /> },
          // 优惠券模块专属404（仅匹配 /coupons/xxx）
          { path: '*', element: <NoMatch /> },
        ],
      },

      // 根路由下的404（匹配 /xxx 且非其他模块的路径）
      { path: '*', element: <NoMatch /> },
    ],
  },

  // 非保护路由（无需布局）
  { path: 'signin', element: <SignIn /> },
  { path: 'signup', element: <SignUp /> },
  { path: '/auth/callback', element: <AuthCallback /> },

  // Dashboard模块（独立布局）
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      // Dashboard模块专属404（仅匹配 /dashboard/xxx）
      { path: '*', element: <NoMatch /> },
    ],
  },

  // Portfilo模块（独立布局）
  {
    path: 'portfilo',
    element: <MyPortfilo />,
    children: [
      // Portfilo模块专属404（仅匹配 /portfilo/xxx）
      { path: '*', element: <NoMatch /> },
    ],
  },

  // 特殊状态页
  { path: '/403', element: <Exception403 /> },

  // 全局最终404（放在最后，匹配所有未被上述路由捕获的路径）
  { path: '*', element: <NoMatch /> },
]

export default rootRouter
