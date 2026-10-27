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
import { base32, decryptTotpSecret, totpAtStep } from './totp.mts'

const require = createRequire(import.meta.url)
const express = require('express')
const adminPassword = 'Integration-password-42'
const totpKey = Buffer.alloc(32, 42)
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
  const service = new EnterpriseService(store, { now: () => now, totpKey })
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
    currentTime: () => now,
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

test('only a designated platform administrator can manage tenant records', async (t) => {
  const f = await fixture(t)
  assert.equal((await f.request('GET', '/admin/tenants', f.admin.token)).status, 403)
  f.service.grantPlatformAdmin('alpha', 'admin@example.com')
  const grants = await f.request('GET', '/permissions/current', f.admin.token)
  assert.ok(grants.body.roles.some((role) => role.code === 'platform-admin' && role.permissions.includes('tenant:*')))

  const initial = await f.request('GET', '/admin/tenants?page=1&pageSize=10', f.admin.token)
  assert.equal(initial.status, 200)
  assert.deepEqual(
    initial.body.items.map((row) => row.id),
    ['alpha', 'beta']
  )
  assert.equal((await f.request('GET', '/admin/tenants/beta', f.admin.token)).body.name, 'Beta')
  assert.equal((await f.request('GET', '/admin/tenants?sort=name%3BDROP', f.admin.token)).status, 400)

  const created = await f.request('POST', '/admin/tenants', f.admin.token, {
    tenantId: 'gamma',
    name: 'Gamma',
    adminName: 'Admin G',
    adminEmail: 'gamma@example.com',
    adminPassword,
  })
  assert.equal(created.status, 201)
  assert.equal(created.body.id, 'gamma')
  assert.equal(created.body.adminEmail, 'gamma@example.com')
  assert.equal(JSON.stringify(created.body).includes(adminPassword), false)
  assert.equal(
    (await f.request('POST', '/admin/tenants', f.admin.token, { tenantId: 'gamma', name: 'Duplicate' })).status,
    400
  )
  const gamma = await f.login('gamma', 'gamma@example.com')
  assert.equal((await f.request('GET', '/admin/tenants', gamma.token)).status, 403)
  assert.equal((await f.request('PATCH', '/admin/tenants/beta', gamma.token, { name: 'No' })).status, 403)
  assert.equal((await f.request('POST', '/admin/tenants', gamma.token, {})).status, 403)
  assert.equal(
    (
      await f.request('POST', '/admin/roles', f.admin.token, {
        name: 'Platform',
        code: 'platform',
        permissions: ['tenant:read'],
      })
    ).status,
    403
  )
  assert.throws(
    () => f.service.revokePlatformAdmin('alpha', 'admin@example.com'),
    (error) => error.status === 409
  )

  const updated = await f.request('PATCH', '/admin/tenants/gamma', f.admin.token, { name: 'Gamma Team' })
  assert.equal(updated.status, 200)
  assert.equal(updated.body.name, 'Gamma Team')
  assert.equal((await f.request('DELETE', '/admin/tenants/alpha', f.admin.token)).status, 409)
  assert.equal((await f.request('DELETE', '/admin/tenants/gamma', f.admin.token)).status, 204)
  assert.equal((await f.request('GET', '/auth/session', gamma.token)).status, 401)
  assert.equal((await f.request('GET', '/admin/tenants/gamma', f.admin.token)).body.status, 'disabled')
  assert.equal((await f.request('PATCH', '/admin/tenants/gamma', f.admin.token, { status: 'active' })).status, 200)
  assert.equal((await f.login('gamma', 'gamma@example.com')).tenantId, 'gamma')
  f.service.grantPlatformAdmin('gamma', 'gamma@example.com')
  assert.ok(f.service.revokePlatformAdmin('gamma', 'gamma@example.com'))
  f.service.grantPlatformAdmin('gamma', 'gamma@example.com')
  assert.equal((await f.request('DELETE', '/admin/tenants/gamma', f.admin.token)).status, 204)
  assert.throws(
    () => f.service.revokePlatformAdmin('alpha', 'admin@example.com'),
    (error) => error.status === 409
  )
})

