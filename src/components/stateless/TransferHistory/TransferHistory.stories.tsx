import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Component from './index'

const meta = {
  title: 'Components/Stateless/TransferHistory',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { defaultDisplayCount: 3 },
  argTypes: {
    defaultDisplayCount: { control: { type: 'range', min: 1, max: 5, step: 1 } },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleCompany: Story = {
  args: { defaultDisplayCount: 1 },
}

export const AllCompanies: Story = {
  args: { defaultDisplayCount: 5 },
}
