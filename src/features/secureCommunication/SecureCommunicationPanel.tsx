import { useEffect, useRef, useState } from 'react'
import { Alert, App, Button, Card, Col, Input, Row, Select, Space, Tabs, Tag, Typography, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import useWebsocket from '@hooks/useWebsocket'
import {
  CHAT_PLATFORM_API,
  closeChatPlatformSession,
  openChatPlatformConnection,
  type ChatPlatformConnection,
} from './chatPlatform'
import { decryptMessage, encryptMessage, generateSessionKey, validateSocketUrl } from './crypto'
import { useXmppChannel } from './useXmppChannel'

const { Text, Paragraph } = Typography
const { TextArea } = Input

type MessageItem = { direction: '发送' | '接收'; text: string; at: number; from?: string }

function errorText(cause: unknown): string {
  return cause instanceof Error ? cause.message : '操作失败'
}

function MessageLog({ messages }: { messages: MessageItem[] }) {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  return (
    <div
      aria-live="polite"
      style={{
        maxHeight: 220,
        overflowY: 'auto',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: 8,
        padding: 12,
      }}
    >
      {messages.length === 0 ? (
        <Text type="secondary">{t('secureCommunication.messageLog.empty')}</Text>
      ) : (
        <Space orientation="vertical" style={{ width: '100%' }}>
          {messages.map((item, index) => (
            <div key={`${item.at}-${index}`} style={{ overflowWrap: 'anywhere' }}>
              <Text type="secondary">
                {new Date(item.at).toLocaleTimeString()} ·{' '}
                {item.direction === '发送'
                  ? t('secureCommunication.messageLog.sent')
                  : t('secureCommunication.messageLog.received')}
                {item.from ? ` · ${item.from}` : ''}
              </Text>
              <div>{item.text}</div>
            </div>
          ))}
        </Space>
      )}
    </div>
  )
}

function LocalCrypto({ sessionKey, onKeyChange }: { sessionKey: string; onKeyChange: (value: string) => void }) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [plain, setPlain] = useState(() => t('secureCommunication.local.sample'))
  const [wire, setWire] = useState('')
  const [decoded, setDecoded] = useState('')

  const encrypt = async () => {
    try {
      const envelope = await encryptMessage(plain, sessionKey)
      setWire(JSON.stringify(envelope))
      setDecoded('')
      message.success(t('secureCommunication.local.encrypted'))
    } catch (cause) {
      message.error(errorText(cause))
    }
  }
  const decrypt = async () => {
    try {
      setDecoded(await decryptMessage(wire, sessionKey))
      message.success(t('secureCommunication.local.decrypted'))
    } catch (cause) {
      setDecoded('')
      message.error(errorText(cause))
    }
  }

  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Space.Compact style={{ width: '100%' }}>
        <Input.Password
          aria-label={t('secureCommunication.local.keyLabel')}
          value={sessionKey}
          onChange={(event) => onKeyChange(event.target.value)}
          placeholder={t('secureCommunication.local.keyPlaceholder')}
        />
        <Button onClick={() => onKeyChange(generateSessionKey())}>{t('secureCommunication.local.generateKey')}</Button>
      </Space.Compact>
      <Text type="secondary">{t('secureCommunication.local.keyHint')}</Text>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Text strong>{t('secureCommunication.local.plaintext')}</Text>
          <TextArea
            value={plain}
            onChange={(event) => setPlain(event.target.value)}
            rows={4}
            maxLength={4096}
            showCount
          />
          <Button type="primary" onClick={() => void encrypt()} style={{ marginTop: 12 }}>
            {t('secureCommunication.local.encrypt')}
          </Button>
        </Col>
        <Col xs={24} lg={12}>
          <Text strong>{t('secureCommunication.local.envelope')}</Text>
          <TextArea
            value={wire}
            onChange={(event) => setWire(event.target.value)}
            rows={4}
            maxLength={12_000}
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
          />
          <Button onClick={() => void decrypt()} style={{ marginTop: 12 }}>
            {t('secureCommunication.local.decrypt')}
          </Button>
          {decoded && (
            <Paragraph style={{ marginTop: 12, overflowWrap: 'anywhere' }}>
              <Text strong>{t('secureCommunication.local.result')}</Text>
              {decoded}
            </Paragraph>
          )}
        </Col>
      </Row>
    </Space>
  )
}

