import { useState } from 'react'
import { Alert, App, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProfileValidationError, type ProfileValues } from './model'

export default function ProfileEditor({
  values,
  onSave,
  onClose,
}: {
  values: ProfileValues
  onSave: (values: ProfileValues) => void
  onClose: () => void
}) {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [form] = Form.useForm<ProfileValues>()
  const [dirty, setDirty] = useState(false)
  const [failed, setFailed] = useState(false)
  const cancel = () => {
    if (!dirty) return onClose()
    modal.confirm({
      title: t('profilePage.discardTitle'),
      content: t('profilePage.discardDescription'),
      okText: t('profilePage.discard'),
      cancelText: t('profilePage.keepEditing'),
      onOk: onClose,
    })
  }
  return (
    <Modal
      open
      title={t('profilePage.edit')}
      okText={t('profilePage.save')}
      cancelText={t('profilePage.cancel')}
      onCancel={cancel}
      onOk={form.submit}
    >
      <p>{t('profilePage.editorNotice')}</p>
      {failed && <Alert type="error" showIcon title={t('profilePage.saveFailed')} />}
      <Form<ProfileValues>
        form={form}
        layout="vertical"
        initialValues={values}
        onValuesChange={() => {
          setDirty(true)
          setFailed(false)
        }}
        onFinish={(draft) => {
          try {
            onSave(draft)
          } catch (reason) {
            if (reason instanceof ProfileValidationError)
              form.setFields([{ name: reason.field, errors: [t(`profilePage.errors.${reason.field}`)] }])
            else setFailed(true)
          }
        }}
      >
        <Form.Item
          name="displayName"
          label={t('profilePage.displayName')}
          rules={[{ required: true, whitespace: true, max: 60, message: t('profilePage.errors.displayName') }]}
        >
          <Input aria-label={t('profilePage.displayName')} maxLength={60} autoComplete="name" />
        </Form.Item>
        {(['jobTitle', 'department', 'location'] as const).map((field) => (
          <Form.Item
            key={field}
            name={field}
            label={t(`profilePage.${field}`)}
            rules={[{ max: 80, message: t(`profilePage.errors.${field}`) }]}
          >
            <Input aria-label={t(`profilePage.${field}`)} maxLength={80} />
          </Form.Item>
        ))}
        <Form.Item name="bio" label={t('profilePage.bio')} rules={[{ max: 280, message: t('profilePage.errors.bio') }]}>
          <Input.TextArea aria-label={t('profilePage.bio')} rows={4} maxLength={280} showCount />
        </Form.Item>
      </Form>
    </Modal>
  )
}
