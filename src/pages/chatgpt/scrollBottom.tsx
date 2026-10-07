import React from 'react'
import AutoScrollSection from '@stateless/AutoScrollSection'

// 使用示例
export default function Demo() {
  const [messages, setMessages] = React.useState(['Hello', 'World'])

  // 模拟新消息
  React.useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prev) => [...prev, 'New message ' + Date.now()])
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return <AutoScrollSection messages={messages} />
}
