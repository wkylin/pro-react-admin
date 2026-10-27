import { useCallback, useEffect, useRef, useState } from 'react'
import { App } from 'antd'
import logger from '@platform/telemetry/logger'
import { getTrackingJson, TRACKING_API_BASE } from '../api/trackingApi'
import type {
  ApiResponse,
  EventsPage,
  TrackingEvent,
  TrackingFilters,
  TrackingPagination,
  TrackingStats,
} from '../model/types'

const INITIAL_PAGINATION: TrackingPagination = { current: 1, pageSize: 50, total: 0 }

const useTrackingDashboardData = () => {
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)
  const [apiErrors, setApiErrors] = useState<Partial<Record<'stats' | 'events', string>>>({})
  const [stats, setStats] = useState<TrackingStats | null>(null)
  const [events, setEvents] = useState<TrackingEvent[]>([])
  const [pagination, setPagination] = useState(INITIAL_PAGINATION)
  const [filters, setFilters] = useState<TrackingFilters>({})

  const fetchStats = useCallback(async () => {
    try {
      const response = await getTrackingJson<ApiResponse<TrackingStats>>(`${TRACKING_API_BASE}/stats`)
      if (response.code === 0 && response.data) setStats(response.data)

      setApiErrors((current) => {
        const next = { ...current }
        delete next.stats
        return next
      })
    } catch (error) {
      setApiErrors((current) => ({ ...current, stats: error instanceof Error ? error.message : String(error) }))
      logger.error('获取统计数据失败:', error)
    }
  }, [])

  const fetchEvents = useCallback(
    async (page = 1, pageSize = INITIAL_PAGINATION.pageSize) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          sort: 'timestamp',
          order: 'desc',
        })
        if (filters.eventType) params.set('eventType', filters.eventType)
        if (filters.eventName) params.set('eventName', filters.eventName)
        if (filters.timeRange?.[0] && filters.timeRange[1]) {
          params.set('startTime', String(filters.timeRange[0].valueOf()))
          params.set('endTime', String(filters.timeRange[1].valueOf()))
        }

        const response = await getTrackingJson<ApiResponse<EventsPage>>(
          `${TRACKING_API_BASE}/events?${params.toString()}`
        )
        if (response.code === 0 && response.data) {
          setEvents(response.data.items)
          setPagination({ current: page, pageSize, total: response.data.total })
        }

        setApiErrors((current) => {
          const next = { ...current }
          delete next.events
          return next
        })
      } catch (error) {
        setApiErrors((current) => ({ ...current, events: error instanceof Error ? error.message : String(error) }))
        logger.error('获取事件列表失败:', error)
      } finally {
        setLoading(false)
      }
    },
    [filters]
  )

  const pollingStateRef = useRef({ fetchStats, fetchEvents, currentPage: pagination.current })

  useEffect(() => {
    pollingStateRef.current = { fetchStats, fetchEvents, currentPage: pagination.current }
  }, [fetchEvents, fetchStats, pagination])

  useEffect(() => {
    pollingStateRef.current.fetchStats()
    pollingStateRef.current.fetchEvents()

    const timer = window.setInterval(() => {
      const { fetchStats: refreshStats, fetchEvents: refreshEvents, currentPage } = pollingStateRef.current
      refreshStats()
      if (currentPage === 1) refreshEvents()
    }, 10000)

    return () => window.clearInterval(timer)
  }, [])

  const handleRefresh = useCallback(() => {
    void fetchStats()
    void fetchEvents(pagination.current, pagination.pageSize)
    message.success('已刷新')
  }, [fetchEvents, fetchStats, message, pagination])

  const handleClearAll = useCallback(async () => {
    try {
      const response = await getTrackingJson<ApiResponse<never>>(`${TRACKING_API_BASE}/events`, { method: 'DELETE' })
      if (response.code === 0) {
        message.success(`已清空 ${response.cleared} 个事件`)
        setStats(null)
        setEvents([])
        setPagination(INITIAL_PAGINATION)
        void fetchStats()
      }
    } catch (error) {
      logger.error('清空事件失败:', error)
    }
  }, [fetchStats, message])

  return {
    loading,
    apiErrors,
    stats,
    events,
    pagination,
    filters,
    setFilters,
    fetchEvents,
    handleRefresh,
    handleClearAll,
  }
}

export default useTrackingDashboardData
