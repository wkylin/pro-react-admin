import { createElement, Fragment } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { createCrmStore, CrmValidationError, getPipelineSummary } from './crmStore'
import { CrmProvider, useCrmStore } from './CrmProvider'
import type { CrmValidationCode, CustomerDraft, OpportunityDraft, OpportunityStage } from './types'

const customerDraft: CustomerDraft = {
  company: '岚桥设备有限公司',
  contact: '顾禾',
  email: 'guhe@example.test',
  owner: 'lin',
}
const clock = () => new Date('2026-11-09T08:00:00.000Z')

function expectInvalid(action: () => unknown, code: CrmValidationCode) {
  try {
    action()
    throw new Error('Expected CRM validation to reject the action')
  } catch (error) {
    expect(error).toBeInstanceOf(CrmValidationError)
    expect(error).toMatchObject({ code })
  }
}

test('creates a trimmed lead and edits its details while preserving identity and creation time', () => {
  let timestamp = '2026-11-09T08:00:00.000Z'
  const store = createCrmStore({ now: () => new Date(timestamp) })
  const draft = {
    company: '  岚桥设备有限公司  ',
    contact: '  顾禾  ',
    email: '  guhe@example.test  ',
    owner: 'lin' as const,
  }
  const customer = store.getState().createCustomer(draft)
  expect(customer).toMatchObject({
    company: '岚桥设备有限公司',
    contact: '顾禾',
    email: 'guhe@example.test',
    owner: 'lin',
    status: 'lead',
    createdAt: timestamp,
    updatedAt: timestamp,
  })

  timestamp = '2026-11-09T09:00:00.000Z'
  const updated = store
    .getState()
    .updateCustomer(customer.id, { ...draft, company: '岚桥智能设备有限公司', owner: 'chen' })
  expect(updated).toMatchObject({
    id: customer.id,
    company: '岚桥智能设备有限公司',
    owner: 'chen',
    status: 'lead',
    createdAt: '2026-11-09T08:00:00.000Z',
    updatedAt: timestamp,
  })
  expect(store.getState().customers.find((item) => item.id === customer.id)).toEqual(updated)
})

test.each<[Partial<CustomerDraft>, CrmValidationCode]>([
  [{ company: ' ' }, 'company'],
  [{ company: 'x' }, 'company'],
  [{ company: 'x'.repeat(101) }, 'company'],
  [{ contact: ' ' }, 'contact'],
  [{ contact: 'x'.repeat(81) }, 'contact'],
  [{ email: 'missing-domain' }, 'email'],
  [{ email: 'two@@example.test' }, 'email'],
  [{ email: 'a@b..example' }, 'email'],
  [{ email: 'a,b@example.test' }, 'email'],
  [{ email: 'a..b@example.test' }, 'email'],
  [{ email: 'a@-example.test' }, 'email'],
  [{ email: 'a@example-.test' }, 'email'],
  [{ email: 'a@example_.test' }, 'email'],
  [{ email: `a@${'x'.repeat(64)}.test` }, 'email'],
  [{ email: `${'a'.repeat(65)}@example.test` }, 'email'],
  [{ email: `user@${'x'.repeat(111)}.test` }, 'email'],
  [{ owner: 'other' as CustomerDraft['owner'] }, 'owner'],
])('rejects invalid customer details atomically: %j', (invalid, code) => {
  const store = createCrmStore({ now: clock })
  const before = store.getState()
  expectInvalid(() => before.createCustomer({ ...customerDraft, ...invalid }), code)
  expect(store.getState()).toBe(before)
  expectInvalid(() => before.updateCustomer(before.customers[0].id, { ...customerDraft, ...invalid }), code)
  expect(store.getState()).toBe(before)
  expectInvalid(() => before.updateCustomer('missing', customerDraft), 'customerMissing')
  expect(store.getState()).toBe(before)
})

