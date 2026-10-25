import { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Watermark from './index'

function Demo({ content }: { content: string }) {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (container.current) return Watermark({ container: container.current, content })
  }, [content])
  return (
    <div ref={container} style={{ height: 320, padding: 24 }}>
      命令式水印：切换示例时销毁观察器和 DOM。
    </div>
  )
}
const meta = {
  title: 'Components/Stateless/Watermark',
  component: Demo,
  tags: ['autodocs'],
  args: { content: 'Pro React Admin 5.0' },
} satisfies Meta<typeof Demo>
export default meta
export const Default: StoryObj<typeof meta> = {}
