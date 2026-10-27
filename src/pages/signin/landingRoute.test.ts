import { chooseDemoLandingRoute } from './landingRoute'

describe('chooseDemoLandingRoute', () => {
  const routes = ['/', '/administration/users']

  it('resumes an accessible local workflow after sign-in', () => {
    expect(chooseDemoLandingRoute(routes, '/administration/users')).toBe('/administration/users')
  })

  it.each(['//another.example', '/administration/users?debug=1', '/administration\\users', '/missing'])(
    'does not follow an untrusted destination: %s',
    (requestedRoute) => {
      expect(chooseDemoLandingRoute(routes, requestedRoute)).toBe('/')
    }
  )

  it('falls back to the first granted route or the forbidden page', () => {
    expect(chooseDemoLandingRoute(['/administration/users'], null)).toBe('/administration/users')
    expect(chooseDemoLandingRoute([], null)).toBe('/403')
  })
})
