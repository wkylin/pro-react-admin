import React, { useEffect } from 'react'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import './styles/reset.css'

import App from './App'
import { useProThemeContext } from './theme/hooks'
import { setMessageInstance } from '@utils/message'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  const { themeSettings } = useProThemeContext()

  // 统一自定义前缀
  ConfigProvider.config({
    prefixCls: 'wui-ant',
    iconPrefixCls: 'wui-icon',
  })

  // 拿到 Antd App 实例（message、notification 等）
  const { message } = AntdApp.useApp()

  useEffect(() => {
    setMessageInstance(message)
  }, [message])

  const getAlgorithm = () => {
    const algorithms = []
    if (themeSettings.themeMode === 'dark') {
      algorithms.push(theme.darkAlgorithm)
    } else {
      algorithms.push(theme.defaultAlgorithm)
    }

    if (themeSettings.compactAlgorithm) {
      algorithms.push(theme.compactAlgorithm)
    }
    return algorithms
  }

  return (
    <Router>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            algorithm: getAlgorithm(),
            token: {
              colorPrimary: themeSettings.colorPrimary,
            },
          }}
          componentSize="middle"
          input={{ autoComplete: 'off' }}
          prefixCls="wui-ant"
          iconPrefixCls="wui-icon"
        >
          {/* <AntdApp> */}
          <App />
          {/* </AntdApp> */}
        </ConfigProvider>
      </StyleProvider>
    </Router>
  )
}

export default ThemeIndex
