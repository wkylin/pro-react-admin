import { useEffect, useState } from 'react'
import {
  Alert,
  App,
  Button,
  Form,
  Grid,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  type TableProps,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useCheckPermission } from '@platform/auth/hooks/usePermission'
import { routePolicies } from '@platform/auth/model/policy'
import { useAdministration } from '../model/AdministrationProvider'
import { useResourceList } from '../model/useResourceList'
import type { ManagedRole } from '../model/resources'
import ResourceWorkspace from './ResourceWorkspace'
import styles from './workspace.module.less'
import { permissionService } from '@platform/auth/services/permissionService'
import type { ResourceScopes } from '@platform/auth/model/accessDecision'
import AccessProposalModal, { type PendingProposal } from './AccessProposalModal'

type RoleInput = Omit<ManagedRole, 'id'>
const normalizeScopes = (scopes: ResourceScopes | undefined): ResourceScopes =>
  Object.fromEntries(
    (['user', 'role'] as const).map((resource) => {
      const mode = scopes?.[resource]?.mode ?? 'global'
      return [resource, { mode, ids: mode === 'restricted' ? (scopes?.[resource]?.ids ?? []) : [] }]
    })
  ) as ResourceScopes
const permissionOptions = [
  ...new Set([
    ...Object.values(routePolicies).flatMap((policy) => (policy.permission ? [policy.permission] : [])),
    'user:create',
    'user:update',
    'user:delete',
    'role:create',
    'role:update',
    'role:delete',
    'access:read',
    'access:approve',
  ]),
]
  .filter((value) => !value.startsWith('tenant:'))
  .map((value) => ({ value, label: value }))
