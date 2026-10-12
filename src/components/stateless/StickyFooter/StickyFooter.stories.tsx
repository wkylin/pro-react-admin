import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/StickyFooter',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    // Keep fixed positioning inside the Storybook preview.
    (Story) => (
      <div
        style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden', transform: 'translateZ(0)' }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <footer style={{ width: '100%', padding: 24, background: '#f5f7fa', borderTop: '1px solid #d9e0e8' }}>
        页尾内容
      </footer>
    ),
    heightValue: '320px',
    className: '',
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
