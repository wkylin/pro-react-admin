import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import './styles/reset.css'
import App from './App'

dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <ConfigProvider componentSize="middle" input={{ autoComplete: 'off' }}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
)