test('enterprise TOTP requires password, encrypted enrollment, one-time login codes and recovery', async (t) => {
  const f = await fixture(t)
  const endpoint = '/auth/totp'
  assert.deepEqual((await f.request('GET', endpoint, f.admin.token)).body, {
    enabled: false,
    available: true,
    recoveryCodesRemaining: 0,
  })
  assert.equal((await f.request('POST', `${endpoint}/setup`, f.admin.token, { password: 'wrong' })).status, 401)
  const setup = await f.request('POST', `${endpoint}/setup`, f.admin.token, { password: adminPassword })
  assert.equal(setup.status, 200)
  assert.match(setup.body.uri, /^otpauth:\/\/totp\//)
  const principal = f.service.store.one(
    'SELECT principal_id FROM users WHERE tenant_id=? AND id=?',
    'alpha',
    f.admin.user.id
  )
  const row = f.service.store.one('SELECT * FROM totp_credentials WHERE principal_id=?', principal.principal_id)
  assert.ok(row)
  const secret = decryptTotpSecret(row.secret_ciphertext, totpKey, principal.principal_id)
  assert.equal(setup.body.secret, base32(secret))
  assert.ok(!row.secret_ciphertext.includes(setup.body.secret))
  assert.throws(() => new EnterpriseService(f.service.store), /ENTERPRISE_TOTP_KEY/)
  assert.throws(() => new EnterpriseService(f.service.store, { totpKey: Buffer.alloc(32, 1) }), /cannot decrypt/)
  assert.equal((await f.request('POST', `${endpoint}/confirm`, f.admin.token, { code: 'not-a-code' })).status, 401)
  const code = () => totpAtStep(secret, Math.floor(f.currentTime() / 30000))
  const confirmed = await f.request('POST', `${endpoint}/confirm`, f.admin.token, { code: code() })
  assert.equal(confirmed.status, 200)
  assert.equal(confirmed.body.recoveryCodes.length, 10)
  assert.equal((await f.request('GET', endpoint, f.admin.token)).body.recoveryCodesRemaining, 10)

  const passwordOnly = await f.request('POST', '/auth/login', undefined, {
    tenantId: 'alpha',
    email: 'admin@example.com',
    password: adminPassword,
  })
  assert.deepEqual(passwordOnly.body, { totpRequired: true })
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
        totpCode: code(),
      })
    ).status,
    401
  )
  f.advance(31_000)
  const nextCode = code()
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
        totpCode: nextCode,
      })
    ).status,
    200
  )
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
        totpCode: nextCode,
      })
    ).status,
    401
  )

  const firstRecovery = confirmed.body.recoveryCodes[0]
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
        recoveryCode: firstRecovery,
      })
    ).status,
    200
  )
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
        recoveryCode: firstRecovery,
      })
    ).status,
    401
  )
  assert.equal((await f.request('GET', endpoint, f.admin.token)).body.recoveryCodesRemaining, 9)

  f.advance(31_000)
  const rotated = await f.request('POST', `${endpoint}/recovery`, f.admin.token, {
    password: adminPassword,
    totpCode: code(),
  })
  assert.equal(rotated.status, 200)
  assert.equal(rotated.body.recoveryCodes.length, 10)
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
        recoveryCode: confirmed.body.recoveryCodes[1],
      })
    ).status,
    401
  )
  assert.equal(
    (
      await f.request('POST', `${endpoint}/disable`, f.admin.token, {
        password: 'wrong',
        recoveryCode: rotated.body.recoveryCodes[0],
      })
    ).status,
    401
  )
  assert.equal(
    (
      await f.request('POST', `${endpoint}/disable`, f.admin.token, {
        password: adminPassword,
        recoveryCode: rotated.body.recoveryCodes[0],
      })
    ).status,
    200
  )
  assert.equal((await f.request('GET', endpoint, f.admin.token)).body.enabled, false)
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'admin@example.com',
        password: adminPassword,
      })
    ).status,
    200
  )
})

