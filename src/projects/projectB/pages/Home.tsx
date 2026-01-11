import { Space, Typography, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'
import ProjectBHero from '../components/ProjectBHero'

const { Paragraph, Text } = Typography

export default function ProjectBHome() {
  return (
    <PageContainer title="Project B / Home" footer={<span></span>}>
      <Space orientation="vertical" size={16} style={{ width: '100%' }}>
        <ProjectBHero />

        <Paragraph style={{ marginBottom: 0 }}>
          你现在看到的是 <Text code>Project B</Text> 的自定义页面（不走默认项目的 pages/router）。
        </Paragraph>

        <Divider style={{ margin: '8px 0' }} />

        <Space wrap>
          <Button type="primary">
            <Link to="/projectB/about">About（自定义路由）</Link>
          </Button>
          <Button>
            <Link to="/projectB/reuse">Reuse（复用主项目组件）</Link>
          </Button>
        </Space>
      </Space>
    </PageContainer>
  )
}
