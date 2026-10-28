import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'
import SongPng from '@assets/images/song.png'

const meta = {
  title: 'Components/Stateless/Footer',
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
    brand: <img src={SongPng} width={40} height={40} alt="Logo" />,
    description: 'Shaping the future of web development',
    navigation: [
      {
        title: 'Navigation',
        links: ['Home', 'About', 'Services', 'Projects', 'Blog', 'Contact'].map((label) => ({
          label,
          href: `#${label.toLowerCase()}`,
        })),
      },
    ],
    socialLinks: [{ label: 'GitHub', href: 'https://github.com', external: true }],
    copyright: '© 2026. All rights reserved.',
    legalItems: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
    children: (
      <div>
        <h3>Our Vision</h3>
        <p>Pioneering the next generation of web experiences through innovative code and cutting-edge design.</p>
      </div>
    ),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
