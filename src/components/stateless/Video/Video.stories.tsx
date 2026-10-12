import type { Meta, StoryObj } from '@storybook/react-webpack5'
import trailerSource from '@assets/video/trailer.mp4'
import trailerPoster from './poster.jpg'
import Component from './index'

const meta = {
  title: 'Components/Stateless/Video',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 720, padding: 24, margin: '0 auto', boxSizing: 'border-box' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: {
      autoplay: false,
      controls: true,
      fluid: true,
      poster: trailerPoster,
      sources: [{ src: trailerSource, type: 'video/mp4' }],
    },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
