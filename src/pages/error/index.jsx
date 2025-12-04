import React, { useState } from 'react'
import { Button, Card, Typography } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const { Title, Paragraph, Text } = Typography

const MyError = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    // 模拟一个渲染错误
    const error = { error: 'error' }
    // @ts-ignore
    return error.map((item) => item)
  }

  return (
    <FixTabPanel>
      <Card title='错误边界测试' style={{ margin: 24 }}>
        <Title level={4}>ErrorBoundary 测试页面</Title>
        <Paragraph>
          点击下方按钮将触发一个渲染错误。
          <br />
          <Text type='secondary'>
            注意：在开发模式下，React 会显示红色的错误覆盖层（Error Overlay）。 你需要点击覆盖层右上角的 "X"
            关闭它，才能看到 ErrorBoundary 渲染的降级 UI。
          </Text>
        </Paragraph>
        <Button danger type='primary' onClick={() => setShouldThrow(true)}>
          触发渲染错误
        </Button>
      </Card>
    </FixTabPanel>
  )
}

export default MyError
