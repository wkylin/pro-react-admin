import { StrictMode, Suspense } from 'react'
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

Sentry.init({
  dsn: 'https://3d8db323c44ddb1f24ba4ba3f60e01c6@o64827.ingest.us.sentry.io/4510499314860032',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/wkylin\.sentry\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.,
  // Enable logs to be sent to Sentry
  enableLogs: true,
})
// 发送测试消息
Sentry.captureMessage('Test message from pro-react-admin')

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
                {process.env.NODE_ENV === 'production' &&
                  !window.location.hostname.includes('localhost') &&
                  !window.location.hostname.includes('127.0.0.1') && (
                    <>
                      <Analytics />
                      <SpeedInsights />
                    </>
                  )}
              </WatermarkProvider>
            </ProThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </I18nextProvider>
    </AntdApp>
  </StrictMode>
)
