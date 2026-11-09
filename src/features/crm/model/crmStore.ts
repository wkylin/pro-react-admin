import { createStore } from 'zustand/vanilla'
import type {
  CrmValidationCode,
  Customer,
  CustomerDraft,
  FollowUp,
  FollowUpDraft,
  FollowUpKind,
  Opportunity,
  OpportunityDraft,
  OpportunityStage,
  PipelineSummary,
} from './types'

export class CrmValidationError extends Error {
  constructor(public readonly code: CrmValidationCode) {
    super(code)
    this.name = 'CrmValidationError'
  }
}

export interface CrmState {
  customers: Customer[]
  followUps: FollowUp[]
  opportunities: Opportunity[]
  createCustomer: (draft: CustomerDraft) => Customer
  updateCustomer: (id: string, draft: CustomerDraft) => Customer
  addFollowUp: (draft: FollowUpDraft) => FollowUp
  createOpportunity: (draft: OpportunityDraft) => Opportunity
  advanceOpportunity: (id: string, expectedStage: OpportunityStage) => Opportunity
  loseOpportunity: (id: string, reason: string) => Opportunity
}

function text(value: string, code: CrmValidationCode, min: number, max: number): string {
  if (typeof value !== 'string') throw new CrmValidationError(code)
  const trimmed = value.trim()
  if (trimmed.length < min || trimmed.length > max) throw new CrmValidationError(code)
  return trimmed
}

function validateCustomer(draft: CustomerDraft): CustomerDraft {
  const company = text(draft.company, 'company', 2, 100)
  const contact = text(draft.contact, 'contact', 1, 80)
  const email = text(draft.email, 'email', 1, 120)
  const parts = email.split('@')
  if (parts.length !== 2) throw new CrmValidationError('email')
  const [local, domain] = parts
  const validLocal =
    local.length <= 64 && local.split('.').every((atom) => /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+$/.test(atom))
  const labels = domain.split('.')
  const validDomain =
    labels.length >= 2 &&
    labels.every((label) => label.length <= 63 && /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label))
  if (!validLocal || !validDomain) throw new CrmValidationError('email')
  const owner = text(draft.owner, 'owner', 1, 10)
  if (owner !== 'lin' && owner !== 'chen' && owner !== 'zhou') throw new CrmValidationError('owner')
  return { company, contact, email, owner }
}

function date(value: string): string {
  const normalized = text(value, 'date', 10, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized) || normalized.startsWith('0000')) throw new CrmValidationError('date')
  const parsed = new Date(`${normalized}T00:00:00.000Z`)
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== normalized)
    throw new CrmValidationError('date')
  return normalized
}

function amountInCents(value: OpportunityDraft['amount']): number {
  if (typeof value !== 'number' && typeof value !== 'string') throw new CrmValidationError('amount')
  const normalized = String(value).trim()
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) throw new CrmValidationError('amount')
  const [whole, fraction = ''] = normalized.split('.')
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
  if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 10_000_000_000) throw new CrmValidationError('amount')
  return cents
}

export function getPipelineSummary(opportunities: readonly Opportunity[]): PipelineSummary {
  return opportunities.reduce<PipelineSummary>(
    (summary, opportunity) => {
      if (opportunity.stage === 'won') summary.wonAmountCents += opportunity.amountCents
      else if (opportunity.stage !== 'lost') {
        summary.openCount += 1
        summary.openAmountCents += opportunity.amountCents
      }
      return summary
    },
    { openCount: 0, openAmountCents: 0, wonAmountCents: 0 }
  )
}

