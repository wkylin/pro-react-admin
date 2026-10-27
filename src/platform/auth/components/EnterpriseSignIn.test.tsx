import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const loginEnterprise = jest.fn()
const setEnterpriseAuthenticated = jest.fn().mockResolvedValue(undefined)
const navigate = jest.fn()
jest.doMock('../api/enterprise', () => ({ loginEnterprise }))
jest.doMock('../services/authService', () => ({ authService: { setEnterpriseAuthenticated } }))
jest.doMock('react-router-dom', () => ({ useNavigate: () => navigate }))
jest.doMock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
const { default: EnterpriseSignIn } = require('./EnterpriseSignIn') as typeof import('./EnterpriseSignIn')

const originalMessageChannel = globalThis.MessageChannel
const originalMatchMedia = window.matchMedia
beforeAll(() => {
  if (!originalMessageChannel) {
    class TestMessageChannel {
      port1 = { onmessage: null as (() => void) | null }
      port2 = { postMessage: () => setTimeout(() => this.port1.onmessage?.(), 0) }
    }
    Object.defineProperty(globalThis, 'MessageChannel', { configurable: true, value: TestMessageChannel })
  }
  if (!originalMatchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    })
  }
})
afterAll(() => {
  if (!originalMessageChannel) delete (globalThis as { MessageChannel?: typeof MessageChannel }).MessageChannel
  if (!originalMatchMedia) delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia
})

beforeEach(() => {
  loginEnterprise.mockReset()
  setEnterpriseAuthenticated.mockClear()
  navigate.mockClear()
})

test('requires a second factor before creating an enterprise session and retains first-step credentials', async () => {
  const session = { token: 'session-token', tenantId: 'acme', expiresAt: Date.now() + 60_000, user: {} }
  loginEnterprise.mockResolvedValueOnce({ totpRequired: true }).mockResolvedValueOnce(session)
  render(<EnterpriseSignIn />)

  fireEvent.change(screen.getByLabelText('identity.tenant'), { target: { value: 'acme' } })
  fireEvent.change(screen.getByLabelText('admin.email'), { target: { value: 'alice@example.com' } })
  fireEvent.change(screen.getByLabelText('identity.password'), { target: { value: 'secret-password' } })
  fireEvent.click(screen.getByRole('button', { name: 'identity.signIn' }))

  await screen.findByText('identity.secondFactorRequired')
  expect(loginEnterprise).toHaveBeenCalledWith({
    tenantId: 'acme',
    email: 'alice@example.com',
    password: 'secret-password',
  })
  expect(setEnterpriseAuthenticated).not.toHaveBeenCalled()

  fireEvent.change(screen.getByLabelText('identity.totpCode'), { target: { value: '123456' } })
  fireEvent.click(screen.getByRole('button', { name: 'identity.verifyAndSignIn' }))
  await waitFor(() => expect(loginEnterprise).toHaveBeenCalledTimes(2))
  expect(loginEnterprise).toHaveBeenLastCalledWith({
    tenantId: 'acme',
    email: 'alice@example.com',
    password: 'secret-password',
    totpCode: '123456',
  })
  await waitFor(() => expect(setEnterpriseAuthenticated).toHaveBeenCalledWith(session))
  expect(navigate).toHaveBeenCalledWith('/', { replace: true })
})

test('shows and fills the local SQLite demo account only for the development starter', async () => {
  const originalNodeEnv = process.env.NODE_ENV
  const originalDemo = process.env.REACT_APP_ENTERPRISE_LOCAL_DEMO
  process.env.NODE_ENV = 'development'
  process.env.REACT_APP_ENTERPRISE_LOCAL_DEMO = 'true'
  try {
    loginEnterprise.mockResolvedValue({
      token: 'session-token',
      tenantId: 'demo',
      expiresAt: Date.now() + 60_000,
      user: {},
    })
    const { rerender } = render(<EnterpriseSignIn />)
    expect(screen.getByText('identity.localDemoTitle')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'identity.fillLocalDemo' }))
    expect(screen.getByLabelText('identity.tenant')).toHaveValue('demo')
    expect(screen.getByLabelText('admin.email')).toHaveValue('admin@demo.local')
    expect(screen.getByLabelText('identity.password')).toHaveValue('DemoAdmin123!')
    fireEvent.click(screen.getByRole('button', { name: 'identity.signIn' }))
    await waitFor(() =>
      expect(loginEnterprise).toHaveBeenCalledWith({
        tenantId: 'demo',
        email: 'admin@demo.local',
        password: 'DemoAdmin123!',
      })
    )
    process.env.REACT_APP_ENTERPRISE_LOCAL_DEMO = 'false'
    rerender(<EnterpriseSignIn />)
    expect(screen.queryByText('identity.localDemoTitle')).not.toBeInTheDocument()
  } finally {
    process.env.NODE_ENV = originalNodeEnv
    if (originalDemo === undefined) delete process.env.REACT_APP_ENTERPRISE_LOCAL_DEMO
    else process.env.REACT_APP_ENTERPRISE_LOCAL_DEMO = originalDemo
  }
})
