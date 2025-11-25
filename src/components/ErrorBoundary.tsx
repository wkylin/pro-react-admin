import React from 'react'
import { Button, Result, Typography } from 'antd'
import logger from '@/utils/logger'

const { Paragraph, Text } = Typography

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
  showDetails?: boolean
  onReset?: () => void
  navigate?: (path: string) => void
}

type State = {
  hasError: boolean
  error?: Error | undefined
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown, info: unknown) {
    logger.error('ErrorBoundary caught', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    this.props.onReset?.()
  }

  handleBackHome = () => {
    if (this.props.navigate) {
      this.props.navigate('/')
    } else {
      window.location.href = '/'
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Result
            status="500"
            title="出错了"
            subTitle="抱歉，系统发生了一些意外错误。"
            extra={
              <div className="flex justify-center gap-4">
                <Button type="primary" onClick={this.handleReset}>
                  重试
                </Button>
                <Button onClick={this.handleBackHome}>返回首页</Button>
              </div>
            }
          >
            {this.props.showDetails && this.state.error && (
              <div className="desc text-left">
                <Paragraph>
                  <Text strong style={{ fontSize: 16 }}>
                    错误详情:
                  </Text>
                </Paragraph>
                <Paragraph>
                  <code className="block rounded bg-gray-100 p-2 whitespace-pre-wrap">{this.state.error.message}</code>
                </Paragraph>
              </div>
            )}
          </Result>
        </div>
      )
    }
    return this.props.children
  }
}
