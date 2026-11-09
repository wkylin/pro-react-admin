import { useState, type ReactNode } from 'react'
import { Alert, App, Form, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { CrmValidationError } from '../model/crmStore'

/** Mounted once per draft, so cancelling and reopening always starts with the saved record. */
export default function FormDialog<T extends object>({
  title,
  initialValues,
  onSave,
  onClose,
  children,
}: {
  title: string
  initialValues?: Partial<T>
  onSave: (draft: T) => void
  onClose: () => void
  children: ReactNode
}) {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [form] = Form.useForm<T>()
  const [dirty, setDirty] = useState(false)
  const [error, setError] = useState<string>()
  const cancel = () => {
    if (!dirty) return onClose()
    modal.confirm({
      title: t('crm.discardTitle'),
      content: t('crm.discardDescription'),
      okText: t('crm.discard'),
      cancelText: t('crm.keepEditing'),
      onOk: onClose,
    })
  }
  return (
    <Modal open title={title} okText={t('crm.save')} cancelText={t('crm.cancel')} onOk={form.submit} onCancel={cancel}>
      {error && <Alert type="error" showIcon title={error} />}
      <Form<T>
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={() => {
          setDirty(true)
          setError(undefined)
        }}
        onFinish={(draft) => {
          try {
            onSave(draft)
          } catch (reason) {
            setError(reason instanceof CrmValidationError ? t(`crm.errors.${reason.code}`) : t('crm.saveFailed'))
          }
        }}
      >
        {children}
      </Form>
    </Modal>
  )
}
