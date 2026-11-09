import {
  buildQuotedReply,
  createChatLink,
  formatComposerSelection,
  insertComposerText,
  safeChatUrl,
  type TextFormat,
} from './composerModel'

describe('composer insertion', () => {
  it('inserts at the caret and replaces a selected range', () => {
    expect(insertComposerText('hello world', 5, 5, '!')).toEqual({
      value: 'hello! world',
      selectionStart: 6,
      selectionEnd: 6,
    })
    expect(insertComposerText('hello world', 6, 11, 'team')).toEqual({
      value: 'hello team',
      selectionStart: 10,
      selectionEnd: 10,
    })
  })
  it('uses UTF-16 selection positions for emoji', () => {
    expect(insertComposerText('🙂hello', 2, 2, '🚀')).toEqual({
      value: '🙂🚀hello',
      selectionStart: 4,
      selectionEnd: 4,
    })
    expect(insertComposerText('a🙂b', 1, 3, '🎉')).toEqual({ value: 'a🎉b', selectionStart: 3, selectionEnd: 3 })
  })
  it('bounds and orders selection offsets', () => {
    expect(insertComposerText('hello', -10, 50, 'x')).toEqual({ value: 'x', selectionStart: 1, selectionEnd: 1 })
    expect(insertComposerText('hello', 4.9, 1.2, 'x')).toEqual({ value: 'hxo', selectionStart: 2, selectionEnd: 2 })
    expect(insertComposerText('hello', NaN, Infinity, '!')?.value).toBe('hello!')
  })
  it('enforces 4000 JS characters without truncating', () => {
    expect(insertComposerText('a'.repeat(3998), 3998, 3998, '🙂')?.value).toHaveLength(4000)
    expect(insertComposerText('a'.repeat(3999), 3999, 3999, '🙂')).toBeUndefined()
    expect(insertComposerText('a'.repeat(4000), 0, 2, '🙂')?.value).toHaveLength(4000)
    expect(insertComposerText('a'.repeat(4001), 0, 0, '')).toBeUndefined()
    expect(insertComposerText('a'.repeat(4001), 0, 2, '')?.value).toHaveLength(3999)
  })
  it('preserves whitespace and the complete untouched suffix', () => {
    expect(insertComposerText('  first\nsecond  ', 2, 2, 'new\n')?.value).toBe('  new\nfirst\nsecond  ')
  })
})

describe('inline formatting', () => {
  it.each([
    ['bold', '**'],
    ['italic', '*'],
    ['strike', '~~'],
    ['code', '`'],
  ] as const)('wraps selected %s content and keeps its inner selection', (format, marker) => {
    expect(formatComposerSelection('hello world', 6, 11, format)).toEqual({
      value: `hello ${marker}world${marker}`,
      selectionStart: 6 + marker.length,
      selectionEnd: 11 + marker.length,
    })
  })
  it.each([
    ['bold', '**'],
    ['italic', '*'],
    ['strike', '~~'],
    ['code', '`'],
  ] as const)('places an empty %s caret between its markers', (format, marker) => {
    expect(formatComposerSelection('ab', 1, 1, format)).toEqual({
      value: `a${marker}${marker}b`,
      selectionStart: 1 + marker.length,
      selectionEnd: 1 + marker.length,
    })
  })
  it('uses longer code markers when content contains backticks', () => {
    expect(formatComposerSelection('a`b', 0, 3, 'code')).toEqual({
      value: '``a`b``',
      selectionStart: 2,
      selectionEnd: 5,
    })
    expect(formatComposerSelection('`x', 0, 2, 'code')).toEqual({
      value: '`` `x ``',
      selectionStart: 3,
      selectionEnd: 5,
    })
    expect(formatComposerSelection('a```b', 0, 5, 'code')?.value).toBe('````a```b````')
  })
  it('preserves Unicode offsets after formatting', () => {
    expect(formatComposerSelection('a🙂b', 1, 3, 'bold')).toEqual({
      value: 'a**🙂**b',
      selectionStart: 3,
      selectionEnd: 5,
    })
  })
  it.each(['bold', 'italic', 'strike', 'code'] as const)('rejects overflowing %s markers', (format) => {
    expect(formatComposerSelection('a'.repeat(4000), 1, 1, format)).toBeUndefined()
  })
})

describe('line formatting', () => {
  it.each([
    ['quote', '> alpha\n> beta', 2, 4],
    ['bullet', '- alpha\n- beta', 2, 4],
    ['number', '1. alpha\n2. beta', 3, 6],
  ] as const)(
    'prefixes selected %s lines without changing adjacent lines',
    (format, replacement, firstPrefix, added) => {
      expect(formatComposerSelection('before\nalpha\nbeta\nafter', 7, 17, format)).toEqual({
        value: `before\n${replacement}\nafter`,
        selectionStart: 7 + firstPrefix,
        selectionEnd: 17 + added,
      })
    }
  )
  it('prefixes the current line for a collapsed selection', () => {
    expect(formatComposerSelection('one\ntwo', 5, 5, 'quote')).toEqual({
      value: 'one\n> two',
      selectionStart: 7,
      selectionEnd: 7,
    })
    expect(formatComposerSelection('', 0, 0, 'bullet')).toEqual({ value: '- ', selectionStart: 2, selectionEnd: 2 })
  })
  it('handles leading and trailing empty lines', () => {
    expect(formatComposerSelection('\nnext', 0, 0, 'quote')).toEqual({
      value: '> \nnext',
      selectionStart: 2,
      selectionEnd: 2,
    })
    expect(formatComposerSelection('one\n', 4, 4, 'number')).toEqual({
      value: 'one\n1. ',
      selectionStart: 7,
      selectionEnd: 7,
    })
  })
  it('excludes the next line when selection ends after a newline', () => {
    expect(formatComposerSelection('one\ntwo', 0, 4, 'quote')).toEqual({
      value: '> one\ntwo',
      selectionStart: 2,
      selectionEnd: 6,
    })
  })
  it('accounts for two-digit number prefixes', () => {
    const value = Array.from({ length: 10 }, () => 'x').join('\n')
    const result = formatComposerSelection(value, 0, value.length, 'number')
    expect(result?.value.endsWith('10. x')).toBe(true)
    expect(result?.selectionEnd).toBe(value.length + 31)
  })
  it.each(['quote', 'bullet', 'number'] as TextFormat[])('rejects overflowing %s prefixes', (format) => {
    expect(formatComposerSelection('a'.repeat(3999), 0, 3999, format)).toBeUndefined()
  })
})

