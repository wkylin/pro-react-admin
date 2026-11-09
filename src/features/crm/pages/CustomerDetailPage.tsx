import { useState } from 'react'
import { App, Button, Descriptions, Empty, Result, Space, Tag, Timeline } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCrmStore } from '../model/CrmProvider'
import CrmPage from '../components/CrmPage'
import CustomerDialog from '../components/CustomerDialog'
import FollowUpDialog from '../components/FollowUpDialog'
import OpportunityDialog from '../components/OpportunityDialog'
import OpportunityTable from '../components/OpportunityTable'
import PipelineSummary from '../components/PipelineSummary'
import { formatDate } from '../components/format'
import styles from './crm.module.less'

export default function CustomerDetailPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const customer = useCrmStore((state) => state.customers.find((item) => item.id === id))
  const followUps = useCrmStore((state) => state.followUps)
  const opportunities = useCrmStore((state) => state.opportunities)
  const [dialog, setDialog] = useState<'customer' | 'followUp' | 'opportunity'>()
  const back = () => navigate(`/patterns/crm${params.size ? `?${params}` : ''}`)
  if (!customer)
    return (
      <CrmPage title={t('crm.customerDetailTitle')}>
        <Result
          status="404"
          title={t('crm.missingCustomer')}
          subTitle={t('crm.missingDescription')}
          extra={<Button onClick={back}>{t('crm.backCustomers')}</Button>}
        />
      </CrmPage>
    )
  const related = opportunities.filter((item) => item.customerId === customer.id)
  const history = followUps
    .filter((item) => item.customerId === customer.id)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
  const saved = (key: string) => {
    setDialog(undefined)
    void message.success(t(key))
  }
  return (
    <CrmPage
      title={customer.company}
      description={t('crm.detailDescription')}
      actions={
        <Space wrap>
          <Button onClick={back}>{t('crm.backCustomers')}</Button>
          <Button type="primary" onClick={() => setDialog('followUp')}>
            {t('crm.addFollowUp')}
          </Button>
        </Space>
      }
    >
      <div className={styles.detailGrid}>
        <section className={styles.panel} aria-label={t('crm.customerProfile')}>
          <div className={styles.sectionHeader}>
            <h2>{t('crm.customerProfile')}</h2>
            <Button onClick={() => setDialog('customer')}>{t('crm.editCustomer')}</Button>
          </div>
          <Descriptions
            column={1}
            items={[
              { key: 'id', label: t('crm.customerId'), children: customer.id },
              { key: 'contact', label: t('crm.contact'), children: customer.contact },
              { key: 'email', label: t('crm.email'), children: <span className={styles.cell}>{customer.email}</span> },
              { key: 'owner', label: t('crm.owner'), children: t(`crm.owners.${customer.owner}`) },
              {
                key: 'status',
                label: t('crm.status'),
                children: (
                  <Tag color={customer.status === 'customer' ? 'success' : 'default'}>
                    {t(`crm.statuses.${customer.status}`)}
                  </Tag>
                ),
              },
              {
                key: 'next',
                label: t('crm.nextFollowUp'),
                children: customer.nextFollowUpOn
                  ? formatDate(customer.nextFollowUpOn, i18n.resolvedLanguage)
                  : t('crm.notScheduled'),
              },
            ]}
          />
        </section>
        <section className={styles.panel} aria-label={t('crm.followUps')}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('crm.followUps')}</h2>
              <p>{t('crm.followUpsDescription')}</p>
            </div>
          </div>
          {history.length ? (
            <Timeline
              items={history.map((item) => ({
                children: (
                  <div>
                    <Space wrap>
                      <strong>{t(`crm.kinds.${item.kind}`)}</strong>
                      <span className={styles.muted}>{formatDate(item.createdAt, i18n.resolvedLanguage)}</span>
                    </Space>
                    <p className={styles.timelineContent}>{item.content}</p>
                    {item.nextFollowUpOn && (
                      <span className={styles.muted}>
                        {t('crm.nextFollowUp')}: {formatDate(item.nextFollowUpOn, i18n.resolvedLanguage)}
                      </span>
                    )}
                  </div>
                ),
              }))}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('crm.noFollowUps')}>
              <Button onClick={() => setDialog('followUp')}>{t('crm.addFollowUp')}</Button>
            </Empty>
          )}
        </section>
      </div>
      <PipelineSummary opportunities={related} />
      <section className={styles.panel} aria-label={t('crm.relatedOpportunities')}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{t('crm.relatedOpportunities')}</h2>
            <p>{t('crm.relatedDescription')}</p>
          </div>
          <Button onClick={() => setDialog('opportunity')}>{t('crm.newOpportunity')}</Button>
        </div>
        <OpportunityTable opportunities={related} onCreate={() => setDialog('opportunity')} />
      </section>
      {dialog === 'customer' && (
        <CustomerDialog
          customer={customer}
          onClose={() => setDialog(undefined)}
          onSaved={() => saved('crm.customerUpdated')}
        />
      )}
      {dialog === 'followUp' && (
        <FollowUpDialog
          customerId={customer.id}
          onClose={() => setDialog(undefined)}
          onSaved={() => saved('crm.followUpAdded')}
        />
      )}
      {dialog === 'opportunity' && (
        <OpportunityDialog
          customerId={customer.id}
          onClose={() => setDialog(undefined)}
          onSaved={() => saved('crm.opportunityCreated')}
        />
      )}
    </CrmPage>
  )
}
