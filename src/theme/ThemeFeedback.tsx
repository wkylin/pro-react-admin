import { useLayoutEffect } from 'react'
import { App } from 'antd'
import { setMessageInstance } from '@platform/feedback/message'

export default function ThemeFeedback() {
  const { message } = App.useApp()
  useLayoutEffect(() => setMessageInstance(message), [message])
  return null
}
