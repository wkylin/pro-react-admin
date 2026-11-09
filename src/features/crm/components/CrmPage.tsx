import type { ReactNode } from 'react'
import { Alert, Button, Space, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BusinessPage from '@shared/ui/BusinessPage'

export default function CrmPage({
  title,
  description,
  actions,
  children,
  view = 'customers',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  view?: 'customers' | 'opportunities'
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  return (
    <BusinessPage
      title={title}
      description={description}
      eyebrow={<Tag>{t('crm.demo')}</Tag>}
      actions={actions}
      notice={<Alert type="info" showIcon title={t('crm.demoNotice')} />}
      toolbar={
        <nav aria-label={t('crm.navigation')}>
          <Space wrap>
            <Button
              type={view === 'customers' ? 'primary' : 'default'}
              aria-current={view === 'customers' ? 'page' : undefined}
              onClick={() => navigate(`/patterns/crm${view === 'customers' && params.size ? `?${params}` : ''}`)}
            >
              {t('crm.customersTitle')}
            </Button>
            <Button
              type={view === 'opportunities' ? 'primary' : 'default'}
              aria-current={view === 'opportunities' ? 'page' : undefined}
              onClick={() => navigate('/patterns/crm/opportunities')}
            >
              {t('crm.opportunitiesTitle')}
            </Button>
          </Space>
        </nav>
      }
    >
      {children}
    </BusinessPage>
  )
}
