import { useState } from 'react'
import { useActivate, useUnactivate } from '@platform/keep-alive'
import { useProThemeContext } from '@/theme/hooks'
import Component from '@wui/media/FixMusicPlayer'
import songs from './songs'
export const tracks = songs.map((s) => ({
  id: s.key,
  title: s.title,
  artist: s.subtitle,
  cover: s.coverart,
  src: s.audioUrl,
}))
export default function FixMusicPlayer() {
  const [active, setActive] = useState(true)
  const { resolvedTheme } = useProThemeContext()
  useActivate(() => setActive(true))
  useUnactivate(() => setActive(false))
  return <Component tracks={tracks} active={active} theme={resolvedTheme} />
}
