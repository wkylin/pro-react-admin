import i18next from 'i18next'

i18next.init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: true, // 防止 XSS
  },
  react: {
    useSuspense: true,
  },
  // ...existing code...
})
