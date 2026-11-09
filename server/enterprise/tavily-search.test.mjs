import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeSearchOptions, searchTavily, TavilySearchError } from './tavily-search.cjs'

const { AbortController, AbortSignal, Response } = globalThis
const apiKey = 'server-only-test-key'
const json = (payload, status = 200) => new Response(JSON.stringify(payload), { status })
const rejected = (code, status) => (error) =>
  error instanceof TavilySearchError && error.code === code && error.status === status

test('legacy query-only requests retain defaults and send the server credential only to Tavily', async () => {
  let called = 0
  const result = await searchTavily({
    query: '  React accessibility  ',
    apiKey,
    async fetchImpl(url, init) {
      called += 1
      assert.equal(url, 'https://api.tavily.com/search')
      assert.equal(init.method, 'POST')
      assert.equal(init.headers.Authorization, `Bearer ${apiKey}`)
      assert.ok(init.signal instanceof AbortSignal)
      assert.deepEqual(JSON.parse(init.body), {
        query: 'React accessibility',
        search_depth: 'basic',
        topic: 'general',
        max_results: 5,
        include_answer: 'basic',
        include_raw_content: false,
        include_images: false,
        include_domains: [],
        exclude_domains: [],
        include_usage: true,
      })
      return json({ answer: 'A sourced answer', results: [] })
    },
  })
  assert.equal(called, 1)
  assert.deepEqual(result, { query: 'React accessibility', answer: 'A sourced answer', results: [], images: [] })
  assert.ok(!JSON.stringify(result).includes(apiKey))
})

test('Playground options are validated, canonicalized and sent to the provider', async () => {
  const input = {
    query: ' market update ',
    search_depth: 'advanced',
    topic: 'news',
    max_results: 20,
    time_range: 'week',
    include_answer: true,
    include_raw_content: true,
    include_images: true,
    include_domains: [' EXAMPLE.COM ', 'example.com', '*.例子.中国'],
    exclude_domains: ['Archive.Example.com'],
    include_usage: false,
  }
  await searchTavily({
    ...input,
    apiKey,
    async fetchImpl(_url, init) {
      assert.deepEqual(JSON.parse(init.body), {
        ...input,
        query: 'market update',
        include_answer: 'basic',
        include_raw_content: 'markdown',
        include_domains: ['example.com', '*.xn--fsqu00a.xn--fiqs8s'],
        exclude_domains: ['archive.example.com'],
      })
      return json({})
    },
  })
  assert.deepEqual(input.include_domains, [' EXAMPLE.COM ', 'example.com', '*.例子.中国'])
})

test('all documented depths and topics are accepted without implicit expensive depth changes', () => {
  for (const search_depth of ['ultra-fast', 'fast', 'basic', 'advanced'])
    for (const topic of ['general', 'news', 'finance'])
      assert.equal(normalizeSearchOptions({ query: 'test', search_depth, topic }).search_depth, search_depth)
  assert.equal(normalizeSearchOptions({ query: 'test', include_answer: 'advanced' }).search_depth, 'basic')
})

test('query length counts Unicode characters rather than UTF-16 code units', async () => {
  assert.equal(Array.from(normalizeSearchOptions({ query: '🧭'.repeat(400) }).query).length, 400)
  for (const query of ['', '  ', null, 8, '🧭'.repeat(401)])
    assert.throws(() => normalizeSearchOptions({ query }), rejected('invalid_query', 400))
  for (const body of [null, [], 'query'])
    assert.throws(() => normalizeSearchOptions(body), rejected('invalid_query', 400))
})

for (const [name, options] of [
  ['unknown provider options', { auto_parameters: true }],
  ['browser supplied keys', { api_key: apiKey }],
  ['unsupported depth', { search_depth: 'deep' }],
  ['null depth', { search_depth: null }],
  ['unsupported topic', { topic: 'web' }],
  ['zero results', { max_results: 0 }],
  ['too many results', { max_results: 21 }],
  ['fractional results', { max_results: 2.5 }],
  ['string results', { max_results: '5' }],
  ['null results', { max_results: null }],
  ['invalid time range', { time_range: 'all' }],
  ['null time range', { time_range: null }],
  ['invalid answer format', { include_answer: 'markdown' }],
  ['null answer format', { include_answer: null }],
  ['invalid content format', { include_raw_content: 'html' }],
  ['null content format', { include_raw_content: null }],
  ['nonboolean images', { include_images: 'true' }],
  ['null images', { include_images: null }],
  ['nonboolean usage', { include_usage: 1 }],
  ['null usage', { include_usage: null }],
]) {
  test(`invalid search options reject ${name} before any upstream call`, async () => {
    await assert.rejects(
      searchTavily({ query: 'valid query', ...options, apiKey, fetchImpl: () => assert.fail('upstream was called') }),
      rejected('invalid_search_options', 400)
    )
  })
}

