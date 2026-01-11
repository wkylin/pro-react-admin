import { StrictMode, Suspense, useEffect, useState, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { App as AntdApp } from 'antd'
import ErrorBoundary from '@/components/ErrorBoundary'
import GlobalBreakpointListener from '@/components/GlobalBreakpointListener'
import * as Sentry from '@sentry/react'
import i18n from '@/i18n/i18n'

const isLocalhostRuntime = () => {
  try {
    const host = window.location.hostname
    return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0'
  } catch {
    return false
  }
}

const isLikelyJavaScriptResponse = (contentType: string | null) => {
  if (!contentType) return false
  const ct = contentType.toLowerCase()
  if (ct.includes('text/html')) return false
  return ct.includes('javascript') || ct.includes('ecmascript')
}

const canUseVercelInsights = async () => {
  try {
    const res = await fetch('/_vercel/insights/script.js', {
      method: 'GET',
      cache: 'no-store',
    })
    if (!res.ok) return false
    return isLikelyJavaScriptResponse(res.headers.get('content-type'))
  } catch {
    return false
  }
}

const VercelInsights = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    let cancelled = false
    void (async () => {
      const ok = await canUseVercelInsights()
      if (!cancelled) setEnabled(ok)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export type RenderAppOptions = {
  element?: HTMLElement | null
  identifierPrefix?: string
  children: ReactNode
}

export function renderApp(options: RenderAppOptions) {
  const { element = document.getElementById('root'), identifierPrefix = 'wui', children } = options

  const sentryDsn = process.env.SENTRY_DSN
  const shouldEnableSentry =
    process.env.NODE_ENV === 'production' &&
    !!sentryDsn &&
    !isLocalhostRuntime() &&
    localStorage.getItem('SENTRY_DISABLE') !== '1'

  if (shouldEnableSentry) {
    Sentry.init({
      dsn: sentryDsn,
      sendDefaultPii: true,
      integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
      tracesSampleRate: 1.0,
      tracePropagationTargets: [/^https:\/\/wkylin\.sentry\.io\/api/],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      enableLogs: true,
    })
  }

  if (!element) {
    throw new Error('renderApp: #root element not found')
  }

  const root = ReactDOM.createRoot(element as HTMLDivElement, {
    onCaughtError: (error) => {
      console.log('caught error', error)
    },
    onUncaughtError: (error) => {
      console.log('uncaught error', error)
    },
    onRecoverableError: (error) => {
      console.log('recoverable error', error)
    },
    identifierPrefix,
  })

  root.render(
    <StrictMode>
      <AntdApp>
        <I18nextProvider i18n={i18n}>
          <GlobalBreakpointListener />
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
              <VercelInsights />
            </Suspense>
          </ErrorBoundary>
        </I18nextProvider>
      </AntdApp>
    </StrictMode>
  )
}
