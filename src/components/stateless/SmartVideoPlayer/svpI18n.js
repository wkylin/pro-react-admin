import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'

import zh from '@/locales/zh/translation.js'
import en from '@/locales/en/translation.js'

export const SVP_UI_LANGUAGE_STORAGE_KEY = 'svpUiLanguage'

function normalizeLang(lang) {
  const v = (lang || '').toString().toLowerCase()
  let result = null
  if (v.startsWith('zh')) {
    result = 'zh'
  } else if (v.startsWith('en')) {
    result = 'en'
  }
  return result
}

export function getStoredSvpUiLanguage() {
  try {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage?.getItem?.(SVP_UI_LANGUAGE_STORAGE_KEY)
    return normalizeLang(raw)
  } catch (error) {
    console.log('error', error)
    return null
  }
}

export function setStoredSvpUiLanguage(lang) {
  const normalized = normalizeLang(lang)
  if (!normalized) return
  try {
    if (typeof window === 'undefined') return
    window.localStorage?.setItem?.(SVP_UI_LANGUAGE_STORAGE_KEY, normalized)
  } catch (error) {
    console.log('error', error)
  }
}

export function createSvpI18n(initialLanguage = 'zh') {
  const instance = createInstance()

  instance.use(initReactI18next).init({
    lng: getStoredSvpUiLanguage() || normalizeLang(initialLanguage) || 'zh',
    fallbackLng: 'en',
    supportedLngs: ['zh', 'en'],
    resources: {
      zh: { translation: { svp: zh?.svp || {} } },
      en: { translation: { svp: en?.svp || {} } },
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: false,
  })

  return instance
}
