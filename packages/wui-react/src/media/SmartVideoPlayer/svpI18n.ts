import { createInstance, type i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

import zh from './zh.json'
import en from './en.json'

export const SVP_UI_LANGUAGE_STORAGE_KEY = 'wui:svp:language'

function normalizeLang(lang: string | null | undefined) {
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
    return null
  }
}

export function setStoredSvpUiLanguage(lang: string) {
  const normalized = normalizeLang(lang)
  if (!normalized) return
  try {
    if (typeof window === 'undefined') return
    window.localStorage?.setItem?.(SVP_UI_LANGUAGE_STORAGE_KEY, normalized)
  } catch (error) {}
}

/**
 * @returns {import('i18next').i18n}
 */
export function createSvpI18n(initialLanguage = 'en', labels: Record<string, string> = {}): i18n {
  const instance = createInstance()

  instance.use(initReactI18next).init({
    lng: normalizeLang(initialLanguage) || getStoredSvpUiLanguage() || 'en',
    fallbackLng: 'en',
    supportedLngs: ['zh', 'en'],
    resources: {
      zh: { translation: { svp: { ...zh, ...labels } } },
      en: { translation: { svp: { ...en, ...labels } } },
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initAsync: false,
  })

  return instance
}
