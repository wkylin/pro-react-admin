import { execFileSync } from 'node:child_process'
import {
  buildSearchCode,
  createDefaultRequest,
  normalizeSearchResponse,
  TavilyValidationError,
  validateSearchRequest,
} from './model'

const request = () => ({ ...createDefaultRequest(), query: 'React accessibility' })
const response = () => ({ query: 'React accessibility', answer: 'An answer', results: [], images: [] })

describe('Tavily request model', () => {
  it('normalizes a query-only request without mutating defaults or leaking unknown fields', () => {
    const value = { query: '  React accessibility  ', api_key: 'private-key', token: 'private-session' }
    expect(validateSearchRequest(value)).toEqual(request())
    expect(value.query).toBe('  React accessibility  ')
    const first = createDefaultRequest()
    first.include_domains.push('example.com')
    expect(createDefaultRequest().include_domains).toEqual([])
  })

  it.each([null, undefined, [], true, 12, {}, { query: '' }, { query: ' \n ' }, { query: 42 }])(
    'rejects a missing or invalid query: %j',
    (value) => {
      expect(() => validateSearchRequest(value)).toThrow(expect.objectContaining({ field: 'query' }))
    }
  )

  it('counts Unicode characters instead of surrogate pairs at the query boundary', () => {
    expect(validateSearchRequest({ query: '😀'.repeat(400) }).query).toBe('😀'.repeat(400))
    expect(() => validateSearchRequest({ query: '😀'.repeat(401) })).toThrow(TavilyValidationError)
  })

  it.each(['ultra-fast', 'fast', 'basic', 'advanced'])('accepts search depth %s', (search_depth) => {
    expect(validateSearchRequest({ ...request(), search_depth }).search_depth).toBe(search_depth)
  })

  it.each(['general', 'news', 'finance'])('accepts topic %s', (topic) => {
    expect(validateSearchRequest({ ...request(), topic }).topic).toBe(topic)
  })

  it.each(['day', 'week', 'month', 'year'])('accepts time range %s', (time_range) => {
    expect(validateSearchRequest({ ...request(), time_range }).time_range).toBe(time_range)
  })

  it.each([
    ['max_results', 0],
    ['max_results', 21],
    ['max_results', 2.5],
    ['max_results', '5'],
    ['max_results', Infinity],
    ['search_depth', 'deep'],
    ['search_depth', null],
    ['topic', 'web'],
    ['time_range', 'today'],
    ['time_range', null],
    ['include_answer', 'yes'],
    ['include_raw_content', 'html'],
    ['include_images', 1],
    ['include_images', null],
    ['include_usage', false],
    ['include_domains', 'example.com'],
    ['exclude_domains', null],
  ])('identifies invalid %s parameter %j', (field, value) => {
    expect(() => validateSearchRequest({ ...request(), [field as string]: value })).toThrow(
      expect.objectContaining({ field })
    )
  })

  it('accepts result-count bounds and normalizes compatible boolean options', () => {
    expect(validateSearchRequest({ ...request(), max_results: 1 }).max_results).toBe(1)
    expect(validateSearchRequest({ ...request(), max_results: 20 }).max_results).toBe(20)
    expect(validateSearchRequest({ ...request(), include_answer: true, include_raw_content: true })).toMatchObject({
      include_answer: 'basic',
      include_raw_content: 'markdown',
    })
    expect(validateSearchRequest({ ...request(), include_answer: false, include_raw_content: false })).toMatchObject({
      include_answer: false,
      include_raw_content: false,
    })
  })

  it('normalizes IDNA, wildcard and case variants without excluding a permitted subdomain', () => {
    expect(
      validateSearchRequest({
        ...request(),
        include_domains: [' Example.COM ', 'example.com', '*.中文.cn', 'localhost', '127.0.0.1'],
        exclude_domains: ['old.example.com'],
      })
    ).toMatchObject({
      include_domains: ['example.com', '*.xn--fiq228c.cn', 'localhost', '127.0.0.1'],
      exclude_domains: ['old.example.com'],
    })
  })

  it.each([
    'https://example.com',
    'example.com/path',
    'example.com:443',
    'user@example.com',
    'example.com?x',
    'example.com#x',
    'exa mple.com',
    'example.com.',
    'example..com',
    '-example.com',
    'example-.com',
    '**.example.com',
    'example_1.com',
    '',
    'x'.repeat(64) + '.com',
    'x\u0000.com',
  ])('rejects a non-hostname domain: %j', (domain) => {
    expect(() => validateSearchRequest({ ...request(), include_domains: [domain] })).toThrow(
      expect.objectContaining({ field: 'include_domains' })
    )
  })

  it('limits the original list length and rejects exact conflicts after removing a wildcard', () => {
    expect(() => validateSearchRequest({ ...request(), include_domains: Array(21).fill('example.com') })).toThrow(
      expect.objectContaining({ field: 'include_domains' })
    )
    expect(() =>
      validateSearchRequest({ ...request(), include_domains: ['*.Example.com'], exclude_domains: ['example.com'] })
    ).toThrow(expect.objectContaining({ field: 'exclude_domains' }))
  })
})

