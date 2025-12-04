import React from 'react'
import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const VuePerf = () => {
  return (
    <div className='p-4'>
      <Card>
        <Title level={2}>Vue 性能优化</Title>
        <Paragraph>这里是 Vue 性能优化的相关介绍页面。</Paragraph>
      </Card>
    </div>
  )
}

export default VuePerf
