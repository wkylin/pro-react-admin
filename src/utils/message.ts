import { App } from 'antd'

type MessageKey = string | number
type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading'
type OpenConfig = {
  type: MessageType
  content: string
  key?: MessageKey
  duration?: number
}

// 声明一个变量来保存消息实例
let messageInstance: ReturnType<typeof App.useApp>['message'] | null = null

// 设置消息实例的函数
export const setMessageInstance = (instance: ReturnType<typeof App.useApp>['message']) => {
  messageInstance = instance
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
    if (messageInstance) messageInstance.success(content)
  },
  error: (content: string) => {
    if (!shouldShow(content)) return
    if (messageInstance) messageInstance.error(content)
  },
  warning: (content: string) => {
    if (!shouldShow(content)) return
    if (messageInstance) messageInstance.warning(content)
  },
  info: (content: string) => {
    if (!shouldShow(content)) return
    if (messageInstance) messageInstance.info(content)
  },
  open: ({ type, content, key, duration }: OpenConfig) => {
    if (!messageInstance) return
    // key 存在时通常用于“同一条消息更新”，不做去重
    if (!key && type !== 'loading' && !shouldShow(content)) return
    messageInstance.open({ type, content, key, duration })
  },
  loading: (content: string, key?: MessageKey) => {
    if (!messageInstance) return
    messageInstance.open({ type: 'loading', content, key, duration: 0 })
  },
  destroy: (key?: MessageKey) => {
    if (!messageInstance) return
    messageInstance.destroy(key)
  },
}
