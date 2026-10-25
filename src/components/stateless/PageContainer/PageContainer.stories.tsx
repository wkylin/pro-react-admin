import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/PageContainer',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { title: '企业工作台', children: <p>业务内容</p>, footer: <small>Pro React Admin 5.0</small> },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
