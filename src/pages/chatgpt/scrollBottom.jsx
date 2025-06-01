import React, { useEffect, useRef } from 'react'

function AutoScrollSection({ messages }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    // 滚动到底部
    section.scrollTop = section.scrollHeight
  }, [messages]) // 只要messages变动，就执行

  return (
    <section
      ref={sectionRef}
      style={{
        height: 200,
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: 8,
      }}
    >
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </section>
  )
}

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
