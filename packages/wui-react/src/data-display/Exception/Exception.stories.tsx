import type { Meta, StoryObj } from '@storybook/react'
import Compound from './index'
const Component = Compound.Exception404

const meta = {
  title: 'Components/Stateless/Exception',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
