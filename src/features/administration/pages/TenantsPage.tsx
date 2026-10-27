import { useState } from 'react'
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
import { readEnterpriseSession } from '@platform/auth/model/session'
import { useAdministration } from '../model/AdministrationProvider'
import { useResourceList } from '../model/useResourceList'
import type { ManagedTenant } from '../model/resources'
import ResourceWorkspace from './ResourceWorkspace'
import styles from './workspace.module.less'

type TenantForm = {
  tenantId: string
  name: string
  status: ManagedTenant['status']
  adminName: string
  adminEmail: string
  adminPassword: string
}

export default function TenantsPage() {
  const { t } = useTranslation()
  const screens = Grid.useBreakpoint()
  const { provider } = useAdministration()
  const { message } = App.useApp()
  const list = useResourceList('tenants')
  const createAllowed = useCheckPermission('tenant:create').hasPermission
  const updateAllowed = useCheckPermission('tenant:update').hasPermission
  const deleteAllowed = useCheckPermission('tenant:delete').hasPermission
  const currentTenantId = readEnterpriseSession()?.tenantId
  const [form] = Form.useForm<TenantForm>()
  const [editing, setEditing] = useState<ManagedTenant | 'new' | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()

  const open = (tenant: ManagedTenant | 'new') => {
    setError(undefined)
    setEditing(tenant)
  }
  const save = async () => {
    if (!editing || (editing === 'new' ? !createAllowed : !updateAllowed)) return
    const values = await form.validateFields().catch(() => null)
    if (!values) return
    setBusy(true)
    try {
      if (editing === 'new') {
        await provider.create('tenants', {
          tenantId: values.tenantId,
          name: values.name,
          status: 'active',
          adminName: values.adminName,
          adminEmail: values.adminEmail,
          adminPassword: values.adminPassword,
        })
      } else {
        await provider.update('tenants', editing.id, { name: values.name, status: values.status })
      }
      setEditing(null)
      list.reload()
      void message.success(t('admin.saved'))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('admin.saveFailed'))
    } finally {
      setBusy(false)
    }
  }
  const disable = async (tenant: ManagedTenant) => {
    if (!deleteAllowed || tenant.id === currentTenantId) return
    try {
      await provider.remove('tenants', tenant.id)
      list.reload()
      void message.success(t('admin.tenantDisabled'))
    } catch (reason) {
      void message.error(reason instanceof Error ? reason.message : t('admin.saveFailed'))
    }
  }
  const columns: TableProps<ManagedTenant>['columns'] = [
    {
      title: t('admin.tenantName'),
      dataIndex: 'name',
      render: (_, tenant) => (
        <div className={styles.identity}>
          <Typography.Text strong>{tenant.name}</Typography.Text>
          <span className={styles.code}>{tenant.id}</span>
        </div>
      ),
    },
    { title: t('admin.tenantAdminEmail'), dataIndex: 'adminEmail', responsive: ['md'] },
    { title: t('admin.tenantUserCount'), dataIndex: 'userCount', responsive: ['lg'] },
    {
      title: t('admin.status'),
      dataIndex: 'status',
      render: (status: ManagedTenant['status']) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>{t(`admin.${status}`)}</Tag>
      ),
    },
    {
      title: t('admin.actions'),
      key: 'actions',
      render: (_, tenant) => (
        <Space wrap>
          {updateAllowed && (
            <Button type="link" onClick={() => open(tenant)}>
              {t('admin.edit')}
            </Button>
          )}
          {deleteAllowed && tenant.status === 'active' && tenant.id !== currentTenantId && (
            <Popconfirm
              title={t('admin.disableTenant')}
              description={t('admin.disableTenantConfirm')}
              onConfirm={() => void disable(tenant)}
              okText={t('admin.disableTenant')}
              cancelText={t('admin.cancel')}
            >
              <Button type="link" danger>
                {t('admin.disableTenant')}
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  return (
    <ResourceWorkspace
      title={t('admin.tenants')}
      description={t('admin.tenantsDescription')}
      onSearch={list.search}
      onReload={list.reload}
      error={list.error}
      actions={
        createAllowed && (
          <Button type="primary" icon={<PlusOutlined aria-hidden />} onClick={() => open('new')}>
            {t('admin.addTenant')}
          </Button>
        )
      }
    >
      <Alert type="info" showIcon title={t('admin.tenantDeleteNote')} />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list.data.items}
        loading={list.loading}
        size={screens.md ? 'middle' : 'small'}
        scroll={screens.md ? { x: 760 } : undefined}
        pagination={{
          current: list.query.page,
          pageSize: list.query.pageSize,
          total: list.data.total,
          showSizeChanger: true,
          onChange: (page, pageSize) => list.setQuery((current) => ({ ...current, page, pageSize })),
        }}
      />
      <Modal
        title={t(editing === 'new' ? 'admin.addTenant' : 'admin.editTenant')}
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
        {error && <Alert type="error" title={error} showIcon style={{ marginBottom: 16 }} />}
        <Form
          key={editing === 'new' ? 'new' : (editing?.id ?? 'closed')}
          form={form}
          layout="vertical"
          preserve={false}
          initialValues={
            editing === 'new'
              ? { status: 'active' }
              : editing
                ? { name: editing.name, status: editing.status }
                : undefined
          }
        >
          {editing === 'new' && (
            <Form.Item
              name="tenantId"
              label={t('admin.tenantId')}
              rules={[{ required: true, pattern: /^[a-z][a-z0-9_-]*$/, max: 64 }]}
            >
              <Input maxLength={64} autoComplete="off" />
            </Form.Item>
          )}
          <Form.Item name="name" label={t('admin.tenantName')} rules={[{ required: true, whitespace: true, max: 80 }]}>
            <Input maxLength={80} />
          </Form.Item>
          {editing === 'new' ? (
            <>
              <Form.Item
                name="adminName"
                label={t('admin.tenantAdminName')}
                rules={[{ required: true, whitespace: true, max: 80 }]}
              >
                <Input maxLength={80} />
              </Form.Item>
              <Form.Item
                name="adminEmail"
                label={t('admin.tenantAdminEmail')}
                rules={[{ required: true, type: 'email', max: 254 }]}
              >
                <Input type="email" maxLength={254} autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="adminPassword"
                label={t('admin.tenantAdminPassword')}
                rules={[{ required: true, min: 12, max: 256 }]}
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>
            </>
          ) : (
            <Form.Item name="status" label={t('admin.status')} rules={[{ required: true }]}>
              <Select
                options={(['active', 'disabled'] as const).map((status) => ({
                  value: status,
                  label: t(`admin.${status}`),
                }))}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </ResourceWorkspace>
  )
}
