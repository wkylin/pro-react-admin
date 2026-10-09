import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import { AppstoreOutlined, DeploymentUnitOutlined, SafetyCertificateOutlined, ToolOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'

const { Paragraph, Title } = Typography

const features = [
  {
    icon: <ToolOutlined />,
    title: 'Webpack 5 构建',
    description: '开发、生产、组件库和 Storybook 使用统一的 Webpack 工具链。',
  },
  {
    icon: <DeploymentUnitOutlined />,
    title: '多项目与微前端',
    description: '通过项目入口和 Module Federation 组合独立业务模块。',
  },
  {
    icon: <AppstoreOutlined />,
    title: '可复用组件库',
    description: '按核心、有状态、无状态和埋点模块组织公开 API。',
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: '权限与运行保障',
    description: '包含路由权限、错误监控、请求管理和部署流程。',
  },
]

const AdminLanding = () => {
  const { redirectTo } = useSafeNavigate()

  return (
    <main style={{ minHeight: '100%', padding: 'clamp(24px, 6vw, 72px)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Tag color="blue">REACT 19 · WEBPACK 5</Tag>
            <Title style={{ marginTop: 12, marginBottom: 8 }}>Pro React Admin</Title>
            <Paragraph type="secondary" style={{ maxWidth: 720, fontSize: 16 }}>
              面向中后台应用的工程实践示例，覆盖多项目构建、微前端、组件复用和持续部署。
            </Paragraph>
            <Space wrap>
              <Button type="primary" onClick={() => redirectTo('/build/webpack')}>
                查看构建架构
              </Button>
              <Button href="https://github.com/wkylin/pro-react-admin" target="_blank" rel="noreferrer">
                GitHub 仓库
              </Button>
            </Space>
          </div>

          <Row gutter={[16, 16]}>
            {features.map((feature) => (
              <Col key={feature.title} xs={24} sm={12}>
                <Card>
                  <Space align="start" size="middle">
                    <span style={{ color: '#1677ff', fontSize: 20 }}>{feature.icon}</span>
                    <div>
                      <Title level={4} style={{ marginTop: 0 }}>
                        {feature.title}
                      </Title>
                      <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                        {feature.description}
                      </Paragraph>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </div>
    </main>
  )
}

export default AdminLanding
