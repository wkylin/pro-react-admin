import { paginateChapter } from './pagination'

describe('reading pagination', () => {
  it('keeps every non-whitespace character while splitting a long chapter into book-sized pages', () => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { configurable: true, value: () => null })
    const text = `詩曰：天地玄黃，宇宙洪荒。\n\n${'山川草木，星月風雲。'.repeat(240)}`
    const pages = paginateChapter(text, { width: 340, height: 480 })

    expect(pages.length).toBeGreaterThan(8)
    expect(pages.join('').replace(/\s/g, '')).toBe(text.replace(/\s/g, ''))
    expect(pages.every((page) => page.split('\n').length <= 13)).toBe(true)
    expect(
      pages
        .flatMap((page) => page.split('\n'))
        .filter(Boolean)
        .every((line) => !/^[，。！？；：、]/.test(line))
    ).toBe(true)
  })
})
