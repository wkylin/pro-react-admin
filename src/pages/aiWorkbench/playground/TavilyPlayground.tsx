import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, App, Button, Tag } from 'antd'
import { BookOpen, History, Search, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import BusinessPage from '@shared/ui/BusinessPage'
import demoAccount from '@platform/auth/mocks/enterpriseDemo'
import {
  getSessionIdentity,
  readEnterpriseSession,
  subscribeSession,
  type EnterpriseSession,
} from '@platform/auth/model/session'
import { createDefaultRequest, TavilyValidationError, validateSearchRequest, type TavilySearchRequest } from './model'
import { searchTavily, TavilyClientError } from './client'
import RequestPanel from './RequestPanel'
import ResultsPanel, { type SearchRun } from './ResultsPanel'
import { connectSearchService, disconnectSearchService, SearchConnectionError } from './connection'
import styles from './index.module.less'

type Status = 'idle' | 'connecting' | 'running' | 'success' | 'error' | 'cancelled'

export default function TavilyPlayground() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [draft, setDraft] = useState(createDefaultRequest)
  const [status, setStatus] = useState<Status>('idle')
  const [hasSession, setHasSession] = useState(() => Boolean(readEnterpriseSession()))
  const [invalidField, setInvalidField] = useState<keyof TavilySearchRequest>()
  const [failure, setFailure] = useState<{ code: string; connection?: boolean; retryAfter?: number }>()
  const [displayed, setDisplayed] = useState<SearchRun>()
  const [history, setHistory] = useState<SearchRun[]>([])
  const [ownedSession, setOwnedSession] = useState<EnterpriseSession>()
  const ownedSessionRef = useRef<EnterpriseSession | undefined>(undefined)
  const rejectedHostSession = useRef<EnterpriseSession | undefined>(undefined)
  const identityRef = useRef(getSessionIdentity())
  const sequence = useRef(0)
  const activeRequest = useRef<{ id: number; controller: AbortController; identity: string } | undefined>(undefined)
  const lastAttempt = useRef<TavilySearchRequest | undefined>(undefined)

  const getSearchSession = useCallback(() => {
    // Storage events can arrive after the current user action in another tab.
    if (getSessionIdentity() !== identityRef.current) return null
    const owned = ownedSessionRef.current
    if (owned && owned.expiresAt > Date.now()) return owned
    const host = readEnterpriseSession()
    return host && host.token !== rejectedHostSession.current?.token ? host : null
  }, [])

  const releaseConnection = useCallback(() => {
    const previous = ownedSessionRef.current
    ownedSessionRef.current = undefined
    setOwnedSession(undefined)
    if (previous) void disconnectSearchService(previous).catch(() => undefined)
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeSession(() => {
      const identity = getSessionIdentity()
      if (identity === identityRef.current) {
        setHasSession(Boolean(getSearchSession()))
        return
      }
      identityRef.current = identity
      rejectedHostSession.current = undefined
      releaseConnection()
      setHasSession(Boolean(readEnterpriseSession()))
      activeRequest.current?.controller.abort()
      activeRequest.current = undefined
      lastAttempt.current = undefined
      setDraft(createDefaultRequest())
      setDisplayed(undefined)
      setHistory([])
      setFailure(undefined)
      setInvalidField(undefined)
      setStatus('idle')
    })
    return () => {
      unsubscribe()
      activeRequest.current?.controller.abort()
      activeRequest.current = undefined
      const previous = ownedSessionRef.current
      ownedSessionRef.current = undefined
      if (previous) void disconnectSearchService(previous).catch(() => undefined)
    }
  }, [getSearchSession, releaseConnection])

  useEffect(() => {
    if (!ownedSession) return
    let timer: ReturnType<typeof setTimeout>
    const checkExpiry = () => {
      const remaining = ownedSession.expiresAt - Date.now()
      if (remaining > 0) {
        timer = setTimeout(checkExpiry, Math.min(remaining, 2_147_483_647))
        return
      }
      if (ownedSessionRef.current !== ownedSession) return
      activeRequest.current?.controller.abort()
      activeRequest.current = undefined
      releaseConnection()
      setHasSession(Boolean(getSearchSession()))
      setDisplayed(undefined)
      setHistory([])
      setFailure({ code: 'session_expired' })
      setStatus('error')
    }
    checkExpiry()
    return () => clearTimeout(timer)
  }, [getSearchSession, ownedSession, releaseConnection])

  const execute = async (candidate: TavilySearchRequest) => {
    if (activeRequest.current) return
    if (getSessionIdentity() !== identityRef.current) return
    let request: TavilySearchRequest
    try {
      request = validateSearchRequest(candidate)
    } catch (error) {
      if (error instanceof TavilyValidationError) setInvalidField(error.field)
      return
    }
    setInvalidField(undefined)
    let session = getSearchSession()
    if (!session && ownedSessionRef.current) releaseConnection()
    setHasSession(Boolean(session))
    const id = ++sequence.current
    const controller = new AbortController()
    const identity = getSessionIdentity()
    const at = Date.now()
    activeRequest.current = { id, controller, identity }
    lastAttempt.current = request
    setDraft(request)
    setInvalidField(undefined)
    setFailure(undefined)
    setDisplayed(undefined)
    setStatus(session ? 'running' : 'connecting')
    const isActive = () =>
      activeRequest.current?.id === id &&
      !controller.signal.aborted &&
      getSessionIdentity() === identity &&
      identityRef.current === identity
    try {
      if (!session) {
        const connected = await connectSearchService(demoAccount, { signal: controller.signal })
        if (!isActive()) {
          if (!('totpRequired' in connected)) void disconnectSearchService(connected).catch(() => undefined)
          return
        }
        if ('totpRequired' in connected) {
          setFailure({ code: 'secondFactorRequired', connection: true })
          setStatus('error')
          return
        }
        session = connected
        ownedSessionRef.current = connected
        setOwnedSession(connected)
        setHasSession(true)
        setHistory([])
        setStatus('running')
      }
      const response = await searchTavily(request, { signal: controller.signal, session })
      if (!isActive()) return
      const run = { id, request, response, at }
      setDisplayed(run)
      setHistory((previous) => [run, ...previous].slice(0, 5))
      setStatus('success')
    } catch (error) {
      if (activeRequest.current?.id !== id || getSessionIdentity() !== identity) return
      if ((error instanceof TavilyClientError || error instanceof SearchConnectionError) && error.code === 'aborted') {
        setStatus('cancelled')
      } else {
        if (
          error instanceof TavilyClientError &&
          ['sessionRequired', 'session_expired', 'session_revoked', 'unauthorized'].includes(error.code)
        ) {
          if (session === ownedSessionRef.current) releaseConnection()
          else if (session) rejectedHostSession.current = session
          setHasSession(Boolean(getSearchSession()))
          setHistory([])
        }
        setFailure({
          code: error instanceof TavilyClientError || error instanceof SearchConnectionError ? error.code : 'network',
          ...(error instanceof SearchConnectionError ? { connection: true } : {}),
          ...(error instanceof TavilyClientError && error.retryAfter !== undefined
            ? { retryAfter: error.retryAfter }
            : {}),
        })
        setStatus('error')
      }
    } finally {
      if (activeRequest.current?.id === id) activeRequest.current = undefined
    }
  }
  const cancel = () => {
    activeRequest.current?.controller.abort()
    activeRequest.current = undefined
    setStatus('cancelled')
  }
  const disconnect = () => {
    activeRequest.current?.controller.abort()
    activeRequest.current = undefined
    releaseConnection()
    setHasSession(Boolean(getSearchSession()))
    setDisplayed(undefined)
    setHistory([])
    setFailure(undefined)
    setStatus('idle')
  }
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      void message.success(t('tavily.copied'))
    } catch {
      void message.error(t('tavily.copyFailed'))
    }
  }
  const example = (key: 'engineering' | 'news' | 'research') => {
    if (activeRequest.current) return
    setDraft({
      ...createDefaultRequest(),
      query: t(`tavily.examples.${key}.query`),
      ...(key === 'news' ? { topic: 'news' as const, time_range: 'week' as const } : {}),
      ...(key === 'research' ? { search_depth: 'advanced' as const } : {}),
    })
    setInvalidField(undefined)
  }
  const restore = (run: SearchRun) => {
    if (activeRequest.current) return
    setDraft({
      ...run.request,
      include_domains: [...run.request.include_domains],
      exclude_domains: [...run.request.exclude_domains],
    })
    lastAttempt.current = run.request
    setDisplayed(run)
    setInvalidField(undefined)
    setFailure(undefined)
    setStatus('success')
  }
  const running = status === 'connecting' || status === 'running'
  const step =
    status === 'connecting' || (status === 'error' && failure?.connection)
      ? 0
      : running || status === 'error' || status === 'cancelled'
        ? 1
        : status === 'success'
          ? 2
          : 0
  const errorKey = `tavily.${failure?.connection ? 'connectionErrors' : 'errors'}.${failure?.code}`

  return (
    <BusinessPage
      title={t('tavily.title')}
      description={t('tavily.description')}
      eyebrow={
        <>
          <Tag>TAVILY</Tag>
          <span>{t('tavily.eyebrow')}</span>
        </>
      }
      actions={
        <Button
          href="https://docs.tavily.com/documentation/api-reference/endpoint/search"
          target="_blank"
          rel="noopener noreferrer"
          icon={<BookOpen size={15} aria-hidden="true" />}
        >
          {t('tavily.docs')}
        </Button>
      }
      className={styles.page}
    >
      <div className={styles.statusBar} data-state={status}>
        <ol className={styles.trace} aria-label={t('tavily.searchStatus')}>
          {(['configure', 'search', 'read'] as const).map((key, index) => (
            <li key={key} data-active={index === step} data-complete={index < step}>
              <span className={styles.traceDot} aria-hidden="true" />
              {t(`tavily.steps.${key}`)}
            </li>
          ))}
        </ol>
        <span className={styles.statusText} role="status" aria-live="polite">
          {t(`tavily.status.${status}`)}
        </span>
      </div>
      {failure && (
        <Alert
          type="error"
          showIcon
          title={t(i18n.exists(errorKey) ? errorKey : 'tavily.errors.network')}
          description={
            failure.connection && failure.code === 'serviceNotConfigured'
              ? t('tavily.serviceSetupHint')
              : failure.retryAfter
                ? t('tavily.retryAfter', { seconds: failure.retryAfter })
                : undefined
          }
          action={
            <Button size="small" onClick={() => void execute(lastAttempt.current ?? draft)}>
              {t('tavily.retry')}
            </Button>
          }
        />
      )}
      {status === 'cancelled' && (
        <Alert type="info" showIcon title={t('tavily.cancelledTitle')} description={t('tavily.cancelledDescription')} />
      )}
      <div className={styles.layout}>
        <RequestPanel
          draft={draft}
          running={running}
          hasSession={hasSession}
          connecting={status === 'connecting'}
          invalidField={invalidField}
          onChange={(patch) => {
            setDraft((previous) => ({ ...previous, ...patch }))
            setInvalidField(undefined)
          }}
          onRun={() => void execute(draft)}
          onCancel={cancel}
          onDisconnect={ownedSession ? disconnect : undefined}
          connectionName={ownedSession ? `${ownedSession.user.email} · ${ownedSession.tenantId}` : undefined}
          onReset={() => {
            setDraft(createDefaultRequest())
            setInvalidField(undefined)
          }}
        />
        <ResultsPanel
          draft={draft}
          run={displayed}
          running={running}
          changed={Boolean(displayed && JSON.stringify(draft) !== JSON.stringify(displayed.request))}
          onExample={example}
          onCopy={(value) => void copy(value)}
        />
        <section className={styles.history} aria-label={t('tavily.history')}>
          <div className={styles.historyHeading}>
            <h2>
              <History size={15} aria-hidden="true" />
              {t('tavily.history')}
            </h2>
            <Button
              type="text"
              size="small"
              aria-label={t('tavily.clearHistory')}
              icon={<Trash2 size={14} aria-hidden="true" />}
              disabled={!history.length || running}
              onClick={() => setHistory([])}
            />
          </div>
          <p className={styles.hint}>{t('tavily.historyHint')}</p>
          {history.map((run) => (
            <button
              key={run.id}
              type="button"
              className={styles.historyItem}
              onClick={() => restore(run)}
              disabled={running}
              aria-label={t('tavily.restore', { query: run.request.query })}
            >
              <Search size={14} aria-hidden="true" />
              <span>
                <strong>{run.request.query}</strong>
                <small>
                  {t('tavily.sourceCount', { count: run.response.results.length })} ·{' '}
                  {new Intl.DateTimeFormat(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' }).format(
                    run.at
                  )}
                </small>
              </span>
            </button>
          ))}
        </section>
      </div>
    </BusinessPage>
  )
}