function WebSocketChannel({ sessionKey }: { sessionKey: string }) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [url, setUrl] = useState('')
  const [activeUrl, setActiveUrl] = useState('')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [receiveError, setReceiveError] = useState('')
  const keyRef = useRef(sessionKey)
  keyRef.current = sessionKey
  const socket = useWebsocket<string>({
    url: activeUrl,
    verify: Boolean(activeUrl),
    autoReconnect: true,
    maxReconnectAttempts: 3,
    onMessage: (body) => {
      if (typeof body !== 'string' || body.length > 12_000) {
        setReceiveError(t('secureCommunication.websocket.invalidMessage'))
        return
      }
      void decryptMessage(body, keyRef.current)
        .then((text) => {
          setReceiveError('')
          setMessages((previous) => [...previous, { direction: '接收' as const, text, at: Date.now() }].slice(-40))
        })
        .catch(() => setReceiveError(t('secureCommunication.websocket.decryptFailed')))
    },
  })

  const connect = () => {
    try {
      setActiveUrl(validateSocketUrl(url))
      setReceiveError('')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }
  const send = async () => {
    try {
      const envelope = await encryptMessage(draft, sessionKey)
      if (!socket.sendMessage(JSON.stringify(envelope))) throw new Error(t('secureCommunication.websocket.notReady'))
      setMessages((previous) => [...previous, { direction: '发送' as const, text: draft, at: Date.now() }].slice(-40))
      setDraft('')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }

  const online = socket.readyState.key === 1 && Boolean(activeUrl)
  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Text type="secondary">{t('secureCommunication.websocket.instructions')}</Text>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label={t('secureCommunication.websocket.address')}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder={t('secureCommunication.websocket.addressPlaceholder')}
        />
        {activeUrl ? (
          <Button
            onClick={() => {
              socket.closeWebSocket()
              setActiveUrl('')
            }}
          >
            {t('secureCommunication.common.disconnect')}
          </Button>
        ) : (
          <Button type="primary" onClick={connect} disabled={!sessionKey}>
            {t('secureCommunication.common.connect')}
          </Button>
        )}
      </Space.Compact>
      <Space>
        <Tag
          color={
            online
              ? 'success'
              : activeUrl && socket.readyState.key === 3
                ? 'error'
                : activeUrl
                  ? 'processing'
                  : 'default'
          }
        >
          {online
            ? t('secureCommunication.common.connected')
            : activeUrl && socket.readyState.key === 3
              ? t('secureCommunication.websocket.disconnected')
              : activeUrl
                ? t('secureCommunication.websocket.connectingOrRetrying')
                : t('secureCommunication.common.notConnected')}
        </Tag>
        {activeUrl && socket.readyState.key === 3 && (
          <Button size="small" onClick={socket.reconnect}>
            {t('secureCommunication.websocket.reconnect')}
          </Button>
        )}
      </Space>
      {receiveError && <Alert type="warning" showIcon title={receiveError} />}
      {Boolean(socket.lastError) && (
        <Alert type="warning" showIcon title={t('secureCommunication.websocket.connectionFailed')} />
      )}
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label={t('secureCommunication.websocket.messageLabel')}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={() => void send()}
          maxLength={4096}
          placeholder={t('secureCommunication.common.messagePlaceholder')}
        />
        <Button type="primary" disabled={!online || !sessionKey} onClick={() => void send()}>
          {t('secureCommunication.common.sendEncrypted')}
        </Button>
      </Space.Compact>
      <MessageLog messages={messages} />
    </Space>
  )
}

