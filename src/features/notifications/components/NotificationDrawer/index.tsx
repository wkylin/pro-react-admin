import AnimatedIcon from '@wui/AnimatedIcon'
import { useState, type CSSProperties } from 'react'
import { Badge, Button, Space, Typography, theme, Drawer, Grid } from 'antd'
import { BellOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useNotificationsStore } from '../../model/notificationsStore'

interface NotificationDrawerProps {
  iconColor?: string
  variant?: 'inline' | 'button'
  buttonStyle?: CSSProperties
  ghost?: boolean
}

const notificationBadgeRootStyle: CSSProperties = {
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 16px',
  width: 16,
  height: 16,
}

const NotificationDropdown = ({
  iconColor,
  variant = 'inline',
  buttonStyle,
  ghost = false,
}: NotificationDrawerProps) => {
  const notifications = useNotificationsStore((state) => state.notifications)
  const markRead = useNotificationsStore((state) => state.markRead)
  const markAllRead = useNotificationsStore((state) => state.markAllRead)
  const clearAll = useNotificationsStore((state) => state.clear)
  const unreadCount = notifications.filter((n) => !n.read).length
  const navigate = useNavigate()
  const MAX_ITEMS = 50
  const isMobile = !Grid.useBreakpoint().md

  const [popVisible, setPopVisible] = useState(false)

  const safeNavigate = (path: string) => {
    setPopVisible(false)
    navigate(path)
  }

  const handleNotificationOpen = (id: number) => {
    markRead(id)
    safeNavigate(`/notification/${id}`)
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
          <Button
            size="small"
            onClick={markAllRead}
            icon={
              <AnimatedIcon variant="spin" mode="hover">
                <CheckCircleOutlined />
              </AnimatedIcon>
            }
          >
            全部已读
          </Button>
          <Button
            size="small"
            onClick={clearAll}
            icon={
              <AnimatedIcon variant="spin" mode="hover">
                <DeleteOutlined />
              </AnimatedIcon>
            }
            danger
          >
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
    <Badge
      styles={{ root: notificationBadgeRootStyle }}
      count={unreadCount}
      size="small"
      offset={[-4, 4]}
      overflowCount={49}
    >
      <AnimatedIcon variant="spin" mode="hover">
        <BellOutlined style={{ fontSize: 16, color: iconColor }} />
      </AnimatedIcon>
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
        aria-label="通知"
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
        aria-label="通知"
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

export default NotificationDropdown
