import { useEffect, useState } from 'react'
import { Card, Space, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'
import ProjectBHero from '../components/ProjectBHero'
import { getMfeSharedState, onMfeEvent } from '@platform/mfe/bridge'
import RemoteScope from '@app/bootstrap/RemoteScope'

const { Paragraph, Text } = Typography

type SharedMessage = { from: string; text: string; at: number; to?: string }
function parseMessage(value: unknown): SharedMessage | undefined {
  if (!value || typeof value !== 'object' || !('from' in value) || !('text' in value) || !('at' in value))
    return undefined
  if (typeof value.from !== 'string' || typeof value.text !== 'string' || typeof value.at !== 'number') return undefined
  return { from: value.from, text: value.text, at: value.at }
}

function ProjectBRemoteContent() {
  const standaloneOrigin = (() => {
    const raw = (process.env.PROJECTB_STANDALONE_ORIGIN || '').toString().trim()
    const origin = raw || (typeof window !== 'undefined' ? window.location.origin : '')
    return origin.replace(/\/+$/, '')
  })()
  const standaloneAboutUrl = `${standaloneOrigin}/#/projectB/about`

  const [lastMessage, setLastMessage] = useState<SharedMessage | undefined>(() =>
    parseMessage(getMfeSharedState().lastMessage)
  )

  useEffect(() => {
    const offState = onMfeEvent('mfe:state', ({ state }) => {
      setLastMessage(parseMessage(state.lastMessage))
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

export default function ProjectBRemoteApp() {
  return (
    <RemoteScope projectId="projectB">
      <ProjectBRemoteContent />
    </RemoteScope>
  )
}
