import React, { useEffect, useRef } from 'react'

export default function AutoScrollSection ({ messages, height = 200, style, renderItem }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    section.scrollTop = section.scrollHeight
  }, [messages])

  return (
    <section
      ref={sectionRef}
      style={{
        height,
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: 8,
        ...style
      }}
    >
      {messages?.map((msg, idx) => (
        <div key={idx}>{renderItem ? renderItem(msg, idx) : msg}</div>
      ))}
    </section>
  )
}
