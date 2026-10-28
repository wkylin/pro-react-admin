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
  const instance = { fit: jest.fn().mockResolvedValue(undefined), destroy: jest.fn() }
  Markmap.create.mockReturnValue(instance)
  const view = render(<MarkmapHooks markmap="# first" debounceDelay={0} />)
  await tick()
  expect(Markmap.create.mock.calls[0][2].content).toBe('<b>safe</b>')
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
