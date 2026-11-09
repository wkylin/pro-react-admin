import { useEffect } from 'react'
import { Button, Empty, Tag, Typography } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BusinessPage from '@shared/ui/BusinessPage'
import { useActivate } from '@platform/keep-alive'
import { useNotificationsStore } from '../model/notificationsStore'
import { formatNotificationTime } from '../model/notificationList'
import styles from './notifications.module.less'

export default function NotificationDetail() {
  const { id = '' } = useParams<{ id: string }>()
  const { search } = useLocation()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const notificationId = Number(id)
  const notification = useNotificationsStore((state) => state.notifications.find((item) => item.id === notificationId))
  const markRead = useNotificationsStore((state) => state.markRead)

  // Layouts without cached tabs still need the initial read transition.
  useEffect(() => {
    if (Number.isSafeInteger(notificationId) && notificationId > 0) markRead(notificationId)
  }, [markRead, notificationId])

  // Cached details must mark read again only when they become visible.
  useActivate(() => {
    if (Number.isSafeInteger(notificationId) && notificationId > 0) markRead(notificationId)
  })

  return (
    <BusinessPage
      title={notification?.title ?? t('notificationCenter.detailTitle')}
      description={
        notification
          ? formatNotificationTime(notification.time, i18n.resolvedLanguage === 'zh' ? 'zh-CN' : 'en-US')
          : undefined
      }
      eyebrow={<Tag>{t('notificationCenter.detailTitle')}</Tag>}
      actions={<Button onClick={() => navigate(`/notifications${search}`)}>{t('notificationCenter.back')}</Button>}
    >
      <section className={styles.panel}>
        {notification ? (
          <Typography.Paragraph className={styles.detailContent}>{notification.description}</Typography.Paragraph>
        ) : (
          <Empty description={t('notificationCenter.noNotification')} />
        )}
      </section>
    </BusinessPage>
  )
}
