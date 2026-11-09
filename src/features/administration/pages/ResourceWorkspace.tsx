import type { ReactNode } from 'react'
import { Alert, Button, Input } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import BusinessPage, { BusinessToolbar } from '@shared/ui/BusinessPage'
import { useAdministration } from '../model/AdministrationProvider'

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
  return (
    <BusinessPage
      title={title}
      description={description}
      actions={actions}
      notice={demo && <Alert type="info" showIcon title={t('admin.demo')} description={t('admin.demoDescription')} />}
      toolbar={
        <BusinessToolbar
          label={onSearch ? t('admin.search') : undefined}
          actions={
            <Button icon={<ReloadOutlined aria-hidden />} onClick={onReload}>
              {t('admin.refresh')}
            </Button>
          }
        >
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
        </BusinessToolbar>
      }
    >
      {error && (
        <Alert type="error" showIcon title={error} action={<Button onClick={onReload}>{t('admin.retry')}</Button>} />
      )}
      {children}
    </BusinessPage>
  )
}
