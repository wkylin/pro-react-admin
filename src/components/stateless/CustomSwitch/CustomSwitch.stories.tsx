import type { Meta, StoryObj } from '@storybook/react-vite'
import { Route } from 'react-router-dom'
import Component from './index'

const meta = {
  title: 'Components/Stateless/CustomSwitch',
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
    children: <Route path="/" element={<div style={{ padding: 24 }}>Pro React Admin 5.0 · 当前源码示例</div>} />,
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
