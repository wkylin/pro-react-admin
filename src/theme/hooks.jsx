import React, { createContext, useContext, useState, useMemo } from 'react'

const defaultTheme = 'light'

const ProThemeContext = createContext(null)
const useProThemeContext = () => useContext(ProThemeContext)

const ProThemeProvider = ({ children }) => {
  const [myTheme, setMyTheme] = useState(defaultTheme)

  const themeProvider = useMemo(
    () => ({
      myTheme,
      setMyTheme,
    }),
    [myTheme, setMyTheme]
  )
  return <ProThemeContext.Provider value={themeProvider}>{children}</ProThemeContext.Provider>
}

export { ProThemeProvider, useProThemeContext }
