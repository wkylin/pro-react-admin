import { renderToStaticMarkup } from 'react-dom/server'
import type { ReadingText } from './books'

jest.mock('@assets/reading/journey.png', () => '/journey.png')
jest.mock('@assets/reading/three-kingdoms.png', () => '/three-kingdoms.png')
jest.mock('@assets/reading/liaozhai.png', () => '/liaozhai.png')
jest.mock('@assets/reading/art-of-war.png', () => '/art-of-war.png')
const { createReadingPages, readingBooks, getReadingBookAppearance } = require('./books') as typeof import('./books')

function plainText(content: Parameters<typeof renderToStaticMarkup>[0]) {
  const container = document.createElement('div')
  container.innerHTML = renderToStaticMarkup(content)
  return container.textContent
}

test.each(['journey', 'three-kingdoms', 'liaozhai', 'art-of-war'])(
  '%s retains every chapter and character for shared pagination',
  (id) => {
    const text = require(`./texts/${id}.json`) as ReadingText
    const pages = createReadingPages(text)
    expect(pages).toHaveLength(text.chapters.length)
    pages.forEach((page, index) => {
      expect(page.title).toBe(text.chapters[index].title)
      expect(plainText(page.content) + plainText(page.backContent)).toBe(text.chapters[index].text)
    })
  }
)

test('the shelf and reader share each book’s artwork, title and binding colors', () => {
  for (const book of readingBooks) {
    const appearance = getReadingBookAppearance(book)
    expect(appearance.coverImage).toBe(book.cover)
    expect(appearance.bookTitle).toBe(book.title)
    expect(appearance.spineColor).toBe(appearance.coverColor)
    expect(appearance.spineTextColor).toBe(book.titleColor)
  }
})