function DirectXmppChannel({ sessionKey, onUseDemo }: { sessionKey: string; onUseDemo: () => void }) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [service, setService] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [recipient, setRecipient] = useState('')
  const [draft, setDraft] = useState('')
  const xmpp = useXmppChannel(sessionKey)

  const connect = async () => {
    try {
      await xmpp.connect({ service, jid: account, password })
      setPassword('')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }
  const send = async () => {
    try {
      await xmpp.send(recipient, draft)
      setDraft('')
      message.success(t('secureCommunication.common.sentEncrypted'))
    } catch (cause) {
      message.error(errorText(cause))
    }
  }

  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Alert
        type="info"
        showIcon
        title={t('secureCommunication.direct.noServer')}
        description={
          <Space orientation="vertical" size={2}>
            <Text>{t('secureCommunication.direct.tryDemoHint')}</Text>
            <Button type="link" size="small" style={{ padding: 0, alignSelf: 'flex-start' }} onClick={onUseDemo}>
              {t('secureCommunication.direct.goToDemo')}
            </Button>
          </Space>
        }
      />
      <Text strong>{t('secureCommunication.direct.title')}</Text>
      <Text type="secondary">{t('secureCommunication.direct.instructions')}</Text>
      <Space orientation="vertical" size={4} style={{ width: '100%' }}>
        <Text strong>{t('secureCommunication.direct.service')}</Text>
        <Input
          aria-label={t('secureCommunication.direct.serviceLabel')}
          value={service}
          onChange={(event) => setService(event.target.value)}
          placeholder={t('secureCommunication.direct.servicePlaceholder')}
          disabled={xmpp.status === 'online'}
        />
      </Space>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={4} style={{ width: '100%' }}>
            <Text strong>{t('secureCommunication.direct.account')}</Text>
            <Input
              aria-label={t('secureCommunication.direct.accountLabel')}
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              placeholder={t('secureCommunication.direct.accountPlaceholder')}
              disabled={xmpp.status === 'online'}
            />
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={4} style={{ width: '100%' }}>
            <Text strong>{t('secureCommunication.direct.password')}</Text>
            <Input.Password
              aria-label={t('secureCommunication.direct.passwordLabel')}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t('secureCommunication.direct.passwordPlaceholder')}
              disabled={xmpp.status === 'online'}
            />
          </Space>
        </Col>
      </Row>
      <Space>
        {xmpp.status === 'online' || xmpp.status === 'connecting' ? (
          <Button onClick={() => void xmpp.disconnect()}>{t('secureCommunication.common.disconnect')}</Button>
        ) : (
          <Button
            type="primary"
            onClick={() => void connect()}
            disabled={!sessionKey || !service || !account || !password}
          >
            {t('secureCommunication.direct.connect')}
          </Button>
        )}
        <Tag color={xmpp.status === 'online' ? 'success' : xmpp.status === 'error' ? 'error' : 'default'}>
          {xmpp.status === 'online'
            ? t('secureCommunication.direct.online', { address: xmpp.address })
            : xmpp.status === 'connecting'
              ? t('secureCommunication.direct.authenticating')
              : xmpp.status === 'error'
                ? t('secureCommunication.common.connectionFailed')
                : t('secureCommunication.common.notConnected')}
        </Tag>
      </Space>
      {xmpp.error && <Alert type="warning" showIcon title={xmpp.error} />}
      <Text strong>{t('secureCommunication.common.sendMessage')}</Text>
      <Text>{t('secureCommunication.direct.recipient')}</Text>
      <Input
        aria-label={t('secureCommunication.direct.recipient')}
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
        placeholder={t('secureCommunication.direct.recipientPlaceholder')}
      />
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label={t('secureCommunication.direct.messageLabel')}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={() => void send()}
          maxLength={4096}
          placeholder={t('secureCommunication.common.messagePlaceholder')}
        />
        <Button
          type="primary"
          disabled={xmpp.status !== 'online' || !sessionKey || !recipient.trim() || !draft.trim()}
          onClick={() => void send()}
        >
          {t('secureCommunication.common.sendEncrypted')}
        </Button>
      </Space.Compact>
      <MessageLog
        messages={xmpp.messages.map((item) => ({
          direction: item.direction,
          text: item.text,
          from: item.from,
          at: item.receivedAt,
        }))}
      />
    </Space>
  )
}

