import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/FlipLink',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { href: 'https://github.com/wkylin/pro-react-admin', children: 'GitHub' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Medium: Story = {
  args: { href: 'https://medium.com/@wkylin.w', children: 'Medium' },
}

export const RevealLinks = {
  render: () => (
    <section style={{ display: 'grid', placeContent: 'center', gap: 8 }}>
      <Component href="https://github.com/wkylin/pro-react-admin">GitHub</Component>
      <Component href="https://medium.com/@wkylin.w">Medium</Component>
    </section>
  ),
} satisfies Story
