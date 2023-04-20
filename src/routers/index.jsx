import React from 'react'
import loadable from '@loadable/component'
import Loading from '@src/components/stateless/Loading'

const SignIn = loadable(() => import('../pages/signin'), { fallback: <Loading /> })
const SignUp = loadable(() => import('../pages/signup'), { fallback: <Loading /> })
const Layout = loadable(() => import('../pages/layout'), { fallback: <Loading /> })

// prefetch
const Home = loadable(
  () =>
    /* webpackChunkName: "PreHome" */
    /* webpackPrefetch: true */
    import('../pages/home'),
  { fallback: <Loading /> }
)
// preload
const Demo = loadable(
  () =>
    /* webpackChunkName: "PreloadDemo" */
    /* webpackPreload: true */
    import('../pages/demo'),
  { fallback: <Loading /> }
)
const Coupons = loadable(() => import('../pages/coupons'), { fallback: <Loading /> })
const CouponsHome = loadable(() => import('../pages/coupons/home'), { fallback: <Loading /> })
const CouponsAdd = loadable(() => import('../pages/coupons/add'), { fallback: <Loading /> })
const CouponsEdit = loadable(() => import('../pages/coupons/edit'), { fallback: <Loading /> })
const CouponsDetail = loadable(() => import('../pages/coupons/detail'), { fallback: <Loading /> })
const Product = loadable(() => import('../pages/product'), { fallback: <Loading /> })
const ErrorPage = loadable(() => import('../pages/error'), { fallback: <Loading /> })
const Dashboard = loadable(() => import('../pages/dashboard'), { fallback: <Loading /> })
const ParallaxVert = loadable(() => import('../pages/parallax'), { fallback: <Loading /> })
const QrCode = loadable(() => import('../pages/qrGenerate'), { fallback: <Loading /> })
const PrismRender = loadable(() => import('../pages/prism'), { fallback: <Loading /> })
const NoMatch = loadable(() => import('../components/stateless/NoMatch'), { fallback: <Loading /> })

const rootRouter = [
  {
    path: '/',
    name: '首页',
    key: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        element: <Home />,
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        key: '/demo',
        element: <Demo />,
      },
      {
        index: false,
        path: 'parallax',
        name: 'Parallax',
        key: '/parallax',
        element: <ParallaxVert />,
      },
      {
        index: false,
        path: 'qrcode',
        name: 'QrGenerate',
        key: '/qrcode',
        element: <QrCode />,
      },
      {
        index: false,
        path: 'prism',
        name: 'PrismRender',
        key: '/prism',
        element: <PrismRender />,
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
            element: <CouponsHome />,
          },
          {
            index: false,
            name: 'Vue',
            path: 'add',
            key: '/coupons/add',
            element: <CouponsAdd />,
          },
          {
            index: false,
            path: 'edit',
            name: 'Angular',
            key: '/coupons/edit',
            element: <CouponsEdit />,
          },
          {
            index: false,
            path: 'detail',
            name: 'Node',
            key: '/coupons/detail',
            element: <CouponsDetail />,
          },
        ],
      },
      {
        index: false,
        path: 'product',
        name: '后端技术栈',
        key: '/product',
        element: <Product />,
      },
      {
        index: false,
        path: 'error',
        name: 'Error',
        key: '/error',
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
    element: <SignIn />,
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    element: <SignUp />,
  },
  {
    index: false,
    path: 'dashboard/*',
    name: 'Dashboard',
    key: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: <NoMatch />,
  },
]

export default rootRouter
