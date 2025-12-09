import React, { useState } from 'react'
import { Button, Card, Typography, Grid, Row, Col } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const { Title, Paragraph, Text } = Typography

const MyError = () => {
  const [shouldThrow, setShouldThrow] = useState(false)
  const screens = Grid.useBreakpoint()

  if (shouldThrow) {
    // 模拟一个渲染错误
    const error = { error: 'error' }
    // @ts-ignore
    return error.map((item) => item)
  }

  return (
    <FixTabPanel>
      <div style={{ padding: screens.xs ? 16 : 24 }}>
        {/* 错误边界测试 */}
        <Card title="错误边界测试" style={{ marginBottom: 16 }} size={screens.xs ? 'small' : 'default'}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <Title level={4}>ErrorBoundary 测试页面</Title>
              <Paragraph>
                点击下方按钮将触发一个渲染错误。
                <br />
                <Text type="secondary">
                  注意：在开发模式下，React 会显示红色的错误覆盖层（Error Overlay）。 你需要点击覆盖层右上角的 "X"
                  关闭它，才能看到 ErrorBoundary 渲染的降级 UI。
                </Text>
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: screens.xs ? 'center' : 'flex-end',
                  alignItems: 'center',
                  height: screens.xs ? 'auto' : '100%',
                }}
              >
                <Button
                  danger
                  type="primary"
                  onClick={() => setShouldThrow(true)}
                  size={screens.xs ? 'large' : 'default'}
                  block={screens.xs}
                >
                  触发渲染错误
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </FixTabPanel>
  )
}

export default MyError
