// ============================================================
// 埋点数据收集 API - 中间件
// ============================================================

const fs = require('path')

// 内存存储 (生产环境应换成数据库)
const eventStore = []
const MAX_STORE_SIZE = 10000

/**
 * POST /api/tracking/collect
 * 接收前端 SDK 上报的埋点事件
 */
function trackingCollect(req, res) {
  try {
    const { appId, appVersion, sdkVersion, events, sentAt } = req.body || {}

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ code: 400, message: 'Invalid events' })
    }

    // 处理每个事件
    const receivedAt = new Date().toISOString()
    const enriched = events.map((event) => ({
      ...event,
      _receivedAt: receivedAt,
      _appId: appId || 'unknown',
      _appVersion: appVersion || '0.0.0',
      _sdkVersion: sdkVersion || 'unknown',
      _clientIp: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
      _userAgent: req.headers['user-agent'] || 'unknown',
      _sentAt: sentAt || null,
    }))

    // 存入内存
    eventStore.push(...enriched)

    // 限制内存大小
    if (eventStore.length > MAX_STORE_SIZE) {
      eventStore.splice(0, eventStore.length - MAX_STORE_SIZE)
    }

    console.log(`[Tracking] 收到 ${events.length} 个事件 (appId=${appId}, total=${eventStore.length})`)

    return res.json({ code: 0, message: 'ok', count: events.length })
  } catch (err) {
    console.error('[Tracking] 处理失败:', err)
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }
}

/**
 * GET /api/tracking/events
 * 查询已收集的事件 (用于面板展示)
 *
 * Query params:
 *   - eventType: 事件类型筛选 (逗号分隔)
 *   - eventName: 事件名称筛选 (逗号分隔)
 *   - startTime: 开始时间戳 (ms)
 *   - endTime: 结束时间戳 (ms)
 *   - page: 页码 (默认 1)
 *   - pageSize: 每页条数 (默认 50)
 *   - sort: 排序字段 (默认 timestamp)
 *   - order: 排序方向 asc/desc (默认 desc)
 */
function getEvents(req, res) {
  try {
    const {
      eventType,
      eventName,
      startTime,
      endTime,
      page = '1',
      pageSize = '50',
      sort = 'timestamp',
      order = 'desc',
    } = req.query

    let filtered = [...eventStore].reverse()

    // 筛选
    if (eventType) {
      const types = eventType.split(',').map((t) => t.trim())
      filtered = filtered.filter((e) => types.includes(e.eventType))
    }
    if (eventName) {
      const names = eventName.split(',').map((n) => n.trim())
      filtered = filtered.filter((e) => names.includes(e.eventName))
    }
    if (startTime) {
      filtered = filtered.filter((e) => e.timestamp >= Number(startTime))
    }
    if (endTime) {
      filtered = filtered.filter((e) => e.timestamp <= Number(endTime))
    }

    // 排序
    filtered.sort((a, b) => {
      const aVal = a[sort] ?? 0
      const bVal = b[sort] ?? 0
      return order === 'asc' ? aVal - bVal : bVal - aVal
    })

    const total = filtered.length
    const pg = Math.max(1, Number(page))
    const ps = Math.min(200, Math.max(1, Number(pageSize)))
    const start = (pg - 1) * ps
    const items = filtered.slice(start, start + ps)

    return res.json({
      code: 0,
      data: {
        items,
        total,
        page: pg,
        pageSize: ps,
        totalPages: Math.ceil(total / ps),
      },
    })
  } catch (err) {
    console.error('[Tracking] 查询失败:', err)
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }
}

/**
 * GET /api/tracking/stats
 * 获取统计数据 (用于面板概览)
 */
function getStats(req, res) {
  try {
    const now = Date.now()
    const lastHour = now - 3600000
    const last24h = now - 86400000
    const last7d = now - 604800000

    // 按事件类型统计
    const byType = {}
    const byName = {}
    const lastHourCount = eventStore.filter((e) => e.timestamp >= lastHour).length
    const last24hCount = eventStore.filter((e) => e.timestamp >= last24h).length
    const last7dCount = eventStore.filter((e) => e.timestamp >= last7d).length

    // 最近24小时内按小时分组
    const hourlyEvents = {}
    for (const e of eventStore) {
      if (e.timestamp >= last24h) {
        const hour = new Date(e.timestamp).toISOString().slice(0, 13) + ':00'
        hourlyEvents[hour] = (hourlyEvents[hour] || 0) + 1
      }

      // 按类型统计
      byType[e.eventType] = (byType[e.eventType] || 0) + 1
      byName[e.eventName] = (byName[e.eventName] || 0) + 1
    }

    // 排序并提取 Top 10
    const topEvents = Object.entries(byName)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    // 按时间排序的24小时趋势
    const trend = Object.entries(hourlyEvents)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([hour, count]) => ({ hour, count }))

    // FCP/LCP/FID/CLS 平均值 (最近24h)
    const perfEvents = eventStore.filter(
      (e) => e.timestamp >= last24h && e.eventType === 'performance'
    )
    const perfStats = {}
    const perfMetrics = ['fcp', 'lcp', 'fid', 'cls']
    for (const metric of perfMetrics) {
      const values = perfEvents
        .filter((e) => e.eventName === metric)
        .map((e) => e.properties?.value)
        .filter((v) => typeof v === 'number')
      if (values.length > 0) {
        perfStats[metric] = {
          avg: Math.round(values.reduce((s, v) => s + v, 0) / values.length * 100) / 100,
          min: Math.min(...values),
          max: Math.max(...values),
          count: values.length,
        }
      }
    }

    // 错误率
    const errorEvents = eventStore.filter(
      (e) => e.timestamp >= last24h && e.eventType === 'error'
    )
    const errorRate = last24hCount > 0
      ? Math.round((errorEvents.length / last24hCount) * 10000) / 100
      : 0

    // 独立用户数 (按 anonymousId)
    const uniqueUsers24h = new Set(
      eventStore
        .filter((e) => e.timestamp >= last24h)
        .map((e) => e.anonymousId)
    ).size

    // 独立会话数 (按 sessionId)
    const uniqueSessions24h = new Set(
      eventStore
        .filter((e) => e.timestamp >= last24h)
        .map((e) => e.sessionId)
    ).size

    return res.json({
      code: 0,
      data: {
        total: eventStore.length,
        lastHourCount,
        last24hCount,
        last7dCount,
        uniqueUsers24h,
        uniqueSessions24h,
        errorRate,
        byType,
        topEvents,
        trend,
        perfStats,
      },
    })
  } catch (err) {
    console.error('[Tracking] 统计失败:', err)
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }
}

/**
 * DELETE /api/tracking/events
 * 清空事件数据
 */
function clearEvents(req, res) {
  const count = eventStore.length
  eventStore.length = 0
  console.log(`[Tracking] 已清空 ${count} 个事件`)
  return res.json({ code: 0, message: 'ok', cleared: count })
}

module.exports = {
  trackingCollect,
  getEvents,
  getStats,
  clearEvents,
}