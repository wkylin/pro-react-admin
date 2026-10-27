const helmet = require('helmet')
const express = require('express')
const crypto = require('node:crypto')
const http = require('node:http')

const app = express()
app.use(helmet())
app.use(
  '/api/demo/github',
  require('./github-demo.cjs').createRouter({
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl: process.env.GITHUB_DEMO_CALLBACK_URL || '',
    appUrl: process.env.GITHUB_DEMO_APP_URL || '',
    sessionSecret: process.env.GITHUB_SESSION_SECRET || '',
  })
)

const bodyParser = require('body-parser')
const cors = require('cors')

const configuredOrigins = new Set(
  (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
)
if (process.env.NODE_ENV === 'production' && configuredOrigins.size === 0) {
  throw new Error('CORS_ORIGINS must list at least one trusted origin in production')
}

function isLoopbackOrigin(origin) {
  try {
    const url = new URL(origin)
    const hostname = url.hostname.replace(/^\[|\]$/g, '')
    return ['localhost', '127.0.0.1', '::1'].includes(hostname)
  } catch {
    return false
  }
}

app.use(
  cors({
    // Axios uses credentials:include; trusted origins must receive the matching CORS flag.
    credentials: true,
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      const isDevelopmentLoopback = process.env.NODE_ENV !== 'production' && isLoopbackOrigin(origin)
      callback(null, configuredOrigins.has(origin) || isDevelopmentLoopback)
    },
    maxAge: 600,
  })
)
app.use('/api/tracking/collect', limitTrackingRequests)
app.use(bodyParser.json({ limit: '1mb' }))

// Business services are explicit opt-in; static deployments and demos do not open a local database.
const enterpriseService =
  process.env.ENTERPRISE_ENABLED === 'true' ? require('../server/enterprise/runtime.cjs').openEnterpriseService() : null
const enterpriseEvents = enterpriseService
  ? require('../server/enterprise/events.cjs').createEnterpriseEvents(enterpriseService, {
      isAllowedOrigin(origin) {
        return configuredOrigins.has(origin) || (process.env.NODE_ENV !== 'production' && isLoopbackOrigin(origin))
      },
    })
  : null
if (enterpriseService) {
  app.use('/api', require('../server/enterprise/router.cjs').createEnterpriseRouter(enterpriseService, { events: enterpriseEvents }))
} else {
  app.use(['/api/auth', '/api/admin', '/api/permissions/current', '/api/roles'], (_req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    res.status(503).json({ error: 'enterprise_not_configured', message: '企业业务 API 尚未启用' })
  })
}

const mongoose = require('mongoose')

const { Schema } = mongoose

const ApiSchema = new Schema({
  url: { type: String },
  delay: { type: Number },
  date: { type: Date, default: Date.now },
})

const { configureTrackingModel, trackingCollect, getEvents, getStats, clearEvents } = require('./tracking-collect')

const ApiModel = mongoose.model('apis', ApiSchema)
const trackingStoreMode = process.env.TRACKING_STORE || (process.env.NODE_ENV === 'production' ? 'mongodb' : 'memory')
if (!['memory', 'mongodb'].includes(trackingStoreMode)) {
  throw new Error('TRACKING_STORE must be either "memory" or "mongodb"')
}

const TrackingEventSchema = new Schema(
  {
    eventType: { type: String },
    eventName: { type: String },
    timestamp: { type: Number },
    _receivedAt: { type: Date, expires: 60 * 60 * 24 * 90 },
  },
  { strict: false, collection: 'tracking_events' }
)
TrackingEventSchema.index({ timestamp: -1 })
TrackingEventSchema.index({ eventType: 1, timestamp: -1 })
TrackingEventSchema.index({ eventName: 1, timestamp: -1 })
const TrackingEventModel = mongoose.model('tracking_events', TrackingEventSchema)
if (trackingStoreMode === 'mongodb') configureTrackingModel(TrackingEventModel)

const configuredWindow = Number(process.env.TRACKING_RATE_WINDOW_MS)
const configuredLimit = Number(process.env.TRACKING_RATE_LIMIT)
const rateLimitWindowMs = Number.isFinite(configuredWindow) && configuredWindow > 0 ? configuredWindow : 60_000
const rateLimitMax = Number.isInteger(configuredLimit) && configuredLimit > 0 ? configuredLimit : 60
const trackingRequestBuckets = new Map()
const maxRateLimitKeys = 10_000

