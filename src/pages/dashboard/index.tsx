import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Select, Tag } from 'antd'
import { ArrowDownRight, ArrowUpRight, CreditCard, Minus, TrendingUp, UserPlus, Users } from 'lucide-react'
import BusinessPage from '@shared/ui/BusinessPage'
import { demoAsOf, getActivity, getMetrics, queryCustomers } from './model'
import { readDashboardQuery, type DashboardQuery } from './query'
import ActivityChart from './ActivityChart'
import CustomerTable from './CustomerTable'
import styles from './index.module.less'

const icons = { revenue: CreditCard, newCustomers: UserPlus, activeAccounts: Users, growth: TrendingUp }

export default function Dashboard() {
  const { t, i18n } = useTranslation()
  const [params, setParams] = useSearchParams()
  const query = useMemo(() => readDashboardQuery(params), [params])
  const locale = i18n.resolvedLanguage === 'zh' ? 'zh-CN' : 'en-US'
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 })
  const date = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
  const activity = useMemo(() => getActivity(query.range), [query.range])
  const metrics = useMemo(() => getMetrics(query.range), [query.range])
  const records = useMemo(() => queryCustomers(query), [query])

  const updateQuery = (patch: Partial<DashboardQuery>, replace = false) => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        for (const [key, value] of Object.entries(patch)) {
          if (value === undefined || value === '' || value === 'all') next.delete(key)
          else next.set(key, String(value))
        }
        return next
      },
      { replace }
    )
  }

  return (
    <BusinessPage
      title={t('dashboard.title')}
      description={t('dashboard.subtitle')}
      headingId="dashboard-title"
      className={styles.dashboard}
      eyebrow={
        <>
          <Tag>{t('dashboard.demo')}</Tag>
          <span>{t('dashboard.asOf', { date: date.format(new Date(demoAsOf)) })}</span>
        </>
      }
      actions={
        <Select
          aria-label={t('dashboard.range')}
          value={query.range}
          onChange={(range) => updateQuery({ range })}
          options={[7, 30, 90].map((value) => ({ value, label: t(`dashboard.range${value}`) }))}
          className={styles.rangeSelect}
        />
      }
    >
      <div className={styles.metrics} aria-live="polite">
        {metrics.map((metric) => {
          const Icon = icons[metric.key]
          const TrendIcon =
            metric.change === null || metric.change === 0 ? Minus : metric.change > 0 ? ArrowUpRight : ArrowDownRight
          const direction =
            metric.change === null || metric.change === 0 ? 'unchanged' : metric.change > 0 ? 'increase' : 'decrease'
          const value =
            metric.key === 'revenue'
              ? new Intl.NumberFormat(locale, {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(metric.value)
              : metric.key === 'growth'
                ? `${number.format(metric.value)}%`
                : number.format(metric.value)
          return (
            <article className={styles.metricCard} key={metric.key}>
              <div className={styles.metricHeading}>
                <span>{t(`dashboard.metrics.${metric.key}`)}</span>
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className={styles.metricValue}>{value}</div>
              <div className={styles.metricComparison}>
                <span
                  className={
                    direction === 'unchanged'
                      ? styles.neutral
                      : direction === 'decrease'
                        ? styles.negative
                        : styles.positive
                  }
                >
                  <TrendIcon size={14} aria-hidden="true" />
                  <span className={styles.srOnly}>{t(`dashboard.${direction}`)} </span>
                  {metric.change === null
                    ? t('dashboard.noBaseline')
                    : `${metric.change > 0 ? '+' : ''}${number.format(metric.change)}%`}
                </span>
                <span>{t('dashboard.compare')}</span>
              </div>
              <p>{t(`dashboard.metricHints.${metric.key}`)}</p>
            </article>
          )
        })}
      </div>

      <ActivityChart points={activity} locale={locale} />
      <CustomerTable records={records} query={query} updateQuery={updateQuery} locale={locale} />
    </BusinessPage>
  )
}
