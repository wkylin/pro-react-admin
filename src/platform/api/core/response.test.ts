import { assertSuccessfulPayload, unwrapPayload } from './response'
import { handleAuthenticationFailure } from '@platform/auth/model/session'

test('preserves envelopes and unwraps only successful business responses', () => {
  const response = { code: 0, data: { count: 1 } }
  expect(assertSuccessfulPayload(response, 200)).toBe(response)
  expect(unwrapPayload(response)).toEqual({ count: 1 })
  expect(() => unwrapPayload({ code: 403, data: { permissions: ['*:*'] } })).toThrow()
})

test('forbidden requests preserve the session, unauthorized requests clear it', () => {
  localStorage.setItem('token', JSON.stringify({ token: 'reader' }))
  handleAuthenticationFailure(403)
  expect(localStorage.getItem('token')).not.toBeNull()
  handleAuthenticationFailure(401)
  expect(localStorage.getItem('token')).toBeNull()
})
