import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'WUI/Components/ScrollLayout',
  component: Component,
  decorators: [
    (Story) => (
      <div style={{ height: 420, overflow: 'auto', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    header: <h3>工作台导航</h3>,
    footer: <p>Pro React Admin 6.0</p>,
    children: <div style={{ height: 900, padding: 24 }}>滚动内容区域，头部和底部保持固定。</div>,
  },
} satisfies Meta<typeof Component>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const ContentOnly: Story = { args: { header: undefined, footer: undefined } }
