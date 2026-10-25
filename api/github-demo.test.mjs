import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { createServer } from 'node:http'
import { afterEach, test } from 'node:test'
import express from 'express'
import githubDemo from './github-demo.cjs'

const servers = []

afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise((resolve) => server.close(resolve))))
})

async function start(options = {}) {
  const app = express()
  app.use(
    '/api/demo/github',
    githubDemo.createRouter({
      clientId: 'test-client',
      clientSecret: 'test-secret',
      callbackUrl: 'http://127.0.0.1:8080/api/demo/github/callback',
      appUrl: 'http://127.0.0.1:8080/',
      sessionSecret: 'test-only-github-session-secret-32-bytes',
      exchangeCode: async () => 'github-access-token',
      fetchUser: async () => ({ id: 42, login: 'octocat', name: 'Octocat', avatar_url: '', html_url: '' }),
      ...options,
    })
  )
  const server = createServer(app)
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  servers.push(server)
  return `http://127.0.0.1:${server.address().port}/api/demo/github`
}

test('GitHub demo login validates state and stores only an opaque server session', async () => {
  let exchanges = 0
  let codeVerifier = ''
  const exchangeCode = async (options) => {
    exchanges += 1
    codeVerifier = options.codeVerifier
    return 'github-access-token'
  }
  const base = await start({ exchangeCode })
  const config = await fetch(`${base}/config`)
  assert.deepEqual(await config.json(), { enabled: true, appUrl: 'http://127.0.0.1:8080/' })

  const begin = await fetch(`${base}/start`, { redirect: 'manual' })
  const authorize = new URL(begin.headers.get('location'))
  const firstState = authorize.searchParams.get('state')
  assert.equal(authorize.host, 'github.com')
  assert.equal(authorize.searchParams.get('redirect_uri'), 'http://127.0.0.1:8080/api/demo/github/callback')
  assert.equal(authorize.searchParams.get('code_challenge_method'), 'S256')
  assert.ok(firstState)
  assert.match(begin.headers.get('set-cookie'), /HttpOnly/)

  const rejected = await fetch(`${base}/callback?code=valid&state=${firstState}`, { redirect: 'manual' })
  assert.match(rejected.headers.get('location'), /error=invalid_state/)
  assert.equal(exchanges, 0)

  const otherInstance = await start({ exchangeCode })
  const retry = await fetch(`${base}/start`, { redirect: 'manual' })
  const state = new URL(retry.headers.get('location')).searchParams.get('state')
  const stateCookie = retry.headers.get('set-cookie').split(';')[0]
  const challenge = new URL(retry.headers.get('location')).searchParams.get('code_challenge')
  const callback = await fetch(`${otherInstance}/callback?code=valid&state=${state}`, {
    headers: { Cookie: stateCookie },
    redirect: 'manual',
  })
  assert.equal(callback.status, 302)
  assert.equal(callback.headers.get('location'), 'http://127.0.0.1:8080/#/auth/callback')
  assert.equal(exchanges, 1)
  assert.equal(challenge, crypto.createHash('sha256').update(codeVerifier).digest('base64url'))
  const sessionCookie = callback.headers
    .getSetCookie()
    .find((value) => value.startsWith('gh_demo_sid='))
    .split(';')[0]
  assert.match(callback.headers.get('set-cookie'), /HttpOnly/)
  assert.ok(!callback.headers.get('set-cookie').includes('github-access-token'))

  const session = await fetch(`${base}/session`, { headers: { Cookie: sessionCookie } })
  assert.deepEqual(await session.json(), {
    user: { id: 42, login: 'octocat', name: 'Octocat', email: '', avatar_url: '', html_url: '' },
  })
  assert.equal(session.headers.get('cache-control'), 'no-store')

  const replay = await fetch(`${base}/callback?code=valid&state=${state}`, { redirect: 'manual' })
  assert.match(replay.headers.get('location'), /error=invalid_state/)
  assert.equal(exchanges, 1)

  const foreignLogout = await fetch(`${base}/session`, {
    method: 'DELETE',
    headers: { Cookie: sessionCookie, Origin: 'https://untrusted.example' },
  })
  assert.equal(foreignLogout.status, 403)

  const logout = await fetch(`${base}/session`, {
    method: 'DELETE',
    headers: { Cookie: sessionCookie, Origin: 'http://127.0.0.1:8080' },
  })
  assert.equal(logout.status, 204)
  assert.match(logout.headers.get('set-cookie'), /Max-Age=0/)
  assert.equal((await fetch(`${base}/session`)).status, 401)
})

test('tampered session cookies and missing signing secret fail closed', async () => {
  const base = await start()
  const begin = await fetch(`${base}/start`, { redirect: 'manual' })
  const state = new URL(begin.headers.get('location')).searchParams.get('state')
  const callback = await fetch(`${base}/callback?code=valid&state=${state}`, {
    headers: { Cookie: begin.headers.get('set-cookie').split(';')[0] },
    redirect: 'manual',
  })
  const sessionCookie = callback.headers
    .getSetCookie()
    .find((value) => value.startsWith('gh_demo_sid='))
    .split(';')[0]
  const prefix = 'gh_demo_sid='
  const value = sessionCookie.slice(prefix.length)
  const tampered = `${prefix}${value[0] === 'A' ? 'B' : 'A'}${value.slice(1)}`
  assert.equal((await fetch(`${base}/session`, { headers: { Cookie: tampered } })).status, 401)

  const disabled = await start({ sessionSecret: '' })
  assert.deepEqual(await (await fetch(`${disabled}/config`)).json(), { enabled: false, appUrl: null })
  assert.equal((await fetch(`${disabled}/start`, { redirect: 'manual' })).status, 404)
})

test('GitHub denial consumes the authorization state without creating a session', async () => {
  let exchanges = 0
  const base = await start({
    exchangeCode: async () => {
      exchanges += 1
      return 'github-access-token'
    },
  })
  const begin = await fetch(`${base}/start`, { redirect: 'manual' })
  const state = new URL(begin.headers.get('location')).searchParams.get('state')
  const stateCookie = begin.headers.get('set-cookie').split(';')[0]
  const denied = await fetch(`${base}/callback?error=access_denied&state=${state}`, {
    headers: { Cookie: stateCookie },
    redirect: 'manual',
  })
  assert.match(denied.headers.get('location'), /error=access_denied/)
  assert.equal(exchanges, 0)
  assert.equal((await fetch(`${base}/session`)).status, 401)
})

test('GitHub demo stays disabled without complete server configuration', async () => {
  const base = await start({ clientSecret: '' })
  assert.deepEqual(await (await fetch(`${base}/config`)).json(), { enabled: false, appUrl: null })
  assert.equal((await fetch(`${base}/start`, { redirect: 'manual' })).status, 404)
})
