import { useEffect } from 'react'
import { Button, Card, Empty, Typography, theme } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationsStore } from '../model/notificationsStore'

const NotificationDetail = () => {
  const { id = '' } = useParams<{ id: string }>()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const notificationId = Number(id)
  const notification = useNotificationsStore((state) => state.notifications.find((item) => item.id === notificationId))
  const markRead = useNotificationsStore((state) => state.markRead)

  useEffect(() => {
    if (Number.isFinite(notificationId)) markRead(notificationId)
  }, [markRead, notificationId])

  return (
    <Card
      title={notification?.title ?? '通知详情'}
      style={{
        width: '100%',
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorderSecondary,
      }}
    >
      {notification ? (
        <>
          <Typography.Paragraph>{notification.description}</Typography.Paragraph>
          <Typography.Text type="secondary">时间：{notification.time}</Typography.Text>
        </>
      ) : (
        <Empty description="通知不存在或已被清空" />
      )}
      <div style={{ marginTop: 12 }}>
        <Button onClick={() => navigate(`/notifications${search}`)}>返回通知中心</Button>
      </div>
    </Card>
  )
}

export default NotificationDetail
