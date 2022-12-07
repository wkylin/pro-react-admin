import React, { createContext, useContext, useState } from 'react'

const defaultTheme: string = 'light'
type ThemeContextType = {
  myTheme: string
  setMyTheme: Function
}

const ProThemeContext = createContext<ThemeContextType | null>(null)
const useProThemeContext = () => useContext(ProThemeContext)

const ProThemeProvider = ({ children }: any) => {
  const [myTheme, setMyTheme] = useState(defaultTheme)

  return (
    <ProThemeContext.Provider
      value={{
        myTheme,
        setMyTheme,
      }}
    >
      {children}
    </ProThemeContext.Provider>
  )
}

export { ProThemeProvider, useProThemeContext }
