import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/FloatingIcon',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { children: <span style={{ fontSize: 36 }}>⚙</span>, initialX: 0 },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
