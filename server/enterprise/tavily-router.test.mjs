import { test } from 'node:test'
import assert from 'node:assert/strict'
import express from 'express'
import process from 'node:process'
import { createEnterpriseRouter } from './router.cjs'

const { AbortController, DOMException, Response, fetch } = globalThis
class BusinessError extends Error {
  constructor(code, status) {
    super(code)
    this.code = code
    this.status = status
  }
}

async function startRouter(
  t,
  {
    permissions = ['ai-workbench:read'],
    apiKey = 'server-only-test-key',
    fetchImpl = async () => Response.json({}),
    ...routerOptions
  } = {}
) {
  const previous = process.env.TAVILY_API_KEY
  if (apiKey === null) delete process.env.TAVILY_API_KEY
  else process.env.TAVILY_API_KEY = apiKey
  t.after(() => {
    if (previous === undefined) delete process.env.TAVILY_API_KEY
    else process.env.TAVILY_API_KEY = previous
  })
  const authentications = []
  const app = express()
  app.use(express.json())
  app.use(
    '/api',
    createEnterpriseRouter(
      {
        async authenticate(token, tenantId) {
          authentications.push({ token, tenantId })
          if (token !== 'test-session' || tenantId !== 'alpha') throw new BusinessError('unauthorized', 401)
          return { tenantId, principalId: 'member-1' }
        },
        async permissions() {
          return { permissions }
        },
      },
      {
        businessErrorClass: BusinessError,
        tavilyFetch: fetchImpl,
        requestLogger: { info() {}, error() {} },
        ...routerOptions,
      }
    )
  )
  const server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(async () => {
    server.closeAllConnections()
    await new Promise((resolve) => server.close(resolve))
  })
  const url = `http://127.0.0.1:${server.address().port}/api/ai/tavily-search`
  const request = (body = { query: 'test' }, headers = {}, signal) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-session',
        'X-Tenant-ID': 'alpha',
        ...headers,
      },
      body: JSON.stringify(body),
      signal,
    })
  return { request, authentications }
}

test('JSON Playground responses preserve structured results and use authenticated tenant context', async (t) => {
  const { request, authentications } = await startRouter(t, {
    fetchImpl: async (_url, init) => {
      assert.equal(JSON.parse(init.body).search_depth, 'fast')
      assert.equal(init.headers.Authorization, 'Bearer server-only-test-key')
      assert.ok(!('X-Tenant-ID' in init.headers))
      return Response.json({
        answer: 'answer',
        results: [{ title: 'source', url: 'https://example.com', score: 0.9, content: 'text' }],
        response_time: '0.25',
        request_id: 'provider-id',
        usage: { credits: 1 },
      })
    },
  })
  const response = await request(
    { query: '  test  ', search_depth: 'fast' },
    { Accept: 'application/json', 'X-Request-ID': 'client-request-1234' }
  )
  assert.equal(response.status, 200)
  assert.match(response.headers.get('Content-Type'), /application\/json/)
  assert.equal(response.headers.get('Cache-Control'), 'no-store')
  assert.equal(response.headers.get('X-Request-ID'), 'client-request-1234')
  assert.match(response.headers.get('Vary'), /Accept/)
  assert.deepEqual(await response.json(), {
    query: 'test',
    answer: 'answer',
    results: [{ title: 'source', url: 'https://example.com/', score: 0.9, content: 'text' }],
    images: [],
    responseTime: 0.25,
    requestId: 'provider-id',
    usage: { credits: 1 },
  })
  assert.deepEqual(authentications, [{ token: 'test-session', tenantId: 'alpha' }])
})

test('existing SSE consumers retain one completed Markdown event and safely escaped source labels', async (t) => {
  const { request } = await startRouter(t, {
    fetchImpl: async () =>
      Response.json({
        answer: 'answer',
        results: [
          { title: 'source [label]\nnew line', url: 'https://example.com/article', published_date: '2026-11-09' },
        ],
      }),
  })
  for (const Accept of ['text/event-stream', '*/*']) {
    const response = await request({ query: 'test' }, { Accept })
    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type'), /text\/event-stream/)
    const event = JSON.parse((await response.text()).slice('data: '.length).trim())
    assert.equal(event.done, true)
    assert.match(event.content, /answer\n\n来源/)
    assert.ok(event.content.includes('[source \\[label\\] new line](<https://example.com/article>) · 2026-11-09'))
  }
})

