import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const AngularPage = () => {
  return (
    <div className='p-4'>
      <Card>
        <Title level={2}>Angular</Title>
        <Paragraph>这里是 Angular 技术栈的相关介绍页面。</Paragraph>
      </Card>
    </div>
  )
}

export default AngularPage
