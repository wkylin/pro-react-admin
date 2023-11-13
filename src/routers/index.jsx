import React, { Suspense, lazy } from 'react'
import Loading from '@src/components/stateless/Loading'

const lazyLoad = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

// 以下路由可根据需求另分成不同的文件维护
// 结合 proSecNav组件中的menuItems

const SignIn = lazy(() => import('@pages/signin'))
const SignUp = lazy(() => import('@pages/signup'))
const Layout = lazy(() => import('@pages/layout'))
const Home = lazy(() => import('@pages/home'))
const Demo = lazy(() => import('@pages/demo'))
const Coupons = lazy(() => import('@pages/coupons'))
const CouponsHome = lazy(() => import('@pages/coupons/home'))
const CouponsAdd = lazy(() => import('@pages/coupons/add'))
const CouponsEdit = lazy(() => import('@pages/coupons/edit'))
const CouponsDetail = lazy(() => import('@pages/coupons/detail'))
const Product = lazy(() => import('@pages/product'))
const ErrorPage = lazy(() => import('@pages/error'))
const Dashboard = lazy(() => import('@pages/dashboard'))
const ParallaxVert = lazy(() => import('@pages/parallax'))
const ReactTilt = lazy(() => import('@pages/tilt'))
const ReactMusic = lazy(() => import('@pages/music'))
const MyVideo = lazy(() => import('@pages/video'))
const MyCrypto = lazy(() => import('@pages/crypto'))
const ReactThree = lazy(() => import('@pages/three'))
const ChatGpt = lazy(() => import('@pages/chatgpt'))
const Echarts = lazy(() => import('@pages/echarts'))
const QrCode = lazy(() => import('@pages/qrGenerate'))
const PrismRender = lazy(() => import('@pages/prism'))
const Mermaid = lazy(() => import('@pages/mermaid'))
const Exception403 = lazy(() => import('@stateless/Exception/exception403'))
const NoMatch = lazy(() => import('@stateless/NoMatch'))

const rootRouter = [
  {
    path: '/',
    name: '首页',
    i18nKey: 'home',
    key: '/',
    auth: true,
    element: lazyLoad(Layout),
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        i18nKey: 'home',
        auth: true,
        element: lazyLoad(Home),
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        i18nKey: 'demo',
        key: '/demo',
        auth: true,
        element: lazyLoad(Demo),
      },
      {
        index: false,
        path: 'parallax',
        name: 'Parallax',
        key: '/parallax',
        auth: true,
        element: lazyLoad(ParallaxVert),
      },
      {
        index: false,
        path: 'qrcode',
        name: 'QrGenerate',
        key: '/qrcode',
        auth: true,
        element: lazyLoad(QrCode),
      },
      {
        index: false,
        path: 'tilt',
        name: 'React Tilt',
        key: '/tilt',
        auth: true,
        element: lazyLoad(ReactTilt),
      },
      {
        index: false,
        path: 'music',
        name: 'React Music',
        key: '/music',
        auth: false,
        element: lazyLoad(ReactMusic),
      },
      {
        index: false,
        path: 'video',
        name: 'React Video',
        key: '/video',
        auth: false,
        element: lazyLoad(MyVideo),
      },
      {
        index: false,
        path: 'crypto',
        name: 'React Crypto',
        key: '/crypto',
        auth: false,
        element: lazyLoad(MyCrypto),
      },
      {
        index: false,
        path: 'markmap',
        name: 'ChatGPT Markmap',
        key: '/markmap',
        auth: false,
        element: lazyLoad(ChatGpt),
      },
      {
        index: false,
        path: 'mermaid',
        name: 'ChatGPT Mermaid',
        key: '/mermaid',
        auth: false,
        element: lazyLoad(Mermaid),
      },
      {
        index: false,
        path: 'prism',
        name: 'PrismRender',
        key: '/prism',
        auth: true,
        element: lazyLoad(PrismRender),
      },
      {
        index: false,
        path: 'three',
        name: 'ReactThree',
        key: '/three',
        auth: true,
        element: lazyLoad(ReactThree),
      },
      {
        index: false,
        path: 'echarts',
        name: 'ReactEcharts',
        key: '/echarts',
        auth: true,
        element: lazyLoad(Echarts),
      },
      {
        index: false,
        path: 'coupons',
        name: '前端技术栈',
        isSubMenu: true, // 是否是子菜单 proSecNav
        key: '/coupons',
        element: lazyLoad(Coupons),
        children: [
          {
            index: false,
            path: 'home',
            name: 'React',
            key: '/coupons/home',
            auth: false,
            element: lazyLoad(CouponsHome),
          },
          {
            index: false,
            name: 'Vue',
            path: 'add',
            key: '/coupons/add',
            auth: false,
            element: lazyLoad(CouponsAdd),
          },
          {
            index: false,
            path: 'edit',
            name: 'Angular',
            key: '/coupons/edit',
            auth: false,
            element: lazyLoad(CouponsEdit),
          },
          {
            index: false,
            path: 'detail',
            name: 'Node',
            key: '/coupons/detail',
            auth: false,
            element: lazyLoad(CouponsDetail),
          },
        ],
      },
      {
        index: false,
        path: 'product',
        name: '后端技术栈',
        key: '/product',
        auth: false,
        element: lazyLoad(Product),
      },
      {
        index: false,
        path: 'error',
        name: 'Error',
        key: '/error',
        auth: false,
        element: lazyLoad(ErrorPage),
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: lazyLoad(NoMatch),
      },
    ],
  },
  {
    index: false,
    path: 'signin',
    name: '登录',
    key: '/signin',
    auth: false,
    element: lazyLoad(SignIn),
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    auth: false,
    element: lazyLoad(SignUp),
  },
  {
    index: false,
    path: 'dashboard/*',
    name: 'Dashboard',
    key: '/dashboard',
    auth: true,
    element: lazyLoad(Dashboard),
  },
  {
    index: false,
    path: '/403',
    name: '403',
    key: '/403',
    auth: false,
    element: lazyLoad(Exception403),
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: lazyLoad(NoMatch),
  },
]

export default rootRouter
