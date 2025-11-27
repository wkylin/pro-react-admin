import React, { useState, useMemo } from 'react'
import { Button, Badge, Typography, Modal } from 'antd'
import ResponsiveTable from '@/components/ResponsiveTable'
import { useProThemeContext } from '@/theme/hooks'
import FixTabPanel from '@stateless/FixTabPanel'

const NotificationsPage = () => {
  const { themeSettings } = useProThemeContext()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  const [modal, setModal] = useState({ visible: false, record: null })
  const mockData = useMemo(
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

  const mockData = useMemo(
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
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: (_, record) => (
        <Button size="small" type="link" onClick={() => setModal({ visible: true, record })}>
          查看详情
        </Button>
      ),
    },
  ]

  return (
    <FixTabPanel>
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveTable
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          initialPagination={pagination}
          minBodyHeight={120}
          minWidth={800}
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
