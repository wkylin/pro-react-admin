import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import './styles/reset.css'

import App from './App'
import myThemes from './theme/index'
import { useProThemeContext } from './theme/hooks'

dayjs.locale('zh-cn')

const ThemeIndex = () => {
  const { myTheme } = useProThemeContext() as any
  ConfigProvider.config({
    prefixCls: 'wui-ant',
    iconPrefixCls: 'wui-icon',
  })
  return (
    <Router>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            algorithm:
              myTheme === 'light'
                ? [theme.defaultAlgorithm, theme.compactAlgorithm]
                : [theme.darkAlgorithm, theme.compactAlgorithm],
            token: myTheme === 'light' ? myThemes.lightTheme : myThemes.darkTheme,
          }}
          componentSize="middle"
          input={{ autoComplete: 'off' }}
          prefixCls="wui-ant"
          iconPrefixCls="wui-icon"
        >
          <App />
        </ConfigProvider>
      </StyleProvider>
    </Router>
  )
}

export default ThemeIndex
