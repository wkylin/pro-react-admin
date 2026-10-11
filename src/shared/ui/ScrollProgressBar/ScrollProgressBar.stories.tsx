import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ScrollArea } from './index'

const meta = {
  title: 'Shared/ScrollProgressBar',
  component: ScrollArea,
  tags: ['autodocs'],
  args: {
    style: { height: 360, border: '1px solid #d9d9d9' },
    height: 4,
    color: '#1677ff',
    children: (
      <div style={{ padding: 24 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i}>内容块 {i + 1}：拖动滚动条查看进度变化。</p>
        ))}
      </div>
    ),
  },
} satisfies Meta<typeof ScrollArea>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Gradient: Story = { args: { color: 'linear-gradient(90deg, #1677ff, #722ed1)' } }
export const Empty: Story = { args: { children: <p>内容无需滚动时进度保持为零。</p> } }
