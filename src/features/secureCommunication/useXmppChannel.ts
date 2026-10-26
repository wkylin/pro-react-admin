import { useCallback, useEffect, useRef, useState } from 'react'
import type { XmppClient, XmppElement } from '@xmpp/client'
import { decryptMessage, encryptMessage, parseEncryptedMessage, validateSocketUrl } from './crypto'
import { loadXmppClient } from './xmppLoader'

export type XmppStatus = 'disconnected' | 'connecting' | 'online' | 'error'

export interface XmppConnection {
  service: string
  jid: string
  password: string
  authUsername?: string
  resource?: string
}

export interface IncomingXmppMessage {
  direction: '发送' | '接收'
  from: string
  text: string
  receivedAt: number
}

const CONNECT_TIMEOUT_MS = 12_000

export function useXmppChannel(sessionKey: string, loadClient: typeof loadXmppClient = loadXmppClient) {
  const [status, setStatus] = useState<XmppStatus>('disconnected')
  const [error, setError] = useState('')
  const [address, setAddress] = useState('')
  const [messages, setMessages] = useState<IncomingXmppMessage[]>([])
  const clientRef = useRef<XmppClient | null>(null)
  const generationRef = useRef(0)
  const connectingRef = useRef(false)
  const keyRef = useRef(sessionKey)
  const roomRef = useRef('')
  const mountedRef = useRef(true)
  keyRef.current = sessionKey

  const disconnect = useCallback(async () => {
    generationRef.current += 1
    roomRef.current = ''
    const current = clientRef.current
    clientRef.current = null
    if (mountedRef.current) {
      setStatus('disconnected')
      setAddress('')
    }
    if (current) {
      current.reconnect.stop()
      try {
        await current.stop()
      } catch {
        // The connection may already be closed.
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      void disconnect()
    }
  }, [disconnect])

  const connect = useCallback(
    async ({ service, jid, password, authUsername, resource }: XmppConnection) => {
      if (connectingRef.current || status === 'connecting' || status === 'online') return
      connectingRef.current = true
      const beforeImport = generationRef.current
      try {
        const serviceUrl = validateSocketUrl(service)
        if (!password) throw new Error('请输入 XMPP 口令')
        const library = await loadClient()
        if (!mountedRef.current || generationRef.current !== beforeImport) return
        const account = library.jid(jid.trim())
        if (!account.local || !account.domain || jid.includes('/'))
          throw new Error('请输入完整的 XMPP JID，例如 name@example.com')

        const previousStop = disconnect()
        const afterDisconnect = generationRef.current
        await previousStop
        if (!mountedRef.current || generationRef.current !== afterDisconnect) return
        const generation = ++generationRef.current
        setStatus('connecting')
        setError('')
        const credentials = authUsername
          ? async (
              authenticate: (
                credentials: { username: string; password: string },
                mechanism: string
              ) => Promise<unknown>,
              mechanisms: string[]
            ) => {
              if (!mechanisms.includes('PLAIN')) throw new Error('Chat Platform 未提供 PLAIN 认证')
              await authenticate({ username: authUsername, password }, 'PLAIN')
            }
          : undefined
        const instance = library.client({
          service: serviceUrl,
          domain: account.domain,
          resource: resource || 'pro-react-admin',
          ...(credentials ? { credentials } : { username: account.local, password }),
        })
        if (!authUsername) instance.reconnect.stop()
        clientRef.current = instance
        const isCurrent = () =>
          mountedRef.current && generationRef.current === generation && clientRef.current === instance

        instance.on('online', (onlineAddress: { toString(): string }) => {
          if (!isCurrent()) return
          setAddress(onlineAddress.toString())
          setError('')
          setStatus('online')
          void instance.send(library.xml('presence')).catch((cause: unknown) => {
            if (isCurrent()) setError(cause instanceof Error ? cause.message : '发送 XMPP 在线状态失败')
          })
          if (roomRef.current) {
            void instance
              .send(
                library.xml(
                  'presence',
                  { to: `${roomRef.current}/pro-react-admin` },
                  library.xml('x', { xmlns: 'http://jabber.org/protocol/muc' })
                )
              )
              .catch((cause: unknown) => {
                if (isCurrent()) setError(cause instanceof Error ? cause.message : '重新加入 XMPP 房间失败')
              })
          }
        })
        instance.on('stanza', (stanza: XmppElement) => {
          if (!isCurrent() || !stanza.is('message')) return
          if (roomRef.current && stanza.attrs.from?.split('/')[0] !== roomRef.current) return
          const body = stanza.getChildText('body')
          if (!body || body.length > 12_000) return
          if (roomRef.current) {
            try {
              parseEncryptedMessage(body)
            } catch {
              return
            }
          }
          void decryptMessage(body, keyRef.current)
            .then((text) => {
              if (!isCurrent()) return
              setMessages((previous) =>
                [
                  ...previous,
                  { direction: '接收' as const, from: stanza.attrs.from ?? '未知发送方', text, receivedAt: Date.now() },
                ].slice(-40)
              )
            })
            .catch(() => {
              if (isCurrent()) setError('收到无法用当前会话密钥解密的 XMPP 消息')
            })
        })
        instance.on('offline', () => {
          if (isCurrent()) setStatus(authUsername ? 'connecting' : 'disconnected')
        })
        instance.on('error', (cause: unknown) => {
          if (!isCurrent()) return
          setError(cause instanceof Error ? cause.message : 'XMPP 连接失败')
          setStatus('error')
        })

        let timer: ReturnType<typeof setTimeout> | undefined
        try {
          await Promise.race([
            instance.start(),
            new Promise<never>((_, reject) => {
              timer = setTimeout(() => reject(new Error('XMPP 连接或认证超时')), CONNECT_TIMEOUT_MS)
            }),
          ])
          if (!isCurrent()) return
          if (instance.status !== 'online') throw new Error('XMPP 连接未完成认证')
          setStatus('online')
        } catch (cause) {
          if (isCurrent()) {
            setError(cause instanceof Error ? cause.message : 'XMPP 连接失败')
            setStatus('error')
            await disconnect()
            if (mountedRef.current) setStatus('error')
          }
          throw cause
        } finally {
          if (timer) clearTimeout(timer)
        }
      } finally {
        connectingRef.current = false
      }
    },
    [disconnect, loadClient, status]
  )

  const joinRoom = useCallback(
    async (roomJid: string) => {
      const instance = clientRef.current
      if (!instance || instance.status !== 'online') throw new Error('XMPP 尚未连接')
      const library = await loadClient()
      const room = library.jid(roomJid.trim())
      if (!room.local || !room.domain || roomJid.includes('/')) throw new Error('房间 JID 无效')
      const nextRoom = room.toString()
      const previousRoom = roomRef.current
      if (previousRoom === nextRoom) return
      if (previousRoom)
        await instance.send(library.xml('presence', { to: `${previousRoom}/pro-react-admin`, type: 'unavailable' }))
      await instance.send(
        library.xml(
          'presence',
          { to: `${nextRoom}/pro-react-admin` },
          library.xml('x', { xmlns: 'http://jabber.org/protocol/muc' })
        )
      )
      roomRef.current = nextRoom
      setMessages([])
    },
    [loadClient]
  )

  const send = useCallback(
    async (to: string, text: string) => {
      const instance = clientRef.current
      if (!instance || instance.status !== 'online') throw new Error('XMPP 尚未连接')
      const library = await loadClient()
      const recipient = library.jid(to.trim())
      if (!recipient.local || !recipient.domain) throw new Error('请输入完整的接收方 JID')
      const envelope = await encryptMessage(text, keyRef.current)
      if (clientRef.current !== instance || instance.status !== 'online') throw new Error('XMPP 连接已断开')
      await instance.send(
        library.xml(
          'message',
          { to: recipient.toString(), type: 'chat' },
          library.xml('body', {}, JSON.stringify(envelope))
        )
      )
      if (clientRef.current === instance && mountedRef.current)
        setMessages((previous) =>
          [...previous, { direction: '发送' as const, from: recipient.toString(), text, receivedAt: Date.now() }].slice(
            -40
          )
        )
    },
    [loadClient]
  )

  const sendRoom = useCallback(
    async (text: string) => {
      const instance = clientRef.current
      const room = roomRef.current
      if (!instance || instance.status !== 'online' || !room) throw new Error('请先连接并选择房间')
      const library = await loadClient()
      const envelope = await encryptMessage(text, keyRef.current)
      const body = JSON.stringify(envelope)
      if (body.length > 4000) throw new Error('密文超过示例服务的 4000 字符限制，请缩短消息')
      if (clientRef.current !== instance || roomRef.current !== room || instance.status !== 'online')
        throw new Error('XMPP 连接或房间已变更')
      await instance.send(library.xml('message', { to: room, type: 'groupchat' }, library.xml('body', {}, body)))
    },
    [loadClient]
  )

  return { status, error, address, messages, connect, disconnect, send, joinRoom, sendRoom }
}
