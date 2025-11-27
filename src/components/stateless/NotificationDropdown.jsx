import React, { useState } from 'react'
import { Badge, Popover, Button, Space, Typography, theme } from 'antd'
import { BellOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const initialNotifications = [
  { id: 1, title: '欢迎使用 Pro React Admin', description: '感谢您的体验与支持！', read: false, time: '1分钟前' },
  { id: 2, title: '新功能上线', description: '权限系统与主题切换已支持。', read: false, time: '5分钟前' },
  { id: 3, title: '文档更新', description: 'README.md 已优化，欢迎查阅。', read: true, time: '1天前' },
]

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length
  const navigate = useNavigate()

  const markAllRead = () => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }
  const clearAll = () => {
    setNotifications([])
  }

  const {
    token: { colorBgContainer, colorBorder, colorText },
  } = theme.useToken()

  const dropdownContent = (
    <div
      style={{
        width: 320,
        maxHeight: 400,
        background: colorBgContainer,
        borderRadius: 8,
        boxShadow: '0 2px 8px #0001',
        border: `1px solid ${colorBorder}`,
        color: colorText,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 120,
      }}
    >
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {notifications.length === 0 ? (
          <div style={{ color: '#999', textAlign: 'center', padding: '32px 0' }}>暂无通知</div>
        ) : (
          notifications.slice(0, 5).map((item) => (
            <div
              key={item.id}
              style={{
                opacity: item.read ? 0.6 : 1,
                padding: '8px 0',
                borderBottom: `1px solid ${colorBorder}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {!item.read && <Badge status="processing" />}
                <Typography.Text strong>{item.title}</Typography.Text>
              </div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>
                {item.description}
                <span style={{ color: '#999', marginLeft: 8, fontSize: 12 }}>{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{ borderTop: `1px solid ${colorBorder}`, padding: 8, background: colorBgContainer, textAlign: 'right' }}
      >
        <Space>
          <Button size="small" onClick={markAllRead} icon={<CheckCircleOutlined />}>
            全部已读
          </Button>
          <Button size="small" onClick={clearAll} icon={<DeleteOutlined />} danger>
            清空
          </Button>
          <Button size="small" type="link" onClick={() => navigate('/notifications')}>
            查看全部
          </Button>
        </Space>
      </div>
    </div>
  )

  return (
    <Popover content={dropdownContent} trigger="click" placement="bottomRight" styles={{ container: { padding: 0 } }}>
      <span>
        <Badge count={unreadCount} size="small" offset={[-2, 2]}>
          <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
        </Badge>
      </span>
    </Popover>
  )
}

export default NotificationDropdown
