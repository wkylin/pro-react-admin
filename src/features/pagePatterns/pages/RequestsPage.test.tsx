import { StrictMode } from 'react'
import { act, render, screen } from '@testing-library/react'

const listRequests = jest.fn()
const subscribe = jest.fn(() => () => undefined)
const provider = { listRequests, subscribe }
const t = (key: string) => key
const navigate = jest.fn()

jest.doMock('react-i18next', () => ({ useTranslation: () => ({ t, i18n: { resolvedLanguage: 'en' } }) }))
jest.doMock('react-router-dom', () => ({ useNavigate: () => navigate }))
jest.doMock('../model/ExampleRequestsProvider', () => ({ useExampleRequests: () => provider }))
jest.doMock('../components/PatternPage', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))
jest.doMock('antd', () => {
  const Container = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  return {
    Alert: Container,
    Button: Container,
    Card: Container,
    Input: Container,
    Space: Container,
    Tag: Container,
    Typography: { Text: Container },
  }
})
jest.doMock('@ant-design/icons', () => ({ PlusOutlined: () => null }))
jest.doMock('@wui/ResponsiveTable', () => {
  const React = jest.requireActual('react') as typeof import('react')
  // The real table loads once per instance; StrictMode effect replay must not cancel that load.
  function OneShotTable({
    fetchData,
  }: {
    fetchData: (page: number, pageSize: number) => Promise<{ items: { title: string }[] } | null>
  }) {
    const loaded = React.useRef(false)
    const [rows, setRows] = React.useState<{ title: string }[]>([])
    React.useEffect(() => {
      if (loaded.current) return
      loaded.current = true
      void fetchData(1, 8).then((result) => setRows(result?.items ?? []))
    }, [fetchData])
    return (
      <div>
        {rows.map((row) => (
          <span key={row.title}>{row.title}</span>
        ))}
      </div>
    )
  }
  return {
    __esModule: true,
    default: OneShotTable,
  }
})

const RequestsPage = require('./RequestsPage').default as typeof import('./RequestsPage').default

beforeEach(() => listRequests.mockReset())

test('StrictMode replay preserves the initial request and displays its result', async () => {
  let resolve!: (value: { items: { title: string }[]; total: number }) => void
  let signal!: AbortSignal
  listRequests.mockImplementation((_query, options) => {
    signal = options.signal
    return new Promise((done) => {
      resolve = done
    })
  })
  render(
    <StrictMode>
      <RequestsPage />
    </StrictMode>
  )
  expect(listRequests).toHaveBeenCalledTimes(1)
  expect(signal.aborted).toBe(false)
  await act(async () => resolve({ items: [{ title: 'Loaded example request' }], total: 1 }))
  expect(screen.getByText('Loaded example request')).toBeVisible()
})

test('a real unmount aborts the request and ignores its eventual result', async () => {
  let resolve!: (value: { items: { title: string }[]; total: number }) => void
  let signal!: AbortSignal
  listRequests.mockImplementation((_query, options) => {
    signal = options.signal
    return new Promise((done) => {
      resolve = done
    })
  })
  const view = render(
    <StrictMode>
      <RequestsPage />
    </StrictMode>
  )
  view.unmount()
  await act(async () => {
    await Promise.resolve()
  })
  expect(signal.aborted).toBe(true)
  await act(async () => resolve({ items: [{ title: 'Stale example request' }], total: 1 }))
  expect(screen.queryByText('Stale example request')).not.toBeInTheDocument()
})
