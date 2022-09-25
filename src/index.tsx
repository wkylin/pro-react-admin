// import './wdyr' // why-did-you-render
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import '@ant-design/flowchart/dist/index.css'
// import reportWebVitals from './reportWebVitals'
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import store from './store'

import './styles/reset.css'
import App from './App'

// import enUS from 'antd/lib/locale/en_US'
dayjs.locale('zh-cn')

const themes = {
  dark: `./dark-theme.css`,
  light: `./light-theme.css`,
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <ReduxProvider store={store}>
    <ConfigProvider locale={zhCN} componentSize="middle" input={{ autoComplete: 'off' }}>
      <ThemeSwitcherProvider
        insertionPoint={document.getElementById('inject-styles-here')}
        themeMap={themes}
        defaultTheme="light"
      >
        <Router>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </Router>
      </ThemeSwitcherProvider>
    </ConfigProvider>
  </ReduxProvider>
)

// web vitals
// reportWebVitals(console.log)
