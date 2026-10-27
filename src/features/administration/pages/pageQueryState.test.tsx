import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import type { ListQuery } from '@platform/data/provider'

const t = (key: string) => key
const provider = { subscribe: () => () => undefined }
let query: ListQuery = { page: 1, pageSize: 10 }
const list = {
  data: { items: [], total: 0 },
  loading: false,
  error: undefined,
  reload: jest.fn(),
  search: jest.fn(),
  setQuery: jest.fn(),
  get query() {
    return query
  },
}

jest.doMock('react-i18next', () => ({ useTranslation: () => ({ t }) }))
jest.doMock('@platform/auth/hooks/usePermission', () => ({
  useCheckPermission: () => ({ hasPermission: false }),
}))
jest.doMock('@platform/auth/model/session', () => ({ readEnterpriseSession: () => null }))
jest.doMock('@ant-design/icons', () => ({ PlusOutlined: () => null }))
jest.doMock('../model/AdministrationProvider', () => ({
  useAdministration: () => ({ provider, demo: true, access: {} }),
}))
jest.doMock('../model/useResourceList', () => ({ useResourceList: () => list }))
jest.doMock('./AccessProposalModal', () => ({ __esModule: true, default: () => null }))
jest.doMock('./ResourceWorkspace', () => ({
  __esModule: true,
  default: ({ searchValue, children }: { searchValue?: string; children: ReactNode }) => (
    <div>
      <input aria-label="workspace-search" readOnly value={searchValue ?? ''} />
      {children}
    </div>
  ),
}))
jest.doMock('antd', () => {
  const actual = jest.requireActual('antd')
  return {
    ...actual,
    App: { useApp: () => ({ message: { success: jest.fn(), error: jest.fn() } }) },
    Grid: { useBreakpoint: () => ({ md: true }) },
    Table: ({ columns }: { columns: { dataIndex?: string; sortOrder?: string }[] }) => (
      <div
        data-testid="table"
        data-name-sort-order={columns.find((column) => column.dataIndex === 'name')?.sortOrder}
      />
    ),
  }
})

const TenantsPage = require('./TenantsPage').default as typeof import('./TenantsPage').default
const UsersPage = require('./UsersPage').default as typeof import('./UsersPage').default

test('tenant search input reflects URL restored query', () => {
  query = { page: 1, pageSize: 10, search: 'acme' }
  render(<TenantsPage />)
  expect(screen.getByRole('textbox', { name: 'workspace-search' })).toHaveValue('acme')
})

test('user table reflects URL restored sort order', () => {
  query = { page: 1, pageSize: 10, sort: 'name', order: 'desc' }
  render(<UsersPage />)
  expect(screen.getByTestId('table')).toHaveAttribute('data-name-sort-order', 'descend')
})
