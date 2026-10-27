import { openEnterpriseService } from './runtime.cjs'

const service = openEnterpriseService()
try {
  const user = await service.bootstrap({
    tenantId: process.env.ENTERPRISE_BOOTSTRAP_TENANT,
    tenantName: process.env.ENTERPRISE_BOOTSTRAP_TENANT_NAME,
    name: process.env.ENTERPRISE_BOOTSTRAP_NAME,
    email: process.env.ENTERPRISE_BOOTSTRAP_EMAIL,
    password: process.env.ENTERPRISE_BOOTSTRAP_PASSWORD,
  })
  console.log(`Tenant provisioned; administrator id=${user.id}`)
} finally {
  service.store.close()
}
