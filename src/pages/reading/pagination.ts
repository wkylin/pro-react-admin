export interface ReadingPageSize {
  width: number
  height: number
}

const pageFont = '14px "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC", Georgia, serif'
const lineHeight = 27

/** Wrap by measured glyph width so the browser does not create a hidden extra line. */
function wrapChapter(text: string, width: number): string[] {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
  const context = canvas?.getContext('2d')
  if (context) context.font = pageFont
  const widths = new Map<string, number>()
  const glyphWidth = (character: string) => {
    const cached = widths.get(character)
    if (cached !== undefined) return cached
    const measured = context?.measureText(character).width ?? ((character.codePointAt(0) ?? 0) <= 0x7f ? 7 : 14)
    widths.set(character, measured)
    return measured
  }
  const lines: string[] = []
  const maxWidth = Math.max(90, width - 52)
  const closingPunctuation = new Set('，。！？；：、）》」』】”’﹔,.!?;:)]}')
  for (const paragraph of text.replace(/\r/g, '').split('\n')) {
    if (!paragraph) {
      lines.push('')
      continue
    }
    let line = ''
    let occupied = 0
    for (const character of paragraph) {
      const nextWidth = glyphWidth(character)
      if (line && occupied + nextWidth > maxWidth) {
        if (closingPunctuation.has(character)) {
          const lastCharacter = Array.from(line).at(-1) ?? ''
          const remaining = line.slice(0, -lastCharacter.length)
          if (remaining) lines.push(remaining)
          line = lastCharacter
          occupied = glyphWidth(lastCharacter)
        } else {
          lines.push(line)
          line = ''
          occupied = 0
        }
      }
      line += character
      occupied += nextWidth
    }
    if (line) lines.push(line)
  }
  return lines
}

/** Reserve room for the running head, optional chapter title and page footer. */
export function paginateChapter(text: string, size: ReadingPageSize): string[] {
  const firstLimit = Math.max(3, Math.floor((size.height - 160) / lineHeight) - 1)
  const continuationLimit = Math.max(4, Math.floor((size.height - 90) / lineHeight) - 1)
  const pages: string[] = []
  let current: string[] = []
  let limit = firstLimit
  for (const line of wrapChapter(text, size.width)) {
    if (!line && current.length === 0) continue
    if (current.length >= limit) {
      pages.push(current.join('\n').trimEnd())
      current = []
      limit = continuationLimit
    }
    if (!line && current.length === 0) continue
    current.push(line)
  }
  if (current.length) pages.push(current.join('\n').trimEnd())
  return pages.length ? pages : ['']
}