export function createCrmStore({ now = () => new Date() }: { now?: () => Date } = {}) {
  const seedTime = now().getTime()
  const seededAt = new Date(seedTime - 7 * 86_400_000).toISOString()
  const customers: Customer[] = [
    {
      id: 'customer-1',
      company: '云岫精工有限公司',
      contact: '叶知宁',
      email: 'yening@example.test',
      owner: 'lin',
      status: 'lead',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
    {
      id: 'customer-2',
      company: '澄原包装科技有限公司',
      contact: '程以安',
      email: 'chengyi@example.test',
      owner: 'chen',
      status: 'customer',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
    {
      id: 'customer-3',
      company: '禾汀冷链设备有限公司',
      contact: '沈书禾',
      email: 'shenshu@example.test',
      owner: 'zhou',
      status: 'lead',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
  ]
  const followUps: FollowUp[] = [
    {
      id: 'follow-up-1',
      customerId: 'customer-1',
      kind: 'meeting',
      content: '已完成产线需求访谈，准备设备试用方案。',
      createdAt: seededAt,
    },
  ]
  const closeOn = new Date(seedTime + 30 * 86_400_000).toISOString().slice(0, 10)
  const opportunities: Opportunity[] = [
    {
      id: 'opportunity-1',
      customerId: 'customer-1',
      title: '装配产线设备试用',
      amountCents: 3500000,
      expectedCloseOn: closeOn,
      stage: 'discovery',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
    {
      id: 'opportunity-2',
      customerId: 'customer-1',
      title: '检验工位扩建方案',
      amountCents: 6800000,
      expectedCloseOn: closeOn,
      stage: 'proposal',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
    {
      id: 'opportunity-3',
      customerId: 'customer-3',
      title: '区域冷链仓储升级',
      amountCents: 12500000,
      expectedCloseOn: closeOn,
      stage: 'negotiation',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
    {
      id: 'opportunity-4',
      customerId: 'customer-2',
      title: '包装设备年度服务',
      amountCents: 9600000,
      expectedCloseOn: closeOn,
      stage: 'won',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
    {
      id: 'opportunity-5',
      customerId: 'customer-3',
      title: '配送节点设备采购',
      amountCents: 4200000,
      expectedCloseOn: closeOn,
      stage: 'lost',
      lostReason: '客户本年度采购预算已调整。',
      createdAt: seededAt,
      updatedAt: seededAt,
    },
  ]
  let nextCustomerId = customers.length + 1
  let nextFollowUpId = followUps.length + 1
  let nextOpportunityId = opportunities.length + 1
  return createStore<CrmState>((set, get) => ({
    customers,
    followUps,
    opportunities,
    createCustomer: (draft) => {
      const fields = validateCustomer(draft)
      const timestamp = now().toISOString()
      const customer: Customer = {
        ...fields,
        id: `customer-${nextCustomerId}`,
        status: 'lead',
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      nextCustomerId += 1
      set((state) => ({ customers: [customer, ...state.customers] }))
      return customer
    },
    updateCustomer: (id, draft) => {
      const existing = get().customers.find((customer) => customer.id === id)
      if (!existing) throw new CrmValidationError('customerMissing')
      const fields = validateCustomer(draft)
      const customer: Customer = { ...existing, ...fields, updatedAt: now().toISOString() }
      set((state) => ({ customers: state.customers.map((item) => (item.id === id ? customer : item)) }))
      return customer
    },
    addFollowUp: (draft) => {
      const customerId = text(draft.customerId, 'customerMissing', 1, 100)
      const customer = get().customers.find((item) => item.id === customerId)
      if (!customer) throw new CrmValidationError('customerMissing')
      const kind = text(draft.kind, 'kind', 1, 20) as FollowUpKind
      if (!['call', 'email', 'meeting', 'note'].includes(kind)) throw new CrmValidationError('kind')
      const content = text(draft.content, 'content', 4, 1000)
      const nextFollowUpOn =
        draft.nextFollowUpOn === undefined || draft.nextFollowUpOn === '' ? undefined : date(draft.nextFollowUpOn)
      const timestamp = now().toISOString()
      const followUp: FollowUp = {
        id: `follow-up-${nextFollowUpId}`,
        customerId,
        kind,
        content,
        ...(nextFollowUpOn ? { nextFollowUpOn } : {}),
        createdAt: timestamp,
      }
      nextFollowUpId += 1
      set((state) => ({
        followUps: [followUp, ...state.followUps],
        customers: state.customers.map((item) =>
          item.id === customerId
            ? { ...item, ...(nextFollowUpOn ? { nextFollowUpOn } : {}), updatedAt: timestamp }
            : item
        ),
      }))
      return followUp
    },
    createOpportunity: (draft) => {
      const customerId = text(draft.customerId, 'customerMissing', 1, 100)
      if (!get().customers.some((customer) => customer.id === customerId))
        throw new CrmValidationError('customerMissing')
      const title = text(draft.title, 'title', 2, 100)
      const amountCents = amountInCents(draft.amount)
      const expectedCloseOn = date(draft.expectedCloseOn)
      const timestamp = now().toISOString()
      const opportunity: Opportunity = {
        id: `opportunity-${nextOpportunityId}`,
        customerId,
        title,
        amountCents,
        expectedCloseOn,
        stage: 'discovery',
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      nextOpportunityId += 1
      set((state) => ({ opportunities: [opportunity, ...state.opportunities] }))
      return opportunity
    },
    advanceOpportunity: (id, expectedStage) => {
      const opportunityId = text(id, 'opportunityMissing', 1, 100)
      const existing = get().opportunities.find((item) => item.id === opportunityId)
      if (!existing) throw new CrmValidationError('opportunityMissing')
      if (existing.stage !== expectedStage) throw new CrmValidationError('stage')
      const stage =
        expectedStage === 'discovery'
          ? 'proposal'
          : expectedStage === 'proposal'
            ? 'negotiation'
            : expectedStage === 'negotiation'
              ? 'won'
              : undefined
      if (!stage) throw new CrmValidationError('stage')
      if (!get().customers.some((customer) => customer.id === existing.customerId))
        throw new CrmValidationError('customerMissing')
      const timestamp = now().toISOString()
      const opportunity: Opportunity = { ...existing, stage, updatedAt: timestamp }
      set((state) => ({
        opportunities: state.opportunities.map((item) => (item.id === opportunityId ? opportunity : item)),
        customers:
          stage === 'won'
            ? state.customers.map((customer) =>
                customer.id === existing.customerId
                  ? { ...customer, status: 'customer', updatedAt: timestamp }
                  : customer
              )
            : state.customers,
      }))
      return opportunity
    },
    loseOpportunity: (id, reason) => {
      const opportunityId = text(id, 'opportunityMissing', 1, 100)
      const existing = get().opportunities.find((item) => item.id === opportunityId)
      if (!existing) throw new CrmValidationError('opportunityMissing')
      if (!['discovery', 'proposal', 'negotiation'].includes(existing.stage)) throw new CrmValidationError('stage')
      if (!get().customers.some((customer) => customer.id === existing.customerId))
        throw new CrmValidationError('customerMissing')
      const lostReason = text(reason, 'lostReason', 4, 500)
      const opportunity: Opportunity = { ...existing, stage: 'lost', lostReason, updatedAt: now().toISOString() }
      set((state) => ({
        opportunities: state.opportunities.map((item) => (item.id === opportunityId ? opportunity : item)),
      }))
      return opportunity
    },
  }))
}
