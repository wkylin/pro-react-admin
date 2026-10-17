import React, { useEffect, useMemo } from 'react'
import { RouterProvider, createHashRouter, type RouteObject } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import { useTranslation } from 'react-i18next'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import './styles/reset.css'

import RootLayout from '@app/routing/components/RootLayout'
import RouterErrorElement from '@app/routing/components/RouterErrorElement'
import rootRouter from '@routers'
import { useProThemeContext } from './theme/hooks'
import { getAccessiblePrimaryColor, getAccessibleTertiaryTextColor, getContrastingTextColor } from './theme/contrast'
import { useRemoveGlobalLoader } from '@hooks/useRemoveGlobalLoader'
import { setMessageInstance } from '@platform/feedback/message'
import ServiceWorkerUpdatePrompt from '@platform/pwa/ServiceWorkerUpdatePrompt'

dayjs.locale('zh-cn')

const ThemeIndex: React.FC = () => {
  useRemoveGlobalLoader()
  const { themeSettings, resolvedTheme } = useProThemeContext()
  const colorPrimary = getAccessiblePrimaryColor(themeSettings.colorPrimary, resolvedTheme)
  const darkMenuSelectedBg = getAccessiblePrimaryColor(colorPrimary, 'light')
  const colorTextTertiary = getAccessibleTertiaryTextColor(resolvedTheme)
  const primaryButtonText = getContrastingTextColor(colorPrimary)
  const baseAlgorithm = resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  const accessibleAlgorithm = (...args: Parameters<typeof baseAlgorithm>) => ({
    ...baseAlgorithm(...args),
    colorPrimary,
    colorPrimaryHover: colorPrimary,
    colorPrimaryActive: colorPrimary,
    colorPrimaryText: colorPrimary,
    colorPrimaryTextHover: colorPrimary,
    colorPrimaryTextActive: colorPrimary,
    colorLink: colorPrimary,
    colorLinkHover: colorPrimary,
    colorLinkActive: colorPrimary,
    colorTextTertiary,
    colorTextDescription: colorTextTertiary,
  })
  const { i18n } = useTranslation()
  const isChinese = i18n.resolvedLanguage?.startsWith('zh') ?? true
  useEffect(() => {
    dayjs.locale(isChinese ? 'zh-cn' : 'en')
  }, [isChinese])

  const { message } = AntdApp.useApp()

  useEffect(() => {
    setMessageInstance(message)
  }, [message])

  const algorithms: Array<typeof theme.defaultAlgorithm> = [accessibleAlgorithm]
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
            colorPrimary,
            colorPrimaryHover: colorPrimary,
            colorPrimaryActive: colorPrimary,
            colorPrimaryText: colorPrimary,
            colorPrimaryTextHover: colorPrimary,
            colorPrimaryTextActive: colorPrimary,
            colorLink: colorPrimary,
            colorLinkHover: colorPrimary,
            colorLinkActive: colorPrimary,
            colorTextTertiary,
            colorTextDescription: colorTextTertiary,
          },
          components: {
            Button: {
              primaryColor: primaryButtonText,
              colorLink: colorPrimary,
              colorLinkHover: colorPrimary,
              colorLinkActive: colorPrimary,
            },
            Menu: {
              itemSelectedColor: '#1f1f1f',
              darkItemSelectedBg: darkMenuSelectedBg,
            },
            Tabs: {
              itemSelectedColor: colorPrimary,
            },
          },
        }}
        componentSize="middle"
        input={{ autoComplete: 'off' }}
        prefixCls="wui-ant"
        iconPrefixCls="wui-icon"
        locale={isChinese ? zhCN : enUS}
      >
        <ServiceWorkerUpdatePrompt />
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  )
}

export default ThemeIndex