test('domain filters reject URL syntax, invalid host labels, conflicts and oversize arrays', () => {
  for (const domain of [
    '',
    'https://example.com',
    'example.com/path',
    'example.com:443',
    'user@example.com',
    'example.com?query=1',
    'example.com#anchor',
    'example.com\\path',
    '-example.com',
    'example-.com',
    'a..com',
    'example.com.',
    'example_domain.com',
    '**.example.com',
    `${'a'.repeat(64)}.com`,
  ])
    assert.throws(
      () => normalizeSearchOptions({ query: 'test', include_domains: [domain] }),
      rejected('invalid_search_options', 400),
      domain
    )
  for (const include_domains of ['example.com', null, [1], Array(21).fill('example.com')])
    assert.throws(
      () => normalizeSearchOptions({ query: 'test', include_domains }),
      rejected('invalid_search_options', 400)
    )
  assert.throws(
    () =>
      normalizeSearchOptions({ query: 'test', include_domains: ['Example.com'], exclude_domains: ['*.example.com'] }),
    rejected('invalid_search_options', 400)
  )
  assert.deepEqual(
    normalizeSearchOptions({ query: 'test', include_domains: ['example.com'], exclude_domains: ['old.example.com'] })
      .exclude_domains,
    ['old.example.com']
  )
})

test('structured results retain real metadata, bound content and discard unsafe provider URLs', async () => {
  const result = await searchTavily({
    query: 'test',
    max_results: 2,
    include_raw_content: 'text',
    include_images: true,
    apiKey,
    fetchImpl: async () =>
      json({
        answer: 'x'.repeat(9000),
        results: [
          { url: 'javascript:alert(1)', title: 'unsafe' },
          { url: 'https://user:secret@example.com', title: 'credentials' },
          {
            url: 'https://example.com/article',
            title: ' title ',
            content: 'c'.repeat(10_010),
            raw_content: 'r'.repeat(30_010),
            score: 0,
            published_date: '2026-11-09\r\nUTC',
          },
          { url: 'https://example.com/second', title: '', content: '', score: 2, published_date: null },
          { url: 'https://example.com/third' },
        ],
        images: [
          'data:image/png;base64,a',
          'https://example.com/image.png',
          { url: 'https://example.com/b.png', description: ' image ' },
        ],
        response_time: '0.42',
        request_id: ' provider-request-id ',
        usage: { credits: 2, sensitive: apiKey },
        debug: apiKey,
      }),
  })
  assert.equal(result.answer.length, 8000)
  assert.equal(result.results.length, 2)
  assert.equal(result.results[0].content.length, 10_000)
  assert.equal(result.results[0].rawContent.length, 30_000)
  assert.equal(result.results[0].score, 0)
  assert.equal(result.results[0].title, 'title')
  assert.equal(result.results[0].publishedDate, '2026-11-09 UTC')
  assert.equal(result.results[1].title, 'https://example.com/second')
  assert.ok(!('score' in result.results[1]))
  assert.ok(!('publishedDate' in result.results[1]))
  assert.deepEqual(result.images, [
    { url: 'https://example.com/image.png' },
    { url: 'https://example.com/b.png', description: 'image' },
  ])
  assert.equal(result.responseTime, 0.42)
  assert.equal(result.requestId, 'provider-request-id')
  assert.deepEqual(result.usage, { credits: 2 })
  assert.ok(!JSON.stringify(result).includes(apiKey))
})

