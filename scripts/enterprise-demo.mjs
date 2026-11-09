import { randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import demoAccount from '../config/enterprise-demo.json' with { type: 'json' }
import { migrateEnterpriseDatabase, verifyEnterpriseMigrationStatus } from '../server/enterprise/database-ops.mts'
import { openEnterpriseService } from '../server/enterprise/runtime.cjs'

const bootstrapKeys = [
  'ENTERPRISE_BOOTSTRAP_TENANT',
  'ENTERPRISE_BOOTSTRAP_TENANT_NAME',
  'ENTERPRISE_BOOTSTRAP_NAME',
  'ENTERPRISE_BOOTSTRAP_EMAIL',
  'ENTERPRISE_BOOTSTRAP_PASSWORD',
]

export function getDevelopmentEnvSkipKeys(projectName, enterpriseProject) {
  const keys = new Set(enterpriseProject ? ['REACT_APP_USE_MOCK'] : [])
  // A default app's local setting must not opt another project into its demo backend.
  if (projectName !== 'default') keys.add('ENTERPRISE_LOCAL_DEMO')
  return keys
}

/** Validate before the development launcher normalizes NODE_ENV. This flag never changes browser authentication. */
export function validateLocalEnterpriseDemoMode(projectName, env) {
  if (env.ENTERPRISE_LOCAL_DEMO !== 'true') return false
  if (projectName !== 'default') throw new Error('ENTERPRISE_LOCAL_DEMO is supported only for the default project')
  if (env.NODE_ENV === 'production' || env.VERCEL)
    throw new Error('ENTERPRISE_LOCAL_DEMO requires local development and is unavailable in production or Vercel')
  return true
}

export function shouldUseLocalEnterpriseDemo(root, env) {
  if (env.NODE_ENV === 'production' || env.VERCEL) return false
  // The default app keeps mock login; its independent search API must be explicitly opted into.
  if (env.REACT_APP_USE_MOCK === 'true' && env.ENTERPRISE_LOCAL_DEMO !== 'true') return false
  if (env.ENTERPRISE_DB_PATH || env.ENTERPRISE_API_TARGET || env.APP_BASE_URL) return false
  if (bootstrapKeys.some((key) => env[key])) return false
  return !existsSync(path.join(root, 'api/data/enterprise.sqlite'))
}

/** Local starters may provision this isolated, gitignored database; default mock mode requires explicit opt-in. */
export async function prepareLocalEnterpriseDemo(root, env) {
  if (!shouldUseLocalEnterpriseDemo(root, env)) {
    if (env.ENTERPRISE_LOCAL_DEMO === 'true')
      throw new Error(
        'ENTERPRISE_LOCAL_DEMO requires local development without custom Enterprise databases, external API targets, bootstrap settings or an existing enterprise.sqlite'
      )
    return null
  }

  const directory = path.join(root, 'api/data')
  const keyPath = path.join(directory, 'enterprise-demo-totp.key')
  const apiPort = Number(env.TRACKING_API_PORT || 5200)
  if (!Number.isInteger(apiPort) || apiPort < 1 || apiPort > 65535) {
    throw new Error('TRACKING_API_PORT must be an integer between 1 and 65535')
  }
  mkdirSync(directory, { recursive: true, mode: 0o700 })

  if (!env.ENTERPRISE_TOTP_KEY) {
    if (!existsSync(keyPath)) writeFileSync(keyPath, randomBytes(32).toString('hex'), { flag: 'wx', mode: 0o600 })
    env.ENTERPRISE_TOTP_KEY = readFileSync(keyPath, 'utf8').trim()
  }
  env.REACT_APP_ENTERPRISE_LOCAL_DEMO = 'true'
  env.HOST = '127.0.0.1'

  // Reuse the original demo data when free; concurrent local starters get independent per-port files.
  for (let slot = 0; slot < 32; slot++) {
    const suffix = slot === 0 ? '' : slot === 1 ? `-${apiPort}` : `-${apiPort}-${slot}`
    const databasePath = path.join(directory, `enterprise-demo${suffix}.sqlite`)
    env.ENTERPRISE_DB_PATH = databasePath
    try {
      const seeded = !existsSync(databasePath)
      if (seeded) await migrateEnterpriseDatabase(databasePath)
      else {
        const status = await verifyEnterpriseMigrationStatus(databasePath)
        if (status.pendingMigrations.length) await migrateEnterpriseDatabase(databasePath)
      }

      const service = openEnterpriseService(env)
      try {
        if (!service.store.one('SELECT id FROM tenants WHERE id=?', demoAccount.tenantId)) {
          await service.bootstrap(demoAccount)
        }
        service.grantPlatformAdmin(demoAccount.tenantId, demoAccount.email)
      } finally {
        service.store.close()
      }

      // Enable the API only after migration and seeding succeed; never fall back to a business database.
      env.ENTERPRISE_ENABLED = 'true'
      return { account: demoAccount, databasePath, seeded }
    } catch (error) {
      if (error instanceof Error && /^Enterprise database is already in use by process \d+$/.test(error.message)) {
        continue
      }
      throw error
    }
  }
  throw new Error('No available local Enterprise demo SQLite slot; stop an existing demo or set ENTERPRISE_DB_PATH')
}
