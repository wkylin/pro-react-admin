import { act, render, screen } from '@testing-library/react'
jest.mock('mermaid', () => ({ __esModule: true, default: { initialize: jest.fn(), render: jest.fn() } }))
jest.mock('markmap-lib', () => ({
  Transformer: class {
    transform() {
      return { root: { content: '<img src=x onerror=evil()><b>safe</b>', children: [] } }
    }
  },
}))
jest.mock('markmap-view', () => ({ Markmap: { create: jest.fn() } }))
jest.mock('./engines', () => ({
  loadMermaid: async () => require('mermaid').default,
  loadMarkmap: async () => [require('markmap-lib'), require('markmap-view')],
}))
const MermaidHooks = require('./mermaidHooks').default
const MarkmapHooks = require('./markmap').default
const mermaid = require('mermaid').default
const Markmap = require('markmap-view').Markmap
const tick = async () => {
  await act(async () => {
    jest.advanceTimersByTime(1)
    await Promise.resolve()
    await Promise.resolve()
  })
}
beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
})
afterEach(() => {
  jest.useRealTimers()
})
test('Mermaid serializes global config, ignores stale results, sanitizes and clears empty input', async () => {
  let resolveFirst!: (value: { svg: string }) => void
  mermaid.render
    .mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFirst = resolve
      })
    )
    .mockResolvedValueOnce({
      svg: '<svg xmlns="http://www.w3.org/2000/svg"><script>evil()</script><text>current</text></svg>',
    })
  const view = render(<MermaidHooks chart="old" debounceDelay={0} />)
  await tick()
  expect(mermaid.render).toHaveBeenCalledTimes(1)
  view.rerender(<MermaidHooks chart="new" debounceDelay={0} />)
  await tick()
  expect(mermaid.render).toHaveBeenCalledTimes(1)
  await act(async () => {
    resolveFirst({ svg: '<svg><text>stale</text></svg>' })
    await Promise.resolve()
    await Promise.resolve()
  })
  expect(screen.getByRole('img')).toHaveTextContent('current')
  expect(screen.getByRole('img').innerHTML).not.toMatch(/evil|stale|script/)
  expect(mermaid.initialize).toHaveBeenCalledWith(
    expect.objectContaining({ securityLevel: 'strict', startOnLoad: false })
  )
  view.rerender(<MermaidHooks chart="" debounceDelay={0} />)
  expect(screen.getByRole('img')).toBeEmptyDOMElement()
})
test('Markmap sanitizes node HTML and destroys the renderer on input change/unmount', async () => {
  const instance = {
    setData: jest.fn().mockResolvedValue(undefined),
    fit: jest.fn().mockResolvedValue(undefined),
    destroy: jest.fn(),
  }
  Markmap.create.mockReturnValue(instance)
  const view = render(<MarkmapHooks markmap="# first" debounceDelay={0} />)
  await tick()
  expect(instance.setData.mock.calls[0][0].content).toBe('<b>safe</b>')
  view.rerender(<MarkmapHooks markmap="# second" debounceDelay={0} />)
  expect(instance.destroy).toHaveBeenCalledTimes(1)
  await tick()
  view.unmount()
  expect(instance.destroy).toHaveBeenCalledTimes(2)
})
test('unmounted diagram input cancels pending rendering', async () => {
  const view = render(<MermaidHooks chart="later" debounceDelay={100} />)
  view.unmount()
  await tick()
  expect(mermaid.render).not.toHaveBeenCalled()
})
test('Markmap awaits setData and isolates deferred stale writes from the replacement SVG', async () => {
  let finish!: () => void
  let staleSvg!: SVGSVGElement
  const stale = {
    setData: jest.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = () => {
            staleSvg.innerHTML = '<text>stale</text>'
            resolve()
          }
        })
    ),
    fit: jest.fn().mockResolvedValue(undefined),
    destroy: jest.fn(),
  }
  const next = {
    setData: jest.fn().mockResolvedValue(undefined),
    fit: jest.fn().mockResolvedValue(undefined),
    destroy: jest.fn(),
  }
  Markmap.create
    .mockImplementationOnce((svg: SVGSVGElement) => {
      staleSvg = svg
      return stale
    })
    .mockReturnValueOnce(next)
  const view = render(<MarkmapHooks markmap="old" debounceDelay={0} />)
  await tick()
  expect(Markmap.create.mock.calls[0]).toHaveLength(2)
  expect(stale.setData).toHaveBeenCalled()
  expect(stale.fit).not.toHaveBeenCalled()
  view.rerender(<MarkmapHooks markmap="new" debounceDelay={0} />)
  await tick()
  expect(staleSvg.isConnected).toBe(false)
  expect(Markmap.create.mock.calls[1][0]).not.toBe(staleSvg)
  await act(async () => {
    finish()
    await Promise.resolve()
  })
  expect(stale.fit).not.toHaveBeenCalled()
  expect(view.container).not.toHaveTextContent('stale')
  expect(stale.destroy).toHaveBeenCalledTimes(1)
  view.unmount()
  expect(next.destroy).toHaveBeenCalledTimes(1)
})
test('Markmap owns deferred setData rejection and suppresses errors after teardown', async () => {
  let reject!: (reason: Error) => void
  const instance = {
    setData: jest.fn(
      () =>
        new Promise<void>((_, fail) => {
          reject = fail
        })
    ),
    fit: jest.fn(),
    destroy: jest.fn(),
  }
  Markmap.create.mockReturnValue(instance)
  const onError = jest.fn()
  const error = new Error('render failed')
  const view = render(<MarkmapHooks markmap="first" debounceDelay={0} onError={onError} />)
  await tick()
  expect(instance.setData).toHaveBeenCalled()
  await act(async () => {
    reject(error)
    await Promise.resolve()
  })
  expect(onError).toHaveBeenCalledWith(error)
  view.rerender(<MarkmapHooks markmap="second" debounceDelay={0} onError={onError} />)
  await tick()
  view.unmount()
  await act(async () => {
    reject(error)
    await Promise.resolve()
  })
  expect(onError).toHaveBeenCalledTimes(1)
  expect(instance.fit).not.toHaveBeenCalled()
})
test('Mermaid rejection removes owned temporary DOM and suppresses error diagrams', async () => {
  let container!: HTMLElement
  mermaid.render.mockImplementationOnce(async (_id: string, _chart: string, host?: HTMLElement) => {
    container = host ?? document.body
    const error = document.createElement('div')
    error.dataset.mermaidError = ''
    container.append(error)
    throw new Error('invalid')
  })
  const view = render(<MermaidHooks chart="invalid" debounceDelay={0} />)
  await tick()
  expect(mermaid.initialize).toHaveBeenCalledWith(expect.objectContaining({ suppressErrorRendering: true }))
  expect(container).not.toBe(document.body)
  expect(container.isConnected).toBe(false)
  expect(document.querySelector('[data-mermaid-error]')).toBeNull()
  expect(screen.getByRole('alert')).toHaveTextContent('invalid')
  view.unmount()
})
test('Mermaid pending render container is detached on unmount and cleared after settlement', async () => {
  let container!: HTMLElement
  let finish!: () => void
  mermaid.render.mockImplementationOnce((_id: string, _chart: string, host?: HTMLElement) => {
    container = host ?? document.body
    return new Promise((resolve) => {
      finish = () => {
        container.append(document.createElement('svg'))
        resolve({ svg: '<svg/>' })
      }
    })
  })
  const view = render(<MermaidHooks chart="pending" debounceDelay={0} />)
  await tick()
  expect(container).not.toBe(document.body)
  expect(container.isConnected).toBe(true)
  view.unmount()
  expect(container.isConnected).toBe(false)
  await act(async () => {
    finish()
    await Promise.resolve()
  })
  expect(container.childNodes).toHaveLength(0)
})
