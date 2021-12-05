import React from 'react'
// import loadable from '@loadable/component'
import Loading from '@stateless/Loading'
const Layout = React.lazy(() => import('../pages/layout'))
// const Home = React.lazy(() => import('../pages/home'))
const Demo = React.lazy(() => import('../pages/demo'))
const NoMatch = React.lazy(() => import('../components/stateless/NoMatch'))
// import basicRouter from './basic'
// import couponsRouter from './coupons'
// import productRouter from './product'

// import basicActRouter from './basicAct'

const rootRouter = [
  {
    path: '/',
    name: '首页',
    element: (
      <React.Suspense fallback={<Loading />}>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        name: 'Demo',
        element: (
          <React.Suspense fallback={<Loading />}>
            <Demo />
          </React.Suspense>
        ),
      },
      {
        path: '*',
        name: 'No Match',
        element: (
          <React.Suspense fallback={<Loading />}>
            <NoMatch />
          </React.Suspense>
        ),
      },
    ],
  },
]

export default rootRouter
