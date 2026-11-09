import { Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCrmStore } from '../model/CrmProvider'
import type { Customer, CustomerDraft } from '../model/types'
import FormDialog from './FormDialog'

export default function CustomerDialog({
  customer,
  onSaved,
  onClose,
}: {
  customer?: Customer
  onSaved: (customer: Customer) => void
  onClose: () => void
}) {
  const { t } = useTranslation()
  const create = useCrmStore((state) => state.createCustomer)
  const update = useCrmStore((state) => state.updateCustomer)
  return (
    <FormDialog<CustomerDraft>
      title={t(customer ? 'crm.editCustomer' : 'crm.newCustomer')}
      initialValues={customer ?? { owner: 'lin' }}
      onClose={onClose}
      onSave={(draft) => onSaved(customer ? update(customer.id, draft) : create(draft))}
    >
      <Form.Item
        name="company"
        label={t('crm.company')}
        rules={[
          {
            required: true,
            min: 2,
            max: 100,
            whitespace: true,
            transform: (value: string) => value?.trim(),
            message: t('crm.errors.company'),
          },
        ]}
      >
        <Input aria-label={t('crm.company')} maxLength={100} autoComplete="organization" />
      </Form.Item>
      <Form.Item
        name="contact"
        label={t('crm.contact')}
        rules={[{ required: true, max: 80, whitespace: true, message: t('crm.errors.contact') }]}
      >
        <Input aria-label={t('crm.contact')} maxLength={80} autoComplete="name" />
      </Form.Item>
      <Form.Item
        name="email"
        label={t('crm.email')}
        rules={[
          {
            required: true,
            type: 'email',
            max: 120,
            transform: (value: string) => value?.trim(),
            message: t('crm.errors.email'),
          },
        ]}
      >
        <Input aria-label={t('crm.email')} maxLength={120} autoComplete="email" />
      </Form.Item>
      <Form.Item name="owner" label={t('crm.owner')} rules={[{ required: true, message: t('crm.errors.owner') }]}>
        <Select
          aria-label={t('crm.owner')}
          options={['lin', 'chen', 'zhou'].map((value) => ({ value, label: t(`crm.owners.${value}`) }))}
        />
      </Form.Item>
    </FormDialog>
  )
}
