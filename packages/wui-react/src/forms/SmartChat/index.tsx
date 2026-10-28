import { isValidElement, useEffect, useRef, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import { useClipboard } from '../useClipboard'
import styles from './index.module.less'
export type ChatRole = 'assistant' | 'user' | 'system'
export type ChatMessageStatus = 'done' | 'streaming' | 'error'
export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  reasoning: string
  status: ChatMessageStatus
  createdAt: string
}
export type ChatMessageInput = Partial<ChatMessage>
export type ChatStreamEvent = { type: string; timestamp: string } & Record<string, unknown>
export interface ChatRequest {
  input: string
  messages: ChatMessage[]
  systemPrompt: string
}
export interface ChatResponse {
  content: string
  reasoning: string
  done: boolean
}
export interface SmartChatLabels {
  ready: string
  streaming: string
  empty: string
  user: string
  assistant: string
  system: string
  copy: string
  copied: string
  composer: string
  shortcut: string
  requestError: string
  responseError: string
}
export interface SmartChatProps {
  apiUrl: string
  className?: string
  headers?: Record<string, string>
  method?: string
  initialMessages?: ChatMessageInput[]
  placeholder?: string
  requestOptions?: RequestInit
  buildRequestBody?: (input: ChatRequest) => unknown
  requestTransformer?: (request: RequestInit, body: unknown) => RequestInit
  systemPrompt?: string
  welcomeTitle?: string
  welcomeDescription?: string
  thoughtProcessLabel?: string
  submitLabel?: string
  stopLabel?: string
  labels?: Partial<SmartChatLabels>
  disabled?: boolean
  fetcher?: (url: string, request?: RequestInit, body?: unknown) => Response | Promise<Response>
  onStreamEvent?: (event: ChatStreamEvent) => void
  onMessagesChange?: (messages: ChatMessage[]) => void
  onError?: (error: unknown) => void
}
const EMPTY_MESSAGES: ChatMessageInput[] = []
const LABELS: SmartChatLabels = {
  ready: 'Ready',
  streaming: 'Streaming',
  empty: 'Send a message to start a conversation.',
  user: 'User',
  assistant: 'Assistant',
  system: 'System',
  copy: 'Copy',
  copied: 'Copied',
  composer: 'Message',
  shortcut: 'Ctrl/Cmd + Enter to send',
  requestError: 'Request failed',
  responseError: 'Response interrupted',
}
type JsonRecord = Record<string, unknown>

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null
}

