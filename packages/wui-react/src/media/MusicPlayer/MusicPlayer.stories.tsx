import { TRACKS } from '@/pages/mediaAdapters/MusicPlayerData'
import type { Meta, StoryObj } from '@storybook/react'
import Component from './index'

const meta = {
  title: 'Components/Stateless/MusicPlayer',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: 620,
          padding: 'clamp(12px, 3vw, 36px)',
          background:
            context.args.appearance === 'console'
              ? '#0d0c12'
              : context.args.appearance === 'minimal'
                ? '#dae8f7'
                : '#ededf0',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: { tracks: TRACKS, appearance: 'editorial' },
  argTypes: {
    appearance: { control: 'select', options: ['editorial', 'console', 'minimal'] },
    variant: { control: 'radio', options: ['studio', 'compact'] },
    theme: { control: 'radio', options: ['light', 'dark'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          '一个播放器、两个独立区域：播放舞台负责封面与控制，曲目列表负责选歌。appearance 切换音乐站、深色控制台与极简风格；variant="compact" 将播放器压缩为横向控制条，列表默认收起。',
      },
    },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: '音乐站风格。宽屏时播放舞台与曲目列表并列，窄屏时上下排列。' },
      source: { code: '<MusicPlayer tracks={tracks} appearance="editorial" />' },
    },
  },
}

export const Console: Story = {
  args: { appearance: 'console', initialTrack: 1 },
  parameters: {
    docs: {
      description: { story: '深色控制台风格，唱片式封面与紫色播放强调色。' },
      source: { code: '<MusicPlayer tracks={tracks} appearance="console" initialTrack={1} />' },
    },
  },
}

export const Minimal: Story = {
  args: { appearance: 'minimal', initialTrack: 2 },
  parameters: {
    docs: {
      description: { story: '冷蓝色轻量风格，保留完整的播放控制与独立队列。' },
      source: { code: '<MusicPlayer tracks={tracks} appearance="minimal" initialTrack={2} />' },
    },
  },
}

export const Compact: Story = {
  args: { appearance: 'editorial', variant: 'compact' },
  parameters: {
    docs: {
      description: { story: '横向播放条；展开下方队列后仍可从列表切歌。' },
      source: { code: '<MusicPlayer tracks={tracks} appearance="editorial" variant="compact" />' },
    },
  },
}

export const Dark: Story = {
  args: { appearance: 'editorial', theme: 'dark' },
  parameters: { docs: { source: { code: '<MusicPlayer tracks={tracks} appearance="editorial" theme="dark" />' } } },
}

export const Dismissible: Story = {
  args: { variant: 'compact', dismissible: true, onClose: () => {} },
  parameters: {
    docs: { source: { code: '<MusicPlayer tracks={tracks} variant="compact" dismissible onClose={() => {}} />' } },
  },
}
