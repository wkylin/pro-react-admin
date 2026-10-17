const path = require('node:path')

function openEnterpriseService(env = process.env) {
  if (env.NODE_ENV === 'production' && (!env.ENTERPRISE_DB_PATH || env.ENTERPRISE_DB_PATH === ':memory:'))
    throw new Error('ENTERPRISE_DB_PATH must point to a persistent volume in production')
  if (env.VERCEL) throw new Error('SQLite enterprise API requires a persistent host; use an external API on Vercel')
  const sessionTtlMs = Number(env.ENTERPRISE_SESSION_TTL_MS || 28_800_000)
  if (!Number.isInteger(sessionTtlMs) || sessionTtlMs < 300_000 || sessionTtlMs > 7 * 24 * 60 * 60 * 1000)
    throw new Error('Session TTL must be between 5 minutes and 7 days')
  const { EnterpriseStore } = require('./store.mts')
  const { EnterpriseService } = require('./service.mts')
  const store = new EnterpriseStore(env.ENTERPRISE_DB_PATH || path.join(__dirname, '../data/enterprise.sqlite'), {
    migrationMode: 'verify',
  })
  try {
    const service = new EnterpriseService(store, { sessionTtlMs })
    return service
  } catch (error) {
    store.close()
    throw error
  }
}
module.exports = { openEnterpriseService }
