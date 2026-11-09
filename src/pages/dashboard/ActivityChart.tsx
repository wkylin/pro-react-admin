import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ActivityPoint } from './model'
import styles from './index.module.less'

export default function ActivityChart({ points, locale }: { points: ActivityPoint[]; locale: string }) {
  const { t } = useTranslation()
  const chartId = useId()
  const chartRef = useRef<HTMLElement>(null)
  const [width, setWidth] = useState(960)
  useEffect(() => {
    if (!chartRef.current) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(240, entry.contentRect.width)))
    observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])
  const height = width < 480 ? 180 : 240
  const left = 40
  const right = 16
  const top = 16
  const bottom = 32
  const max = Math.max(4, ...points.map((point) => Math.max(point.activeAccounts, point.newCustomers)))
  const ceiling = Math.ceil(max / 4) * 4
  const x = (index: number) => left + (index / Math.max(1, points.length - 1)) * (width - left - right)
  const y = (value: number) => top + (1 - value / ceiling) * (height - top - bottom)
  const line = (key: 'activeAccounts' | 'newCustomers') =>
    points.map((point, index) => `${x(index)},${y(point[key])}`).join(' ')
  const date = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' })
  const number = new Intl.NumberFormat(locale)
  const total = points.reduce((sum, point) => sum + point.newCustomers, 0)
  const active = points.at(-1)?.activeAccounts ?? 0
  const summary = t('dashboard.chartSummary', { count: number.format(total), active: number.format(active) })
  const ticks =
    width < 480
      ? [0, points.length - 1]
      : [
          ...new Set([
            0,
            Math.floor((points.length - 1) / 3),
            Math.floor(((points.length - 1) * 2) / 3),
            points.length - 1,
          ]),
        ]

  return (
    <section className={styles.panel} aria-labelledby={`${chartId}-title`}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 id={`${chartId}-title`}>{t('dashboard.trendTitle')}</h2>
          <p>{t('dashboard.trendDescription')}</p>
        </div>
        <div className={styles.legend}>
          <span>
            <i className={styles.activeSwatch} />
            {t('dashboard.activeAccountsLegend')}
          </span>
          <span>
            <i className={styles.newSwatch} />
            {t('dashboard.newCustomersLegend')}
          </span>
        </div>
      </div>
      <figure className={styles.chart} ref={chartRef}>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${chartId}-title ${chartId}-summary`}>
          <title>{t('dashboard.trendTitle')}</title>
          {[0, 1, 2, 3, 4].map((step) => {
            const value = (ceiling * step) / 4
            return (
              <g key={step} className={styles.axis}>
                <line x1={left} x2={width - right} y1={y(value)} y2={y(value)} />
                <text x={left - 12} y={y(value) + 4} textAnchor="end">
                  {number.format(value)}
                </text>
              </g>
            )
          })}
          <polygon
            points={`${left},${y(0)} ${line('activeAccounts')} ${x(points.length - 1)},${y(0)}`}
            className={styles.chartArea}
          />
          <polyline points={line('activeAccounts')} className={styles.activeLine} />
          <polyline points={line('newCustomers')} className={styles.newLine} />
          {ticks
            .filter((index) => points[index])
            .map((index) => (
              <text
                key={index}
                x={x(index)}
                y={height - 6}
                textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}
                className={styles.dateLabel}
              >
                {date.format(new Date(points[index].date))}
              </text>
            ))}
        </svg>
        <figcaption id={`${chartId}-summary`}>{summary}</figcaption>
      </figure>
    </section>
  )
}
