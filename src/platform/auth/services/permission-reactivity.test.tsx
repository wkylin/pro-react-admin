import { act, render, screen } from '@testing-library/react'
import type { UserPermission } from '../model/permission'

const previousMockMode = process.env.REACT_APP_USE_MOCK
beforeAll(() => {
  process.env.REACT_APP_USE_MOCK = 'true'
})
afterAll(() => {
  if (previousMockMode === undefined) delete process.env.REACT_APP_USE_MOCK
  else process.env.REACT_APP_USE_MOCK = previousMockMode
})

const getUserPermissions = jest.fn()
jest.doMock('../api/permission', () => ({ getUserPermissions }))
const { permissionService } = require('./permissionService') as typeof import('./permissionService')
const { useCheckPermission } = require('../hooks/usePermission') as typeof import('../hooks/usePermission')
const { clearSession } = require('../model/session') as typeof import('../model/session')
const admin: UserPermission = { userId: '1', username: 'admin', roles: [], permissions: ['user:read'], routes: [] }
function Consumer({ name }: { name: string }) {
  const access = useCheckPermission('user:read')
  return (
    <span>
      {name}:{access.hasPermission ? 'allowed' : 'denied'}
    </span>
  )
}
beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('token', JSON.stringify({ token: 'account-a' }))
  permissionService.clearCache()
  getUserPermissions.mockReset()
})
test('all mounted consumers react to refreshed permissions and same-tab logout', async () => {
  getUserPermissions.mockResolvedValue(admin)
  render(
    <>
      <Consumer name="menu" />
      <Consumer name="action" />
    </>
  )
  await screen.findByText('menu:allowed')
  expect(screen.getByText('action:allowed')).toBeInTheDocument()
  expect(getUserPermissions).toHaveBeenCalledTimes(1)
  getUserPermissions.mockResolvedValue({ ...admin, permissions: [] })
  await act(async () => {
    await permissionService.syncPermissions()
  })
  expect(screen.getByText('menu:denied')).toBeInTheDocument()
  expect(screen.getByText('action:denied')).toBeInTheDocument()
  getUserPermissions.mockResolvedValue(admin)
  await act(async () => {
    await permissionService.syncPermissions()
  })
  act(() => clearSession())
  expect(screen.getByText('menu:denied')).toBeInTheDocument()
  expect(screen.getByText('action:denied')).toBeInTheDocument()
})
test('cross-tab credential changes refresh all subscribers and listeners are released', async () => {
  getUserPermissions.mockResolvedValue(admin)
  const add = jest.spyOn(window, 'addEventListener'),
    remove = jest.spyOn(window, 'removeEventListener')
  const view = render(<Consumer name="menu" />)
  await screen.findByText('menu:allowed')
  getUserPermissions.mockResolvedValue({ ...admin, permissions: [] })
  await act(async () => {
    localStorage.setItem('token', JSON.stringify({ token: 'account-b' }))
    window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: 'account-b' }))
  })
  expect(screen.getByText('menu:denied')).toBeInTheDocument()
  view.unmount()
  const handler = add.mock.calls.find(([name]) => String(name) === 'storage')?.[1]
  expect(remove).toHaveBeenCalledWith('storage', handler)
  add.mockRestore()
  remove.mockRestore()
})

test('expired grants are refreshed for mounted consumers without navigation', async () => {
  jest.useFakeTimers()
  try {
    getUserPermissions.mockResolvedValueOnce(admin).mockResolvedValueOnce({ ...admin, permissions: [] })
    render(<Consumer name="menu" />)
    await act(async () => {
      await permissionService.getPermissions()
    })
    expect(screen.getByText('menu:allowed')).toBeInTheDocument()
    await act(async () => {
      jest.advanceTimersByTime(30 * 60 * 1000 + 1)
    })
    expect(screen.getByText('menu:denied')).toBeInTheDocument()
    expect(getUserPermissions).toHaveBeenCalledTimes(2)
  } finally {
    jest.useRealTimers()
  }
})
