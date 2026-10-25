import type { ReactNode } from 'react'
import { administrationManifest } from '@features/administration/manifest'
import { notificationsManifest } from '@features/notifications/manifest'
import { createModuleRegistry } from '@platform/modules'

test('shipped feature manifests declare only the capabilities they compile', () => {
  const Provider = ({ children }: { children: ReactNode }) => <>{children}</>
  const registry = createModuleRegistry(
    [
      {
        ...administrationManifest,
        routes: [{ path: 'administration/users', element: <div /> }],
        resources: { users: { path: '/api/admin/users', parse: (value: unknown) => value as { id: string } } },
        Provider,
      },
      {
        ...notificationsManifest,
        routes: [{ path: 'notifications', element: <div /> }],
        Provider,
        headerAction: { Component: () => null, route: '/notifications' },
      },
    ],
    { hostVersion: '5.1.0' }
  )

  expect(registry.modules.map(({ id }) => id)).toEqual(['administration', 'notifications'])
  expect(registry.modules.map(({ contractVersion }) => contractVersion)).toEqual([2, 2])
})
