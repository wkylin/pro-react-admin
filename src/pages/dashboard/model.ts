export type CustomerStatus = 'active' | 'inactive' | 'churned'
export type BillingStatus = 'paid' | 'pending' | 'overdue' | 'trial'
export type CustomerPlan = 'starter' | 'pro' | 'enterprise'

export interface Customer {
  id: string
  name: string
  email: string
  status: CustomerStatus
  billing: BillingStatus
  plan: CustomerPlan
  joinedAt: string
}

/** Fixed UTC snapshot: the demo never changes with the viewer's clock or time zone. */
export const demoAsOf: string = '2026-11-09'

const dayMilliseconds = 24 * 60 * 60 * 1000
const snapshotTimestamp = Date.parse(`${demoAsOf}T00:00:00.000Z`)

function dateBeforeSnapshot(days: number): string {
  return new Date(snapshotTimestamp - days * dayMilliseconds).toISOString().slice(0, 10)
}

const firstNames = [
  'Avery',
  'Maya',
  'Jonah',
  'Elena',
  'Rowan',
  'Nora',
  'Silas',
  'Amira',
  'Theo',
  'Lina',
  'Elliot',
  'Cleo',
]
const lastNames = ['Vale', 'Mercer', 'Aster', 'Hale', 'Wren']
const statuses: CustomerStatus[] = [
  'active',
  'active',
  'active',
  'active',
  'active',
  'inactive',
  'active',
  'churned',
  'inactive',
  'active',
]
const billings: BillingStatus[] = ['paid', 'paid', 'pending', 'paid', 'trial', 'paid', 'overdue', 'paid']
const plans: CustomerPlan[] = ['starter', 'pro', 'enterprise']
const joinedDayOffsets = [
  0, 1, 2, 3, 4, 6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 25, 27, 29, 30, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65,
  68, 71, 74, 77, 80, 83, 86, 89, 90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146, 150, 155, 160,
  166, 172, 179,
]

/** Fictional identities use a reserved email domain and cover the last 180 UTC calendar days. */
export const customers: Customer[] = joinedDayOffsets.map((offset, index) => {
  const firstName = firstNames[index % firstNames.length]
  const lastName = lastNames[Math.floor(index / firstNames.length)]
  return {
    id: `customer-${String(index + 1).padStart(3, '0')}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}@example.test`.toLowerCase(),
    status: statuses[index % statuses.length],
    billing: billings[index % billings.length],
    plan: plans[index % plans.length],
    joinedAt: dateBeforeSnapshot(offset),
  }
})

export type DashboardRange = 7 | 30 | 90

export interface ActivityPoint {
  date: string
  activeAccounts: number
  newCustomers: number
  revenue: number
}

/*
 * Demo reconstruction, not an invoice ledger or historical lifecycle:
 * current status and billing snapshots are carried back to each customer's join date.
 * A paid plan recognizes USD 1 / 3 / 9 per calendar day (starter / pro / enterprise),
 * equivalent to USD 30 / 90 / 270 over a fixed 30-day demo billing month.
 * Pending, overdue and trial accounts recognize no revenue. Active accounts count
 * the current active-status customers who had already joined by the given day.
 */
const dailyPlanRevenue: Record<CustomerPlan, number> = { starter: 1, pro: 3, enterprise: 9 }

function activityOn(date: string): ActivityPoint {
  const point: ActivityPoint = { date, activeAccounts: 0, newCustomers: 0, revenue: 0 }
  for (const customer of customers) {
    if (customer.joinedAt > date) continue
    if (customer.status === 'active') point.activeAccounts += 1
    if (customer.joinedAt === date) point.newCustomers += 1
    if (customer.billing === 'paid') point.revenue += dailyPlanRevenue[customer.plan]
  }
  return point
}

function activityForPeriod(range: DashboardRange, daysBeforeEnd = 0): ActivityPoint[] {
  return Array.from({ length: range }, (_, index) => activityOn(dateBeforeSnapshot(daysBeforeEnd + range - 1 - index)))
}

/** Ascending, inclusive UTC days ending on demoAsOf; 7 means today and the preceding six days. */
export function getActivity(range: DashboardRange): ActivityPoint[] {
  return activityForPeriod(range)
}

export interface DashboardMetric {
  key: 'revenue' | 'newCustomers' | 'activeAccounts' | 'growth'
  value: number
  change: number | null
}

function periodMetrics(range: DashboardRange, daysBeforeEnd = 0): number[] {
  const activity = activityForPeriod(range, daysBeforeEnd)
  const activeAccounts = activity.at(-1)!.activeAccounts
  const baselineActive = activityOn(dateBeforeSnapshot(daysBeforeEnd + range)).activeAccounts
  // No starting accounts means no defined growth denominator; this demo displays 0%.
  const growth = baselineActive === 0 ? 0 : ((activeAccounts - baselineActive) / baselineActive) * 100
  return [
    activity.reduce((total, point) => total + point.revenue, 0),
    activity.reduce((total, point) => total + point.newCustomers, 0),
    activeAccounts,
    growth,
  ]
}

/**
 * Compare adjacent equal-length periods. Values use USD, customer counts, an end-of-period
 * active count, and active-account growth %. Every change is a relative percentage change,
 * including the growth-rate comparison; a zero prior value returns null (unavailable).
 */
export function getMetrics(range: DashboardRange): DashboardMetric[] {
  const current = periodMetrics(range)
  const previous = periodMetrics(range, range)
  const keys: DashboardMetric['key'][] = ['revenue', 'newCustomers', 'activeAccounts', 'growth']
  return keys.map((key, index) => ({
    key,
    value: current[index],
    change: previous[index] === 0 ? null : ((current[index] - previous[index]) / previous[index]) * 100,
  }))
}

export interface CustomerQuery {
  search?: string
  status?: CustomerStatus
  billing?: BillingStatus
  joined?: 'all' | '7' | '30' | '90'
  sort?: 'newest' | 'oldest' | 'name'
}

export function queryCustomers(query: CustomerQuery): Customer[] {
  const search = query.search?.trim().toLowerCase() ?? ''
  const firstDate = !query.joined || query.joined === 'all' ? null : dateBeforeSnapshot(Number(query.joined) - 1)
  return customers
    .filter(
      (customer) =>
        (!search || customer.name.toLowerCase().includes(search) || customer.email.toLowerCase().includes(search)) &&
        (!query.status || customer.status === query.status) &&
        (!query.billing || customer.billing === query.billing) &&
        (!firstDate || (customer.joinedAt >= firstDate && customer.joinedAt <= demoAsOf))
    )
    .sort((left, right) => {
      const order =
        query.sort === 'name'
          ? left.name.localeCompare(right.name, 'en')
          : query.sort === 'oldest'
            ? left.joinedAt.localeCompare(right.joinedAt)
            : right.joinedAt.localeCompare(left.joinedAt)
      return order || left.id.localeCompare(right.id)
    })
}

function csvCell(value: string): string {
  // Prefix before CSV quoting so spreadsheet applications cannot execute a cell formula.
  const safeValue = /^\s*[=+\-@]/u.test(value) ? `'${value}` : value
  return /[",\r\n]/.test(safeValue) ? `"${safeValue.replaceAll('"', '""')}"` : safeValue
}

export function customersToCsv(
  records: Customer[],
  headers: string[],
  rowLabels?: (customer: Customer) => string[]
): string {
  const rows = records.map((customer) =>
    rowLabels
      ? rowLabels(customer)
      : [
          customer.id,
          customer.name,
          customer.email,
          customer.status,
          customer.billing,
          customer.plan,
          customer.joinedAt,
        ]
  )
  return `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`
}
