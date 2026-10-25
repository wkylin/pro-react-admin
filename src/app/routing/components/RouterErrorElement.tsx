import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Button, Result, Typography } from 'antd'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { useTranslation } from 'react-i18next'
import { getEnv } from '@platform/config/env'

const { Paragraph, Text } = Typography

interface RouteError {
  statusText?: string
  message?: string
  stack?: string
}

const RouterErrorElement: React.FC = () => {
  const error = useRouteError() as RouteError
  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const isDevelopment = getEnv('NODE_ENV', 'production') !== 'production'

  const handleBackHome = () => {
    redirectTo('/')
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full items-center justify-center p-4">
        <Result
          status="500"
          title={t('routerError.title')}
          subTitle={t('routerError.description')}
          extra={
            <div className="flex justify-center gap-4">
              <Button type="primary" onClick={() => window.location.reload()}>
                {t('routerError.retry')}
              </Button>
              <Button onClick={handleBackHome}>{t('routerError.backHome')}</Button>
            </div>
          }
        >
          <div className="desc text-left">
            <Paragraph>
              <Text strong style={{ fontSize: 16 }}>
                {t('routerError.details')}:
              </Text>
            </Paragraph>
            <Paragraph>
              <code className="block rounded bg-gray-100 p-2 whitespace-pre-wrap text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                {isDevelopment
                  ? error?.message || error?.statusText || t('routerError.unknown')
                  : t('routerError.detailsHidden')}
              </code>
            </Paragraph>
            {isDevelopment && error?.stack && (
              <Paragraph>
                <details>
                  <summary>{t('routerError.stackTrace')}</summary>
                  <pre className="mt-2 overflow-auto text-xs">{error.stack}</pre>
                </details>
              </Paragraph>
            )}
          </div>
        </Result>
      </div>
    </div>
  )
}

export default RouterErrorElement
