// ============================================================
// 埋点数据看板 - 类似 Sentry 的可视化面板
// ============================================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import type { ComponentProps, CSSProperties } from 'react'
import {
  Statistic,
  Row,
  Col,
  Card,
  Table,
  Tag,
  Button,
  Select,
  DatePicker,
  Space,
  Modal,
  Descriptions,
  Typography,
  message,
  Popconfirm,
  Empty,
  Segmented,
  Tooltip,
  Divider,
} from 'antd'
import type { TableProps } from 'antd'
import {
  ReloadOutlined,
  DeleteOutlined,
  BarChartOutlined,
  TableOutlined,
  ThunderboltOutlined,
  BugOutlined,
  UserOutlined,
  EyeOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import * as echarts from 'echarts'
import type { EChartsCoreOption, EChartsType } from 'echarts'
import dayjs from 'dayjs'
import logger from '@utils/logger'
import type { EventType, TrackEvent } from '../../lib/tracking/types'

const { Text, Title, Paragraph } = Typography
const { RangePicker } = DatePicker

// ==================== ECharts 轻量包装组件 ====================
interface EchartsBoxProps {
  option: EChartsCoreOption
  style?: CSSProperties
}

const EchartsBox = ({ option, style }: EchartsBoxProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<EChartsType | null>(null)

  useEffect(() => {
    if (!containerRef.current || !option) return

    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current)
    }

    chartRef.current.setOption(option, true)

    const handleResize = () => chartRef.current?.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [option])

  useEffect(() => {
    return () => {
      chartRef.current?.dispose()
      chartRef.current = null
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', ...style }} />
}

// ==================== 辅助函数 ====================
const API_BASE = '/api/tracking'

const eventTypeColors: Record<EventType, string> = {
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

const eventTypeLabels: Record<EventType, string> = {
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

type PerformanceMetric = 'fcp' | 'lcp' | 'fid' | 'cls'

interface PerformanceStats {
  avg: number
  min: number
  max: number
  count: number
  rating?: 'good' | 'needs-improvement' | 'poor'
}

interface TrackingEvent extends TrackEvent {
  _receivedAt?: string
  _appId?: string
  _appVersion?: string
  _sdkVersion?: string
  _clientIp?: string
  _userAgent?: string
  _sentAt?: string | null
}

interface TrackingStats {
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

interface ApiResponse<T> {
  code: number
  data?: T
  cleared?: number
}

interface EventsPage {
  items: TrackingEvent[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

type DateRange = Parameters<NonNullable<ComponentProps<typeof RangePicker>['onChange']>>[0]

interface Filters {
  eventType?: EventType
  eventName?: string
  timeRange?: DateRange
}

type TrackingColumns = NonNullable<TableProps<TrackingEvent>['columns']>

const getEventTypeColor = (eventType: string) => eventTypeColors[eventType as EventType] || '#999'
const getEventTypeLabel = (eventType: string) => eventTypeLabels[eventType as EventType] || eventType

const getJson = async <T,>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init)
  return response.json() as Promise<T>
}

// ==================== 主组件 ====================
const TrackingDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<TrackingStats | null>(null)
  const [events, setEvents] = useState<TrackingEvent[]>([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50, total: 0 })
  const [viewMode, setViewMode] = useState<'overview' | 'events'>('overview') // overview | events
  const [detailModal, setDetailModal] = useState<{ open: boolean; event: TrackingEvent | null }>({
    open: false,
    event: null,
  })

  // 筛选条件
  const [filters, setFilters] = useState<Filters>({
    eventType: undefined,
    eventName: undefined,
    timeRange: undefined,
  })

  // ==================== 数据加载 ====================
  const fetchStats = useCallback(async () => {
    try {
      const res = await getJson<ApiResponse<TrackingStats>>(`${API_BASE}/stats`)
      if (res.code === 0 && res.data) {
        setStats(res.data)
      }
    } catch (err) {
      logger.error('获取统计数据失败:', err)
    }
  }, [])

  const fetchEvents = useCallback(
    async (page = 1, pageSize = 50) => {
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
        if (filters.timeRange && filters.timeRange[0] && filters.timeRange[1]) {
          params.set('startTime', String(filters.timeRange[0].valueOf()))
          params.set('endTime', String(filters.timeRange[1].valueOf()))
        }

        const res = await getJson<ApiResponse<EventsPage>>(`${API_BASE}/events?${params.toString()}`)
        if (res.code === 0 && res.data) {
          setEvents(res.data.items)
          setPagination({ current: page, pageSize, total: res.data.total })
        }
      } catch (err) {
        logger.error('获取事件列表失败:', err)
      } finally {
        setLoading(false)
      }
    },
    [filters]
  )

  useEffect(() => {
    fetchStats()
    fetchEvents()
    // 每 10 秒自动刷新
    const timer = setInterval(() => {
      fetchStats()
      if (pagination.current === 1) fetchEvents()
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    fetchStats()
    fetchEvents(pagination.current, pagination.pageSize)
    message.success('已刷新')
  }

  const handleClearAll = async () => {
    try {
      const res = await getJson<ApiResponse<never>>(`${API_BASE}/events`, { method: 'DELETE' })
      if (res.code === 0) {
        message.success(`已清空 ${res.cleared} 个事件`)
        setStats(null)
        setEvents([])
        setPagination({ current: 1, pageSize: 50, total: 0 })
        fetchStats()
      }
    } catch (err) {
      logger.error('清空事件失败:', err)
    }
  }

  // ==================== 统计卡片 ====================
  const statCards = useMemo(() => {
    if (!stats) return null

    const cards = [
      {
        title: '事件总数',
        value: stats.total,
        icon: <BarChartOutlined />,
        color: '#1890ff',
        suffix: '',
      },
      {
        title: '近 24 小时',
        value: stats.last24hCount,
        icon: <LineChartOutlined />,
        color: '#52c41a',
        suffix: '',
      },
      {
        title: '独立用户 (24h)',
        value: stats.uniqueUsers24h,
        icon: <UserOutlined />,
        color: '#722ed1',
        suffix: '',
      },
      {
        title: '独立会话 (24h)',
        value: stats.uniqueSessions24h,
        icon: <DashboardOutlined />,
        color: '#13c2c2',
        suffix: '',
      },
      {
        title: '错误率 (24h)',
        value: stats.errorRate,
        icon: <BugOutlined />,
        color: stats.errorRate > 5 ? '#ff4d4f' : '#52c41a',
        suffix: '%',
      },
      {
        title: '近 1 小时',
        value: stats.lastHourCount,
        icon: <ThunderboltOutlined />,
        color: '#fa8c16',
        suffix: '',
      },
    ]

    return (
      <Row gutter={[16, 16]}>
        {cards.map((card, idx) => (
          <Col xs={12} sm={8} md={4} key={idx}>
            <Card size="small" hoverable>
              <Statistic
                title={card.title}
                value={card.value}
                suffix={card.suffix}
                prefix={card.icon}
                styles={{ value: { color: card.color, fontSize: 24 } }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }, [stats])

  // ==================== 24小时趋势图 ====================
  const trendChartOption = useMemo<EChartsCoreOption | null>(() => {
    if (!stats?.trend || stats.trend.length === 0) return null

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: 50,
        right: 20,
        top: 20,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: stats.trend.map((t) => t.hour.slice(11, 16)),
        axisLabel: {
          rotate: 45,
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name: '事件数',
      },
      series: [
        {
          name: '事件数',
          type: 'bar',
          data: stats.trend.map((t) => [t.count > 0 ? t.count : null]),
          itemStyle: {
            color: '#646cff',
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: { color: '#bd34fe' },
          },
        },
      ],
    }
  }, [stats])

  // ==================== 事件类型分布图 ====================
  const typeChartOption = useMemo<EChartsCoreOption | null>(() => {
    if (!stats?.byType) return null

    const data = Object.entries(stats.byType).map(([name, value]) => ({
      name: getEventTypeLabel(name),
      value,
      itemStyle: { color: getEventTypeColor(name) },
    }))

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { fontSize: 12 },
      },
      series: [
        {
          name: '事件类型',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
          data,
        },
      ],
    }
  }, [stats])

  // ==================== 性能指标图 (雷达图) ====================
  const perfRadarOption = useMemo<EChartsCoreOption | null>(() => {
    if (!stats?.perfStats) return null

    const metrics: PerformanceMetric[] = ['fcp', 'lcp', 'fid', 'cls']
    const indicator = metrics.map((m) => ({
      name: m.toUpperCase(),
      max: m === 'cls' ? 1 : m === 'fid' ? 500 : 5000,
    }))
    const values = metrics.map((m) => stats.perfStats[m]?.avg || 0)

    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['性能平均值'],
      },
      radar: {
        indicator,
        center: ['40%', '50%'],
        radius: '60%',
      },
      series: [
        {
          name: '性能指标',
          type: 'radar',
          data: [
            {
              value: values,
              name: '性能平均值',
              areaStyle: { color: 'rgba(100, 108, 255, 0.2)' },
              lineStyle: { color: '#646cff' },
              itemStyle: { color: '#646cff' },
            },
          ],
        },
      ],
    }
  }, [stats])

  // ==================== 事件表格列 ====================
  const columns = useMemo<TrackingColumns>(
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
            const u = new URL(url)
            return <Tooltip title={url}>{u.pathname}</Tooltip>
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
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setDetailModal({ open: true, event: record })}
          />
        ),
      },
    ],
    []
  )

  // ==================== Top 事件排行榜 ====================
  const topEventsList = useMemo(() => {
    if (!stats?.topEvents || stats.topEvents.length === 0) return null
    return (
      <div>
        {stats.topEvents.map((item, idx) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 0',
            }}
          >
            <span>
              <Tag>{idx + 1}</Tag>
              <Text>{item.name}</Text>
            </span>
            <Text type="secondary">{item.count}</Text>
          </div>
        ))}
      </div>
    )
  }, [stats])

  // ==================== 渲染 ====================
  return (
    <div style={{ padding: 24, minHeight: '100vh' }}>
      {/* 头部 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0 }}>
            <RadarChartOutlined style={{ marginRight: 12, color: '#646cff' }} />
            埋点数据看板
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
            实时查看前端埋点事件、性能指标与错误监控
          </Paragraph>
        </div>
        <Space>
          <Segmented
            options={[
              { label: '概览', value: 'overview', icon: <DashboardOutlined /> },
              { label: '事件列表', value: 'events', icon: <TableOutlined /> },
            ]}
            value={viewMode}
            onChange={(value) => setViewMode(value as 'overview' | 'events')}
          />
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            刷新
          </Button>
          <Popconfirm title="确认清空所有埋点数据？" onConfirm={handleClearAll}>
            <Button icon={<DeleteOutlined />} danger>
              清空
            </Button>
          </Popconfirm>
        </Space>
      </div>

      {/* 统计卡片 */}
      {statCards}

      <Divider />

      {/* 概览视图 */}
      {viewMode === 'overview' && (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="24 小时事件趋势" size="small">
                {trendChartOption ? (
                  <EchartsBox option={trendChartOption} style={{ height: 300 }} />
                ) : (
                  <Empty description="暂无趋势数据" />
                )}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="事件类型分布" size="small">
                {typeChartOption ? (
                  <EchartsBox option={typeChartOption} style={{ height: 300 }} />
                ) : (
                  <Empty description="暂无分类数据" />
                )}
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <ThunderboltOutlined />
                    性能指标 (Web Vitals)
                  </Space>
                }
                size="small"
              >
                {perfRadarOption ? (
                  <EchartsBox option={perfRadarOption} style={{ height: 300 }} />
                ) : (
                  <Empty description="暂无性能数据" />
                )}
                {stats?.perfStats && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                    {Object.entries(stats.perfStats).map(([key, val]) => (
                      <Card key={key} size="small" style={{ flex: 1, minWidth: 120 }}>
                        <Statistic
                          title={key.toUpperCase()}
                          value={val.avg}
                          suffix={key === 'cls' ? '' : 'ms'}
                          precision={key === 'cls' ? 3 : 0}
                          styles={{
                            value: {
                              color:
                                val.rating === 'good'
                                  ? '#52c41a'
                                  : val.rating === 'needs-improvement'
                                    ? '#faad14'
                                    : '#ff4d4f',
                            },
                          }}
                        />
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="🔥 Top 10 事件排行" size="small">
                {topEventsList || <Empty description="暂无事件数据" />}
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* 事件列表视图 */}
      {viewMode === 'events' && (
        <>
          {/* 筛选栏 */}
          <Card size="small" style={{ marginBottom: 16 }}>
            <Space wrap>
              <Select
                placeholder="事件类型"
                allowClear
                value={filters.eventType}
                onChange={(v) => setFilters({ ...filters, eventType: v })}
                style={{ minWidth: 140 }}
                options={Object.entries(eventTypeLabels).map(([value, label]) => ({ value, label }))}
              />
              <RangePicker
                showTime
                placeholder={['开始时间', '结束时间']}
                onChange={(dates) => setFilters({ ...filters, timeRange: dates })}
              />
              <Button type="primary" onClick={() => fetchEvents(1, pagination.pageSize)}>
                查询
              </Button>
              <Button
                onClick={() => {
                  setFilters({ eventType: undefined, eventName: undefined, timeRange: undefined })
                  fetchEvents(1, 50)
                }}
              >
                重置
              </Button>
            </Space>
          </Card>

          {/* 事件表格 */}
          <Card size="small">
            <Table
              rowKey="eventId"
              columns={columns}
              dataSource={events}
              loading={loading}
              size="small"
              scroll={{ x: 900 }}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条`,
                onChange: (page, pageSize) => fetchEvents(page, pageSize),
              }}
              locale={{ emptyText: <Empty description="暂无事件，请确认埋点 SDK 已初始化" /> }}
            />
          </Card>
        </>
      )}

      {/* 事件详情 Modal */}
      <Modal
        title="事件详情"
        open={detailModal.open}
        onCancel={() => setDetailModal({ open: false, event: null })}
        footer={null}
        width={700}
      >
        {detailModal.event && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="事件 ID">
              <Text copyable>{detailModal.event.eventId}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="事件名称">
              <Text strong>{detailModal.event.eventName}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="事件类型">
              <Tag color={eventTypeColors[detailModal.event.eventType]}>
                {eventTypeLabels[detailModal.event.eventType] || detailModal.event.eventType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="时间">
              {dayjs(detailModal.event.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')}
            </Descriptions.Item>
            <Descriptions.Item label="页面 URL">
              <Text copyable style={{ fontSize: 12 }}>
                {detailModal.event.pageUrl}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="页面标题">{detailModal.event.pageTitle}</Descriptions.Item>
            <Descriptions.Item label="来源">{detailModal.event.referrer || '- (直接访问)'}</Descriptions.Item>
            <Descriptions.Item label="用户 ID">
              {detailModal.event.userId || <Text type="secondary">未登录</Text>}
            </Descriptions.Item>
            <Descriptions.Item label="设备 ID">
              <Text code copyable>
                {detailModal.event.anonymousId}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="会话 ID">
              <Text code>{detailModal.event.sessionId}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="客户端 IP">{detailModal.event._clientIp || '-'}</Descriptions.Item>
            <Descriptions.Item label="User Agent">
              <Text style={{ fontSize: 11, wordBreak: 'break-all' }}>{detailModal.event._userAgent || '-'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="设备信息">
              <Text style={{ fontSize: 11 }}>
                {detailModal.event.context
                  ? `${detailModal.event.context.screenWidth}x${detailModal.event.context.screenHeight} @${detailModal.event.context.devicePixelRatio}x | ${detailModal.event.context.platform} | ${detailModal.event.context.language}`
                  : '-'}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="自定义属性">
              <pre
                style={{
                  maxHeight: 300,
                  overflow: 'auto',
                  fontSize: 11,
                  background: '#f5f5f5',
                  padding: 12,
                  borderRadius: 6,
                  margin: 0,
                }}
              >
                {JSON.stringify(detailModal.event.properties, null, 2)}
              </pre>
            </Descriptions.Item>
            <Descriptions.Item label="服务端信息">
              <Text style={{ fontSize: 11 }}>
                收到时间: {detailModal.event._receivedAt || '-'}
                <br />
                App: {detailModal.event._appId}@{detailModal.event._appVersion}
                <br />
                SDK: {detailModal.event._sdkVersion}
                <br />
                发送时间: {detailModal.event._sentAt || '-'}
              </Text>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default TrackingDashboard
