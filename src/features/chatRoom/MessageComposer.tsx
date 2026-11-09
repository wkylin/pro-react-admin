import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { Alert, Button, Input, Modal, Popover, Tooltip } from 'antd'
import {
  Bold,
  Code,
  CornerUpLeft,
  Italic,
  Link,
  List,
  ListOrdered,
  LockKeyhole,
  Paperclip,
  Quote,
  Send,
  Smile,
  Sparkles,
  Strikethrough,
  Type,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  buildQuotedReply,
  createChatLink,
  formatComposerSelection,
  insertComposerText,
  safeChatUrl,
  type ComposerEdit,
  type TextFormat,
} from './composerModel'
import { CHAT_MESSAGE_LIMIT } from './model'
import WritingAssistant from './WritingAssistant'
import styles from './MessageComposer.module.less'

export type ComposerMode = 'reply' | 'note'

export interface MessageComposerProps {
  mode: ComposerMode
  onModeChange: (mode: ComposerMode) => void
  value: string
  onChange: (value: string) => void
  onSubmit: (body: string) => Promise<boolean> | boolean
  sending: boolean
  ready: boolean
  roomId: string
  scope: number
  replyTarget?: { id: string; roomId: string; displayName: string; body: string }
  onCancelReply: () => void
  error?: string
  offline: boolean
  noteCount: number
  onOpenStudio?: () => void
}

interface DraftAnchor {
  context: string
  value: string
  start: number
  end: number
}

interface LinkDialog {
  anchor: DraftAnchor
  attachment: boolean
  label: string
  url: string
  error?: 'requiredLabel' | 'invalidUrl' | 'tooLong'
}

const formats = [
  ['bold', Bold],
  ['italic', Italic],
  ['strike', Strikethrough],
  ['code', Code],
  ['quote', Quote],
  ['bullet', List],
  ['number', ListOrdered],
] as const
const emojis = ['👍', '😊', '🎉', '❤️', '👏', '✅', '👋', '🚀', '💡', '🙌', '✨', '🙏']

