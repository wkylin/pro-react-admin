import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/SandpackBasic',
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
    template: 'react',
    options: { showNavigator: true },
    files: { '/App.js': 'export default function App() { return <h1>Hello Sandpack</h1> }' },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
