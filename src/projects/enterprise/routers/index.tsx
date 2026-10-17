import { lazy } from 'react'
import Layout from '@layouts'
import { ProtectedRoute } from '@platform/auth/components/ProtectedRoute'
import { normalizeRouteTree, annotateRoutesWithPermissions, type RouteNode } from '@platform/navigation/routes'
import { ApplicationModules } from '@platform/modules'
import { enterpriseModules } from '../modules'
import SignIn from '@pages/signin'
import { errorRoutes } from '@app/routing/modules/error.routes'

const Home = lazy(() => import('@features/administration/pages/HomePage'))
const Terms = lazy(() => import('@pages/terms'))
const Privacy = lazy(() => import('@pages/privacy'))
const enterpriseAuthRoutes: RouteNode[] = [
  { path: 'signin', name: 'Sign in', auth: false, element: <SignIn /> },
  { path: 'terms', name: 'Terms', auth: false, element: <Terms /> },
  { path: 'privacy', name: 'Privacy', auth: false, element: <Privacy /> },
]
const raw: RouteNode[] = [
  {
    path: '/',
    name: '工作台',
    auth: true,
    element: (
      <ApplicationModules registry={enterpriseModules}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </ApplicationModules>
    ),
    children: [{ index: true, name: '工作台', element: <Home /> }, ...enterpriseModules.routes],
  },
  ...enterpriseAuthRoutes,
  ...errorRoutes.map((route) => ({ ...route, auth: false })),
]
export const annotatedRootRouter = annotateRoutesWithPermissions(normalizeRouteTree(raw))
export { flattenRouteNodes as flattenRoutes } from '@platform/navigation/routes'
export default annotatedRootRouter
