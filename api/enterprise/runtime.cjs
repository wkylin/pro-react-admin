const path = require('node:path')

function openEnterpriseService(env = process.env) {
  if (env.NODE_ENV === 'production' && (!env.ENTERPRISE_DB_PATH || env.ENTERPRISE_DB_PATH === ':memory:'))
    throw new Error('ENTERPRISE_DB_PATH must point to a persistent volume in production')
  if (env.VERCEL) throw new Error('SQLite enterprise API requires a persistent host; use an external API on Vercel')
  const { EnterpriseStore } = require('./store.mts')
  const { EnterpriseService } = require('./service.mts')
  const store = new EnterpriseStore(env.ENTERPRISE_DB_PATH || path.join(__dirname, '../data/enterprise.sqlite'))
  try {
    const service = new EnterpriseService(store, { sessionTtlMs: Number(env.ENTERPRISE_SESSION_TTL_MS || 28_800_000) })
    return service
  } catch (error) {
    store.close()
    throw error
  }
}
module.exports = { openEnterpriseService }
