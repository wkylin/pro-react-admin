import { useId } from 'react'
import { Button, Collapse, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { CORE_FIELDS, EXTRA_FIELDS, FIELD_KEYS, type PromptFields } from './model'
import type { PromptPreset } from './catalog'
import styles from './PromptEditor.module.less'

export type PromptEditorProps = {
  fields: PromptFields
  onChange: (next: PromptFields) => void
  promptText: string
  appliedPrompt: string
  presets: PromptPreset[]
  activePresetId: string
  onSelectPreset: (preset: PromptPreset) => void
  onApply: () => void
  onCopy: () => void
  onReset: () => void
  busy: boolean
}

export default function PromptEditor({
  fields,
  onChange,
  promptText,
  appliedPrompt,
  presets,
  activePresetId,
  onSelectPreset,
  onApply,
  onCopy,
  onReset,
  busy,
}: PromptEditorProps) {
  const { t } = useTranslation()
  const id = useId()
  const completed = FIELD_KEYS.filter((key) => fields[key].trim()).length
  const hasPrompt = Boolean(promptText.trim())
  const isApplied = hasPrompt && promptText === appliedPrompt
  const renderField = (key: keyof PromptFields) => (
    <div className={styles.field} key={key}>
      <label htmlFor={`${id}-${key}`}>{t(`aiTools.fields.${key}`)}</label>
      <Input.TextArea
        id={`${id}-${key}`}
        value={fields[key]}
        maxLength={4000}
        onChange={(event) => onChange({ ...fields, [key]: event.target.value })}
        autoSize={{ minRows: key === 'objective' || key === 'context' ? 3 : 2, maxRows: 8 }}
      />
    </div>
  )

  return (
    <div className={styles.editor}>
      <section aria-labelledby={`${id}-templates`}>
        <div className={styles.sectionHeader}>
          <h2 id={`${id}-templates`}>{t('aiTools.prompt.templates')}</h2>
          <Button type="text" onClick={onReset}>
            {t('aiTools.prompt.reset')}
          </Button>
        </div>
        <div className={styles.presets}>
          {presets.map((preset) => (
            <button
              className={styles.preset}
              type="button"
              key={preset.id}
              aria-pressed={activePresetId === preset.id}
              onClick={() => onSelectPreset(preset)}
            >
              <strong>{preset.name}</strong>
              <span>{preset.summary}</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.columns}>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()} aria-labelledby={`${id}-fields`}>
          <div className={styles.sectionHeader}>
            <h2 id={`${id}-fields`}>{t('aiTools.prompt.coreFields')}</h2>
            <span className={styles.hint}>
              {t('aiTools.prompt.completion', { completed, total: FIELD_KEYS.length })}
            </span>
          </div>
          <div className={styles.fields}>{CORE_FIELDS.map(renderField)}</div>
          <Collapse
            className={styles.extra}
            items={[
              {
                key: 'extra',
                label: t('aiTools.prompt.extraFields'),
                children: <div className={styles.fields}>{EXTRA_FIELDS.map(renderField)}</div>,
              },
            ]}
          />
        </form>

        <section className={styles.preview} aria-labelledby={`${id}-preview`}>
          <div className={styles.sectionHeader}>
            <h2 id={`${id}-preview`}>{t('aiTools.prompt.preview')}</h2>
            {hasPrompt && (
              <span className={styles.hint} role="status">
                {t(isApplied ? 'aiTools.prompt.applied' : 'aiTools.prompt.unapplied')}
              </span>
            )}
          </div>
          <p className={styles.hint}>{t('aiTools.prompt.previewHint')}</p>
          <div className={styles.actions}>
            <Button disabled={!hasPrompt} onClick={onCopy}>
              {t('aiTools.prompt.copy')}
            </Button>
            <Button type="primary" disabled={busy || !hasPrompt} onClick={onApply}>
              {t('aiTools.prompt.apply')}
            </Button>
          </div>
          {hasPrompt ? (
            <pre className={styles.promptText}>{promptText}</pre>
          ) : (
            <div className={styles.empty}>{t('aiTools.prompt.emptyPreview')}</div>
          )}
        </section>
      </div>
    </div>
  )
}
