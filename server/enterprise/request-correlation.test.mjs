import { test } from 'node:test'
import assert from 'node:assert/strict'
import express from 'express'
import { createEnterpriseRouter } from './router.cjs'

test('Enterprise responses and sanitized logs share a request ID', async (t) => {
  const completed = []
  const failures = []
  const app = express()
  app.use(express.json())
  app.use(
    '/api',
    createEnterpriseRouter(
      {
        async login(body) {
          if (body.fail) throw new Error('secret from backend')
          return { ok: true }
        },
      },
      {
        businessErrorClass: class BusinessError extends Error {},
        requestLogger: {
          info(entry) {
            completed.push(JSON.parse(entry))
          },
          error(entry) {
            failures.push(JSON.parse(entry))
          },
        },
      }
    )
  )
  const server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(() => new Promise((resolve) => server.close(resolve)))
  const url = `http://127.0.0.1:${server.address().port}/api/auth/login?code=secret-query`
  const supplied = 'client-request-1234'
  const good = await globalThis.fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-request-id': supplied },
    body: JSON.stringify({ password: 'secret-password' }),
  })
  assert.equal(good.status, 200)
  assert.equal(good.headers.get('x-request-id'), supplied)
  const bad = await globalThis.fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-request-id': 'invalid request id!' },
    body: JSON.stringify({ fail: true, password: 'secret-password' }),
  })
  assert.equal(bad.status, 500)
  const generated = bad.headers.get('x-request-id')
  assert.match(generated, /^[a-f0-9-]{36}$/)
  assert.equal(completed.length, 2)
  assert.equal(completed[0].requestId, supplied)
  assert.equal(completed[0].route, '/api/auth/login')
  assert.equal(completed[1].requestId, generated)
  assert.equal(failures[0].requestId, generated)
  for (const entry of [...completed, ...failures]) {
    assert.doesNotMatch(JSON.stringify(entry), /secret-query|secret-password|secret from backend/)
  }
})
