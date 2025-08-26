import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { App as AntdApp } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
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
  <AntdApp>
    <I18nextProvider i18n={i18n}>
      <ProThemeProvider>
        <ThemeIndex />
        <Analytics />
        <SpeedInsights />
      </ProThemeProvider>
    </I18nextProvider>
  </AntdApp>
)
