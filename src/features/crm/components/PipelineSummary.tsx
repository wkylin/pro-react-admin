import { useTranslation } from 'react-i18next'
import { getPipelineSummary } from '../model/crmStore'
import type { Opportunity } from '../model/types'
import { formatMoney } from './format'
import styles from '../pages/crm.module.less'

export default function PipelineSummary({ opportunities }: { opportunities: readonly Opportunity[] }) {
  const { t, i18n } = useTranslation()
  const summary = getPipelineSummary(opportunities)
  return (
    <dl className={styles.metrics} aria-label={t('crm.pipelineSummary')}>
      <div>
        <dt>{t('crm.openCount')}</dt>
        <dd>{summary.openCount}</dd>
      </div>
      <div>
        <dt>{t('crm.openAmount')}</dt>
        <dd>{formatMoney(summary.openAmountCents, i18n.resolvedLanguage)}</dd>
      </div>
      <div>
        <dt>{t('crm.wonAmount')}</dt>
        <dd>{formatMoney(summary.wonAmountCents, i18n.resolvedLanguage)}</dd>
      </div>
    </dl>
  )
}
