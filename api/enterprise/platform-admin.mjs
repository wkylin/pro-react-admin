import { openEnterpriseService } from './runtime.cjs'

const args = process.argv.slice(2)
if (args[0] === '--') args.shift()
const action = args.shift()
const values = {}
for (let index = 0; index < args.length; index += 2) {
  const key = args[index]
  if (!['--tenant', '--email'].includes(key) || !args[index + 1] || values[key]) {
    throw new Error('Usage: platform-admin.mjs <grant|revoke> --tenant <id> --email <tenant-admin-email>')
  }
  values[key] = args[index + 1]
}
if (!['grant', 'revoke'].includes(action) || !values['--tenant'] || !values['--email']) {
  throw new Error('Usage: platform-admin.mjs <grant|revoke> --tenant <id> --email <tenant-admin-email>')
}

const service = openEnterpriseService()
try {
  const principalId =
    action === 'grant'
      ? service.grantPlatformAdmin(values['--tenant'], values['--email'])
      : service.revokePlatformAdmin(values['--tenant'], values['--email'])
  console.log(`Platform administrator ${action} complete; principal id=${principalId}`)
} finally {
  service.store.close()
}
