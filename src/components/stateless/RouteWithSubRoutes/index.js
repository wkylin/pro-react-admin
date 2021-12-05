import React from 'react'
import { Route } from 'react-router-dom'

const RouteWithSubRoutes = (route) => {
  debugger
  // const routeRef = useRoutes(route)

  // return <Route path={route.path} element={route.component} />
  return <Route path={'/'} element={<div>中国</div>} />
}

export default RouteWithSubRoutes
