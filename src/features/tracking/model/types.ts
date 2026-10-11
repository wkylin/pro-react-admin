import type { EventType, TrackEvent } from '@/lib/tracking/types'
import type { Dayjs } from 'dayjs'

export type TrackingDateRange = [Dayjs | null, Dayjs | null] | null

export interface TrackingFilters {
  eventType?: EventType
  eventName?: string
  timeRange?: TrackingDateRange
}

export interface TrackingPagination {
  current: number
  pageSize: number
  total: number
}

export type PerformanceMetric = 'fcp' | 'lcp' | 'fid' | 'cls'

export interface PerformanceStats {
  avg: number
  min: number
  max: number
  count: number
  rating?: 'good' | 'needs-improvement' | 'poor'
}

export interface TrackingEvent extends TrackEvent {
  _receivedAt?: string
  _appId?: string
  _appVersion?: string
  _sdkVersion?: string
  _clientIp?: string
  _userAgent?: string
  _sentAt?: string | null
}

export interface TrackingStats {
  total: number
  lastHourCount: number
  last24hCount: number
  last7dCount: number
  uniqueUsers24h: number
  uniqueSessions24h: number
  errorRate: number
  byType: Partial<Record<EventType, number>>
  topEvents: Array<{ name: string; count: number }>
  trend: Array<{ hour: string; count: number }>
  perfStats: Partial<Record<PerformanceMetric, PerformanceStats>>
}

export interface ApiResponse<T> {
  code: number
  data?: T
  cleared?: number
}

export interface EventsPage {
  items: TrackingEvent[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
