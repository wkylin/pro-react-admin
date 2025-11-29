import heartyAudio from '@assets/audio/hearty.mp3'
import longnightAudio from '@assets/audio/longnight.mp3'
import yesterdayAudio from '@assets/audio/yesterday.mp3'
import heImage from '@assets/images/he.png'
import springImage from '@assets/images/song.png'
import xueImage from '@assets/images/xue.png'

export const songData = [
  {
    key: 'song-1',
    title: 'Hearty',
    subtitle: 'Aventure - Hearty',
    coverart: heImage,
    audioUrl: heartyAudio,
  },
  {
    key: 'song-2',
    title: 'Long Night',
    subtitle: 'Bohdan Hlukhov - Long Night',
    coverart: springImage,
    audioUrl: longnightAudio,
  },
  {
    key: 'song-3',
    title: 'Yesterday',
    subtitle: 'Aventure - Yesterday',
    coverart: xueImage,
    audioUrl: yesterdayAudio,
  },
]

export default songData
