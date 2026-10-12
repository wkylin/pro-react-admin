import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/PieNestCharts',
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
    height: '320px',
    eOptions: {
      options: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '产品', value: 45 },
              { name: '服务', value: 35 },
              { name: '其他', value: 20 },
            ],
          },
          {
            type: 'pie',
            data: [
              { name: '平台', value: 25 },
              { name: '应用', value: 20 },
              { name: '咨询', value: 15 },
              { name: '支持', value: 20 },
              { name: '其他', value: 20 },
            ],
          },
        ],
      },
    },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
