import { matchPath } from 'react-router-dom'
import type { RoutePolicy } from '../auth/model/policy'
import { canAccessPath } from '../auth/model/policy'
import type { UserPermission } from '../auth/model/permission'

export interface NavigationItem {
  key: string
  path: string
  label: string
  i18nKey?: string
  iconName?: string
  group: boolean
  children?: NavigationItem[]
}

/** Navigation order and grouping belong to the same manifest as route access and titles. */
export function createNavigationTree(policies: Readonly<Record<string, RoutePolicy>>): NavigationItem[] {
  const entries = Object.entries(policies).filter(([, policy]) => policy.menu)
  const items = new Map<string, NavigationItem>(
    entries.map(([path, policy]) => [
      path,
      {
        key: path,
        path,
        label: policy.title || path,
        i18nKey: policy.i18nKey,
        iconName: policy.menu?.icon,
        group: Boolean(policy.menuGroup),
      },
    ])
  )
  const roots: NavigationItem[] = []
  for (const [path, policy] of entries.sort((a, b) => (a[1].menu?.order ?? 0) - (b[1].menu?.order ?? 0))) {
    const item = items.get(path)!
    const parent = policy.menu?.parent
    if (!parent) roots.push(item)
    else {
      const parentItem = items.get(parent)
      if (!parentItem) throw new Error(`Navigation parent ${parent} does not exist for ${path}`)
      ;(parentItem.children ??= []).push(item)
    }
  }
  const visited = new Set<string>()
  const visit = (nodes: NavigationItem[]) => {
    for (const item of nodes) {
      if (visited.has(item.path)) throw new Error(`Navigation cycle: ${item.path}`)
      visited.add(item.path)
      if (item.children) visit(item.children)
    }
  }
  visit(roots)
  if (visited.size !== items.size) throw new Error('Navigation contains an unreachable parent cycle')
  return roots
}

export function filterNavigationTree(
  items: readonly NavigationItem[],
  current: UserPermission | null
): NavigationItem[] {
  if (!current) return []
  return items.flatMap((item) => {
    if (item.children?.length) {
      const children = filterNavigationTree(item.children, current)
      return children.length ? [{ ...item, children }] : []
    }
    return !item.group && canAccessPath(current, item.path) ? [{ ...item }] : []
  })
}

/** A shared layout only exposes pages registered by the selected project. */
export function filterNavigationByRoutes(
  items: readonly NavigationItem[],
  routePaths: ReadonlySet<string>
): NavigationItem[] {
  return items.flatMap((item) => {
    if (item.children?.length) {
      const children = filterNavigationByRoutes(item.children, routePaths)
      return children.length ? [{ ...item, children }] : []
    }
    return routePaths.has(item.path) ? [item] : []
  })
}

export function findNavigationChain(items: readonly NavigationItem[], pathname: string): NavigationItem[] {
  let best: NavigationItem[] = []
  const visit = (nodes: readonly NavigationItem[], parents: NavigationItem[]) => {
    for (const item of nodes) {
      const chain = [...parents, item]
      if (
        matchPath({ path: item.path, end: item.path === '/' }, pathname) &&
        item.path.length > (best.at(-1)?.path.length ?? 0)
      )
        best = chain
      if (item.children) visit(item.children, chain)
    }
  }
  visit(items, [])
  return best
}
