import type { Meta, StoryObj } from '@storybook/react-vite'
import FixTabPanel from './index'

const meta = {
  title: 'Shared/FixTabPanel',
  component: FixTabPanel,
  tags: ['autodocs'],
  args: {
    style: { height: 360, border: '1px solid #d9d9d9' },
    showScrollProgress: true,
    children: (
      <div style={{ padding: 24 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i}>内容块 {i + 1}：滚动查看进度和返回顶部。</p>
        ))}
      </div>
    ),
  },
} satisfies Meta<typeof FixTabPanel>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const CustomProgress: Story = {
  args: { scrollProgressProps: { height: 4, color: 'linear-gradient(90deg, #1677ff, #722ed1)' } },
}
export const WithoutProgress: Story = { args: { showScrollProgress: false } }
