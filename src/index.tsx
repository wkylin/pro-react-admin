import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'
import i18n from './i18n/i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <I18nextProvider i18n={i18n}>
    <ProThemeProvider>
      <ThemeIndex />
    </ProThemeProvider>
  </I18nextProvider>
)
