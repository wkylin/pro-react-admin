import type { BillingStatus, CustomerQuery, CustomerStatus, DashboardRange } from './model'

export interface DashboardQuery extends CustomerQuery {
  range: DashboardRange
  page: number
  pageSize: number
  customer?: string
}

const positiveInteger = (raw: string | null, fallback: number) => {
  const parsed = Number(raw)
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback
}

export function readDashboardQuery(params: URLSearchParams): DashboardQuery {
  const range = Number(params.get('range'))
  const status = params.get('status')
  const billing = params.get('billing')
  const joined = params.get('joined')
  const sort = params.get('sort')
  const pageSize = Number(params.get('pageSize'))
  return {
    range: range === 7 || range === 90 ? range : 30,
    search: params.get('search') ?? '',
    status: ['active', 'inactive', 'churned'].includes(status ?? '') ? (status as CustomerStatus) : undefined,
    billing: ['paid', 'pending', 'overdue', 'trial'].includes(billing ?? '') ? (billing as BillingStatus) : undefined,
    joined: joined === '7' || joined === '30' || joined === '90' ? joined : 'all',
    sort: sort === 'oldest' || sort === 'name' ? sort : 'newest',
    page: positiveInteger(params.get('page'), 1),
    pageSize: [8, 16, 32].includes(pageSize) ? pageSize : 8,
    customer: params.get('customer') || undefined,
  }
}
