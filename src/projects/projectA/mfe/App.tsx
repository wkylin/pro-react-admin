import { Card, Space, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import PageContainer from '@stateless/PageContainer'
import { emitMfeEvent, patchMfeSharedState, type MfeSharedMessage } from '@platform/mfe/bridge'
import RemoteScope from '@app/bootstrap/RemoteScope'

const { Paragraph, Text } = Typography

function ProjectARemoteContent() {
  return (
    <PageContainer title="ProjectA (Remote)" footer={<span></span>}>
      <Card>
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          <Paragraph style={{ marginBottom: 0 }}>
            这是通过 <Text code>Module Federation</Text> 加载的 <Text code>projectA</Text> 子应用。
          </Paragraph>
          <Space wrap>
            <Button>
              <Link to="/portal">返回 Portal</Link>
            </Button>
            <Button
              onClick={() =>
                emitMfeEvent('mfe:toast', {
                  type: 'info',
                  content: 'ProjectA -> Host：发了一条 toast',
                  from: 'projectA',
                })
              }
            >
              发 toast 给 Host
            </Button>
            <Button onClick={() => emitMfeEvent('mfe:navigate', { to: '/projectB', from: 'projectA' })}>
              让 Host 跳到 ProjectB
            </Button>
            <Button onClick={() => emitMfeEvent('mfe:ping', { from: 'projectA', at: Date.now() })}>Ping Host</Button>
            <Button
              type="primary"
              onClick={() => {
                const lastMessage: MfeSharedMessage = {
                  from: 'projectA',
                  at: Date.now(),
                  text: `hello projectB: ${Math.random().toString(16).slice(2)}`,
                }
                patchMfeSharedState({ lastMessage }, 'projectA')
              }}
            >
              写共享状态（给 ProjectB 看）
            </Button>
          </Space>
        </Space>
      </Card>
    </PageContainer>
  )
}

export default function ProjectARemoteApp() {
  return (
    <RemoteScope projectId="projectA">
      <ProjectARemoteContent />
    </RemoteScope>
  )
}
