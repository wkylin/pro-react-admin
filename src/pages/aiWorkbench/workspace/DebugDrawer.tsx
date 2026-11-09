import { Button, Drawer, Empty, Slider, Switch, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import type { RuntimeSettings, SafeStreamEvent } from './model'
import styles from './workspace.module.less'

export interface DebugMetrics {
  requests: number
  chunks: number
  completed: number
  cancelled: number
  errors: number
  lastDurationMs: number
}

interface Props {
  open: boolean
  onClose: () => void
  settings: RuntimeSettings
  onChange: (patch: Partial<RuntimeSettings>) => void
  events: SafeStreamEvent[]
  metrics: DebugMetrics
  onClear: () => void
  legacyAvailable: boolean
  onImportLegacy: () => void
}

export default function DebugDrawer({
  open,
  onClose,
  settings,
  onChange,
  events,
  metrics,
  onClear,
  legacyAvailable,
  onImportLegacy,
}: Props) {
  const { t, i18n } = useTranslation()
  const time = (value: string) => {
    const date = new Date(value)
    return Number.isFinite(date.getTime())
      ? new Intl.DateTimeFormat(i18n.resolvedLanguage, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(date)
      : '—'
  }
  return (
    <Drawer open={open} onClose={onClose} title={t('aiTools.debug.title')} size={520} className={styles.debugDrawer}>
      <p className={styles.description}>{t('aiTools.debug.description')}</p>
      <dl className={styles.debugMetrics}>
        {(
          [
            ['requests', metrics.requests],
            ['chunks', metrics.chunks],
            ['lastDuration', metrics.lastDurationMs + ' ms'],
          ] as const
        ).map(([key, value]) => (
          <div key={key}>
            <dt>{t('aiTools.debug.' + key)}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <Tabs
        items={[
          {
            key: 'settings',
            label: t('aiTools.debug.settings'),
            children: (
              <div className={styles.debugSettings}>
                <div>
                  <div className={styles.controlLabel}>
                    <label htmlFor="demo-cadence">{t('aiTools.debug.cadence')}</label>
                    <span>{settings.cadence} ms</span>
                  </div>
                  <Slider
                    id="demo-cadence"
                    aria-label={t('aiTools.debug.cadence')}
                    min={40}
                    max={280}
                    step={20}
                    value={settings.cadence}
                    onChange={(cadence) => onChange({ cadence })}
                  />
                </div>
                <div>
                  <div className={styles.controlLabel}>
                    <label htmlFor="demo-chunks">{t('aiTools.debug.chunkSize')}</label>
                    <span>{settings.chunkSize}</span>
                  </div>
                  <Slider
                    id="demo-chunks"
                    aria-label={t('aiTools.debug.chunkSize')}
                    min={10}
                    max={40}
                    step={2}
                    value={settings.chunkSize}
                    onChange={(chunkSize) => onChange({ chunkSize })}
                  />
                </div>
                <div className={styles.settingRow}>
                  <div>
                    <strong>{t('aiTools.debug.reasoning')}</strong>
                    <p>{t('aiTools.debug.reasoningHint')}</p>
                  </div>
                  <Switch
                    aria-label={t('aiTools.debug.reasoning')}
                    checked={settings.includeReasoning}
                    onChange={(includeReasoning) => onChange({ includeReasoning })}
                  />
                </div>
                <div className={styles.settingRow}>
                  <div>
                    <strong>{t('aiTools.debug.persist')}</strong>
                    <p>{t('aiTools.debug.persistHint')}</p>
                  </div>
                  <Switch
                    aria-label={t('aiTools.debug.persist')}
                    checked={settings.persistDraft}
                    onChange={(persistDraft) => onChange({ persistDraft })}
                  />
                </div>
                {legacyAvailable && (
                  <div className={styles.legacy}>
                    <strong>{t('aiTools.debug.legacyTitle')}</strong>
                    <p className={styles.description}>{t('aiTools.debug.legacyHint')}</p>
                    <Button onClick={onImportLegacy}>{t('aiTools.debug.importLegacy')}</Button>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: 'events',
            label: t('aiTools.debug.events'),
            children: (
              <div className={styles.eventsPanel}>
                <div className={styles.eventsHeader}>
                  <p className={styles.description}>{t('aiTools.debug.eventsHint')}</p>
                  <Button size="small" disabled={!events.length} onClick={onClear}>
                    {t('aiTools.debug.clear')}
                  </Button>
                </div>
                {!events.length ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('aiTools.debug.empty')} />
                ) : (
                  <ol className={styles.eventList}>
                    {events.map((event, index) => (
                      <li key={event.requestId + '-' + index}>
                        <div>
                          <strong>{event.type}</strong>
                          <time dateTime={event.timestamp}>{time(event.timestamp)}</time>
                        </div>
                        <small>
                          {event.durationMs ?? 0} ms · {event.contentSize ?? 0} {t('aiTools.debug.characters')}
                        </small>
                      </li>
                    ))}
                  </ol>
                )}
                <p className={styles.description}>
                  {t('aiTools.debug.summary', {
                    completed: metrics.completed,
                    cancelled: metrics.cancelled,
                    errors: metrics.errors,
                  })}
                </p>
              </div>
            ),
          },
        ]}
      />
    </Drawer>
  )
}
