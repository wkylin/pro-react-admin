const express = require('express')
const { BusinessError } = require('./domain.mts')

/** HTTP owns transport/rate limits. Domain code owns authorization and transactions. */
function createEnterpriseRouter(service, { loginLimit = 20, events } = {}) {
  if (!Number.isInteger(loginLimit) || loginLimit < 1) throw new Error('Invalid login limit')
  const router = express.Router()
  const buckets = new Map()
  router.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    next()
  })
  router.post('/auth/login', async (req, res) => {
    const now = Date.now()
    for (const [key, bucket] of buckets) if (bucket.until <= now) buckets.delete(key)
    const key = req.ip
    if (!buckets.has(key) && buckets.size >= 10_000) return res.status(429).json({ message: 'login_rate_limited' })
    const bucket = buckets.get(key) || { until: now + 600_000, count: 0 }
    buckets.set(key, bucket)
    if (++bucket.count > loginLimit) {
      res.setHeader('Retry-After', Math.ceil((bucket.until - now) / 1000))
      return res.status(429).json({ message: 'login_rate_limited' })
    }
    res.json(await service.login(req.body))
  })
  router.use(['/auth/session', '/permissions/current', '/roles', '/admin', '/events/ticket'], (req, _res, next) => {
    const authorization = req.headers.authorization || ''
    req.principal = service.authenticate(
      authorization.startsWith('Bearer ') ? authorization.slice(7) : undefined,
      req.headers['x-tenant-id']
    )
    next()
  })
  router.get('/auth/session', (req, res) => res.json({ tenantId: req.principal.tenantId, user: req.principal.user }))
  router.get('/auth/session/tenants', (req, res) => res.json(service.listTenants(req.principal)))
  router.post('/auth/session/tenant', (req, res) => res.json(service.switchTenant(req.principal, req.body)))
  router.delete('/auth/session', (req, res) => {
    service.logout(req.principal)
    res.status(204).end()
  })
  router.get('/permissions/current', (req, res) => res.json(service.permissions(req.principal)))
  router.get('/roles', (req, res) => res.json(service.list(req.principal, 'roles', { page: 1, pageSize: 200 }).items))
  router.post('/events/ticket', (req, res) => {
    if (!events) return res.status(503).json({ error: 'events_not_configured' })
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.status(201).json(events.issueTicket(req.principal))
  })
  const publishMutation = (principal, resource) => {
    if (!events) return
    events.publish(principal.tenantId, resource)
    events.publish(principal.tenantId, 'audit')
  }
  for (const resource of ['users', 'roles', 'audit']) {
    const path = `/admin/${resource}`
    router.get(path, (req, res) => res.json(service.list(req.principal, resource, req.query)))
    router.get(`${path}/:id`, (req, res) => res.json(service.getOne(req.principal, resource, req.params.id)))
    if (resource === 'audit') continue
    router.post(path, async (req, res) => {
      const result = await service.write(req.principal, resource, 'create', undefined, req.body)
      publishMutation(req.principal, resource)
      res.status(201).json(result)
    })
    router.patch(`${path}/:id`, async (req, res) => {
      const result = await service.write(req.principal, resource, 'update', req.params.id, req.body)
      publishMutation(req.principal, resource)
      res.json(result)
    })
    router.delete(`${path}/:id`, async (req, res) => {
      await service.write(req.principal, resource, 'delete', req.params.id, undefined)
      publishMutation(req.principal, resource)
      res.status(204).end()
    })
  }
  router.use((error, _req, res, _next) => {
    if (error instanceof BusinessError)
      return res.status(error.status).json({ error: error.code, message: error.message })
    if (Number.isInteger(error?.status) && error?.code === 'event_ticket_rate_limited') {
      res.setHeader('Retry-After', '60')
      return res.status(error.status).json({ error: error.code })
    }
    console.error('Enterprise API request failed:', error)
    res.status(500).json({ error: 'internal_error', message: '服务端处理失败' })
  })
  return router
}
module.exports = { createEnterpriseRouter }
