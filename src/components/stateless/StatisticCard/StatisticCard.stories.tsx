import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateless/StatisticCard',
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
    items: [
      { title: '活跃用户', value: '1,280', unit: '人', icon: 'book' },
      { title: '完成率', value: '98.2', unit: '%', icon: 'rate' },
    ],
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
