// Tracking API storage and query handlers. MongoDB is used when configured;
// the bounded in-memory store is reserved for local development.
const eventStore = []
const MAX_STORE_SIZE = 10_000
const MAX_EVENTS_PER_BATCH = 100
let TrackingEventModel = null

function configureTrackingModel(model) {
  TrackingEventModel = model
}

function isPersistentStoreReady() {
  return Boolean(TrackingEventModel && TrackingEventModel.db.readyState === 1)
}

function normalizePage(value, fallback, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? Math.min(max, Math.max(1, parsed)) : fallback
}

function createFilter(query) {
  const filter = {}
  if (query.eventType) filter.eventType = { $in: String(query.eventType).split(',').map((value) => value.trim()).filter(Boolean) }
  if (query.eventName) filter.eventName = { $in: String(query.eventName).split(',').map((value) => value.trim()).filter(Boolean) }

  const startTime = Number(query.startTime)
  const endTime = Number(query.endTime)
  if ((query.startTime && !Number.isFinite(startTime)) || (query.endTime && !Number.isFinite(endTime))) {
    throw new Error('invalid_time_range')
  }
  if (Number.isFinite(startTime) || Number.isFinite(endTime)) {
    filter.timestamp = {}
    if (Number.isFinite(startTime)) filter.timestamp.$gte = startTime
    if (Number.isFinite(endTime)) filter.timestamp.$lte = endTime
  }
  return filter
}

function isEvent(value) {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    typeof value.eventType === 'string' &&
    value.eventType.length <= 64 &&
    typeof value.eventName === 'string' &&
    value.eventName.length > 0 &&
    value.eventName.length <= 128 &&
    Number.isFinite(value.timestamp)
  )
}

/** POST /api/tracking/collect */
async function trackingCollect(req, res) {
  try {
    const { appId, appVersion, sdkVersion, events, sentAt } = req.body || {}
    if (!Array.isArray(events) || events.length === 0 || events.length > MAX_EVENTS_PER_BATCH || !events.every(isEvent)) {
      return res.status(400).json({ code: 400, message: 'Invalid events', maxEvents: MAX_EVENTS_PER_BATCH })
    }

    const receivedAt = new Date()
    const enriched = events.map((event) => ({
      ...event,
      _receivedAt: receivedAt,
      _appId: typeof appId === 'string' ? appId.slice(0, 128) : 'unknown',
      _appVersion: typeof appVersion === 'string' ? appVersion.slice(0, 64) : '0.0.0',
      _sdkVersion: typeof sdkVersion === 'string' ? sdkVersion.slice(0, 64) : 'unknown',
      _userAgent: String(req.headers['user-agent'] || 'unknown').slice(0, 512),
      _sentAt: sentAt || null,
    }))

    if (TrackingEventModel) {
      if (!isPersistentStoreReady()) {
        return res.status(503).json({ code: 503, message: 'Tracking storage is unavailable' })
      }
      await TrackingEventModel.insertMany(enriched)
    } else {
      eventStore.push(...enriched)
      if (eventStore.length > MAX_STORE_SIZE) eventStore.splice(0, eventStore.length - MAX_STORE_SIZE)
    }

    return res.json({ code: 0, message: 'ok', count: events.length })
  } catch (error) {
    console.error('[Tracking] collect failed:', error)
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }
}

