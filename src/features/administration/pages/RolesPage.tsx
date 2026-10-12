import { useState } from 'react'
import { Alert, App, Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, type TableProps } from 'antd'
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

type RoleInput = Omit<ManagedRole, 'id'>
const permissionOptions = [
  ...new Set([
    ...Object.values(routePolicies).flatMap((policy) => (policy.permission ? [policy.permission] : [])),
    'user:create',
    'user:update',
    'user:delete',
    'role:create',
    'role:update',
    'role:delete',
  ]),
].map((value) => ({ value, label: value }))
export default function RolesPage() {
  const { t } = useTranslation()
  const { provider, demo } = useAdministration()
  const { message } = App.useApp()
  const list = useResourceList('roles')
  const createAllowed = useCheckPermission('role:create').hasPermission
  const updateAllowed = useCheckPermission('role:update').hasPermission
  const deleteAllowed = useCheckPermission('role:delete').hasPermission
  const [form] = Form.useForm<RoleInput>()
  const [editing, setEditing] = useState<ManagedRole | 'new' | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const open = (role: ManagedRole | 'new') => {
    setError(undefined)
    setEditing(role)
  }
  const save = async () => {
    if (!editing || (editing === 'new' ? !createAllowed : !updateAllowed)) return
    const input = await form.validateFields().catch(() => null)
    if (!input) return
    setBusy(true)
    try {
      if (editing === 'new') await provider.create('roles', input)
      else await provider.update('roles', editing.id, input)
      if (!demo) await permissionService.syncPermissions()
      setEditing(null)
      list.reload()
      void message.success(t('admin.saved'))
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
    { title: t('admin.role'), dataIndex: 'name' },
    {
      title: t('admin.code'),
      dataIndex: 'code',
      render: (code: string) => <span className={styles.code}>{code}</span>,
    },
    {
      title: t('admin.permissions'),
      dataIndex: 'permissions',
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.map((permission) => (
            <Tag key={permission}>{permission}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: t('admin.actions'),
      key: 'actions',
      render: (_, role) => (
        <Space>
          {updateAllowed && (
            <Button type="link" onClick={() => open(role)}>
              {t('admin.edit')}
            </Button>
          )}
          {deleteAllowed && (
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
      title={t('admin.roles')}
      description={t('admin.rolesDescription')}
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
        scroll={{ x: 650 }}
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
      >
        {error && <Alert type="error" title={error} showIcon />}
        <Form
          key={editing === 'new' ? 'new' : (editing?.id ?? 'closed')}
          form={form}
          layout="vertical"
          preserve={false}
          initialValues={
            editing === 'new'
              ? { permissions: [] }
              : editing
                ? { name: editing.name, code: editing.code, permissions: editing.permissions }
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
        </Form>
      </Modal>
    </ResourceWorkspace>
  )
}
