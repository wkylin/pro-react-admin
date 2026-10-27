import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { after, before, test } from 'node:test'
import { PGlite } from '@electric-sql/pglite'
import express from 'express'
import { PostgresEnterpriseStore } from './postgres-store.mts'
import { migratePostgresEnterpriseDatabase, verifyPostgresEnterpriseDatabase } from './postgres-schema.mts'
import { PostgresEnterpriseService } from './postgres-service.mts'
import { createEnterpriseRouter } from './router.cjs'
import { totpAtStep } from './totp.mts'

const db = new PGlite()
const pool = {
  async query(sql, values) {
    return db.query(sql, values)
  },
  async connect() {
    return { query: (sql, values) => db.query(sql, values), release() {} }
  },
  async end() {
    await db.close()
  },
}
const store = new PostgresEnterpriseStore('', pool)
const service = new PostgresEnterpriseService(store, { totpKey: Buffer.alloc(32, 7) })
let server
let base

before(async () => {
  await migratePostgresEnterpriseDatabase(store)
  await verifyPostgresEnterpriseDatabase(store)
  const app = express()
  app.use(express.json())
  app.use('/api', createEnterpriseRouter(service, { loginLimiter: (ip, limit) => service.chargeLoginLimit(ip, limit) }))
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  base = `http://127.0.0.1:${server.address().port}/api`
})
after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve))
  await store.close()
})

