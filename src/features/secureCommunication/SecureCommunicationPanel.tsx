import { useEffect, useRef, useState } from 'react'
import { Alert, App, Button, Card, Col, Input, Row, Select, Space, Tabs, Tag, Typography, theme } from 'antd'
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
        <Text type="secondary">连接后发送消息，接收到的密文会自动解密并显示在这里。</Text>
      ) : (
        <Space orientation="vertical" style={{ width: '100%' }}>
          {messages.map((item, index) => (
            <div key={`${item.at}-${index}`} style={{ overflowWrap: 'anywhere' }}>
              <Text type="secondary">
                {new Date(item.at).toLocaleTimeString()} · {item.direction}
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
  const { message } = App.useApp()
  const [plain, setPlain] = useState('这是一条加密测试消息')
  const [wire, setWire] = useState('')
  const [decoded, setDecoded] = useState('')

  const encrypt = async () => {
    try {
      const envelope = await encryptMessage(plain, sessionKey)
      setWire(JSON.stringify(envelope))
      setDecoded('')
      message.success('消息已加密')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }
  const decrypt = async () => {
    try {
      setDecoded(await decryptMessage(wire, sessionKey))
      message.success('消息已解密')
    } catch (cause) {
      setDecoded('')
      message.error(errorText(cause))
    }
  }

  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Space.Compact style={{ width: '100%' }}>
        <Input.Password
          aria-label="256 位会话密钥"
          value={sessionKey}
          onChange={(event) => onKeyChange(event.target.value)}
          placeholder="生成或粘贴 256 位 Base64URL 会话密钥"
        />
        <Button onClick={() => onKeyChange(generateSessionKey())}>生成密钥</Button>
      </Space.Compact>
      <Text type="secondary">收发双方需使用相同的会话密钥。密钥仅保留在当前页面内存中，刷新后需要重新输入。</Text>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Text strong>原文</Text>
          <TextArea
            value={plain}
            onChange={(event) => setPlain(event.target.value)}
            rows={4}
            maxLength={4096}
            showCount
          />
          <Button type="primary" onClick={() => void encrypt()} style={{ marginTop: 12 }}>
            加密
          </Button>
        </Col>
        <Col xs={24} lg={12}>
          <Text strong>密文封包</Text>
          <TextArea
            value={wire}
            onChange={(event) => setWire(event.target.value)}
            rows={4}
            maxLength={12_000}
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
          />
          <Button onClick={() => void decrypt()} style={{ marginTop: 12 }}>
            解密
          </Button>
          {decoded && (
            <Paragraph style={{ marginTop: 12, overflowWrap: 'anywhere' }}>
              <Text strong>解密结果：</Text>
              {decoded}
            </Paragraph>
          )}
        </Col>
      </Row>
    </Space>
  )
}

function WebSocketChannel({ sessionKey }: { sessionKey: string }) {
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
        setReceiveError('收到过大的消息或非文本消息')
        return
      }
      void decryptMessage(body, keyRef.current)
        .then((text) => {
          setReceiveError('')
          setMessages((previous) => [...previous, { direction: '接收' as const, text, at: Date.now() }].slice(-40))
        })
        .catch(() => setReceiveError('收到无法用当前会话密钥解密的 WebSocket 消息'))
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
      if (!socket.sendMessage(JSON.stringify(envelope))) throw new Error('连接未就绪，请重新连接')
      setMessages((previous) => [...previous, { direction: '发送' as const, text: draft, at: Date.now() }].slice(-40))
      setDraft('')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }

  const online = socket.readyState.key === 1 && Boolean(activeUrl)
  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Text type="secondary">连接支持文本帧的 WebSocket 服务；服务端需转发或回显收到的 JSON 密文封包。</Text>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label="WebSocket 地址"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="wss://example.com/secure-messages"
        />
        {activeUrl ? (
          <Button
            onClick={() => {
              socket.closeWebSocket()
              setActiveUrl('')
            }}
          >
            断开
          </Button>
        ) : (
          <Button type="primary" onClick={connect} disabled={!sessionKey}>
            连接
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
            ? '已连接'
            : activeUrl && socket.readyState.key === 3
              ? '连接已断开'
              : activeUrl
                ? '连接中或重试中'
                : '未连接'}
        </Tag>
        {activeUrl && socket.readyState.key === 3 && (
          <Button size="small" onClick={socket.reconnect}>
            重新连接
          </Button>
        )}
      </Space>
      {receiveError && <Alert type="warning" showIcon title={receiveError} />}
      {socket.lastError && (
        <Alert type="warning" showIcon title="WebSocket 连接或消息处理失败，请检查地址与服务端状态" />
      )}
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label="WebSocket 消息"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={() => void send()}
          maxLength={4096}
          placeholder="输入要加密发送的消息"
        />
        <Button type="primary" disabled={!online || !sessionKey} onClick={() => void send()}>
          加密发送
        </Button>
      </Space.Compact>
      <MessageLog messages={messages} />
    </Space>
  )
}

function DirectXmppChannel({ sessionKey }: { sessionKey: string }) {
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
      message.success('加密消息已发送')
    } catch (cause) {
      message.error(errorText(cause))
    }
  }

  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Text type="secondary">
        XMPP 服务端需开放 WebSocket 接入。消息以标准 chat stanza 发送，body 中存放 JSON 密文封包。
      </Text>
      <Input
        aria-label="XMPP WebSocket 服务地址"
        value={service}
        onChange={(event) => setService(event.target.value)}
        placeholder="wss://example.com/xmpp-websocket"
        disabled={xmpp.status === 'online'}
      />
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <Input
            aria-label="XMPP JID"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            placeholder="你的 JID：name@example.com"
            disabled={xmpp.status === 'online'}
          />
        </Col>
        <Col xs={24} md={12}>
          <Input.Password
            aria-label="XMPP 口令"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="XMPP 口令"
            disabled={xmpp.status === 'online'}
          />
        </Col>
      </Row>
      <Space>
        {xmpp.status === 'online' || xmpp.status === 'connecting' ? (
          <Button onClick={() => void xmpp.disconnect()}>断开</Button>
        ) : (
          <Button type="primary" onClick={() => void connect()} disabled={!sessionKey}>
            连接 XMPP
          </Button>
        )}
        <Tag color={xmpp.status === 'online' ? 'success' : xmpp.status === 'error' ? 'error' : 'default'}>
          {xmpp.status === 'online'
            ? `在线：${xmpp.address}`
            : xmpp.status === 'connecting'
              ? '认证中'
              : xmpp.status === 'error'
                ? '连接失败'
                : '未连接'}
        </Tag>
      </Space>
      {xmpp.error && <Alert type="warning" showIcon title={xmpp.error} />}
      <Input
        aria-label="接收方 JID"
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
        placeholder="接收方 JID：name@example.com"
      />
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label="XMPP 消息"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={() => void send()}
          maxLength={4096}
          placeholder="输入要加密发送的消息"
        />
        <Button type="primary" disabled={xmpp.status !== 'online' || !sessionKey} onClick={() => void send()}>
          加密发送
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
        setApiError('XMPP 已断开，但示例服务的临时会话注销失败；凭据仍会在服务端过期')
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
      setPassword('')
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
        使用 Chat Platform 的 REST 接口换取临时 XMPP 凭据，再通过服务端返回的 WebSocket
        地址加入群聊房间。公开演示账号来自该项目文档；不会保存登录密码或临时凭据。
      </Text>
      <Input
        aria-label="Chat Platform API 地址"
        value={apiAddress}
        onChange={(event) => setApiAddress(event.target.value)}
        disabled={connected || busy}
      />
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <Input
            aria-label="Chat Platform 用户名"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={connected || busy}
            autoComplete="username"
          />
        </Col>
        <Col xs={24} md={12}>
          <Input.Password
            aria-label="Chat Platform 密码"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={connected || busy}
            autoComplete="current-password"
          />
        </Col>
      </Row>
      <Space wrap>
        {connected || xmpp.status === 'connecting' ? (
          <Button onClick={() => void disconnect()} disabled={busy}>
            断开并注销临时会话
          </Button>
        ) : (
          <Button type="primary" onClick={() => void connect()} loading={busy} disabled={!sessionKey}>
            登录并连接 XMPP
          </Button>
        )}
        <Tag color={connected ? 'success' : xmpp.status === 'error' || apiError ? 'error' : 'default'}>
          {connected ? '已连接' : busy ? '连接中' : apiError || xmpp.status === 'error' ? '连接失败' : '未连接'}
        </Tag>
      </Space>
      {connected && (
        <Text type="secondary" style={{ overflowWrap: 'anywhere' }}>
          JID：{xmpp.address} · WebSocket：{connectionRef.current?.session.websocketUrl}
        </Text>
      )}
      {(apiError || xmpp.error) && <Alert type="warning" showIcon title={apiError || xmpp.error} />}
      {connected && rooms.length === 0 && <Alert type="info" showIcon title="服务端没有可加入的房间" />}
      <Select
        aria-label="XMPP 房间"
        value={roomJid || undefined}
        onChange={(value) => void selectRoom(value)}
        options={rooms.map((room) => ({ label: `${room.name} · ${room.jid}`, value: room.jid }))}
        placeholder="选择 XMPP 房间"
        disabled={!connected || rooms.length === 0}
        style={{ width: '100%' }}
      />
      <Space.Compact style={{ width: '100%' }}>
        <Input
          aria-label="Chat Platform 加密消息"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onPressEnter={() => void send()}
          maxLength={2500}
          placeholder="输入要加密发送的消息"
        />
        <Button type="primary" disabled={!connected || !roomJid || !sessionKey || !draft} onClick={() => void send()}>
          加密发送
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

