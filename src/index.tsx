import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProThemeProvider } from './theme/hooks'
import ThemeIndex from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <ProThemeProvider>
    <ThemeIndex />
  </ProThemeProvider>
)
