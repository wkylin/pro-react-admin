import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { useRef, useState, type ComponentProps } from 'react'
import Component from './index'

function TrailDemo({ explicit = false, ...args }: ComponentProps<typeof Component> & { explicit?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [clicks, setClicks] = useState(0)
  return (
    <div ref={ref} style={{ padding: explicit ? 24 : 0 }}>
      <div
        style={{
          position: 'relative',
          height: 360,
          padding: 32,
          overflow: 'hidden',
          borderRadius: 12,
          background: '#0b1020',
          color: '#e2e8f0',
        }}
      >
        <Component {...args} containerRef={explicit ? ref : undefined} />
        <h2 style={{ margin: '0 0 12px', fontSize: 24, color: 'inherit' }}>移动鼠标，绘制彩色轨迹</h2>
        <p style={{ marginBottom: 24, color: '#94a3b8' }}>在此区域移动鼠标；停下或移出后，轨迹和粒子会逐渐消失。</p>
        <button
          type="button"
          onClick={() => setClicks((value) => value + 1)}
          style={{
            padding: '10px 16px',
            border: '1px solid #475569',
            borderRadius: 8,
            background: '#1e293b',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          测试按钮 · 已点击 {clicks} 次
        </button>
      </div>
    </div>
  )
}

const meta = {
  title: 'Components/Stateless/MagicTrail',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Canvas 鼠标轨迹覆盖层。放在 position: relative 的容器中，默认监听父容器；也可通过 containerRef 指定事件所属容器。覆盖层不拦截按钮等交互，colors 支持合法的 CSS 颜色值。',
      },
    },
  },
  argTypes: {
    containerRef: { control: false },
    particleCount: { control: { type: 'range', min: 0, max: 150, step: 1 } },
    trailLength: { control: { type: 'range', min: 2, max: 80, step: 1 } },
    decay: { control: { type: 'range', min: 0.01, max: 0.1, step: 0.01 } },
    smoothing: { control: { type: 'range', min: 0.1, max: 1, step: 0.05 } },
  },
  args: { particleCount: 50, trailLength: 35, decay: 0.03, smoothing: 0.65 },
  render: (args) => <TrailDemo {...args} />,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ExplicitContainer: Story = {
  render: (args) => <TrailDemo {...args} explicit />,
  args: { colors: ['rgb(99, 102, 241)', 'hsl(330, 80%, 60%)', 'gold'] },
  parameters: {
    docs: { description: { story: '事件监听外层 ref，绘制仍以内部 Canvas 为原点，外层 padding 不会造成坐标偏移。' } },
  },
}

export const TrailOnly: Story = {
  args: { particleCount: 0 },
}
