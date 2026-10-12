import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/SkeletonFix',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
