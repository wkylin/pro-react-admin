import { Navigate } from 'react-router-dom'

import { annotateRoutesWithPermissions, normalizeRouteTree, type RouteNode } from '@platform/navigation/routes'

import ProjectBHome from '../pages/Home'
import ProjectBAbout from '../pages/About'
import ProjectBReuse from '../pages/Reuse'
import ProjectBNotFound from '../pages/NotFound'

const rawRootRouter: RouteNode[] = [
  {
    path: '/',
    auth: false,
    element: <Navigate to="/projectB/home" replace />,
  },
  {
    path: '/projectB',
    auth: false,
    element: <Navigate to="/projectB/home" replace />,
  },
  {
    path: '/projectB/home',
    auth: false,
    element: <ProjectBHome />,
  },
  {
    path: '/projectB/about',
    auth: false,
    element: <ProjectBAbout />,
  },
  {
    path: '/projectB/reuse',
    auth: false,
    element: <ProjectBReuse />,
  },
  {
    path: '*',
    auth: false,
    element: <ProjectBNotFound />,
  },
]

const rootRouter = normalizeRouteTree(rawRootRouter)
const annotatedRootRouter = annotateRoutesWithPermissions(rootRouter)

export { flattenRouteNodes as flattenRoutes } from '@platform/navigation/routes'

export { rootRouter, annotatedRootRouter }
export default annotatedRootRouter
