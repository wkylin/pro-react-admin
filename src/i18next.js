import i18n from 'i18next'
// import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // backend: {
    //   loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
    // },
    resources: {
      en: {
        translation: {
          demo: 'Demo',
          lang: 'En',
          home: 'Home',
        },
      },
      zh: {
        translation: {
          demo: '演示',
          lang: 'ZH',
          home: '首页',
        },
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
