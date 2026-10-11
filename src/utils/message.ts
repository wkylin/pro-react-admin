import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'

type MessageKey = string | number
type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading'
type OpenConfig = {
  type: MessageType
  content: string
  key?: MessageKey
  duration?: number
}

// 声明一个变量来保存消息实例
type AppMessageInstance = ReturnType<typeof App.useApp>['message']

let messageInstance: AppMessageInstance | null = null

// 设置消息实例的函数
export const setMessageInstance = (instance: AppMessageInstance) => {
  messageInstance = instance
}

const noopMessage = (() => undefined) as unknown as ReturnType<MessageInstance['success']>

/**
 * App-context message API for code that cannot call App.useApp directly.
 * Unlike Ant Design's static message functions, this delegates to the App instance
 * registered by ThemeIndex.
 */
export const message: MessageInstance = {
  success: (...args) => messageInstance?.success(...args) ?? noopMessage,
  error: (...args) => messageInstance?.error(...args) ?? noopMessage,
  warning: (...args) => messageInstance?.warning(...args) ?? noopMessage,
  info: (...args) => messageInstance?.info(...args) ?? noopMessage,
  loading: (...args) => messageInstance?.loading(...args) ?? noopMessage,
  open: (args) => messageInstance?.open(args) ?? noopMessage,
  destroy: (key) => messageInstance?.destroy(key),
}

// 简单去重：记录上一次显示的消息内容与时间，短时间内相同内容不再重复显示
const DEDUPE_WINDOW_MS = 2000
let lastMessageText: string | null = null
let lastMessageTime = 0

const shouldShow = (text: string) => {
  const now = Date.now()
  if (text && lastMessageText === text && now - lastMessageTime < DEDUPE_WINDOW_MS) {
    return false
  }
  lastMessageText = text
  lastMessageTime = now
  return true
}

// 导出一个安全的消息对象（带去重）
export const showMessage = {
  success: (content: string) => {
    if (!shouldShow(content)) return
    message.success(content)
  },
  error: (content: string) => {
    if (!shouldShow(content)) return
    message.error(content)
  },
  warning: (content: string) => {
    if (!shouldShow(content)) return
    message.warning(content)
  },
  info: (content: string) => {
    if (!shouldShow(content)) return
    message.info(content)
  },
  open: ({ type, content, key, duration }: OpenConfig) => {
    // key 存在时通常用于“同一条消息更新”，不做去重
    if (!key && type !== 'loading' && !shouldShow(content)) return
    message.open({ type, content, key, duration })
  },
  loading: (content: string, key?: MessageKey) => {
    message.open({ type: 'loading', content, key, duration: 0 })
  },
  destroy: (key?: MessageKey) => {
    message.destroy(key)
  },
}
