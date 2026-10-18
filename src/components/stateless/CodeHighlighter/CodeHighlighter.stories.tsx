import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from './index'

const meta = {
  title: 'Components/Stateless/CodeHighlighter',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { code: 'export const version = "5.0.0"', lang: 'typescript', theme: 'github-light' },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
