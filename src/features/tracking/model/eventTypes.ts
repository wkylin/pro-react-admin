import type { EventType } from '@/lib/tracking/types'

export const eventTypeColors: Record<EventType, string> = {
  pageview: '#1890ff',
  click: '#52c41a',
  exposure: '#faad14',
  scroll: '#13c2c2',
  custom: '#722ed1',
  performance: '#eb2f96',
  error: '#ff4d4f',
  input: '#2f54eb',
  share: '#fa8c16',
  video: '#a0d911',
}

export const eventTypeLabels: Record<EventType, string> = {
  pageview: '页面浏览',
  click: '点击',
  exposure: '曝光',
  scroll: '滚动',
  custom: '自定义',
  performance: '性能',
  error: '错误',
  input: '输入',
  share: '分享',
  video: '视频',
}

export const getEventTypeColor = (eventType: string) => eventTypeColors[eventType as EventType] || '#999'
export const getEventTypeLabel = (eventType: string) => eventTypeLabels[eventType as EventType] || eventType
