import { act, render } from '@testing-library/react'
import useWebsocket, { type UseWebsocketOptions } from './index'

class MockWebSocket {
  static instances: MockWebSocket[] = []
  readyState = 0
  onopen: ((event: Event) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: Event) => void) | null = null
  onclose: ((event: CloseEvent) => void) | null = null
  send = jest.fn()
  close = jest.fn(() => {
    this.readyState = 3
    this.onclose?.(new CloseEvent('close'))
  })

  constructor(readonly url: string) {
    MockWebSocket.instances.push(this)
  }

  open() {
    this.readyState = 1
    this.onopen?.(new Event('open'))
  }

  receive(data: unknown) {
    this.onmessage?.({ data } as MessageEvent)
  }

  terminate() {
    this.readyState = 3
    this.onclose?.(new CloseEvent('close'))
  }
}

let latest: ReturnType<typeof useWebsocket> | undefined
const Probe = (props: UseWebsocketOptions) => {
  latest = useWebsocket(props)
  return null
}

const getLatest = () => {
  if (!latest) throw new Error('WebSocket hook has not rendered')
  return latest
}

describe('useWebsocket lifecycle', () => {
  const originalWebSocket = global.WebSocket

  beforeEach(() => {
    MockWebSocket.instances = []
    latest = undefined
    global.WebSocket = MockWebSocket as unknown as typeof WebSocket
  })

  afterEach(() => {
    global.WebSocket = originalWebSocket
    jest.useRealTimers()
  })

  it('gates the connection, reconnects on URL changes, and ignores events from an old socket', () => {
    const { rerender, unmount } = render(<Probe url="ws://first" verify={false} />)
    expect(MockWebSocket.instances).toHaveLength(0)

    rerender(<Probe url="ws://first" verify />)
    const first = MockWebSocket.instances[0]
    expect(first.url).toBe('ws://first')

    act(() => first.open())
    act(() => first.receive('first-session-data'))
    expect(getLatest().readyState.key).toBe(1)
    expect(getLatest().wsData).toBe('first-session-data')

    const staleClose = first.onclose
    act(() => rerender(<Probe url="ws://second" verify />))
    expect(first.close).toHaveBeenCalledTimes(1)
    expect(getLatest().wsData).toBeNull()
    const second = MockWebSocket.instances[1]
    expect(second.url).toBe('ws://second')

    act(() => {
      second.open()
      getLatest().reconnect()
      staleClose?.(new CloseEvent('close'))
    })

    expect(MockWebSocket.instances).toHaveLength(3)
    expect(getLatest().readyState.key).toBe(0)
    unmount()
    expect(MockWebSocket.instances[2].close).toHaveBeenCalledTimes(1)
  })

  it('decodes received messages, exposes send status, and suppresses retries after a manual close', () => {
    jest.useFakeTimers()
    const onMessage = jest.fn()
    render(
      <Probe
        url="ws://messages"
        verify
        autoReconnect
        reconnectDelayMs={50}
        decodeMessage={(event) => JSON.parse(event.data as string) as { value: number }}
        onMessage={onMessage}
      />
    )
    const socket = MockWebSocket.instances[0]

    expect(getLatest().sendMessage('before-open')).toBe(false)
    act(() => socket.open())
    act(() => socket.receive('{"value":7}'))
    expect(getLatest().wsData).toEqual({ value: 7 })
    expect(onMessage).toHaveBeenCalledWith({ value: 7 }, expect.objectContaining({ data: '{"value":7}' }))
    expect(getLatest().sendMessage('hello')).toBe(true)
    expect(socket.send).toHaveBeenCalledWith('hello')

    act(() => getLatest().closeWebSocket())
    act(() => jest.advanceTimersByTime(500))
    expect(MockWebSocket.instances).toHaveLength(1)
    expect(getLatest().readyState.key).toBe(3)
  })

  it('retries unexpected closes with bounded exponential delay', () => {
    jest.useFakeTimers()
    render(<Probe url="ws://retry" verify autoReconnect reconnectDelayMs={100} maxReconnectDelayMs={250} />)

    act(() => MockWebSocket.instances[0].terminate())
    act(() => jest.advanceTimersByTime(99))
    expect(MockWebSocket.instances).toHaveLength(1)
    act(() => jest.advanceTimersByTime(1))
    expect(MockWebSocket.instances).toHaveLength(2)

    act(() => MockWebSocket.instances[1].terminate())
    act(() => jest.advanceTimersByTime(199))
    expect(MockWebSocket.instances).toHaveLength(2)
    act(() => jest.advanceTimersByTime(1))
    expect(MockWebSocket.instances).toHaveLength(3)
  })

  it('stops reconnecting when the configured attempt limit is reached', () => {
    jest.useFakeTimers()
    render(<Probe url="ws://limited-retry" verify autoReconnect reconnectDelayMs={25} maxReconnectAttempts={1} />)

    act(() => MockWebSocket.instances[0].terminate())
    act(() => jest.advanceTimersByTime(25))
    expect(MockWebSocket.instances).toHaveLength(2)

    act(() => MockWebSocket.instances[1].terminate())
    act(() => jest.advanceTimersByTime(500))
    expect(MockWebSocket.instances).toHaveLength(2)
  })
})
