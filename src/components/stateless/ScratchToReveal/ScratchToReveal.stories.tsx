import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'Components/Stateless/ScratchToReveal',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { width: 320, height: 200, children: <div style={{ padding: 32 }}>刮开后的内容</div>, onComplete: fn() },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
