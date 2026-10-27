const express = require('express')
const { BusinessError } = process.env.VERCEL
  ? require('./domain.mjs')
  : require('./domain.mts')

/**
 * HTTP owns transport/rate limits. Domain code owns authorization and transactions.
 * @param {any} service
 * @param {{ loginLimit?: number, loginLimiter?: (clientKey: string, limit: number) => Promise<void>, events?: any }} [options]
 */
function createEnterpriseRouter(service, { loginLimit = 20, loginLimiter, events } = {}) {
  if (!Number.isInteger(loginLimit) || loginLimit < 1) throw new Error('Invalid login limit')
  const router = express.Router()
  const buckets = new Map()
  router.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    next()
  })
  router.post('/auth/login', async (req, res) => {
    if (loginLimiter) {
      await loginLimiter(req.ip || 'unknown', loginLimit)
      return res.json(await service.login(req.body))
    }
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
  router.use(
    ['/auth/session', '/auth/totp', '/permissions/current', '/roles', '/admin', '/events/ticket', '/events/poll'],
    async (req, _res, next) => {
      const authorization = req.headers.authorization || ''
      req.principal = await service.authenticate(
        authorization.startsWith('Bearer ') ? authorization.slice(7) : undefined,
        req.headers['x-tenant-id']
      )
      next()
    }
  )
  router.get('/auth/session', (req, res) => res.json({ tenantId: req.principal.tenantId, user: req.principal.user }))
  router.get('/auth/session/tenants', async (req, res) => res.json(await service.listTenants(req.principal)))
  router.post('/auth/session/tenant', async (req, res) => res.json(await service.switchTenant(req.principal, req.body)))
  router.delete('/auth/session', async (req, res) => {
    await service.logout(req.principal)
    res.status(204).end()
  })
  router.get('/auth/totp', async (req, res) => res.json(await service.totpStatus(req.principal)))
  router.post('/auth/totp/setup', async (req, res) => res.json(await service.beginTotp(req.principal, req.body)))
  router.post('/auth/totp/confirm', async (req, res) => res.json(await service.confirmTotp(req.principal, req.body)))
  router.post('/auth/totp/disable', async (req, res) => res.json(await service.disableTotp(req.principal, req.body)))
  router.post('/auth/totp/recovery', async (req, res) =>
    res.json(await service.rotateTotpRecoveryCodes(req.principal, req.body))
  )
  router.get('/permissions/current', async (req, res) => res.json(await service.permissions(req.principal)))
  router.get('/roles', async (req, res) => res.json((await service.list(req.principal, 'roles', { page: 1, pageSize: 200 })).items))
  router.post('/events/ticket', (req, res) => {
    if (!events) return res.status(503).json({ error: 'events_not_configured' })
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.status(201).json(events.issueTicket(req.principal))
  })
  router.get('/events/poll', async (req, res) => {
    if (!service.pollEvents) return res.status(503).json({ error: 'events_not_configured' })
    res.json(await service.pollEvents(req.principal, req.query.cursor))
  })
  const publishMutation = (principal, resource) => {
    if (!events) return
    events.publish(principal.tenantId, resource)
    events.publish(principal.tenantId, 'audit')
  }
  router.get('/admin/tenants', async (req, res) => res.json(await service.listManagedTenants(req.principal, req.query)))
  router.get('/admin/tenants/:id', async (req, res) => res.json(await service.getManagedTenant(req.principal, req.params.id)))
  router.post('/admin/tenants', async (req, res) => {
    const result = await service.createManagedTenant(req.principal, req.body)
    if (events) events.publish(req.principal.tenantId, 'audit')
    res.status(201).json(result)
  })
  router.patch('/admin/tenants/:id', async (req, res) => {
    const result = await service.updateManagedTenant(req.principal, req.params.id, req.body)
    if (events) events.publish(req.principal.tenantId, 'audit')
    res.json(result)
  })
  router.delete('/admin/tenants/:id', async (req, res) => {
    await service.removeManagedTenant(req.principal, req.params.id)
    if (events) events.publish(req.principal.tenantId, 'audit')
    res.status(204).end()
  })
  router.get('/admin/access-governance', async (req, res) => res.json(await service.governance(req.principal)))
  router.post('/admin/access-requests/preview', async (req, res) => res.json(await service.previewAccess(req.principal, req.body)))
  router.get('/admin/access-requests', async (req, res) => res.json(await service.listAccessRequests(req.principal, req.query)))
  router.post('/admin/access-requests', async (req, res) => {
    const result = await service.proposeAccess(req.principal, req.body)
    if (events) {
      events.publish(req.principal.tenantId, 'access_requests')
      events.publish(req.principal.tenantId, 'audit')
    }
    res.status(201).json(result)
  })
  router.post('/admin/access-requests/:id/decision', async (req, res) => {
    const result = await service.decideAccess(req.principal, req.params.id, req.body)
    if (result.status === 'approved') publishMutation(req.principal, result.kind === 'role' ? 'roles' : 'users')
    else if (events) events.publish(req.principal.tenantId, 'audit')
    if (events) events.publish(req.principal.tenantId, 'access_requests')
    res.json(result)
  })
  for (const resource of ['users', 'roles', 'audit']) {
    const path = `/admin/${resource}`
    router.get(path, async (req, res) => res.json(await service.list(req.principal, resource, req.query)))
    router.get(`${path}/:id`, async (req, res) => res.json(await service.getOne(req.principal, resource, req.params.id)))
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
    if (error instanceof BusinessError) {
      if (error.code === 'totp_rate_limited') res.setHeader('Retry-After', '600')
      return res.status(error.status).json({ error: error.code, message: error.message })
    }
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
