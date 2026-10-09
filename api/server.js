const helmet = require('helmet')
const express = require('express')
const crypto = require('node:crypto')

const app = express()
app.use(helmet())

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

// ==== GitHub OAuth helper endpoints ====
const https = require('https')
const querystring = require('querystring')

function postToGitHubToken({ code, redirect_uri, client_id, client_secret }) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({ client_id, client_secret, code, redirect_uri })

    const options = {
      hostname: 'github.com',
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        Accept: 'application/json',
        'User-Agent': 'pro-react-admin-server',
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve(parsed)
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (e) => reject(e))
    req.write(postData)
    req.end()
  })
}

function getFromGitHubApi(path, accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'pro-react-admin-server',
      },
    }

    if (accessToken) {
      options.headers.Authorization = `token ${accessToken}`
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve(parsed)
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (e) => reject(e))
    req.end()
  })
}

// Exchange code for access_token (server-side)
app.post('/api/github-token', async (req, res) => {
  try {
    const { code, redirect_uri } = req.body || {}
    if (!code) return res.status(400).json({ error: 'missing_code' })

    const client_id = process.env.GITHUB_CLIENT_ID || ''
    const client_secret = process.env.GITHUB_CLIENT_SECRET || ''
    if (!client_id || !client_secret) {
      return res.status(500).json({ error: 'server_misconfigured', message: 'GITHUB_CLIENT_ID/SECRET not set' })
    }

    const tokenData = await postToGitHubToken({ code, redirect_uri, client_id, client_secret })

    if (tokenData.error) {
      return res.status(400).json(tokenData)
    }

    return res.json(tokenData)
  } catch (err) {
    console.error('github-token error', err)
    return res.status(500).json({ error: 'exchange_failed' })
  }
})

// Get user info using access token
app.get('/api/github-user', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    let token = ''
    if (authHeader.startsWith('token ')) token = authHeader.slice(6)
    if (!token) return res.status(400).json({ error: 'missing_token' })

    const user = await getFromGitHubApi('/user', token)
    return res.json(user)
  } catch (err) {
    console.error('github-user error', err)
    return res.status(500).json({ error: 'fetch_user_failed' })
  }
})

// Get user emails using access token
app.get('/api/github-email', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    let token = ''
    if (authHeader.startsWith('token ')) token = authHeader.slice(6)
    if (!token) return res.status(400).json({ error: 'missing_token' })

    const emails = await getFromGitHubApi('/user/emails', token)
    return res.json(emails)
  } catch (err) {
    console.error('github-email error', err)
    return res.status(500).json({ error: 'fetch_emails_failed' })
  }
})

async function startServer() {
  const mongodbUri = process.env.MONGODB_URI || (process.env.NODE_ENV === 'production' ? '' : 'mongodb://127.0.0.1:27017/promotion?retryWrites=true')

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

  const port = process.env.PORT || 5200
  app.listen(port, () => console.log(`Server started on port ${port}; tracking store=${trackingStoreMode}`))
}

startServer().catch((error) => {
  console.error('API server startup failed:', error?.message || error)
  process.exitCode = 1
})
