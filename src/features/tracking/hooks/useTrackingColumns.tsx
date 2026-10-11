import { useMemo } from 'react'
import { Button, Tag, Tooltip, Typography, type TableProps } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { EventType } from '@/lib/tracking/types'
import { getEventTypeColor, getEventTypeLabel } from '../model/eventTypes'
import type { TrackingEvent } from '../model/types'

type TrackingColumns = NonNullable<TableProps<TrackingEvent>['columns']>

const { Text } = Typography

const useTrackingColumns = (onSelectEvent: (event: TrackingEvent) => void): TrackingColumns =>
  useMemo(
    () => [
      {
        title: '事件名称',
        dataIndex: 'eventName',
        key: 'eventName',
        width: 180,
        ellipsis: true,
        render: (text: string) => <Text strong>{text}</Text>,
      },
      {
        title: '类型',
        dataIndex: 'eventType',
        key: 'eventType',
        width: 100,
        render: (type: EventType) => <Tag color={getEventTypeColor(type)}>{getEventTypeLabel(type)}</Tag>,
      },
      {
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: 170,
        sorter: true,
        render: (timestamp: number) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '页面',
        dataIndex: 'pageUrl',
        key: 'pageUrl',
        width: 200,
        ellipsis: true,
        render: (url: string) => {
          try {
            const parsedUrl = new URL(url)
            return <Tooltip title={url}>{parsedUrl.pathname}</Tooltip>
          } catch {
            return (
              <Text ellipsis style={{ maxWidth: 180 }}>
                {url}
              </Text>
            )
          }
        },
      },
      {
        title: '用户',
        dataIndex: 'userId',
        key: 'userId',
        width: 100,
        render: (userId: string | undefined) => (userId ? <Text>{userId}</Text> : <Text type="secondary">匿名</Text>),
      },
      {
        title: '属性',
        dataIndex: 'properties',
        key: 'properties',
        width: 120,
        render: (properties: Record<string, unknown>) => (
          <Text type="secondary" ellipsis style={{ maxWidth: 100 }}>
            {properties ? JSON.stringify(properties).slice(0, 50) : '-'}
          </Text>
        ),
      },
      {
        title: '操作',
        key: 'action',
        width: 60,
        fixed: 'right',
        render: (_value: unknown, record: TrackingEvent) => (
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => onSelectEvent(record)} />
        ),
      },
    ],
    [onSelectEvent]
  )

export default useTrackingColumns
