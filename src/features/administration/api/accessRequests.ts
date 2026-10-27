import { apiClient } from '@platform/api/client'
import { unwrapPayload } from '@platform/api/core/response'
import type { DataProvider } from '@platform/data/provider'
import type { UserPermission } from '@platform/auth/model/permission'
import { canDelegate, canDelegateScope, scopeFor } from '@platform/auth/model/accessDecision'
import { hasEffectivePermission } from '@platform/auth/model/policy'
import type { AdministrationSchema, ManagedRole, ManagedUser } from '../model/resources'

export type AccessKind = 'role' | 'user'
export type AccessStatus = 'pending' | 'approved' | 'rejected' | 'stale'
export type AccessChange =
  | { kind: 'role'; targetId: string; change: Pick<ManagedRole, 'permissions' | 'scopes'> }
  | { kind: 'user'; targetId: string; change: Pick<ManagedUser, 'role' | 'status'> }
export interface AccessPreview {
  kind: AccessKind
  targetId: string
  before: ManagedRole | ManagedUser
  after: ManagedRole | ManagedUser
  affected: { count: number; digest: string; sample: Pick<ManagedUser, 'id' | 'name' | 'email'>[] }
  fingerprint: string
}
export interface AccessRequest extends AccessPreview {
  id: string
  actorId: string
  actor: string
  reason: string
  status: AccessStatus
  reviewerId: string | null
  decisionReason: string | null
  createdAt: string
  decidedAt: string | null
}
export interface AccessClient {
  governance(): Promise<{ requiresApproval: boolean; independentReviewers: number }>
  preview(change: AccessChange): Promise<AccessPreview>
  list(query: {
    page: number
    pageSize: number
    status?: AccessStatus
  }): Promise<{ items: AccessRequest[]; total: number }>
  propose(change: AccessChange, reason: string, fingerprint: string): Promise<AccessRequest>
  decide(id: string, decision: 'approve' | 'reject', reason: string): Promise<AccessRequest>
}

export const enterpriseAccessClient: AccessClient = {
  async governance() {
    return unwrapPayload(await apiClient.get('/api/admin/access-governance')) as {
      requiresApproval: boolean
      independentReviewers: number
    }
  },
  async preview(change) {
    return unwrapPayload(await apiClient.post('/api/admin/access-requests/preview', change)) as AccessPreview
  },
  async list(query) {
    return unwrapPayload(await apiClient.get('/api/admin/access-requests', query, { addTimestamp: false })) as {
      items: AccessRequest[]
      total: number
    }
  },
  async propose(change, reason, fingerprint) {
    return unwrapPayload(
      await apiClient.post('/api/admin/access-requests', { ...change, reason, fingerprint })
    ) as AccessRequest
  },
  async decide(id, decision, reason) {
    return unwrapPayload(
      await apiClient.post(`/api/admin/access-requests/${encodeURIComponent(id)}/decision`, { decision, reason })
    ) as AccessRequest
  },
}