function ChatPlatformXmppChannel({ sessionKey }: { sessionKey: string }) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [apiAddress, setApiAddress] = useState(CHAT_PLATFORM_API)
  const [username, setUsername] = useState('guest')
  const [password, setPassword] = useState('guest123!')
  const [rooms, setRooms] = useState<ChatPlatformConnection['rooms']>([])
  const [roomJid, setRoomJid] = useState('')
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [apiError, setApiError] = useState('')
  const connectionRef = useRef<ChatPlatformConnection | null>(null)
  const disposedRef = useRef(false)
  const xmpp = useXmppChannel(sessionKey)

  useEffect(() => {
    disposedRef.current = false
    return () => {
      disposedRef.current = true
      const connection = connectionRef.current
      connectionRef.current = null
      if (connection) void closeChatPlatformSession(connection).catch(() => undefined)
    }
  }, [])

  const disconnect = async () => {
    const connection = connectionRef.current
    connectionRef.current = null
    await xmpp.disconnect()
    setRooms([])
    setRoomJid('')
    if (connection) {
      try {
        await closeChatPlatformSession(connection)
      } catch {
        setApiError(t('secureCommunication.platform.logoutFailed'))
      }
    }
  }

  const connect = async () => {
    setBusy(true)
    let connection: ChatPlatformConnection | null = null
    try {
      if (connectionRef.current) await disconnect()
      setApiError('')
      connection = await openChatPlatformConnection(apiAddress, username, password)
      if (disposedRef.current) {
        await closeChatPlatformSession(connection)
        return
      }
      connectionRef.current = connection
      const { session } = connection
      await xmpp.connect({
        service: session.websocketUrl,
        jid: session.jid,
        authUsername: session.xmppUsername,
        password: session.credential,
        resource: session.imSessionId,
      })
      if (disposedRef.current) return
      setRooms(connection.rooms)
      if (username !== 'guest' || password !== 'guest123!') setPassword('')
      if (connection.rooms[0]) {
        await xmpp.joinRoom(connection.rooms[0].jid)
        setRoomJid(connection.rooms[0].jid)
      }
    } catch (cause) {
      if (!disposedRef.current) {
        setApiError(errorText(cause))
        await xmpp.disconnect()
      }
      if (connection) {
        connectionRef.current = null
        void closeChatPlatformSession(connection).catch(() => undefined)
      }
    } finally {
      if (!disposedRef.current) setBusy(false)
    }
  }

  const selectRoom = async (value: string) => {
    try {
      await xmpp.joinRoom(value)
      setRoomJid(value)
      setApiError('')
    } catch (cause) {
      setApiError(errorText(cause))
    }
  }

  const send = async () => {
    try {
      await xmpp.sendRoom(draft)
      setDraft('')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }

  const connected = xmpp.status === 'online'
  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Text type="secondary">
        {t('secureCommunication.platform.instructionsBeforeLink')}
        <Typography.Link
          href="https://wkylin.github.io/chat-platform/client/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('secureCommunication.platform.clientLink')}
        </Typography.Link>
        {t('secureCommunication.platform.instructionsAfterLink')}
      </Text>
      <Space orientation="vertical" size={4} style={{ width: '100%' }}>
        <Text strong>{t('secureCommunication.platform.apiAddress')}</Text>
        <Input
          aria-label={t('secureCommunication.platform.apiAddress')}
          value={apiAddress}
          onChange={(event) => setApiAddress(event.target.value)}
          disabled={connected || busy}
        />
        <Text type="secondary">{t('secureCommunication.platform.websocketHint')}</Text>
      </Space>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={4} style={{ width: '100%' }}>
            <Text strong>{t('secureCommunication.platform.username')}</Text>
            <Input
              aria-label={t('secureCommunication.platform.usernameLabel')}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={connected || busy}
            />
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={4} style={{ width: '100%' }}>
            <Text strong>{t('secureCommunication.platform.password')}</Text>
            <Input.Password
              aria-label={t('secureCommunication.platform.passwordLabel')}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={connected || busy}
            />
          </Space>
        </Col>
      </Row>
      <Space wrap>
        {connected || xmpp.status === 'connecting' ? (
          <Button onClick={() => void disconnect()} disabled={busy}>
            {t('secureCommunication.platform.disconnect')}
          </Button>
        ) : (
          <Button type="primary" onClick={() => void connect()} loading={busy} disabled={!sessionKey}>
            {t('secureCommunication.platform.connect')}
          </Button>
        )}
        <Tag color={connected ? 'success' : xmpp.status === 'error' || apiError ? 'error' : 'default'}>
          {connected
            ? t('secureCommunication.common.connected')
            : busy
              ? t('secureCommunication.platform.connecting')
              : apiError || xmpp.status === 'error'
                ? t('secureCommunication.common.connectionFailed')
                : t('secureCommunication.common.notConnected')}
        </Tag>
      </Space>
      {connected && (
        <Text type="secondary" style={{ overflowWrap: 'anywhere' }}>
          {t('secureCommunication.platform.connectionDetails', {
            address: xmpp.address,
            websocket: connectionRef.current?.session.websocketUrl,
          })}
        </Text>
      )}
      {(apiError || xmpp.error) && <Alert type="warning" showIcon title={apiError || xmpp.error} />}
      {connected && rooms.length === 0 && (
        <Alert type="info" showIcon title={t('secureCommunication.platform.noRooms')} />
      )}
      <Text strong>{t('secureCommunication.platform.rooms')}</Text>
      <Select
        aria-label={t('secureCommunication.platform.roomLabel')}
        value={roomJid || undefined}
        onChange={(value) => void selectRoom(value)}
        options={rooms.map((room) => ({ label: `${room.name} · ${room.jid}`, value: room.jid }))}
        placeholder={t('secureCommunication.platform.roomPlaceholder')}
        disabled={!connected || rooms.length === 0}
        style={{ width: '100%' }}
      />
      <Text strong>{t('secureCommunication.common.sendMessage')}</Text>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label={t('secureCommunication.platform.messageLabel')}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={() => void send()}
          maxLength={2500}
          placeholder={t('secureCommunication.common.messagePlaceholder')}
        />
        <Button
          type="primary"
          disabled={!connected || !roomJid || !sessionKey || !draft.trim()}
          onClick={() => void send()}
        >
          {t('secureCommunication.common.sendEncrypted')}
        </Button>
      </Space.Compact>
      <MessageLog
        messages={xmpp.messages.map((item) => ({
          direction: item.direction,
          text: item.text,
          from: item.from,
          at: item.receivedAt,
        }))}
      />
    </Space>
  )
}

