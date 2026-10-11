import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { EnterpriseStore } from './store.mts'
import { EnterpriseService } from './service.mts'
import { createEnterpriseRouter } from './router.cjs'
import { openEnterpriseService } from './runtime.cjs'

const require = createRequire(import.meta.url)
const express = require('express')
const adminPassword = 'Integration-password-42'
async function fixture(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'pro-admin-api-'))
  let store = new EnterpriseStore(path.join(directory, 'business.sqlite'))
  let server
  t.after(async () => {
    if (server) await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
    store.close()
    await rm(directory, { recursive: true, force: true })
  })
  let now = Date.now()
  const service = new EnterpriseService(store, { now: () => now })
  await service.bootstrap({
    tenantId: 'alpha',
    tenantName: 'Alpha',
    name: 'Admin A',
    email: 'admin@example.com',
    password: adminPassword,
  })
  await service.bootstrap({
    tenantId: 'beta',
    tenantName: 'Beta',
    name: 'Admin B',
    email: 'admin@example.com',
    password: adminPassword,
  })
  const app = express()
  app.use(express.json())
  app.use('/api', createEnterpriseRouter(service))
  app.use((_req, res) => res.status(404).json({ error: 'not_found' }))
  server = await new Promise((resolve, reject) => {
    const listening = app.listen(0, '127.0.0.1', (error) => (error ? reject(error) : resolve(listening)))
    listening.once('error', reject)
  })
  const base = `http://127.0.0.1:${server.address().port}/api`
  async function request(method, endpoint, token, body, tenant) {
    const response = await fetch(base + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(tenant ? { 'X-Tenant-ID': tenant } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
    return {
      status: response.status,
      body: response.status === 204 ? undefined : await response.json(),
      headers: response.headers,
    }
  }
  async function login(tenantId = 'alpha', address = 'admin@example.com', secret = adminPassword) {
    const result = await request('POST', '/auth/login', undefined, { tenantId, email: address, password: secret })
    assert.equal(result.status, 200)
    return result.body
  }
  const admin = await login()
  async function createMember(permissions = ['home:read', 'user:read']) {
    const role = await request('POST', '/admin/roles', admin.token, { name: 'Reader', code: 'reader', permissions })
    assert.equal(role.status, 201)
    const member = await request('POST', '/admin/users', admin.token, {
      name: 'Reader',
      email: 'reader@example.com',
      role: 'reader',
      status: 'active',
      password: adminPassword,
    })
    assert.equal(member.status, 201)
    return { user: member.body, role: role.body, session: await login('alpha', 'reader@example.com') }
  }
  return {
    request,
    login,
    admin,
    service,
    createMember,
    advance: (elapsed) => {
      now += elapsed
    },
    reopen: () => {
      store.close()
      store = new EnterpriseStore(path.join(directory, 'business.sqlite'))
      service.store = store
    },
  }
}

test('tenant-bound sessions isolate list, record, write, audit and spoofed headers', async (t) => {
  const f = await fixture(t),
    beta = await f.login('beta')
  const alphaUsers = await f.request('GET', '/admin/users', f.admin.token)
  assert.equal(alphaUsers.body.total, 1)
  assert.equal(alphaUsers.body.items[0].name, 'Admin A')
  assert.equal((await f.request('GET', '/admin/users', f.admin.token, undefined, 'beta')).status, 403)
  assert.equal((await f.request('GET', `/admin/users/${beta.user.id}`, f.admin.token)).status, 404)
  assert.equal(
    (await f.request('PATCH', `/admin/users/${beta.user.id}`, f.admin.token, { name: 'Spoofed' })).status,
    404
  )
  assert.equal((await f.request('DELETE', `/admin/users/${beta.user.id}`, f.admin.token)).status, 404)
  assert.equal((await f.request('POST', '/admin/users', f.admin.token, { tenantId: 'beta' })).status, 400)
  const audit = await f.request('GET', '/admin/audit', beta.token)
  assert.deepEqual(new Set(audit.body.items.map((row) => row.recordId)), new Set(['beta', beta.user.id]))
  assert.equal(alphaUsers.headers.get('cache-control'), 'no-store')
})
test('RBAC enforces direct requests; client roles and GitHub/demo tokens cannot grant access', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  assert.equal((await f.request('GET', '/admin/users', member.session.token)).status, 200)
  assert.equal((await f.request('GET', '/admin/roles', member.session.token)).status, 403)
  assert.equal(
    (await f.request('POST', '/admin/users', member.session.token, { name: 'Bypass', user_role: 'tenant-admin' }))
      .status,
    403
  )
  assert.equal(
    (await f.request('GET', '/permissions/current', member.session.token)).body.permissions.includes('*:*'),
    false
  )
  for (const token of [undefined, 'admin@test.com', 'gho_unknown', 'x'.repeat(43)])
    assert.equal((await f.request('GET', '/admin/users', token)).status, 401)
})
test('a delegated operator cannot manufacture stronger roles, assign admins or modify stronger users', async (t) => {
  const f = await fixture(t),
    member = await f.createMember(['home:read', 'role:*', 'user:*'])
  const escalation = await f.request('POST', '/admin/roles', member.session.token, {
    name: 'Root',
    code: 'root',
    permissions: ['*:*'],
  })
  assert.equal(escalation.status, 403)
  assert.equal(
    (await f.request('PATCH', `/admin/users/${member.user.id}`, member.session.token, { role: 'tenant-admin' })).status,
    403
  )
  assert.equal(
    (await f.request('PATCH', `/admin/users/${f.admin.user.id}`, member.session.token, { name: 'Hijacked' })).status,
    403
  )
  const role = await f.request('POST', '/admin/roles', member.session.token, {
    name: 'Other reader',
    code: 'other-reader',
    permissions: ['user:read'],
  })
  assert.equal(role.status, 201)
})
test('role revocation is effective on the next server request, with an already-issued session', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  const change = await f.request('PATCH', `/admin/roles/${member.role.id}`, f.admin.token, {
    permissions: ['home:read'],
  })
  assert.equal(change.status, 200)
  assert.equal((await f.request('GET', '/admin/users', member.session.token)).status, 403)
  assert.deepEqual((await f.request('GET', '/permissions/current', member.session.token)).body.permissions, [
    'home:read',
  ])
})
test('disable, delete, password reset, logout, expiry and disabled tenants revoke real sessions', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  assert.equal(
    (await f.request('PATCH', `/admin/users/${member.user.id}`, f.admin.token, { status: 'disabled' })).status,
    200
  )
  assert.equal((await f.request('GET', '/admin/users', member.session.token)).status, 401)
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'reader@example.com',
        password: adminPassword,
      })
    ).status,
    401
  )
  await f.request('PATCH', `/admin/users/${member.user.id}`, f.admin.token, { status: 'active' })
  const active = await f.login('alpha', 'reader@example.com')
  const newPassword = 'Changed-password-123'
  await f.request('PATCH', `/admin/users/${member.user.id}`, f.admin.token, { password: newPassword })
  assert.equal((await f.request('GET', '/auth/session', active.token)).status, 401)
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'reader@example.com',
        password: adminPassword,
      })
    ).status,
    401
  )
  const reset = await f.login('alpha', 'reader@example.com', newPassword)
  assert.equal((await f.request('DELETE', '/auth/session', reset.token)).status, 204)
  assert.equal((await f.request('GET', '/auth/session', reset.token)).status, 401)
  const beforeDelete = await f.login('alpha', 'reader@example.com', newPassword)
  assert.equal((await f.request('DELETE', `/admin/users/${member.user.id}`, f.admin.token)).status, 204)
  assert.equal((await f.request('GET', '/auth/session', beforeDelete.token)).status, 401)
  const beta = await f.login('beta')
  f.service.store.run('UPDATE tenants SET status=? WHERE id=?', 'disabled', 'beta')
  assert.equal((await f.request('GET', '/auth/session', beta.token)).status, 401)
  f.advance(8 * 60 * 60 * 1000 + 1)
  assert.equal((await f.request('GET', '/auth/session', f.admin.token)).status, 401)
})
test('last administrator and built-in role stay valid; assigned roles cannot be deleted or renamed', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  assert.equal(
    (await f.request('PATCH', `/admin/users/${f.admin.user.id}`, f.admin.token, { status: 'disabled' })).status,
    409
  )
  assert.equal((await f.request('DELETE', `/admin/users/${f.admin.user.id}`, f.admin.token)).status, 409)
  assert.equal(
    (await f.request('PATCH', `/admin/users/${f.admin.user.id}`, f.admin.token, { role: 'reader' })).status,
    409
  )
  assert.equal((await f.request('DELETE', `/admin/roles/${member.role.id}`, f.admin.token)).status, 409)
  assert.equal(
    (await f.request('PATCH', `/admin/roles/${member.role.id}`, f.admin.token, { code: 'renamed' })).status,
    409
  )
  const roles = await f.request('GET', '/admin/roles', f.admin.token)
  const builtin = roles.body.items.find((role) => role.code === 'tenant-admin')
  assert.equal((await f.request('PATCH', `/admin/roles/${builtin.id}`, f.admin.token, { permissions: [] })).status, 409)
})
test('audit failure rolls back both business changes and session revocation; audit is append-only', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  const before = await f.request('GET', '/admin/audit', f.admin.token)
  f.service.store.db.exec(
    "CREATE TRIGGER reject_audit BEFORE INSERT ON audit WHEN NEW.action='update' BEGIN SELECT RAISE(ABORT, 'test_audit_unavailable'); END;"
  )
  const actor = f.service.authenticate(f.admin.token)
  await assert.rejects(
    f.service.write(actor, 'users', 'update', member.user.id, { status: 'disabled' }),
    /test_audit_unavailable/
  )
  assert.equal((await f.request('GET', '/admin/users', member.session.token)).status, 200)
  assert.equal((await f.request('GET', '/admin/audit', f.admin.token)).body.total, before.body.total)
  assert.throws(() => f.service.store.run('DELETE FROM audit'), /audit_append_only/)
  assert.throws(() => f.service.store.run('UPDATE audit SET actor=?', 'tampered'), /audit_append_only/)
  assert.equal((await f.request('POST', '/admin/audit', f.admin.token, {})).status, 404)
})
test('a session revoked while a password is hashing cannot commit a pending mutation', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  const actor = f.service.authenticate(f.admin.token)
  const pending = f.service.write(actor, 'users', 'update', member.user.id, { password: 'Some-new-password-123' })
  f.service.logout(actor)
  await assert.rejects(pending, (error) => error.status === 401)
  await f.login('alpha', 'reader@example.com')
})
test('persistent data, audit and hashed sessions survive reopen without leaking credentials', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  const row = f.service.store.one('SELECT password_hash FROM users WHERE id=?', member.user.id)
  assert.match(row.password_hash, /^scrypt:/)
  assert.equal(JSON.stringify(f.service.store.all('SELECT * FROM sessions')).includes(f.admin.token), false)
  f.reopen()
  const users = await f.request('GET', '/admin/users', f.admin.token)
  assert.equal(users.body.total, 2)
  assert.equal(JSON.stringify(users.body).includes('password'), false)
  assert.ok((await f.request('GET', '/admin/audit', f.admin.token)).body.total >= 4)
  await assert.rejects(
    f.service.bootstrap({
      tenantId: 'alpha',
      tenantName: 'Alpha',
      name: 'Reset',
      email: 'reset@example.com',
      password: adminPassword,
    }),
    (error) => error.status === 409
  )
})
test('pagination, search, sorting, fields and references reject malformed or injected input', async (t) => {
  const f = await fixture(t),
    member = await f.createMember()
  for (const query of ['page=0', 'pageSize=201', 'sort=name%3BDROP%20TABLE%20users', 'order=sideways', 'page=1&page=2'])
    assert.equal((await f.request('GET', `/admin/users?${query}`, f.admin.token)).status, 400)
  const filtered = await f.request(
    'GET',
    '/admin/users?page=1&pageSize=1&search=reader&sort=email&order=desc',
    f.admin.token
  )
  assert.equal(filtered.body.total, 1)
  assert.equal(filtered.body.items[0].id, member.user.id)
  assert.equal(
    (await f.request('PATCH', `/admin/users/${member.user.id}`, f.admin.token, { role: 'missing' })).status,
    400
  )
  assert.equal(
    (
      await f.request('POST', '/admin/roles', f.admin.token, {
        code: 'bad',
        name: 'Bad',
        permissions: ['invented:read'],
      })
    ).status,
    400
  )
  assert.equal(
    (await f.request('PATCH', `/admin/users/${member.user.id}`, f.admin.token, { email: 'ADMIN@example.com' })).status,
    409
  )
  assert.equal((await f.request('GET', '/admin/users', f.admin.token)).body.total, 2)
})
test('login rate limits rejected attempts and sets retry metadata', async (t) => {
  const f = await fixture(t)
  // Fixture has one login. Invalid bodies still consume a rate-limit attempt before domain validation.
  for (let attempt = 0; attempt < 19; attempt++)
    assert.equal((await f.request('POST', '/auth/login', undefined, {})).status, 400)
  const blocked = await f.request('POST', '/auth/login', undefined, {})
  assert.equal(blocked.status, 429)
  assert.ok(Number(blocked.headers.get('retry-after')) > 0)
})
test('production configuration refuses volatile/serverless storage and validates session TTL', () => {
  assert.throws(() => openEnterpriseService({ NODE_ENV: 'production' }), /persistent volume/)
  assert.throws(
    () => openEnterpriseService({ NODE_ENV: 'production', ENTERPRISE_DB_PATH: ':memory:' }),
    /persistent volume/
  )
  assert.throws(() => openEnterpriseService({ VERCEL: '1', ENTERPRISE_DB_PATH: ':memory:' }), /persistent host/)
  assert.throws(
    () => openEnterpriseService({ ENTERPRISE_DB_PATH: ':memory:', ENTERPRISE_SESSION_TTL_MS: 'NaN' }),
    /Session TTL/
  )
})
