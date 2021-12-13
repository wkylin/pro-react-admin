import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ConfigProvider } from 'antd'
import reportWebVitals from './reportWebVitals'
import store from './store'
import './styles/reset.css'
// import './styles/theme.light.less'
// import './styles/theme.dark.less'
import App from './App'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/lib/locale/zh_CN'
// import enUS from 'antd/lib/locale/en_US'
// import { BrowserRouter as Router } from 'react-router-dom'
dayjs.locale('zh-cn')

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConfigProvider locale={zhCN} componentSize="middle">
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </ReduxProvider>,
  document.getElementById('root')
)

// web vitals
reportWebVitals(console.log)
