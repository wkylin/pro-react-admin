import { useMemo } from 'react'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { filterNavigationTree, filterNavigationByRoutes } from '@platform/navigation/menu'
import { flattenRouteNodes } from '@platform/navigation/routes'
import rootRouter from '@routers'
import { mainLayoutMenu } from './menu.config'

export function useNavigation() {
  const { current } = usePermission()
  return useMemo(() => {
    const paths = new Set(flattenRouteNodes(rootRouter).map((route) => route.handle?.routePath ?? route.path ?? ''))
    return filterNavigationTree(filterNavigationByRoutes(mainLayoutMenu, paths), current)
  }, [current])
}
