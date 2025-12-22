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
      description: '播放提供方：HTML5 / YouTube / Embed。不同 provider 会使用不同的输入参数。',
      control: { type: 'select' },
      options: ['html5', 'youtube', 'embed'],
      table: { type: { summary: '"html5" | "youtube" | "embed"' } },
    },

    title: {
      description: '标题（用于可访问性/Embed iframe title/文案展示）。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    src: {
      description: 'HTML5 视频地址（MP4 / HLS m3u8）。仅 provider=html5 时生效。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    youtubeId: {
      description: 'YouTube 视频 ID。仅 provider=youtube 时生效。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    embedUrl: {
      description: 'Embed iframe URL。仅 provider=embed 时生效。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    getEmbedUrl: {
      description: '动态生成 embed URL：getEmbedUrl(config) => string。优先级高于 embedUrl/youtubeId。',
      control: false,
      table: { type: { summary: '(config) => string' } },
    },

    externalUrl: {
      description: '点击“新窗口打开”时使用的外部 URL（优先级高于 sourceUrl/自动推导）。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    sourceUrl: {
      description: '源地址/落地页 URL（用于“新窗口打开”的兜底）。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    trackSrc: {
      description: '字幕 VTT 地址（可选）。未传时会尝试从 mp4 src 推导同名 .vtt。',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },

    trackLang: {
      description: '字幕语言（用于 track srcLang/label）。',
      control: { type: 'text' },
      table: { type: { summary: 'string' }, defaultValue: { summary: '"en"' } },
    },

    initialConfig: {
      description: '初始配置（非受控）。包含：lazyPlay/miniPlayer/autoPlay/autoMute/playbackRate/ytControls。',
      control: { type: 'object' },
      table: { type: { summary: 'Partial<Config>' } },
    },

    config: {
      description: '受控配置（传入即受控）。',
      control: { type: 'object' },
      table: { type: { summary: 'Config' } },
    },

    onConfigChange: {
      description: '受控模式下配置变化回调。',
      control: false,
      table: { type: { summary: '(nextConfig) => void' } },
    },

    onError: {
      description: '播放错误回调（含 provider/src/youtubeId/embedUrl 等上下文）。',
      control: false,
      table: { type: { summary: '(err) => void' } },
    },

    onEvent: {
      description: '可观测事件回调（例如 play/pause/seek/hlsError/embedTimeout 等）。',
      control: false,
      table: { type: { summary: '(name, detail) => void' } },
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
