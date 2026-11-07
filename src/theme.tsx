import React, { useEffect, useMemo } from 'react'
import { RouterProvider, createHashRouter, type RouteObject } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import { useTranslation } from 'react-i18next'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import './styles/fonts.css'
import './styles/theme-tokens.generated.css'
import './styles/reset.css'
import './styles/action-links.css'

import RootLayout from '@app/routing/components/RootLayout'
import RouterErrorElement from '@app/routing/components/RouterErrorElement'
import rootRouter from '@routers'
import { useProThemeContext } from './theme/hooks'
import { createAdminTheme } from './theme/createTheme'
import ThemeFeedback from './theme/ThemeFeedback'
import { useRemoveGlobalLoader } from '@hooks/useRemoveGlobalLoader'
import ServiceWorkerUpdatePrompt from '@platform/pwa/ServiceWorkerUpdatePrompt'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  useRemoveGlobalLoader()
  const { themeSettings, resolvedTheme } = useProThemeContext()
  const { colorPrimary, compactAlgorithm } = themeSettings
  const appearance = useMemo(
    () => createAdminTheme({ colorPrimary, compactAlgorithm }, resolvedTheme),
    [colorPrimary, compactAlgorithm, resolvedTheme]
  )
  const { i18n } = useTranslation()
  const isChinese = i18n.resolvedLanguage?.startsWith('zh') ?? true
  useEffect(() => {
    dayjs.locale(isChinese ? 'zh-cn' : 'en')
  }, [isChinese])

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
        theme={appearance}
        componentSize="middle"
        input={{ autoComplete: 'off' }}
        prefixCls="wui-ant"
        iconPrefixCls="wui-icon"
        locale={isChinese ? zhCN : enUS}
      >
        <AntdApp>
          <ThemeFeedback />
          <ServiceWorkerUpdatePrompt />
          <RouterProvider router={router} />
        </AntdApp>
      </ConfigProvider>
    </StyleProvider>
  )
}

export default ThemeIndex
