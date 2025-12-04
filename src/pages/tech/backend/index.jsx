import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const BackendPage = () => {
  return (
    <div className='p-4'>
      <Card>
        <Title level={2}>后端技术栈</Title>
        <Paragraph>这里是后端技术栈的相关介绍页面。</Paragraph>
      </Card>
    </div>
  )
}

export default BackendPage
