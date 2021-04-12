import React from 'react'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
// import enUS from 'antd/lib/locale/en_US'

import ProLayout from './pages/layout/index'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <ProLayout />
    </ConfigProvider>
  )
}

export default App
