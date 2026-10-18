import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateless/TypedText',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { children: 'Pro React Admin 5.0', delay: 80 },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
