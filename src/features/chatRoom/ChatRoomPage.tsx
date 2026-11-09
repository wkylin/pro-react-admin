import { useEffect, useState } from 'react'
import { Alert, Button, Drawer, Grid } from 'antd'
import { LogIn, LogOut, Settings2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useChatWorkspace } from './useChatWorkspace'
import ConnectionDialog, { chatErrorText } from './ConnectionDialog'
import MessagePane from './MessagePane'
import RoomSidebar from './RoomSidebar'
import RoomDetails from './RoomDetails'
import type { ComposerMode } from './MessageComposer'
import styles from './index.module.less'

export default function ChatRoomPage() {
  const { t } = useTranslation()
  const workspace = useChatWorkspace()
  const { setReadingRoom } = workspace
  const screens = Grid.useBreakpoint()
  const mobile = !screens.md
  const [settings, setSettings] = useState(false)
  const [details, setDetails] = useState(false)
  const [view, setView] = useState<'rooms' | 'messages'>('rooms')
  const [composerMode, setComposerMode] = useState<ComposerMode>('reply')
  useEffect(() => {
    setSettings(false)
    setDetails(false)
    setView('rooms')
    setComposerMode('reply')
  }, [workspace.resetVersion])
  useEffect(() => {
    if (!workspace.connection) {
      setView('rooms')
      setDetails(false)
    }
  }, [workspace.connection])
  useEffect(() => {
    setReadingRoom((!mobile || view === 'messages') && composerMode === 'reply')
  }, [mobile, view, composerMode, setReadingRoom])
  useEffect(() => setComposerMode('reply'), [workspace.room?.id])
  const status = workspace.connecting ? 'connecting' : workspace.connection ? workspace.status : 'disconnected'
  return (
    <FixTabPanel showScrollProgress={false}>
      <section className={styles.page} aria-labelledby="chat-room-title">
        <header className={styles.pageHeader}>
          <div>
            <h1 id="chat-room-title">{t('chatRoom.title')}</h1>
            <p>{t('chatRoom.description')}</p>
          </div>
          <div className={styles.pageActions}>
            <span className={styles.connectionStatus} data-status={status} role="status">
              <span aria-hidden="true" />
              {t(`chatRoom.connectionStatus.${status}`)}
            </span>
            {workspace.connection && (
              <Button
                aria-label={t('chatRoom.disconnect')}
                icon={<LogOut size={15} aria-hidden="true" />}
                onClick={() => void workspace.disconnect()}
              >
                {t('chatRoom.disconnectShort')}
              </Button>
            )}
            <Button
              type={workspace.connection ? 'default' : 'primary'}
              aria-label={t(workspace.connection ? 'chatRoom.settings' : 'chatRoom.connectChat')}
              icon={
                workspace.connection ? (
                  <Settings2 size={15} aria-hidden="true" />
                ) : (
                  <LogIn size={15} aria-hidden="true" />
                )
              }
              onClick={() => setSettings(true)}
            >
              <span className={workspace.connection ? styles.settingsLabel : undefined}>
                {t(workspace.connection ? 'chatRoom.settings' : 'chatRoom.connectChat')}
              </span>
            </Button>
          </div>
        </header>
        {workspace.connectionError && !settings && (
          <Alert
            type="warning"
            showIcon
            title={chatErrorText(t, workspace.connectionError)}
            action={
              <Button
                size="small"
                onClick={() => {
                  if (workspace.status === 'error') void workspace.disconnect()
                  setSettings(true)
                }}
              >
                {t(workspace.status === 'error' ? 'chatRoom.reconnect' : 'chatRoom.settings')}
              </Button>
            }
          />
        )}
        <div className={styles.workspace} data-mobile-view={view} data-details={details && Boolean(screens.xl)}>
          <RoomSidebar
            workspace={workspace}
            onConnect={() => setSettings(true)}
            onDetails={(room) => {
              if (room.status !== 'active') return
              setView('messages')
              setComposerMode('reply')
              void workspace.selectRoom(room)
              setDetails(true)
            }}
            onSelect={(room) => {
              setView('messages')
              setDetails(false)
              void workspace.selectRoom(room)
            }}
          />
          <MessagePane
            workspace={workspace}
            visible={!mobile || view === 'messages'}
            mode={composerMode}
            onModeChange={setComposerMode}
            onBack={() => setView('rooms')}
            onConnect={() => setSettings(true)}
            onDetails={() => setDetails(!details)}
          />
          {details && screens.xl && workspace.room && (
            <aside className={styles.details}>
              <RoomDetails workspace={workspace} onClose={() => setDetails(false)} />
            </aside>
          )}
        </div>
        {details && !screens.xl && (
          <Drawer open title={t('chatRoom.details')} size={320} onClose={() => setDetails(false)}>
            <RoomDetails workspace={workspace} onClose={() => setDetails(false)} />
          </Drawer>
        )}
        {settings && <ConnectionDialog workspace={workspace} onClose={() => setSettings(false)} />}
      </section>
    </FixTabPanel>
  )
}
