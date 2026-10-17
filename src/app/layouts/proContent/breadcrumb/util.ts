import { matchRoutes, type RouteObject } from 'react-router-dom'
import type { RouteNode } from '@platform/navigation/routes'

export function findRouteChain(routes: readonly RouteNode[], pathname: string) {
  const matches = matchRoutes(routes as RouteObject[], { pathname }) || []
  return matches.flatMap((match, depth) => {
    const route = match.route as RouteNode
    if (route.path === '*') return []
    const title = route.handle?.title || route.meta?.title || route.name
    if (!title) return []
    const i18nKey = route.handle?.i18nKey || route.i18nKey || route.meta?.i18nKey
    const parentMatch = matches[depth - 1]
    if (route.index && parentMatch?.pathnameBase === match.pathnameBase) {
      const parent = parentMatch.route as RouteNode
      const parentTitle = parent.handle?.title || parent.meta?.title || parent.name
      const parentI18nKey = parent.handle?.i18nKey || parent.i18nKey || parent.meta?.i18nKey
      if (title === parentTitle && i18nKey === parentI18nKey) return []
    }
    return [
      {
        path: match.pathname,
        key: `${route.key || match.pathname}:${depth}`,
        name: title,
        i18nKey,
        clickable: !route.children?.length || route.children.some((child) => child.index),
      },
    ]
  })
}
