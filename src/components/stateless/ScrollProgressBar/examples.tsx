// 使用示例
import React, { useRef } from 'react'
import ScrollProgressBar, { ScrollArea } from '@stateless/ScrollProgressBar'

// 示例1：使用 ScrollArea 包装器（推荐）
export const ExampleWithScrollArea = () => {
  return (
    <ScrollArea height={4} color="#ff6b6b" className="h-96 rounded-lg border">
      <div className="space-y-4 p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="h-16 rounded bg-gray-100 p-4">
            内容块 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

// 示例2：直接使用 ScrollProgressBar
export const ExampleWithDirectUsage = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollContainer, setScrollContainer] = React.useState<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      setScrollContainer(scrollRef.current)
    }
  }, [])

  return (
    <div ref={scrollRef} className="relative h-96 overflow-auto rounded-lg border">
      <ScrollProgressBar
        container={scrollContainer}
        position="relative"
        height={4}
        color="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      />
      <div className="space-y-4 p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="h-16 rounded bg-gray-100 p-4">
            内容块 {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

// 示例5：粘性定位进度条
export const ExampleStickyPosition = () => {
  return (
    <div style={{ height: '400px', border: '1px solid #ccc', overflow: 'hidden' }}>
      <ScrollProgressBar position="sticky" height={4} color="#FF9800" />
      <div style={{ padding: '20px', height: '600px', overflow: 'auto' }}>
        <h3>粘性定位进度条示例</h3>
        <p>进度条使用 position: sticky，会在滚动时固定在顶部。</p>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} style={{ margin: '10px 0' }}>
            内容行 {i + 1} - 当你滚动这个区域时，进度条会粘在顶部。
          </p>
        ))}
      </div>
    </div>
  )
}
