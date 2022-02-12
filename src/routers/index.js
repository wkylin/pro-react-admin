import React from 'react'
// import loadable from '@loadable/component'
import Loading from '@stateless/Loading'
const Layout = React.lazy(() => import('../pages/layout'))
const Home = React.lazy(() => import('../pages/home'))
const Demo = React.lazy(() => import('../pages/demo'))
const SignIn = React.lazy(() => import('../pages/signin'))
const SignUp = React.lazy(() => import('../pages/signup'))
const Coupons = React.lazy(() => import('../pages/coupons'))
const CouponsHome = React.lazy(() => import('../pages/coupons/home'))
const CouponsAdd = React.lazy(() => import('../pages/coupons/add'))
const CouponsEdit = React.lazy(() => import('../pages/coupons/edit'))
const CouponsDetail = React.lazy(() => import('../pages/coupons/detail'))
const Product = React.lazy(() => import('../pages/product'))
const NoMatch = React.lazy(() => import('../components/stateless/NoMatch'))
// import basicRouter from './basic'
// import couponsRouter from './coupons'
// import productRouter from './product'

// import basicActRouter from './basicAct'

const rootRouter = [
  {
    path: '/',
    name: '首页',
    key: '/',
    element: (
      <React.Suspense fallback={<Loading />}>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        // path: '/',
        name: '首页',
        key: '/',
        element: (
          <React.Suspense fallback={<Loading />}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        key: '/demo',
        element: (
          <React.Suspense fallback={<Loading />}>
            <Demo />
          </React.Suspense>
        ),
      },
      {
        index: false,
        path: 'coupons',
        name: '送券活动单',
        isSubMenu: true, // 是否是子菜单 proSecNav
        key: '/coupons',
        element: (
          <React.Suspense fallback={<Loading />}>
            <Coupons />
          </React.Suspense>
        ),
        children: [
          {
            index: false,
            path: 'home',
            name: '首页',
            key: '/coupons/home',
            element: (
              <React.Suspense fallback={<Loading />}>
                <CouponsHome />
              </React.Suspense>
            ),
          },
          {
            index: false,
            name: '新建',
            path: 'add',
            key: '/coupons/add',
            element: (
              <React.Suspense fallback={<Loading />}>
                <CouponsAdd />
              </React.Suspense>
            ),
          },
          {
            index: false,
            path: 'edit',
            name: '编辑',
            key: '/coupons/edit',
            element: (
              <React.Suspense fallback={<Loading />}>
                <CouponsEdit />
              </React.Suspense>
            ),
          },
          {
            index: false,
            path: 'detail',
            name: '详情',
            key: '/coupons/detail',
            element: (
              <React.Suspense fallback={<Loading />}>
                <CouponsDetail />
              </React.Suspense>
            ),
          },
        ],
      },
      {
        index: false,
        path: 'product',
        name: '商品调价单',
        key: '/product',
        element: (
          <React.Suspense fallback={<Loading />}>
            <Product />
          </React.Suspense>
        ),
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: (
          <React.Suspense fallback={<Loading />}>
            <NoMatch />
          </React.Suspense>
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
      <React.Suspense fallback={<Loading />}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    element: (
      <React.Suspense fallback={<Loading />}>
        <SignUp />
      </React.Suspense>
    ),
  },
  // {
  //   path: '*',
  //   name: 'No Match',
  //   element: (
  //     <React.Suspense fallback={<Loading />}>
  //       <NoMatch />
  //     </React.Suspense>
  //   ),
  // },
]

export default rootRouter
