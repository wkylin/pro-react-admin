import { assertListQuery, type DataProvider } from '@platform/data/provider'
import { administrationResources, type AdministrationSchema } from '../model/resources'

/** An isolated in-memory example. No credentials, production access policy, or server audit are changed. */
export function createDemoAdministrationProvider(
  actor: () => string = () => 'demo'
): DataProvider<AdministrationSchema> {
  const state: { [K in keyof AdministrationSchema]: AdministrationSchema[K][] } = {
    users: [
      { id: 'u-1', name: '陈一宁', email: 'admin@example.com', role: 'admin', status: 'active' },
      { id: 'u-2', name: '林晓', email: 'viewer@example.com', role: 'viewer', status: 'active' },
    ],
    roles: [
      { id: 'r-1', name: '管理员', code: 'admin', permissions: ['home:read', 'user:*', 'role:*', 'audit:read'] },
      { id: 'r-2', name: '只读成员', code: 'viewer', permissions: ['home:read', 'user:read'] },
    ],
    audit: [],
  }
  const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T
  const check = (signal?: AbortSignal) => {
    signal?.throwIfAborted()
  }
  const write = (resource: keyof AdministrationSchema) => {
    if (administrationResources[resource].readOnly) throw new Error('Resource is read-only')
  }
  const recordAudit = (action: string, resource: string, recordId: string) => {
    state.audit.unshift({
      id: crypto.randomUUID(),
      actor: actor(),
      action,
      resource,
      recordId,
      at: new Date().toISOString(),
    })
    state.audit = state.audit.slice(0, 500)
  }
  const validate = <K extends keyof AdministrationSchema>(
    resource: K,
    value: unknown,
    exceptId?: string
  ): AdministrationSchema[K] => {
    const parsed = administrationResources[resource].parse(value)
    if (resource === 'users') {
      const user = parsed as AdministrationSchema['users']
      if (!state.roles.some((role) => role.code === user.role)) throw new Error('请选择有效角色')
      if (state.users.some((entry) => entry.id !== exceptId && entry.email.toLowerCase() === user.email.toLowerCase()))
        throw new Error('邮箱已存在')
    }
    if (resource === 'roles') {
      const role = parsed as AdministrationSchema['roles']
      if (state.roles.some((entry) => entry.id !== exceptId && entry.code === role.code))
        throw new Error('角色代码已存在')
      const previous = state.roles.find((entry) => entry.id === exceptId)
      if (previous && previous.code !== role.code && state.users.some((user) => user.role === previous.code))
        throw new Error('已有成员使用该角色，不能修改代码')
    }
    return parsed
  }
  return {
    async list(resource, query, options) {
      check(options?.signal)
      assertListQuery(query)
      const term = query.search?.trim().toLowerCase()
      let rows = state[resource].filter(
        (row) => !term || Object.values(row).some((value) => String(value).toLowerCase().includes(term))
      )
      if (query.sort) {
        const field = query.sort
        rows = [...rows].sort(
          (left, right) =>
            String((left as unknown as Record<string, unknown>)[field] ?? '').localeCompare(
              String((right as unknown as Record<string, unknown>)[field] ?? '')
            ) * (query.order === 'desc' ? -1 : 1)
        )
      }
      const start = (query.page - 1) * query.pageSize
      return { items: clone(rows.slice(start, start + query.pageSize)), total: rows.length }
    },
    async getOne(resource, id, options) {
      check(options?.signal)
      const record = state[resource].find((row) => row.id === id)
      if (!record) throw new Error('记录不存在')
      return clone(record)
    },
    async create(resource, input, options) {
      check(options?.signal)
      write(resource)
      const record = validate(resource, { ...input, id: crypto.randomUUID() })
      state[resource].push(record)
      recordAudit('create', resource, record.id)
      return clone(record)
    },
    async update(resource, id, input, options) {
      check(options?.signal)
      write(resource)
      const index = state[resource].findIndex((row) => row.id === id)
      if (index < 0) throw new Error('记录不存在')
      const record = validate(resource, { ...state[resource][index], ...input, id }, id)
      state[resource][index] = record
      recordAudit('update', resource, id)
      return clone(record)
    },
    async remove(resource, id, options) {
      check(options?.signal)
      write(resource)
      if (resource === 'roles') {
        const role = state.roles.find((row) => row.id === id)
        if (role && state.users.some((user) => user.role === role.code)) throw new Error('该角色仍有成员，不能删除')
      }
      const index = state[resource].findIndex((row) => row.id === id)
      if (index < 0) throw new Error('记录不存在')
      state[resource].splice(index, 1)
      recordAudit('delete', resource, id)
    },
  }
}
