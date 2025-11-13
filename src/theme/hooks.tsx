import React, { createContext, useContext, useState, useMemo, PropsWithChildren } from 'react'

export type ThemeMode = 'light' | 'dark'

export interface ProThemeContextValue {
  myTheme: ThemeMode
  setMyTheme: React.Dispatch<React.SetStateAction<ThemeMode>>
}

const defaultTheme: ThemeMode = 'light'

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
  defaultMode?: ThemeMode
}>

const ProThemeProvider: React.FC<ProThemeProviderProps> = ({ children, defaultMode }) => {
  const [myTheme, setMyTheme] = useState<ThemeMode>(defaultMode ?? defaultTheme)

  const themeProvider = useMemo<ProThemeContextValue>(() => ({ myTheme, setMyTheme }), [myTheme])

  return <ProThemeContext.Provider value={themeProvider}>{children}</ProThemeContext.Provider>
}

export { ProThemeProvider, useProThemeContext }
