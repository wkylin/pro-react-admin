import React, { useEffect } from 'react'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import type { AliasToken } from 'antd/es/theme/interface'
import { StyleProvider } from '@ant-design/cssinjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import './styles/reset.css'

import App from './App'
import myThemes from './theme/index'
import { useProThemeContext } from './theme/hooks'
import { setMessageInstance } from '@utils/message'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  const { myTheme } = useProThemeContext()

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

  const themes = myThemes as {
    lightTheme: Partial<AliasToken>
    darkTheme: Partial<AliasToken>
  }

  return (
    <Router>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            algorithm:
              myTheme === 'light'
                ? [theme.defaultAlgorithm, theme.compactAlgorithm]
                : [theme.darkAlgorithm, theme.compactAlgorithm],
            token: myTheme === 'light' ? themes.lightTheme : themes.darkTheme,
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
