import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'WUI/Forms/RadioInput',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { text: '审批通过', checked: true, type: 'radio' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checkbox: Story = {
  args: { text: '已阅读并同意使用条款', checked: true, type: 'checkbox' },
}
