import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ScrollArea } from './index'

const meta = {
  title: 'Shared/ScrollProgressBar',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '进度条吸附在本区域顶部，仅跟踪区域内部滚动。顶部进度为 0，滚动到底部达到 100%；内容无需滚动时保持 0。',
      },
    },
  },
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
