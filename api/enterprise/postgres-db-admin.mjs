import { PostgresEnterpriseStore } from './postgres-store.mts'
import { migratePostgresEnterpriseDatabase, verifyPostgresEnterpriseDatabase } from './postgres-schema.mts'
import { PostgresEnterpriseService } from './postgres-service.mts'

const [command, ...args] = process.argv.slice(2).filter((item) => item !== '--')
const usage = `Usage:
  pnpm run api:pg status
  pnpm run api:pg migrate
  pnpm run api:pg bootstrap
  pnpm run api:pg grant-platform-admin --tenant <id> --email <address>
  pnpm run api:pg revoke-platform-admin --tenant <id> --email <address>`

function option(name) {
  const at = args.indexOf(name)
  if (at < 0 || !args[at + 1] || args[at + 1].startsWith('--')) throw new Error(`Missing ${name}`)
  return args[at + 1]
}

const url = process.env.DATABASE_URL || process.env.ENTERPRISE_DATABASE_URL
let store
try {
  if (!url) throw new Error('DATABASE_URL is required')
  store = new PostgresEnterpriseStore(url)
  let result
  if (command === 'migrate') {
    if (args.length) throw new Error(usage)
    result = await migratePostgresEnterpriseDatabase(store)
  } else if (command === 'status') {
    if (args.length) throw new Error(usage)
    result = await verifyPostgresEnterpriseDatabase(store)
  } else if (command === 'bootstrap') {
    if (args.length) throw new Error(usage)
    await verifyPostgresEnterpriseDatabase(store)
    const service = new PostgresEnterpriseService(store)
    const user = await service.bootstrap({
      tenantId: process.env.ENTERPRISE_BOOTSTRAP_TENANT,
      tenantName: process.env.ENTERPRISE_BOOTSTRAP_TENANT_NAME,
      name: process.env.ENTERPRISE_BOOTSTRAP_NAME,
      email: process.env.ENTERPRISE_BOOTSTRAP_EMAIL,
      password: process.env.ENTERPRISE_BOOTSTRAP_PASSWORD,
    })
    result = { tenantId: process.env.ENTERPRISE_BOOTSTRAP_TENANT, admin: user.email }
  } else if (command === 'grant-platform-admin' || command === 'revoke-platform-admin') {
    if (args.length !== 4) throw new Error(usage)
    await verifyPostgresEnterpriseDatabase(store)
    const service = new PostgresEnterpriseService(store)
    const tenant = option('--tenant')
    const email = option('--email')
    const principalId = command === 'grant-platform-admin'
      ? await service.grantPlatformAdmin(tenant, email)
      : await service.revokePlatformAdmin(tenant, email)
    result = { principalId, action: command }
  } else throw new Error(usage)
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
} finally {
  await store?.close()
}
