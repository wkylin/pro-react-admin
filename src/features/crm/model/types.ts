export type Owner = 'lin' | 'chen' | 'zhou'
export type CustomerStatus = 'lead' | 'customer'
export type FollowUpKind = 'call' | 'email' | 'meeting' | 'note'
export type OpportunityStage = 'discovery' | 'proposal' | 'negotiation' | 'won' | 'lost'

export interface CustomerDraft {
  company: string
  contact: string
  email: string
  owner: Owner
}

export interface Customer extends CustomerDraft {
  id: string
  status: CustomerStatus
  nextFollowUpOn?: string
  createdAt: string
  updatedAt: string
}

export interface FollowUpDraft {
  customerId: string
  kind: FollowUpKind
  content: string
  nextFollowUpOn?: string
}

export interface FollowUp extends FollowUpDraft {
  id: string
  createdAt: string
}

export interface OpportunityDraft {
  customerId: string
  title: string
  amount: number | string
  expectedCloseOn: string
}

export interface Opportunity extends Omit<OpportunityDraft, 'amount'> {
  id: string
  amountCents: number
  stage: OpportunityStage
  lostReason?: string
  createdAt: string
  updatedAt: string
}

export interface PipelineSummary {
  openCount: number
  openAmountCents: number
  wonAmountCents: number
}

export type CrmValidationCode =
  | 'customerMissing'
  | 'opportunityMissing'
  | 'company'
  | 'contact'
  | 'email'
  | 'owner'
  | 'kind'
  | 'content'
  | 'date'
  | 'title'
  | 'amount'
  | 'stage'
  | 'lostReason'
