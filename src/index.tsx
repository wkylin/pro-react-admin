import { StrictMode, Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { App as AntdApp } from 'antd'
import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import ErrorBoundary from '@/components/ErrorBoundary'
import WatermarkProvider from '@/components/WatermarkProvider'
import * as Sentry from '@sentry/react'
import i18n from './i18n/i18n'
import GlobalBreakpointListener from '@/components/GlobalBreakpointListener'

const patchDefinePropertyDescriptor = () => {
  try {
    const originalDefineProperty = Object.defineProperty
    const originalDefineProperties = Object.defineProperties

    const toDescriptor = (desc: unknown): PropertyDescriptor => {
      if (desc && typeof desc === 'object') return desc as PropertyDescriptor
      return {
        value: desc,
        writable: true,
        configurable: true,
        enumerable: true,
      }
    }

    Object.defineProperty = function (obj: any, prop: PropertyKey, descriptor: any) {
      return originalDefineProperty(obj, prop, toDescriptor(descriptor))
    }

    Object.defineProperties = function (obj: any, props: any) {
      if (!props || typeof props !== 'object') {
        // 保持原语义：让原实现抛错
        return originalDefineProperties(obj, props)
      }
      const normalized: Record<PropertyKey, PropertyDescriptor> = {}
      for (const key of Reflect.ownKeys(props)) {
        normalized[key] = toDescriptor(props[key])
      }
      return originalDefineProperties(obj, normalized)
    }
  } catch {
    // ignore
  }
}

patchDefinePropertyDescriptor()

const isLocalhostRuntime = () => {
  try {
    const host = window.location.hostname
    return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0'
  } catch {
    return false
  }
}

const sentryDsn = process.env.SENTRY_DSN
const shouldEnableSentry =
  process.env.NODE_ENV === 'production' &&
  !!sentryDsn &&
  !isLocalhostRuntime() &&
  localStorage.getItem('SENTRY_DISABLE') !== '1'

if (shouldEnableSentry) {
  Sentry.init({
    dsn: sentryDsn,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [/^https:\/\/wkylin\.sentry\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    // Enable logs to be sent to Sentry
    enableLogs: true,
  })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement, {
  onCaughtError: (error) => {
    console.log('caught error', error)
  },
  onUncaughtError: (error) => {
    console.log('uncaught error', error)
  },
  onRecoverableError: (error) => {
    console.log('recoverable error', error)
  },
  identifierPrefix: 'wui',
})

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

root.render(
  <StrictMode>
    <AntdApp>
      <I18nextProvider i18n={i18n}>
        <GlobalBreakpointListener />
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <ProThemeProvider>
              <WatermarkProvider content="Pro React Admin">
                <ThemeIndex />
                <VercelInsights />
              </WatermarkProvider>
            </ProThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </I18nextProvider>
    </AntdApp>
  </StrictMode>
)
