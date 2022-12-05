import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import './styles/reset.css'
import App from './App'
import themes from './theme/index'
import { useProThemeContext } from './theme/hooks'

dayjs.locale('zh-cn')

const ThemeIndex = () => {
  const { theme } = useProThemeContext() as any
  return (
    <ConfigProvider
      theme={theme === 'light' ? themes.lightTheme : themes.darkTheme}
      componentSize="middle"
      input={{ autoComplete: 'off' }}
    >
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  )
}

export default ThemeIndex
