import {
  customers,
  customersToCsv,
  demoAsOf,
  getActivity,
  getMetrics,
  queryCustomers,
  type Customer,
  type DashboardRange,
} from './model'

describe('dashboard demo customers', () => {
  it('provides a fixed, fictional snapshot spanning the full 180-day window', () => {
    expect(demoAsOf).toBe('2026-11-09')
    expect(customers).toHaveLength(60)
    expect(new Set(customers.map((customer) => customer.id)).size).toBe(customers.length)
    expect(customers.every((customer) => customer.email.endsWith('@example.test'))).toBe(true)
    expect([...new Set(customers.map((customer) => customer.status))].sort()).toEqual(['active', 'churned', 'inactive'])
    expect([...new Set(customers.map((customer) => customer.billing))].sort()).toEqual([
      'overdue',
      'paid',
      'pending',
      'trial',
    ])
    expect([...new Set(customers.map((customer) => customer.plan))].sort()).toEqual(['enterprise', 'pro', 'starter'])
    expect(queryCustomers({ sort: 'oldest' })[0].joinedAt).toBe('2026-05-14')
    expect(queryCustomers({ sort: 'newest' })[0].joinedAt).toBe(demoAsOf)
  })

  it('combines trimmed case-insensitive search, status, billing and inclusive joined filters', () => {
    expect(queryCustomers({ search: '  NORA VALE ', status: 'inactive', billing: 'paid', joined: '7' })).toEqual([
      customers[5],
    ])
    expect(queryCustomers({ search: ' NORA.VALE@EXAMPLE.TEST ' })).toEqual([customers[5]])
    expect(queryCustomers({ search: 'nora vale', status: 'active' })).toEqual([])
    expect(queryCustomers({ search: 'nora vale', billing: 'pending' })).toEqual([])
    expect(queryCustomers({ search: '  ' })).toHaveLength(customers.length)
  })

  it.each([
    ['7', '2026-11-03', 6],
    ['30', '2026-10-11', 18],
    ['90', '2026-08-12', 39],
  ] as const)('includes both boundary dates for the last %s calendar days', (joined, firstDate, count) => {
    const records = queryCustomers({ joined, sort: 'oldest' })
    expect(records).toHaveLength(count)
    expect(records[0].joinedAt).toBe(firstDate)
    expect(records.at(-1)?.joinedAt).toBe(demoAsOf)
    expect(records.every((customer) => customer.joinedAt >= firstDate && customer.joinedAt <= demoAsOf)).toBe(true)
  })

  it('sorts deterministically without changing the source fixture', () => {
    const originalIds = customers.map((customer) => customer.id)
    const newest = queryCustomers({ sort: 'newest' })
    const oldest = queryCustomers({ sort: 'oldest' })
    const byName = queryCustomers({ sort: 'name' })
    expect(newest.map((customer) => customer.id)).toEqual(oldest.map((customer) => customer.id).reverse())
    expect(byName[0].name).toBe('Amira Aster')
    expect(byName.at(-1)?.name).toBe('Theo Wren')
    expect(customers.map((customer) => customer.id)).toEqual(originalIds)
    expect(queryCustomers({ joined: 'all' })).toHaveLength(customers.length)
  })
})

