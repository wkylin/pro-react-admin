import React from 'react'
import loadable from '@loadable/component'
import Loading from '@stateless/Loading'
const SignIn = loadable(() => import('../pages/signin'), { fallback: <Loading /> })
const SignUp = loadable(() => import('../pages/signup'), { fallback: <Loading /> })
const Layout = loadable(() => import('../pages/layout'), { fallback: <Loading /> })
const Home = loadable(() => import('../pages/home'), { fallback: <Loading /> })
const Demo = loadable(() => import('../pages/demo'), { fallback: <Loading /> })
const Coupons = loadable(() => import('../pages/coupons'), { fallback: <Loading /> })
const CouponsHome = loadable(() => import('../pages/coupons/home'), { fallback: <Loading /> })
const CouponsAdd = loadable(() => import('../pages//coupons/add'), { fallback: <Loading /> })
const CouponsEdit = loadable(() => import('../pages/coupons/edit'), { fallback: <Loading /> })
const CouponsDetail = loadable(() => import('../pages/coupons/detail'), { fallback: <Loading /> })
const Product = loadable(() => import('../pages/product'), { fallback: <Loading /> })
const NoMatch = loadable(() => import('../components/stateless/NoMatch'), { fallback: <Loading /> })
// import basicRouter from './basic'
// import couponsRouter from './coupons'
// import productRouter from './product'
// import basicActRouter from './basicAct'

const rootRouter = [
  {
    path: '/',
    name: '首页',
    key: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        // path: '/',
        name: '首页',
        key: '/',
        element: <Home />
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        key: '/demo',
        element: <Demo />
      },
      {
        index: false,
        path: 'coupons',
        name: '送券活动单',
        isSubMenu: true, // 是否是子菜单 proSecNav
        key: '/coupons',
        element: <Coupons />,
        children: [
          {
            index: false,
            path: 'home',
            name: '首页',
            key: '/coupons/home',
            element: <CouponsHome />
          },
          {
            index: false,
            name: '新建',
            path: 'add',
            key: '/coupons/add',
            element: <CouponsAdd />
          },
          {
            index: false,
            path: 'edit',
            name: '编辑',
            key: '/coupons/edit',
            element: <CouponsEdit />
          },
          {
            index: false,
            path: 'detail',
            name: '详情',
            key: '/coupons/detail',
            element: <CouponsDetail />
          }
        ]
      },
      {
        index: false,
        path: 'product',
        name: '商品调价单',
        key: '/product',
        element: <Product />
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: <NoMatch />
      }
    ]
  },
  {
    index: false,
    path: 'signin',
    name: '登录',
    key: '/signin',
    element: <SignIn />
  },
  {
    index: false,
    path: 'signup',
    name: '注册',
    key: '/signup',
    element: <SignUp />
  }
  // {
  //   path: '*',
  //   name: 'No Match',
  //   element: <NoMatch />,
  // },
]

export default rootRouter
