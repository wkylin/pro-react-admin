import React from 'react'
import { Layout, Typography, Card, Button, theme } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import AlignCenter from '@stateless/AlignCenter'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

const Privacy = () => {
  const { redirectTo } = useSafeNavigate()
  const {
    token: { colorBgContainer, colorBgLayout, colorText },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ backgroundColor: colorBgLayout, padding: '24px', display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: '100%',
            maxWidth: 800,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            backgroundColor: colorBgContainer,
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          styles={{
            body: {
              padding: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <div style={{ padding: '24px 40px 0 40px', flexShrink: 0 }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => redirectTo('/signup')}
              style={{ marginBottom: 16, paddingLeft: 0, color: colorText }}
            >
              返回
            </Button>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 40px 40px 40px' }}>
            <Title level={2}>隐私政策 (Privacy Policy)</Title>
            <Paragraph>
              <Text type="secondary">最后更新日期：2025年11月25日</Text>
            </Paragraph>

            <Title level={4}>1. 信息收集</Title>
            <Paragraph>
              我们可能会收集您在使用本系统时提供的个人信息，包括但不限于：
              <ul>
                <li>注册信息（如用户名、邮箱地址、手机号码）；</li>
                <li>使用日志（如访问时间、IP地址、浏览器类型）；</li>
                <li>设备信息。</li>
              </ul>
            </Paragraph>

            <Title level={4}>2. 信息使用</Title>
            <Paragraph>
              我们收集的信息将用于：
              <ul>
                <li>提供和改进我们的服务；</li>
                <li>个性化用户体验；</li>
                <li>发送服务通知和更新；</li>
                <li>保障账户安全。</li>
              </ul>
            </Paragraph>

            <Title level={4}>3. 信息共享</Title>
            <Paragraph>
              我们不会向第三方出售您的个人信息。我们仅在以下情况下共享信息：
              <ul>
                <li>获得您的明确同意；</li>
                <li>遵守法律法规要求；</li>
                <li>保护我们的合法权益。</li>
              </ul>
            </Paragraph>

            <Title level={4}>4. Cookie 技术</Title>
            <Paragraph>
              我们使用 Cookie 和类似技术来提升您的体验，记住您的偏好设置，并分析流量。您可以通过浏览器设置管理 Cookie。
            </Paragraph>

            <Title level={4}>5. 数据安全</Title>
            <Paragraph>我们采取合理的安全措施来保护您的个人信息，防止未经授权的访问、披露或丢失。</Paragraph>
          </div>
        </Card>
      </Content>
    </Layout>
  )
}

export default Privacy
