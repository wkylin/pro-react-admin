import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, App, Button, Modal, Skeleton, Tabs, Tag } from 'antd'
import { ArrowRight, Bug, FileText, Trash2, WandSparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import BusinessPage from '@shared/ui/BusinessPage'
import SmartChat, { type ChatMessage, type ChatMessageInput, type ChatStreamEvent } from '@wui/forms/SmartChat'
import { useAuth } from '@platform/auth/hooks/useAuth'
import { useSessionIdentity } from '@platform/auth/hooks/useSessionIdentity'
import { readEnterpriseSession, readStoredToken } from '@platform/auth/model/session'
import { useApplicationScope } from '@app/model'
import PromptEditor from './PromptEditor'
import DebugDrawer, { type DebugMetrics } from './DebugDrawer'
import { getPromptPresets, type PromptPreset } from './catalog'
import {
  DEFAULT_SETTINGS,
  FIELD_KEYS,
  buildPrompt,
  clearWorkspace,
  createEmptyFields,
  createWorkspaceStorageKey,
  loadWorkspace,
  readLegacyDraft,
  saveWorkspace,
  toSafeStreamEvent,
  type PromptFields,
  type RuntimeSettings,
  type SafeStreamEvent,
} from './model'
import { createDemoResponse } from './mockStream'
import styles from './workspace.module.less'

const EMPTY_METRICS: DebugMetrics = { requests: 0, chunks: 0, completed: 0, cancelled: 0, errors: 0, lastDurationMs: 0 }

function Workspace({ storageKey, onOpenSearch }: { storageKey: string; onOpenSearch: () => void }) {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const language = i18n.resolvedLanguage ?? i18n.language
  const presets = useMemo(() => getPromptPresets(language), [language])
  const [saved] = useState(() => {
    try {
      return loadWorkspace(localStorage, storageKey)
    } catch {
      return undefined
    }
  })
  const [fields, setFields] = useState<PromptFields>(() => saved?.fields ?? { ...presets[0].value })
  const [activePresetId, setActivePresetId] = useState(saved?.activePresetId ?? presets[0].id)
  const [settings, setSettings] = useState<RuntimeSettings>(() => saved?.settings ?? { ...DEFAULT_SETTINGS })
  const [appliedPrompt, setAppliedPrompt] = useState(saved?.appliedPrompt ?? '')
  const [section, setSection] = useState('chat')
  const [debugOpen, setDebugOpen] = useState(false)
  const [promptOpen, setPromptOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [storageFailed, setStorageFailed] = useState(false)
  const [events, setEvents] = useState<SafeStreamEvent[]>([])
  const [metrics, setMetrics] = useState<DebugMetrics>({ ...EMPTY_METRICS })
  const [initialMessages, setInitialMessages] = useState<ChatMessageInput[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [legacy] = useState(() => {
    try {
      return readLegacyDraft(localStorage)
    } catch {
      return undefined
    }
  })
  const labels = useMemo(
    () =>
      Object.fromEntries(FIELD_KEYS.map((key) => [key, t('aiTools.fields.' + key)])) as Record<
        keyof PromptFields,
        string
      >,
    [t]
  )
  const promptText = useMemo(() => buildPrompt(fields, labels), [fields, labels])

  useEffect(() => {
    try {
      const ok = settings.persistDraft
        ? saveWorkspace(localStorage, storageKey, { version: 3, fields, appliedPrompt, activePresetId, settings })
        : clearWorkspace(localStorage, storageKey)
      setStorageFailed(!ok)
    } catch {
      setStorageFailed(true)
    }
  }, [fields, appliedPrompt, activePresetId, settings, storageKey])

  const handleEvent = useCallback((event: ChatStreamEvent) => {
    const safe = toSafeStreamEvent(event)
    if (safe) setEvents((previous) => [safe, ...previous].slice(0, 40))
    if (event.type === 'start') setRunning(true)
    if (['done', 'abort', 'error'].includes(event.type)) setRunning(false)
    setMetrics((previous) => ({
      ...previous,
      requests: previous.requests + Number(event.type === 'start'),
      chunks: previous.chunks + Number(event.type === 'chunk'),
      completed: previous.completed + Number(event.type === 'done'),
      cancelled: previous.cancelled + Number(event.type === 'abort'),
      errors: previous.errors + Number(event.type === 'error'),
      lastDurationMs: ['done', 'abort', 'error'].includes(event.type)
        ? Math.max(0, event.durationMs || 0)
        : previous.lastDurationMs,
    }))
  }, [])

  const replaceDraft = (next: PromptFields, presetId: string) => {
    const previous = { fields, activePresetId }
    setFields({ ...next })
    setActivePresetId(presetId)
    void message.open({
      key: 'ai-tools-draft',
      content: (
        <span>
          {t('aiTools.draftUpdated')}{' '}
          <Button
            type="link"
            size="small"
            onClick={() => {
              setFields(previous.fields)
              setActivePresetId(previous.activePresetId)
              message.destroy('ai-tools-draft')
            }}
          >
            {t('aiTools.undo')}
          </Button>
        </span>
      ),
      duration: 6,
    })
  }
  const selectPreset = (preset: PromptPreset) => replaceDraft(preset.value, preset.id)
  const clearMessages = () => {
    const previous = messages.map((entry) => ({ ...entry, status: 'done' as const }))
    setInitialMessages([])
    setRunning(false)
    void message.open({
      key: 'ai-tools-clear',
      content: (
        <span>
          {t('aiTools.messagesCleared')}{' '}
          <Button
            type="link"
            size="small"
            onClick={() => {
              setInitialMessages(previous)
              message.destroy('ai-tools-clear')
            }}
          >
            {t('aiTools.undo')}
          </Button>
        </span>
      ),
      duration: 6,
    })
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promptText)
      void message.success(t('aiTools.copied'))
    } catch {
      void message.error(t('aiTools.copyFailed'))
    }
  }
  const fieldCount = Object.values(fields).filter((value) => value.trim()).length

  return (
    <BusinessPage
      title={t('aiTools.title')}
      description={t('aiTools.description')}
      className={styles.page}
      actions={
        <>
          <Button onClick={() => setDebugOpen(true)} icon={<Bug size={15} aria-hidden="true" />}>
            {t('aiTools.debug.title')}
          </Button>
          <Button onClick={onOpenSearch} icon={<ArrowRight size={15} aria-hidden="true" />}>
            {t('aiTools.openSearch')}
          </Button>
        </>
      }
    >
      <div className={styles.modeNotice}>
        <Tag>{t('aiTools.demo')}</Tag>
        <p>{t('aiTools.demoHint')}</p>
      </div>
      {storageFailed && <Alert type="warning" showIcon title={t('aiTools.storageFailed')} />}
      <Tabs
        activeKey={section}
        onChange={setSection}
        animated={false}
        className={styles.toolTabs}
        items={[
          {
            key: 'chat',
            label: t('aiTools.conversation'),
            forceRender: true,
            children: (
              <div className={styles.conversationGrid}>
                <div className={styles.chatPanel}>
                  <div className={styles.chatToolbar}>
                    <div>
                      <strong>{t('aiTools.currentConversation')}</strong>
                      <span>
                        {t('aiTools.messageCount', { count: messages.filter((entry) => entry.role === 'user').length })}
                      </span>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      disabled={!messages.length && !running}
                      onClick={clearMessages}
                      icon={<Trash2 size={14} aria-hidden="true" />}
                    >
                      {t('aiTools.clearMessages')}
                    </Button>
                  </div>
                  <SmartChat
                    className={styles.chat}
                    apiUrl="/api/mock/ai-workbench"
                    initialMessages={initialMessages}
                    systemPrompt={appliedPrompt}
                    onMessagesChange={setMessages}
                    onStreamEvent={handleEvent}
                    buildRequestBody={({ input, systemPrompt }) => ({ input, systemPrompt })}
                    fetcher={(_url, request, body) => {
                      const input =
                        body && typeof body === 'object' && 'input' in body && typeof body.input === 'string'
                          ? body.input
                          : ''
                      const systemPrompt =
                        body &&
                        typeof body === 'object' &&
                        'systemPrompt' in body &&
                        typeof body.systemPrompt === 'string'
                          ? body.systemPrompt
                          : ''
                      return createDemoResponse({
                        input,
                        systemPrompt,
                        settings: { ...settings },
                        language: language.startsWith('zh') ? 'zh' : 'en',
                        signal: request?.signal,
                      })
                    }}
                    welcomeTitle={t('aiTools.chatTitle')}
                    welcomeDescription={t('aiTools.chatDescription')}
                    placeholder={t('aiTools.placeholder')}
                    thoughtProcessLabel={t('aiTools.debug.reasoning')}
                    submitLabel={t('aiTools.send')}
                    stopLabel={t('aiTools.stop')}
                    labels={{
                      ready: t('aiTools.ready'),
                      streaming: t('aiTools.generating'),
                      empty: t('aiTools.emptyChat'),
                      user: t('aiTools.user'),
                      assistant: t('aiTools.assistant'),
                      system: t('aiTools.system'),
                      copy: t('aiTools.prompt.copy'),
                      copied: t('aiTools.copied'),
                      composer: t('aiTools.message'),
                      shortcut: t('aiTools.shortcut'),
                      requestError: t('aiTools.requestError'),
                      responseError: t('aiTools.responseError'),
                    }}
                  />
                </div>
                <aside className={styles.contextPanel} aria-label={t('aiTools.contextTitle')}>
                  <div className={styles.panelHeading}>
                    <FileText size={18} aria-hidden="true" />
                    <h2>{t('aiTools.contextTitle')}</h2>
                  </div>
                  {appliedPrompt ? (
                    <>
                      <Tag color="processing">{t('aiTools.prompt.applied')}</Tag>
                      <p className={styles.promptExcerpt}>{appliedPrompt}</p>
                      <div className={styles.contextActions}>
                        <Button size="small" onClick={() => setPromptOpen(true)}>
                          {t('aiTools.viewPrompt')}
                        </Button>
                        <Button size="small" onClick={() => setSection('prompt')}>
                          {t('aiTools.editPrompt')}
                        </Button>
                        <Button type="text" size="small" disabled={running} onClick={() => setAppliedPrompt('')}>
                          {t('aiTools.removePrompt')}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{t('aiTools.noPrompt')}</h3>
                      <p className={styles.description}>{t('aiTools.noPromptHint')}</p>
                      <Button onClick={() => setSection('prompt')} icon={<WandSparkles size={14} aria-hidden="true" />}>
                        {t('aiTools.choosePrompt')}
                      </Button>
                    </>
                  )}
                  <div className={styles.contextFootnote}>
                    <strong>{t('aiTools.editIndependently')}</strong>
                    <p>{t('aiTools.editIndependentlyHint')}</p>
                  </div>
                </aside>
              </div>
            ),
          },
          {
            key: 'prompt',
            label: t('aiTools.promptStudio'),
            forceRender: true,
            children: (
              <PromptEditor
                fields={fields}
                onChange={(next) => {
                  setFields(next)
                  setActivePresetId('')
                }}
                promptText={promptText}
                appliedPrompt={appliedPrompt}
                presets={presets}
                activePresetId={activePresetId}
                onSelectPreset={selectPreset}
                onApply={() => {
                  if (!running && promptText) {
                    setAppliedPrompt(promptText)
                    setSection('chat')
                    void message.success(t('aiTools.promptApplied'))
                  }
                }}
                onCopy={() => void copy()}
                onReset={() => replaceDraft(createEmptyFields(), '')}
                busy={running}
              />
            ),
          },
        ]}
      />
      <footer className={styles.workspaceFooter}>
        <span>{t(settings.persistDraft ? 'aiTools.savedOnDevice' : 'aiTools.memoryOnly')}</span>
        <span>{t('aiTools.fieldCount', { count: fieldCount })}</span>
      </footer>
      <DebugDrawer
        open={debugOpen}
        onClose={() => setDebugOpen(false)}
        settings={settings}
        onChange={(patch) => setSettings((previous) => ({ ...previous, ...patch }))}
        events={events}
        metrics={metrics}
        onClear={() => {
          setEvents([])
          setMetrics({ ...EMPTY_METRICS })
        }}
        legacyAvailable={Boolean(legacy)}
        onImportLegacy={() => {
          if (legacy) {
            replaceDraft(legacy, '')
            setSection('prompt')
            setDebugOpen(false)
          }
        }}
      />
      <Modal
        open={promptOpen}
        onCancel={() => setPromptOpen(false)}
        title={t('aiTools.appliedPromptTitle')}
        footer={null}
      >
        <pre className={styles.appliedPreview}>{appliedPrompt}</pre>
      </Modal>
    </BusinessPage>
  )
}

export default function ChatToolsWorkspace({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { t } = useTranslation()
  const { user, token, isAuthenticated, isLoading } = useAuth()
  const { projectId } = useApplicationScope()
  useSessionIdentity()
  const enterprise = readEnterpriseSession()
  // Wait for the public account metadata to catch up with a storage/session change.
  if (isLoading || !isAuthenticated || !user || token !== readStoredToken()) {
    return (
      <BusinessPage title={t('aiTools.title')}>
        <Skeleton active />
      </BusinessPage>
    )
  }
  const accountId = enterprise
    ? 'enterprise:' + enterprise.user.id
    : user.id > 0
      ? 'github:' + user.id
      : 'demo:' + user.login
  const storageKey = createWorkspaceStorageKey(projectId, accountId, enterprise?.tenantId)
  return <Workspace key={storageKey} storageKey={storageKey} onOpenSearch={onOpenSearch} />
}
