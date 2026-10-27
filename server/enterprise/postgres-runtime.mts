import { PostgresEnterpriseStore } from './postgres-store.mts'
import { PostgresEnterpriseService } from './postgres-service.mts'
import { verifyPostgresEnterpriseDatabase } from './postgres-schema.mts'

export async function openPostgresEnterpriseService(env: NodeJS.ProcessEnv = process.env) {
  const connectionString = env.DATABASE_URL || env.ENTERPRISE_DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is required for the Enterprise PostgreSQL API')
  const sessionTtlMs = Number(env.ENTERPRISE_SESSION_TTL_MS || 28_800_000)
  if (!Number.isInteger(sessionTtlMs) || sessionTtlMs < 300_000 || sessionTtlMs > 7 * 24 * 60 * 60 * 1000)
    throw new Error('Session TTL must be between 5 minutes and 7 days')
  if (env.ENTERPRISE_TOTP_KEY && !/^[0-9a-fA-F]{64}$/.test(env.ENTERPRISE_TOTP_KEY))
    throw new Error('ENTERPRISE_TOTP_KEY must contain 64 hexadecimal characters')
  const store = new PostgresEnterpriseStore(connectionString)
  try {
    // Allow the new API build to serve existing REST traffic before the explicit v2 migration.
    await verifyPostgresEnterpriseDatabase(store, { allowVersionOne: true })
    const service = new PostgresEnterpriseService(store, {
      sessionTtlMs,
      totpKey: env.ENTERPRISE_TOTP_KEY ? Buffer.from(env.ENTERPRISE_TOTP_KEY, 'hex') : undefined,
    })
    await service.ensureReady()
    return service
  } catch (error) {
    await store.close()
    throw error
  }
}
