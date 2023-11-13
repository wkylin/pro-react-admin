import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // lng: 'zh',
    fallbackLng: 'zh', // 默认语言
    debug: process.env.NODE_ENV === 'production', // 开启调试模式
    interpolation: {
      escapeValue: false, // 不转义特殊字符
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  })
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <ProThemeProvider>
    <ThemeIndex />
  </ProThemeProvider>
)
