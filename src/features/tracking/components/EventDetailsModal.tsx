import dayjs from 'dayjs'
import { Descriptions, Modal, Tag, Typography } from 'antd'
import { eventTypeColors, eventTypeLabels } from '../model/eventTypes'
import type { TrackingEvent } from '../model/types'

interface EventDetailsModalProps {
  open: boolean
  event: TrackingEvent | null
  onClose: () => void
}

const { Text } = Typography

const EventDetailsModal = ({ open, event, onClose }: EventDetailsModalProps) => {
  const detailItems = event
    ? [
        { key: 'eventId', label: '事件 ID', children: <Text copyable>{event.eventId}</Text> },
        { key: 'eventName', label: '事件名称', children: <Text strong>{event.eventName}</Text> },
        {
          key: 'eventType',
          label: '事件类型',
          children: (
            <Tag color={eventTypeColors[event.eventType]}>{eventTypeLabels[event.eventType] || event.eventType}</Tag>
          ),
        },
        {
          key: 'timestamp',
          label: '时间',
          children: dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
        },
        {
          key: 'pageUrl',
          label: '页面 URL',
          children: (
            <Text copyable style={{ fontSize: 12 }}>
              {event.pageUrl}
            </Text>
          ),
        },
        { key: 'pageTitle', label: '页面标题', children: event.pageTitle },
        { key: 'referrer', label: '来源', children: event.referrer || '- (直接访问)' },
        {
          key: 'userId',
          label: '用户 ID',
          children: event.userId || <Text type="secondary">未登录</Text>,
        },
        {
          key: 'anonymousId',
          label: '设备 ID',
          children: (
            <Text code copyable>
              {event.anonymousId}
            </Text>
          ),
        },
        { key: 'sessionId', label: '会话 ID', children: <Text code>{event.sessionId}</Text> },
        { key: 'clientIp', label: '客户端 IP', children: event._clientIp || '-' },
        {
          key: 'userAgent',
          label: 'User Agent',
          children: <Text style={{ fontSize: 11, wordBreak: 'break-all' }}>{event._userAgent || '-'}</Text>,
        },
        {
          key: 'deviceInfo',
          label: '设备信息',
          children: (
            <Text style={{ fontSize: 11 }}>
              {event.context
                ? `${event.context.screenWidth}x${event.context.screenHeight} @${event.context.devicePixelRatio}x | ${event.context.platform} | ${event.context.language}`
                : '-'}
            </Text>
          ),
        },
        {
          key: 'properties',
          label: '自定义属性',
          children: (
            <pre
              style={{
                maxHeight: 300,
                overflow: 'auto',
                fontSize: 11,
                background: 'var(--wui-bg-subtle)',
                padding: 12,
                borderRadius: 6,
                margin: 0,
              }}
            >
              {JSON.stringify(event.properties, null, 2)}
            </pre>
          ),
        },
        {
          key: 'serverInfo',
          label: '服务端信息',
          children: (
            <Text style={{ fontSize: 11 }}>
              收到时间: {event._receivedAt || '-'}
              <br />
              App: {event._appId}@{event._appVersion}
              <br />
              SDK: {event._sdkVersion}
              <br />
              发送时间: {event._sentAt || '-'}
            </Text>
          ),
        },
      ]
    : []

  return (
    <Modal title="事件详情" open={open} onCancel={onClose} footer={null} width={700}>
      {event && <Descriptions column={1} bordered size="small" items={detailItems} />}
    </Modal>
  )
}

export default EventDetailsModal
