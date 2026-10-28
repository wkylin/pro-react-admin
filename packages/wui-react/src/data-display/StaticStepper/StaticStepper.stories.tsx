import type { Meta, StoryObj } from '@storybook/react'
import Compound from './index'
const Component = Compound.StaticStep

const meta = {
  title: 'Components/Stateless/StaticStepper',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { step: 1, title: '安装依赖', children: <p>pnpm install --frozen-lockfile</p> },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
