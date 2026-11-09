import { readDashboardQuery } from './query'

describe('dashboard URL state', () => {
  it('restores valid deep link filters and pagination', () => {
    expect(
      readDashboardQuery(
        new URLSearchParams(
          'range=90&search=Chen&status=active&billing=paid&joined=30&sort=name&page=2&pageSize=16&customer=C001'
        )
      )
    ).toEqual({
      range: 90,
      search: 'Chen',
      status: 'active',
      billing: 'paid',
      joined: '30',
      sort: 'name',
      page: 2,
      pageSize: 16,
      customer: 'C001',
    })
  })

  it('uses safe defaults for unknown filters and invalid numeric state', () => {
    const query = readDashboardQuery(
      new URLSearchParams(
        'range=10&status=invalid&billing=invalid&joined=-1&sort=invalid&page=Infinity&pageSize=100000'
      )
    )
    expect(query).toMatchObject({
      range: 30,
      status: undefined,
      billing: undefined,
      joined: 'all',
      sort: 'newest',
      page: 1,
      pageSize: 8,
    })
    for (const page of ['-1', '0', '1.5', '9007199254740992', 'oops']) {
      expect(readDashboardQuery(new URLSearchParams({ page })).page).toBe(1)
    }
  })
})