test('accepts an email dot-atom local part with an internal-hyphen domain label', () => {
  const store = createCrmStore({ now: clock })
  const customer = store.getState().createCustomer({ ...customerDraft, email: '  dev.team+crm@example-demo.test  ' })
  expect(customer.email).toBe('dev.team+crm@example-demo.test')
})

test('records a related follow-up, updates its customer schedule and keeps earlier records intact', () => {
  const store = createCrmStore({ now: clock })
  const customer = store.getState().createCustomer(customerDraft)
  const followUp = store.getState().addFollowUp({
    customerId: ` ${customer.id} `,
    kind: 'call',
    content: '  讨论设备试用安排  ',
    nextFollowUpOn: ' 2028-02-29 ',
  })
  expect(followUp).toMatchObject({
    customerId: customer.id,
    kind: 'call',
    content: '讨论设备试用安排',
    nextFollowUpOn: '2028-02-29',
    createdAt: '2026-11-09T08:00:00.000Z',
  })
  expect(store.getState().followUps[0]).toEqual(followUp)
  expect(store.getState().customers.find((item) => item.id === customer.id)).toMatchObject({
    nextFollowUpOn: '2028-02-29',
  })
  store.getState().addFollowUp({ customerId: customer.id, kind: 'note', content: '已经寄出试用资料' })
  expect(store.getState().customers.find((item) => item.id === customer.id)).toMatchObject({
    nextFollowUpOn: '2028-02-29',
  })
  expect(store.getState().followUps[1]).toEqual(followUp)
})

test.each([
  ['2026-02-29', 'date'],
  ['2026-04-31', 'date'],
  ['2026-13-01', 'date'],
  ['2026-1-01', 'date'],
  ['2026-01-01T00:00:00Z', 'date'],
  ['0000-01-01', 'date'],
])('rejects invalid follow-up calendar date %s without changing any record', (nextFollowUpOn) => {
  const store = createCrmStore({ now: clock })
  const before = store.getState()
  expectInvalid(
    () =>
      before.addFollowUp({
        customerId: before.customers[0].id,
        kind: 'meeting',
        content: '讨论采购计划',
        nextFollowUpOn,
      }),
    'date'
  )
  expect(store.getState()).toBe(before)
})

test('rejects unknown follow-up relationships, invalid kinds and content atomically', () => {
  const store = createCrmStore({ now: clock })
  const before = store.getState()
  const draft = { customerId: before.customers[0].id, kind: 'email' as const, content: '确认试用安排' }
  expectInvalid(() => before.addFollowUp({ ...draft, customerId: 'missing' }), 'customerMissing')
  expectInvalid(() => before.addFollowUp({ ...draft, kind: 'sms' as 'email' }), 'kind')
  expectInvalid(() => before.addFollowUp({ ...draft, content: ' 短 ' }), 'content')
  expectInvalid(() => before.addFollowUp({ ...draft, content: 'x'.repeat(1001) }), 'content')
  expect(store.getState()).toBe(before)
})

test.each<[OpportunityDraft['amount'], number]>([
  [0.01, 1],
  [19.99, 1999],
  [' 123456.78 ', 12345678],
  ['0.10', 10],
  [100000000, 10000000000],
])('creates an associated discovery opportunity with exact cents for %s yuan', (amount, amountCents) => {
  const store = createCrmStore({ now: clock })
  const customerId = store.getState().customers[0].id
  const opportunity = store.getState().createOpportunity({
    customerId: ` ${customerId} `,
    title: '  产线试用项目  ',
    amount,
    expectedCloseOn: ' 2028-02-29 ',
  })
  expect(opportunity).toMatchObject({
    customerId,
    title: '产线试用项目',
    amountCents,
    expectedCloseOn: '2028-02-29',
    stage: 'discovery',
    createdAt: '2026-11-09T08:00:00.000Z',
    updatedAt: '2026-11-09T08:00:00.000Z',
  })
  expect(opportunity).not.toHaveProperty('amount')
  expect(store.getState().opportunities[0]).toEqual(opportunity)
})

