import Component, { type SoundBarProps } from '@wui/media/SoundBar'
import src from '@assets/audio/heart-of-the-sea.mp3'
export default function SoundBar(props: Omit<SoundBarProps, 'src'>) {
  return <Component {...props} src={src} />
}
