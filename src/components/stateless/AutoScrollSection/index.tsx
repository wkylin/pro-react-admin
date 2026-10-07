import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface AutoScrollSectionProps {
  messages?: ReactNode[]
  height?: CSSProperties['height']
  style?: CSSProperties
  renderItem?: (message: ReactNode, index: number) => ReactNode
}

export default function AutoScrollSection({ messages, height = 200, style, renderItem }: AutoScrollSectionProps) {
  const sectionRef = useRef<HTMLElementTagNameMap['section'] | null>(null)

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
        ...style,
      }}
    >
      {messages?.map((msg, idx) => (
        <div key={idx}>{renderItem ? renderItem(msg, idx) : msg}</div>
      ))}
    </section>
  )
}