function limitTrackingRequests(req, res, next) {
  const now = Date.now()
  const key = req.ip || req.socket.remoteAddress || 'unknown'
  let bucket = trackingRequestBuckets.get(key)
  if (!bucket && trackingRequestBuckets.size >= maxRateLimitKeys) {
    for (const [address, entry] of trackingRequestBuckets) {
      if (now - entry.startedAt >= rateLimitWindowMs) trackingRequestBuckets.delete(address)
    }
    if (trackingRequestBuckets.size >= maxRateLimitKeys) {
      const oldestKey = trackingRequestBuckets.keys().next().value
      if (oldestKey !== undefined) trackingRequestBuckets.delete(oldestKey)
    }
  }
  if (!bucket || now - bucket.startedAt >= rateLimitWindowMs) {
    bucket = { startedAt: now, count: 0 }
    trackingRequestBuckets.set(key, bucket)
  }
  bucket.count += 1

  if (bucket.count > rateLimitMax) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.startedAt + rateLimitWindowMs - now) / 1000))
    res.setHeader('Retry-After', retryAfterSeconds)
    return res.status(429).json({ error: 'rate_limit_exceeded', retryAfterSeconds })
  }

  next()
}

function requireAdminToken(req, res, next) {
  res.setHeader('Cache-Control', 'no-store')
  const expected = process.env.TRACKING_ADMIN_TOKEN || ''
  if (!expected) {
    return res.status(503).json({ error: 'admin_auth_not_configured' })
  }

  const authorization = req.headers.authorization || ''
  const supplied = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : req.headers['x-api-key'] || ''
  const expectedBuffer = Buffer.from(expected)
  const suppliedBuffer = Buffer.from(String(supplied))
  const matches =
    expectedBuffer.length === suppliedBuffer.length && crypto.timingSafeEqual(expectedBuffer, suppliedBuffer)

  if (!matches) return res.status(401).json({ error: 'unauthorized' })
  next()
}

// ==================== 埋点数据收集 API ====================
app.post('/api/tracking/collect', trackingCollect)
app.get('/api/tracking/events', requireAdminToken, getEvents)
app.get('/api/tracking/stats', requireAdminToken, getStats)
app.delete('/api/tracking/events', requireAdminToken, clearEvents)

app.post('/apis', requireAdminToken, async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'mongodb_not_configured' })
  }

  const { url, delay } = req.body || {}
  if (typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ error: 'invalid_url' })
  }
  try {
    const parsedUrl = new URL(url)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({ error: 'invalid_url' })
    }
  } catch {
    return res.status(400).json({ error: 'invalid_url' })
  }
  if (delay !== undefined && (!Number.isFinite(Number(delay)) || Number(delay) < 0)) {
    return res.status(400).json({ error: 'invalid_delay' })
  }

  try {
    const newItem = new ApiModel({ url: url.trim(), delay })
    await newItem.save()
    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('api record save failed', error)
    return res.status(500).json({ error: 'save_failed' })
  }
})

async function startServer() {
  const mongodbUri = process.env.MONGODB_URI || ''

  if (trackingStoreMode === 'mongodb' && !mongodbUri) {
    throw new Error('MONGODB_URI is required when TRACKING_STORE=mongodb (the production default)')
  }

  if (mongodbUri) {
    try {
      await mongoose.connect(mongodbUri)
      if (trackingStoreMode === 'mongodb') await TrackingEventModel.createIndexes()
      console.log('MongoDB Connected!')
    } catch (error) {
      if (trackingStoreMode === 'mongodb') throw error
      console.warn('MongoDB connection failed; tracking uses the configured in-memory store:', error?.message || error)
    }
  }

  const port = Number(process.env.TRACKING_API_PORT || process.env.PORT || 5200)
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'
  const server = http.createServer(app)
  if (enterpriseEvents) enterpriseEvents.attach(server)
  else
    server.on('upgrade', (request, socket) => {
      if (request.url?.split('?')[0] !== '/api/events') return socket.destroy()
      socket.write('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\nCache-Control: no-store\r\n\r\n')
      socket.destroy()
    })
  server.listen(port, host, () =>
    console.log(
      `Server started on ${host}:${port}; tracking store=${trackingStoreMode}; enterprise=${Boolean(enterpriseService)}`
    )
  )
  for (const signal of ['SIGTERM', 'SIGINT'])
    process.once(signal, () => {
      server.close(async () => {
        enterpriseEvents?.close()
        enterpriseService?.store.close()
        await mongoose.disconnect()
      })
    })
}

startServer().catch((error) => {
  console.error('API server startup failed:', error?.message || error)
  enterpriseService?.store.close()
  process.exitCode = 1
})
