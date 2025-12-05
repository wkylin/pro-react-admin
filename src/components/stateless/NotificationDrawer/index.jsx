import React, { useState } from 'react'
import { Badge, Button, Space, Typography, theme, Drawer, Grid } from 'antd'
import { BellOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
const { useBreakpoint } = Grid
const initialNotifications = [
  { id: 1, title: '欢迎使用 Pro React Admin', description: '感谢您的体验与支持！', read: false, time: '1分钟前' },
  {
    id: 2,
    title: '新功能上线',
    description: '全站菜单查询功能全新上线，支持快速定位与跳转！',
    read: false,
    time: '5分钟前',
  },
  {
    id: 3,
    title: '新功能上线',
    description: 'ResponsiveTable高复用表格上线，欢迎试用！',
    read: false,
    time: '10分钟前',
  },
  { id: 4, title: '新功能上线', description: '权限系统与主题切换已支持。', read: false, time: '15分钟前' },
  { id: 5, title: '文档更新', description: 'README.md 已优化，欢迎查阅。', read: true, time: '1天前' },
]

const NotificationDropdown = ({ iconColor, variant = 'inline', buttonStyle, ghost = false }) => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length
  const { redirectTo } = useSafeNavigate()
  // 最大在 Drawer 中显示的通知数量（防止列表过长影响性能/体验）
  const MAX_ITEMS = 50
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const markAllRead = () => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }
  const clearAll = () => {
    setNotifications([])
  }

  const {
    token: { colorBgContainer, colorBorder, colorText },
  } = theme.useToken()

  // content structure: header (optional) / list (scrollable) / footer (fixed)
  const dropdownContent = (
    <div
      style={{
        height: '100%',
        backgroundColor: colorBgContainer,
        color: colorText,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {notifications.length === 0 ? (
          <div style={{ color: '#999', textAlign: 'center', padding: '32px 0' }}>暂无通知</div>
        ) : (
          notifications.slice(0, MAX_ITEMS).map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setNotifications((list) => list.map((n) => (n.id === item.id ? { ...n, read: true } : n)))
                  safeNavigate(`/notification/${item.id}`)
                }
              }}
              onClick={() => {
                setNotifications((list) => list.map((n) => (n.id === item.id ? { ...n, read: true } : n)))
                safeNavigate(`/notification/${item.id}`)
              }}
              style={{
                opacity: item.read ? 0.6 : 1,
                padding: '8px 0',
                borderBottom: `1px solid ${colorBorder}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!item.read && <Badge status="processing" />}
                <Typography.Text strong>{item.title}</Typography.Text>
              </div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>
                {item.description}
                <span style={{ color: '#999', marginLeft: 8, fontSize: 12 }}>{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          borderTop: `1px solid ${colorBorder}`,
          padding: 8,
          backgroundColor: colorBgContainer,
          textAlign: 'right',
        }}
      >
        <Space>
          <Button size="small" onClick={markAllRead} icon={<CheckCircleOutlined />}>
            全部已读
          </Button>
          <Button size="small" onClick={clearAll} icon={<DeleteOutlined />} danger>
            清空
          </Button>
          <Button size="small" type="link" onClick={() => safeNavigate('/notifications')}>
            查看全部
          </Button>
        </Space>
      </div>
    </div>
  )

  const [popVisible, setPopVisible] = useState(false)

  const safeNavigate = (path) => {
    setPopVisible(false)
    setTimeout(() => {
      redirectTo(path)
    }, 10)
  }

  const openDrawer = () => setPopVisible(true)

  const iconNode = (
    <Badge count={unreadCount} size="small" overflowCount={49}>
      <BellOutlined style={{ fontSize: 16, color: iconColor }} />
    </Badge>
  )

  const triggerNode =
    variant === 'button' ? (
      <Button
        type="default"
        size="small"
        ghost={ghost}
        icon={iconNode}
        onClick={openDrawer}
        aria-haspopup="dialog"
        aria-expanded={popVisible}
        style={{
          fontSize: 16,
          ...(buttonStyle || {}),
          ...(iconColor ? { color: iconColor } : {}),
        }}
      >
        {isMobile ? '通知' : null}
      </Button>
    ) : (
      <span onClick={openDrawer} style={{ cursor: 'pointer', color: iconColor }}>
        {iconNode}
        {isMobile && <span style={{ marginLeft: 4 }}>通知</span>}
      </span>
    )

  return (
    <>
      {triggerNode}
      <Drawer
        title="通知"
        placement="right"
        onClose={() => setPopVisible(false)}
        open={popVisible}
        size={360}
        styles={{ body: { padding: 0 } }}
      >
        {dropdownContent}
      </Drawer>
    </>
  )
}

export default NotificationDropdown
