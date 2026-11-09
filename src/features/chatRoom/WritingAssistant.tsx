import { useEffect, useId, useRef, useState } from 'react'
import { Alert, Button, Input, Modal, Select } from 'antd'
import { Check, Copy, ExternalLink, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './MessageComposer.module.less'

type WritingGoal = 'polish' | 'shorten' | 'formal' | 'translate'

export interface WritingAssistantProps {
  text: string
  onClose: () => void
  onOpenStudio?: () => void
}

/** Builds a prompt locally. This component never calls a model or a network service. */
export default function WritingAssistant({ text, onClose, onOpenStudio }: WritingAssistantProps) {
  const { t } = useTranslation()
  const id = useId()
  const [draft, setDraft] = useState(text)
  const [goal, setGoal] = useState<WritingGoal>('polish')
  const [language, setLanguage] = useState('English')
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle')
  const mounted = useRef(true)
  const revision = useRef(0)
  const prompt = draft.trim()
    ? t('chatRoom.composer.promptTemplate', {
        instruction: t(`chatRoom.composer.promptInstructions.${goal}`, { language: language.trim() }),
        text: draft.trim(),
        interpolation: { escapeValue: false },
      })
    : ''
  const latestPrompt = useRef(prompt)
  latestPrompt.current = prompt

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      revision.current += 1
    }
  }, [])
  useEffect(() => {
    revision.current += 1
    setCopyState('idle')
  }, [prompt])

  const copy = async () => {
    if (!prompt || copyState === 'copying' || (goal === 'translate' && !language.trim())) return
    const attempt = ++revision.current
    setCopyState('copying')
    try {
      await navigator.clipboard.writeText(prompt)
      if (mounted.current && attempt === revision.current && latestPrompt.current === prompt) setCopyState('copied')
    } catch {
      if (mounted.current && attempt === revision.current && latestPrompt.current === prompt) setCopyState('failed')
    }
  }

  return (
    <Modal
      open
      title={
        <span className={styles.assistantTitle}>
          <Sparkles size={18} aria-hidden="true" />
          {t('chatRoom.composer.writingAssistant')}
        </span>
      }
      onCancel={onClose}
      closable={{ 'aria-label': t('chatRoom.composer.closeAssistant') }}
      destroyOnHidden
      width={560}
      footer={
        <div className={styles.assistantFooter}>
          {onOpenStudio && (
            <Button
              icon={<ExternalLink size={14} aria-hidden="true" />}
              onClick={() => {
                onClose()
                onOpenStudio()
              }}
            >
              {t('chatRoom.composer.openStudio')}
            </Button>
          )}
          <Button onClick={onClose}>{t('chatRoom.close')}</Button>
          <Button
            type="primary"
            icon={
              copyState === 'copied' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />
            }
            loading={copyState === 'copying'}
            disabled={!prompt || (goal === 'translate' && !language.trim())}
            onClick={() => void copy()}
          >
            {t(copyState === 'copied' ? 'chatRoom.composer.promptCopied' : 'chatRoom.composer.copyPrompt')}
          </Button>
        </div>
      }
    >
      <p className={styles.dialogHint}>{t('chatRoom.composer.assistantHint')}</p>
      <div className={styles.dialogField}>
        <label htmlFor={`${id}-draft`}>{t('chatRoom.composer.writingDraft')}</label>
        <Input.TextArea
          id={`${id}-draft`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('chatRoom.composer.writingDraftPlaceholder')}
          autoSize={{ minRows: 3, maxRows: 5 }}
          autoFocus
        />
      </div>
      <div className={styles.dialogField}>
        <label htmlFor={`${id}-goal`}>{t('chatRoom.composer.writingGoal')}</label>
        <Select<WritingGoal>
          id={`${id}-goal`}
          value={goal}
          onChange={setGoal}
          options={(['polish', 'shorten', 'formal', 'translate'] as const).map((item) => ({
            value: item,
            label: t(`chatRoom.composer.goals.${item}`),
          }))}
          className={styles.goalSelect}
        />
      </div>
      {goal === 'translate' && (
        <div className={styles.dialogField}>
          <label htmlFor={`${id}-language`}>{t('chatRoom.composer.targetLanguage')}</label>
          <Input
            id={`${id}-language`}
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            maxLength={80}
          />
        </div>
      )}
      <div className={styles.dialogField}>
        <label htmlFor={`${id}-preview`}>{t('chatRoom.composer.promptPreview')}</label>
        <Input.TextArea
          id={`${id}-preview`}
          className={styles.promptPreview}
          value={prompt}
          readOnly
          rows={5}
          aria-describedby={`${id}-preview-hint`}
          placeholder={t('chatRoom.composer.emptyPrompt')}
        />
        <span id={`${id}-preview-hint`} className={styles.previewHint}>
          {t('chatRoom.composer.previewHint')}
        </span>
      </div>
      <div role="status" aria-live="polite" className={styles.copyFeedback}>
        {copyState === 'copied' ? t('chatRoom.composer.promptCopied') : ''}
      </div>
      {copyState === 'failed' && <Alert type="error" showIcon title={t('chatRoom.composer.promptCopyFailed')} />}
    </Modal>
  )
}