test('content negotiation honors an explicit JSON preference while empty searches remain usable in SSE', async (t) => {
  const { request } = await startRouter(t)
  const jsonResponse = await request({ query: 'test' }, { Accept: 'application/json, text/event-stream;q=0.5' })
  assert.match(jsonResponse.headers.get('Content-Type'), /application\/json/)
  assert.deepEqual(await jsonResponse.json(), { query: 'test', answer: '', results: [], images: [] })
  const sseResponse = await request({ query: 'test' }, { Accept: 'text/event-stream' })
  assert.match(await sseResponse.text(), /没有找到相关网页/)
})

test('missing sessions and mismatched tenants cannot reach the provider', async (t) => {
  const { request } = await startRouter(t, { fetchImpl: () => assert.fail('upstream was called') })
  for (const headers of [{ Authorization: '' }, { 'X-Tenant-ID': 'beta' }]) {
    const response = await request({ query: 'test' }, headers)
    assert.equal(response.status, 401)
    assert.equal((await response.json()).error, 'unauthorized')
  }
})

test('valid sessions still require AI permission and a configured server key', async (t) => {
  const denied = await startRouter(t, {
    permissions: ['profile:read'],
    fetchImpl: () => assert.fail('upstream was called'),
  })
  const forbidden = await denied.request()
  assert.equal(forbidden.status, 403)
  assert.equal((await forbidden.json()).error, 'forbidden')
  const absent = await startRouter(t, { apiKey: null, fetchImpl: () => assert.fail('upstream was called') })
  const unconfigured = await absent.request()
  assert.equal(unconfigured.status, 503)
  assert.equal((await unconfigured.json()).error, 'tavily_not_configured')
})

test('invalid options are rejected before consuming a search allowance', async (t) => {
  let upstreamCalls = 0
  const { request } = await startRouter(t, {
    searchLimit: 1,
    fetchImpl: async () => {
      upstreamCalls += 1
      return Response.json({})
    },
  })
  for (const [body, error] of [
    [{ query: ' ' }, 'invalid_query'],
    [{ query: 'test', max_results: 21 }, 'invalid_search_options'],
    [{ query: 'test', api_key: 'browser-key' }, 'invalid_search_options'],
  ]) {
    const response = await request(body, { Accept: 'application/json' })
    assert.equal(response.status, 400)
    assert.equal((await response.json()).error, error)
  }
  assert.equal((await request()).status, 200)
  const limited = await request()
  assert.equal(limited.status, 429)
  assert.equal((await limited.json()).error, 'search_rate_limited')
  assert.ok(Number(limited.headers.get('Retry-After')) > 0)
  assert.equal(upstreamCalls, 1)
})

test('shared production limiters retain their retry contract', async (t) => {
  const { request } = await startRouter(t, {
    searchLimiter: async (key, limit) => {
      assert.equal(key, 'tavily:alpha:member-1')
      assert.equal(limit, 20)
      throw Object.assign(new Error('limited'), { code: 'login_rate_limited' })
    },
    fetchImpl: () => assert.fail('upstream was called'),
  })
  const response = await request()
  assert.equal(response.status, 429)
  assert.equal(response.headers.get('Retry-After'), '600')
  assert.equal((await response.json()).error, 'search_rate_limited')
})

test('provider quota errors are typed without exposing credentials or provider response bodies', async (t) => {
  const { request } = await startRouter(t, {
    fetchImpl: async () => Response.json({ detail: 'server-only-test-key' }, { status: 433 }),
  })
  const response = await request({ query: 'test' }, { Accept: 'application/json' })
  assert.equal(response.status, 429)
  assert.deepEqual(await response.json(), { error: 'tavily_quota_exceeded' })
})

test('disconnecting a browser request aborts the injected provider fetch', { timeout: 5000 }, async (t) => {
  let started
  let stopped
  const providerStarted = new Promise((resolve) => {
    started = resolve
  })
  const providerStopped = new Promise((resolve) => {
    stopped = resolve
  })
  const { request } = await startRouter(t, {
    fetchImpl: async (_url, init) => {
      started()
      return new Promise((_resolve, reject) =>
        init.signal.addEventListener(
          'abort',
          () => {
            stopped()
            reject(new DOMException('Cancelled', 'AbortError'))
          },
          { once: true }
        )
      )
    },
  })
  const controller = new AbortController()
  const pending = request({ query: 'test' }, { Accept: 'application/json' }, controller.signal)
  await providerStarted
  controller.abort()
  await assert.rejects(pending, (error) => error.name === 'AbortError')
  await providerStopped
})
