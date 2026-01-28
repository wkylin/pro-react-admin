import type { Meta, StoryObj } from '@storybook/react-vite'
import AnimatedIcon from './index'
import { Music, Heart, Play } from 'lucide-react'

const meta: Meta<typeof AnimatedIcon> = {
  title: 'Stateless/AnimatedIcon',
  component: AnimatedIcon,
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['spin', 'pulse', 'bounce', 'draw'] },
    mode: { control: { type: 'radio' }, options: ['hover', 'auto', 'idle'] },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AnimatedIcon>

export const Playground: Story = {
  args: {
    variant: 'spin',
    mode: 'hover',
    children: <Music size={24} />,
  },
}

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <AnimatedIcon {...args} variant="spin">
        <Music size={24} />
      </AnimatedIcon>
      <AnimatedIcon {...args} variant="pulse">
        <Heart size={24} />
      </AnimatedIcon>
      <AnimatedIcon {...args} variant="bounce">
        <Play size={24} />
      </AnimatedIcon>
      <AnimatedIcon {...args} variant="draw">
        <Music size={24} />
      </AnimatedIcon>
    </div>
  ),
  args: { mode: 'hover' },
}

export const AutoMode: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <AnimatedIcon {...args} variant="spin" mode="auto">
        <Music size={28} />
      </AnimatedIcon>
      <AnimatedIcon {...args} variant="pulse" mode="auto">
        <Heart size={28} />
      </AnimatedIcon>
      <AnimatedIcon {...args} variant="bounce" mode="auto">
        <Play size={28} />
      </AnimatedIcon>
    </div>
  ),
  args: {},
}
