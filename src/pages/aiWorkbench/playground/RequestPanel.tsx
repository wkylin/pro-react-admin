import { useEffect, useId, useState } from 'react'
import { Alert, Button, Collapse, Form, Input, InputNumber, Select, Switch } from 'antd'
import { Play, RotateCcw, Square } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TavilySearchRequest } from './model'
import styles from './index.module.less'

interface Props {
  draft: TavilySearchRequest
  running: boolean
  hasSession: boolean
  connecting: boolean
  invalidField?: keyof TavilySearchRequest
  onChange: (patch: Partial<TavilySearchRequest>) => void
  onRun: () => void
  onCancel: () => void
  onReset: () => void
  onDisconnect?: () => void
  connectionName?: string
}

export default function RequestPanel({
  draft,
  running,
  hasSession,
  connecting,
  invalidField,
  onChange,
  onRun,
  onCancel,
  onReset,
  onDisconnect,
  connectionName,
}: Props) {
  const { t } = useTranslation()
  const id = useId()
  const [advancedOpen, setAdvancedOpen] = useState(false)
  useEffect(() => {
    if (!invalidField) return
    const advanced = ['include_domains', 'exclude_domains', 'include_raw_content', 'include_images'].includes(
      invalidField
    )
    if (advanced && !advancedOpen) {
      setAdvancedOpen(true)
      return
    }
    const frame = requestAnimationFrame(() => document.getElementById(`${id}-${invalidField}`)?.focus())
    return () => cancelAnimationFrame(frame)
  }, [advancedOpen, id, invalidField])
  const field = (key: keyof TavilySearchRequest, label: string) => ({
    label,
    htmlFor: `${id}-${key}`,
    validateStatus: invalidField === key ? ('error' as const) : undefined,
    help: invalidField === key ? t(`tavily.validation.${key}`) : undefined,
  })
  const selectOptions = (values: readonly string[], group: string) =>
    values.map((value) => ({ value, label: t(`tavily.${group}.${value}`) }))

  return (
    <section className={styles.requestPanel} aria-labelledby={`${id}-title`}>
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.eyebrow}>{t('tavily.requestEyebrow')}</span>
          <h2 id={`${id}-title`}>{t('tavily.parameters')}</h2>
        </div>
        <Button type="text" icon={<RotateCcw size={14} aria-hidden="true" />} disabled={running} onClick={onReset}>
          {t('tavily.reset')}
        </Button>
      </div>
      <Form layout="vertical" requiredMark={false} onFinish={onRun} className={styles.form}>
        {invalidField && (
          <Alert
            className={styles.validationAlert}
            type="error"
            showIcon
            title={t(`tavily.validation.${invalidField}`)}
          />
        )}
        <Form.Item {...field('query', t('tavily.query'))}>
          <Input.TextArea
            id={`${id}-query`}
            aria-label={t('tavily.query')}
            aria-invalid={invalidField === 'query'}
            value={draft.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder={t('tavily.queryPlaceholder')}
            autoSize={{ minRows: 3, maxRows: 8 }}
            disabled={running}
          />
          <div className={styles.fieldHint}>{t('tavily.queryLimit', { count: Array.from(draft.query).length })}</div>
        </Form.Item>
        <div className={styles.runActions}>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon={<Play size={15} aria-hidden="true" />}
            loading={running}
            aria-label={t('tavily.run')}
            aria-describedby={`${id}-connection`}
          >
            {t(connecting ? 'tavily.connecting' : running ? 'tavily.running' : 'tavily.run')}
          </Button>
          {running && (
            <Button icon={<Square size={14} aria-hidden="true" />} onClick={onCancel}>
              {t('tavily.cancel')}
            </Button>
          )}
        </div>
        <div className={styles.searchConnection} id={`${id}-connection`}>
          <p>
            {t(
              hasSession
                ? connectionName
                  ? 'tavily.connectedSearchAccount'
                  : 'tavily.usingEnterpriseSession'
                : 'tavily.automaticConnectionHint',
              { account: connectionName }
            )}
          </p>
          {onDisconnect && (
            <Button type="link" size="small" onClick={onDisconnect}>
              {t('tavily.disconnectSearch')}
            </Button>
          )}
        </div>
        <div className={styles.fieldGrid}>
          <Form.Item {...field('search_depth', t('tavily.depthLabel'))}>
            <Select
              id={`${id}-search_depth`}
              aria-label={t('tavily.depthLabel')}
              value={draft.search_depth}
              options={selectOptions(['basic', 'advanced', 'fast', 'ultra-fast'], 'depth')}
              onChange={(search_depth) => onChange({ search_depth })}
              disabled={running}
            />
          </Form.Item>
          <Form.Item {...field('topic', t('tavily.topicLabel'))}>
            <Select
              id={`${id}-topic`}
              aria-label={t('tavily.topicLabel')}
              value={draft.topic}
              options={selectOptions(['general', 'news', 'finance'], 'topics')}
              onChange={(topic) => onChange({ topic })}
              disabled={running}
            />
          </Form.Item>
          <Form.Item {...field('max_results', t('tavily.maxResults'))}>
            <InputNumber
              id={`${id}-max_results`}
              aria-label={t('tavily.maxResults')}
              min={1}
              max={20}
              precision={0}
              value={draft.max_results}
              onChange={(value) => onChange({ max_results: value ?? 5 })}
              disabled={running}
            />
          </Form.Item>
          <Form.Item {...field('time_range', t('tavily.timeLabel'))}>
            <Select<NonNullable<TavilySearchRequest['time_range']> | 'all'>
              id={`${id}-time_range`}
              aria-label={t('tavily.timeLabel')}
              value={draft.time_range ?? 'all'}
              options={selectOptions(['all', 'day', 'week', 'month', 'year'], 'time')}
              onChange={(value) => onChange({ time_range: value === 'all' ? undefined : value })}
              disabled={running}
            />
          </Form.Item>
        </div>
        <Form.Item {...field('include_answer', t('tavily.answerLabel'))}>
          <Select<Exclude<TavilySearchRequest['include_answer'], false> | 'none'>
            id={`${id}-include_answer`}
            aria-label={t('tavily.answerLabel')}
            value={draft.include_answer || 'none'}
            options={selectOptions(['none', 'basic', 'advanced'], 'answers')}
            onChange={(value) => onChange({ include_answer: value === 'none' ? false : value })}
            disabled={running}
          />
        </Form.Item>
        <Collapse
          ghost
          className={styles.advanced}
          activeKey={advancedOpen ? ['advanced'] : []}
          onChange={(keys) => setAdvancedOpen(keys.includes('advanced'))}
          items={[
            {
              key: 'advanced',
              label: t('tavily.advanced'),
              forceRender: true,
              children: (
                <>
                  {(['include_domains', 'exclude_domains'] as const).map((key) => (
                    <Form.Item {...field(key, t(`tavily.${key}`))} key={key}>
                      <Select
                        id={`${id}-${key}`}
                        aria-label={t(`tavily.${key}`)}
                        mode="tags"
                        tokenSeparators={[',', ' ', '\n']}
                        value={draft[key]}
                        onChange={(value: string[]) => onChange({ [key]: value })}
                        placeholder={t('tavily.domainPlaceholder')}
                        open={false}
                        disabled={running}
                      />
                    </Form.Item>
                  ))}
                  <p className={styles.fieldHint}>{t('tavily.domainHint')}</p>
                  <Form.Item {...field('include_raw_content', t('tavily.rawLabel'))}>
                    <Select<Exclude<TavilySearchRequest['include_raw_content'], false> | 'none'>
                      id={`${id}-include_raw_content`}
                      aria-label={t('tavily.rawLabel')}
                      value={draft.include_raw_content || 'none'}
                      options={selectOptions(['none', 'markdown', 'text'], 'raw')}
                      onChange={(value) => onChange({ include_raw_content: value === 'none' ? false : value })}
                      disabled={running}
                    />
                  </Form.Item>
                  <div className={styles.switchRow}>
                    <label htmlFor={`${id}-images`}>{t('tavily.includeImages')}</label>
                    <Switch
                      id={`${id}-images`}
                      aria-label={t('tavily.includeImages')}
                      checked={draft.include_images}
                      onChange={(include_images) => onChange({ include_images })}
                      disabled={running}
                    />
                  </div>
                </>
              ),
            },
          ]}
        />

        <p className={styles.fieldHint}>{t('tavily.costHint')}</p>
      </Form>
    </section>
  )
}
