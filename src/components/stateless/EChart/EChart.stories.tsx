import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/EChart',
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
    option: {
      xAxis: { type: 'category', data: ['默认', '企业', '微前端'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [80, 95, 88] }],
    },
    style: { height: 320, width: '100%' },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