/** GET /api/tracking/events */
async function getEvents(req, res) {
  try {
    const filter = createFilter(req.query)
    const page = normalizePage(req.query.page, 1)
    const pageSize = normalizePage(req.query.pageSize, 50, 200)
    const sortKey = ['timestamp', 'eventType', 'eventName', '_receivedAt'].includes(req.query.sort)
      ? req.query.sort
      : 'timestamp'
    const direction = req.query.order === 'asc' ? 1 : -1

    if (TrackingEventModel) {
      if (!isPersistentStoreReady()) return res.status(503).json({ code: 503, message: 'Tracking storage is unavailable' })
      const [items, total] = await Promise.all([
        TrackingEventModel.find(filter).sort({ [sortKey]: direction }).skip((page - 1) * pageSize).limit(pageSize).lean(),
        TrackingEventModel.countDocuments(filter),
      ])
      return res.json({ code: 0, data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) } })
    }

    let filtered = [...eventStore].reverse()
    const types = req.query.eventType && String(req.query.eventType).split(',').map((value) => value.trim())
    const names = req.query.eventName && String(req.query.eventName).split(',').map((value) => value.trim())
    if (types) filtered = filtered.filter((event) => types.includes(event.eventType))
    if (names) filtered = filtered.filter((event) => names.includes(event.eventName))
    if (filter.timestamp?.$gte !== undefined) filtered = filtered.filter((event) => event.timestamp >= filter.timestamp.$gte)
    if (filter.timestamp?.$lte !== undefined) filtered = filtered.filter((event) => event.timestamp <= filter.timestamp.$lte)
    filtered.sort((a, b) => {
      const left = a[sortKey] instanceof Date ? a[sortKey].getTime() : a[sortKey] ?? 0
      const right = b[sortKey] instanceof Date ? b[sortKey].getTime() : b[sortKey] ?? 0
      return direction * (left > right ? 1 : left < right ? -1 : 0)
    })
    const total = filtered.length
    const items = filtered.slice((page - 1) * pageSize, page * pageSize)
    return res.json({ code: 0, data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) } })
  } catch (error) {
    const status = error.message === 'invalid_time_range' ? 400 : 500
    return res.status(status).json({ code: status, message: status === 400 ? 'Invalid time range' : 'Internal error' })
  }
}

function getMemoryStats() {
  const now = Date.now()
  const lastHour = now - 3_600_000
  const last24h = now - 86_400_000
  const last7d = now - 604_800_000
  const byType = Object.create(null)
  const byName = Object.create(null)
  const hourly = Object.create(null)
  const recent = eventStore.filter((event) => event.timestamp >= last24h)
  const lastHourCount = eventStore.filter((event) => event.timestamp >= lastHour).length
  const last7dCount = eventStore.filter((event) => event.timestamp >= last7d).length

  for (const event of eventStore) {
    byType[event.eventType] = (byType[event.eventType] || 0) + 1
    byName[event.eventName] = (byName[event.eventName] || 0) + 1
    if (event.timestamp >= last24h) {
      const hour = new Date(event.timestamp).toISOString().slice(0, 13) + ':00'
      hourly[hour] = (hourly[hour] || 0) + 1
    }
  }

  const perfStats = {}
  for (const metric of ['fcp', 'lcp', 'fid', 'cls']) {
    const values = recent
      .filter((event) => event.eventType === 'performance' && event.eventName === metric)
      .map((event) => event.properties?.value)
      .filter((value) => typeof value === 'number')
    if (values.length) {
      perfStats[metric] = {
        avg: Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length,
      }
    }
  }

  const errorCount = recent.filter((event) => event.eventType === 'error').length
  return {
    total: eventStore.length,
    lastHourCount,
    last24hCount: recent.length,
    last7dCount,
    uniqueUsers24h: new Set(recent.map((event) => event.anonymousId).filter(Boolean)).size,
    uniqueSessions24h: new Set(recent.map((event) => event.sessionId).filter(Boolean)).size,
    errorRate: recent.length ? Math.round((errorCount / recent.length) * 10_000) / 100 : 0,
    byType,
    topEvents: Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, count]) => ({ name, count })),
    trend: Object.entries(hourly).sort(([a], [b]) => a.localeCompare(b)).map(([hour, count]) => ({ hour, count })),
    perfStats,
  }
}

