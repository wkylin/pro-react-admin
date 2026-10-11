import { apiClient } from '@platform/api/client'
import { unwrapPayload } from '@platform/api/core/response'
import { parseEnterpriseSession } from '../model/session'

export async function loginEnterprise(input: { tenantId: string; email: string; password: string }) {
  return parseEnterpriseSession(
    unwrapPayload(
      await apiClient.post('/api/auth/login', input, {
        needToken: false,
        encrypt: false,
        showError: false,
        cancelDuplicate: false,
      })
    )
  )
}
