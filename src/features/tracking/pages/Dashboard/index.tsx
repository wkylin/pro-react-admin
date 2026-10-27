// ============================================================
// 埋点数据看板 - 类似 Sentry 的可视化面板
// ============================================================

import { useState, useCallback, useMemo } from 'react'
import {
  Alert,
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
  Typography,
  Popconfirm,
  Empty,
  Segmented,
  Divider,
} from 'antd'
import {
  ReloadOutlined,
  DeleteOutlined,
  BarChartOutlined,
  TableOutlined,
  ThunderboltOutlined,
  BugOutlined,
  UserOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import FixTabPanel from '@shared/ui/FixTabPanel'
import EchartsBox from '../../components/EchartsBox'
import EventDetailsModal from '../../components/EventDetailsModal'
import { eventTypeLabels } from '../../model/eventTypes'
import type { TrackingEvent } from '../../model/types'
import useTrackingChartOptions from '../../hooks/useTrackingChartOptions'
import useTrackingColumns from '../../hooks/useTrackingColumns'
import useTrackingDashboardData from '../../hooks/useTrackingDashboardData'

const { Text, Title, Paragraph } = Typography
const { RangePicker } = DatePicker

// ==================== 主组件 ====================
const TrackingDashboard = () => {
  const {
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
  } = useTrackingDashboardData()
  const [viewMode, setViewMode] = useState<'overview' | 'events'>('overview') // overview | events
  const [detailModal, setDetailModal] = useState<{ open: boolean; event: TrackingEvent | null }>({
    open: false,
    event: null,
  })

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

  const { trendChartOption, typeChartOption, perfRadarOption } = useTrackingChartOptions(stats)

  const handleEventSelect = useCallback((event: TrackingEvent) => setDetailModal({ open: true, event }), [])
  const columns = useTrackingColumns(handleEventSelect)

  const apiError = Object.values(apiErrors).join('；')

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
    <FixTabPanel fill={false}>
      <div style={{ padding: 24 }}>
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

        {apiError && (
          <Alert type="error" showIcon title="埋点 API 暂不可用" description={apiError} style={{ marginBottom: 16 }} />
        )}

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

        <EventDetailsModal
          open={detailModal.open}
          event={detailModal.event}
          onClose={() => setDetailModal({ open: false, event: null })}
        />
      </div>
    </FixTabPanel>
  )
}

export default TrackingDashboard
