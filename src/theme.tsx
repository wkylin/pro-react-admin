import React, { useEffect, useMemo } from 'react'
import { RouterProvider, createHashRouter, type RouteObject } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import './styles/reset.css'

import RootLayout from '@/routers/components/RootLayout'
import RouterErrorElement from '@/routers/components/RouterErrorElement'
import rootRouter from '@routers'
import { useProThemeContext } from './theme/hooks'
import { useRemoveGlobalLoader } from '@hooks/useRemoveGlobalLoader'
import { setMessageInstance } from '@platform/feedback/message'
import { keepAliveManager } from '@/platform/keep-alive'
import ServiceWorkerUpdatePrompt from '@platform/pwa/ServiceWorkerUpdatePrompt'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  useRemoveGlobalLoader()
  const { themeSettings, resolvedTheme } = useProThemeContext()

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

  const algorithms = [resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm]
  if (themeSettings.compactAlgorithm) algorithms.push(theme.compactAlgorithm)

  const router = useMemo(
    () =>
      createHashRouter([
        {
          element: <RootLayout />,
          errorElement: <RouterErrorElement />,
          children: rootRouter as RouteObject[],
        },
      ]),
    []
  )

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm: algorithms,
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
        <ServiceWorkerUpdatePrompt />
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  )
}

export default ThemeIndex
