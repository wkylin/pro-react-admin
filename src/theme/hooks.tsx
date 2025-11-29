import React, { createContext, useContext, useState, useMemo, PropsWithChildren, useEffect } from 'react'

export type ThemeMode = 'light' | 'dark'
export type NavTheme = 'light' | 'dark'
export type LayoutMode = 'side' | 'top' | 'mix'
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
}

export interface ProThemeContextValue {
  themeSettings: ThemeSettings
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

const STORAGE_KEY = 'pro-react-admin-theme-settings'

const ProThemeProvider: React.FC<ProThemeProviderProps> = ({ children, defaultSettings: initialSettings }) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored), ...initialSettings }
      } catch (e) {
        console.error('Failed to parse theme settings from local storage', e)
      }
    }
    return { ...defaultSettings, ...initialSettings }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themeSettings))

    // Apply global styles for gray mode and color weak mode
    const html = document.documentElement
    if (themeSettings.grayMode) {
      html.style.filter = 'grayscale(1)'
    } else if (themeSettings.colorWeak) {
      html.style.filter = 'invert(80%)'
    } else {
      html.style.filter = ''
    }
  }, [themeSettings])

  const updateSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...settings }))
  }

  const themeProvider = useMemo<ProThemeContextValue>(
    () => ({ themeSettings, setThemeSettings, updateSettings }),
    [themeSettings]
  )

  return <ProThemeContext.Provider value={themeProvider}>{children}</ProThemeContext.Provider>
}

export { ProThemeProvider, useProThemeContext }
