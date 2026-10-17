import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  type PropsWithChildren,
} from 'react'
import type { LayoutMode } from '@layouts/types'
import { useApplicationScope } from '@app/model'
import { getAccessiblePrimaryColor } from './contrast'

export type ThemeMode = 'light' | 'dark' | 'system'
export type NavTheme = 'light' | 'dark'
export type { LayoutMode } from '@layouts/types'
export type ContentWidth = 'Fluid' | 'Fixed'

export interface ThemeSettings {
  themeMode: ThemeMode
  navTheme: NavTheme
  colorPrimary: string
  layout: LayoutMode
  contentWidth: ContentWidth
  fixedHeader: boolean
  fixSiderbar: boolean
  colorWeak: boolean
  grayMode: boolean
  compactAlgorithm: boolean
  pointerMove: boolean
  magicTrail: boolean
}

export const defaultSettings: ThemeSettings = {
  themeMode: 'light',
  navTheme: 'light',
  colorPrimary: '#1677ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  grayMode: false,
  compactAlgorithm: false,
  pointerMove: false,
  magicTrail: false,
}

export interface ProThemeContextValue {
  themeSettings: ThemeSettings
  resolvedTheme: 'light' | 'dark'
  setThemeSettings: React.Dispatch<React.SetStateAction<ThemeSettings>>
  updateSettings: (settings: Partial<ThemeSettings>) => void
}

const ProThemeContext = createContext<ProThemeContextValue | null>(null)

// 保证外部获取到的是非空上下文；若未包裹 Provider 则抛错，便于开发期发现问题
const useProThemeContext = (): ProThemeContextValue => {
  const ctx = useContext(ProThemeContext)
  if (!ctx) {
    throw new Error('useProThemeContext must be used within ProThemeProvider')
  }
  return ctx
}

type ProThemeProviderProps = PropsWithChildren<{
  defaultSettings?: Partial<ThemeSettings>
}>

const ProThemeProvider: React.FC<ProThemeProviderProps> = ({ children, defaultSettings: initialSettings }) => {
  const { projectId } = useApplicationScope()
  const storageKey = `pro-react-admin:${projectId}:theme`
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
  )
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored), ...initialSettings }
      }
    } catch (e) {
      console.warn('Theme preferences unavailable', e)
    }
    return { ...defaultSettings, ...initialSettings }
  })

  const resolvedTheme: 'light' | 'dark' =
    themeSettings.themeMode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : themeSettings.themeMode
  const accessiblePrimaryColor = getAccessiblePrimaryColor(themeSettings.colorPrimary, resolvedTheme)

  useLayoutEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(themeSettings))
    } catch {
      /* Session preferences still work. */
    }

    // Apply global styles for gray mode and color weak mode
    const html = document.documentElement

    // Publish contrast-safe CSS values before exposing the next theme to global styles.
    html.style.setProperty('--pro-accessible-primary-color', accessiblePrimaryColor)
    html.dataset.theme = resolvedTheme

    if (themeSettings.grayMode) {
      html.style.filter = 'grayscale(1)'
    } else if (themeSettings.colorWeak) {
      html.style.filter = 'invert(80%)'
    } else {
      html.style.filter = ''
    }
  }, [themeSettings, resolvedTheme, storageKey, accessiblePrimaryColor])

  // Keep Ant Design, CSS variables and Tailwind dark: utilities in sync with OS changes.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches)
    if (mql.addEventListener) mql.addEventListener('change', handler)
    else if ((mql as any).addListener) (mql as any).addListener(handler)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler)
      else if ((mql as any).removeListener) (mql as any).removeListener(handler)
    }
  }, [])

  const updateSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...settings }))
  }

  const themeProvider = useMemo<ProThemeContextValue>(
    () => ({ themeSettings, resolvedTheme, setThemeSettings, updateSettings }),
    [themeSettings, resolvedTheme]
  )

  return <ProThemeContext.Provider value={themeProvider}>{children}</ProThemeContext.Provider>
}

export { ProThemeProvider, useProThemeContext }

// 可选的主题 Hook：当未被 Provider 包裹时返回 null（不会抛错）
export const useOptionalProThemeContext = (): ProThemeContextValue | null => {
  return useContext(ProThemeContext)
}
