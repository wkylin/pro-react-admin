import { lazy } from 'react'
import type { RouteNode } from '@platform/navigation/routes'

const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const CustomerDetailPage = lazy(() => import('./pages/CustomerDetailPage'))
const OpportunitiesPage = lazy(() => import('./pages/OpportunitiesPage'))

export const crmRoutes: RouteNode[] = [
  { path: 'patterns/crm', name: '客户工作区', i18nKey: 'crm.customersTitle', element: <CustomersPage /> },
  {
    path: 'patterns/crm/customers/:id',
    name: '客户详情',
    i18nKey: 'crm.customerDetailTitle',
    element: <CustomerDetailPage />,
  },
  {
    path: 'patterns/crm/opportunities',
    name: '商机工作区',
    i18nKey: 'crm.opportunitiesTitle',
    element: <OpportunitiesPage />,
  },
]
