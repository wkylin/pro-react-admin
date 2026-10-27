import { render, screen, waitFor } from '@testing-library/react'
import type { UserPermission } from '@platform/auth/model/permission'

const navigate = jest.fn()
const accessList = jest.fn()
const providerList = jest.fn()
const subscribe = jest.fn(() => () => undefined)
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
  current = {
    userId: 'u-1',
    username: 'Admin',
    roles: [],
    permissions: ['home:read', 'user:read', 'role:read', 'access:read', 'access:approve', 'audit:read'],
    routes: ['*'],
  }
})

test('workspace shows live pending approvals and recent audit entries', async () => {
  accessList.mockResolvedValue({ items: [{ id: 'request-1' }], total: 2 })
  providerList.mockResolvedValue({
    items: [
      {
        id: 'audit-1',
        actor: 'Admin',
        action: 'update',
        resource: 'users',
        recordId: 'u-2',
        at: '2026-10-27T08:00:00Z',
      },
    ],
    total: 1,
  })
  render(<HomePage />)

  expect(await screen.findByText('2')).toBeInTheDocument()
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
  expect(providerList).not.toHaveBeenCalled()
})
