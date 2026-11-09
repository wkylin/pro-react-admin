import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { UserPermission } from '@platform/auth/model/permission'

const navigate = jest.fn()
const accessList = jest.fn()
const providerList = jest.fn()
const subscribers = new Map<string, Set<() => void>>()
const subscribe = jest.fn((resource: string, listener: () => void) => {
  const listeners = subscribers.get(resource) ?? new Set<() => void>()
  listeners.add(listener)
  subscribers.set(resource, listeners)
  return () => listeners.delete(listener)
})
const provider = { list: providerList, subscribe }
const access = { list: accessList }
const t = (key: string) => key
const i18n = { resolvedLanguage: 'en' }
let current: UserPermission

jest.doMock('react-i18next', () => ({
  useTranslation: () => ({ t, i18n }),
}))
jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate,
}))
jest.doMock('@platform/auth/hooks/usePermission', () => ({ usePermission: () => ({ current }) }))
jest.doMock('../model/AdministrationProvider', () => ({
  useAdministration: () => ({
    provider,
    access,
    accessRevision: 0,
    demo: false,
  }),
}))

const HomePage = require('./HomePage').default as typeof import('./HomePage').default

beforeEach(() => {
  navigate.mockReset()
  accessList.mockReset()
  providerList.mockReset()
  subscribe.mockClear()
  subscribers.clear()
  current = {
    userId: 'u-1',
    username: 'Admin',
    roles: [],
    permissions: ['home:read', 'user:read', 'role:read', 'access:read', 'access:approve', 'audit:read'],
    routes: ['*'],
  }
  providerList.mockImplementation(async (resource: string) => ({
    items:
      resource === 'audit'
        ? [
            {
              id: 'audit-1',
              actor: 'Admin',
              action: 'update',
              resource: 'users',
              recordId: 'u-2',
              at: '2026-10-27T08:00:00Z',
            },
          ]
        : [{ id: `${resource}-1` }],
    total: resource === 'users' ? 53 : resource === 'roles' ? 7 : 1,
  }))
})

test('workspace shows live pending approvals and recent audit entries', async () => {
  accessList.mockResolvedValue({ items: [{ id: 'request-1' }], total: 2 })
  render(<HomePage />)

  expect(await screen.findByText('2')).toBeInTheDocument()
  expect(await screen.findByText('53')).toBeInTheDocument()
  expect(await screen.findByText('7')).toBeInTheDocument()
  expect(screen.getByText('Admin')).toBeInTheDocument()
  expect(screen.getByText('admin.flow.review.title')).toBeInTheDocument()
  await waitFor(() => {
    expect(accessList).toHaveBeenCalledWith({ page: 1, pageSize: 1, status: 'pending' })
    expect(providerList).toHaveBeenCalledWith(
      'audit',
      { page: 1, pageSize: 5, sort: 'at', order: 'desc' },
      expect.objectContaining({ showError: false })
    )
  })
})

test('workspace only presents tasks authorized for a reader', async () => {
  current = { ...current, permissions: ['home:read', 'user:read'] }
  render(<HomePage />)

  expect(screen.getByText('admin.flow.member.title')).toBeInTheDocument()
  expect(screen.queryByText('admin.flow.review.title')).not.toBeInTheDocument()
  expect(screen.queryByText('admin.pendingWork')).not.toBeInTheDocument()
  expect(accessList).not.toHaveBeenCalled()
  expect(await screen.findByText('53')).toBeInTheDocument()
  expect(providerList).toHaveBeenCalledTimes(1)
  expect(providerList).toHaveBeenCalledWith(
    'users',
    { page: 1, pageSize: 1 },
    expect.objectContaining({ signal: expect.any(AbortSignal), showError: false })
  )
  expect(screen.queryByText('adminOverview.roles')).not.toBeInTheDocument()
})

test('an account without resource read permissions does not request or show totals', () => {
  current = { ...current, permissions: ['home:read'] }
  render(<HomePage />)
  expect(providerList).not.toHaveBeenCalled()
  expect(accessList).not.toHaveBeenCalled()
  expect(screen.queryByText('adminOverview.users')).not.toBeInTheDocument()
  expect(screen.queryByText('adminOverview.roles')).not.toBeInTheDocument()
})

test('a failed count is an actionable error, not a zero, and retries its own resource', async () => {
  current = { ...current, permissions: ['home:read', 'user:read'] }
  providerList.mockRejectedValueOnce(new Error('members unavailable'))
  render(<HomePage />)
  const members = screen.getByRole('region', { name: 'adminOverview.users' })
  expect(await within(members).findByText('members unavailable')).toBeInTheDocument()
  expect(within(members).queryByText('0')).not.toBeInTheDocument()
  fireEvent.click(within(members).getByRole('button', { name: 'admin.retry' }))
  expect(await within(members).findByText('53')).toBeInTheDocument()
  expect(providerList.mock.calls.map(([resource]) => resource)).toEqual(['users', 'users'])
})

test('resource changes and manual refresh update server totals while links open the matching list', async () => {
  current = { ...current, permissions: ['home:read', 'user:read'] }
  render(<HomePage />)
  expect(await screen.findByText('53')).toBeInTheDocument()
  providerList.mockResolvedValueOnce({ items: [{ id: 'u-2' }], total: 71 })
  act(() => subscribers.get('users')?.forEach((listener) => listener()))
  expect(await screen.findByText('71')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'admin.refresh' }))
  expect(await screen.findByText('53')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'adminOverview.openUsers' }))
  expect(navigate).toHaveBeenCalledWith('/administration/users')
})

test('revoking read permission hides its card and aborts pending work', () => {
  current = { ...current, permissions: ['home:read', 'user:read'] }
  providerList.mockImplementation(() => new Promise(() => undefined))
  const { rerender, unmount } = render(<HomePage />)
  const signal = providerList.mock.calls[0][2].signal as AbortSignal
  expect(signal.aborted).toBe(false)
  current = { ...current, permissions: ['home:read'] }
  rerender(<HomePage />)
  expect(screen.queryByRole('region', { name: 'adminOverview.users' })).not.toBeInTheDocument()
  expect(signal.aborted).toBe(true)
  expect(subscribers.get('users')?.size ?? 0).toBe(0)
  unmount()
})
