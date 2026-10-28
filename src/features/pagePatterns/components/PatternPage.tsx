import { useId, type ReactNode } from 'react'
import { Alert, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import FixTabPanel from '@shared/ui/FixTabPanel'
import styles from '../pages/patterns.module.less'

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
  const titleId = useId()
  return (
    <FixTabPanel fill={false}>
      <section className={styles.page} aria-labelledby={titleId}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <Tag color="blue">{t('patterns.eyebrow')}</Tag>
            <Typography.Title id={titleId} level={1}>
              {title}
            </Typography.Title>
            <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
          </div>
          {actions && <div className={styles.headerActions}>{actions}</div>}
        </header>
        <Alert type="info" showIcon title={t('patterns.demoNotice')} description={t('patterns.demoDescription')} />
        {children}
      </section>
    </FixTabPanel>
  )
}
