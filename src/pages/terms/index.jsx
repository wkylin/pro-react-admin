import React from 'react'
import { Layout, Typography, Card, Button, theme, Grid } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import styles from './index.module.less'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout
const { useBreakpoint } = Grid

const Terms = () => {
  const { redirectTo } = useSafeNavigate()
  const { token } = theme.useToken()
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const cssVars = {
    '--legal-bg': token.colorBgBase,
    '--legal-panel': token.colorBgContainer,
    '--legal-panel-2': token.colorBgLayout,
    '--legal-border': token.colorBorderSecondary,
    '--legal-text': token.colorText,
    '--legal-text-2': token.colorTextSecondary,
    '--legal-primary': token.colorPrimary,
    '--legal-primary-2': token.colorInfo,
    '--legal-shadow': token.boxShadowSecondary
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className={styles.root} style={cssVars}>
        <div className={styles.bg} aria-hidden='true' />

        <div className={styles.container} style={{ padding: isMobile ? 16 : 24 }}>
          <Card
            className={styles.card}
            variant='borderless'
            styles={{ body: { padding: 0, height: '100%', display: 'flex', flexDirection: 'column' } }}
          >
            <div className={styles.header}>
              <Button type='text' icon={<ArrowLeftOutlined />} onClick={() => redirectTo('/signup')}>
                返回
              </Button>
              <div className={styles.headerMeta}>
                <span className={styles.kicker}>TERMS</span>
                <span className={styles.dot} />
                <span className={styles.metaText}>Pro React Admin</span>
              </div>
            </div>

            <div className={styles.body}>
              <Title level={2} className={styles.title}>
                用户协议
              </Title>
              <Paragraph className={styles.subTitle}>
                <Text type='secondary'>最后更新日期：2025年11月25日</Text>
              </Paragraph>

              <Title level={4}>1. 服务条款的接受</Title>
              <Paragraph>
                欢迎使用 Pro React Admin
                系统。通过访问或使用本系统，您同意受本用户协议（以下简称"协议"）的约束。如果您不同意本协议的任何条款，请勿使用本系统。
              </Paragraph>

              <Title level={4}>2. 账户注册与安全</Title>
              <Paragraph>
                您在使用本系统某些功能时可能需要注册账户。您同意提供真实、准确、最新和完整的注册信息，并维护这些信息的准确性。您有责任保护您的账户密码安全，并对您账户下的所有活动负责。
              </Paragraph>

              <Title level={4}>3. 用户行为规范</Title>
              <Paragraph>
                您同意不会利用本系统进行任何非法活动，包括但不限于：
                <ul>
                  <li>发布违反法律法规的信息；</li>
                  <li>侵犯他人知识产权；</li>
                  <li>传播恶意软件或病毒；</li>
                  <li>干扰系统的正常运行。</li>
                </ul>
              </Paragraph>

              <Title level={4}>4. 知识产权</Title>
              <Paragraph>
                本系统包含的所有内容（包括但不限于文本、图形、Logo、代码）均受版权法和其他知识产权法律保护。未经授权，不得复制、修改或分发。
              </Paragraph>

              <Title level={4}>5. 免责声明</Title>
              <Paragraph>
                本系统按"原样"提供，不提供任何明示或暗示的保证。我们不对系统的适用性、可靠性或准确性做出任何承诺。
              </Paragraph>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default Terms
