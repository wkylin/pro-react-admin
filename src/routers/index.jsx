import React, { Suspense, lazy } from 'react'
import Loading from '@src/components/stateless/Loading'

const SignIn = lazy(() => import('../pages/signin'))
const SignUp = lazy(() => import('../pages/signup'))
const Layout = lazy(() => import('../pages/layout'))
const Home = lazy(() => import('../pages/home'))
const Demo = lazy(() => import('../pages/demo'))
const Coupons = lazy(() => import('../pages/coupons'))
const CouponsHome = lazy(() => import('../pages/coupons/home'))
const CouponsAdd = lazy(() => import('../pages/coupons/add'))
const CouponsEdit = lazy(() => import('../pages/coupons/edit'))
const CouponsDetail = lazy(() => import('../pages/coupons/detail'))
const Product = lazy(() => import('../pages/product'))
const ErrorPage = lazy(() => import('../pages/error'))
const Dashboard = lazy(() => import('../pages/dashboard'))
const ParallaxVert = lazy(() => import('../pages/parallax'))
const QrCode = lazy(() => import('../pages/qrGenerate'))
const PrismRender = lazy(() => import('../pages/prism'))
const NoMatch = lazy(() => import('../components/stateless/NoMatch'))

const rootRouter = [
  {
    path: '/',
    name: '首页',
    key: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        key: '/demo',
        element: (
          <Suspense fallback={<Loading />}>
            <Demo />
          </Suspense>
        ),
      },
      {
        index: false,
        path: 'parallax',
        name: 'Parallax',
        key: '/parallax',
        element: (
          <Suspense fallback={<Loading />}>
            <ParallaxVert />
          </Suspense>
        ),
      },
      {
        index: false,
        path: 'qrcode',
        name: 'QrGenerate',
        key: '/qrcode',
        element: (
          <Suspense fallback={<Loading />}>
            <QrCode />
          </Suspense>
        ),
      },
      {
        index: false,
        path: 'prism',
        name: 'PrismRender',
        key: '/prism',
        element: (
          <Suspense fallback={<Loading />}>
            <PrismRender />
          </Suspense>
        ),
      },
      {
        index: false,
        path: 'coupons',
        name: '前端技术栈',
        isSubMenu: true, // 是否是子菜单 proSecNav
        key: '/coupons',
        element: (
          <Suspense fallback={<Loading />}>
            <Coupons />
          </Suspense>
        ),
        children: [
          {
            index: false,
            path: 'home',
            name: 'React',
            key: '/coupons/home',
            element: (
              <Suspense fallback={<Loading />}>
                <CouponsHome />
              </Suspense>
            ),
          },
          {
            index: false,
            name: 'Vue',
            path: 'add',
            key: '/coupons/add',
            element: (
              <Suspense fallback={<Loading />}>
                <CouponsAdd />
              </Suspense>
            ),
          },
          {
            index: false,
            path: 'edit',
            name: 'Angular',
            key: '/coupons/edit',
            element: (
              <Suspense fallback={<Loading />}>
                <CouponsEdit />
              </Suspense>
            ),
          },
          {
            index: false,
            path: 'detail',
            name: 'Node',
            key: '/coupons/detail',
            element: (
              <Suspense fallback={<Loading />}>
                <CouponsDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        index: false,
        path: 'product',
        name: '后端技术栈',
        key: '/product',
        element: (
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
        ),
      },
      {
        index: false,
        path: 'error',
        name: 'Error',
        key: '/error',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NoMatch />
          </Suspense>
        ),
      },
    ],
  },
  {
    index: false,
    path: 'signin',
    name: '登录',
    key: '/signin',
    element: (
      <Suspense fallback={<Loading />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    element: (
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    index: false,
    path: 'dashboard/*',
    name: 'Dashboard',
    key: '/dashboard',
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NoMatch />
      </Suspense>
    ),
  },
]

export default rootRouter
