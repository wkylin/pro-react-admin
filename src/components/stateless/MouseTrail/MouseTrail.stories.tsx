import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useRef, type ComponentProps } from 'react'
import LotusImage from '../../../assets/images/he.png'
import SnowImage from '../../../assets/images/xue.png'
import MoonImage from '../../../assets/images/song.png'
import Component from './index'

function MouseTrailPreview(args: ComponentProps<typeof Component>) {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = previewRef.current?.querySelector('section')
      if (!section) return

      const rect = section.getBoundingClientRect()
      for (const [x, y] of [
        [0.22, 0.58],
        [0.5, 0.38],
        [0.78, 0.58],
      ]) {
        section.dispatchEvent(
          new MouseEvent('mousemove', {
            bubbles: true,
            clientX: rect.left + rect.width * x,
            clientY: rect.top + rect.height * y,
          })
        )
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div ref={previewRef}>
      <Component {...args} />
    </div>
  )
}

const meta = {
  title: 'Components/Stateless/MouseTrail',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [LotusImage, SnowImage, MoonImage],
    className: 'h-[400px]!',
    children: (
      <div style={{ height: 320, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        移动鼠标查看图片轨迹
      </div>
    ),
  },
  render: (args) => <MouseTrailPreview {...args} />,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
