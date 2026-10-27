import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { administrationRoutes } from '@features/administration/routes'
import {
  ApplicationModules,
  createModuleRegistry as buildModuleRegistry,
  ModuleActions,
  useApplicationModules,
  type ApplicationModule,
  type ModuleCapability,
} from './index'

const TEST_HOST_VERSION = '5.1.0'

const moduleWith = (id: string, path: string): ApplicationModule => ({
  id,
  contractVersion: 2,
  version: '1.0.0',
  compatibility: { application: '>=5.1.0 <6.0.0' },
  capabilities: ['routes'],
  routes: [{ path, element: <div /> }],
  data: { minimumSupportedVersion: 0, currentVersion: 0, migrations: [] },
  uninstall: { dataPolicy: 'ephemeral', cleanup: 'none' },
})

const createModuleRegistry = (definitions: readonly ApplicationModule[], hostVersion = TEST_HOST_VERSION) => {
  const testDefinitions = definitions.map((definition) => {
    const capabilities: ModuleCapability[] = ['routes']
    if (definition.resources && Object.keys(definition.resources).length) capabilities.push('resources')
    if (definition.Provider) capabilities.push('provider')
    if (definition.headerAction) capabilities.push('header-action')
    return {
      ...definition,
      capabilities,
      uninstall: { ...definition.uninstall, cleanup: definition.Provider ? 'provider-unmount' : 'none' } as const,
    }
  })
  return buildModuleRegistry(testDefinitions, { hostVersion })
}

test('selected features supply permissioned routes and namespaced data definitions', () => {
  const definition = moduleWith('members', 'administration/users')
  definition.resources = { users: { path: '/api/admin/users', parse: () => ({ id: 'u-1' }) } }
  const registry = createModuleRegistry([definition])
  expect(registry.routes[0].handle?.routePath).toBe('/administration/users')
  expect(registry.routes[0].meta?.permission).toBe('user:read')
  expect(registry.routes[0].meta?.access).toBe('permissioned')
  expect(registry.resources.members.users.path).toBe('/api/admin/users')
  expect(registry.routes.some((route) => route.handle?.routePath === '/notifications')).toBe(false)
})

test('the shipped administration routes register before sign-in renders', () => {
  const definition = moduleWith('administration', 'administration/users')
  definition.routes = administrationRoutes
  expect(() => createModuleRegistry([definition])).not.toThrow()
})

test('dependency providers wrap consumers even when modules are declared in reverse order', () => {
  const Context = createContext('missing')
  function Dependency({ children }: { children: ReactNode }) {
    return <Context.Provider value="dependency ready">{children}</Context.Provider>
  }
  function Dependent({ children }: { children: ReactNode }) {
    return (
      <>
        <span>{useContext(Context)}</span>
        {children}
      </>
    )
  }
  const dependency = { ...moduleWith('base', 'administration/users'), Provider: Dependency }
  const dependent = { ...moduleWith('consumer', 'administration/roles'), dependencies: ['base'], Provider: Dependent }
  render(
    <ApplicationModules registry={createModuleRegistry([dependent, dependency])}>
      <span>page</span>
    </ApplicationModules>
  )
  expect(screen.getByText('dependency ready')).toBeVisible()
  expect(screen.getByText('page')).toBeVisible()
})

