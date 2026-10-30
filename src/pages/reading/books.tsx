import type { BookPage, InteractiveBookProps } from '@/pages/mediaAdapters/InteractiveBook'
import journeyCover from '@assets/reading/journey.png'
import kingdomsCover from '@assets/reading/three-kingdoms.png'
import liaozhaiCover from '@assets/reading/liaozhai.png'
import warCover from '@assets/reading/art-of-war.png'
import styles from './index.module.less'

export interface ReadingText {
  title: string
  source: string
  chapters: { title: string; text: string }[]
}

export interface ReadingBook {
  id: string
  title: string
  author: string
  category: string
  sectionCount: number
  description: string
  quote: string
  cover: string
  coverColor: string
  titleColor: string
  source: string
  load: () => Promise<ReadingText>
}

/** Complete public-domain Chinese texts, split into separate on-demand bundles. */
export const readingBooks: ReadingBook[] = [
  {
    id: 'journey',
    title: '西遊記',
    author: '吳承恩',
    category: '神魔長篇',
    sectionCount: 100,
    description: '從花果山到靈山，跟隨師徒四人的百回取經之旅。',
    quote: '世上無難事，只怕有心人。',
    cover: journeyCover,
    coverColor: '#13263d',
    titleColor: '#f8e8c9',
    source: 'https://www.gutenberg.org/ebooks/23962',
    load: () => import('./texts/journey.json').then((module) => module.default as ReadingText),
  },
  {
    id: 'three-kingdoms',
    title: '三國志演義',
    author: '羅貫中',
    category: '歷史長篇',
    sectionCount: 120,
    description: '從桃園結義到三分歸晉，在群雄之間讀一段壯闊興亡。',
    quote: '天下大勢，分久必合，合久必分。',
    cover: kingdomsCover,
    coverColor: '#6b211f',
    titleColor: '#ffe8c4',
    source: 'https://www.gutenberg.org/ebooks/23950',
    load: () => import('./texts/three-kingdoms.json').then((module) => module.default as ReadingText),
  },
  {
    id: 'liaozhai',
    title: '聊齋志異',
    author: '蒲松齡',
    category: '志怪短篇集',
    sectionCount: 100,
    description: '四百九十七則人、鬼、狐、仙的奇遇，分成百輯慢慢翻閱。',
    quote: '異史氏曰：有心為善，雖善不賞。',
    cover: liaozhaiCover,
    coverColor: '#282437',
    titleColor: '#f8e9d5',
    source: 'https://www.gutenberg.org/ebooks/51828',
    load: () => import('./texts/liaozhai.json').then((module) => module.default as ReadingText),
  },
  {
    id: 'art-of-war',
    title: '孫子兵法',
    author: '孫武',
    category: '兵學經典',
    sectionCount: 13,
    description: '十三篇完整原典，從始計到用間，讀一部關於判斷的書。',
    quote: '知彼知己，百戰不殆。',
    cover: warCover,
    coverColor: '#e5dfce',
    titleColor: '#242928',
    source: 'https://www.gutenberg.org/ebooks/23864',
    load: () => import('./texts/art-of-war.json').then((module) => module.default as ReadingText),
  },
]

/** Keep chapter boundaries and the original text; InteractiveBook owns physical pagination. */
export function createReadingPages(book: ReadingText): BookPage[] {
  return book.chapters.map((chapter, index) => {
    // Two source faces per chapter, split at a paragraph; physical page sizes remain the component's concern.
    const middle = Math.floor(chapter.text.length / 2)
    const paragraph = chapter.text.indexOf('\n', middle)
    const split = paragraph > 0 && paragraph < chapter.text.length - 1 ? paragraph + 1 : middle
    return {
      pageNumber: index + 1,
      title: chapter.title,
      content: <div className={styles.prose}>{chapter.text.slice(0, split)}</div>,
      backContent: <div className={styles.prose}>{chapter.text.slice(split)}</div>,
    }
  })
}

/** Shared by the shelf preview and reader so artwork and binding always agree. */
export function getReadingBookAppearance(book: ReadingBook) {
  return {
    coverImage: book.cover,
    coverColor: book.coverColor,
    coverTitleColor: book.titleColor,
    coverTextColor: book.titleColor,
    spineColor: book.coverColor,
    spineTextColor: book.titleColor,
    spineAuthor: book.author,
    coverStyle: 'illustrated',
    bookTitle: book.title,
    bookAuthor: book.author,
    backCoverContent: <p>{book.description}</p>,
    thickness: book.sectionCount > 20 ? 32 : 18,
    textured: true,
  } satisfies Partial<InteractiveBookProps>
}