export default function MessageComposer({
  mode,
  onModeChange,
  value,
  onChange,
  onSubmit,
  sending,
  ready,
  roomId,
  scope,
  replyTarget,
  onCancelReply,
  error,
  offline,
  noteCount,
  onOpenStudio,
}: MessageComposerProps) {
  const { t } = useTranslation()
  const id = useId()
  const editor = useRef<HTMLTextAreaElement>(null)
  const tabs = useRef<Partial<Record<ComposerMode, HTMLButtonElement | null>>>({})
  const formatContent = useRef<HTMLDivElement>(null)
  const emojiContent = useRef<HTMLDivElement>(null)
  const composing = useRef(false)
  const context = JSON.stringify([scope, roomId, mode])
  const current = useRef({ context, value })
  current.current = { context, value }
  const toolAnchor = useRef<DraftAnchor | undefined>(undefined)
  const pendingSelection = useRef<(ComposerEdit & { context: string }) | undefined>(undefined)
  const submitGuard = useRef<string | undefined>(undefined)
  const [popover, setPopover] = useState<{ context: string; kind: 'format' | 'emoji'; keyboard: boolean }>()
  const [link, setLink] = useState<LinkDialog>()
  const [assistant, setAssistant] = useState<string>()
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState<string>()
  const target = mode === 'reply' && replyTarget?.roomId === roomId ? replyTarget : undefined
  const characterCount = buildQuotedReply(value, target).length
  const busy = sending || submitting === context
  const canSubmit = Boolean(value.trim()) && characterCount <= CHAT_MESSAGE_LIMIT && !busy && (mode === 'note' || ready)
  const linkDialog = link?.anchor.context === context ? link : undefined

  useEffect(() => {
    composing.current = false
    toolAnchor.current = undefined
    pendingSelection.current = undefined
    submitGuard.current = undefined
    setPopover(undefined)
    setLink(undefined)
    setAssistant(undefined)
    setFeedback('')
    setSubmitting(undefined)
  }, [context])

  useLayoutEffect(() => {
    const element = editor.current
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${Math.min(160, Math.max(64, element.scrollHeight))}px`
    const selection = pendingSelection.current
    if (!selection || selection.context !== context || selection.value !== value) return
    pendingSelection.current = undefined
    element.focus({ preventScroll: true })
    element.setSelectionRange(selection.selectionStart, selection.selectionEnd)
  }, [context, value])

  useEffect(() => {
    if (popover?.context !== context || !popover.keyboard) return
    const frame = requestAnimationFrame(() => {
      const content = popover.kind === 'format' ? formatContent.current : emojiContent.current
      content?.querySelector('button')?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [context, popover])

  const anchor = (): DraftAnchor => ({
    context,
    value: current.current.value,
    start: editor.current?.selectionStart ?? value.length,
    end: editor.current?.selectionEnd ?? value.length,
  })

  const apply = (edit: ComposerEdit | undefined, saved: DraftAnchor, announcement: string): boolean => {
    if (saved.context !== current.current.context) return false
    if (saved.value !== current.current.value) {
      setFeedback(t('chatRoom.composer.draftChanged'))
      return false
    }
    if (!edit || buildQuotedReply(edit.value, target).length > CHAT_MESSAGE_LIMIT) {
      setFeedback(t('chatRoom.composer.tooLong'))
      return false
    }
    pendingSelection.current = { ...edit, context }
    onChange(edit.value)
    setFeedback(announcement)
    return true
  }

  const format = (kind: TextFormat, saved = toolAnchor.current ?? anchor()) => {
    setPopover(undefined)
    apply(formatComposerSelection(saved.value, saved.start, saved.end, kind), saved, t('chatRoom.composer.formatted'))
  }

  const openLink = (attachment: boolean) => {
    const saved = anchor()
    toolAnchor.current = saved
    setPopover(undefined)
    setLink({
      anchor: saved,
      attachment,
      label: saved.value.slice(saved.start, saved.end).replace(/\s+/g, ' ').trim(),
      url: '',
    })
  }

  const addLink = () => {
    if (!linkDialog || linkDialog.anchor.context !== current.current.context) return
    if (linkDialog.anchor.value !== current.current.value) {
      setLink(undefined)
      setFeedback(t('chatRoom.composer.draftChanged'))
      return
    }
    const invalid = !linkDialog.label.trim() ? 'requiredLabel' : !safeChatUrl(linkDialog.url) ? 'invalidUrl' : undefined
    if (invalid) {
      setLink({ ...linkDialog, error: invalid })
      return
    }
    const markdown = createChatLink(linkDialog.label, linkDialog.url)
    const edit = markdown
      ? insertComposerText(linkDialog.anchor.value, linkDialog.anchor.start, linkDialog.anchor.end, markdown)
      : undefined
    if (!edit || buildQuotedReply(edit.value, target).length > CHAT_MESSAGE_LIMIT) {
      setLink({ ...linkDialog, error: 'tooLong' })
      return
    }
    if (apply(edit, linkDialog.anchor, t('chatRoom.composer.linkInserted'))) setLink(undefined)
  }

  const submit = async () => {
    if (!canSubmit || submitGuard.current === context || composing.current) return
    const savedContext = context
    const savedMode = mode
    submitGuard.current = savedContext
    setSubmitting(savedContext)
    setFeedback('')
    try {
      const saved = await onSubmit(buildQuotedReply(value.trim(), target))
      if (current.current.context !== savedContext) return
      if (saved && savedMode === 'note') setFeedback(t('chatRoom.composer.noteSaved'))
      if (!saved) setFeedback(t('chatRoom.composer.submitFailed'))
      editor.current?.focus({ preventScroll: true })
    } catch {
      if (current.current.context === savedContext) setFeedback(t('chatRoom.composer.submitFailed'))
    } finally {
      if (submitGuard.current === savedContext) submitGuard.current = undefined
      if (current.current.context === savedContext) setSubmitting(undefined)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229 || composing.current) return
    if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey) {
      const key = event.key.toLowerCase()
      if (key === 'b' || key === 'i' || key === 'k') {
        event.preventDefault()
        if (key === 'k') openLink(false)
        else format(key === 'b' ? 'bold' : 'italic', anchor())
        return
      }
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      // Leave an over-limit or unavailable draft editable, including its newlines.
      if (canSubmit) {
        event.preventDefault()
        void submit()
      }
    }
  }

  const switchMode = (next: ComposerMode) => {
    if (next !== mode) onModeChange(next)
  }
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next: ComposerMode
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = mode === 'reply' ? 'note' : 'reply'
    else if (event.key === 'Home') next = 'reply'
    else if (event.key === 'End') next = 'note'
    else return
    event.preventDefault()
    switchMode(next)
    tabs.current[next]?.focus()
  }
  const togglePopover = (kind: 'format' | 'emoji', keyboard: boolean) => {
    toolAnchor.current = anchor()
    setPopover(popover?.context === context && popover.kind === kind ? undefined : { context, kind, keyboard })
  }
  const closePopupOnEscape = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setPopover(undefined)
      editor.current?.focus({ preventScroll: true })
    }
  }
  const preserveSelection = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault()

  return (
    <div className={styles.root}>
      {error && <Alert showIcon type="error" title={error} className={styles.error} />}
      <div className={styles.card}>
        <div className={styles.tabs} role="tablist" aria-label={t('chatRoom.composer.mode')}>
          {(['reply', 'note'] as const).map((item) => (
            <button
              key={item}
              ref={(element) => {
                tabs.current[item] = element
              }}
              id={`${id}-${item}`}
              type="button"
              role="tab"
              aria-selected={mode === item}
              aria-controls={`${id}-panel`}
              tabIndex={mode === item ? 0 : -1}
              className={styles.tab}
              onClick={() => switchMode(item)}
              onKeyDown={onTabKey}
            >
              {t(`chatRoom.composer.${item}`)}
              {item === 'note' && noteCount > 0 && (
                <span className={styles.noteCount} aria-label={t('chatRoom.composer.noteCount', { count: noteCount })}>
                  {noteCount}
                </span>
              )}
            </button>
          ))}
          {mode === 'note' && (
            <span className={styles.privateBadge}>
              <LockKeyhole size={12} aria-hidden="true" />
              {t('chatRoom.composer.onlyYou')}
            </span>
          )}
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${mode}`}>
          {target && (
            <div className={styles.replyPreview} role="region" aria-label={t('chatRoom.composer.replyPreview')}>
              <CornerUpLeft size={16} aria-hidden="true" />
              <div>
                <strong>{t('chatRoom.composer.replyingTo', { name: target.displayName })}</strong>
                <p>{target.body.slice(0, 280)}</p>
              </div>
              <Tooltip title={t('chatRoom.composer.cancelReply')}>
                <button
                  type="button"
                  className={styles.toolButton}
                  aria-label={t('chatRoom.composer.cancelReply')}
                  onClick={onCancelReply}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </Tooltip>
            </div>
          )}
          <textarea
            ref={editor}
            className={styles.editor}
            aria-label={t(mode === 'note' ? 'chatRoom.composer.noteInput' : 'chatRoom.message')}
            aria-invalid={characterCount > CHAT_MESSAGE_LIMIT}
            aria-describedby={`${id}-hint ${id}-count`}
            placeholder={t(mode === 'note' ? 'chatRoom.composer.notePlaceholder' : 'chatRoom.messagePlaceholder')}
            rows={2}
            value={value}
            onChange={(event) => {
              setFeedback('')
              onChange(event.target.value)
            }}
            onKeyDown={onKeyDown}
            onCompositionStart={() => {
              composing.current = true
            }}
            onCompositionEnd={() => {
              composing.current = false
            }}
          />
          <div className={styles.toolbar} role="toolbar" aria-label={t('chatRoom.composer.tools')}>
            <Popover
              trigger="click"
              placement="topLeft"
              open={popover?.context === context && popover.kind === 'format'}
              onOpenChange={(open) => {
                if (!open) setPopover(undefined)
              }}
              content={
                <div ref={formatContent} className={styles.formatMenu} onKeyDown={closePopupOnEscape}>
                  <p className={styles.popoverHint}>{t('chatRoom.composer.formatHint')}</p>
                  {formats.map(([kind, Icon]) => (
                    <button
                      key={kind}
                      type="button"
                      className={styles.formatButton}
                      onMouseDown={preserveSelection}
                      onClick={() => format(kind)}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {t(`chatRoom.composer.formats.${kind}`)}
                    </button>
                  ))}
                </div>
              }
            >
              <Tooltip title={t('chatRoom.composer.format')}>
                <button
                  type="button"
                  className={styles.toolButton}
                  aria-label={t('chatRoom.composer.format')}
                  aria-expanded={popover?.context === context && popover.kind === 'format'}
                  onMouseDown={preserveSelection}
                  onClick={(event) => togglePopover('format', event.detail === 0)}
                >
                  <Type size={16} aria-hidden="true" />
                </button>
              </Tooltip>
            </Popover>
            <Popover
              trigger="click"
              placement="topLeft"
              open={popover?.context === context && popover.kind === 'emoji'}
              onOpenChange={(open) => {
                if (!open) setPopover(undefined)
              }}
              content={
                <div ref={emojiContent} className={styles.emojiMenu} onKeyDown={closePopupOnEscape}>
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`${styles.toolButton} ${styles.emojiButton}`}
                      aria-label={t('chatRoom.insertEmoji', { emoji })}
                      onMouseDown={preserveSelection}
                      onClick={() => {
                        const saved = toolAnchor.current ?? anchor()
                        setPopover(undefined)
                        apply(
                          insertComposerText(saved.value, saved.start, saved.end, emoji),
                          saved,
                          t('chatRoom.composer.emojiInserted')
                        )
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              }
            >
              <Tooltip title={t('chatRoom.emoji')}>
                <button
                  type="button"
                  className={styles.toolButton}
                  aria-label={t('chatRoom.emoji')}
                  aria-expanded={popover?.context === context && popover.kind === 'emoji'}
                  onMouseDown={preserveSelection}
                  onClick={(event) => togglePopover('emoji', event.detail === 0)}
                >
                  <Smile size={16} aria-hidden="true" />
                </button>
              </Tooltip>
            </Popover>
            <Tooltip title={t('chatRoom.composer.attachmentLink')}>
              <button
                type="button"
                className={styles.toolButton}
                aria-label={t('chatRoom.composer.attachmentLink')}
                onMouseDown={preserveSelection}
                onClick={() => openLink(true)}
              >
                <Paperclip size={16} aria-hidden="true" />
              </button>
            </Tooltip>
            <Tooltip title={t('chatRoom.composer.insertLink')}>
              <button
                type="button"
                className={styles.toolButton}
                aria-label={t('chatRoom.composer.insertLink')}
                onMouseDown={preserveSelection}
                onClick={() => openLink(false)}
              >
                <Link size={16} aria-hidden="true" />
              </button>
            </Tooltip>
            <Tooltip title={t('chatRoom.composer.writingAssistant')}>
              <button
                type="button"
                className={`${styles.toolButton} ${styles.assistantButton}`}
                aria-label={t('chatRoom.composer.writingAssistant')}
                onMouseDown={preserveSelection}
                onClick={() => {
                  setPopover(undefined)
                  setAssistant(context)
                }}
              >
                <Sparkles size={16} aria-hidden="true" />
              </button>
            </Tooltip>
            <Tooltip title={t(mode === 'note' ? 'chatRoom.composer.saveNote' : 'chatRoom.send')}>
              <button
                type="button"
                className={`${styles.toolButton} ${styles.sendButton}`}
                aria-label={t(mode === 'note' ? 'chatRoom.composer.saveNote' : 'chatRoom.send')}
                disabled={!canSubmit}
                aria-busy={busy}
                onMouseDown={preserveSelection}
                onClick={() => void submit()}
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={styles.metaLine}>
        <span id={`${id}-hint`} className={styles.hint}>
          {t(
            mode === 'note' ? 'chatRoom.composer.notePrivacy' : offline ? 'chatRoom.offlineHint' : 'chatRoom.enterHint'
          )}
        </span>
        <span
          id={`${id}-count`}
          className={styles.count}
          aria-label={t('chatRoom.composer.messageLength')}
          data-invalid={characterCount > CHAT_MESSAGE_LIMIT}
        >
          {characterCount}/{CHAT_MESSAGE_LIMIT}
        </span>
      </div>
      <div className={styles.feedback} role="status" aria-live="polite">
        {feedback}
      </div>
      {linkDialog && (
        <Modal
          open
          title={t(linkDialog.attachment ? 'chatRoom.composer.attachmentLink' : 'chatRoom.composer.insertLink')}
          onCancel={() => setLink(undefined)}
          destroyOnHidden
          footer={[
            <Button key="cancel" onClick={() => setLink(undefined)}>
              {t('chatRoom.cancel')}
            </Button>,
            <Button key="insert" type="primary" onClick={addLink}>
              {t('chatRoom.composer.addLink')}
            </Button>,
          ]}
        >
          {linkDialog.attachment && <p className={styles.dialogHint}>{t('chatRoom.composer.attachmentHint')}</p>}
          <div className={styles.dialogField}>
            <label htmlFor={`${id}-link-label`}>
              {t(linkDialog.attachment ? 'chatRoom.composer.attachmentName' : 'chatRoom.composer.linkText')}
            </label>
            <Input
              id={`${id}-link-label`}
              value={linkDialog.label}
              aria-invalid={linkDialog.error === 'requiredLabel'}
              onChange={(event) => setLink({ ...linkDialog, label: event.target.value, error: undefined })}
              autoFocus
            />
          </div>
          <div className={styles.dialogField}>
            <label htmlFor={`${id}-link-url`}>{t('chatRoom.composer.url')}</label>
            <Input
              id={`${id}-link-url`}
              type="url"
              inputMode="url"
              autoComplete="off"
              value={linkDialog.url}
              aria-invalid={linkDialog.error === 'invalidUrl'}
              onChange={(event) => setLink({ ...linkDialog, url: event.target.value, error: undefined })}
              onPressEnter={(event) => {
                if (!event.nativeEvent.isComposing && event.keyCode !== 229) addLink()
              }}
            />
          </div>
          {linkDialog.error && <Alert showIcon type="error" title={t(`chatRoom.composer.${linkDialog.error}`)} />}
        </Modal>
      )}
      {assistant === context && (
        <WritingAssistant
          key={context}
          text={value}
          onClose={() => setAssistant(undefined)}
          onOpenStudio={onOpenStudio}
        />
      )}
    </div>
  )
}
