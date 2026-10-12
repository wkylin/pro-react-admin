import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/MeshGradientBackground',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