/** Browser-only workflow for GitHub Pages. The enterprise API enforces the same rules on its own data. */
export function createDemoAccessClient(
  provider: DataProvider<AdministrationSchema>,
  current: () => UserPermission | null
): AccessClient {
  const requests: AccessRequest[] = []
  const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T
  const actor = (permission: 'access:read' | 'access:approve' | 'role:update' | 'user:update') => {
    const identity = current()
    if (!identity || !hasEffectivePermission(identity, permission)) throw new Error('没有执行该操作的权限')
    return identity
  }
  const all = async <K extends 'users' | 'roles'>(resource: K) =>
    (await provider.list(resource, { page: 1, pageSize: 200 })).items
  const canDelegateRole = (identity: UserPermission, role: ManagedRole) =>
    identity.roles.some(
      (owned) =>
        canDelegate(owned.permissions, role.permissions) &&
        (['user', 'role'] as const).every((resource) =>
          canDelegateScope(scopeFor(owned.scopes, resource), scopeFor(role.scopes, resource))
        )
    )
  const preview = async (change: AccessChange): Promise<AccessPreview> => {
    const identity = actor(change.kind === 'role' ? 'role:update' : 'user:update')
    const before = await provider.getOne(change.kind === 'role' ? 'roles' : 'users', change.targetId)
    const after = { ...before, ...change.change } as ManagedRole | ManagedUser
    if (change.kind === 'role') {
      if ((before as ManagedRole).code === 'super_admin') throw new Error('内置管理员角色不可修改')
      if (!canDelegateRole(identity, before as ManagedRole) || !canDelegateRole(identity, after as ManagedRole))
        throw new Error('不能授予超过自身的权限或资源范围')
    } else {
      const roles = await all('roles')
      const oldRole = roles.find((role) => role.code === (before as ManagedUser).role)
      const nextRole = roles.find((role) => role.code === (after as ManagedUser).role)
      if (!oldRole || !nextRole || !canDelegateRole(identity, oldRole) || !canDelegateRole(identity, nextRole))
        throw new Error('不能分配超过自身的角色')
    }
    const users = await all('users')
    const affectedUsers =
      change.kind === 'role'
        ? users.filter((user) => user.role === (before as ManagedRole).code)
        : users.filter((user) => user.id === change.targetId)
    const affected = {
      count: affectedUsers.length,
      digest: affectedUsers.map((user) => user.id).join('|'),
      sample: affectedUsers.slice(0, 20).map(({ id, name, email }) => ({ id, name, email })),
    }
    const accessBefore =
      change.kind === 'role'
        ? { permissions: (before as ManagedRole).permissions, scopes: (before as ManagedRole).scopes ?? {} }
        : { role: (before as ManagedUser).role, status: (before as ManagedUser).status }
    const accessAfter =
      change.kind === 'role'
        ? { permissions: (after as ManagedRole).permissions, scopes: (after as ManagedRole).scopes ?? {} }
        : { role: (after as ManagedUser).role, status: (after as ManagedUser).status }
    if (JSON.stringify(accessBefore) === JSON.stringify(accessAfter)) throw new Error('访问权限没有变化')
    return {
      kind: change.kind,
      targetId: change.targetId,
      before: copy(before),
      after: copy(after),
      affected,
      fingerprint: JSON.stringify([change.kind, change.targetId, before, after, affected.digest]),
    }
  }
  return {
    async governance() {
      const identity = current()
      if (!identity) throw new Error('请先登录')
      return {
        requiresApproval: true,
        independentReviewers: identity.roles.some((role) => role.code === 'super_admin') ? 1 : 2,
      }
    },
    preview,
    async list({ page, pageSize, status }) {
      actor('access:read')
      const items = status ? requests.filter((request) => request.status === status) : requests
      return { items: copy(items.slice((page - 1) * pageSize, page * pageSize)), total: items.length }
    },
    async propose(change, reason, fingerprint) {
      const identity = current()
      if (!identity) throw new Error('请先登录')
      if (!reason.trim()) throw new Error('请填写申请原因')
      const next = await preview(change)
      if (next.fingerprint !== fingerprint) throw new Error('变更预览已过期，请重新预览')
      const request: AccessRequest = {
        ...next,
        id: crypto.randomUUID(),
        actorId: identity.userId,
        actor: identity.username,
        reason: reason.trim(),
        status: 'pending',
        reviewerId: null,
        decisionReason: null,
        createdAt: new Date().toISOString(),
        decidedAt: null,
      }
      requests.unshift(request)
      return copy(request)
    },
    async decide(id, decision, reason) {
      const identity = actor('access:approve')
      const request = requests.find((item) => item.id === id)
      if (!request || request.status !== 'pending') throw new Error('申请不存在或已处理')
      if (
        request.actorId === identity.userId ||
        (request.kind === 'user' && request.targetId === identity.userId) ||
        (request.kind === 'role' && identity.roles.some((role) => role.code === (request.before as ManagedRole).code))
      )
        throw new Error('申请人和受影响人不能审批自己的变更')
      if (!reason.trim()) throw new Error('请填写审批意见')
      if (decision === 'approve') {
        try {
          const change =
            request.kind === 'role'
              ? {
                  kind: 'role' as const,
                  targetId: request.targetId,
                  change: {
                    permissions: (request.after as ManagedRole).permissions,
                    scopes: (request.after as ManagedRole).scopes,
                  },
                }
              : {
                  kind: 'user' as const,
                  targetId: request.targetId,
                  change: {
                    role: (request.after as ManagedUser).role,
                    status: (request.after as ManagedUser).status,
                  },
                }
          const now = await previewForProposer(change, request.actorId)
          if (now.fingerprint !== request.fingerprint) request.status = 'stale'
          else {
            if (request.kind === 'role') await provider.update('roles', request.targetId, change.change)
            else await provider.update('users', request.targetId, change.change)
            request.status = 'approved'
          }
        } catch {
          request.status = 'stale'
        }
      } else request.status = 'rejected'
      request.reviewerId = identity.userId
      request.decisionReason = reason.trim()
      request.decidedAt = new Date().toISOString()
      return copy(request)
    },
  }

  async function previewForProposer(change: AccessChange, actorId: string) {
    const proposer = current()
    if (proposer?.userId === actorId) return preview(change)
    // Demo accounts have fixed grants; reviewer still checks that the target and impact are unchanged.
    const before = await provider.getOne(change.kind === 'role' ? 'roles' : 'users', change.targetId)
    const after = { ...before, ...change.change }
    const users = await all('users')
    const affectedUsers =
      change.kind === 'role'
        ? users.filter((user) => user.role === (before as ManagedRole).code)
        : users.filter((user) => user.id === change.targetId)
    return {
      fingerprint: JSON.stringify([
        change.kind,
        change.targetId,
        before,
        after,
        affectedUsers.map((user) => user.id).join('|'),
      ]),
    }
  }
}
