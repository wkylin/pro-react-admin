// @ts-ignore: storybook types resolution can be environment-specific in CI/TS config
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React from 'react'
import type { ComponentType } from 'react'

import SmartVideoPlayer from '@stateless/SmartVideoPlayer'

// SmartVideoPlayer is implemented in JS via forwardRef/memo, so TS only infers RefAttributes.
// Cast to a generic component type for Storybook args/controls.
const SmartVideoPlayerAny = SmartVideoPlayer as unknown as ComponentType<any>

const meta = {
  title: 'ProReactAdmin/SmartVideoPlayer',
  component: SmartVideoPlayerAny,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Demo',
    provider: 'html5',
    src: '',
    youtubeId: 'dQw4w9WgXcQ',
    embedUrl: '',
    externalUrl: '',
    sourceUrl: '',
  },
  argTypes: {
    provider: {
      control: { type: 'select' },
      options: ['html5', 'youtube', 'embed'],
    },
  },
  render: (args) => {
    const { provider } = args

    // Keep a fixed demo shell similar to the video page.
    return (
      <div style={{ padding: 16, maxWidth: 980, margin: '0 auto' }}>
        <SmartVideoPlayer
          {...args}
          provider={provider}
          // Avoid passing invalid props for a provider.
          src={provider === 'html5' ? args.src : undefined}
          youtubeId={provider === 'youtube' ? args.youtubeId : undefined}
          embedUrl={provider === 'embed' ? args.embedUrl : undefined}
        />
      </div>
    )
  },
} satisfies Meta<typeof SmartVideoPlayerAny>

export default meta

type Story = StoryObj<typeof SmartVideoPlayerAny>

export const Html5Mp4: Story = {
  args: {
    provider: 'html5',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    title: 'HTML5 MP4',
    sourceUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
}

export const Html5Hls: Story = {
  args: {
    provider: 'html5',
    // Public demo stream.
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    title: 'HTML5 HLS',
    sourceUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
}

export const YouTube: Story = {
  args: {
    provider: 'youtube',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'YouTube',
  },
}

export const Embed: Story = {
  args: {
    provider: 'embed',
    // A simple embed example.
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Embed',
  },
}