export default function RolesPage({ mode = 'roles' }: { mode?: 'roles' | 'permissions' }) {
  const { t } = useTranslation()
  const screens = Grid.useBreakpoint()
  const { provider, access, demo } = useAdministration()
  const { message } = App.useApp()
  const list = useResourceList('roles')
  const createAllowed = useCheckPermission('role:create').hasPermission
  const updateAllowed = useCheckPermission('role:update').hasPermission
  const deleteAllowed = useCheckPermission('role:delete').hasPermission
  const [form] = Form.useForm<RoleInput>()
  const [editing, setEditing] = useState<ManagedRole | 'new' | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState<PendingProposal | null>(null)
  const [scopeOptions, setScopeOptions] = useState<{
    user: { value: string; label: string }[]
    role: { value: string; label: string }[]
  }>({ user: [], role: [] })
  const userScopeMode = Form.useWatch(['scopes', 'user', 'mode'], form)
  const roleScopeMode = Form.useWatch(['scopes', 'role', 'mode'], form)
  useEffect(() => {
    if (!editing) return
    let active = true
    void Promise.allSettled([
      provider.list('users', { page: 1, pageSize: 200 }),
      provider.list('roles', { page: 1, pageSize: 200 }),
    ]).then(([users, roles]) => {
      if (!active) return
      setScopeOptions({
        user:
          users.status === 'fulfilled'
            ? users.value.items.map((item) => ({ value: item.id, label: `${item.name} · ${item.email}` }))
            : [],
        role:
          roles.status === 'fulfilled'
            ? roles.value.items.map((item) => ({ value: item.id, label: `${item.name} · ${item.code}` }))
            : [],
      })
    })
    return () => {
      active = false
    }
  }, [editing, provider])
  const open = (role: ManagedRole | 'new') => {
    setError(undefined)
    setEditing(role)
  }
  const save = async () => {
    if (!editing || (editing === 'new' ? !createAllowed : !updateAllowed)) return
    const input = await form.validateFields().catch(() => null)
    if (!input) return
    const scopes = normalizeScopes(input.scopes)
    const next = { ...input, permissions: input.permissions ?? [], scopes }
    const changed =
      editing === 'new'
        ? next.permissions.length > 0
        : JSON.stringify({ permissions: editing.permissions, scopes: normalizeScopes(editing.scopes) }) !==
          JSON.stringify({ permissions: next.permissions, scopes: next.scopes })
    setBusy(true)
    try {
      const governed = changed && (await access.governance()).requiresApproval
      if (governed) {
        const target =
          editing === 'new'
            ? await provider.create('roles', { ...next, permissions: [], scopes: {} })
            : await provider.update('roles', editing.id, { name: next.name, code: next.code })
        const change = { kind: 'role' as const, targetId: target.id, change: { permissions: next.permissions, scopes } }
        const preview = await access.preview(change)
        setEditing(null)
        setPending({ change, preview })
      } else if (editing === 'new') await provider.create('roles', next)
      else await provider.update('roles', editing.id, next)
      if (!demo) await permissionService.getPermissions(true)
      setEditing(null)
      list.reload()
      if (!governed) void message.success(t('admin.saved'))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('admin.saveFailed'))
    } finally {
      setBusy(false)
    }
  }
  const remove = async (role: ManagedRole) => {
    if (!deleteAllowed) return
    try {
      await provider.remove('roles', role.id)
      list.reload()
      void message.success(t('admin.deleted'))
    } catch (reason) {
      void message.error(reason instanceof Error ? reason.message : t('admin.saveFailed'))
    }
  }
  const columns: TableProps<ManagedRole>['columns'] = [
    {
      title: t('admin.role'),
      dataIndex: 'name',
      render: (_, role) => (
        <div className={styles.identity}>
          <Typography.Text strong>{role.name}</Typography.Text>
          <div className={styles.mobileMeta}>
            <span className={styles.code}>{role.code}</span>
            {role.permissions.map((permission) => (
              <Tag key={permission}>{permission}</Tag>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t('admin.code'),
      dataIndex: 'code',
      responsive: ['md'],
      render: (code: string) => <span className={styles.code}>{code}</span>,
    },
    {
      title: t('admin.permissions'),
      dataIndex: 'permissions',
      responsive: ['md'],
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.map((permission) => (
            <Tag key={permission}>{permission}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: t('admin.resourceScope'),
      key: 'scopes',
      responsive: ['lg'],
      render: (_, role) => (
        <Space wrap>
          {(['user', 'role'] as const).map((resource) =>
            role.scopes?.[resource]?.mode && role.scopes[resource].mode !== 'global' ? (
              <Tag key={resource}>
                {t(`admin.scopeResource.${resource}`)}: {t(`admin.scopeMode.${role.scopes[resource].mode}`)}
              </Tag>
            ) : null
          )}
        </Space>
      ),
    },
    {
      title: t('admin.actions'),
      key: 'actions',
      render: (_, role) => (
        <Space>
          {updateAllowed && role.code !== 'tenant-admin' && role.code !== 'super_admin' && (
            <Button type="link" onClick={() => open(role)}>
              {t('admin.edit')}
            </Button>
          )}
          {deleteAllowed && role.code !== 'tenant-admin' && role.code !== 'super_admin' && (
            <Popconfirm
              title={t('admin.deleteRole')}
              onConfirm={() => remove(role)}
              okText={t('admin.delete')}
              cancelText={t('admin.cancel')}
            >
              <Button type="link" danger>
                {t('admin.delete')}
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]
  return (
    <ResourceWorkspace
      title={t(mode === 'permissions' ? 'admin.permissionManagement' : 'admin.roles')}
      description={t(mode === 'permissions' ? 'admin.permissionManagementDescription' : 'admin.rolesDescription')}
      onSearch={list.search}
      onReload={list.reload}
      error={list.error}
      actions={
        createAllowed && (
          <Button type="primary" icon={<PlusOutlined aria-hidden />} onClick={() => open('new')}>
            {t('admin.addRole')}
          </Button>
        )
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list.data.items}
        loading={list.loading}
        size={screens.md ? 'middle' : 'small'}
        scroll={screens.md ? { x: 650 } : undefined}
        pagination={{
          current: list.query.page,
          pageSize: list.query.pageSize,
          total: list.data.total,
          showSizeChanger: true,
          onChange: (page, pageSize) => list.setQuery((current) => ({ ...current, page, pageSize })),
        }}
      />
      <Modal
        title={t(editing === 'new' ? 'admin.addRole' : 'admin.editRole')}
        open={editing !== null}
        onCancel={() => {
          if (!busy) setEditing(null)
        }}
        onOk={() => void save()}
        confirmLoading={busy}
        okText={t('admin.save')}
        cancelText={t('admin.cancel')}
        destroyOnHidden
        styles={{ body: { maxHeight: '65vh', overflowY: 'auto' } }}
      >
        {error && <Alert type="error" title={error} showIcon />}
        <Form
          key={editing === 'new' ? 'new' : (editing?.id ?? 'closed')}
          form={form}
          layout="vertical"
          preserve={false}
          initialValues={
            editing === 'new'
              ? { permissions: [], scopes: { user: { mode: 'global', ids: [] }, role: { mode: 'global', ids: [] } } }
              : editing
                ? {
                    name: editing.name,
                    code: editing.code,
                    permissions: editing.permissions,
                    scopes: {
                      user: editing.scopes?.user ?? { mode: 'global', ids: [] },
                      role: editing.scopes?.role ?? { mode: 'global', ids: [] },
                    },
                  }
                : undefined
          }
        >
          <Form.Item name="name" label={t('admin.name')} rules={[{ required: true, whitespace: true, max: 80 }]}>
            <Input maxLength={80} />
          </Form.Item>
          <Form.Item name="code" label={t('admin.code')} rules={[{ required: true, pattern: /^[a-z][a-z0-9_-]*$/ }]}>
            <Input />
          </Form.Item>
          <Form.Item name="permissions" label={t('admin.permissions')}>
            <Select mode="tags" options={permissionOptions} tokenSeparators={[',']} />
          </Form.Item>
          <Typography.Title level={5}>{t('admin.resourceScope')}</Typography.Title>
          <Typography.Paragraph type="secondary">{t('admin.resourceScopeHelp')}</Typography.Paragraph>
          {(['user', 'role'] as const).map((resource) => (
            <div key={resource}>
              <Form.Item name={['scopes', resource, 'mode']} label={t(`admin.scopeResource.${resource}`)}>
                <Select
                  options={(['global', 'restricted', 'deny'] as const).map((mode) => ({
                    value: mode,
                    label: t(`admin.scopeMode.${mode}`),
                  }))}
                />
              </Form.Item>
              {(resource === 'user' ? userScopeMode : roleScopeMode) === 'restricted' && (
                <Form.Item
                  name={['scopes', resource, 'ids']}
                  label={t('admin.scopeIds')}
                  rules={[{ required: true, type: 'array', min: 1, message: t('admin.scopeIdsRequired') }]}
                >
                  <Select
                    mode="tags"
                    options={scopeOptions[resource]}
                    optionFilterProp="label"
                    placeholder={t('admin.scopeIdsPlaceholder')}
                  />
                </Form.Item>
              )}
            </div>
          ))}
        </Form>
      </Modal>
      <AccessProposalModal pending={pending} onClose={() => setPending(null)} />
    </ResourceWorkspace>
  )
}
