import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const Vue3Api = () => {
  return (
    <div className="p-4">
      <Card>
        <Title level={2}>Vue 3 API</Title>
        <Paragraph>这里是 Vue 3 API 的相关介绍页面。</Paragraph>
      </Card>
    </div>
  )
}

export default Vue3Api
