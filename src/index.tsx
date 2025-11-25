import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Analytics } from '@vercel/analytics/react'
import { App as AntdApp } from 'antd'
import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import ErrorBoundary from '@/components/ErrorBoundary'
import WatermarkProvider from '@/components/WatermarkProvider'
import i18n from './i18n/i18n'

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
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <ProThemeProvider>
              <WatermarkProvider content="Pro React Admin">
                <ThemeIndex />
                {process.env.NODE_ENV === 'production' &&
                  !window.location.hostname.includes('localhost') &&
                  !window.location.hostname.includes('127.0.0.1') && <Analytics />}
              </WatermarkProvider>
            </ProThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </I18nextProvider>
    </AntdApp>
  </StrictMode>
)
