import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Table, Button, Badge, Typography, Modal, Pagination } from 'antd'
import { useProThemeContext } from '@/theme/hooks'
import FixTabPanel from '@stateless/FixTabPanel'

const NotificationsPage = () => {
  const { themeSettings } = useProThemeContext()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  const [modal, setModal] = useState({ visible: false, record: null })
  const containerRef = useRef(null)
  const [tableScroll, setTableScroll] = useState({ x: 800, y: 280 })
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

  const pagedData = useMemo(() => {
    const { current, pageSize } = pagination
    const start = (current - 1) * pageSize
    return mockData.slice(start, start + pageSize)
  }, [mockData, pagination.current, pagination.pageSize])

  // 动态计算表格 scroll（根据父容器尺寸），保证分页区域始终在底部可见
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.floor(rect.width || 800)
      const height = Math.floor(rect.height || 400)

      // 试图读取表头高度（若存在），否则使用默认值
      const headerEl = container.querySelector('.ant-table-header') || container.querySelector('.ant-table-thead')
      const headerH = headerEl ? headerEl.offsetHeight : 56
      const footerH = 56 // pagination area 高度预留
      const padding = 16

      const bodyHeight = Math.max(120, height - headerH - footerH - padding)
      setTableScroll({ x: Math.max(width, 800), y: bodyHeight })
    }

    // 初次调用
    update()

    // 监听容器大小变化
    const ro = new ResizeObserver(() => {
      update()
    })
    ro.observe(container)

    return () => ro.disconnect()
  }, [containerRef, pagination.pageSize])

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
      <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={pagedData}
            pagination={false}
            bordered={false}
            scroll={{ x: tableScroll.x, y: tableScroll.y }}
            style={{ width: '100%' }}
          />
        </div>
        <div
          style={{ flex: '0 0 auto', padding: 8, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={mockData.length}
            showSizeChanger
            showQuickJumper
            onChange={(current, pageSize) => setPagination({ current, pageSize })}
            onShowSizeChange={(current, size) => setPagination({ current, pageSize: size })}
          />
        </div>
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
