import type { ReactNode } from 'react'
import { Alert, Button, Input, Space, Typography } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useAdministration } from '../model/AdministrationProvider'
import styles from './workspace.module.less'

export default function ResourceWorkspace({
  title,
  description,
  actions,
  onSearch,
  onReload,
  error,
  children,
}: {
  title: string
  description: string
  actions?: ReactNode
  onSearch: (value: string) => void
  onReload: () => void
  error?: string
  children: ReactNode
}) {
  const { demo } = useAdministration()
  const { t } = useTranslation()
  return (
    <section className={styles.workspace} aria-label={title}>
      <header className={styles.header}>
        <div>
          <Typography.Title level={2}>{title}</Typography.Title>
          <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
        </div>
        <Space wrap>{actions}</Space>
      </header>
      {demo && <Alert type="info" showIcon title={t('admin.demo')} description={t('admin.demoDescription')} />}
      <div className={styles.toolbar}>
        <Input.Search
          aria-label={t('admin.search')}
          placeholder={t('admin.searchPlaceholder')}
          allowClear
          onSearch={onSearch}
        />
        <Button icon={<ReloadOutlined aria-hidden />} onClick={onReload}>
          {t('admin.refresh')}
        </Button>
      </div>
      {error && (
        <Alert type="error" showIcon title={error} action={<Button onClick={onReload}>{t('admin.retry')}</Button>} />
      )}
      {children}
    </section>
  )
}
