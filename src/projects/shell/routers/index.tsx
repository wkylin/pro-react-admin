import React from 'react'
import { Navigate } from 'react-router-dom'
import NoMatch from '@stateless/NoMatch'

import Portal from '../pages/Portal'
import RemoteApp from '../pages/RemoteApp'
import type { RemoteName } from '../remote-components'
import registry from '../../registry.json'

const remoteRoutes = registry.remotes.map((remote) => ({
  path: remote.routePath,
  auth: false,
  element: <RemoteApp remote={remote.name as RemoteName} />,
}))

const routes = [
  {
    path: '/',
    auth: false,
    element: <Navigate to="/portal" replace />,
  },
  {
    path: '/portal',
    auth: false,
    element: <Portal />,
  },
  ...remoteRoutes,
  {
    path: '*',
    auth: false,
    element: <NoMatch />,
  },
]

export default routes
