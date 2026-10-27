import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import demoAccount from '../config/enterprise-demo.json' with { type: 'json' }
import { openEnterpriseService } from '../server/enterprise/runtime.cjs'
import { migrateEnterpriseDatabase } from '../server/enterprise/database-ops.mts'
import { prepareLocalEnterpriseDemo, shouldUseLocalEnterpriseDemo } from './enterprise-demo.mjs'

test('local Enterprise starter provisions a persistent demo tenant and authenticator key', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-demo-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const env = { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'false' }
  const first = await prepareLocalEnterpriseDemo(root, env)
  assert.equal(first.seeded, true)
  assert.equal(env.REACT_APP_ENTERPRISE_LOCAL_DEMO, 'true')
  assert.equal(env.HOST, '127.0.0.1')
  assert.equal(existsSync(first.databasePath), true)
  const keyPath = path.join(root, 'api/data/enterprise-demo-totp.key')
  assert.match(readFileSync(keyPath, 'utf8'), /^[0-9a-f]{64}$/)
  const key = env.ENTERPRISE_TOTP_KEY

  const service = openEnterpriseService(env)
  try {
    const session = await service.login({
      tenantId: demoAccount.tenantId,
      email: demoAccount.email,
      password: demoAccount.password,
    })
    assert.equal(session.tenantId, demoAccount.tenantId)
    const principal = service.authenticate(session.token)
    assert.ok(service.permissions(principal).roles.some((role) => role.code === 'platform-admin'))
  } finally {
    service.store.close()
  }

  const restartedEnv = { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'false' }
  const second = await prepareLocalEnterpriseDemo(root, restartedEnv)
  assert.equal(second.seeded, false)
  assert.equal(restartedEnv.ENTERPRISE_TOTP_KEY, key)
  assert.equal(second.databasePath, first.databasePath)
})

test('a second local Enterprise starter gets its own database while the first instance holds the default file', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-demo-parallel-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const firstEnv = { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'false', TRACKING_API_PORT: '5200' }
  const first = await prepareLocalEnterpriseDemo(root, firstEnv)
  const firstService = openEnterpriseService(firstEnv)
  try {
    const secondEnv = { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'false', TRACKING_API_PORT: '5201' }
    const second = await prepareLocalEnterpriseDemo(root, secondEnv)
    assert.equal(second.databasePath, path.join(root, 'api/data/enterprise-demo-5201.sqlite'))
    assert.equal(second.seeded, true)
    assert.notEqual(second.databasePath, first.databasePath)
    const secondService = openEnterpriseService(secondEnv)
    try {
      const session = await secondService.login({
        tenantId: demoAccount.tenantId,
        email: demoAccount.email,
        password: demoAccount.password,
      })
      assert.equal(session.tenantId, demoAccount.tenantId)
    } finally {
      secondService.store.close()
    }
  } finally {
    firstService.store.close()
  }
})

test('local Enterprise starter does not provision custom or production databases', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-custom-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  for (const env of [
    { NODE_ENV: 'production' },
    { NODE_ENV: 'development', VERCEL: '1' },
    { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'true' },
    { NODE_ENV: 'development', ENTERPRISE_DB_PATH: ':memory:' },
    { NODE_ENV: 'development', ENTERPRISE_BOOTSTRAP_TENANT: 'acme' },
    { NODE_ENV: 'development', APP_BASE_URL: 'https://api.example.com' },
  ]) {
    assert.equal(shouldUseLocalEnterpriseDemo(root, env), false)
    assert.equal(await prepareLocalEnterpriseDemo(root, env), null)
  }
  assert.equal(existsSync(path.join(root, 'api/data/enterprise-demo.sqlite')), false)

  await migrateEnterpriseDatabase(path.join(root, 'api/data/enterprise.sqlite'))
  assert.equal(shouldUseLocalEnterpriseDemo(root, { NODE_ENV: 'development' }), false)
})
