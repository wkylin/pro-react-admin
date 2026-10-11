import { normalizeRouteTree, getRouteByPath, flattenRouteNodes } from '@platform/navigation/routes'
import { findRouteChain } from '@app/layouts/proContent/breadcrumb/util'

test('normalizes relative paths, absolute children, and index routes consistently', () => {
  const routes = normalizeRouteTree([
    {
      path: '/',
      name: 'Home',
      children: [
        {
          path: 'teams',
          name: 'Teams',
          children: [
            { index: true, name: 'Team list' },
            { path: ':id', name: 'Team details', element: <div /> },
          ],
        },
        { path: '/about', name: 'About' },
      ],
    },
  ])
  expect(flattenRouteNodes(routes).map((route) => route.key)).toEqual(['/', '/teams', '/teams', '/teams/:id', '/about'])
  expect(getRouteByPath(routes, '/teams/t-42')?.handle?.routePath).toBe('/teams/:id')
  const chain = findRouteChain(routes, '/teams/t-42')
  expect(chain.at(-1)?.path).toBe('/teams/t-42')
  expect(chain.some((item) => item.path.includes(':id'))).toBe(false)
  expect(chain.find((item) => item.name === 'Teams')?.clickable).toBe(true)
})
