import React from 'react'
import { Navigate } from 'react-router-dom'
import NoMatch from '@stateless/NoMatch'

import Portal from '../pages/Portal'
import RemoteApp from '../pages/RemoteApp'

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
  {
    path: '/projectA',
    auth: false,
    element: <RemoteApp remote="projectA" />,
  },
  {
    path: '/projectB',
    auth: false,
    element: <RemoteApp remote="projectB" />,
  },
  {
    path: '*',
    auth: false,
    element: <NoMatch />,
  },
]

export default routes
