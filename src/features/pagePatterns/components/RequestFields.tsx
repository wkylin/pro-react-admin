import { Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'

export function RequestBasicsFields() {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item name="title" label={t('patterns.title')} rules={[{ required: true, min: 4, max: 100 }]}>
        <Input maxLength={100} showCount placeholder={t('patterns.titlePlaceholder')} />
      </Form.Item>
      <Form.Item name="category" label={t('patterns.categoryLabel')} rules={[{ required: true }]}>
        <Select
          aria-label={t('patterns.categoryLabel')}
          placeholder={t('patterns.categoryPlaceholder')}
          options={(['operations', 'support', 'finance'] as const).map((value) => ({
            value,
            label: t(`patterns.category.${value}`),
          }))}
        />
      </Form.Item>
      <Form.Item name="description" label={t('patterns.description')} rules={[{ max: 500 }]}>
        <Input.TextArea rows={4} maxLength={500} showCount placeholder={t('patterns.descriptionPlaceholder')} />
      </Form.Item>
    </>
  )
}

export function RequestAssignmentFields() {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item name="owner" label={t('patterns.owner')} rules={[{ required: true, max: 80 }]}>
        <Input maxLength={80} placeholder={t('patterns.ownerPlaceholder')} />
      </Form.Item>
      <Form.Item name="priority" label={t('patterns.priorityLabel')} rules={[{ required: true }]}>
        <Select
          aria-label={t('patterns.priorityLabel')}
          options={(['low', 'medium', 'high'] as const).map((value) => ({
            value,
            label: t(`patterns.priority.${value}`),
          }))}
        />
      </Form.Item>
      <Form.Item name="dueDate" label={t('patterns.dueDate')}>
        <Input type="date" />
      </Form.Item>
    </>
  )
}
