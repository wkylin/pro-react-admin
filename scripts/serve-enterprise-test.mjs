// Test-only server: disposable database, loopback binding, credentials used only by browser fixtures.
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { EnterpriseStore } from '../api/enterprise/store.mts'
import { EnterpriseService } from '../api/enterprise/service.mts'
import { createEnterpriseRouter } from '../api/enterprise/router.cjs'

const require = createRequire(new URL('../api/package.json', import.meta.url))
const express = require('express')
const directory = await mkdtemp(path.join(tmpdir(), 'pro-admin-browser-'))
const store = new EnterpriseStore(path.join(directory, 'browser.sqlite'))
const service = new EnterpriseService(store)
const app = express()
try {
  for (const tenantId of ['alpha', 'beta'])
    await service.bootstrap({
      tenantId,
      tenantName: tenantId,
      name: `Admin ${tenantId}`,
      email: 'admin@example.com',
      password: 'Browser-test-password-42',
    })
  app.use(express.json())
  // Repeated browser runs share a fixture IP; domain authorization and persistence stay real.
  app.use('/api', createEnterpriseRouter(service, { loginLimit: 200 }))
  app.use(express.static('dist-enterprise'))
  const server = app.listen(5091, '127.0.0.1')
  server.once('error', async (error) => {
    store.close()
    await rm(directory, { recursive: true, force: true })
    throw error
  })
  for (const signal of ['SIGTERM', 'SIGINT'])
    process.once(signal, () =>
      server.close(async () => {
        store.close()
        await rm(directory, { recursive: true, force: true })
      })
    )
} catch (error) {
  store.close()
  await rm(directory, { recursive: true, force: true })
  throw error
}
