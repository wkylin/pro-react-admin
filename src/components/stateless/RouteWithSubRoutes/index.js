import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={
        route.isAuthenticated
          ? route.redirect
            ? () => <Redirect to={route.redirect} />
            : (props) => <route.component {...props} routes={route.routes} />
          : (props) => (
              <Redirect
                to={{
                  pathname: '/layout/403',
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
      }
    />
  )
}

export default RouteWithSubRoutes
