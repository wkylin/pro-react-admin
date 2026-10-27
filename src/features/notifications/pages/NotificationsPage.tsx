import { useState, useRef } from 'react'
import type { Key } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { App, Button, Badge, Typography, Modal, theme } from 'antd'
import type { ColumnType } from 'antd/es/table'
import ResponsiveTable from '@wui/ResponsiveTable'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { hasEffectivePermission } from '@platform/auth/model/policy'
import type { PermissionCode } from '@platform/auth/model/permission'
import { useNotificationsStore } from '../model/notificationsStore'
import type { Notification, NotificationDateValue, NotificationSearchValues } from '../model/types'

type NotificationColumn = ColumnType<Notification> & { index?: boolean }

type NotificationTableApi = {
  getSearch?: () => Record<string, string> | undefined
  form: {
    setFieldsValue: (values: Pick<NotificationSearchValues, 'title'>) => void
    getFieldsValue: () => NotificationSearchValues
  }
  fetchPage: (page: number, pageSize: number, sort: null, search: NotificationSearchValues) => Promise<unknown>
  pagination: { pageSize: number }
}

const NotificationsPage = () => {
  const { token } = theme.useToken()
  const { message } = App.useApp()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  const [modal, setModal] = useState<{ visible: boolean; record: Notification | null }>({
    visible: false,
    record: null,
  })

  const items = useNotificationsStore((state) => state.notifications)
  const removeNotification = useNotificationsStore((state) => state.remove)
  const { current } = usePermission()
  // 用于演示从父组件/外部控制 toolbar 表单的 apiRef
  const tableApiRef = useRef<NotificationTableApi | null>(null)
  const navigate = useNavigate()
  const { search } = useLocation()

  // 示例：我们建议使用 `initialValues` 或 `onToolbarReady` 来初始化表单。
  // 已在下面的 <ResponsiveTable /> props 中将 title 放入 toolbar.search.initialValues 做示例。
  // 也可以使用 onToolbarReady 回调在表单就绪时进行更精确的初始化（见组件 props 示例）。

  // 新增/导出示例处理器
  const handleAdd = () => {
    setModal({ visible: true, record: null })
  }

  const exportRows = (selectedRowKeys: Key[] = []) => {
    const rows = selectedRowKeys?.length ? items.filter((item) => selectedRowKeys.includes(item.id)) : items
    if (!rows || rows.length === 0) {
      message.info('没有数据可导出')
      return
    }

    const csv = [
      ['id', 'title', 'description', 'time', 'read'],
      ...rows.map((r) => [String(r.id), r.title, r.description, r.time, r.read ? '已读' : '未读']),
    ]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'notifications.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const columns: NotificationColumn[] = [
    {
      title: '序号',
      key: '__index',
      index: true,
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 200,
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: '内容',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'time',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'read',
      width: 80,
      render: (read: boolean) =>
        !read ? <Badge status="processing" text="未读" /> : <Badge status="default" text="已读" />,
    },
    // 操作列由 ResponsiveTable 提供（通过 actions prop），这里不再在 columns 中定义操作列
  ]

  return (
    <FixTabPanel>
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveTable<Notification>
          columns={columns}
          dataSource={items}
          apiRef={tableApiRef}
          rowKey="id"
          initialPagination={pagination}
          minBodyHeight={120}
          minWidth={800}
          onPaginationChange={(p) => setPagination(p)}
          permissionChecker={(actionKey) => {
            const map: Record<string, PermissionCode> = {
              view: 'notification:read',
              edit: 'notification:update',
              delete: 'notification:delete',
              open_tab: 'notification:read',
              open_tab_with_query: 'notification:read',
              add: 'notification:create',
              export: 'notification:export',
              'set-from-ref': 'notification:read',
            }
            const perm = map[actionKey]
            return Boolean(current && perm && hasEffectivePermission(current, perm))
          }}
          // actions: 自定义回调
          actions={[
            {
              key: 'view',
              label: '查看',
              onClick: (r) => setModal({ visible: true, record: r }),
            },
            {
              key: 'edit',
              label: '编辑',
              onClick: (r) => {
                // 示例编辑行为：打开详情 modal（可替换为编辑表单）
                console.log('edit', r)
              },
            },
            {
              key: 'open_tab',
              label: '在新标签打开',
              onClick: (r) => {
                // 导航到动态详情路由，ProTabs 会为该路径创建一个新的 tab
                try {
                  // 使用 react-router 的 location.search（比直接访问 window.location 更可靠）
                  // 如果当前 URL 含查询，则复用当前查询；否则附带示例 query
                  // 打印调试信息便于排查为何找不到 query
                  try {
                    // 优先尝试从 tableApiRef 获取搜索/筛选参数（组件新增的 api）
                    const refApi = tableApiRef.current
                    let qs = ''
                    try {
                      const searchObj = refApi?.getSearch?.() || null
                      if (searchObj && typeof searchObj === 'object') {
                        const s = new URLSearchParams(searchObj).toString()
                        qs = s ? `?${s}` : ''
                      }
                    } catch (e) {
                      console.error('获取 tableApiRef search 参数失败', e)
                    }

                    // 如果没有从 tableApiRef 获取到查询，则回退到当前 location.search 或示例参数
                    if (!qs) {
                      console.debug('current search (from useLocation):', search)
                      qs = search && search.length > 1 ? search : '?type=2'
                    }
                    navigate(`/notification/${r.id}${qs}`)
                  } catch (e) {
                    console.error('open tab navigate error', e)
                  }
                } catch (e) {
                  console.error('open tab navigate error', e)
                }
              },
            },
            {
              key: 'open_tab_with_query',
              label: '在新标签打开(带 query)',
              onClick: (r) => {
                try {
                  // 示例：打开带固定 query 的详情页
                  navigate(`/notification/${r.id}?type=2&del=0`)
                } catch (e) {
                  console.error('open tab navigate error', e)
                }
              },
            },
            {
              key: 'delete',
              label: '删除',
              confirm: '确认删除该消息吗？',
              onClick: async (record) => {
                // 调用后端删除接口（请根据后端实际接口调整 URL）
                try {
                  // await request.delete(`/api/notifications/${r.id}`)
                } catch (e) {
                  // 如果删除失败，抛出以便父 hook 处理（handleDelete 可捕获）
                  return Promise.reject(e)
                }

                removeNotification(record.id)
                return Promise.resolve()
              },
            },
          ]}
          // toolbar 示例：左侧新增/导出，右侧查询表单
          toolbar={{
            actions: [
              {
                key: 'add',
                label: '新增',
                type: 'primary',
                onClick: () => handleAdd(),
              },
              {
                key: 'export',
                label: '导出',
                onClick: ({ selectedRowKeys }: { selectedRowKeys?: Key[] } = {}) => exportRows(selectedRowKeys),
              },
              // 示例：通过 action 的 onClick 回调使用 api（action 会接收到 toolbarApi）
              {
                key: 'set-from-ref',
                label: 'Ref 设置标题',
                onClick: (api: NotificationTableApi | undefined) => {
                  try {
                    // 通过 api（或 tableApiRef.current）设置 toolbar 表单的 title 字段
                    const refApi = api || tableApiRef.current
                    if (refApi && refApi.form) {
                      refApi.form.setFieldsValue({ title: '由 Ref 设置的标题' })
                      // 可选择立即触发一次查询
                      refApi.fetchPage(1, refApi.pagination.pageSize, null, refApi.form.getFieldsValue())
                    }
                  } catch (e) {
                    console.error('set-from-ref error', e)
                  }
                },
              },
            ],
            search: {
              // fields 演示多种类型：input/select/dateRange/number
              fields: [
                { name: 'title', label: '标题', placeholder: '请输入标题' },
                {
                  name: 'read',
                  label: '状态',
                  type: 'select',
                  options: [
                    { label: '全部', value: '' },
                    { label: '未读', value: false },
                    { label: '已读', value: true },
                  ],
                },
                {
                  name: 'createdAt',
                  label: '创建时间',
                  type: 'dateRange',
                  placeholder: '请选择创建时间范围',
                },
                {
                  name: 'minId',
                  label: '最小 ID',
                  type: 'number',
                  placeholder: '>=',
                },
              ],
              // transformValues 将前端表单值转换为后端期望的参数
              // 这里把 createdAt 的范围转换为 start / end（ISO 字符串），并保持其它字段
              transformValues: (vals: NotificationSearchValues) => {
                const out: NotificationSearchValues = { ...vals }
                if (vals.createdAt && Array.isArray(vals.createdAt)) {
                  const [s, e] = vals.createdAt
                  // moment / dayjs 或 Date 都支持 toISOString
                  const toIsoString = (value: NotificationDateValue) =>
                    typeof value === 'string'
                      ? value
                      : typeof value.toISOString === 'function'
                        ? value.toISOString()
                        : String(value)
                  out.start = s ? toIsoString(s) : undefined
                  out.end = e ? toIsoString(e) : undefined
                  delete out.createdAt
                }
                // 如果 minId 为空字符串或未设置，删除该字段
                if (out.minId === '' || out.minId == null) delete out.minId
                return out
              },
              initialValues: {
                read: '',
                minId: 12,
                title: '初始化title',
              },
              advancedThreshold: 1,
              advancedPlacement: 'drawer', // 'inline' | 'popover' | 'drawer'
              buttons: { searchText: '查询', resetText: '重置' },
            },
          }}
          // 使用服务端 fetchUrl 自动加载（示例：开启后组件会在 mount 时调用 /api/notifications）
          onToolbarReady={(api: NotificationTableApi) => {
            try {
              if (api && api.form) {
                // 在表单就绪时设置初始标题（示例）
                api.form.setFieldsValue({
                  title: '来自 onToolbarReady 的初始标题',
                })
                // 如果需要立即触发一次基于表单当前值的查询，可取消下面注释：
                // api.fetchPage(1, api.pagination.pageSize, null, api.form.getFieldsValue())
              }
            } catch (e) {
              console.error('onToolbarReady handler error', e)
            }
          }}
          showIndex={true}
          indexMode={'global'}
          // 示例：覆盖默认序号列与操作列宽度，并精确控制横向滚动行为
          indexWidth={60}
          actionsWidth={220}
          // scroll 支持像素、字符串（'100%'|'max-content'）或数字
          scroll={{ x: 'max-content' }}
        />
      </div>

      <Modal
        open={modal.visible}
        title={modal.record?.title}
        onCancel={() => setModal({ visible: false, record: null })}
        footer={<Button onClick={() => setModal({ visible: false, record: null })}>关闭</Button>}
        styles={{
          body: {
            color: token.colorText,
          },
        }}
      >
        <Typography.Paragraph style={{ color: token.colorText }}>{modal.record?.description}</Typography.Paragraph>
        <Typography.Text type="secondary">时间：{modal.record?.time}</Typography.Text>
      </Modal>
    </FixTabPanel>
  )
}

export default NotificationsPage
