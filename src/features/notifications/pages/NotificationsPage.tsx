import { useMemo, useState, type Key } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Alert,
  App,
  Badge,
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Download, Plus, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import BusinessPage, { BusinessToolbar } from '@shared/ui/BusinessPage'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { hasEffectivePermission } from '@platform/auth/model/policy'
import type { PermissionCode } from '@platform/auth/model/permission'
import { useNotificationsStore } from '../model/notificationsStore'
import {
  filterNotifications,
  formatNotificationTime,
  notificationsToCsv,
  type NotificationListQuery,
} from '../model/notificationList'
import type { Notification, NotificationDraft } from '../model/types'
import styles from './notifications.module.less'

type Editor = { mode: 'create' } | { mode: 'edit'; id: number }

export default function NotificationsPage() {
  const { t, i18n } = useTranslation()
  const { message, modal } = App.useApp()
  const { current } = usePermission()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const items = useNotificationsStore((state) => state.notifications)
  const add = useNotificationsStore((state) => state.add)
  const update = useNotificationsStore((state) => state.update)
  const remove = useNotificationsStore((state) => state.remove)
  const markRead = useNotificationsStore((state) => state.markRead)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [dirty, setDirty] = useState(false)
  const [form] = Form.useForm<NotificationDraft>()
  const query = useMemo<NotificationListQuery>(
    () => ({
      search: params.get('search') ?? '',
      status: params.get('status') === 'read' ? 'read' : params.get('status') === 'unread' ? 'unread' : 'all',
      sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
    }),
    [params]
  )
  const scope = JSON.stringify(query)
  const [selection, setSelection] = useState<{ scope: string; keys: Key[] }>({ scope, keys: [] })
  if (selection.scope !== scope) setSelection({ scope, keys: [] })
  const selectedKeys = selection.scope === scope ? selection.keys : []
  const filtered = useMemo(() => filterNotifications(items, query), [items, query])
  const selected = filtered.filter((item) => selectedKeys.includes(item.id))
  const pageValue = Number(params.get('page'))
  const requestedPage = Number.isSafeInteger(pageValue) && pageValue > 0 ? pageValue : 1
  const pageSizeValue = Number(params.get('pageSize'))
  const pageSize = [10, 20, 50].includes(pageSizeValue) ? pageSizeValue : 10
  const page = Math.min(requestedPage, Math.max(1, Math.ceil(filtered.length / pageSize)))
  const can = (permission: PermissionCode) => Boolean(current && hasEffectivePermission(current, permission))
  const ensure = (permission: PermissionCode) => {
    if (can(permission)) return true
    void message.error(t('notificationCenter.noPermission'))
    return false
  }
  const locale = i18n.resolvedLanguage === 'zh' ? 'zh-CN' : 'en-US'
  const setQuery = (values: Record<string, string | undefined>, replace = false) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        for (const [key, value] of Object.entries(values)) {
          if (!value || value === 'all') next.delete(key)
          else next.set(key, value)
        }
        return next
      },
      { replace }
    )
  const setFilters = (values: Record<string, string | undefined>, replace = false) =>
    setQuery({ ...values, page: '1' }, replace)
  const clearFilters = () => setFilters({ search: undefined, status: undefined, sort: undefined })

  const openEditor = (record?: Notification) => {
    if (!ensure(record ? 'notification:update' : 'notification:create')) return
    form.resetFields()
    form.setFieldsValue(
      record
        ? { title: record.title, description: record.description, read: record.read }
        : { title: '', description: '', read: false }
    )
    setDirty(false)
    setEditor(record ? { mode: 'edit', id: record.id } : { mode: 'create' })
  }
  const closeEditor = () => {
    if (!dirty) return setEditor(null)
    modal.confirm({
      title: t('notificationCenter.discardTitle'),
      content: t('notificationCenter.discardDescription'),
      okText: t('notificationCenter.discard'),
      cancelText: t('notificationCenter.keepEditing'),
      onOk: () => setEditor(null),
    })
  }
  const save = (draft: NotificationDraft) => {
    if (!editor || !ensure(editor.mode === 'create' ? 'notification:create' : 'notification:update')) return
    try {
      const saved = editor.mode === 'create' ? add(draft) : update(editor.id, draft)
      if (!saved) {
        void message.error(t('notificationCenter.missing'))
        setEditor(null)
        return
      }
      void message.success(t(editor.mode === 'create' ? 'notificationCenter.created' : 'notificationCenter.updated'))
      if (editor.mode === 'create') {
        setSelection({ scope, keys: [] })
        setQuery({ search: undefined, status: undefined, sort: 'newest', page: '1' })
      }
      setDirty(false)
      setEditor(null)
    } catch {
      void message.error(t('notificationCenter.saveFailed'))
    }
  }
  const exportRows = () => {
    if (!ensure('notification:export')) return
    const exported = selected.length ? selected : filtered
    if (!exported.length) return
    let url: string | undefined
    try {
      const csv = notificationsToCsv(
        exported,
        ['id', 'notificationTitle', 'content', 'createdAt', 'status'].map((key) => t(`notificationCenter.${key}`)),
        (item) => t(item.read ? 'notificationCenter.read' : 'notificationCenter.unread')
      )
      url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'notifications.csv'
      document.body.append(link)
      link.click()
      link.remove()
      const downloadUrl = url
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
      void message.success(t('notificationCenter.exported', { count: exported.length }))
    } catch {
      if (url) URL.revokeObjectURL(url)
      void message.error(t('notificationCenter.exportFailed'))
    }
  }
  const view = (notification: Notification) => {
    if (!ensure('notification:read')) return
    const search = params.toString()
    navigate(`/notification/${notification.id}${search ? `?${search}` : ''}`)
  }
  const columns: ColumnsType<Notification> = [
    {
      title: t('notificationCenter.notificationTitle'),
      key: 'title',
      width: 230,
      render: (_, record) => (
        <Button type="link" className={styles.titleButton} onClick={() => view(record)}>
          <Typography.Text strong={!record.read}>{record.title}</Typography.Text>
        </Button>
      ),
    },
    { title: t('notificationCenter.content'), dataIndex: 'description', ellipsis: true, width: 300 },
    {
      title: t('notificationCenter.createdAt'),
      dataIndex: 'time',
      width: 190,
      render: (time: string) => formatNotificationTime(time, locale),
    },
    {
      title: t('notificationCenter.status'),
      dataIndex: 'read',
      width: 110,
      render: (read: boolean) => (
        <Badge
          status={read ? 'default' : 'processing'}
          text={t(read ? 'notificationCenter.read' : 'notificationCenter.unread')}
        />
      ),
    },
    {
      title: t('notificationCenter.actions'),
      key: 'actions',
      width: 240,
      render: (_, record) => (
        <Space size="small">
          {can('notification:update') && (
            <Button size="small" type="link" onClick={() => openEditor(record)}>
              {t('notificationCenter.edit')}
            </Button>
          )}
          {!record.read && (
            <Button
              size="small"
              type="link"
              onClick={() => {
                if (ensure('notification:read')) markRead(record.id)
              }}
            >
              {t('notificationCenter.markRead')}
            </Button>
          )}
          {can('notification:delete') && (
            <Popconfirm
              title={t('notificationCenter.deleteConfirm')}
              okText={t('notificationCenter.delete')}
              cancelText={t('notificationCenter.cancel')}
              onConfirm={() => {
                if (!ensure('notification:delete')) return
                remove(record.id)
                void message.success(t('notificationCenter.deleted'))
              }}
            >
              <Button size="small" type="link" danger>
                {t('notificationCenter.delete')}
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  return (
    <BusinessPage
      title={t('notificationCenter.title')}
      description={t('notificationCenter.description')}
      eyebrow={<Tag>{t('notificationCenter.demo')}</Tag>}
      notice={<Alert type="info" showIcon title={t('notificationCenter.memoryNotice')} />}
      actions={
        <Space wrap>
          {can('notification:export') && (
            <Button
              icon={<Download size={16} aria-hidden="true" />}
              disabled={filtered.length === 0}
              onClick={exportRows}
            >
              {selected.length
                ? t('notificationCenter.exportSelected', { count: selected.length })
                : t('notificationCenter.export')}
            </Button>
          )}
          {can('notification:create') && (
            <Button type="primary" icon={<Plus size={16} aria-hidden="true" />} onClick={() => openEditor()}>
              {t('notificationCenter.create')}
            </Button>
          )}
        </Space>
      }
    >
      <section className={styles.panel} aria-label={t('notificationCenter.records')}>
        <BusinessToolbar label={t('notificationCenter.search')}>
          <Input
            className={styles.search}
            aria-label={t('notificationCenter.search')}
            placeholder={t('notificationCenter.search')}
            value={query.search}
            allowClear
            prefix={<Search size={16} aria-hidden="true" />}
            onChange={(event) => setFilters({ search: event.target.value }, true)}
          />
          <Select<NotificationListQuery['status']>
            className={styles.filterSelect}
            aria-label={t('notificationCenter.status')}
            value={query.status}
            onChange={(status) => setFilters({ status })}
            options={[
              { value: 'all', label: t('notificationCenter.all') },
              { value: 'unread', label: t('notificationCenter.unread') },
              { value: 'read', label: t('notificationCenter.read') },
            ]}
          />
          <Select<NotificationListQuery['sort']>
            className={styles.filterSelect}
            aria-label={t('notificationCenter.sort')}
            value={query.sort}
            onChange={(sort) => setFilters({ sort })}
            options={[
              { value: 'newest', label: t('notificationCenter.newest') },
              { value: 'oldest', label: t('notificationCenter.oldest') },
            ]}
          />
          {(query.search || query.status !== 'all' || query.sort !== 'newest') && (
            <Button onClick={clearFilters}>{t('notificationCenter.clearFilters')}</Button>
          )}
        </BusinessToolbar>
        <div className={styles.summary} aria-live="polite">
          <span>
            {t('notificationCenter.summary', {
              count: filtered.length,
              unread: items.filter((item) => !item.read).length,
            })}
          </span>
          {selected.length > 0 && (
            <Button type="text" size="small" onClick={() => setSelection({ scope, keys: [] })}>
              {t('notificationCenter.clearSelection', { count: selected.length })}
            </Button>
          )}
        </div>
        <Table<Notification>
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          size="middle"
          scroll={{ x: 1050 }}
          loading={!current}
          rowSelection={
            can('notification:export')
              ? {
                  selectedRowKeys: selectedKeys,
                  preserveSelectedRowKeys: true,
                  onChange: (keys) => setSelection({ scope, keys }),
                  getCheckboxProps: (record) => ({
                    'aria-label': t('notificationCenter.selectNotification', { title: record.title }),
                  }),
                  getTitleCheckboxProps: () => ({ 'aria-label': t('notificationCenter.selectAll') }),
                }
              : undefined
          }
          pagination={{
            current: page,
            pageSize,
            total: filtered.length,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            responsive: true,
            onChange: (nextPage, nextSize) =>
              setQuery({ page: String(nextSize === pageSize ? nextPage : 1), pageSize: String(nextSize) }),
          }}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('notificationCenter.empty')}>
                {(query.search || query.status !== 'all') && (
                  <Button onClick={clearFilters}>{t('notificationCenter.clearFilters')}</Button>
                )}
              </Empty>
            ),
          }}
        />
      </section>
      <Modal
        open={Boolean(editor)}
        title={t(editor?.mode === 'edit' ? 'notificationCenter.editTitle' : 'notificationCenter.createTitle')}
        okText={t('notificationCenter.save')}
        cancelText={t('notificationCenter.cancel')}
        onCancel={closeEditor}
        onOk={() => form.submit()}
        forceRender
      >
        <Form form={form} layout="vertical" onFinish={save} onValuesChange={() => setDirty(true)} preserve={false}>
          <Form.Item
            name="title"
            label={t('notificationCenter.notificationTitle')}
            rules={[
              { required: true, whitespace: true, message: t('notificationCenter.titleRequired') },
              { max: 100, message: t('notificationCenter.titleLimit') },
            ]}
          >
            <Input
              aria-label={t('notificationCenter.notificationTitle')}
              maxLength={100}
              showCount
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={t('notificationCenter.content')}
            rules={[
              { required: true, whitespace: true, message: t('notificationCenter.contentRequired') },
              { max: 2000, message: t('notificationCenter.contentLimit') },
            ]}
          >
            <Input.TextArea aria-label={t('notificationCenter.content')} rows={5} maxLength={2000} showCount />
          </Form.Item>
          <Form.Item name="read" label={t('notificationCenter.read')} valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </BusinessPage>
  )
}
