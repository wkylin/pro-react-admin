import { useState } from 'react'
import MusicPlayer, { type MusicPlayerProps } from '../MusicPlayer'
export interface FixMusicPlayerProps extends MusicPlayerProps {
  closeLabel?: string
  onClose?: () => void
}
export default function FixMusicPlayer({ closeLabel = 'Close player', onClose, ...props }: FixMusicPlayerProps) {
  const [closed, setClosed] = useState(false)
  if (closed) return null
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setClosed(true)
          onClose?.()
        }}
      >
        {closeLabel}
      </button>
      <MusicPlayer playOnNavigate {...props} />
    </div>
  )
}
