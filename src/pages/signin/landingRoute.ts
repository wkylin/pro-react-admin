/** Honor an explicit destination only when it is a local route granted to this account. */
export function chooseDemoLandingRoute(routes: string[], requestedRoute: string | null): string {
  if (
    requestedRoute &&
    requestedRoute.startsWith('/') &&
    !requestedRoute.startsWith('//') &&
    !/[\\?#]/.test(requestedRoute) &&
    routes.includes(requestedRoute)
  )
    return requestedRoute
  return routes.includes('/') ? '/' : (routes[0] ?? '/403')
}
