import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  ApplicationModules,
  createModuleRegistry,
  ModuleActions,
  useApplicationModules,
  type ApplicationModule,
} from './index'

const moduleWith = (id: string, path: string): ApplicationModule => ({
  id,
  contractVersion: 1,
  routes: [{ path, element: <div /> }],
})

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
  expect(() => createModuleRegistry([{ ...definition, contractVersion: 2 } as unknown as ApplicationModule])).toThrow(
    'Unsupported module contract'
  )
})
