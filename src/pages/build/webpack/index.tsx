import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const WebpackPage = () => {
  return (
    <div className="p-4">
      <Card>
        <Title level={2}>Webpack</Title>
        <Paragraph>这里是 Webpack 构建工具的相关介绍页面。</Paragraph>
      </Card>
    </div>
  )
}

export default WebpackPage
