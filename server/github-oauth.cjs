const crypto = require('node:crypto')

const STATE_TTL_MS = 5 * 60 * 1000
const SESSION_TTL_MS = 8 * 60 * 60 * 1000
const COOKIE_PATH = '/api/demo/github'
const STATE_COOKIE = 'gh_demo_state'
const SESSION_COOKIE = 'gh_demo_sid'
const METHODS = { config: ['GET'], start: ['GET'], callback: ['GET'], session: ['GET', 'DELETE'] }

function configured({ clientId, clientSecret, callbackUrl, appUrl, sessionSecret }) {
  if (!clientId || !clientSecret || !callbackUrl || !appUrl || typeof sessionSecret !== 'string') return false
  if (Buffer.byteLength(sessionSecret, 'utf8') < 32) return false
  try {
    const callback = new URL(callbackUrl)
    const app = new URL(appUrl)
    const local = ['localhost', '127.0.0.1'].includes(callback.hostname)
    return (
      callback.origin === app.origin &&
      callback.pathname === `${COOKIE_PATH}/callback` &&
      !callback.search &&
      !callback.hash &&
      !app.search &&
      !app.hash &&
      (callback.protocol === 'https:' || (local && callback.protocol === 'http:'))
    )
  } catch {
    return false
  }
}

function cookieValue(request, name) {
  const match = request.headers.cookie?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match?.[1] || ''
}

function cookie(name, value, maxAge, secure) {
  return `${name}=${value}; Path=${COOKIE_PATH}; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`
}

function sign(payload, secret, purpose) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', secret).update(`${purpose}.${data}`).digest('base64url')
  return `${data}.${signature}`
}

function verify(value, secret, purpose) {
  if (typeof value !== 'string' || value.length > 3500) return null
  const parts = value.split('.')
  if (parts.length !== 2 || !parts.every((part) => /^[A-Za-z0-9_-]+$/.test(part))) return null
  const expected = crypto.createHmac('sha256', secret).update(`${purpose}.${parts[0]}`).digest()
  const received = Buffer.from(parts[1], 'base64url')
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) return null
  try {
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'))
    return payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : null
  } catch {
    return null
  }
}

function equalNonce(left, right) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(left) || !/^[A-Za-z0-9_-]{43}$/.test(right)) return false
  return crypto.timingSafeEqual(Buffer.from(left), Buffer.from(right))
}

function sendJson(response, status, payload) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

function sendStatus(response, status) {
  response.statusCode = status
  response.end()
}

async function exchangeCode({ code, clientId, clientSecret, callbackUrl, codeVerifier }) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl,
      code_verifier: codeVerifier,
    }),
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error('GitHub token exchange failed')
  const payload = await response.json()
  if (typeof payload.access_token !== 'string' || !payload.access_token) throw new Error('GitHub token missing')
  return payload.access_token
}

async function fetchUser(accessToken) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'pro-react-admin',
    },
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error('GitHub user request failed')
  return response.json()
}

function publicUser(value) {
  if (!value || !Number.isSafeInteger(value.id) || value.id <= 0 || typeof value.login !== 'string' || !value.login)
    throw new Error('Invalid GitHub user')
  return {
    id: value.id,
    login: value.login.slice(0, 100),
    name: typeof value.name === 'string' && value.name ? value.name.slice(0, 200) : value.login.slice(0, 100),
    email: '',
    avatar_url: typeof value.avatar_url === 'string' ? value.avatar_url.slice(0, 500) : '',
    html_url: typeof value.html_url === 'string' ? value.html_url.slice(0, 500) : '',
  }
}

