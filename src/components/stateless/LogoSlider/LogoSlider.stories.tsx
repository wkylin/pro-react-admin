import type { Meta, StoryObj } from '@storybook/react-vite'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'
import Component from './index'

const meta = {
  title: 'Components/Stateless/LogoSlider',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 360, padding: 24, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  args: { companies: [SpringPng, HePng, SongPng, XuePng], radius: 120 },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