function XmppChannel({ sessionKey }: { sessionKey: string }) {
  return (
    <Tabs
      destroyOnHidden
      items={[
        {
          key: 'chat-platform',
          label: 'Chat Platform 示例服务',
          children: <ChatPlatformXmppChannel sessionKey={sessionKey} />,
        },
        { key: 'direct', label: '通用 XMPP 直连', children: <DirectXmppChannel sessionKey={sessionKey} /> },
      ]}
    />
  )
}

export default function SecureCommunicationPanel() {
  const [sessionKey, setSessionKey] = useState('')
  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        type="info"
        showIcon
        title="安全通信实验室"
        description="在浏览器中生成 AES-GCM 会话密钥，通过 WebSocket 或 XMPP 传送密文。请使用你有权接入的服务端；页面不会保存密钥、口令或消息。"
      />
      <Card title="会话密钥与本地加解密" size="small">
        <LocalCrypto sessionKey={sessionKey} onKeyChange={setSessionKey} />
      </Card>
      <Card title="实时传输" size="small">
        <Tabs
          destroyOnHidden
          items={[
            { key: 'websocket', label: 'WebSocket', children: <WebSocketChannel sessionKey={sessionKey} /> },
            { key: 'xmpp', label: 'XMPP', children: <XmppChannel sessionKey={sessionKey} /> },
          ]}
        />
      </Card>
    </Space>
  )
}
