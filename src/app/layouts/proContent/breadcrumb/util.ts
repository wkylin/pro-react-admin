import { matchRoutes, type RouteObject } from 'react-router-dom'
import type { RouteNode } from '@platform/navigation/routes'

export function findRouteChain(routes: readonly RouteNode[], pathname: string) {
  return (matchRoutes(routes as RouteObject[], { pathname }) || []).flatMap((match) => {
    const route = match.route as RouteNode
    if (route.path === '*') return []
    const title = route.handle?.title || route.meta?.title || route.name
    if (!title) return []
    return [
      {
        path: match.pathname,
        key: route.key || match.pathname,
        name: title,
        i18nKey: route.handle?.i18nKey || route.i18nKey || route.meta?.i18nKey,
        clickable: !route.children?.length || route.children.some((child) => child.index),
      },
    ]
  })
}
