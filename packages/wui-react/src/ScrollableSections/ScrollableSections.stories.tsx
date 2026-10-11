import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'WUI/Components/ScrollableSections',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 420, overflow: 'auto', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    sections: [
      { title: '概览', content: '企业工作台' },
      { title: '设置', content: '项目与权限设置' },
      { title: '审计', content: '服务端审计记录' },
    ],
  },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const Empty: Story = { args: { sections: [] } }
