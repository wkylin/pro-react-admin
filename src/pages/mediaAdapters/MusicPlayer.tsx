import { useState } from 'react'
import { useActivate, useUnactivate } from '@platform/keep-alive'
import { useProThemeContext } from '@/theme/hooks'
import Component from '@wui/media/MusicPlayer'
import { TRACKS } from './MusicPlayerData'

export default function MusicPlayer({
  appearance = 'editorial',
  playRequest = 0,
}: {
  appearance?: 'editorial' | 'console' | 'minimal' | 'playlist'
  playRequest?: number
}) {
  const [active, setActive] = useState(true)
  const { resolvedTheme } = useProThemeContext()

  useActivate(() => setActive(true))
  useUnactivate(() => setActive(false))

  return (
    <Component
      tracks={TRACKS}
      active={active}
      theme={resolvedTheme}
      appearance={appearance}
      playRequest={playRequest}
      playOnNavigate
    />
  )
}