async function request(path, { method = 'GET', token, tenant = 'acme', body } = {}) {
  const response = await fetch(base + path, {
    method,
    headers: {
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(token ? { authorization: `Bearer ${token}`, 'x-tenant-id': tenant } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return { status: response.status, body: response.status === 204 ? undefined : await response.json() }
}

test('migration is idempotent and Enterprise API persists auth, RBAC, tenant and audit data', async () => {
  assert.deepEqual(await migratePostgresEnterpriseDatabase(store), { version: 1, applied: false })
  await service.bootstrap({ tenantId: 'acme', tenantName: 'Acme', name: 'Admin', email: 'admin@acme.test', password: 'StrongPassword123!' })
  await service.grantPlatformAdmin('acme', 'admin@acme.test')
  const login = await request('/auth/login', { method: 'POST', body: { tenantId: 'acme', email: 'admin@acme.test', password: 'StrongPassword123!' } })
  assert.equal(login.status, 200)
  assert.ok(login.body.token)
  const token = login.body.token
  const current = await request('/permissions/current', { token })
  assert.equal(current.status, 200)
  assert.ok(current.body.permissions.includes('tenant:*'))
  const created = await request('/admin/tenants', { method: 'POST', token, body: { tenantId: 'other', name: 'Other', adminName: 'Other Admin', adminEmail: 'admin@other.test', adminPassword: 'OtherPassword123!' } })
  assert.equal(created.status, 201)
  assert.equal(created.body.id, 'other')
  const tenants = await request('/admin/tenants', { token })
  assert.equal(tenants.status, 200)
  assert.equal(tenants.body.total, 2)
  const spoofedTenant = await request('/admin/users', { token, tenant: 'other' })
  assert.equal(spoofedTenant.status, 403)
  const role = await request('/admin/roles', { method: 'POST', token, body: { name: 'Reader', code: 'reader', permissions: ['user:read'] } })
  assert.equal(role.status, 201)
  const user = await request('/admin/users', { method: 'POST', token, body: { name: 'Alice', email: 'alice@acme.test', role: 'reader', status: 'active', password: 'AlicePassword123!' } })
  assert.equal(user.status, 201)
  const userLogin = await request('/auth/login', { method: 'POST', body: { tenantId: 'acme', email: 'alice@acme.test', password: 'AlicePassword123!' } })
  assert.equal(userLogin.status, 200)
  const forbidden = await request('/admin/roles', { token: userLogin.body.token })
  assert.equal(forbidden.status, 403)
  const reviewer = await request('/admin/users', { method: 'POST', token, body: { name: 'Reviewer', email: 'reviewer@acme.test', role: 'tenant-admin', status: 'active', password: 'ReviewerPassword123!' } })
  assert.equal(reviewer.status, 201)
  const reviewerLogin = await request('/auth/login', { method: 'POST', body: { tenantId: 'acme', email: 'reviewer@acme.test', password: 'ReviewerPassword123!' } })
  assert.equal(reviewerLogin.status, 200)
  const beforeEvents = await request('/events/poll', { token })
  assert.equal(beforeEvents.status, 200)
  const preview = await request('/admin/access-requests/preview', { method: 'POST', token, body: { kind: 'role', targetId: role.body.id, change: { permissions: ['user:read', 'role:read'] } } })
  assert.equal(preview.status, 200)
  const proposal = await request('/admin/access-requests', { method: 'POST', token, body: { kind: 'role', targetId: role.body.id, change: { permissions: ['user:read', 'role:read'] }, reason: 'Reader needs role visibility', fingerprint: preview.body.fingerprint } })
  assert.equal(proposal.status, 201)
  const selfReview = await request(`/admin/access-requests/${proposal.body.id}/decision`, { method: 'POST', token, body: { decision: 'approve', reason: 'self review' } })
  assert.equal(selfReview.status, 403)
  const approved = await request(`/admin/access-requests/${proposal.body.id}/decision`, { method: 'POST', token: reviewerLogin.body.token, body: { decision: 'approve', reason: 'approved' } })
  assert.equal(approved.status, 200)
  assert.equal(approved.body.status, 'approved')
  const events = await request(`/events/poll?cursor=${beforeEvents.body.cursor}`, { token })
  assert.equal(events.status, 200)
  assert.ok(events.body.resources.includes('roles'))
  assert.ok(events.body.resources.includes('access_requests'))
  const noNewEvents = await request(`/events/poll?cursor=${events.body.cursor}`, { token })
  assert.deepEqual(noNewEvents.body.resources, [])
  const visible = await request('/admin/roles', { token: userLogin.body.token })
  assert.equal(visible.status, 200)
  const setup = await request('/auth/totp/setup', { method: 'POST', token, body: { password: 'StrongPassword123!' } })
  assert.equal(setup.status, 200)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = 0, value = 0
  const bytes = []
  for (const letter of setup.body.secret) {
    value = (value << 5) | alphabet.indexOf(letter)
    bits += 5
    if (bits >= 8) {
      bytes.push((value >>> (bits -= 8)) & 255)
    }
  }
  const code = totpAtStep(Buffer.from(bytes), Math.floor(Date.now() / 30_000))
  const confirmed = await request('/auth/totp/confirm', { method: 'POST', token, body: { code } })
  assert.equal(confirmed.status, 200)
  assert.equal(confirmed.body.recoveryCodes.length, 10)
  const needsTotp = await request('/auth/login', { method: 'POST', body: { tenantId: 'acme', email: 'admin@acme.test', password: 'StrongPassword123!' } })
  assert.equal(needsTotp.body.totpRequired, true)
  const recovered = await request('/auth/login', { method: 'POST', body: { tenantId: 'acme', email: 'admin@acme.test', password: 'StrongPassword123!', recoveryCode: confirmed.body.recoveryCodes[0] } })
  assert.equal(recovered.status, 200)
  assert.ok(recovered.body.token)
  const reused = await request('/auth/login', { method: 'POST', body: { tenantId: 'acme', email: 'admin@acme.test', password: 'StrongPassword123!', recoveryCode: confirmed.body.recoveryCodes[0] } })
  assert.equal(reused.status, 401)
  const status = await request('/auth/totp', { token: recovered.body.token })
  assert.equal(status.body.recoveryCodesRemaining, 9)
  const audit = await request('/admin/audit', { token, body: undefined })
  assert.equal(audit.status, 200)
  assert.ok(audit.body.total >= 5)
  assert.ok(audit.body.items.some((item) => item.recordId))
  const logout = await request('/auth/session', { method: 'DELETE', token: userLogin.body.token })
  assert.equal(logout.status, 204)
  const expired = await request('/auth/session', { token: userLogin.body.token })
  assert.equal(expired.status, 401)
  await assert.rejects(store.run('DELETE FROM audit'), /audit_append_only/)
  for (let index = 0; index < 20; index += 1) await service.chargeLoginLimit('test-client', 20)
  await assert.rejects(service.chargeLoginLimit('test-client', 20), /login_rate_limited/)
})
