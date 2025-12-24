import React from 'react'
import { Layout, Typography, Card, Button, theme } from 'antd'
import { useStore } from '@/store'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import styles from './index.module.less'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout
// global isMobile from Zustand
const Privacy = () => {
  const { redirectTo } = useSafeNavigate()
  const { token } = theme.useToken()
  const isMobile = useStore((s) => s.isMobile)

  const cssVars = {
    '--legal-bg': token.colorBgBase,
    '--legal-panel': token.colorBgContainer,
    '--legal-panel-2': token.colorBgLayout,
    '--legal-border': token.colorBorderSecondary,
    '--legal-text': token.colorText,
    '--legal-text-2': token.colorTextSecondary,
    '--legal-primary': token.colorPrimary,
    '--legal-primary-2': token.colorInfo,
    '--legal-shadow': token.boxShadowSecondary,
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className={styles.root} style={cssVars}>
        <div className={styles.bg} aria-hidden="true" />

        <div className={styles.container} style={{ padding: isMobile ? 16 : 24 }}>
          <Card
            className={styles.card}
            variant="borderless"
            styles={{
              body: {
                padding: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <div className={styles.header}>
              <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => redirectTo('/signup')}>
                返回
              </Button>
              <div className={styles.headerMeta}>
                <span className={styles.kicker}>PRIVACY</span>
                <span className={styles.dot} />
                <span className={styles.metaText}>Pro React Admin</span>
              </div>
            </div>

            <div className={styles.body}>
              <Title level={2} className={styles.title}>
                隐私政策
              </Title>
              <Paragraph className={styles.subTitle}>
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
                </ul>
              </Paragraph>

              <Title level={4}>3. 信息共享</Title>
              <Paragraph>
                我们不会向第三方出售您的个人信息。我们仅在以下情况下共享信息：
                <ul>
                  <li>获得您的明确同意；</li>
                  <li>遵守法律法规要求；</li>
                </ul>
              </Paragraph>

              <Title level={4}>4. Cookie 技术</Title>
              <Paragraph>
                我们使用 Cookie 和类似技术来提升您的体验，记住您的偏好设置，并分析流量。您可以通过浏览器设置管理
                Cookie。
              </Paragraph>

              <Title level={4}>5. 数据安全</Title>
              <Paragraph>我们采取合理的安全措施来保护您的个人信息，防止未经授权的访问、披露或丢失。</Paragraph>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default Privacy
