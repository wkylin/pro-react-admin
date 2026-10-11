import { lazy } from 'react'
import Layout from '@layouts'
import { ProtectedRoute } from '@platform/auth/components/ProtectedRoute'
import { normalizeRouteTree, annotateRoutesWithPermissions, type RouteNode } from '@platform/navigation/routes'
import { ApplicationModules } from '@platform/modules'
import { enterpriseModules } from '../modules'
import { authRoutes } from '@app/routing/modules/auth.routes'
import { errorRoutes } from '@app/routing/modules/error.routes'

const Home = lazy(() => import('@features/administration/pages/HomePage'))
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
  ...authRoutes.map((route) => ({ ...route, auth: false })),
  ...errorRoutes.map((route) => ({ ...route, auth: false })),
]
export const annotatedRootRouter = annotateRoutesWithPermissions(normalizeRouteTree(raw))
export { flattenRouteNodes as flattenRoutes } from '@platform/navigation/routes'
export default annotatedRootRouter