test.each<OpportunityDraft['amount']>([
  0,
  -1,
  1.001,
  100000000.01,
  NaN,
  Infinity,
  '',
  ' ',
  '1.000',
  '1e3',
  '1,000',
  '12.3oops',
  'NaN',
  '100000000.01',
])('rejects invalid amount %s before any state change', (amount) => {
  const store = createCrmStore({ now: clock })
  const before = store.getState()
  expectInvalid(
    () =>
      before.createOpportunity({
        customerId: before.customers[0].id,
        title: '产线试用项目',
        amount,
        expectedCloseOn: '2026-12-01',
      }),
    'amount'
  )
  expect(store.getState()).toBe(before)
})

test('rejects unknown opportunity relationships, malformed titles and dates atomically', () => {
  const store = createCrmStore({ now: clock })
  const before = store.getState()
  const draft = {
    customerId: before.customers[0].id,
    title: '产线试用项目',
    amount: 100,
    expectedCloseOn: '2026-12-01',
  }
  expectInvalid(() => before.createOpportunity({ ...draft, customerId: 'missing' }), 'customerMissing')
  expectInvalid(() => before.createOpportunity({ ...draft, title: ' 短 ' }), 'title')
  expectInvalid(() => before.createOpportunity({ ...draft, title: 'x'.repeat(101) }), 'title')
  expectInvalid(() => before.createOpportunity({ ...draft, expectedCloseOn: '2026-02-29' }), 'date')
  expectInvalid(() => before.createOpportunity({ ...draft, expectedCloseOn: '' }), 'date')
  expect(store.getState()).toBe(before)
})

test('advances one stage at a time and atomically marks its customer as won without changing other customers', () => {
  let timestamp = '2026-11-09T08:00:00.000Z'
  const store = createCrmStore({ now: () => new Date(timestamp) })
  const customer = store.getState().createCustomer(customerDraft)
  const otherCustomers = store.getState().customers.filter((item) => item.id !== customer.id)
  const opportunity = store.getState().createOpportunity({
    customerId: customer.id,
    title: '设备试用项目',
    amount: 199.99,
    expectedCloseOn: '2026-12-01',
  })
  expect(store.getState().advanceOpportunity(opportunity.id, 'discovery').stage).toBe('proposal')
  expect(store.getState().customers.find((item) => item.id === customer.id)?.status).toBe('lead')
  expect(store.getState().advanceOpportunity(opportunity.id, 'proposal').stage).toBe('negotiation')
  expect(store.getState().customers.find((item) => item.id === customer.id)?.status).toBe('lead')
  timestamp = '2026-11-09T10:00:00.000Z'
  const seenStatuses: string[] = []
  const unsubscribe = store.subscribe((state) => {
    if (state.opportunities.find((item) => item.id === opportunity.id)?.stage === 'won') {
      seenStatuses.push(state.customers.find((item) => item.id === customer.id)?.status ?? 'missing')
    }
  })
  const won = store.getState().advanceOpportunity(opportunity.id, 'negotiation')
  unsubscribe()
  expect(won).toMatchObject({ ...opportunity, stage: 'won', updatedAt: timestamp })
  expect(seenStatuses).toEqual(['customer'])
  expect(store.getState().customers.find((item) => item.id === customer.id)).toMatchObject({
    status: 'customer',
    updatedAt: timestamp,
  })
  expect(store.getState().customers.filter((item) => item.id !== customer.id)).toEqual(otherCustomers)
  const forgedDraft = { ...customerDraft, status: 'lead' }
  expect(store.getState().updateCustomer(customer.id, forgedDraft).status).toBe('customer')
  const terminal = store.getState()
  expectInvalid(() => terminal.advanceOpportunity(opportunity.id, 'won'), 'stage')
  expectInvalid(() => terminal.loseOpportunity(opportunity.id, '客户计划发生调整'), 'stage')
  expect(store.getState()).toBe(terminal)
})

