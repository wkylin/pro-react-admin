import AnimatedIcon from '@wui/AnimatedIcon'
import { useState, type CSSProperties } from 'react'
import { App, Badge, Button, Space, Typography, theme, Drawer, Grid } from 'antd'
import { BellOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { hasEffectivePermission } from '@platform/auth/model/policy'
import { permissionService } from '@platform/auth/services/permissionService'
import { useNotificationsStore } from '../../model/notificationsStore'
import { formatNotificationTime } from '../../model/notificationList'

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
  const { t, i18n } = useTranslation()
  const { modal } = App.useApp()
  const { current } = usePermission()
  const notifications = useNotificationsStore((state) => state.notifications)
  const markRead = useNotificationsStore((state) => state.markRead)
  const markAllRead = useNotificationsStore((state) => state.markAllRead)
  const clearAll = useNotificationsStore((state) => state.clear)
  const unreadCount = notifications.filter((n) => !n.read).length
  const canDelete = Boolean(current && hasEffectivePermission(current, 'notification:delete'))
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
            {t('notificationCenter.none')}
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
                  fontSize: 14,
                  color: colorTextSecondary,
                  marginTop: 4,
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
                {formatNotificationTime(item.time, i18n.resolvedLanguage === 'zh' ? 'zh-CN' : 'en-US')}
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
            disabled={unreadCount === 0}
            onClick={markAllRead}
            icon={
              <AnimatedIcon variant="spin" mode="hover">
                <CheckCircleOutlined />
              </AnimatedIcon>
            }
          >
            {t('notificationCenter.markAllRead')}
          </Button>
          {canDelete && (
            <Button
              size="small"
              disabled={notifications.length === 0}
              onClick={() =>
                modal.confirm({
                  title: t('notificationCenter.clearConfirm'),
                  okText: t('notificationCenter.clearAll'),
                  cancelText: t('notificationCenter.cancel'),
                  okButtonProps: { danger: true },
                  onOk: () => {
                    const latest = permissionService.peekPermissions()
                    if (latest && hasEffectivePermission(latest, 'notification:delete')) clearAll()
                  },
                })
              }
              icon={
                <AnimatedIcon variant="spin" mode="hover">
                  <DeleteOutlined />
                </AnimatedIcon>
              }
              danger
            >
              {t('notificationCenter.clearAll')}
            </Button>
          )}
          <Button size="small" type="link" onClick={() => safeNavigate('/notifications')}>
            {t('notificationCenter.viewAll')}
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
        aria-label={t('notificationCenter.notifications')}
        aria-haspopup="dialog"
        aria-expanded={popVisible}
        style={{
          fontSize: 16,
          ...(buttonStyle || {}),
          ...(iconColor ? { color: iconColor } : {}),
        }}
      >
        {isMobile ? t('notificationCenter.notifications') : null}
      </Button>
    ) : (
      <button
        type="button"
        onClick={openDrawer}
        aria-label={t('notificationCenter.notifications')}
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
        {isMobile && <span style={{ marginLeft: 4 }}>{t('notificationCenter.notifications')}</span>}
      </button>
    )

  return (
    <>
      {triggerNode}
      <Drawer
        title={t('notificationCenter.notifications')}
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
