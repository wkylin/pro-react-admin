import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { ComponentProps } from 'react'
import Component from './index'

function StarsDemo({ compact = false, ...args }: ComponentProps<typeof Component> & { compact?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        width: compact ? 320 : '100%',
        maxWidth: '100%',
        height: 360,
        padding: 32,
        overflow: 'hidden',
        borderRadius: 12,
        background: '#080f24',
        color: '#e2e8f0',
      }}
    >
      <h2 style={{ margin: '0 0 12px', fontSize: 24, color: 'inherit' }}>流星划过夜空</h2>
      <p style={{ margin: 0, color: '#94a3b8' }}>流星会自动从此区域边缘划入，无需移动鼠标。</p>
      <Component {...args} />
    </div>
  )
}

const meta = {
  title: 'Components/Stateless/ShootingStars',
  component: Component,
  tags: ['autodocs'],
  render: (args) => <StarsDemo {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          'SVG 流星背景。放在具有明确尺寸且 position: relative 的容器中，动画按容器尺寸生成并随尺寸变化调整。示例使用深色背景、较长尾迹和较短间隔，便于观察。速度单位为每个 60Hz 帧的像素数，间隔单位为毫秒。',
      },
    },
  },
  argTypes: {
    starColor: { control: 'color' },
    trailColor: { control: 'color' },
    minSpeed: { control: { type: 'range', min: 1, max: 30, step: 1 } },
    maxSpeed: { control: { type: 'range', min: 1, max: 30, step: 1 } },
    minDelay: { control: { type: 'number', min: 16, step: 100 } },
    maxDelay: { control: { type: 'number', min: 16, step: 100 } },
    starWidth: { control: { type: 'range', min: 10, max: 100, step: 1 } },
    starHeight: { control: { type: 'range', min: 1, max: 6, step: 1 } },
  },
  args: {
    minSpeed: 6,
    maxSpeed: 12,
    minDelay: 500,
    maxDelay: 1000,
    starWidth: 60,
    starHeight: 2,
    starColor: '#e0f2fe',
    trailColor: '#38bdf8',
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WarmColors: Story = {
  args: { starColor: '#fef3c7', trailColor: '#fb923c' },
}

export const Compact: Story = {
  render: (args) => <StarsDemo {...args} compact />,
}
