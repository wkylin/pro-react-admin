import { Suspense, useEffect } from 'react'
import { Button, Result, Spin, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'
import { emitMfeEvent, onMfeEvent } from '@/mfe/bridge'
import { remoteComponents, type RemoteName } from '../remote-components'

export default function RemoteApp(props: Readonly<{ remote: RemoteName }>) {
  const navigate = useNavigate()
  const Component = remoteComponents[props.remote]

  useEffect(() => {
    const offToast = onMfeEvent('mfe:toast', ({ type, content }) => {
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'warning':
          message.warning(content)
          break
        case 'error':
          message.error(content)
          break
        default:
          message.info(content)
      }
    })

    const offNavigate = onMfeEvent('mfe:navigate', ({ to }) => {
      navigate(to)
    })

    const offPing = onMfeEvent('mfe:ping', ({ from }) => {
      emitMfeEvent('mfe:pong', { from: 'shell', to: from, at: Date.now() })
    })

    return () => {
      offToast()
      offNavigate()
      offPing()
    }
  }, [navigate])

  return (
    <ErrorBoundary
      showDetails={false}
      fallback={
        <Result
          status="warning"
          title="远程应用暂时不可用"
          subTitle="请检查 Remote 服务和网络连接，然后刷新页面重试。"
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              刷新重试
            </Button>
          }
        />
      }
    >
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
            <Spin />
          </div>
        }
      >
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}
