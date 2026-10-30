import type { MusicTrack } from '@wui/media/MusicPlayer'
import songs from './songs'

export const TRACKS: readonly MusicTrack[] = songs.map((song) => ({
  id: song.key,
  title: song.title,
  artist: song.subtitle,
  cover: song.coverart,
  src: song.audioUrl,
}))
