import { Form, Input, InputNumber, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCrmStore } from '../model/CrmProvider'
import type { OpportunityDraft } from '../model/types'
import FormDialog from './FormDialog'

export default function OpportunityDialog({
  customerId,
  onSaved,
  onClose,
}: {
  customerId?: string
  onSaved: () => void
  onClose: () => void
}) {
  const { t } = useTranslation()
  const customers = useCrmStore((state) => state.customers)
  const create = useCrmStore((state) => state.createOpportunity)
  return (
    <FormDialog<OpportunityDraft>
      title={t('crm.newOpportunity')}
      initialValues={{ customerId }}
      onClose={onClose}
      onSave={(draft) => {
        create(draft)
        onSaved()
      }}
    >
      <Form.Item
        name="customerId"
        label={t('crm.relatedCustomer')}
        rules={[{ required: true, message: t('crm.errors.customerMissing') }]}
      >
        <Select
          aria-label={t('crm.relatedCustomer')}
          disabled={Boolean(customerId)}
          showSearch
          optionFilterProp="label"
          options={customers.map((customer) => ({ value: customer.id, label: customer.company }))}
        />
      </Form.Item>
      <Form.Item
        name="title"
        label={t('crm.opportunityTitle')}
        rules={[
          {
            required: true,
            min: 2,
            max: 100,
            whitespace: true,
            transform: (value: string) => value?.trim(),
            message: t('crm.errors.title'),
          },
        ]}
      >
        <Input aria-label={t('crm.opportunityTitle')} maxLength={100} />
      </Form.Item>
      <Form.Item name="amount" label={t('crm.amount')} rules={[{ required: true, message: t('crm.errors.amount') }]}>
        <InputNumber
          aria-label={t('crm.amount')}
          min={0.01}
          max={100000000}
          step={0.01}
          controls={false}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name="expectedCloseOn"
        label={t('crm.expectedClose')}
        rules={[{ required: true, message: t('crm.errors.date') }]}
      >
        <Input aria-label={t('crm.expectedClose')} type="date" />
      </Form.Item>
    </FormDialog>
  )
}