test('disabled output options do not leak unexpected provider fields and missing metadata is not fabricated', async () => {
  const result = await searchTavily({
    query: 'test',
    include_answer: false,
    include_raw_content: false,
    include_images: false,
    include_usage: false,
    apiKey,
    fetchImpl: async () =>
      json({
        answer: 'hidden',
        results: [{ url: 'https://example.com', raw_content: 'hidden' }],
        images: ['https://example.com/image.png'],
        usage: { credits: 2 },
      }),
  })
  assert.equal(result.answer, '')
  assert.ok(!('rawContent' in result.results[0]))
  assert.deepEqual(result.images, [])
  for (const key of ['usage', 'responseTime', 'requestId']) assert.ok(!(key in result))
})

test('invalid numeric metadata is omitted while genuine zero latency and credits are preserved', async () => {
  for (const response_time of [null, '', 'not a number', false, -1, '-1']) {
    const result = await searchTavily({
      query: 'test',
      apiKey,
      fetchImpl: async () => json({ response_time, usage: { credits: -1 } }),
    })
    assert.ok(!('responseTime' in result))
    assert.ok(!('usage' in result))
  }
  const result = await searchTavily({
    query: 'test',
    apiKey,
    fetchImpl: async () => json({ response_time: 0, usage: { credits: 0 } }),
  })
  assert.equal(result.responseTime, 0)
  assert.deepEqual(result.usage, { credits: 0 })
})

test('missing provider configuration and malformed responses have sanitized typed errors', async () => {
  await assert.rejects(searchTavily({ query: 'test', apiKey: '' }), rejected('tavily_not_configured', 503))
  await assert.rejects(searchTavily({ query: 'test', apiKey, fetchImpl: null }), rejected('tavily_unavailable', 502))
  for (const payload of [null, [], 'invalid'])
    await assert.rejects(
      searchTavily({ query: 'test', apiKey, fetchImpl: async () => json(payload) }),
      rejected('tavily_unavailable', 502)
    )
  await assert.rejects(
    searchTavily({ query: 'test', apiKey, fetchImpl: async () => new Response('not json') }),
    rejected('tavily_unavailable', 502)
  )
  await assert.rejects(
    searchTavily({
      query: 'test',
      apiKey,
      fetchImpl: async () => {
        throw new Error(apiKey)
      },
    }),
    rejected('tavily_unavailable', 502)
  )
})

for (const [status, code, expectedStatus] of [
  [429, 'tavily_rate_limited', 429],
  [432, 'tavily_quota_exceeded', 429],
  [433, 'tavily_quota_exceeded', 429],
  [434, 'tavily_rate_limited', 429],
  [401, 'tavily_unavailable', 502],
  [500, 'tavily_unavailable', 502],
])
  test(`provider HTTP ${status} maps to ${code} without impersonating application authentication`, async () => {
    await assert.rejects(
      searchTavily({ query: 'test', apiKey, fetchImpl: async () => json({ secret: apiKey }, status) }),
      rejected(code, expectedStatus)
    )
  })

test('caller cancellation before fetch avoids charging upstream', async () => {
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(
    searchTavily({
      query: 'test',
      apiKey,
      signal: controller.signal,
      fetchImpl: () => assert.fail('upstream was called'),
    }),
    rejected('search_cancelled', 499)
  )
})

test('caller cancellation during JSON reading remains cancellation even when the reader resolves', async () => {
  for (const fails of [true, false]) {
    const controller = new AbortController()
    await assert.rejects(
      searchTavily({
        query: 'test',
        apiKey,
        signal: controller.signal,
        fetchImpl: async () => ({
          ok: true,
          status: 200,
          async json() {
            controller.abort()
            if (fails) throw new Error('reader aborted')
            return {}
          },
        }),
      }),
      rejected('search_cancelled', 499)
    )
  }
})

test('provider timeout is enforced during JSON reading as well as the initial fetch', async (t) => {
  const timeout = new AbortController()
  t.mock.method(AbortSignal, 'timeout', () => timeout.signal)
  await assert.rejects(
    searchTavily({
      query: 'test',
      apiKey,
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        async json() {
          timeout.abort()
          return {}
        },
      }),
    }),
    rejected('tavily_timeout', 504)
  )
  await assert.rejects(
    searchTavily({ query: 'test', apiKey, fetchImpl: () => assert.fail('upstream was called') }),
    rejected('tavily_timeout', 504)
  )
})