function createHandler(options) {
  const enabled = configured(options)
  const secure = enabled && new URL(options.callbackUrl).protocol === 'https:'
  const providerExchange = options.exchangeCode || exchangeCode
  const providerUser = options.fetchUser || fetchUser

  function finish(response, error) {
    const destination = new URL(options.appUrl)
    destination.hash = `/auth/callback${error ? `?error=${encodeURIComponent(error)}` : ''}`
    response.statusCode = 302
    response.setHeader('Location', destination.toString())
    response.end()
  }

  return async (request, response, action) => {
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('Referrer-Policy', 'no-referrer')
    if (!METHODS[action]) return sendStatus(response, 404)
    if (!METHODS[action].includes(request.method)) return sendStatus(response, 405)
    if (action === 'config') return sendJson(response, 200, { enabled, appUrl: enabled ? options.appUrl : null })
    if (!enabled) return sendStatus(response, 404)

    if (action === 'start') {
      const nonce = crypto.randomBytes(32).toString('base64url')
      const verifier = crypto.randomBytes(32).toString('base64url')
      const challenge = crypto.createHash('sha256').update(verifier).digest('base64url')
      const state = sign({ nonce, verifier, expiresAt: Date.now() + STATE_TTL_MS }, options.sessionSecret, 'state')
      response.setHeader('Set-Cookie', cookie(STATE_COOKIE, state, STATE_TTL_MS / 1000, secure))
      const authorize = new URL('https://github.com/login/oauth/authorize')
      authorize.search = new URLSearchParams({
        client_id: options.clientId,
        redirect_uri: options.callbackUrl,
        scope: 'read:user',
        state: nonce,
        code_challenge: challenge,
        code_challenge_method: 'S256',
      }).toString()
      response.statusCode = 302
      response.setHeader('Location', authorize.toString())
      return response.end()
    }

    if (action === 'callback') {
      const query = new URL(request.url || '/', 'http://localhost').searchParams
      const states = query.getAll('state')
      const state = verify(cookieValue(request, STATE_COOKIE), options.sessionSecret, 'state')
      response.setHeader('Set-Cookie', cookie(STATE_COOKIE, '', 0, secure))
      if (
        !state ||
        !Number.isFinite(state.expiresAt) ||
        state.expiresAt <= Date.now() ||
        states.length !== 1 ||
        !equalNonce(states[0], state.nonce) ||
        !/^[A-Za-z0-9_-]{43}$/.test(state.verifier)
      )
        return finish(response, 'invalid_state')
      if (query.get('error') === 'access_denied') return finish(response, 'access_denied')
      const codes = query.getAll('code')
      if (codes.length !== 1 || !codes[0]) return finish(response, 'missing_code')

      try {
        const accessToken = await providerExchange({
          code: codes[0],
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          callbackUrl: options.callbackUrl,
          codeVerifier: state.verifier,
        })
        const user = publicUser(await providerUser(accessToken))
        const session = sign({ user, expiresAt: Date.now() + SESSION_TTL_MS }, options.sessionSecret, 'session')
        response.setHeader('Set-Cookie', [
          cookie(STATE_COOKIE, '', 0, secure),
          cookie(SESSION_COOKIE, session, SESSION_TTL_MS / 1000, secure),
        ])
        return finish(response)
      } catch (error) {
        console.error('GitHub demo login failed:', error instanceof Error ? error.message : 'unknown')
        return finish(response, 'provider_failed')
      }
    }

    if (request.method === 'DELETE') {
      if (request.headers.origin !== new URL(options.appUrl).origin) return sendStatus(response, 403)
      response.setHeader('Set-Cookie', cookie(SESSION_COOKIE, '', 0, secure))
      return sendStatus(response, 204)
    }

    const session = verify(cookieValue(request, SESSION_COOKIE), options.sessionSecret, 'session')
    if (!session || !Number.isFinite(session.expiresAt) || session.expiresAt <= Date.now()) {
      response.setHeader('Set-Cookie', cookie(SESSION_COOKIE, '', 0, secure))
      return sendJson(response, 401, { error: 'not_authenticated' })
    }
    try {
      return sendJson(response, 200, { user: publicUser(session.user) })
    } catch {
      return sendJson(response, 401, { error: 'not_authenticated' })
    }
  }
}

module.exports = { createHandler }
