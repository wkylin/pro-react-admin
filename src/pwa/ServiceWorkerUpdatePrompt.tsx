import { useEffect, useRef } from 'react'
import { App as AntdApp, Button, Flex, Typography } from 'antd'
import { PWA_UPDATE_READY_EVENT, type PwaBuildMeta, type PwaUpdateReadyDetail } from './events'

const formatBuildTime = (value?: string) => {
  if (!value) return '未知'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const buildDescription = (meta: PwaBuildMeta | null) => {
  const nextVersion = meta?.version || '未知版本'
  const nextBuildTime = formatBuildTime(meta?.buildTime)

  return (
    <Flex vertical gap={4}>
      <Typography.Text>检测到可用更新，刷新后即可切换到新版本。</Typography.Text>
      <Typography.Text type="secondary">版本号：v{nextVersion}</Typography.Text>
      <Typography.Text type="secondary">发布时间：{nextBuildTime}</Typography.Text>
    </Flex>
  )
}

const ServiceWorkerUpdatePrompt = () => {
  const { notification } = AntdApp.useApp()
  const isOpenRef = useRef(false)

  useEffect(() => {
    const handleUpdateReady = (event: Event) => {
      const customEvent = event as CustomEvent<PwaUpdateReadyDetail>
      const detail = customEvent.detail

      if (!detail?.applyUpdate || isOpenRef.current) return

      isOpenRef.current = true

      notification.open({
        key: 'pwa-update-ready',
        message: '发现新版本',
        description: buildDescription(detail.meta),
        placement: 'bottomRight',
        duration: 0,
        closeIcon: false,
        actions: (
          <Flex gap={8}>
            <Button
              size="small"
              onClick={() => {
                notification.destroy('pwa-update-ready')
                isOpenRef.current = false
              }}
            >
              稍后
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                notification.destroy('pwa-update-ready')
                void detail.applyUpdate()
              }}
            >
              立即刷新
            </Button>
          </Flex>
        ),
        onClose: () => {
          isOpenRef.current = false
        },
      })
    }

    window.addEventListener(PWA_UPDATE_READY_EVENT, handleUpdateReady as EventListener)

    return () => {
      window.removeEventListener(PWA_UPDATE_READY_EVENT, handleUpdateReady as EventListener)
    }
  }, [notification])

  return null
}

export default ServiceWorkerUpdatePrompt
