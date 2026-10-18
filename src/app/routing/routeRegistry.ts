import type { RouteNode } from './utils'
import { businessRoutes } from './modules/business.routes'
import { uiRoutes } from './modules/ui.routes'
import { chartRoutes } from './modules/chart.routes'
import { nestedRoutes } from './modules/nested.routes'
import { techRoutes } from './modules/tech.routes'
import { zustandRoutes } from './modules/zustand.routes'

export type RouteCategory = 'business' | 'ui' | 'visualization' | 'technology' | 'notifications' | 'build' | 'state'

export interface RouteGroup {
  id: string
  category: RouteCategory
  access: 'authenticated'
  layout: 'primary'
  routes: RouteNode[]
}

/**
 * Application route groups are organized by product function. Authentication
 * and layout policy are attached here once, then inherited by their routes.
 */
export const mainRouteGroups: RouteGroup[] = [
  { id: 'business', category: 'business', access: 'authenticated', layout: 'primary', routes: businessRoutes },
  { id: 'ui', category: 'ui', access: 'authenticated', layout: 'primary', routes: uiRoutes },
  { id: 'visualization', category: 'visualization', access: 'authenticated', layout: 'primary', routes: chartRoutes },
  { id: 'technology', category: 'technology', access: 'authenticated', layout: 'primary', routes: nestedRoutes },
  { id: 'build', category: 'build', access: 'authenticated', layout: 'primary', routes: techRoutes },
  { id: 'state', category: 'state', access: 'authenticated', layout: 'primary', routes: zustandRoutes },
]

export interface RoutePolicyDefaults {
  category: string
  access: 'public' | 'authenticated'
  layout: 'primary' | 'standalone' | 'none'
}

export function applyRoutePolicy(routes: readonly RouteNode[], defaults: RoutePolicyDefaults): RouteNode[] {
  return routes.map((route) => ({
    ...route,
    meta: {
      ...(route.meta ?? {}),
      category: route.meta?.category ?? defaults.category,
      access: route.meta?.access ?? defaults.access,
      layout: route.meta?.layout ?? defaults.layout,
    },
    ...(route.children ? { children: applyRoutePolicy(route.children, defaults) } : {}),
  }))
}
