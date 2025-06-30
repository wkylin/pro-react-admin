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
const Layout = lazy(() => import('@pages/layout'))
const Home = lazy(() => import('@pages/home'))
const Demo = lazy(() => import('@pages/demo'))
const Coupons = lazy(() => import('@pages/coupons'))
const CouponsHome = lazy(() => import('@pages/coupons/home'))
const CouponsAdd = lazy(() => import('@pages/coupons/add'))
const CouponsEdit = lazy(() => import('@pages/coupons/edit'))
const CouponsDetail = lazy(() => import('@pages/coupons/detail'))
const ErrorPage = lazy(() => import('@pages/error'))
const Dashboard = lazy(() => import('@pages/dashboard'))
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