async function getMongoStats() {
  const now = Date.now()
  const lastHour = now - 3_600_000
  const last24h = now - 86_400_000
  const last7d = now - 604_800_000
  const recentFilter = { timestamp: { $gte: last24h } }
  const since7d = { timestamp: { $gte: last7d } }
  const count = (promise) => promise.then((rows) => rows[0]?.count || 0)
  const [
    total,
    lastHourCount,
    last24hCount,
    last7dCount,
    errorCount,
    uniqueUsers24h,
    uniqueSessions24h,
    types,
    topEvents,
    trend,
    performance,
  ] = await Promise.all([
    TrackingEventModel.countDocuments(),
    TrackingEventModel.countDocuments({ timestamp: { $gte: lastHour } }),
    TrackingEventModel.countDocuments(recentFilter),
    TrackingEventModel.countDocuments(since7d),
    TrackingEventModel.countDocuments({ ...recentFilter, eventType: 'error' }),
    count(TrackingEventModel.aggregate([{ $match: { ...recentFilter, anonymousId: { $exists: true, $ne: null } } }, { $group: { _id: '$anonymousId' } }, { $count: 'count' }])),
    count(TrackingEventModel.aggregate([{ $match: { ...recentFilter, sessionId: { $exists: true, $ne: null } } }, { $group: { _id: '$sessionId' } }, { $count: 'count' }])),
    TrackingEventModel.aggregate([{ $group: { _id: '$eventType', count: { $sum: 1 } } }]),
    TrackingEventModel.aggregate([{ $group: { _id: '$eventName', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
    TrackingEventModel.aggregate([
      { $match: recentFilter },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%dT%H:00', date: { $toDate: '$timestamp' }, timezone: 'UTC' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    TrackingEventModel.aggregate([
      { $match: { ...recentFilter, eventType: 'performance', eventName: { $in: ['fcp', 'lcp', 'fid', 'cls'] }, 'properties.value': { $type: 'number' } } },
      { $group: { _id: '$eventName', avg: { $avg: '$properties.value' }, min: { $min: '$properties.value' }, max: { $max: '$properties.value' }, count: { $sum: 1 } } },
    ]),
  ])

  return {
    total,
    lastHourCount,
    last24hCount,
    last7dCount,
    uniqueUsers24h,
    uniqueSessions24h,
    errorRate: last24hCount ? Math.round((errorCount / last24hCount) * 10_000) / 100 : 0,
    byType: Object.fromEntries(types.map(({ _id, count: value }) => [_id || 'unknown', value])),
    topEvents: topEvents.map(({ _id, count: value }) => ({ name: _id || 'unknown', count: value })),
    trend: trend.map(({ _id, count: value }) => ({ hour: `${_id}:00Z`, count: value })),
    perfStats: Object.fromEntries(performance.map(({ _id, ...stats }) => [_id, { ...stats, avg: Math.round(stats.avg * 100) / 100 }])),
  }
}

/** GET /api/tracking/stats */
async function getStats(req, res) {
  try {
    if (TrackingEventModel && !isPersistentStoreReady()) {
      return res.status(503).json({ code: 503, message: 'Tracking storage is unavailable' })
    }
    const data = TrackingEventModel ? await getMongoStats() : getMemoryStats()
    return res.json({ code: 0, data })
  } catch (error) {
    console.error('[Tracking] stats failed:', error)
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }
}

/** DELETE /api/tracking/events */
async function clearEvents(req, res) {
  try {
    let cleared
    if (TrackingEventModel) {
      if (!isPersistentStoreReady()) return res.status(503).json({ code: 503, message: 'Tracking storage is unavailable' })
      const result = await TrackingEventModel.deleteMany({})
      cleared = result.deletedCount || 0
    } else {
      cleared = eventStore.length
      eventStore.length = 0
    }
    return res.json({ code: 0, message: 'ok', cleared })
  } catch (error) {
    console.error('[Tracking] clear failed:', error)
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }
}

module.exports = { configureTrackingModel, trackingCollect, getEvents, getStats, clearEvents }
