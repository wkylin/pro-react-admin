import type { ReactNode } from 'react'
import { Alert, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import BusinessPage from '@shared/ui/BusinessPage'

export default function PatternPage({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
}) {
  const { t } = useTranslation()
  return (
    <BusinessPage
      title={title}
      description={description}
      eyebrow={<Tag>{t('patterns.eyebrow')}</Tag>}
      actions={actions}
      notice={
        <Alert type="info" showIcon title={t('patterns.demoNotice')} description={t('patterns.demoDescription')} />
      }
    >
      {children}
    </BusinessPage>
  )
}
