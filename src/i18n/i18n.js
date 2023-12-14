import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationInZh from '../locales/zh/translation'
import translationInEn from '../locales/en/translation'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationInEn,
      },
      zh: {
        translation: translationInZh,
      },
    },
    lng: 'zh',
    fallbackLng: 'en', // 默认语言
    debug: process.env.NODE_ENV !== 'production', // 开启调试模式
    interpolation: {
      escapeValue: false, // 不转义特殊字符
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  })

export default i18n
