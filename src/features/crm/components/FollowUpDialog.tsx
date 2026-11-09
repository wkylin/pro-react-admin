import { Form, Input } from 'antd'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCrmStore } from '../model/CrmProvider'
import type { FollowUpDraft } from '../model/types'
import FormDialog from './FormDialog'

export default function FollowUpDialog({
  customerId,
  onSaved,
  onClose,
}: {
  customerId: string
  onSaved: () => void
  onClose: () => void
}) {
  const { t } = useTranslation()
  const add = useCrmStore((state) => state.addFollowUp)
  return (
    <FormDialog<FollowUpDraft>
      title={t('crm.addFollowUp')}
      initialValues={{ customerId, kind: 'call' }}
      onClose={onClose}
      onSave={(draft) => {
        add(draft)
        onSaved()
      }}
    >
      <Form.Item name="customerId" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="kind" label={t('crm.kind')} rules={[{ required: true, message: t('crm.errors.kind') }]}>
        <Select
          aria-label={t('crm.kind')}
          options={['call', 'email', 'meeting', 'note'].map((value) => ({ value, label: t(`crm.kinds.${value}`) }))}
        />
      </Form.Item>
      <Form.Item
        name="content"
        label={t('crm.followUpContent')}
        rules={[
          {
            required: true,
            min: 4,
            max: 1000,
            whitespace: true,
            transform: (value: string) => value?.trim(),
            message: t('crm.errors.content'),
          },
        ]}
      >
        <Input.TextArea aria-label={t('crm.followUpContent')} rows={4} maxLength={1000} showCount />
      </Form.Item>
      <Form.Item name="nextFollowUpOn" label={t('crm.nextFollowUp')}>
        <Input aria-label={t('crm.nextFollowUp')} type="date" />
      </Form.Item>
    </FormDialog>
  )
}
