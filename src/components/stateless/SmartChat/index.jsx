import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import { Alert, Button, Empty, Space, Tag, Typography } from 'antd'
import { Check, Copy, LoaderCircle, Sparkles, Square } from 'lucide-react'
import 'highlight.js/styles/github.css'

import styles from './index.module.less'

const { Paragraph, Text } = Typography

const DEFAULT_SYSTEM_PROMPT = '你是一名乐于助人的 AI 助手。'

function createMessage(message) {
  return {
    id: message.id || `${message.role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role: message.role || 'assistant',
    content: message.content || '',
    reasoning: message.reasoning || '',
    status: message.status || 'done',
    createdAt: message.createdAt || new Date().toISOString(),
  }
}

function extractText(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item
        if (item?.type === 'text' || item?.type === 'input_text') return item.text || ''
        if (typeof item?.text === 'string') return item.text
        return ''
      })
      .join('')
  }
  return ''
}

function splitThinkContent(source = '') {
  if (!source) return { content: '', reasoning: '' }

  const reasoningParts = []
  const content = source.replace(/<think>([\s\S]*?)<\/think>/gi, (_, thought) => {
    reasoningParts.push(thought.trim())
    return ''
  })

  return {
    content: content.trim(),
    reasoning: reasoningParts.join('\n\n').trim(),
  }
}

function normalizeDelta(payload) {
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

  const choice = payload?.choices?.[0] || {}
  const delta = choice?.delta || choice?.message || {}
  const directContent =
    extractText(delta?.content) ||
    extractText(choice?.message?.content) ||
    extractText(payload?.content) ||
    extractText(payload?.answer) ||
    ''
  const directReasoning =
    extractText(delta?.reasoning_content) ||
    extractText(delta?.reasoning) ||
    extractText(choice?.message?.reasoning_content) ||
    extractText(choice?.message?.reasoning) ||
    extractText(payload?.reasoning) ||
    extractText(payload?.thought) ||
    ''

  const thinkSplit = splitThinkContent(directContent)

  return {
    content: thinkSplit.content || directContent,
    reasoning: [directReasoning, thinkSplit.reasoning].filter(Boolean).join('\n'),
    done: Boolean(choice?.finish_reason) || payload?.done === true,
  }
}

function extractNodeText(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((item) => extractNodeText(item)).join('')
  }

  if (React.isValidElement(node)) {
    return extractNodeText(node.props?.children)
  }

  return ''
}

function MarkdownCodeBlock({ inline, className, children, ...props }) {
  const code = extractNodeText(children).replace(/\n$/, '')
  const [copied, setCopied] = useState(false)
  const language = className?.replace('language-', '') || 'code'

  if (inline) {
    return (
      <code className={styles.inlineCode} {...props}>
        {children}
      </code>
    )
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span>{language}</span>
        <button className={styles.codeCopyButton} type="button" onClick={copyCode}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? '已复制' : '复制代码'}
        </button>
      </div>
      <pre className={styles.preBlock}>
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  )
}

MarkdownCodeBlock.propTypes = {
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

function SmartChat({
  apiUrl,
  className = '',
  headers = {},
  method = 'POST',
  initialMessages = [],
  placeholder = '输入消息后回车，或使用 Ctrl/Cmd + Enter 发送',
  requestOptions = {},
  buildRequestBody,
  requestTransformer,
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  welcomeTitle = '智能会话',
  welcomeDescription = '支持流式响应、Markdown 渲染和思考过程折叠，适合接入后台问答与运营场景。',
  thoughtProcessLabel = 'Thought Process',
  submitLabel = '发送',
  stopLabel = '停止',
  disabled = false,
  fetcher,
  onStreamEvent,
  onMessagesChange,
  onError,
}) {
  const [messages, setMessages] = useState(() => initialMessages.map(createMessage))
  const [inputValue, setInputValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState('')
  const abortRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    setMessages(initialMessages.map(createMessage))
  }, [initialMessages])

  useEffect(() => {
    if (typeof onMessagesChange === 'function') {
      onMessagesChange(messages)
    }
  }, [messages, onMessagesChange])

  useEffect(() => {
    const node = listRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, isStreaming])

  const canSubmit = useMemo(() => !disabled && !isStreaming && inputValue.trim(), [disabled, isStreaming, inputValue])

  const emitStreamEvent = (type, detail = {}) => {
    if (typeof onStreamEvent === 'function') {
      onStreamEvent({
        type,
        timestamp: new Date().toISOString(),
        ...detail,
      })
    }
  }

  const appendAssistantDelta = (messageId, delta) => {
    setMessages((prev) =>
      prev.map((item) => {
        if (item.id !== messageId) return item
        return {
          ...item,
          content: `${item.content}${delta.content || ''}`,
          reasoning: `${item.reasoning}${delta.reasoning || ''}`,
          status: delta.done ? 'done' : 'streaming',
        }
      })
    )
  }

  const finalizeAssistant = (messageId) => {
    setMessages((prev) =>
      prev.map((item) => {
        if (item.id !== messageId) return item
        return { ...item, status: 'done' }
      })
    )
  }

  const buildPayload = (allMessages, rawInput) => {
    if (typeof buildRequestBody === 'function') {
      return buildRequestBody({
        input: rawInput,
        messages: allMessages,
        systemPrompt,
      })
    }

    const requestMessages = [
      { role: 'system', content: systemPrompt || DEFAULT_SYSTEM_PROMPT },
      ...allMessages.map((item) => ({
        role: item.role,
        content: item.content,
      })),
    ]

    return {
      stream: true,
      messages: requestMessages,
    }
  }

  const stopStream = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsStreaming(false)
  }

  const sendMessage = async () => {
    const userContent = inputValue.trim()
    if (!userContent || disabled || isStreaming) return
    const requestId = `stream-${Date.now()}-${Math.random().toString(16).slice(2)}`
    const startedAt = Date.now()

    const userMessage = createMessage({
      role: 'user',
      content: userContent,
    })
    const assistantMessage = createMessage({
      role: 'assistant',
      content: '',
      reasoning: '',
      status: 'streaming',
    })
    const nextMessages = [...messages, userMessage, assistantMessage]
    const controller = new AbortController()
    abortRef.current = controller

    setInputValue('')
    setErrorMessage('')
    setMessages(nextMessages)
    setIsStreaming(true)
    emitStreamEvent('start', {
      requestId,
      input: userContent,
      assistantMessageId: assistantMessage.id,
    })

    try {
      const body = buildPayload(nextMessages, userContent)
      const requestInit = {
        method,
        headers: {
          Accept: 'text/event-stream',
          'Content-Type': 'application/json',
          ...headers,
        },
        body: String(method).toUpperCase() === 'GET' ? undefined : JSON.stringify(body),
        signal: controller.signal,
        ...requestOptions,
      }
      const finalRequest =
        typeof requestTransformer === 'function' ? requestTransformer(requestInit, body) : requestInit
      const response = await (typeof fetcher === 'function'
        ? fetcher(apiUrl, finalRequest, body)
        : fetch(apiUrl, finalRequest))

      if (!response.ok || !response.body) {
        const fallbackText = await response.text()
        throw new Error(fallbackText || response.statusText || '请求失败')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''
      let finished = false

      while (!finished) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const blocks = buffer.split('\n\n')
        buffer = blocks.pop() || ''

        blocks.forEach((block) => {
          const lines = block
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
          const dataLines = lines
            .filter((line) => line.startsWith('data:'))
            .map((line) => line.replace(/^data:\s?/, ''))

          dataLines.forEach((line) => {
            if (!line) return

            let parsed = line
            if (line !== '[DONE]') {
              try {
                parsed = JSON.parse(line)
              } catch {
                parsed = line
              }
            }

            const delta = normalizeDelta(parsed)
            if (delta.content || delta.reasoning) {
              appendAssistantDelta(assistantMessage.id, delta)
              emitStreamEvent('chunk', {
                requestId,
                assistantMessageId: assistantMessage.id,
                contentSize: delta.content.length,
                reasoningSize: delta.reasoning.length,
                done: delta.done,
                raw: parsed,
              })
            }
            if (delta.done) {
              finished = true
              finalizeAssistant(assistantMessage.id)
              emitStreamEvent('done', {
                requestId,
                assistantMessageId: assistantMessage.id,
                durationMs: Date.now() - startedAt,
              })
            }
          })
        })
      }

      finalizeAssistant(assistantMessage.id)
    } catch (error) {
      if (controller.signal.aborted) {
        finalizeAssistant(assistantMessage.id)
        emitStreamEvent('abort', {
          requestId,
          assistantMessageId: assistantMessage.id,
          durationMs: Date.now() - startedAt,
        })
      } else {
        const nextErrorMessage = error instanceof Error ? error.message : '流式响应异常'
        setErrorMessage(nextErrorMessage)
        setMessages((prev) =>
          prev.map((item) => {
            if (item.id !== assistantMessage.id) return item
            return {
              ...item,
              content: item.content || '抱歉，这次响应中断了。',
              status: 'error',
            }
          })
        )
        emitStreamEvent('error', {
          requestId,
          assistantMessageId: assistantMessage.id,
          durationMs: Date.now() - startedAt,
          message: nextErrorMessage,
        })
        if (typeof onError === 'function') onError(error)
      }
    } finally {
      abortRef.current = null
      setIsStreaming(false)
    }
  }

  const handleCopyMessage = async (message) => {
    const payload = [message.reasoning ? `${thoughtProcessLabel}\n${message.reasoning}` : '', message.content]
      .filter(Boolean)
      .join('\n\n')

    try {
      await navigator.clipboard.writeText(payload)
      setCopiedMessageId(message.id)
      window.setTimeout(() => setCopiedMessageId(''), 1600)
    } catch {
      setCopiedMessageId('')
    }
  }

  const onComposerKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <section className={clsx(styles.smartChat, className)}>
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <Sparkles size={16} />
            <h3>{welcomeTitle}</h3>
          </div>
          <Paragraph className={styles.description}>{welcomeDescription}</Paragraph>
        </div>
        <Space size="small">
          <Tag color={isStreaming ? 'processing' : 'default'}>{isStreaming ? 'Streaming' : 'Ready'}</Tag>
          {isStreaming ? (
            <Button onClick={stopStream}>
              <span className={styles.buttonContent}>
                <Square size={14} />
                {stopLabel}
              </span>
            </Button>
          ) : null}
        </Space>
      </div>

      {errorMessage ? <Alert className={styles.alert} type="error" showIcon message={errorMessage} /> : null}

      <div className={styles.messageList} ref={listRef}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <Empty description="输入内容后开始对话，回复会以流式方式逐步返回。" />
          </div>
        ) : null}

        {messages.map((message) => (
          <article key={message.id} className={clsx(styles.messageCard, styles[`role-${message.role}`])}>
            <div className={styles.messageMeta}>
              <Space size="small">
                <Tag color={message.role === 'user' ? 'gold' : 'geekblue'}>
                  {message.role === 'user' ? 'User' : 'Assistant'}
                </Tag>
                <Text type="secondary">{new Date(message.createdAt).toLocaleTimeString()}</Text>
                {message.status === 'streaming' ? (
                  <span className={styles.streaming}>
                    <LoaderCircle className={styles.spin} size={14} />
                    生成中
                  </span>
                ) : null}
              </Space>
              <button className={styles.messageCopyButton} type="button" onClick={() => handleCopyMessage(message)}>
                {copiedMessageId === message.id ? <Check size={14} /> : <Copy size={14} />}
                {copiedMessageId === message.id ? '已复制' : '复制'}
              </button>
            </div>

            {message.reasoning ? (
              <details className={styles.thoughtPanel}>
                <summary>{thoughtProcessLabel}</summary>
                <div className={styles.thoughtBody}>
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{message.reasoning}</ReactMarkdown>
                </div>
              </details>
            ) : null}

            <div className={styles.messageContent}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
                components={{
                  code: MarkdownCodeBlock,
                }}
              >
                {message.content || (message.status === 'streaming' ? '...' : '')}
              </ReactMarkdown>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.composer}>
        <textarea
          className={styles.textarea}
          value={inputValue}
          placeholder={placeholder}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={onComposerKeyDown}
          disabled={disabled || isStreaming}
        />
        <div className={styles.composerFooter}>
          <Text type="secondary">`Ctrl/Cmd + Enter` 发送</Text>
          <Button type="primary" disabled={!canSubmit} onClick={sendMessage}>
            <span className={styles.buttonContent}>{submitLabel}</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

SmartChat.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  headers: PropTypes.object,
  method: PropTypes.string,
  initialMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      role: PropTypes.oneOf(['user', 'assistant', 'system']),
      content: PropTypes.string,
      reasoning: PropTypes.string,
      status: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  placeholder: PropTypes.string,
  requestOptions: PropTypes.object,
  buildRequestBody: PropTypes.func,
  requestTransformer: PropTypes.func,
  systemPrompt: PropTypes.string,
  welcomeTitle: PropTypes.string,
  welcomeDescription: PropTypes.string,
  thoughtProcessLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  stopLabel: PropTypes.string,
  disabled: PropTypes.bool,
  fetcher: PropTypes.func,
  onStreamEvent: PropTypes.func,
  onMessagesChange: PropTypes.func,
  onError: PropTypes.func,
}

export default SmartChat
