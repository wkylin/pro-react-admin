import { mainLayoutMenu } from '../config/menu.config.jsx'

const normalize = (value) => {
  if (value === undefined || value === null) return ''
  return String(value).split('?')[0].trim()
}

const buildMenuPathToI18nKeyMap = () => {
  const map = new Map()

  const walk = (items) => {
    if (!Array.isArray(items)) return
    for (const item of items) {
      if (!item || typeof item !== 'object') continue

      const i18nKey = item.i18nKey
      const key = normalize(item.key)
      const path = normalize(item.path)

      if (i18nKey) {
        if (key) map.set(key, i18nKey)
        if (path) map.set(path, i18nKey)
      }

      if (Array.isArray(item.children) && item.children.length > 0) {
        walk(item.children)
      }
    }
  }

  walk(mainLayoutMenu)
  return map
}

// Build once at module load; menu config is static.
const MENU_PATH_TO_I18N_KEY = buildMenuPathToI18nKeyMap()

export const getMenuI18nKeyByPath = (pathOrKey) => {
  const normalized = normalize(pathOrKey)
  if (!normalized) return undefined

  // exact match first
  const direct = MENU_PATH_TO_I18N_KEY.get(normalized)
  if (direct) return direct

  // fallback: strip trailing slash
  if (normalized.endsWith('/')) {
    const noSlash = normalized.replace(/\/+$/, '')
    return MENU_PATH_TO_I18N_KEY.get(noSlash)
  }

  return undefined
}