function createMessage(message: ChatMessageInput): ChatMessage {
  return {
    id: message.id || `${message.role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role: message.role || 'assistant',
    content: message.content || '',
    reasoning: message.reasoning || '',
    status: message.status || 'done',
    createdAt: message.createdAt || new Date().toISOString(),
  }
}

function extractText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item
        if (!isJsonRecord(item)) return ''
        if (item.type === 'text' || item.type === 'input_text') return extractText(item.text)
        if (typeof item.text === 'string') return item.text
        return ''
      })
      .join('')
  }
  return ''
}

function splitThinkContent(source = ''): { content: string; reasoning: string } {
  if (!source) return { content: '', reasoning: '' }

  const reasoningParts: string[] = []
  const content = source.replace(/<think>([\s\S]*?)<\/think>/gi, (_, thought) => {
    reasoningParts.push(thought.trim())
    return ''
  })

  return {
    content,
    reasoning: reasoningParts.join('\n\n').trim(),
  }
}

function normalizeDelta(payload: unknown): ChatResponse {
  if (!payload) return { content: '', reasoning: '', done: false }
  if (payload === '[DONE]') return { content: '', reasoning: '', done: true }

  if (typeof payload === 'string') {
    const thinkSplit = splitThinkContent(payload)
    return {
      content: thinkSplit.content || payload,
      reasoning: thinkSplit.reasoning,
      done: false,
    }
  }

  const payloadRecord = isJsonRecord(payload) ? payload : {}
  const choices = Array.isArray(payloadRecord.choices) ? payloadRecord.choices : []
  const choice = isJsonRecord(choices[0]) ? choices[0] : {}
  const choiceMessage = isJsonRecord(choice.message) ? choice.message : {}
  const delta = isJsonRecord(choice.delta) ? choice.delta : choiceMessage
  const directContent =
    extractText(delta.content) ||
    extractText(choiceMessage.content) ||
    extractText(payloadRecord.content) ||
    extractText(payloadRecord.answer) ||
    ''
  const directReasoning =
    extractText(delta.reasoning_content) ||
    extractText(delta.reasoning) ||
    extractText(choiceMessage.reasoning_content) ||
    extractText(choiceMessage.reasoning) ||
    extractText(payloadRecord.reasoning) ||
    extractText(payloadRecord.thought) ||
    ''

  const thinkSplit = splitThinkContent(directContent)

  return {
    content: thinkSplit.content || directContent,
    reasoning: [directReasoning, thinkSplit.reasoning].filter(Boolean).join('\n'),
    done: Boolean(choice.finish_reason) || payloadRecord.done === true,
  }
}

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children)
  return ''
}
function MarkdownCodeBlock({ children, labels }: { children?: ReactNode; labels: SmartChatLabels }) {
  const { copied, copy } = useClipboard()
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <button
          className={styles.codeCopyButton}
          type="button"
          onClick={() => void copy(nodeText(children).replace(/\n$/, ''))}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      <pre className={styles.preBlock}>{children}</pre>
    </div>
  )
}

function MessageContent({
  message,
  thoughtProcessLabel,
  labels,
}: {
  message: ChatMessage
  thoughtProcessLabel: string
  labels: SmartChatLabels
}) {
  const { copied, copy } = useClipboard()
  return (
    <article className={`${styles.messageCard} ${styles[`role-${message.role}`]}`}>
      <div className={styles.messageMeta}>
        <span>
          {labels[message.role]} {message.status === 'streaming' && labels.streaming}
        </span>
        <button
          className={styles.messageCopyButton}
          type="button"
          onClick={() => void copy([message.reasoning, message.content].filter(Boolean).join('\n\n'))}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      {message.reasoning && (
        <details className={styles.thoughtPanel}>
          <summary>{thoughtProcessLabel}</summary>
          <div className={styles.thoughtBody}>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{message.reasoning}</ReactMarkdown>
          </div>
        </details>
      )}
      <div className={styles.messageContent}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
          components={{ pre: ({ children }) => <MarkdownCodeBlock labels={labels}>{children}</MarkdownCodeBlock> }}
        >
          {message.content || (message.status === 'streaming' ? '…' : '')}
        </ReactMarkdown>
      </div>
    </article>
  )
}
export default function SmartChat({
  apiUrl,
  className = '',
  headers,
  method = 'POST',
  initialMessages = EMPTY_MESSAGES,
  placeholder = 'Write a message',
  requestOptions,
  buildRequestBody,
  requestTransformer,
  systemPrompt = '',
  welcomeTitle = 'Chat',
  welcomeDescription,
  thoughtProcessLabel = 'Thought process',
  submitLabel = 'Send',
  stopLabel = 'Stop',
  labels,
  disabled = false,
  fetcher,
  onStreamEvent,
  onMessagesChange,
  onError,
}: SmartChatProps) {
  const text = { ...LABELS, ...labels }
  const [messages, setMessages] = useState(() => initialMessages.map(createMessage))
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const controllerRef = useRef<AbortController | null>(null)
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const mounted = useRef(false)
  const listRef = useRef<HTMLDivElement>(null)
  const cancel = () => {
    controllerRef.current?.abort()
    controllerRef.current = null
    const reader = readerRef.current
    readerRef.current = null
    if (reader) void reader.cancel().catch(() => {})
  }
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      cancel()
    }
  }, [])
  useEffect(() => {
    cancel()
    setStreaming(false)
    setMessages(initialMessages.map(createMessage))
  }, [initialMessages])
  useEffect(() => {
    onMessagesChange?.(messages)
  }, [messages, onMessagesChange])
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])
  const stop = () => {
    cancel()
    setStreaming(false)
    setMessages((previous) =>
      previous.map((message) => (message.status === 'streaming' ? { ...message, status: 'done' } : message))
    )
    onStreamEvent?.({ type: 'abort', timestamp: new Date().toISOString() })
  }
  const send = async () => {
    const userInput = input.trim()
    if (!userInput || disabled || controllerRef.current) return
    const user = createMessage({ role: 'user', content: userInput })
    const assistant = createMessage({ role: 'assistant', status: 'streaming' })
    const requestMessages = [...messages, user]
    const controller = new AbortController()
    controllerRef.current = controller
    const active = () => mounted.current && controllerRef.current === controller && !controller.signal.aborted
    const emit = (type: string, detail: Record<string, unknown> = {}) => {
      if (active())
        onStreamEvent?.({ type, timestamp: new Date().toISOString(), assistantMessageId: assistant.id, ...detail })
    }
    const update = (patch: Partial<ChatMessage>) => {
      if (active())
        setMessages((previous) =>
          previous.map((message) => (message.id === assistant.id ? { ...message, ...patch } : message))
        )
    }
    setMessages([...requestMessages, assistant])
    setInput('')
    setError('')
    setStreaming(true)
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined
    let removeAbortListener: (() => void) | undefined
    try {
      emit('start', { input: userInput })
      const body = buildRequestBody
        ? buildRequestBody({ input: userInput, messages: requestMessages, systemPrompt })
        : {
            stream: true,
            messages: [
              ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
              ...requestMessages.map(({ role, content }) => ({ role, content })),
            ],
          }
      const requestHeaders = new Headers(requestOptions?.headers)
      if (!requestHeaders.has('Accept')) requestHeaders.set('Accept', 'text/event-stream')
      if (!requestHeaders.has('Content-Type')) requestHeaders.set('Content-Type', 'application/json')
      Object.entries(headers ?? {}).forEach(([key, value]) => requestHeaders.set(key, value))
      const initial: RequestInit = {
        ...requestOptions,
        method,
        headers: requestHeaders,
        body: method.toUpperCase() === 'GET' ? undefined : JSON.stringify(body),
      }
      const transformed = requestTransformer ? requestTransformer(initial, body) : initial
      // Preserve external cancellation while always retaining the component's own cancellation signal.
      const externalSignal = transformed.signal ?? requestOptions?.signal
      if (externalSignal) {
        const abort = () => {
          controller.abort()
          if (reader) void reader.cancel().catch(() => {})
          if (mounted.current && controllerRef.current === controller) {
            controllerRef.current = null
            setStreaming(false)
            setMessages((previous) =>
              previous.map((message) => (message.id === assistant.id ? { ...message, status: 'done' } : message))
            )
          }
        }
        if (externalSignal.aborted) abort()
        else {
          externalSignal.addEventListener('abort', abort, { once: true })
          removeAbortListener = () => externalSignal.removeEventListener('abort', abort)
        }
      }
      if (!active()) return
      const response = await (fetcher ?? fetch)(apiUrl, { ...transformed, signal: controller.signal }, body)
      if (!active()) {
        await response.body?.cancel()
        return
      }
      if (!response.ok) throw new Error((await response.text()) || response.statusText || text.requestError)
      if (!response.body) throw new Error(text.responseError)
      reader = response.body.getReader()
      readerRef.current = reader
      const decoder = new TextDecoder()
      let buffer = '',
        content = '',
        reasoning = '',
        finished = false
      const consume = (block: string) => {
        if (finished || !active()) return
        const data = block
          .split('\n')
          .filter((line) => line.startsWith('data:'))
          .map((line) => line.slice(5).replace(/^ /, ''))
          .join('\n')
        if (!data) return
        let payload: unknown = data
        try {
          payload = JSON.parse(data)
        } catch {
          /* Plain-text SSE payloads are supported. */
        }
        const delta = normalizeDelta(payload)
        content += delta.content
        reasoning += delta.reasoning
        finished = delta.done
        update({ content, reasoning, status: finished ? 'done' : 'streaming' })
        emit('chunk', {
          contentSize: delta.content.length,
          reasoningSize: delta.reasoning.length,
          done: delta.done,
          raw: payload,
        })
      }
      while (active() && !finished) {
        const result = await reader.read()
        if (!active()) break
        buffer += decoder.decode(result.value, { stream: !result.done })
        // Normalize CRLF after decoding so boundaries split across chunks remain intact.
        buffer = buffer.replace(/\r\n/g, '\n')
        let boundary: number
        while (!finished && (boundary = buffer.indexOf('\n\n')) !== -1) {
          consume(buffer.slice(0, boundary))
          buffer = buffer.slice(boundary + 2)
        }
        if (result.done) {
          if (buffer.trim()) consume(buffer)
          break
        }
      }
      if (active()) {
        update({ status: 'done' })
        emit('done')
      }
    } catch (caught) {
      if (active()) {
        const message = caught instanceof Error ? caught.message : text.responseError
        setError(message)
        update({ status: 'error' })
        emit('error', { message })
        onError?.(caught)
      }
    } finally {
      removeAbortListener?.()
      if (reader) {
        try {
          await reader.cancel()
        } catch {
          /* The source may already be closed. */
        } finally {
          reader.releaseLock()
        }
      }
      if (readerRef.current === reader) readerRef.current = null
      if (controllerRef.current === controller) {
        controllerRef.current = null
        if (mounted.current) setStreaming(false)
      }
    }
  }
  return (
    <section className={`${styles.smartChat} ${className}`}>
      <header className={styles.header}>
        <div>
          <h3>{welcomeTitle}</h3>
          {welcomeDescription && <p>{welcomeDescription}</p>}
        </div>
        <span role="status">{streaming ? text.streaming : text.ready}</span>
        {streaming && (
          <button type="button" onClick={stop}>
            {stopLabel}
          </button>
        )}
      </header>
      {error && <p role="alert">{error}</p>}
      <div className={styles.messageList} ref={listRef} role="log" aria-label={welcomeTitle} aria-live="polite">
        {!messages.length && <p>{text.empty}</p>}
        {messages.map((message) => (
          <MessageContent key={message.id} message={message} thoughtProcessLabel={thoughtProcessLabel} labels={text} />
        ))}
      </div>
      <div className={styles.composer}>
        <textarea
          className={styles.textarea}
          aria-label={text.composer}
          value={input}
          placeholder={placeholder}
          disabled={disabled || streaming}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (!event.nativeEvent.isComposing && (event.metaKey || event.ctrlKey) && event.key === 'Enter') {
              event.preventDefault()
              void send()
            }
          }}
        />
        <div className={styles.composerFooter}>
          <span>{text.shortcut}</span>
          <button type="button" disabled={disabled || streaming || !input.trim()} onClick={() => void send()}>
            {submitLabel}
          </button>
        </div>
      </div>
    </section>
  )
}
