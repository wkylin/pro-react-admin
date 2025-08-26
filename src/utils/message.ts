import { App } from 'antd'

// 声明一个变量来保存消息实例
let messageInstance: ReturnType<typeof App.useApp>['message'] | null = null

// 设置消息实例的函数
export const setMessageInstance = (instance: ReturnType<typeof App.useApp>['message']) => {
  messageInstance = instance
}

// 导出一个安全的消息对象
export const showMessage = {
  success: (content: string) => {
    if (messageInstance) messageInstance.success(content)
  },
  error: (content: string) => {
    if (messageInstance) messageInstance.error(content)
  },
  warning: (content: string) => {
    if (messageInstance) messageInstance.warning(content)
  },
  info: (content: string) => {
    if (messageInstance) messageInstance.info(content)
  },
}
