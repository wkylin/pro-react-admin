import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Button, Result, Typography } from 'antd'
import useSafeNavigate from '@hooks/useSafeNavigate'

const { Paragraph, Text } = Typography

interface RouteError {
  statusText?: string
  message?: string
  stack?: string
}

const RouterErrorElement: React.FC = () => {
  const error = useRouteError() as RouteError
  const { redirectTo } = useSafeNavigate()

  const handleBackHome = () => {
    redirectTo('/')
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full items-center justify-center p-4">
        <Result
          status="500"
          title="出错了"
          subTitle="抱歉，系统发生了一些意外错误。"
          extra={
            <div className="flex justify-center gap-4">
              <Button type="primary" onClick={() => window.location.reload()}>
                重试
              </Button>
              <Button onClick={handleBackHome}>返回首页</Button>
            </div>
          }
        >
          <div className="desc text-left">
            <Paragraph>
              <Text strong style={{ fontSize: 16 }}>
                错误详情:
              </Text>
            </Paragraph>
            <Paragraph>
              <code className="block rounded bg-gray-100 p-2 whitespace-pre-wrap">
                {error?.message || error?.statusText || 'Unknown Error'}
              </code>
            </Paragraph>
            {error?.stack && (
              <Paragraph>
                <details>
                  <summary>Stack Trace</summary>
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