test.each([0, 1, 2])('can lose an opportunity after %i advances and cannot change the terminal record', (advances) => {
  const store = createCrmStore({ now: clock })
  const customer = store.getState().createCustomer(customerDraft)
  const opportunity = store
    .getState()
    .createOpportunity({ customerId: customer.id, title: '设备试用项目', amount: 100, expectedCloseOn: '2026-12-01' })
  const stages: OpportunityStage[] = ['discovery', 'proposal', 'negotiation']
  for (let index = 0; index < advances; index += 1) store.getState().advanceOpportunity(opportunity.id, stages[index])
  const lost = store.getState().loseOpportunity(opportunity.id, '  客户采购计划推迟  ')
  expect(lost).toMatchObject({ ...opportunity, stage: 'lost', lostReason: '客户采购计划推迟' })
  expect(store.getState().customers.find((item) => item.id === customer.id)?.status).toBe('lead')
  const terminal = store.getState()
  expectInvalid(() => terminal.advanceOpportunity(opportunity.id, 'lost'), 'stage')
  expectInvalid(() => terminal.loseOpportunity(opportunity.id, '第二次提交相同请求'), 'stage')
  expect(store.getState()).toBe(terminal)
})

test('rejects missing opportunities and invalid loss reasons before changing state', () => {
  const store = createCrmStore({ now: clock })
  const before = store.getState()
  const open = before.opportunities.find((item) => item.stage === 'discovery')!
  expectInvalid(() => before.advanceOpportunity('missing', 'discovery'), 'opportunityMissing')
  expectInvalid(() => before.loseOpportunity('missing', '客户采购计划推迟'), 'opportunityMissing')
  for (const reason of ['', ' 短 ', 'x'.repeat(501)])
    expectInvalid(() => before.loseOpportunity(open.id, reason), 'lostReason')
  expect(store.getState()).toBe(before)
})

test('summarizes exact cents, excludes closed amounts and supports customer-scoped summaries', () => {
  const store = createCrmStore({ now: clock })
  expect(getPipelineSummary(store.getState().opportunities)).toEqual({
    openCount: 3,
    openAmountCents: 22800000,
    wonAmountCents: 9600000,
  })
  expect(getPipelineSummary([])).toEqual({ openCount: 0, openAmountCents: 0, wonAmountCents: 0 })
  const customer = store.getState().createCustomer(customerDraft)
  const create = (amount: string) =>
    store
      .getState()
      .createOpportunity({ customerId: customer.id, title: '设备试用项目', amount, expectedCloseOn: '2026-12-01' })
  const first = create('0.10')
  const second = create('0.20')
  create('0.30')
  const summary = () =>
    getPipelineSummary(store.getState().opportunities.filter((item) => item.customerId === customer.id))
  expect(summary()).toEqual({ openCount: 3, openAmountCents: 60, wonAmountCents: 0 })
  store.getState().advanceOpportunity(first.id, 'discovery')
  store.getState().advanceOpportunity(first.id, 'proposal')
  store.getState().advanceOpportunity(first.id, 'negotiation')
  store.getState().loseOpportunity(second.id, '客户采购计划推迟')
  expect(summary()).toEqual({ openCount: 1, openAmountCents: 30, wonAmountCents: 10 })
  expect(store.getState().customers.find((item) => item.id === customer.id)?.status).toBe('customer')
  const before = store.getState()
  expectInvalid(() => before.advanceOpportunity(first.id, 'negotiation'), 'stage')
  expectInvalid(() => before.loseOpportunity(second.id, '重复提交丢单原因'), 'stage')
  expect(summary()).toEqual({ openCount: 1, openAmountCents: 30, wonAmountCents: 10 })
  expect(store.getState()).toBe(before)
})

