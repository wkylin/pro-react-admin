import { useId, type ReactNode } from 'react'
import { Alert, Button, Input, Space, Typography } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useAdministration } from '../model/AdministrationProvider'
import styles from './workspace.module.less'

export default function ResourceWorkspace({
  title,
  description,
  actions,
  searchPlaceholder,
  searchValue,
  onSearch,
  onReload,
  error,
  children,
}: {
  title: string
  description: string
  actions?: ReactNode
  searchPlaceholder?: string
  searchValue?: string
  onSearch?: (value: string) => void
  onReload: () => void
  error?: string
  children: ReactNode
}) {
  const { demo } = useAdministration()
  const { t } = useTranslation()
  const titleId = useId()
  return (
    <FixTabPanel fill={false}>
      <section className={styles.workspace} aria-labelledby={titleId}>
        <header className={styles.header}>
          <div>
            <Typography.Title id={titleId} level={1}>
              {title}
            </Typography.Title>
            <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
          </div>
          <Space wrap>{actions}</Space>
        </header>
        {demo && <Alert type="info" showIcon title={t('admin.demo')} description={t('admin.demoDescription')} />}
        <div className={styles.toolbar}>
          {onSearch && (
            <Input.Search
              key={searchValue ?? ''}
              aria-label={t('admin.search')}
              placeholder={searchPlaceholder ?? t('admin.searchPlaceholder')}
              defaultValue={searchValue}
              allowClear
              onSearch={onSearch}
            />
          )}
          <Button icon={<ReloadOutlined aria-hidden />} onClick={onReload}>
            {t('admin.refresh')}
          </Button>
        </div>
        {error && (
          <Alert type="error" showIcon title={error} action={<Button onClick={onReload}>{t('admin.retry')}</Button>} />
        )}
        {children}
      </section>
    </FixTabPanel>
  )
}
