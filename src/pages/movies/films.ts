import chargeStill from '@assets/cinema/charge.jpg'
import tearsStill from '@assets/cinema/tears-of-steel.jpg'
import wingStill from '@assets/cinema/wing-it.jpg'
import elephantsStill from '@assets/cinema/elephants-dream.jpg'

export interface CinemaFilm {
  id: string
  title: string
  originalTitle: string
  year: string
  duration: string
  genre: string
  synopsis: string
  editorial: string
  still: string
  youtubeId: string
  streamHd: string
  stream4k?: string
  sourcePage: string
  attribution: string
  license: 'CC BY 2.5' | 'CC BY 3.0' | 'CC BY 4.0'
  quality: string
  qualityDetail: string
}

/** All four films are complete, streamable Blender open movies; 4K is labelled only when a verified source exists. */
export const cinemaFilms: CinemaFilm[] = [
  {
    id: 'charge',
    title: '充能',
    originalTitle: 'Charge',
    year: '2022',
    duration: '4 分 23 秒',
    genre: '科幻 · 机械反乌托邦',
    synopsis: '能源枯竭的未来，一位老人闯进电池工厂，迎面遇上守卫机器。他必须在工厂与夜色之间找到一线生机。',
    editorial: '四分钟，走进电光与机械交织的末日世界。',
    still: chargeStill,
    youtubeId: 'UXqq0ZvbOnk',
    streamHd:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7a/Charge_-_Blender_Open_Movie-full_movie.webm/Charge_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm',
    stream4k: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Charge_-_Blender_Open_Movie-full_movie.webm',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Charge_-_Blender_Open_Movie-full_movie.webm',
    attribution: 'Blender Studio',
    license: 'CC BY 4.0',
    quality: '4K UHD',
    qualityDetail: '默认播放 1080p；可切换 3840 × 1608 原版。4K 需要更快的网络与支持 WebM 的浏览器。',
  },
  {
    id: 'tears-of-steel',
    title: '钢铁之泪',
    originalTitle: 'Tears of Steel',
    year: '2012',
    duration: '12 分 14 秒',
    genre: '科幻 · 真人 / CG',
    synopsis: '机械入侵阿姆斯特丹，一段被遗忘的关系成为改写战局的关键。真人与视觉特效交织的开放科幻电影。',
    editorial: '旧日情感与未来机器，在阿姆斯特丹的天空下相撞。',
    still: tearsStill,
    youtubeId: 'OHOpb2fS-cM',
    streamHd:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/10/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm.1080p.vp9.webm',
    stream4k:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/10/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm.2160p.vp9.webm',
    sourcePage:
      'https://commons.wikimedia.org/wiki/File:Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm',
    attribution: 'Blender Foundation',
    license: 'CC BY 3.0',
    quality: '4K UHD',
    qualityDetail: '默认播放 1080p；可切换 3840 × 1714 版本。4K 需要更快的网络与支持 WebM 的浏览器。',
  },
  {
    id: 'wing-it',
    title: '翼想天开',
    originalTitle: 'WING IT!',
    year: '2023',
    duration: '3 分 58 秒',
    genre: '科幻 · 太空喜剧',
    synopsis: '一对不太靠谱的太空搭档遇到突发危机，在飞船里展开一场节奏明快的救援。',
    editorial: '太空、乌龙与友谊，一次轻盈的银河系小冒险。',
    still: wingStill,
    youtubeId: 'u9lj-c29dxI',
    streamHd: 'https://upload.wikimedia.org/wikipedia/commons/3/38/WING_IT%21_-_Blender_Open_Movie-full_movie.webm',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:WING_IT!_-_Blender_Open_Movie-full_movie.webm',
    attribution: 'Blender Studio',
    license: 'CC BY 4.0',
    quality: '1080p HD',
    qualityDetail: '站内播放 1920 × 1080 完整原版，支持分段加载。',
  },
  {
    id: 'elephants-dream',
    title: '大象之梦',
    originalTitle: 'Elephants Dream',
    year: '2006',
    duration: '10 分 58 秒',
    genre: '科幻 · 超现实动画',
    synopsis: '两名旅人穿过不断变化的机械世界。一个人看见奇迹，另一个人却只看见危险。',
    editorial: '一部在机械迷宫里展开的梦，适合在夜深时观看。',
    still: elephantsStill,
    youtubeId: 'TLkA0RELQ1g',
    streamHd:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/28/Elephants_Dream_%282006%29_1080p24.webm/Elephants_Dream_%282006%29_1080p24.webm.1080p.vp9.webm',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Elephants_Dream_(2006)_1080p24.webm',
    attribution: 'Orange Open Movie Project',
    license: 'CC BY 2.5',
    quality: '1080p HD',
    qualityDetail: '站内播放 1920 × 1080 完整版本；首次缓冲可能需要稍等。',
  },
]
