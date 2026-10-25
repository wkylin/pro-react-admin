import type { ReactNode } from 'react'
import { administrationManifest } from '@features/administration/manifest'
import { notificationsManifest } from '@features/notifications/manifest'
import { createModuleRegistry } from '@platform/modules'

const shippedModules = () => {
  const Provider = ({ children }: { children: ReactNode }) => <>{children}</>
  return [
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
  ]
}

test.each(['5.1.0', '6.0.0'])('shipped feature manifests compile on application %s', (hostVersion) => {
  const registry = createModuleRegistry(shippedModules(), { hostVersion })

  expect(registry.modules.map(({ id }) => id)).toEqual(['administration', 'notifications'])
  expect(registry.modules.map(({ contractVersion }) => contractVersion)).toEqual([2, 2])
})

test('shipped feature manifests reject an unreviewed next major version', () => {
  expect(() => createModuleRegistry(shippedModules(), { hostVersion: '7.0.0' })).toThrow(
    'incompatible with application'
  )
})
