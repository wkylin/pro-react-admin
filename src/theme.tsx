import React, { useEffect } from 'react'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import './styles/reset.css'

import App from './App'
import { useProThemeContext } from './theme/hooks'
import { useRemoveGlobalLoader } from '@hooks/useRemoveGlobalLoader'
import { setMessageInstance } from '@utils/message'
import { keepAliveManager } from '@/components/KeepAlive'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  useRemoveGlobalLoader()
  const { themeSettings } = useProThemeContext()

  // 拿到 Antd App 实例（message、notification 等）
  const { message } = AntdApp.useApp()

  useEffect(() => {
    setMessageInstance(message)
    // 调整 KeepAlive 全局策略以提升路由切换响应性：
    // - 减少 deactivateDelay（ms）以更快地回收不活跃实例
    // - 减少 keepInactiveCount 以避免保留过多隐藏 DOM 节点
    // - 降低缓存上限 limit 以减小内存占用
    try {
      keepAliveManager.setOptions({ deactivateDelay: 500, keepInactiveCount: 0, limit: 5 })
    } catch (e) {
      // 忽略在未加载 KeepAlive 时的异常
    }
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
          locale={zhCN}
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
