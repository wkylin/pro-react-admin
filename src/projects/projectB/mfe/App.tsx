import { useEffect, useState } from 'react'
import { Card, Space, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'
import ProjectBHero from '../components/ProjectBHero'
import { getMfeSharedState, onMfeEvent } from '@/mfe/bridge'

const { Paragraph, Text } = Typography

export default function ProjectBRemoteApp() {
  const standaloneOrigin = (() => {
    const raw = (process.env.PROJECTB_STANDALONE_ORIGIN || '').toString().trim()
    const origin = raw || (typeof window !== 'undefined' ? window.location.origin : '')
    return origin.replace(/\/+$/, '')
  })()
  const standaloneAboutUrl = `${standaloneOrigin}/#/projectB/about`

  const [lastMessage, setLastMessage] = useState<any>(() => (getMfeSharedState() as any).lastMessage)

  useEffect(() => {
    const offState = onMfeEvent('mfe:state', ({ state }) => {
      setLastMessage((state as any).lastMessage)
    })
    const offPong = onMfeEvent('mfe:pong', ({ from, to }) => {
      if (to !== 'projectB') return
      setLastMessage({ from, to, at: Date.now(), text: '收到 pong（Host 响应链路正常）' })
    })

    return () => {
      offState()
      offPong()
    }
  }, [])

  return (
    <PageContainer title="ProjectB (Remote)" footer={<span></span>}>
      <Space orientation="vertical" size={16} style={{ width: '100%' }}>
        <ProjectBHero />
        <Card>
          <Space orientation="vertical" size={10} style={{ width: '100%' }}>
            <Paragraph style={{ marginBottom: 0 }}>
              这是通过 <Text code>Module Federation</Text> 加载的 <Text code>projectB</Text> 子应用（Remote）。
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              远程通信演示（从共享状态读取）：<Text code>{lastMessage ? JSON.stringify(lastMessage) : '暂无'}</Text>
            </Paragraph>
            <Space wrap>
              <Button>
                <Link to="/portal">返回 Portal</Link>
              </Button>
              <Button type="primary">
                <a href={standaloneAboutUrl} target="_blank" rel="noreferrer">
                  打开 Standalone 的 About
                </a>
              </Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </PageContainer>
  )
}
