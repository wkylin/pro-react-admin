import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'WUI/Forms/DottedStepper',
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
    steps: [
      { label: 'Introduction', content: 'Pro React Admin 6.0' },
      { label: 'Personal information', fields: [{ name: 'name', type: 'text', placeholder: 'Name' }] },
      { label: 'Review', content: 'Review your information.' },
    ],
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
