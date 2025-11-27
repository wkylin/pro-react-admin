import React, { useState, useMemo } from 'react'
import { Button, Badge, Typography, Modal } from 'antd'
import ResponsiveTable from '@/components/ResponsiveTable'
import { useProThemeContext } from '@/theme/hooks'
import FixTabPanel from '@stateless/FixTabPanel'
import { usePermission } from '@/hooks/usePermission'
import request from '@/service/request'

const NotificationsPage = () => {
  const { themeSettings } = useProThemeContext()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  const [modal, setModal] = useState({ visible: false, record: null })

  // 使用 state 存放完整数据，以便删除后更新
  const initialMock = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, i) => ({
        id: i + 1,
        title: `消息标题 ${i + 1}`,
        description: `这是第 ${i + 1} 条消息的内容，支持详情查看。`,
        read: i % 3 === 0,
        time: `${i + 1} 分钟前`,
      })),
    []
  )

  const [items, setItems] = useState(initialMock)
  const { permissions = [] } = usePermission()

  // 主题色适配
  const bgColor = themeSettings.themeMode === 'dark' ? '#18191c' : '#fff'
  const boxShadow = themeSettings.themeMode === 'dark' ? '0 2px 8px #0006' : '0 2px 8px #0001'
  const borderColor = themeSettings.themeMode === 'dark' ? '#333639' : '#f0f0f0'
  const color = themeSettings.themeMode === 'dark' ? '#eee' : '#222'

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 200,
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
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
      render: (read) => (!read ? <Badge status="processing" text="未读" /> : <Badge status="default" text="已读" />),
    },
    // 操作列由 ResponsiveTable 提供（通过 actions prop），这里不再在 columns 中定义操作列
  ]

  return (
    <FixTabPanel>
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveTable
          columns={columns}
          dataSource={items}
          rowKey="id"
          initialPagination={pagination}
          minBodyHeight={120}
          minWidth={800}
          onPaginationChange={(p) => setPagination(p)}
          // permissions: 这里示例全部允许，替换为项目权限检查函数
          permissionChecker={(actionKey, record) => {
            // 将 actionKey 映射为权限码（根据项目实际权限码调整）
            const map = {
              view: 'notifications:view',
              edit: 'notifications:edit',
              delete: 'notifications:delete',
            }
            const perm = map[actionKey]
            if (!perm) return true
            // 使用 usePermission 提供的 permissions 列表进行同步判断
            return permissions && permissions.length > 0
              ? permissions.includes(perm) || permissions.includes('*:*')
              : true
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
              key: 'delete',
              label: '删除',
              confirm: '确认删除该消息吗？',
              onClick: async (r) => {
                // 调用后端删除接口（请根据后端实际接口调整 URL）
                try {
                  await request.delete(`/api/notifications/${r.id}`)
                } catch (e) {
                  // 如果删除失败，抛出以便父 hook 处理（handleDelete 可捕获）
                  return Promise.reject(e)
                }

                // 成功返回，父 hook 的 handleDelete 会调用 reloadPage 或者本地数据更新
                return Promise.resolve()
              },
            },
          ]}
          // reloadPage: 在 hook 中删除后需要由父组件触发实际数据加载或校验页码
          reloadPage={async (page, pageSize) => {
            setPagination({ current: page, pageSize })
            // 从服务器请求指定页的数据并替换 items（根据后端返回结构适配）
            try {
              const res = await request.get('/api/notifications', { page, pageSize }).catch((err) => {
                console.error('reloadPage request failed', err)
                return null
              })

              if (!res) {
                // 请求失败或被中断，保留现有数据
                return Promise.resolve()
              }

              // 兼容多种后端返回格式：
              // 1) 直接返回数组
              // 2) { data: [...] }
              // 3) { data: { items: [...] } } 或 { items: [...] } 或 { list: [...] }
              let list = []
              if (Array.isArray(res)) list = res
              else if (Array.isArray(res.data)) list = res.data
              else if (res.data && Array.isArray(res.data.items)) list = res.data.items
              else if (Array.isArray(res.items)) list = res.items
              else if (Array.isArray(res.list)) list = res.list

              if (list && Array.isArray(list)) {
                setItems(list)
              }

              return Promise.resolve()
            } catch (e) {
              console.error('reloadPage error', e)
              // 读取失败时回退到本地（不改变 items）
              return Promise.resolve()
            }
          }}
        />
      </div>
      <Modal
        open={modal.visible}
        title={modal.record?.title}
        onCancel={() => setModal({ visible: false, record: null })}
        footer={<Button onClick={() => setModal({ visible: false, record: null })}>关闭</Button>}
        styles={{
          body: {
            color,
          },
        }}
      >
        <Typography.Paragraph style={{ color }}>{modal.record?.description}</Typography.Paragraph>
        <div style={{ color: '#999' }}>时间：{modal.record?.time}</div>
      </Modal>
    </FixTabPanel>
  )
}

export default NotificationsPage
