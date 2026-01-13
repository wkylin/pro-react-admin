import { Card, Space, Typography, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function ProjectBHero() {
  return (
    <Card>
      <Space orientation="vertical" size={8} style={{ width: '100%' }}>
        <Space wrap>
          <Tag color="blue">Project B</Tag>
          <Tag color="geekblue">独立路由</Tag>
          <Tag color="purple">复用主模板组件</Tag>
        </Space>

        <Title level={3} style={{ margin: 0 }}>
          Project B 示例
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          这个项目位于 <Text code>src/projects/projectB</Text>，入口为 <Text code>src/projects/projectB/index.tsx</Text>
          。
        </Paragraph>
      </Space>
    </Card>
  )
}
