import { renderHook } from '@testing-library/react'
import { createNavigationTree, filterNavigationTree } from '@platform/navigation/menu'
import type { NavigationItem } from '@platform/navigation/menu'
import type { RoutePolicy } from '@platform/auth/model/policy'
import policies from '../../../../../config/route-policy.json'

let mockNavigation: NavigationItem[] = []
jest.mock('@layouts/navigation/useNavigation', () => ({ useNavigation: () => mockNavigation }))
jest.mock('@layouts/navigation/menu.config', () => ({ createMenuIcon: () => null }))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options: { defaultValue: string }) =>
      (
        ({
          'menu.engineeringExamples': 'Engineering and technology',
          'menu.buildTools': 'Build tools',
          'menu.vuePlugins': 'Vue plugins',
        }) as Record<string, string>
      )[key] ?? options.defaultValue,
  }),
}))

const { useMenuSearch } = require('./useMenuSearch') as typeof import('./useMenuSearch')

beforeEach(() => {
  mockNavigation = createNavigationTree(policies as Readonly<Record<string, RoutePolicy>>)
})

test('finds engineering pages inside grouped navigation with their full parent chain', () => {
  const { result } = renderHook(() => useMenuSearch('Webpack'))
  expect(result.current.find(({ item }) => item.path === '/build/webpack')?.item.parentKeys).toEqual([
    '/examples/engineering',
    '/build',
  ])
  expect(result.current.find(({ item }) => item.path === '/build/webpack')?.item.parentLabels).toEqual([
    'Engineering and technology',
    'Build tools',
  ])
})

test('finds nested plugin pages after removing the extra Vue navigation level', () => {
  const { result } = renderHook(() => useMenuSearch('Vue3'))
  expect(result.current.find(({ item }) => item.path === '/tech/frontend/plugins/vue3')?.item.parentKeys).toEqual([
    '/examples/engineering',
    '/tech/frontend/plugins',
  ])
  expect(result.current.find(({ item }) => item.path === '/tech/frontend/plugins/vue3')?.item.parentLabels).toEqual([
    'Engineering and technology',
    'Vue plugins',
  ])
})

test('does not return a grouped page removed by permission filtering', () => {
  mockNavigation = filterNavigationTree(mockNavigation, {
    userId: 'reader',
    username: 'reader',
    roles: [],
    routes: ['*'],
    permissions: ['home:read', 'dashboard:read'],
  })
  const { result } = renderHook(() => useMenuSearch('Webpack'))
  expect(result.current.some(({ item }) => item.path === '/build/webpack')).toBe(false)
})
