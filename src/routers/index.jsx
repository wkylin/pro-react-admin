import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'
import SignIn from '@pages/signin'
import SignUp from '@pages/signup'
import Layout from '@pages/layout'
import { ProtectedRoute } from '@src/components/auth/ProtectedRoute'
import { AuthCallback } from '@src/components/auth/AuthCallback'

// 创建统一的 loadable 包装函数，支持额外选项
const lazyLoad = (importFunc, options = {}) => loadable(importFunc, { fallback: <Loading />, ...options })

// 使用 loadable 替换 lazy
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
// const ParallaxVert = lazyLoad(() => import('@pages/parallax'))
// const ReactThree = lazyLoad(() => import('@pages/three'))
// const Mermaid = lazyLoad(() => import('@pages/mermaid'))
// const DynamicModal = lazyLoad(() => import('@pages/dynamicModal'))
// const ReactAmap = lazyLoad(() => import('@pages/reactAmap'))
// const SuperMap = lazyLoad(() => import('@pages/superMap'))
// const Barcode = lazyLoad(() => import('@pages/barcode'))
// const ReactPdf = lazyLoad(() => import('@pages/reactPdf'))
// const ReactGantt = lazyLoad(() => import('@pages/reactGantt'))
// const SandBox = lazyLoad(() => import('@pages/sandBox'))

// 以下路由可根据需求另分成不同的文件维护
// 结合 proSecNav组件中的menuItems

const rootRouter = [
  {
    path: '/',
    name: '首页',
    i18nKey: 'home',
    key: '/',
    auth: true,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        i18nKey: 'home',
        auth: true,
        element: <Home />,
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        i18nKey: 'demo',
        key: '/demo',
        auth: true,
        element: <Demo />,
      },
      {
        index: false,
        path: 'motion',
        name: 'Motion',
        key: '/motion',
        auth: true,
        element: <Motion />,
      },
      {
        index: false,
        path: 'business',
        name: 'Business',
        key: '/business',
        auth: false,
        element: <Business />,
      },
      {
        index: false,
        path: 'qrcode',
        name: 'QrGenerate',
        key: '/qrcode',
        auth: false,
        element: <QrCode />,
      },
      {
        index: false,
        path: 'tilt',
        name: 'React Tilt',
        key: '/tilt',
        auth: true,
        element: <ReactTilt />,
      },
      {
        index: false,
        path: 'music',
        name: 'React Music',
        key: '/music',
        auth: false,
        element: <ReactMusic />,
      },
      {
        index: false,
        path: 'video',
        name: 'React Video',
        key: '/video',
        auth: false,
        element: <MyVideo />,
      },
      {
        index: false,
        path: 'crypto',
        name: 'React Crypto',
        key: '/crypto',
        auth: false,
        element: <MyCrypto />,
      },
      {
        index: false,
        path: 'markmap',
        name: 'ChatGPT Markmap',
        key: '/markmap',
        auth: false,
        element: <ChatGpt />,
      },
      {
        index: false,
        path: 'prism',
        name: 'Prism Render',
        key: '/prism',
        auth: true,
        element: <PrismRender />,
      },
      {
        index: false,
        path: 'geo',
        name: 'Geo Chart',
        key: '/geo',
        auth: false,
        element: <GeoChart />,
      },
      {
        index: false,
        path: 'echarts',
        name: 'React Echarts',
        key: '/echarts',
        auth: true,
        element: <Echarts />,
      },
      {
        index: false,
        path: 'big-screen',
        name: 'Big Screen',
        key: '/big-screen',
        auth: false,
        element: <BigScreen />,
      },
      {
        index: false,
        path: 'ph-bar',
        name: 'PH Bar',
        key: '/ph-bar',
        auth: false,
        element: <PHBar />,
      },
      {
        index: false,
        path: 'postmessage',
        name: 'Post Message',
        key: '/postmessage',
        auth: false,
        element: <PostMessage />,
      },
      {
        index: false,
        path: 'my-iframe',
        name: 'My Iframe',
        key: '/my-iframe',
        auth: false,
        element: <MyIframe />,
      },
      {
        index: false,
        path: 'd3-chart',
        name: 'D3 Chart',
        key: '/d3-chart',
        auth: false,
        element: <D3Chart />,
      },
      {
        index: false,
        path: 'print',
        name: 'Print',
        key: '/print',
        auth: false,
        element: <Print />,
      },
      {
        index: false,
        path: 'profile',
        name: 'Profile',
        key: '/profile',
        auth: false,
        element: <Profile />,
      },
      {
        index: false,
        path: 'contact',
        name: 'Contact',
        key: '/contact',
        auth: false,
        element: <Contact />,
      },
      {
        index: false,
        path: 'coupons',
        name: '前端技术栈',
        isSubMenu: true, // 是否是子菜单 proSecNav
        key: '/coupons',
        element: <Coupons />,
        children: [
          {
            index: false,
            path: 'home',
            name: 'React',
            key: '/coupons/home',
            auth: false,
            element: <CouponsHome />,
          },
          {
            index: false,
            name: 'Vue',
            path: 'add',
            key: '/coupons/add',
            auth: false,
            element: <CouponsAdd />,
          },
          {
            index: false,
            path: 'edit',
            name: 'Angular',
            key: '/coupons/edit',
            auth: false,
            element: <CouponsEdit />,
          },
          {
            index: false,
            path: 'detail',
            name: 'Node',
            key: '/coupons/detail',
            auth: false,
            element: <CouponsDetail />,
          },
        ],
      },
      {
        index: false,
        path: 'product',
        name: '后端技术栈',
        key: '/product',
        auth: false,
        element: <Product />,
      },
      {
        index: false,
        path: 'error',
        name: 'Error',
        key: '/error',
        auth: false,
        element: <ErrorPage />,
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: <NoMatch />,
      },
    ],
  },
  {
    index: false,
    path: 'signin',
    name: '登录',
    key: '/signin',
    auth: false,
    element: <SignIn />,
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    auth: false,
    element: <SignUp />,
  },
  {
    index: false,
    name: '认证回调',
    auth: false,
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  {
    index: false,
    path: 'dashboard/*',
    name: 'Dashboard',
    key: '/dashboard',
    auth: true,
    element: <Dashboard />,
  },
  {
    index: false,
    path: 'portfilo/*',
    name: 'My Portfilo',
    key: '/portfilo',
    auth: true,
    element: <MyPortfilo />,
  },
  {
    index: false,
    path: '/403',
    name: '403',
    key: '/403',
    auth: false,
    element: <Exception403 />,
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: <NoMatch />,
  },
]

export default rootRouter
