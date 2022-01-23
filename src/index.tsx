import React from 'react'
import ReactDOM from 'react-dom'
// import { HashRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { ConfigProvider } from 'antd'
// import reportWebVitals from './reportWebVitals'
import store from './store'
import './styles/reset.css'
import App from './App'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/lib/locale/zh_CN'
// import enUS from 'antd/lib/locale/en_US'
dayjs.locale('zh-cn')

const themes = {
  dark: `./dark-theme.css`,
  light: `./light-theme.css`,
}

const defaultTheme = localStorage.getItem('antd-theme') ? localStorage.getItem('antd-theme') : 'light'

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConfigProvider locale={zhCN} componentSize="middle" input={{ autoComplete: 'off' }}>
      <ThemeSwitcherProvider
        insertionPoint={document.getElementById('inject-styles-here')}
        themeMap={themes}
        defaultTheme={defaultTheme || 'light'}
      >
        <Router>
          <App />
        </Router>
      </ThemeSwitcherProvider>
    </ConfigProvider>
  </ReduxProvider>,
  document.getElementById('root')
)

// web vitals
// reportWebVitals(console.log)
