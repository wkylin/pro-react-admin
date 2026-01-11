import { Space, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'

const { Title, Paragraph, Text } = Typography

export default function ProjectBAbout() {
  return (
    <PageContainer title="Project B / About" footer={<span></span>}>
      <Space orientation="vertical" size={12} style={{ width: '100%' }}>
        <Title level={4} style={{ margin: 0 }}>
          这是一条 Project B 的独立路由
        </Title>
        <Paragraph>
          路由定义位于 <Text code>src/projects/projectB/routers/index.jsx</Text>。
        </Paragraph>

        <Button>
          <Link to="/projectB/home">返回 Home</Link>
        </Button>
      </Space>
    </PageContainer>
  )
}
