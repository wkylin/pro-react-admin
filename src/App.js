import React from 'react'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
// import enUS from 'antd/lib/locale/en_US'

import Home from './pages/home/index'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Home />
    </ConfigProvider>
  )
}

export default App
