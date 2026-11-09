import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { mkdtemp, rm } from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import test from 'node:test'
import { createServer as createViteServer } from 'vite'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { createDevProxy } from '../build/dev-proxy.ts'

let importId = 0
async function loadWebpackProxy(env) {
  const keys = ['TRACKING_API_PORT', 'ENTERPRISE_API_TARGET', 'TRACKING_API_TARGET']
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
  try {
    for (const key of keys) {
      if (env[key] === undefined) delete process.env[key]
      else process.env[key] = env[key]
    }
    return (await import(`../build/webpack/dev.proxy.js?fixture=${++importId}`)).default
  } finally {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key]
      else process.env[key] = previous[key]
    }
  }
}

for (const [name, env, expected] of [
  ['default API port', {}, 'http://127.0.0.1:5200'],
  ['allocated API port', { TRACKING_API_PORT: '5279' }, 'http://127.0.0.1:5279'],
  [
    'explicit Enterprise target',
    { TRACKING_API_PORT: '5279', ENTERPRISE_API_TARGET: 'https://enterprise.example.test' },
    'https://enterprise.example.test',
  ],
]) {
  test(`both dev servers send AI and existing Enterprise routes to the ${name}`, async () => {
    const vite = createDevProxy(env)
    const webpackProxy = await loadWebpackProxy(env)
    const routes = ['/api/auth', '/api/admin', '/api/permissions', '/api/roles', '/api/events', '/api/ai']
    for (const route of routes) {
      const target = webpackProxy.find(({ context }) => context.includes(route))
      assert.ok(vite[route], `Vite must proxy ${route}`)
      assert.ok(target, `Webpack must proxy ${route}`)
      for (const options of [vite[route], target]) {
        assert.equal(options.target, expected)
        assert.equal(options.changeOrigin, true)
        assert.equal(options.ws, true)
      }
    }
  })
}

async function startUpstream(t) {
  const server = createHttpServer(async (request, response) => {
    const chunks = []
    for await (const chunk of request) chunks.push(chunk)
    const result = {
      url: request.url,
      method: request.method,
      authorization: request.headers.authorization,
      tenant: request.headers['x-tenant-id'],
      body: JSON.parse(Buffer.concat(chunks).toString()),
    }
    response.setHeader('X-Proxy-Fixture', 'enterprise-api')
    if (request.headers.accept === 'text/event-stream') {
      response.writeHead(200, { 'Content-Type': 'text/event-stream' })
      response.write(`event: result\ndata: ${JSON.stringify(result)}\n\n`)
      response.end('event: done\ndata: {}\n\n')
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(result))
    }
  })
  t.after(() => new Promise((resolve) => server.close(resolve)))
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  return `http://127.0.0.1:${server.address().port}`
}

async function startFrontend(t, bundler, env) {
  const root = await mkdtemp(path.join(tmpdir(), 'pro-react-proxy-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  let server
  if (bundler === 'Vite') {
    server = await createViteServer({
      configFile: false,
      root,
      appType: 'custom',
      logLevel: 'silent',
      server: { host: '127.0.0.1', port: 0, watch: null, proxy: createDevProxy(env) },
      optimizeDeps: { noDiscovery: true, include: [] },
      plugins: [
        {
          name: 'frontend-fallback',
          configureServer(instance) {
            return () => instance.middlewares.use((_request, response) => response.end('frontend fallback'))
          },
        },
      ],
    })
    t.after(() => server.close())
    await server.listen()
    return `http://127.0.0.1:${server.httpServer.address().port}`
  }
  const compiler = webpack({
    mode: 'development',
    entry: {},
    output: { path: path.join(root, 'dist') },
    infrastructureLogging: { level: 'none' },
  })
  server = new WebpackDevServer(
    {
      host: '127.0.0.1',
      port: 0,
      hot: false,
      liveReload: false,
      client: false,
      webSocketServer: false,
      static: false,
      devMiddleware: { stats: 'none' },
      proxy: await loadWebpackProxy(env),
      setupMiddlewares(middlewares) {
        middlewares.push({
          name: 'frontend-fallback',
          middleware: (_request, response) => response.end('frontend fallback'),
        })
        return middlewares
      },
    },
    compiler
  )
  t.after(() => server.stop())
  await server.start()
  return `http://127.0.0.1:${server.server.address().port}`
}

for (const bundler of ['Vite', 'Webpack']) {
  test(`${bundler} forwards JSON and SSE search requests to the API instead of the frontend`, async (t) => {
    const upstream = await startUpstream(t)
    const frontend = await startFrontend(t, bundler, { ENTERPRISE_API_TARGET: upstream })
    const url = '/api/ai/tavily-search?fixture=search'
    const body = { query: 'accessible dashboards', search_depth: 'basic' }
    const expected = { url, method: 'POST', authorization: 'Bearer fixture-token', tenant: 'fixture', body }
    for (const accept of ['application/json', 'text/event-stream']) {
      const response = await globalThis.fetch(`${frontend}${url}`, {
        method: 'POST',
        headers: {
          Accept: accept,
          'Content-Type': 'application/json',
          Authorization: expected.authorization,
          'X-Tenant-ID': expected.tenant,
        },
        body: JSON.stringify(body),
        signal: globalThis.AbortSignal.timeout(5000),
      })
      assert.equal(response.status, 200)
      assert.equal(response.headers.get('x-proxy-fixture'), 'enterprise-api')
      assert.match(response.headers.get('content-type'), new RegExp(accept))
      if (accept === 'application/json') assert.deepEqual(await response.json(), expected)
      else
        assert.equal(
          await response.text(),
          `event: result\ndata: ${JSON.stringify(expected)}\n\nevent: done\ndata: {}\n\n`
        )
    }
  })
}
