import { useEffect, useMemo, useState } from 'react'
import { Button, Input, Space } from 'antd'
import { useClipboard } from '../useClipboard'
import styles from './index.module.less'
export interface PromptFormValue {
  role: string
  objective: string
  audience: string
  context: string
  constraints: string
  outputFormat: string
  examples: string
  evaluation: string
}
export interface PromptOptimizerProps {
  className?: string
  value?: Partial<PromptFormValue> | null
  defaultValue?: Partial<PromptFormValue>
  onChange?: (value: PromptFormValue) => void
  onPromptChange?: (promptText: string, value: PromptFormValue) => void
  title?: string
  description?: string
  copyLabel?: string
  resetLabel?: string
  copiedLabel?: string
  previewLabel?: string
  emptyLabel?: string
  sectionLabels?: Partial<Record<keyof PromptFormValue, string>>
  placeholders?: Partial<Record<keyof PromptFormValue, string>>
  onCopy?: (success: boolean) => void
}
const EMPTY: PromptFormValue = {
  role: '',
  objective: '',
  audience: '',
  context: '',
  constraints: '',
  outputFormat: '',
  examples: '',
  evaluation: '',
}
const LABELS: Record<keyof PromptFormValue, string> = {
  role: 'Role',
  objective: 'Objective',
  audience: 'Audience',
  context: 'Context',
  constraints: 'Constraints',
  outputFormat: 'Output format',
  examples: 'Examples',
  evaluation: 'Evaluation',
}
const KEYS = Object.keys(EMPTY) as (keyof PromptFormValue)[]
function normalize(value?: Partial<PromptFormValue> | null): PromptFormValue {
  const result = { ...EMPTY }
  for (const key of KEYS) result[key] = value?.[key] ?? ''
  return result
}
export default function PromptOptimizer({
  className = '',
  value,
  defaultValue,
  onChange,
  onPromptChange,
  title = 'Prompt editor',
  description,
  copyLabel = 'Copy prompt',
  resetLabel = 'Reset',
  copiedLabel = 'Copied',
  previewLabel = 'Prompt preview',
  emptyLabel = 'Complete the fields to build a prompt.',
  sectionLabels,
  placeholders,
  onCopy,
}: PromptOptimizerProps) {
  const [internal, setInternal] = useState<PromptFormValue>(() => normalize(defaultValue))
  const form = useMemo(() => (value === undefined ? internal : normalize(value)), [value, internal])
  const labels = useMemo(() => {
    const result = { ...LABELS }
    for (const key of KEYS) result[key] = sectionLabels?.[key] ?? LABELS[key]
    return result
  }, [sectionLabels])
  const prompt = useMemo(
    () =>
      KEYS.filter((key) => form[key].trim())
        .map((key) => `## ${labels[key]}\n${form[key].trim()}`)
        .join('\n\n'),
    [form, labels]
  )
  const { copied, copy } = useClipboard()
  useEffect(() => {
    onPromptChange?.(prompt, form)
  }, [prompt, form, onPromptChange])
  const change = (next: PromptFormValue) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <section className={`${styles.promptOptimizer} ${className}`}>
      <header className={styles.header}>
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </header>
      <div className={styles.grid}>
        <div className={styles.formPanel}>
          {KEYS.map((key) => (
            <label key={key} className={styles.field}>
              <span>{labels[key]}</span>
              <Input.TextArea
                value={form[key]}
                placeholder={placeholders?.[key]}
                rows={key === 'role' || key === 'audience' ? 1 : 3}
                onChange={(event) => change({ ...form, [key]: event.target.value })}
              />
            </label>
          ))}
        </div>
        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <h4>{previewLabel}</h4>
            <Space>
              <Button onClick={() => change({ ...EMPTY })}>{resetLabel}</Button>
              <Button
                disabled={!prompt}
                onClick={async () => {
                  const success = await copy(prompt)
                  onCopy?.(success)
                }}
              >
                {copied ? copiedLabel : copyLabel}
              </Button>
            </Space>
          </div>
          {prompt ? <pre className={styles.promptPreview}>{prompt}</pre> : <p>{emptyLabel}</p>}
        </div>
      </div>
    </section>
  )
}