test('one enterprise principal shares TOTP across linked tenants and second-factor attempts are limited', async (t) => {
  const f = await fixture(t)
  const alpha = f.service.store.one(
    'SELECT principal_id FROM users WHERE tenant_id=? AND id=?',
    'alpha',
    f.admin.user.id
  )
  f.service.store.run('UPDATE users SET principal_id=? WHERE tenant_id=?', alpha.principal_id, 'beta')
  const beta = await f.login('beta')
  const setup = await f.request('POST', '/auth/totp/setup', f.admin.token, { password: adminPassword })
  assert.equal(setup.status, 200)
  const row = f.service.store.one('SELECT * FROM totp_credentials WHERE principal_id=?', alpha.principal_id)
  const secret = decryptTotpSecret(row.secret_ciphertext, totpKey, alpha.principal_id)
  const code = () => totpAtStep(secret, Math.floor(f.currentTime() / 30000))
  assert.equal((await f.request('POST', '/auth/totp/confirm', f.admin.token, { code: code() })).status, 200)
  assert.equal((await f.request('GET', '/auth/session', beta.token)).status, 401)
  assert.deepEqual(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'beta',
        email: 'admin@example.com',
        password: adminPassword,
      })
    ).body,
    { totpRequired: true }
  )
  for (let attempt = 0; attempt < 10; attempt++) {
    assert.equal(
      (
        await f.request('POST', '/auth/login', undefined, {
          tenantId: 'beta',
          email: 'admin@example.com',
          password: adminPassword,
          totpCode: 'xxxxxx',
        })
      ).status,
      401
    )
  }
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'beta',
        email: 'admin@example.com',
        password: adminPassword,
        totpCode: code(),
      })
    ).status,
    429
  )
  f.advance(10 * 60_000 + 30_000)
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'beta',
        email: 'admin@example.com',
        password: adminPassword,
        totpCode: code(),
      })
    ).status,
    200
  )
})
test('an authenticated identity can switch only to an active linked tenant membership', async (t) => {
  const f = await fixture(t)
  const alphaUser = f.service.store.one('SELECT id,principal_id FROM users WHERE tenant_id=?', 'alpha')
  const betaUser = f.service.store.one('SELECT id,principal_id FROM users WHERE tenant_id=?', 'beta')
  assert.notEqual(alphaUser.principal_id, betaUser.principal_id)

  // This is an operator-provisioned identity link. The public API intentionally cannot create one.
  f.service.store.run(
    'UPDATE users SET principal_id=? WHERE tenant_id=? AND id=?',
    alphaUser.principal_id,
    'beta',
    betaUser.id
  )
  assert.equal(f.service.store.one('SELECT id FROM principals WHERE id=?', betaUser.principal_id), undefined)

  const switched = await f.request('POST', '/auth/session/tenant', f.admin.token, { tenantId: 'beta' })
  assert.equal(switched.status, 200)
  assert.equal(switched.body.tenantId, 'beta')
  assert.equal((await f.request('GET', '/auth/session', f.admin.token)).body.tenantId, 'beta')
  assert.equal((await f.request('GET', '/admin/users', f.admin.token)).body.items[0].id, betaUser.id)
  assert.equal((await f.request('GET', '/admin/users', f.admin.token, undefined, 'alpha')).status, 403)

  const switchedBack = await f.request('POST', '/auth/session/tenant', f.admin.token, { tenantId: 'alpha' })
  assert.equal(switchedBack.status, 200)
  assert.equal(switchedBack.body.tenantId, 'alpha')
  assert.equal((await f.request('POST', '/auth/session/tenant', f.admin.token, { tenantId: 'missing' })).status, 403)
  assert.equal(
    (await f.request('POST', '/auth/session/tenant', f.admin.token, { tenantId: 'beta', principalId: 'spoof' })).status,
    400
  )
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
test('role resource scopes filter lists and reject records outside the selected set', async (t) => {
  const f = await fixture(t)
  const role = await f.request('POST', '/admin/roles', f.admin.token, {
    name: 'Selected user reader',
    code: 'selected-user-reader',
    permissions: ['home:read', 'user:read'],
    scopes: { user: { mode: 'restricted', ids: [f.admin.user.id] }, role: { mode: 'deny', ids: [] } },
  })
  assert.equal(role.status, 201)
  const user = await f.request('POST', '/admin/users', f.admin.token, {
    name: 'Scoped reader',
    email: 'scoped@example.com',
    role: role.body.code,
    status: 'active',
    password: adminPassword,
  })
  assert.equal(user.status, 201)
  const session = await f.login('alpha', 'scoped@example.com')
  const list = await f.request('GET', '/admin/users', session.token)
  assert.equal(list.status, 200)
  assert.deepEqual(
    list.body.items.map(({ id }) => id),
    [f.admin.user.id]
  )
  assert.equal((await f.request('GET', `/admin/users/${f.admin.user.id}`, session.token)).status, 200)
  assert.equal((await f.request('GET', `/admin/users/${user.body.id}`, session.token)).status, 403)
  assert.equal((await f.request('GET', '/admin/roles', session.token)).status, 403)
  assert.ok(
    (await f.request('GET', '/permissions/current', session.token)).body.routes.includes('/administration/users')
  )

  const denied = await f.request('PATCH', `/admin/roles/${role.body.id}`, f.admin.token, {
    scopes: { user: { mode: 'deny', ids: [] }, role: { mode: 'deny', ids: [] } },
  })
  assert.equal(denied.status, 200)
  assert.equal((await f.request('GET', '/admin/users', session.token)).status, 403)
  assert.ok(
    !(await f.request('GET', '/permissions/current', session.token)).body.routes.includes('/administration/users')
  )
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
  assert.equal(role.status, 409)
  const empty = await f.request('POST', '/admin/roles', member.session.token, {
    name: 'Other reader',
    code: 'other-reader',
    permissions: [],
  })
  assert.equal(empty.status, 201)
  const change = { kind: 'role', targetId: empty.body.id, change: { permissions: ['user:read'] } }
  const preview = await f.request('POST', '/admin/access-requests/preview', member.session.token, change)
  assert.equal(preview.status, 200)
  const proposal = await f.request('POST', '/admin/access-requests', member.session.token, {
    ...change,
    reason: 'Give the reader access to users',
    fingerprint: preview.body.fingerprint,
  })
  assert.equal(proposal.status, 201)
  assert.equal(
    (
      await f.request('POST', `/admin/access-requests/${proposal.body.id}/decision`, member.session.token, {
        decision: 'approve',
        reason: 'Self approval is not permitted',
      })
    ).status,
    403
  )
  const approved = await f.request('POST', `/admin/access-requests/${proposal.body.id}/decision`, f.admin.token, {
    decision: 'approve',
    reason: 'Reviewed delegated grant',
  })
  assert.equal(approved.status, 200)
  assert.equal(approved.body.status, 'approved')
  assert.deepEqual((await f.request('GET', `/admin/roles/${empty.body.id}`, f.admin.token)).body.permissions, [
    'user:read',
  ])
})
test('access requests are tenant isolated and stale previews cannot apply', async (t) => {
  const f = await fixture(t)
  const operator = await f.createMember(['home:read', 'role:*', 'user:read', 'access:read', 'access:approve'])
  const role = await f.request('POST', '/admin/roles', operator.session.token, {
    name: 'Pending role',
    code: 'pending-role',
    permissions: [],
  })
  assert.equal(role.status, 201)
  const change = { kind: 'role', targetId: role.body.id, change: { permissions: ['user:read'] } }
  const preview = await f.request('POST', '/admin/access-requests/preview', operator.session.token, change)
  assert.equal(preview.status, 200)
  assert.equal(
    (
      await f.request('POST', '/admin/access-requests', operator.session.token, {
        ...change,
        reason: 'Old preview',
        fingerprint: 'x'.repeat(64),
      })
    ).status,
    409
  )
  const proposal = await f.request('POST', '/admin/access-requests', operator.session.token, {
    ...change,
    reason: 'Let the role list users',
    fingerprint: preview.body.fingerprint,
  })
  assert.equal(proposal.status, 201)
  const beta = await f.login('beta')
  assert.equal((await f.request('GET', '/admin/access-requests', beta.token)).body.total, 0)
  assert.equal(
    (
      await f.request('POST', `/admin/access-requests/${proposal.body.id}/decision`, beta.token, {
        decision: 'approve',
        reason: 'Other tenant',
      })
    ).status,
    404
  )
  assert.equal(
    (
      await f.request('PATCH', `/admin/roles/${role.body.id}`, f.admin.token, {
        permissions: ['home:read'],
      })
    ).status,
    409
  )
  assert.equal(
    (
      await f.request('PATCH', `/admin/roles/${role.body.id}`, f.admin.token, {
        name: 'Renamed while pending',
      })
    ).status,
    200
  )
  const stale = await f.request('POST', `/admin/access-requests/${proposal.body.id}/decision`, f.admin.token, {
    decision: 'approve',
    reason: 'Checked',
  })
  assert.equal(stale.status, 200)
  assert.equal(stale.body.status, 'stale')
  assert.deepEqual((await f.request('GET', `/admin/roles/${role.body.id}`, f.admin.token)).body.permissions, [])
  assert.equal(
    (
      await f.request('POST', `/admin/access-requests/${proposal.body.id}/decision`, f.admin.token, {
        decision: 'approve',
        reason: 'Again',
      })
    ).status,
    409
  )
})
test('an independent reviewer can activate a user while direct activation is blocked', async (t) => {
  const f = await fixture(t)
  const reviewer = await f.createMember(['home:read', 'user:read', 'access:read', 'access:approve'])
  const target = await f.request('POST', '/admin/users', f.admin.token, {
    name: 'Pending member',
    email: 'pending@example.com',
    role: reviewer.role.code,
    status: 'disabled',
    password: adminPassword,
  })
  assert.equal(target.status, 201)
  assert.equal(
    (
      await f.request('PATCH', `/admin/users/${target.body.id}`, f.admin.token, {
        status: 'active',
      })
    ).status,
    409
  )
  const change = { kind: 'user', targetId: target.body.id, change: { role: reviewer.role.code, status: 'active' } }
  const preview = await f.request('POST', '/admin/access-requests/preview', f.admin.token, change)
  assert.equal(preview.status, 200)
  const proposal = await f.request('POST', '/admin/access-requests', f.admin.token, {
    ...change,
    reason: 'Onboard new team member',
    fingerprint: preview.body.fingerprint,
  })
  assert.equal(proposal.status, 201)
  assert.equal(
    (
      await f.request('POST', `/admin/access-requests/${proposal.body.id}/decision`, f.admin.token, {
        decision: 'approve',
        reason: 'Self review',
      })
    ).status,
    403
  )
  const approved = await f.request(
    'POST',
    `/admin/access-requests/${proposal.body.id}/decision`,
    reviewer.session.token,
    {
      decision: 'approve',
      reason: 'Account verified',
    }
  )
  assert.equal(approved.status, 200)
  assert.equal(approved.body.status, 'approved')
  assert.equal((await f.request('GET', `/admin/users/${target.body.id}`, f.admin.token)).body.status, 'active')
  assert.equal(
    (
      await f.request('POST', '/auth/login', undefined, {
        tenantId: 'alpha',
        email: 'pending@example.com',
        password: adminPassword,
      })
    ).status,
    200
  )
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
