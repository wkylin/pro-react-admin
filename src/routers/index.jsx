import React, { Suspense, lazy } from 'react'
import Loading from '@src/components/stateless/Loading'

const lazyLoad = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

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
const QrCode = lazy(() => import('@pages/qrGenerate'))
const PrismRender = lazy(() => import('@pages/prism'))
const NoMatch = lazy(() => import('@stateless/NoMatch'))

const rootRouter = [
  {
    path: '/',
    name: '首页',
    key: '/',
    element: lazyLoad(Layout),
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        element: lazyLoad(Home)
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        key: '/demo',
        element: lazyLoad(Demo)
      },
      {
        index: false,
        path: 'parallax',
        name: 'Parallax',
        key: '/parallax',
        element: lazyLoad(ParallaxVert)
      },
      {
        index: false,
        path: 'qrcode',
        name: 'QrGenerate',
        key: '/qrcode',
        element: lazyLoad(QrCode)
      },
      {
        index: false,
        path: 'prism',
        name: 'PrismRender',
        key: '/prism',
        element: lazyLoad(PrismRender)
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
            element: lazyLoad(CouponsHome)
          },
          {
            index: false,
            name: 'Vue',
            path: 'add',
            key: '/coupons/add',
            element: lazyLoad(CouponsAdd)
          },
          {
            index: false,
            path: 'edit',
            name: 'Angular',
            key: '/coupons/edit',
            element: lazyLoad(CouponsEdit)
          },
          {
            index: false,
            path: 'detail',
            name: 'Node',
            key: '/coupons/detail',
            element: lazyLoad(CouponsDetail)
          }
        ]
      },
      {
        index: false,
        path: 'product',
        name: '后端技术栈',
        key: '/product',
        element: lazyLoad(Product)
      },
      {
        index: false,
        path: 'error',
        name: 'Error',
        key: '/error',
        element: lazyLoad(ErrorPage)
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: lazyLoad(NoMatch)
      }
    ]
  },
  {
    index: false,
    path: 'signin',
    name: '登录',
    key: '/signin',
    element: lazyLoad(SignIn)
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    element: lazyLoad(SignUp)
  },
  {
    index: false,
    path: 'dashboard/*',
    name: 'Dashboard',
    key: '/dashboard',
    element: lazyLoad(Dashboard)
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: lazyLoad(NoMatch)
  }
]

export default rootRouter
