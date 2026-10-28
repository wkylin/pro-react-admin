import type { MusicTrack } from '@wui/media/MusicPlayer'
export const TRACKS = [
  {
    id: 1,
    title: 'Cyberpunk City',
    artist: 'MokkaMusic',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Dreamy Vibes',
    artist: 'Panda Beats',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Deep Ocean',
    artist: 'Blue Wave',
    cover: 'https://images.unsplash.com/photo-1459749411177-287ce1465453?w=200&h=200&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
] satisfies readonly MusicTrack[]
