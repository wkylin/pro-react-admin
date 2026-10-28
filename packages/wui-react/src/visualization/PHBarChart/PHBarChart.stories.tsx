import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/PHBarChart',
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
    ranges: ['Sample A', 'Sample B', 'Sample C'].map((name) => ({
      name,
      values: Array.from({ length: 15 }, (_, i) => i),
    })),
    markers: [{ value: 7, label: 'Neutral', color: 'red' }],
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
