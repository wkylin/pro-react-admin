import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'Components/Stateless/AnimBackground',
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
    children: [
      <button key="a" data-id="a" style={{ padding: 16 }}>
        概览
      </button>,
      <button key="b" data-id="b" style={{ padding: 16 }}>
        设置
      </button>,
    ],
    defaultValue: 'a',
    className: 'rounded bg-blue-100',
    onValueChange: fn(),
    transition: { duration: 0.2 },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
