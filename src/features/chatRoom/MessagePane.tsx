import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, App, Avatar, Button, Empty, Input, Skeleton, Tooltip } from 'antd'
import {
  ArrowDown,
  ArrowLeft,
  Copy,
  Hash,
  Info,
  LockKeyhole,
  MessageCircle,
  RefreshCw,
  Reply,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCheckRoute } from '@platform/auth/hooks/usePermission'
import type { ChatWorkspace } from './useChatWorkspace'
import MessageComposer, { type ComposerMode } from './MessageComposer'
import MessageContent from './MessageContent'
import { chatErrorText } from './ConnectionDialog'
import { roomInitials } from './RoomSidebar'
import styles from './index.module.less'

export default function MessagePane({
  workspace,
  onBack,
  onDetails,
  onConnect,
  visible,
  mode,
  onModeChange,
}: {
  workspace: ChatWorkspace
  onBack: () => void
  onDetails: () => void
  onConnect: () => void
  visible: boolean
  mode: ComposerMode
  onModeChange: (mode: ComposerMode) => void
}) {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const { canAccess: canOpenStudio } = useCheckRoute('/ai-workbench')
  const scroller = useRef<HTMLDivElement>(null)
  const atBottomRef = useRef(true)
  const previousRoom = useRef('')
  const scrollSnapshot = useRef<{ roomId: string; top: number; height: number } | undefined>(undefined)
  const [atBottom, setAtBottom] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [replyId, setReplyId] = useState<{ roomId: string; id: string }>()
  const room = workspace.room
  const replyTarget =
    replyId?.roomId === room?.id
      ? workspace.messages.find((item) => item.id === replyId?.id && item.kind === 'text')
      : undefined
  const lastId = mode === 'note' ? workspace.privateNotes.at(-1)?.id : workspace.messages.at(-1)?.id
  const entryCount = mode === 'note' ? workspace.privateNotes.length : workspace.messages.length
  const notes = workspace.privateNotes.filter(
    (item) => !query.trim() || item.body.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )
  const formatTime = new Intl.DateTimeFormat(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' })
  const formatDay = new Intl.DateTimeFormat(i18n.resolvedLanguage, { year: 'numeric', month: 'short', day: 'numeric' })
  const messages = workspace.messages.filter(
    (item) =>
      !query.trim() ||
      (item.kind === 'text' &&
        `${item.displayName} ${item.body}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  )

  useEffect(() => {
    setQuery('')
    setSearchOpen(false)
  }, [room?.id, mode])
  useEffect(() => setReplyId(undefined), [room?.id, workspace.resetVersion])
  useEffect(() => {
    if (replyId && !replyTarget) setReplyId(undefined)
  }, [replyId, replyTarget])
  useLayoutEffect(() => {
    const element = scroller.current
    if (!element || !visible || (mode === 'reply' && workspace.loadingHistory)) return
    const viewKey = (room?.id ?? '') + ':' + mode
    if (previousRoom.current !== viewKey) {
      scrollSnapshot.current = undefined
      element.scrollTop = element.scrollHeight
      atBottomRef.current = true
      setAtBottom(true)
    } else if (scrollSnapshot.current?.roomId === room?.id && scrollSnapshot.current) {
      element.scrollTop = scrollSnapshot.current.top + element.scrollHeight - scrollSnapshot.current.height
      scrollSnapshot.current = undefined
    } else if (atBottomRef.current) {
      element.scrollTop = element.scrollHeight
      atBottomRef.current = true
      setAtBottom(true)
    }
    previousRoom.current = viewKey
  }, [lastId, room?.id, entryCount, workspace.loadingHistory, visible, mode])

  const latest = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
    atBottomRef.current = true
    setAtBottom(true)
  }
  const copy = async (body: string) => {
    try {
      await navigator.clipboard.writeText(body)
      void message.success(t('chatRoom.copied'))
    } catch {
      void message.error(t('chatRoom.copyFailed'))
    }
  }
  const loadMore = () => {
    if (scroller.current)
      scrollSnapshot.current = {
        roomId: room?.id ?? '',
        top: scroller.current.scrollTop,
        height: scroller.current.scrollHeight,
      }
    workspace.loadMoreHistory()
  }
  if (!room)
    return (
      <section className={styles.conversationEmpty} aria-label={t('chatRoom.conversation')}>
        <div className={styles.welcomeMark}>
          <MessageCircle size={30} aria-hidden="true" />
        </div>
        <h2>{t('chatRoom.welcome')}</h2>
        <p>{t(workspace.connection ? 'chatRoom.selectRoom' : 'chatRoom.welcomeHint')}</p>
        {!workspace.connection && (
          <Button type="primary" onClick={onConnect}>
            {t('chatRoom.connectChat')}
          </Button>
        )}
      </section>
    )
  return (
    <section className={styles.conversation} aria-label={t('chatRoom.conversation')}>
      <header className={styles.conversationHeader}>
        <Button
          className={styles.mobileBack}
          type="text"
          aria-label={t('chatRoom.back')}
          icon={<ArrowLeft size={18} aria-hidden="true" />}
          onClick={onBack}
        />
        <Avatar shape="square" size={36} className={styles.roomAvatar}>
          {roomInitials(room.name)}
        </Avatar>
        <div className={styles.conversationHeading}>
          <h2>{room.name}</h2>
          <p>
            <Hash size={11} aria-hidden="true" />
            <span className={styles.groupKind}>{t('chatRoom.groupConversation')} ·</span>
            <span>{t('chatRoom.membersCount', { count: room.memberCount })}</span>
          </p>
        </div>
        <div className={styles.conversationActions}>
          <Tooltip title={t(mode === 'note' ? 'chatRoom.composer.searchNotes' : 'chatRoom.searchMessages')}>
            <Button
              type="text"
              aria-label={t(mode === 'note' ? 'chatRoom.composer.searchNotes' : 'chatRoom.searchMessages')}
              aria-expanded={searchOpen}
              icon={<Search size={17} aria-hidden="true" />}
              onClick={() => {
                setSearchOpen(!searchOpen)
                setQuery('')
              }}
            />
          </Tooltip>
          <Tooltip title={t('chatRoom.refreshHistory')}>
            <Button
              type="text"
              aria-label={t('chatRoom.refreshHistory')}
              disabled={
                mode === 'note' || workspace.status !== 'online' || workspace.joining || workspace.loadingHistory
              }
              icon={<RefreshCw size={17} aria-hidden="true" />}
              onClick={workspace.refreshHistory}
            />
          </Tooltip>
          <Tooltip title={t('chatRoom.details')}>
            <Button
              type="text"
              aria-label={t('chatRoom.details')}
              icon={<Info size={17} aria-hidden="true" />}
              onClick={onDetails}
            />
          </Tooltip>
        </div>
      </header>
      {searchOpen && (
        <div className={styles.messageSearch}>
          <Input
            autoFocus
            aria-label={t(mode === 'note' ? 'chatRoom.composer.searchNotes' : 'chatRoom.searchLoaded')}
            placeholder={t(mode === 'note' ? 'chatRoom.composer.searchNotes' : 'chatRoom.searchLoaded')}
            allowClear
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button
            type="text"
            aria-label={t('chatRoom.closeSearch')}
            icon={<X size={15} aria-hidden="true" />}
            onClick={() => {
              setQuery('')
              setSearchOpen(false)
            }}
          />
        </div>
      )}
      {workspace.historyError && (
        <Alert
          type="error"
          showIcon
          className={styles.inlineAlert}
          title={chatErrorText(t, workspace.historyError)}
          action={
            <Button size="small" onClick={() => void workspace.selectRoom(room)}>
              {t('chatRoom.retry')}
            </Button>
          }
        />
      )}
      <div
        className={styles.messageScroll}
        ref={scroller}
        onScroll={() => {
          const element = scroller.current
          if (!element) return
          const near = element.scrollHeight - element.scrollTop - element.clientHeight < 80
          atBottomRef.current = near
          setAtBottom(near)
        }}
      >
        {mode === 'reply' &&
          workspace.messages.length >= workspace.historyLimit &&
          workspace.historyLimit < 200 &&
          !query && (
            <div className={styles.loadHistory}>
              <Button size="small" loading={workspace.loadingHistory} onClick={loadMore}>
                {t('chatRoom.loadMore')}
              </Button>
            </div>
          )}
        {mode === 'reply' && (workspace.joining || (workspace.loadingHistory && !workspace.messages.length)) ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : null}
        {mode === 'note' ? (
          <>
            <p className={styles.notesNotice}>
              <LockKeyhole size={14} aria-hidden="true" />
              {t('chatRoom.composer.notesHint')}
            </p>
            <div
              role="log"
              aria-label={t('chatRoom.composer.privateNotes')}
              aria-live="polite"
              className={styles.messageLog}
            >
              {notes.map((note) => (
                <article key={note.id} className={styles.privateNote}>
                  <div className={styles.privateNoteHeader}>
                    <div className={styles.messageMeta}>
                      <LockKeyhole size={12} aria-hidden="true" />
                      <strong>{t('chatRoom.composer.onlyYou')}</strong>
                      <time dateTime={note.createdAt}>{formatTime.format(new Date(note.createdAt))}</time>
                    </div>
                    <div>
                      <Button
                        type="text"
                        size="small"
                        aria-label={t('chatRoom.copyMessage')}
                        icon={<Copy size={14} aria-hidden="true" />}
                        onClick={() => void copy(note.body)}
                      />
                      <Button
                        type="text"
                        size="small"
                        aria-label={t('chatRoom.composer.deleteNote')}
                        icon={<Trash2 size={14} aria-hidden="true" />}
                        onClick={() => workspace.deletePrivateNote(note.id)}
                      />
                    </div>
                  </div>
                  <MessageContent body={note.body} />
                </article>
              ))}
            </div>
            {!notes.length && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t(query ? 'chatRoom.noMatchingMessages' : 'chatRoom.composer.emptyNotes')}
              />
            )}
          </>
        ) : (
          <div
            role="log"
            aria-label={t('chatRoom.messages')}
            aria-live={workspace.loadingHistory ? 'off' : 'polite'}
            aria-relevant="additions"
            aria-busy={workspace.loadingHistory || workspace.joining}
            className={styles.messageLog}
          >
            {messages.map((item, index) => {
              const own = item.userId === workspace.connection?.user.id
              const day = formatDay.format(new Date(item.createdAt))
              const previous = messages[index - 1]
              const showDay = !previous || formatDay.format(new Date(previous.createdAt)) !== day
              return (
                <div key={item.id}>
                  {showDay && (
                    <div className={styles.daySeparator}>
                      <span>{day}</span>
                    </div>
                  )}
                  <article className={styles.messageRow} data-own={own}>
                    {!own && (
                      <Avatar size={28} className={styles.messageAvatar}>
                        {roomInitials(item.displayName)}
                      </Avatar>
                    )}
                    <div className={styles.messageContent}>
                      <div className={styles.messageMeta}>
                        <strong>{own ? t('chatRoom.you') : item.displayName}</strong>
                        <time dateTime={item.createdAt}>{formatTime.format(new Date(item.createdAt))}</time>
                      </div>
                      <div className={styles.bubble} data-kind={item.kind}>
                        {item.kind === 'text' ? (
                          <MessageContent body={item.body} />
                        ) : (
                          <p className={styles.messagePlaceholder}>
                            {item.kind === 'encrypted' ? (
                              <LockKeyhole size={14} aria-hidden="true" />
                            ) : (
                              <Trash2 size={14} aria-hidden="true" />
                            )}
                            {t(`chatRoom.${item.kind}Message`)}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.kind === 'text' && (
                      <div className={styles.messageActions}>
                        <Tooltip title={t('chatRoom.composer.replyMessage')}>
                          <Button
                            type="text"
                            size="small"
                            aria-label={t('chatRoom.composer.replyMessage')}
                            icon={<Reply size={14} aria-hidden="true" />}
                            onClick={() => {
                              setReplyId({ roomId: item.roomId, id: item.id })
                              onModeChange('reply')
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={t('chatRoom.copyMessage')}>
                          <Button
                            type="text"
                            size="small"
                            aria-label={t('chatRoom.copyMessage')}
                            icon={<Copy size={13} aria-hidden="true" />}
                            onClick={() => void copy(item.body)}
                          />
                        </Tooltip>
                      </div>
                    )}
                  </article>
                </div>
              )
            })}
          </div>
        )}
        {mode === 'reply' && !messages.length && !workspace.loadingHistory && !workspace.joining && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t(query ? 'chatRoom.noMatchingMessages' : 'chatRoom.emptyMessages')}
          />
        )}
      </div>
      {!atBottom && (
        <div className={styles.latest}>
          <Button size="small" icon={<ArrowDown size={13} aria-hidden="true" />} onClick={latest}>
            {t('chatRoom.latest')}
          </Button>
        </div>
      )}
      <MessageComposer
        mode={mode}
        onModeChange={onModeChange}
        value={mode === 'note' ? workspace.noteDraft : workspace.draft}
        onChange={mode === 'note' ? workspace.setNoteDraft : workspace.setDraft}
        onSubmit={async (body) => {
          if (mode === 'note') return workspace.savePrivateNote(body)
          const target = replyId
          const sent = await workspace.send(body)
          if (sent) setReplyId((current) => (current === target ? undefined : current))
          return sent
        }}
        sending={mode === 'reply' && workspace.sending}
        ready={workspace.status === 'online' && workspace.roomReady && room.status === 'active' && !workspace.joining}
        offline={workspace.status !== 'online'}
        roomId={room.id}
        scope={workspace.resetVersion}
        replyTarget={replyTarget?.roomId === room.id ? replyTarget : undefined}
        onCancelReply={() => setReplyId(undefined)}
        error={mode === 'reply' && workspace.sendError ? chatErrorText(t, workspace.sendError) : undefined}
        noteCount={workspace.privateNotes.length}
        onOpenStudio={canOpenStudio ? () => navigate('/ai-workbench?view=workspace') : undefined}
      />
    </section>
  )
}
