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

export async function loginEnterprise(input: {
  tenantId: string
  email: string
  password: string
  totpCode?: string
  recoveryCode?: string
}) {
  const payload = unwrapPayload(
    await apiClient.post('/api/auth/login', input, {
      needToken: false,
      encrypt: false,
      showError: false,
      cancelDuplicate: false,
    })
  )
  if (isRecord(payload) && payload.totpRequired === true) return { totpRequired: true as const }
  return parseEnterpriseSession(payload)
}

export interface TotpStatus {
  enabled: boolean
  available: boolean
  recoveryCodesRemaining: number
}
export interface TotpSetup {
  secret: string
  uri: string
  expiresAt: number
}
const totpOptions = () => {
  const session = readEnterpriseSession()
  if (!session) throw new Error('业务会话已过期')
  return {
    headers: { Authorization: `Bearer ${session.token}`, 'X-Tenant-ID': session.tenantId },
    needToken: false,
    encrypt: false,
    showError: false,
    cancelDuplicate: false,
  }
}

export async function getTotpStatus(): Promise<TotpStatus> {
  const value = unwrapPayload(await apiClient.get('/api/auth/totp', {}, totpOptions()))
  if (
    !isRecord(value) ||
    typeof value.enabled !== 'boolean' ||
    typeof value.available !== 'boolean' ||
    typeof value.recoveryCodesRemaining !== 'number'
  )
    throw new Error('无效的验证器状态')
  return value as unknown as TotpStatus
}
export async function beginTotp(password: string): Promise<TotpSetup> {
  const value = unwrapPayload(await apiClient.post('/api/auth/totp/setup', { password }, totpOptions()))
  if (
    !isRecord(value) ||
    typeof value.secret !== 'string' ||
    typeof value.uri !== 'string' ||
    typeof value.expiresAt !== 'number'
  )
    throw new Error('无效的验证器绑定信息')
  return value as unknown as TotpSetup
}
export async function confirmTotp(code: string): Promise<string[]> {
  const value = unwrapPayload(await apiClient.post('/api/auth/totp/confirm', { code }, totpOptions()))
  if (!isRecord(value) || value.enabled !== true || !Array.isArray(value.recoveryCodes))
    throw new Error('无效的验证器启用结果')
  return value.recoveryCodes as string[]
}
export async function disableTotp(input: { password: string; totpCode?: string; recoveryCode?: string }) {
  const value = unwrapPayload(await apiClient.post('/api/auth/totp/disable', input, totpOptions()))
  if (!isRecord(value) || value.enabled !== false) throw new Error('无效的验证器停用结果')
}
export async function rotateTotpRecoveryCodes(input: {
  password: string
  totpCode?: string
  recoveryCode?: string
}): Promise<string[]> {
  const value = unwrapPayload(await apiClient.post('/api/auth/totp/recovery', input, totpOptions()))
  if (!isRecord(value) || !Array.isArray(value.recoveryCodes)) throw new Error('无效的恢复码更新结果')
  return value.recoveryCodes as string[]
}
