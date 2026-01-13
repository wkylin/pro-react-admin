import { Card, Space, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'

const { Paragraph, Text } = Typography

export default function Portal() {
  return (
    <PageContainer title="Micro Frontend Portal" footer={<span></span>}>
      <Card>
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          <Paragraph style={{ marginBottom: 0 }}>
            这是微前端 <Text code>Shell</Text>（Host），通过 Webpack Module Federation 动态加载子应用。
          </Paragraph>
          <Space wrap>
            <Button type="primary">
              <Link to="/projectA">打开 ProjectA（Remote）</Link>
            </Button>
            <Button type="primary">
              <Link to="/projectB">打开 ProjectB（Remote）</Link>
            </Button>
          </Space>
        </Space>
      </Card>
    </PageContainer>
  )
}
