import MusicPlayer, { type MusicPlayerProps } from '../MusicPlayer'
export interface FixMusicPlayerProps extends MusicPlayerProps {}
export default function FixMusicPlayer(props: FixMusicPlayerProps) {
  return <MusicPlayer {...props} />
}
