import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import demoAccount from '../config/enterprise-demo.json' with { type: 'json' }
import { openEnterpriseService } from '../server/enterprise/runtime.cjs'
import { migrateEnterpriseDatabase } from '../server/enterprise/database-ops.mts'
import {
  prepareLocalEnterpriseDemo,
  shouldUseLocalEnterpriseDemo,
  validateLocalEnterpriseDemoMode,
} from './enterprise-demo.mjs'

test('an explicit local demo enables the default API while preserving mock authentication', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-default-demo-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const env = {
    NODE_ENV: 'development',
    REACT_APP_USE_MOCK: 'true',
    ENTERPRISE_LOCAL_DEMO: 'true',
    TRACKING_API_PORT: '5279',
  }
  const demo = await prepareLocalEnterpriseDemo(root, env)
  assert.ok(demo, 'the explicit local mode must provision a separate demo API')
  assert.equal(env.REACT_APP_USE_MOCK, 'true')
  assert.equal(env.ENTERPRISE_ENABLED, 'true')
  assert.equal(env.TRACKING_API_PORT, '5279')
  assert.equal(env.ENTERPRISE_DB_PATH, path.join(root, 'api/data/enterprise-demo.sqlite'))
  const service = openEnterpriseService(env)
  try {
    const session = await service.login({
      tenantId: demoAccount.tenantId,
      email: demoAccount.email,
      password: demoAccount.password,
    })
    assert.equal(session.tenantId, demoAccount.tenantId)
  } finally {
    service.store.close()
  }
})

test('the explicit local mode is validated before development startup normalizes NODE_ENV', () => {
  assert.equal(validateLocalEnterpriseDemoMode('default', { ENTERPRISE_LOCAL_DEMO: 'true' }), true)
  for (const flag of [undefined, 'false', '1']) {
    assert.equal(validateLocalEnterpriseDemoMode('default', { ENTERPRISE_LOCAL_DEMO: flag }), false)
  }
  for (const project of ['enterprise', 'projectA']) {
    assert.throws(() => validateLocalEnterpriseDemoMode(project, { ENTERPRISE_LOCAL_DEMO: 'true' }), /only.*default/)
  }
  for (const env of [{ NODE_ENV: 'production' }, { VERCEL: '1' }]) {
    assert.throws(
      () => validateLocalEnterpriseDemoMode('default', { ...env, ENTERPRISE_LOCAL_DEMO: 'true' }),
      /local development/
    )
  }
})

test('mock startup without the explicit flag never provisions or enables an Enterprise API', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-default-disabled-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  for (const flag of [undefined, 'false', '1']) {
    const env = { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'true', ENTERPRISE_LOCAL_DEMO: flag }
    assert.equal(await prepareLocalEnterpriseDemo(root, env), null)
    assert.equal(env.ENTERPRISE_ENABLED, undefined)
  }
  assert.equal(existsSync(path.join(root, 'api/data')), false)
})

test('explicit local mode fails closed for production, external APIs and custom Enterprise data', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-default-protected-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  for (const protectedSetting of [
    { NODE_ENV: 'production' },
    { VERCEL: '1' },
    { ENTERPRISE_DB_PATH: ':memory:' },
    { ENTERPRISE_API_TARGET: 'https://enterprise.example.test' },
    { APP_BASE_URL: 'https://api.example.test' },
    { ENTERPRISE_BOOTSTRAP_TENANT: 'custom' },
    { ENTERPRISE_BOOTSTRAP_TENANT_NAME: 'Custom' },
    { ENTERPRISE_BOOTSTRAP_NAME: 'Custom' },
    { ENTERPRISE_BOOTSTRAP_EMAIL: 'custom@example.test' },
    { ENTERPRISE_BOOTSTRAP_PASSWORD: 'custom-password' },
  ]) {
    const env = {
      NODE_ENV: 'development',
      REACT_APP_USE_MOCK: 'true',
      ENTERPRISE_LOCAL_DEMO: 'true',
      ...protectedSetting,
    }
    assert.equal(shouldUseLocalEnterpriseDemo(root, env), false)
    await assert.rejects(prepareLocalEnterpriseDemo(root, env), /ENTERPRISE_LOCAL_DEMO/)
    assert.equal(env.ENTERPRISE_ENABLED, undefined)
  }
  assert.equal(existsSync(path.join(root, 'api/data')), false)
  await migrateEnterpriseDatabase(path.join(root, 'api/data/enterprise.sqlite'))
  const env = { NODE_ENV: 'development', REACT_APP_USE_MOCK: 'true', ENTERPRISE_LOCAL_DEMO: 'true' }
  await assert.rejects(prepareLocalEnterpriseDemo(root, env), /existing enterprise.sqlite/)
  assert.equal(env.ENTERPRISE_ENABLED, undefined)
  assert.equal(existsSync(path.join(root, 'api/data/enterprise-demo.sqlite')), false)
})

test('a failed local demo setup never enables the API', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'enterprise-default-failed-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const env = {
    NODE_ENV: 'development',
    REACT_APP_USE_MOCK: 'true',
    ENTERPRISE_LOCAL_DEMO: 'true',
    ENTERPRISE_TOTP_KEY: 'invalid-fixture',
  }
  await assert.rejects(prepareLocalEnterpriseDemo(root, env), /ENTERPRISE_TOTP_KEY/)
  assert.equal(env.ENTERPRISE_ENABLED, undefined)
})

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