describe('safe message links', () => {
  it('normalizes HTTP(S) URLs and explicit hosts', () => {
    expect(safeChatUrl(' HTTPS://EXAMPLE.COM/docs?q=react#section ')).toBe('https://example.com/docs?q=react#section')
    expect(safeChatUrl('http://localhost:8787/file.pdf')).toBe('http://localhost:8787/file.pdf')
    expect(safeChatUrl('https://例子.测试/文档')).toMatch(/^https:\/\/xn--/)
  })
  it.each([
    '',
    '/relative',
    '//example.com/path',
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'file:///private/file',
    'ftp://example.com/file',
    'mailto:person@example.com',
    'blob:https://example.com/value',
    'https://person:password@example.com/',
    'https://person@example.com/',
    'https://example.com/path\nother',
    'https://exa\tmple.com/',
    `https://example.com/${String.fromCharCode(127)}`,
  ])('rejects unsafe URL %j', (value) => {
    expect(safeChatUrl(value)).toBeUndefined()
    expect(createChatLink('link', value)).toBeUndefined()
  })
  it('rejects non-string values at an untyped boundary', () => {
    for (const value of [undefined, null, {}, 42]) expect(safeChatUrl(value as unknown as string)).toBeUndefined()
  })
  it('escapes Markdown labels and parentheses in URL destinations', () => {
    expect(createChatLink('Read [this](now)!', 'https://example.com/file(a).pdf')).toBe(
      '[Read \\[this\\]\\(now\\)\\!](https://example.com/file%28a%29.pdf)'
    )
    expect(createChatLink('<img src=x> **bold** `code`', 'https://example.com/')).toBe(
      '[\\<img src=x\\> \\*\\*bold\\*\\* \\`code\\`](https://example.com/)'
    )
  })
  it('keeps attempted destination injection inside the escaped label', () => {
    const result = createChatLink('x](javascript:alert(1)) [steal', 'https://example.com/')!
    expect(result).toContain('x\\]\\(javascript:alert\\(1\\)\\)')
    expect(result.endsWith('](https://example.com/)')).toBe(true)
  })
  it('normalizes multiline labels and uses the actual URL if label is blank', () => {
    expect(createChatLink('Read\r\nmore', 'https://example.com/docs')).toBe('[Read more](https://example.com/docs)')
    expect(createChatLink('  ', 'https://example.com/docs')).toBe(
      '[https://example.com/docs](https://example.com/docs)'
    )
  })
  it('rejects generated links beyond the message limit', () => {
    expect(createChatLink('a'.repeat(4000), 'https://example.com/')).toBeUndefined()
    expect(createChatLink('file', `https://example.com/${'a'.repeat(4000)}`)).toBeUndefined()
  })
})

describe('quoted replies', () => {
  it('keeps the exact draft when no quotable source is present', () => {
    const value = '  existing\ndraft  '
    expect(buildQuotedReply(value)).toBe(value)
    expect(buildQuotedReply(value, { displayName: 'Ada', body: '  ' })).toBe(value)
  })
  it('quotes sender and every source line without changing the user draft', () => {
    const value = '  My reply\nwith formatting  '
    expect(buildQuotedReply(value, { displayName: 'Ada', body: 'First line\n\nSecond line' })).toBe(
      `> **Ada**\n> First line\n> \n> Second line\n\n${value}`
    )
  })
  it('escapes sender markup and prevents sender newlines escaping the quote', () => {
    const result = buildQuotedReply('reply', { displayName: 'A]\n\n[leak](https://example.com/)', body: 'source' })
    expect(result).toBe('> **A\\] \\[leak\\]\\(https://example.com/\\)**\n> source\n\nreply')
  })
  it('limits only the excerpt to 280 Unicode characters without splitting emoji', () => {
    const result = buildQuotedReply('reply', { displayName: 'Ada', body: '🙂'.repeat(300) })
    const excerpt = result.split('\n')[1].slice(2)
    expect(Array.from(excerpt)).toHaveLength(280)
    expect(excerpt).toBe(`${'🙂'.repeat(279)}…`)
  })
  it('does not ellipsize an excerpt that exactly fits', () => {
    expect(buildQuotedReply('', { displayName: 'Ada', body: '文'.repeat(280) })).toContain(`> ${'文'.repeat(280)}\n\n`)
  })
  it('never shrinks a full draft to make a quote fit', () => {
    const value = '文'.repeat(4000)
    const result = buildQuotedReply(value, { displayName: 'Ada', body: 'quote' })
    expect(result.endsWith(value)).toBe(true)
    expect(result.length).toBeGreaterThan(4000)
  })
})
