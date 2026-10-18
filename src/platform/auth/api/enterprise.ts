import { apiClient } from '@platform/api/client'
import { isRecord, unwrapPayload } from '@platform/api/core/response'
import { parseEnterpriseSession, readEnterpriseSession } from '../model/session'

export interface EnterpriseTenant {
  id: string
  name: string
}

export async function listEnterpriseTenants(signal?: AbortSignal): Promise<EnterpriseTenant[]> {
  const payload = unwrapPayload(
    await apiClient.get(
      '/api/auth/session/tenants',
      {},
      { signal, encrypt: false, showError: false, cancelDuplicate: false }
    )
  )
  if (
    !Array.isArray(payload) ||
    !payload.every(
      (tenant) =>
        isRecord(tenant) &&
        typeof tenant.id === 'string' &&
        /^[a-z][a-z0-9_-]*$/.test(tenant.id) &&
        typeof tenant.name === 'string' &&
        tenant.name.length > 0
    )
  )
    throw new Error('无效的组织列表')
  return payload as EnterpriseTenant[]
}

export async function switchEnterpriseTenant(tenantId: string) {
  const current = readEnterpriseSession()
  if (!current) throw new Error('业务会话已过期')
  const payload = unwrapPayload(
    await apiClient.post(
      '/api/auth/session/tenant',
      { tenantId },
      {
        headers: { Authorization: `Bearer ${current.token}`, 'X-Tenant-ID': current.tenantId },
        encrypt: false,
        showError: false,
        cancelDuplicate: false,
      }
    )
  )
  if (!isRecord(payload)) throw new Error('无效的组织切换响应')
  return parseEnterpriseSession({ ...payload, token: current.token })
}

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