function XmppChannel({ sessionKey, onKeyChange }: { sessionKey: string; onKeyChange: (value: string) => void }) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const [activeKey, setActiveKey] = useState('chat-platform')
  const createKey = () => {
    try {
      onKeyChange(generateSessionKey())
      message.success(t('secureCommunication.xmpp.keyGenerated'))
    } catch (cause) {
      message.error(errorText(cause))
    }
  }
  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      {!sessionKey && (
        <Alert
          type="warning"
          showIcon
          title={t('secureCommunication.xmpp.keyRequired')}
          description={t('secureCommunication.xmpp.keyRequiredHint')}
          action={
            <Button size="small" type="primary" onClick={createKey}>
              {t('secureCommunication.xmpp.generateKey')}
            </Button>
          }
        />
      )}
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        destroyOnHidden
        style={{ width: '100%' }}
        items={[
          {
            key: 'chat-platform',
            label: t('secureCommunication.xmpp.demoTab'),
            children: <ChatPlatformXmppChannel sessionKey={sessionKey} />,
          },
          {
            key: 'direct',
            label: t('secureCommunication.xmpp.directTab'),
            children: <DirectXmppChannel sessionKey={sessionKey} onUseDemo={() => setActiveKey('chat-platform')} />,
          },
        ]}
      />
    </Space>
  )
}

export default function SecureCommunicationPanel() {
  const { t } = useTranslation()
  const [sessionKey, setSessionKey] = useState('')
  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        type="info"
        showIcon
        title={t('secureCommunication.title')}
        description={t('secureCommunication.description')}
      />
      <Card title={t('secureCommunication.localCard')} size="small">
        <LocalCrypto sessionKey={sessionKey} onKeyChange={setSessionKey} />
      </Card>
      <Card title={t('secureCommunication.transportCard')} size="small">
        <Tabs
          destroyOnHidden
          items={[
            { key: 'websocket', label: 'WebSocket', children: <WebSocketChannel sessionKey={sessionKey} /> },
            {
              key: 'xmpp',
              label: 'XMPP',
              children: <XmppChannel sessionKey={sessionKey} onKeyChange={setSessionKey} />,
            },
          ]}
        />
      </Card>
    </Space>
  )
}
