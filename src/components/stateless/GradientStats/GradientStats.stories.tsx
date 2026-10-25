import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/GradientStats',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { items: ['12 个公共组件', '5 个项目', 'v5.0.0'] },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
