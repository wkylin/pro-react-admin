import heartyAudio from '@assets/audio/hearty.mp3'
import longnightAudio from '@assets/audio/longnight.mp3'
import yesterdayAudio from '@assets/audio/yesterday.mp3'
import music01Png from '@assets/images/music/music01.png'
import music02Png from '@assets/images/music/music02.png'
import music03Png from '@assets/images/music/music03.png'

export const songData = [
  {
    key: 'song-1',
    title: 'Hearty',
    subtitle: 'Aventure - Hearty',
    coverart: music01Png,
    audioUrl: heartyAudio
  },
  {
    key: 'song-2',
    title: 'Long Night',
    subtitle: 'Bohdan Hlukhov - Long Night',
    coverart: music02Png,
    audioUrl: longnightAudio
  },
  {
    key: 'song-3',
    title: 'Yesterday',
    subtitle: 'Aventure - Yesterday',
    coverart: music03Png,
    audioUrl: yesterdayAudio
  }
]

export default songData
