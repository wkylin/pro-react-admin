import { useState } from 'react'
import { App, Button, Empty, Form, Input, Popconfirm, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useCrmStore } from '../model/CrmProvider'
import { CrmValidationError } from '../model/crmStore'
import type { Opportunity, OpportunityStage } from '../model/types'
import FormDialog from './FormDialog'
import { formatDate, formatMoney } from './format'
import styles from '../pages/crm.module.less'

const nextStages: Partial<Record<OpportunityStage, OpportunityStage>> = {
  discovery: 'proposal',
  proposal: 'negotiation',
  negotiation: 'won',
}
const stageColors: Record<OpportunityStage, string> = {
  discovery: 'default',
  proposal: 'blue',
  negotiation: 'orange',
  won: 'success',
  lost: 'default',
}

export default function OpportunityTable({
  opportunities,
  onCreate,
}: {
  opportunities: readonly Opportunity[]
  onCreate?: () => void
}) {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const { id: currentCustomerId } = useParams()
  const customers = useCrmStore((state) => state.customers)
  const advance = useCrmStore((state) => state.advanceOpportunity)
  const lose = useCrmStore((state) => state.loseOpportunity)
  const [closing, setClosing] = useState<Opportunity>()
  const progress = (opportunity: Opportunity) => {
    try {
      advance(opportunity.id, opportunity.stage)
      void message.success(t('crm.stageUpdated'))
    } catch (reason) {
      void message.error(reason instanceof CrmValidationError ? t(`crm.errors.${reason.code}`) : t('crm.saveFailed'))
    }
  }
  const columns: ColumnsType<Opportunity> = [
    {
      title: t('crm.opportunityTitle'),
      dataIndex: 'title',
      width: 240,
      render: (_, item) => (
        <div className={styles.cell}>
          <strong>{item.title}</strong>
          <span className={styles.muted}>{item.id}</span>
          {item.lostReason && (
            <span className={styles.reason}>
              {t('crm.lostReason')}: {item.lostReason}
            </span>
          )}
        </div>
      ),
    },
    {
      title: t('crm.relatedCustomer'),
      key: 'customer',
      width: 200,
      render: (_, item) =>
        currentCustomerId === item.customerId ? (
          customers.find((customer) => customer.id === item.customerId)?.company
        ) : (
          <Button
            className={styles.company}
            type="link"
            onClick={() => navigate(`/patterns/crm/customers/${item.customerId}`)}
          >
            {customers.find((customer) => customer.id === item.customerId)?.company ?? t('crm.missingCustomer')}
          </Button>
        ),
    },
    {
      title: t('crm.amount'),
      dataIndex: 'amountCents',
      width: 150,
      render: (value: number) => formatMoney(value, i18n.resolvedLanguage),
    },
    {
      title: t('crm.stage'),
      dataIndex: 'stage',
      width: 140,
      render: (stage: OpportunityStage) => <Tag color={stageColors[stage]}>{t(`crm.stages.${stage}`)}</Tag>,
    },
    {
      title: t('crm.expectedClose'),
      dataIndex: 'expectedCloseOn',
      width: 160,
      render: (value: string) => formatDate(value, i18n.resolvedLanguage),
    },
    {
      title: t('crm.actions'),
      key: 'actions',
      width: 260,
      render: (_, item) => {
        const next = nextStages[item.stage]
        if (!next) return <span className={styles.muted}>{t('crm.closed')}</span>
        const button = (
          <Button size="small" onClick={next === 'won' ? undefined : () => progress(item)}>
            {t(`crm.advance.${next}`)}
          </Button>
        )
        return (
          <Space wrap>
            {next === 'won' ? (
              <Popconfirm
                title={t('crm.winConfirm')}
                okText={t('crm.advance.won')}
                cancelText={t('crm.cancel')}
                onConfirm={() => progress(item)}
              >
                {button}
              </Popconfirm>
            ) : (
              button
            )}
            <Button size="small" type="text" onClick={() => setClosing(item)}>
              {t('crm.markLost')}
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <>
      <div className={styles.table}>
        <Table<Opportunity>
          rowKey="id"
          columns={columns}
          dataSource={[...opportunities]}
          size="middle"
          scroll={{ x: 1150 }}
          pagination={{ pageSize: 8, showSizeChanger: false, responsive: true }}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('crm.noOpportunities')}>
                {onCreate && <Button onClick={onCreate}>{t('crm.newOpportunity')}</Button>}
              </Empty>
            ),
          }}
        />
      </div>
      {closing && (
        <FormDialog<{ reason: string }>
          title={t('crm.markLost')}
          onClose={() => setClosing(undefined)}
          onSave={({ reason }) => {
            lose(closing.id, reason)
            setClosing(undefined)
            void message.success(t('crm.stageUpdated'))
          }}
        >
          <p>{closing.title}</p>
          <Form.Item
            name="reason"
            label={t('crm.lostReason')}
            rules={[
              {
                required: true,
                min: 4,
                max: 500,
                whitespace: true,
                transform: (value: string) => value?.trim(),
                message: t('crm.errors.lostReason'),
              },
            ]}
          >
            <Input.TextArea aria-label={t('crm.lostReason')} rows={3} maxLength={500} />
          </Form.Item>
        </FormDialog>
      )}
    </>
  )
}