describe('dashboard activity and metrics', () => {
  it.each([
    [7, '2026-11-03', 6],
    [30, '2026-10-11', 18],
    [90, '2026-08-12', 39],
  ] as const)('returns one deterministic UTC point per day for %i days', (range, firstDate, newCustomers) => {
    const activity = getActivity(range)
    expect(activity).toHaveLength(range)
    expect(activity[0].date).toBe(firstDate)
    expect(activity.at(-1)?.date).toBe(demoAsOf)
    expect(new Set(activity.map((point) => point.date)).size).toBe(range)
    expect(activity.reduce((total, point) => total + point.newCustomers, 0)).toBe(newCustomers)
    expect(activity.at(-1)?.activeAccounts).toBe(customers.filter((customer) => customer.status === 'active').length)
    expect(getActivity(range)).toEqual(activity)
  })

  it('uses matching activity totals and prior equal-length periods for all metric comparisons', () => {
    const activity = getActivity(90)
    const current = activity.slice(-7)
    const previous = activity.slice(-14, -7)
    const sumRevenue = (points: typeof activity) => points.reduce((total, point) => total + point.revenue, 0)
    const sumNewCustomers = (points: typeof activity) => points.reduce((total, point) => total + point.newCustomers, 0)
    const currentActive = current.at(-1)!.activeAccounts
    const previousActive = previous.at(-1)!.activeAccounts
    const earlierActive = activity.at(-15)!.activeAccounts
    const growth = ((currentActive - previousActive) / previousActive) * 100
    const previousGrowth = ((previousActive - earlierActive) / earlierActive) * 100
    const metrics = getMetrics(7)

    expect(metrics.map((metric) => metric.key)).toEqual(['revenue', 'newCustomers', 'activeAccounts', 'growth'])
    expect(metrics[0].value).toBe(sumRevenue(current))
    expect(metrics[0].change).toBeCloseTo(((sumRevenue(current) - sumRevenue(previous)) / sumRevenue(previous)) * 100)
    expect(metrics[1]).toEqual({ key: 'newCustomers', value: 6, change: 50 })
    expect(metrics[1].value).toBe(sumNewCustomers(current))
    expect(metrics[2].value).toBe(currentActive)
    expect(metrics[2].change).toBeCloseTo(((currentActive - previousActive) / previousActive) * 100)
    expect(metrics[3].value).toBeCloseTo(growth)
    expect(metrics[3].change).toBeCloseTo(((growth - previousGrowth) / previousGrowth) * 100)
  })

  it('recognizes paid plans at the documented fixed daily USD rates from their join date', () => {
    const today = getActivity(7).at(-1)!
    const dailyRate = { starter: 1, pro: 3, enterprise: 9 }
    const expectedRevenue = customers
      .filter((customer) => customer.billing === 'paid')
      .reduce((total, customer) => total + dailyRate[customer.plan], 0)
    expect(today.revenue).toBe(expectedRevenue)
    expect(getActivity(7)[0].revenue).toBeLessThan(today.revenue)
  })

  it('returns finite metrics and an unavailable comparison when the prior active-growth baseline is zero', () => {
    const metrics = getMetrics(90)
    expect(metrics[3].change).toBeNull()
    for (const range of [7, 30, 90] as DashboardRange[]) {
      for (const metric of getMetrics(range)) {
        expect(Number.isFinite(metric.value)).toBe(true)
        expect(metric.change === null || Number.isFinite(metric.change)).toBe(true)
      }
    }
  })
})

describe('customersToCsv', () => {
  const headers = ['ID', 'Name', 'Email', 'Status', 'Billing', 'Plan', 'Joined']

  it('exports the exact supplied scope with a UTF-8 BOM, CRLF and the default column order', () => {
    const record = customers[0]
    expect(customersToCsv([record], headers)).toBe(
      `\uFEFFID,Name,Email,Status,Billing,Plan,Joined\r\n${[
        record.id,
        record.name,
        record.email,
        record.status,
        record.billing,
        record.plan,
        record.joinedAt,
      ].join(',')}\r\n`
    )
    expect(customersToCsv([], headers)).toBe('\uFEFFID,Name,Email,Status,Billing,Plan,Joined\r\n')
  })

  it('escapes commas, doubled quotes and embedded CR/LF in headers and localized rows', () => {
    expect(
      customersToCsv([customers[0]], ['客户,名称', '备注"内容'], () => ['Vale, "Avery"', 'First line\r\nSecond line'])
    ).toBe('\uFEFF"客户,名称","备注""内容"\r\n"Vale, ""Avery""","First line\r\nSecond line"\r\n')
  })

  it.each(['=SUM(1,2)', '+1+2', '-1+2', '@SUM(1)', ' \t=HYPERLINK("https://example.test")', '\r\n +1'])(
    'neutralizes spreadsheet formulas even after leading whitespace: %j',
    (value) => {
      const record: Customer = { ...customers[0], name: value }
      const csv = customersToCsv([record], [value], (customer) => [customer.name])
      const safeValue = `'${value}`
      const escaped = /[",\r\n]/.test(safeValue) ? `"${safeValue.replaceAll('"', '""')}"` : safeValue
      expect(csv).toBe(`\uFEFF${escaped}\r\n${escaped}\r\n`)
    }
  )
})
