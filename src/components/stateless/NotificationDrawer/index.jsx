import React, { useState } from 'react'
import { Badge, Button, Space, Typography, theme, Drawer } from 'antd'
import { useStore } from '@/store'
import { BellOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
const initialNotifications = [
  {
    id: 1,
    title: '欢迎使用 Pro React Admin',
    description: '感谢您的体验与支持！',
    read: false,
    time: '1分钟前',
  },
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
  {
    id: 4,
    title: '新功能上线',
    description: '权限系统与主题切换已支持。',
    read: false,
    time: '15分钟前',
  },
  {
    id: 5,
    title: '文档更新',
    description: 'README.md 已优化，欢迎查阅。',
    read: true,
    time: '1天前',
  },
]

const NotificationDropdown = ({ iconColor, variant = 'inline', buttonStyle, ghost = false }) => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length
  const { redirectTo } = useSafeNavigate()
  const MAX_ITEMS = 50
  const isMobile = useStore((s) => s.isMobile)

  const [popVisible, setPopVisible] = useState(false)

  const safeNavigate = (path) => {
    setPopVisible(false)
    setTimeout(() => {
      redirectTo(path)
    }, 10)
  }

  const markNotificationRead = (id) => {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleNotificationOpen = (id) => {
    markNotificationRead(id)
    safeNavigate(`/notification/${id}`)
  }

  const markAllRead = () => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }
  const clearAll = () => {
    setNotifications([])
  }

  const {
    token: { colorBgContainer, colorBorder, colorText, colorTextSecondary, colorTextTertiary },
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
          <div
            style={{
              color: colorTextTertiary,
              textAlign: 'center',
              padding: '32px 0',
            }}
          >
            暂无通知
          </div>
        ) : (
          notifications.slice(0, MAX_ITEMS).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNotificationOpen(item.id)}
              style={{
                opacity: item.read ? 0.6 : 1,
                padding: '8px 0',
                borderBottom: `1px solid ${colorBorder}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!item.read ? <Badge status="processing" /> : <Badge status="default" />}
                <Typography.Text strong>{item.title}</Typography.Text>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: colorTextSecondary,
                  marginTop: 6,
                }}
              >
                {item.description}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: colorTextTertiary,
                  marginTop: 4,
                  textAlign: 'right',
                }}
              >
                {item.time}
              </div>
            </button>
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
      <button
        type="button"
        onClick={openDrawer}
        aria-haspopup="dialog"
        aria-expanded={popVisible}
        style={{
          cursor: 'pointer',
          color: iconColor,
          background: 'transparent',
          border: 'none',
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {iconNode}
        {isMobile && <span style={{ marginLeft: 4 }}>通知</span>}
      </button>
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

NotificationDropdown.propTypes = {
  iconColor: PropTypes.string,
  variant: PropTypes.oneOf(['inline', 'button']),
  buttonStyle: PropTypes.object,
  ghost: PropTypes.bool,
}

export default NotificationDropdown
