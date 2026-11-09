import { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Dropdown, Empty, Input, Segmented, Tooltip } from 'antd'
import { CheckCheck, Ellipsis, Hash, ListFilter, PanelRightOpen, Pin, PinOff, RefreshCw, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ChatWorkspace } from './useChatWorkspace'
import type { ChatRoom } from './model'
import styles from './index.module.less'
import panels from './RoomPanels.module.less'

export function roomInitials(name: string) {
  return Array.from(name.trim()).slice(0, 2).join('').toUpperCase()
}

export default function RoomSidebar({
  workspace,
  onSelect,
  onConnect,
  onDetails,
}: {
  workspace: ChatWorkspace
  onSelect: (room: ChatRoom) => void
  onConnect: () => void
  onDetails?: (room: ChatRoom) => void
}) {
  const { t, i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('active')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const unreadToggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setSearch('')
    setFilter('active')
    setUnreadOnly(false)
  }, [workspace.resetVersion])
  const pinned = new Set(workspace.pinnedRoomIds)
  const rooms = workspace.rooms
    .filter(
      (room) =>
        (filter === 'all' || room.status === 'active') &&
        (!unreadOnly || (workspace.newMessages[room.id] ?? 0) > 0) &&
        `${room.name} ${room.description}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
    )
    .sort((left, right) => {
      const priority = Number(pinned.has(right.id)) - Number(pinned.has(left.id))
      const activity = (room: ChatRoom) => Date.parse(workspace.cache[room.id]?.at(-1)?.createdAt ?? room.createdAt)
      return (
        priority ||
        activity(right) - activity(left) ||
        left.name.localeCompare(right.name, i18n.resolvedLanguage) ||
        left.id.localeCompare(right.id)
      )
    })
  return (
    <aside className={styles.sidebar} aria-label={t('chatRoom.rooms')} data-content-typography-exempt>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTitle}>
          <h2>{t('chatRoom.rooms')}</h2>
          <span className={styles.roomCount}>{workspace.rooms.length}</span>
        </div>
        <Tooltip title={t('chatRoom.refreshRooms')}>
          <Button
            type="text"
            size="small"
            aria-label={t('chatRoom.refreshRooms')}
            disabled={!workspace.connection || workspace.connecting}
            onClick={() => void workspace.refreshRooms()}
            icon={<RefreshCw size={15} aria-hidden="true" />}
          />
        </Tooltip>
      </div>
      <div className={styles.roomFilters}>
        <Input
          aria-label={t('chatRoom.searchRooms')}
          placeholder={t('chatRoom.searchRooms')}
          prefix={<Search size={15} aria-hidden="true" />}
          allowClear
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Segmented
          block
          aria-label={t('chatRoom.roomFilter')}
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'active', label: t('chatRoom.activeRooms') },
            { value: 'all', label: t('chatRoom.allRooms') },
          ]}
        />
        <Button
          ref={unreadToggle}
          className={panels.unreadToggle}
          size="small"
          type={unreadOnly ? 'primary' : 'default'}
          aria-pressed={unreadOnly}
          icon={<ListFilter size={13} aria-hidden="true" />}
          onClick={() => setUnreadOnly((value) => !value)}
        >
          {t('chatRoom.unreadOnly')}
        </Button>
      </div>
      <div className={styles.roomList}>
        {rooms.map((room) => {
          const last = workspace.cache[room.id]?.at(-1)
          const count = workspace.newMessages[room.id] ?? 0
          const preview = last
            ? last.kind === 'text'
              ? last.body
              : t(`chatRoom.${last.kind}Message`)
            : room.description
          return (
            <div className={panels.roomRow} key={room.id}>
              <button
                type="button"
                className={`${styles.roomItem} ${panels.roomButton}`}
                data-selected={workspace.room?.id === room.id}
                aria-current={workspace.room?.id === room.id ? 'true' : undefined}
                aria-label={t('chatRoom.openRoom', { name: room.name })}
                disabled={room.status !== 'active' || workspace.connecting}
                onClick={() => onSelect(room)}
              >
                <Avatar shape="square" size={40} className={styles.roomAvatar}>
                  {roomInitials(room.name)}
                </Avatar>
                <span className={styles.roomItemBody}>
                  <span className={styles.roomItemHeading}>
                    <span className={panels.roomName}>
                      <strong>{room.name}</strong>
                      {pinned.has(room.id) && (
                        <span className={panels.pinnedMark} title={t('chatRoom.pinned')}>
                          <Pin size={11} aria-hidden="true" />
                        </span>
                      )}
                    </span>
                    {last && (
                      <time dateTime={last.createdAt}>
                        {new Intl.DateTimeFormat(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' }).format(
                          new Date(last.createdAt)
                        )}
                      </time>
                    )}
                  </span>
                  <span className={styles.roomPreview}>{preview || t('chatRoom.roomEmpty')}</span>
                  <span className={styles.roomItemMeta}>
                    <Hash size={11} aria-hidden="true" />
                    {t(`chatRoom.roomStatus.${room.status}`)}
                    {count > 0 && (
                      <span className={styles.newBadge} aria-label={t('chatRoom.newCount', { count })}>
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </span>
                </span>
              </button>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      key: 'pin',
                      label: t(pinned.has(room.id) ? 'chatRoom.unpinRoom' : 'chatRoom.pinRoom'),
                      icon: pinned.has(room.id) ? (
                        <PinOff size={14} aria-hidden="true" />
                      ) : (
                        <Pin size={14} aria-hidden="true" />
                      ),
                    },
                    {
                      key: 'read',
                      label: t('chatRoom.markRead'),
                      icon: <CheckCheck size={14} aria-hidden="true" />,
                      disabled: count === 0,
                    },
                    ...(onDetails
                      ? [
                          {
                            key: 'details',
                            label: t('chatRoom.viewRoomDetails'),
                            icon: <PanelRightOpen size={14} aria-hidden="true" />,
                          },
                        ]
                      : []),
                  ],
                  onClick: ({ key }) => {
                    if (key === 'pin') workspace.togglePinRoom(room.id)
                    if (key === 'read') {
                      workspace.markRoomRead(room.id)
                      if (unreadOnly) requestAnimationFrame(() => unreadToggle.current?.focus())
                    }
                    if (key === 'details') onDetails?.(room)
                  },
                }}
              >
                <Button
                  className={panels.roomMore}
                  type="text"
                  size="small"
                  disabled={!workspace.connection || workspace.connecting}
                  aria-label={t('chatRoom.roomOptions', { name: room.name })}
                  icon={<Ellipsis size={16} aria-hidden="true" />}
                />
              </Dropdown>
            </div>
          )
        })}
        {!rooms.length && (
          <div className={styles.roomsEmpty}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t(workspace.connection ? 'chatRoom.noRooms' : 'chatRoom.roomsNotConnected')}
            />
            {!workspace.connection && <Button onClick={onConnect}>{t('chatRoom.connectChat')}</Button>}
          </div>
        )}
      </div>
      <div className={styles.sidebarAccount}>
        <Avatar size={32}>
          {workspace.connection ? (
            roomInitials(workspace.connection.user.displayName)
          ) : (
            <Hash size={15} aria-hidden="true" />
          )}
        </Avatar>
        <div>
          <strong>{workspace.connection?.user.displayName ?? t('chatRoom.notConnected')}</strong>
          <span>{workspace.connection ? t('chatRoom.chatAccount') : t('chatRoom.serviceName')}</span>
        </div>
      </div>
    </aside>
  )
}
