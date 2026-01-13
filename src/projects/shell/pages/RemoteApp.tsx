import React, { Suspense, useEffect, useMemo } from 'react'
import { Spin, Alert, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { emitMfeEvent, onMfeEvent } from '@/mfe/bridge'

const RemoteProjectA = React.lazy(() => import('projectA/App'))
const RemoteProjectB = React.lazy(() => import('projectB/App'))

export default function RemoteApp(props: Readonly<{ remote: 'projectA' | 'projectB' }>) {
  const navigate = useNavigate()

  const Component = useMemo(() => {
    return props.remote === 'projectA' ? RemoteProjectA : RemoteProjectB
  }, [props.remote])

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
    <Suspense
      fallback={
        <div style={{ padding: 24 }}>
          <Spin />
        </div>
      }
    >
      <React.Suspense fallback={null}>
        <Component />
      </React.Suspense>
    </Suspense>
  )
}

export function RemoteLoadHint() {
  return (
    <Alert
      type="info"
      title="微前端提示"
      description="如果页面一直在加载，请确认 remote 已启动并能访问 remoteEntry.js。通信建议：优先用 Host 作为中枢（事件/共享状态），必要时再上 postMessage。"
      showIcon
    />
  )
}