test('creates deterministic clock-relative seeds and isolates every store instance', () => {
  const first = createCrmStore({ now: clock })
  const second = createCrmStore({ now: clock })
  const seed = second.getState()
  expect(first.getState().customers).toEqual(seed.customers)
  expect(first.getState().customers).not.toBe(seed.customers)
  expect(seed.customers.every((customer) => customer.createdAt < clock().toISOString())).toBe(true)
  expect(seed.followUps.every((followUp) => followUp.createdAt < clock().toISOString())).toBe(true)
  expect(seed.opportunities.every((opportunity) => opportunity.createdAt < clock().toISOString())).toBe(true)
  expect(seed.opportunities.map((opportunity) => opportunity.stage)).toEqual([
    'discovery',
    'proposal',
    'negotiation',
    'won',
    'lost',
  ])
  expect(seed.followUps.every((item) => seed.customers.some((customer) => customer.id === item.customerId))).toBe(true)
  expect(seed.opportunities.every((item) => seed.customers.some((customer) => customer.id === item.customerId))).toBe(
    true
  )
  const added = first.getState().createCustomer(customerDraft)
  first.getState().updateCustomer(seed.customers[0].id, { ...customerDraft, company: '更新后的演示公司' })
  first.getState().addFollowUp({ customerId: added.id, kind: 'email', content: '已确认设备试用计划' })
  first
    .getState()
    .createOpportunity({ customerId: added.id, title: '设备试用项目', amount: 100, expectedCloseOn: '2026-12-01' })
  first.getState().advanceOpportunity('opportunity-3', 'negotiation')
  expect(second.getState()).toBe(seed)
  const reset = createCrmStore({ now: clock }).getState()
  expect(reset.customers).toEqual(seed.customers)
  expect(reset.followUps).toEqual(seed.followUps)
  expect(reset.opportunities).toEqual(seed.opportunities)
})

test('shares one session within a Provider, preserves it on render and resets it after unmount', () => {
  function CustomerCount({ name }: { name: string }) {
    const count = useCrmStore((state) => state.customers.length)
    const create = useCrmStore((state) => state.createCustomer)
    return createElement('button', { onClick: () => create(customerDraft) }, `${name}:${count}`)
  }
  const tree = () =>
    createElement(
      Fragment,
      null,
      createElement(
        CrmProvider,
        null,
        createElement(CustomerCount, { name: 'A' }),
        createElement(CustomerCount, { name: 'Shared' })
      ),
      createElement(CrmProvider, null, createElement(CustomerCount, { name: 'B' }))
    )
  const view = render(tree())
  fireEvent.click(screen.getByRole('button', { name: 'A:3' }))
  expect(screen.getByRole('button', { name: 'A:4' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Shared:4' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'B:3' })).toBeVisible()
  view.rerender(tree())
  expect(screen.getByRole('button', { name: 'A:4' })).toBeVisible()
  view.unmount()
  render(tree())
  expect(screen.getByRole('button', { name: 'A:3' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Shared:3' })).toBeVisible()
})

test('rejects a replayed stage action or stale expected stage without advancing or changing totals', () => {
  const store = createCrmStore({ now: clock })
  const customer = store.getState().createCustomer(customerDraft)
  const opportunity = store
    .getState()
    .createOpportunity({ customerId: customer.id, title: '设备试用项目', amount: 10.01, expectedCloseOn: '2026-12-01' })
  const submit = () => store.getState().advanceOpportunity(opportunity.id, 'discovery')
  expect(submit().stage).toBe('proposal')
  const before = store.getState()
  const summary = getPipelineSummary(before.opportunities)
  expectInvalid(submit, 'stage')
  expectInvalid(() => before.advanceOpportunity(opportunity.id, 'negotiation'), 'stage')
  expect(store.getState()).toBe(before)
  expect(store.getState().opportunities.find((item) => item.id === opportunity.id)?.stage).toBe('proposal')
  expect(getPipelineSummary(store.getState().opportunities)).toEqual(summary)
})
