import { useState } from 'react'
import { App, Button, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { BusinessToolbar } from '@shared/ui/BusinessPage'
import { useCrmStore } from '../model/CrmProvider'
import CrmPage from '../components/CrmPage'
import OpportunityDialog from '../components/OpportunityDialog'
import OpportunityTable from '../components/OpportunityTable'
import PipelineSummary from '../components/PipelineSummary'
import styles from './crm.module.less'

const stages = ['discovery', 'proposal', 'negotiation', 'won', 'lost']

export default function OpportunitiesPage() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [params, setParams] = useSearchParams()
  const customers = useCrmStore((state) => state.customers)
  const opportunities = useCrmStore((state) => state.opportunities)
  const [creating, setCreating] = useState(false)
  const search = params.get('search') ?? ''
  const stage = stages.includes(params.get('stage') ?? '') ? params.get('stage')! : 'all'
  const updateQuery = (key: string, value: string, replace = false) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (!value || value === 'all') next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace }
    )
  const filtered = opportunities.filter(
    (item) =>
      (stage === 'all' || item.stage === stage) &&
      [item.title, customers.find((customer) => customer.id === item.customerId)?.company ?? ''].some((value) =>
        value.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
      )
  )
  return (
    <CrmPage
      title={t('crm.opportunitiesTitle')}
      description={t('crm.opportunitiesDescription')}
      view="opportunities"
      actions={
        <Button type="primary" onClick={() => setCreating(true)}>
          {t('crm.newOpportunity')}
        </Button>
      }
    >
      <PipelineSummary opportunities={opportunities} />
      <section className={styles.panel} aria-label={t('crm.opportunityRecords')}>
        <BusinessToolbar label={t('crm.searchOpportunities')}>
          <Input
            className={styles.search}
            aria-label={t('crm.searchOpportunities')}
            placeholder={t('crm.searchOpportunities')}
            allowClear
            value={search}
            onChange={(event) => updateQuery('search', event.target.value, true)}
          />
          <Select
            className={styles.filter}
            aria-label={t('crm.stage')}
            value={stage}
            onChange={(value: string) => updateQuery('stage', value)}
            options={['all', ...stages].map((value) => ({
              value,
              label: t(value === 'all' ? 'crm.allStages' : `crm.stages.${value}`),
            }))}
          />
          {(search || stage !== 'all') && <Button onClick={() => setParams({})}>{t('crm.clearFilters')}</Button>}
        </BusinessToolbar>
        <p className={styles.count} aria-live="polite">
          {t('crm.opportunityCount', { count: filtered.length })}
        </p>
        <OpportunityTable opportunities={filtered} onCreate={() => setCreating(true)} />
      </section>
      {creating && (
        <OpportunityDialog
          onClose={() => setCreating(false)}
          onSaved={() => {
            setCreating(false)
            setParams({})
            void message.success(t('crm.opportunityCreated'))
          }}
        />
      )}
    </CrmPage>
  )
}
