import React, { useEffect, useMemo } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import './styles/reset.css'

import RootLayout from '@/components/RootLayout'
import RouterErrorElement from '@/components/RouterErrorElement'
import rootRouter from '@routers'
import { useProThemeContext } from './theme/hooks'
import { useRemoveGlobalLoader } from '@hooks/useRemoveGlobalLoader'
import { setMessageInstance } from '@utils/message'
import { keepAliveManager } from '@/components/KeepAlive'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  useRemoveGlobalLoader()
  const { themeSettings } = useProThemeContext()

  const { message } = AntdApp.useApp()

  useEffect(() => {
    setMessageInstance(message)
    try {
      keepAliveManager.setOptions({
        deactivateDelay: 500,
        keepInactiveCount: 0,
        limit: 5,
      })
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('keepAliveManager.setOptions failed:', e)
      }
    }
  }, [message])

  const getAlgorithm = () => {
    const algorithms = []
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkMode = themeSettings.themeMode === 'dark' || (themeSettings.themeMode === 'system' && prefersDark)
    if (isDarkMode) {
      algorithms.push(theme.darkAlgorithm)
    } else {
      algorithms.push(theme.defaultAlgorithm)
    }

    if (themeSettings.compactAlgorithm) {
      algorithms.push(theme.compactAlgorithm)
    }
    return algorithms
  }

  const router = useMemo(
    () =>
      createHashRouter([
        {
          element: <RootLayout />,
          errorElement: <RouterErrorElement />,
          children: rootRouter,
        },
      ]),
    []
  )

  return (
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
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  )
}

export default ThemeIndex
