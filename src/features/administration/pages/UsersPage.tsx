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
import ResourceWorkspace from './ResourceWorkspace'
import { useResourceList } from '../model/useResourceList'
import { useAdministration } from '../model/AdministrationProvider'
import type { ManagedRole, ManagedUser } from '../model/resources'
import styles from './workspace.module.less'

type UserInput = Omit<ManagedUser, 'id'> & { password?: string }
export default function UsersPage() {
  const { t } = useTranslation()
  const screens = Grid.useBreakpoint()
  const { provider, demo } = useAdministration()
  const { message } = App.useApp()
  const list = useResourceList('users')
  const createAllowed = useCheckPermission('user:create').hasPermission
  const updateAllowed = useCheckPermission('user:update').hasPermission
  const deleteAllowed = useCheckPermission('user:delete').hasPermission
  const [form] = Form.useForm<UserInput>()
  const [editing, setEditing] = useState<ManagedUser | 'new' | null>(null)
  const [roles, setRoles] = useState<ManagedRole[]>([])
  const [roleRevision, setRoleRevision] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  useEffect(() => provider.subscribe?.('roles', () => setRoleRevision((value) => value + 1)), [provider])
  useEffect(() => {
    if (!createAllowed && !updateAllowed) return
    const controller = new AbortController()
    void provider.list('roles', { page: 1, pageSize: 200 }, { signal: controller.signal, showError: false }).then(
      (result) => {
        if (!controller.signal.aborted) setRoles(result.items)
      },
      (reason) => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : t('admin.loadFailed'))
      }
    )
    return () => controller.abort()
  }, [provider, t, createAllowed, updateAllowed, roleRevision])
  const open = (user: ManagedUser | 'new') => {
    setError(undefined)
    setEditing(user)
  }
  const save = async () => {
    if (!editing || (editing === 'new' ? !createAllowed : !updateAllowed)) return
    const input = await form.validateFields().catch(() => null)
    if (!input) return
    if (input.password === '') delete input.password
    setBusy(true)
    try {
      if (editing === 'new') await provider.create('users', input)
      else await provider.update('users', editing.id, input)
      setEditing(null)
      list.reload()
      void message.success(t('admin.saved'))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('admin.saveFailed'))
    } finally {
      setBusy(false)
    }
  }
  const remove = async (user: ManagedUser) => {
    if (!deleteAllowed) return
    try {
      await provider.remove('users', user.id)
      list.reload()
      void message.success(t('admin.deleted'))
    } catch (reason) {
      void message.error(reason instanceof Error ? reason.message : t('admin.saveFailed'))
    }
  }
  const columns: TableProps<ManagedUser>['columns'] = [
    {
      title: t('admin.member'),
      dataIndex: 'name',
      sorter: true,
      render: (_, user) => (
        <div className={styles.identity}>
          <Typography.Text strong>{user.name}</Typography.Text>
          <Typography.Text type="secondary">{user.email}</Typography.Text>
          <div className={styles.mobileMeta}>
            <Tag>
              <span className={styles.code}>{user.role}</span>
            </Tag>
            <Tag color={user.status === 'active' ? 'success' : 'default'}>{t(`admin.${user.status}`)}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: t('admin.role'),
      dataIndex: 'role',
      responsive: ['md'],
      render: (role: string) => (
        <Tag>
          <span className={styles.code}>{role}</span>
        </Tag>
      ),
    },
    {
      title: t('admin.status'),
      dataIndex: 'status',
      responsive: ['md'],
      render: (status: ManagedUser['status']) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>{t(`admin.${status}`)}</Tag>
      ),
    },
    {
      title: t('admin.actions'),
      key: 'actions',
      render: (_, user) => (
        <Space>
          {updateAllowed && (
            <Button type="link" onClick={() => open(user)}>
              {t('admin.edit')}
            </Button>
          )}
          {deleteAllowed && (
            <Popconfirm
              title={t('admin.deleteUser')}
              onConfirm={() => remove(user)}
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
      title={t('admin.users')}
      description={t('admin.usersDescription')}
      onSearch={list.search}
      onReload={list.reload}
      error={list.error}
      actions={
        createAllowed && (
          <Button type="primary" icon={<PlusOutlined aria-hidden />} onClick={() => open('new')}>
            {t('admin.addUser')}
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
        }}
        onChange={(pagination, _, sorter) => {
          const sort = Array.isArray(sorter) ? sorter[0] : sorter
          list.setQuery((current) => ({
            ...current,
            page: pagination.current ?? 1,
            pageSize: pagination.pageSize ?? 10,
            sort: sort.order ? String(sort.field) : undefined,
            order: sort.order === 'descend' ? 'desc' : 'asc',
          }))
        }}
      />
      <Modal
        title={t(editing === 'new' ? 'admin.addUser' : 'admin.editUser')}
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
              ? { role: roles[0]?.code, status: 'active' }
              : editing
                ? { name: editing.name, email: editing.email, role: editing.role, status: editing.status }
                : undefined
          }
        >
          <Form.Item name="name" label={t('admin.name')} rules={[{ required: true, whitespace: true, max: 80 }]}>
            <Input maxLength={80} />
          </Form.Item>
          <Form.Item name="email" label={t('admin.email')} rules={[{ required: true, type: 'email' }]}>
            <Input type="email" />
          </Form.Item>
          {!demo && (
            <Form.Item
              name="password"
              label={t(editing === 'new' ? 'identity.password' : 'identity.resetPassword')}
              rules={[{ required: editing === 'new', min: 12, max: 256 }]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
          )}
          <Form.Item name="role" label={t('admin.role')} rules={[{ required: true }]}>
            <Select showSearch options={roles.map((role) => ({ value: role.code, label: role.name }))} />
          </Form.Item>
          <Form.Item name="status" label={t('admin.status')} rules={[{ required: true }]}>
            <Select options={['active', 'disabled'].map((value) => ({ value, label: t(`admin.${value}`) }))} />
          </Form.Item>
        </Form>
      </Modal>
    </ResourceWorkspace>
  )
}
