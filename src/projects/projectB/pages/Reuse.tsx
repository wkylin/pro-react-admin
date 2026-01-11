import { Card, Space, Typography, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'
import CopyToClipboard from '@stateless/CopyToClipboard'
import GradientStats from '@stateless/GradientStats'

const { Paragraph, Text } = Typography

export default function ProjectBReuse() {
  const [msgApi, holder] = message.useMessage()
  const snippet = 'PROJECT=projectB npm run build:production:projectB'

  return (
    <PageContainer title="Project B / Reuse" footer={<span></span>}>
      {holder}
      <Space orientation="vertical" size={16} style={{ width: '100%' }}>
        <Card title="复用主项目的组件（@stateless/*）">
          <Space orientation="vertical" size={10} style={{ width: '100%' }}>
            <Paragraph style={{ marginBottom: 0 }}>
              这里直接复用 <Text code>@stateless/CopyToClipboard</Text> 和 <Text code>@stateless/GradientStats</Text>。
            </Paragraph>

            <Space align="center">
              <Text code>{snippet}</Text>
              <CopyToClipboard code={snippet} />
              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(snippet)
                    msgApi.success('已复制构建命令')
                  } catch {
                    msgApi.error('复制失败（浏览器权限/协议限制）')
                  }
                }}
              >
                复制
              </Button>
            </Space>

            <GradientStats items={['120+', 'RBAC', 'KeepAlive', 'Vite/Webpack']} />
          </Space>
        </Card>

        <Button>
          <Link to="/projectB/home">返回 Home</Link>
        </Button>
      </Space>
    </PageContainer>
  )
}