test('each application owns provider state and unmount runs module cleanup', () => {
  const cleanup = jest.fn()
  function Provider({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0)
    useEffect(() => cleanup, [])
    return (
      <>
        <button onClick={() => setCount(count + 1)}>Count {count}</button>
        {children}
      </>
    )
  }
  const registry = createModuleRegistry([{ ...moduleWith('members', 'administration/users'), Provider }])
  const first = render(<ApplicationModules registry={registry}>first root</ApplicationModules>)
  const second = render(<ApplicationModules registry={registry}>second root</ApplicationModules>)
  fireEvent.click(screen.getAllByRole('button', { name: 'Count 0' })[0])
  expect(screen.getByRole('button', { name: 'Count 1' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Count 0' })).toBeVisible()
  first.unmount()
  expect(cleanup).toHaveBeenCalledTimes(1)
  expect(screen.getByText('second root')).toBeVisible()
  second.unmount()
  expect(cleanup).toHaveBeenCalledTimes(2)
})

test('selected modules contribute header actions inside their provider and absent modules contribute none', () => {
  function Action() {
    return <button>{useApplicationModules().modules[0].id} action</button>
  }
  const registry = createModuleRegistry([
    { ...moduleWith('members', 'administration/users'), headerAction: { Component: Action } },
  ])
  const view = render(
    <ApplicationModules registry={registry}>
      <ModuleActions placement="header" />
    </ApplicationModules>
  )
  expect(screen.getByRole('button', { name: 'members action' })).toBeVisible()
  view.rerender(
    <ApplicationModules registry={createModuleRegistry([])}>
      <ModuleActions placement="header" />
    </ApplicationModules>
  )
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})

test('ambiguous case-insensitive and renamed-parameter routes fail before rendering', () => {
  expect(() =>
    createModuleRegistry([moduleWith('first', 'notification/:id'), moduleWith('second', 'Notification/:recordId')])
  ).toThrow('Duplicate module route')
  expect(() =>
    createModuleRegistry([moduleWith('first', 'administration/users'), moduleWith('second', '/administration/users')])
  ).toThrow('Duplicate module route')
})

test('unmapped pages and conflicting permission requirements fail closed', () => {
  expect(() => createModuleRegistry([moduleWith('unknown', 'unknown-page')])).toThrow('explicit permission policy')
  expect(() => createModuleRegistry([moduleWith('account', 'account/security')])).toThrow('explicit permission policy')
  const conflicting = moduleWith('conflicting', 'administration/users')
  conflicting.routes = [{ path: 'administration/users', element: <div />, meta: { permission: 'home:read' } }]
  expect(() => createModuleRegistry([conflicting])).toThrow('permission conflicts')
})

test('header actions cannot attach to another module route and route metadata cannot hide an unmapped path', () => {
  const definition = moduleWith('members', 'administration/users')
  expect(() =>
    createModuleRegistry([{ ...definition, headerAction: { Component: () => null, route: '/administration/roles' } }])
  ).toThrow('route owned by members')
  expect(() =>
    createModuleRegistry([
      {
        ...definition,
        routes: [{ path: 'unknown', element: <div />, handle: { routePath: '/administration/users' } }],
      },
    ])
  ).toThrow('metadata conflicts')
})

test('missing dependencies, dependency cycles and duplicate module ids fail before rendering', () => {
  const first = moduleWith('first', 'administration/users')
  expect(() => createModuleRegistry([first, first])).toThrow('Duplicate module')
  expect(() => createModuleRegistry([{ ...first, dependencies: ['missing'] }])).toThrow('Missing module dependency')
  expect(() =>
    createModuleRegistry([
      { ...first, dependencies: ['second'] },
      { ...moduleWith('second', 'administration/roles'), dependencies: ['first'] },
    ])
  ).toThrow('Module dependency cycle')
})

test('public authentication routes and unsupported contract versions cannot enter business modules', () => {
  const definition = moduleWith('members', 'administration/users')
  expect(() =>
    createModuleRegistry([{ ...definition, routes: [{ path: 'administration/users', element: <div />, auth: false }] }])
  ).toThrow('Public routes')
  expect(() => createModuleRegistry([{ ...definition, contractVersion: 3 } as unknown as ApplicationModule])).toThrow(
    'Unsupported module contract'
  )
})

test('the registry rejects legacy contracts and checks v2 application compatibility', () => {
  const current = moduleWith('current', 'administration/users')
  expect(() =>
    buildModuleRegistry([{ ...current, contractVersion: 1 } as unknown as ApplicationModule], {
      hostVersion: '5.1.0',
    })
  ).toThrow('Unsupported module contract')
  expect(buildModuleRegistry([current], { hostVersion: '5.1.0' }).modules[0].contractVersion).toBe(2)
  expect(() => buildModuleRegistry([current], { hostVersion: '6.0.0' })).toThrow('incompatible with application')
})

test('v2 capabilities, migration chains and uninstall lifecycle declarations fail closed', () => {
  const definition = moduleWith('invalid', 'administration/users')
  expect(() => buildModuleRegistry([{ ...definition, routes: [] }], { hostVersion: TEST_HOST_VERSION })).toThrow(
    'must declare at least one route'
  )
  expect(() =>
    buildModuleRegistry([{ ...definition, capabilities: ['routes', 'provider'] }], { hostVersion: TEST_HOST_VERSION })
  ).toThrow('capability declaration')

  const migration = {
    id: 'users-v1',
    from: 0,
    to: 1,
    checksum: 'a'.repeat(64),
    requiresBackup: true,
    rollback: 'backup-restore' as const,
  }
  const migrated = {
    ...definition,
    data: { minimumSupportedVersion: 0, currentVersion: 1, migrations: [migration] },
    uninstall: { ...definition.uninstall, dataPolicy: 'retain' as const },
  }
  expect(buildModuleRegistry([migrated], { hostVersion: TEST_HOST_VERSION }).modules).toHaveLength(1)
  expect(() =>
    buildModuleRegistry([{ ...migrated, data: { ...migrated.data, migrations: [] } }], {
      hostVersion: TEST_HOST_VERSION,
    })
  ).toThrow('missing migration')

  const withProvider = { ...definition, Provider: () => null }
  expect(() =>
    buildModuleRegistry(
      [
        {
          ...withProvider,
          capabilities: ['routes', 'provider'],
          uninstall: { ...definition.uninstall, cleanup: 'none' },
        },
      ],
      { hostVersion: TEST_HOST_VERSION }
    )
  ).toThrow('uninstall cleanup must match')
})
