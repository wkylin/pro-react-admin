import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Component from './index'

const meta = {
  title: 'Components/Stateless/TrapezoidTabs',
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
    tabs: [
      { name: '概览', code: 'overview' },
      { name: '设置', code: 'settings' },
    ],
    defaultActiveTab: 'overview',
    onTabChange: fn(),
    className: '',
    style: {},
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
