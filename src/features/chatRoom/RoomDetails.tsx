import { useEffect, useMemo, useState } from 'react'
import { App, Avatar, Button, Empty, Tabs, Tooltip } from 'antd'
import { Copy, Ellipsis, Hash, Link2, MessageSquare, Users, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ChatWorkspace } from './useChatWorkspace'
import type { ChatMessage } from './model'
import { safeChatUrl } from './composerModel'
import { roomInitials } from './RoomSidebar'
import styles from './index.module.less'
import panels from './RoomPanels.module.less'

function sharedUrls(messages: readonly ChatMessage[]): string[] {
  const urls = new Set<string>()
  for (const message of [...messages].reverse()) {
    if (message.kind !== 'text' || message.status !== 'visible') continue
    for (const match of message.body.matchAll(/https?:\/\/[^\s<>"']+/gi)) {
      let candidate = match[0].split(String.fromCharCode(96))[0].replace(/[.,;!*_~]+$/g, '')
      for (const [opening, closing] of [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
      ]) {
        let balance = 0
        for (const character of candidate) {
          if (character === opening) balance += 1
          if (character === closing) balance -= 1
        }
        let end = candidate.length
        while (balance < 0 && candidate[end - 1] === closing) {
          end -= 1
          balance += 1
        }
        candidate = candidate.slice(0, end)
      }
      const url = safeChatUrl(candidate)
      if (url) urls.add(url)
      if (urls.size === 30) return [...urls]
    }
  }
  return [...urls]
}

export default function RoomDetails({ workspace, onClose }: { workspace: ChatWorkspace; onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const room = workspace.room
  const [activeTab, setActiveTab] = useState('overview')
  useEffect(() => setActiveTab('overview'), [room?.id, workspace.resetVersion])
  const links = useMemo(() => sharedUrls(workspace.messages), [workspace.messages])
  if (!room) return null
  const participants = [...new Map(workspace.messages.map((item) => [item.userId, item.displayName])).entries()].slice(
    -8
  )
  const activity = workspace.messages.slice(-8).reverse()
  const formatTime = new Intl.DateTimeFormat(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' })
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      void message.success(t('chatRoom.copied'))
    } catch {
      void message.error(t('chatRoom.copyFailed'))
    }
  }
  const overview = (
    <>
      <p className={styles.roomDescription}>{room.description || t('chatRoom.noDescription')}</p>
      <dl className={styles.roomStats}>
        <div>
          <dt>
            <Users size={15} aria-hidden="true" />
            {t('chatRoom.members')}
          </dt>
          <dd>{room.memberCount}</dd>
        </div>
        <div>
          <dt>
            <MessageSquare size={15} aria-hidden="true" />
            {t('chatRoom.totalMessages')}
          </dt>
          <dd>{room.messageCount}</dd>
        </div>
        <div>
          <dt>{t('chatRoom.created')}</dt>
          <dd>
            {new Intl.DateTimeFormat(i18n.resolvedLanguage, { year: 'numeric', month: 'short', day: 'numeric' }).format(
              new Date(room.createdAt)
            )}
          </dd>
        </div>
      </dl>
      <div className={styles.detailsSection}>
        <h3>{t('chatRoom.address')}</h3>
        <code>{room.jid}</code>
        <Button
          type="text"
          size="small"
          icon={<Copy size={13} aria-hidden="true" />}
          onClick={() => void copy(room.jid)}
        >
          {t('chatRoom.copyAddress')}
        </Button>
      </div>
      <div className={styles.detailsSection}>
        <h3>{t('chatRoom.participants')}</h3>
        <p className={styles.detailsHint}>{t('chatRoom.participantsHint')}</p>
        {participants.map(([id, name]) => (
          <div className={styles.participant} key={id}>
            <Avatar size={28}>{roomInitials(name)}</Avatar>
            <span>
              {name}
              {id === workspace.connection?.user.id && <small>{t('chatRoom.you')}</small>}
            </span>
          </div>
        ))}
        {!participants.length && <p className={styles.detailsHint}>{t('chatRoom.noParticipants')}</p>}
      </div>
    </>
  )
  return (
    <section className={styles.detailsContent} aria-label={t('chatRoom.details')} data-content-typography-exempt>
      <header className={styles.detailsHeader}>
        <h2>{t('chatRoom.details')}</h2>
        <Button
          type="text"
          aria-label={t('chatRoom.closeDetails')}
          icon={<X size={17} aria-hidden="true" />}
          onClick={onClose}
        />
      </header>
      <div className={styles.detailsIdentity}>
        <Avatar shape="square" size={64} className={styles.roomAvatar}>
          {roomInitials(room.name)}
        </Avatar>
        <h3>{room.name}</h3>
        <span>
          <Hash size={12} aria-hidden="true" />
          {t('chatRoom.roomStatus.' + room.status)}
        </span>
      </div>
      <Tabs
        className={panels.detailsTabs}
        size="small"
        tabBarGutter={16}
        activeKey={activeTab}
        onChange={setActiveTab}
        more={{
          icon: (
            <span role="img" aria-label={t('chatRoom.moreDetailViews')}>
              <Ellipsis size={15} aria-hidden="true" />
            </span>
          ),
        }}
        items={[
          { key: 'overview', label: t('chatRoom.detailsOverview'), children: overview },
          {
            key: 'links',
            label: t('chatRoom.sharedLinks'),
            children: (
              <>
                <p className={panels.loadedHint}>{t('chatRoom.loadedMessagesOnly')}</p>
                <ul className={panels.sharedLinks}>
                  {links.map((url) => (
                    <li className={panels.sharedLink} key={url}>
                      <Link2 size={14} aria-hidden="true" />
                      <div>
                        <small>{new URL(url).hostname}</small>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </div>
                      <Tooltip title={t('chatRoom.copySharedLink', { url })}>
                        <Button
                          type="text"
                          size="small"
                          aria-label={t('chatRoom.copySharedLink', { url })}
                          icon={<Copy size={13} aria-hidden="true" />}
                          onClick={() => void copy(url)}
                        />
                      </Tooltip>
                    </li>
                  ))}
                </ul>
                {!links.length && (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('chatRoom.noSharedLinks')} />
                )}
              </>
            ),
          },
          {
            key: 'activity',
            label: t('chatRoom.activity'),
            children: (
              <>
                <p className={panels.loadedHint}>{t('chatRoom.loadedMessagesOnly')}</p>
                <ol className={panels.activityList}>
                  {activity.map((item) => (
                    <li className={panels.activityItem} key={item.id}>
                      <span className={panels.activityDot} aria-hidden="true" />
                      <div>
                        <div className={panels.activityMeta}>
                          <strong>{item.displayName}</strong>
                          <time dateTime={item.createdAt}>{formatTime.format(new Date(item.createdAt))}</time>
                        </div>
                        <p>
                          {item.kind === 'text'
                            ? Array.from(item.body).slice(0, 120).join('') +
                              (Array.from(item.body).length > 120 ? '…' : '')
                            : t('chatRoom.' + item.kind + 'Message')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                {!activity.length && (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('chatRoom.noActivity')} />
                )}
              </>
            ),
          },
        ]}
      />
    </section>
  )
}
