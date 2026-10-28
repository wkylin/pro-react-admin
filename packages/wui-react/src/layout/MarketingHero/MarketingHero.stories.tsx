import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'
import FloatingIcon, { SocialIcon } from '../../animation/FloatingIcon'
import { Command, Mail } from 'lucide-react'

const meta = {
  title: 'Components/Stateless/MarketingHero',
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
    title: 'Influencer And Affiliate Marketing Plans and Pricing',
    description: 'Discover plans for your next project.',
    decoration: (
      <>
        <FloatingIcon initialX={-50}>
          <SocialIcon icon={Command} color="#3b82f6" label="Command" />
        </FloatingIcon>
        <FloatingIcon initialX={50}>
          <SocialIcon icon={Mail} color="#ef4444" label="Mail" />
        </FloatingIcon>
      </>
    ),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
