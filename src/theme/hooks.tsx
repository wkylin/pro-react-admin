import React, { createContext, useContext, useState } from 'react'

const defaultTheme: string = 'light'
type ThemeContextType = {
  theme: string
  setTheme: Function
}

const ProThemeContext = createContext<ThemeContextType | null>(null)
const useProThemeContext = () => useContext(ProThemeContext)

const ProThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <ProThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ProThemeContext.Provider>
  )
}

export { ProThemeProvider, useProThemeContext }