describe('Tavily response model', () => {
  it('preserves all twenty images supported by the server response contract', () => {
    const images = Array.from({ length: 20 }, (_, index) => ({
      url: `https://example.com/image-${index + 1}.png`,
      description: `Image ${index + 1}`,
    }))
    expect(normalizeSearchResponse({ ...response(), images }).images).toEqual(images)
  })

  it('keeps only safe, bounded response fields and valid metadata', () => {
    expect(
      normalizeSearchResponse({
        ...response(),
        answer: 'a'.repeat(9000),
        token: 'private-session',
        results: [
          {
            title: '  Example  ',
            url: 'https://example.com',
            content: 'c'.repeat(11000),
            score: 0.8,
            publishedDate: 'Nov 9\n2026',
            rawContent: 'r'.repeat(31000),
            private: 'hidden',
          },
        ],
        images: [{ url: 'https://example.com/picture.png', description: 'An image' }],
        responseTime: '0.42',
        requestId: ' request-1 ',
        usage: { credits: 2, secret: 'hidden' },
      })
    ).toEqual({
      query: 'React accessibility',
      answer: 'a'.repeat(8000),
      results: [
        {
          title: 'Example',
          url: 'https://example.com/',
          content: 'c'.repeat(10000),
          score: 0.8,
          publishedDate: 'Nov 9 2026',
          rawContent: 'r'.repeat(30000),
        },
      ],
      images: [{ url: 'https://example.com/picture.png', description: 'An image' }],
      responseTime: 0.42,
      requestId: 'request-1',
      usage: { credits: 2 },
    })
  })

  it('does not invent absent or invalid usage, score, time or request IDs', () => {
    expect(normalizeSearchResponse(response())).toEqual(response())
    expect(
      normalizeSearchResponse({
        ...response(),
        responseTime: Infinity,
        requestId: '',
        usage: { credits: -1 },
        results: [{ url: 'https://example.com', score: NaN }],
      })
    ).toEqual({ ...response(), results: [{ url: 'https://example.com/', title: 'https://example.com/', content: '' }] })
  })

  it.each([
    'javascript:alert(1)',
    'data:text/html,test',
    'file:///etc/passwd',
    'https://user:password@example.com',
    'https://exam\nple.com',
    '/relative',
    'not a url',
  ])('filters unsafe result and image URLs: %j', (url) => {
    expect(normalizeSearchResponse({ ...response(), results: [{ url }], images: [{ url }] })).toEqual(response())
  })

  it.each([
    null,
    [],
    {},
    { ...response(), query: 2 },
    { ...response(), answer: null },
    { ...response(), results: {} },
    { ...response(), images: undefined },
  ])('rejects an invalid envelope: %j', (value) => {
    expect(() => normalizeSearchResponse(value)).toThrow('Invalid Tavily search response')
  })
})

describe('Tavily request code', () => {
  const query = "It's `safe` $(printf substituted) '''\nwith \"quotes\" and 中文"

  it('round-trips shell metacharacters as one JSON argument with a stubbed curl', () => {
    const value = { ...request(), query }
    const code = buildSearchCode(value, 'curl')
    const output = execFileSync('sh', ['-c', `curl() { printf '%s\\0' "$@"; }\nTAVILY_API_KEY=example\n${code}`], {
      encoding: 'utf8',
    })
    const args = output.split('\0')
    expect(JSON.parse(args[args.indexOf('--data') + 1])).toEqual(value)
    expect(args[args.indexOf('--header') + 1]).toBe('Authorization: Bearer example')
  })

  it('produces executable server JavaScript without changing the query or exposing credentials', async () => {
    const value = { ...request(), query }
    const code = buildSearchCode(value, 'javascript')
    const fetcher = jest.fn(async (_url: string, _options: RequestInit) => ({ ok: true, json: async () => ({}) }))
    const execute = new Function('fetch', 'process', 'console', `return (async () => {${code}})()`)
    await execute(fetcher, { env: { TAVILY_API_KEY: 'example-key' } }, { log: jest.fn() })
    expect(JSON.parse(fetcher.mock.calls[0][1].body as string)).toEqual(value)
    expect(code).toContain('process.env.TAVILY_API_KEY')
    expect(code).not.toContain('example-key')
  })

  it('produces syntactically valid Python and round-trips payload escaping', () => {
    const value = { ...request(), query }
    const code = buildSearchCode(value, 'python')
    execFileSync('python3', ['-c', 'import ast,sys; ast.parse(sys.stdin.read())'], { input: code })
    const literal = code.match(/^payload = json\.loads\((.+)\)$/m)?.[1]
    expect(JSON.parse(JSON.parse(literal!))).toEqual(value)
    expect(code).toContain("os.environ['TAVILY_API_KEY']")
  })
})
