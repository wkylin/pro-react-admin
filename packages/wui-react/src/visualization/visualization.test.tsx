import { act, fireEvent, render, screen } from '@testing-library/react'
import OrgChart from './OrgChart'
import { sanitizeDiagramSvg, sanitizeMarkmapHtml } from './sanitize'
import type { EChartsType } from 'echarts'
jest.mock('echarts', () => ({ init: jest.fn(), registerMap: jest.fn() }))
const echarts = require('echarts')
const EChart = require('./EChart').default
const PieNestCharts = require('./PieNestCharts').default
const PHBarChart = require('./PHBarChart').default
const chart = {
  setOption: jest.fn(),
  clear: jest.fn(),
  dispose: jest.fn(),
  resize: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
}
let callbacks: ResizeObserverCallback[] = []
let disconnect: jest.Mock
beforeEach(() => {
  jest.clearAllMocks()
  callbacks = []
  disconnect = jest.fn()
  jest.mocked(echarts.init).mockReturnValue(chart as unknown as EChartsType)
  global.ResizeObserver = class {
    constructor(cb: ResizeObserverCallback) {
      callbacks.push(cb)
    }
    observe() {}
    unobserve() {}
    disconnect = disconnect
  } as unknown as typeof ResizeObserver
})
test('delayed chart initialization applies current data/events and disposes observers', () => {
  const click = jest.fn()
  const view = render(<EChart option={{ title: { text: 'old' } }} onEvents={{ click }} />)
  const host = screen.getByRole('img')
  Object.defineProperties(host, { clientWidth: { value: 300 }, clientHeight: { value: 200 } })
  view.rerender(<EChart option={{ title: { text: 'current' } }} onEvents={{ click }} />)
  act(() => callbacks.forEach((cb) => cb([], {} as ResizeObserver)))
  expect(chart.setOption).toHaveBeenLastCalledWith({ title: { text: 'current' } }, expect.anything())
  expect(chart.on).toHaveBeenCalledWith('click', expect.any(Function))
  view.unmount()
  expect(chart.dispose).toHaveBeenCalledTimes(1)
  expect(disconnect).toHaveBeenCalled()
})
test('object theme changes reinitialize and replay current options', () => {
  const view = render(
    <EChart
      theme={{ backgroundColor: 'red' }}
      initOptions={{ width: 300, height: 200 }}
      option={{ title: { text: 'data' } }}
    />
  )
  view.rerender(
    <EChart
      theme={{ backgroundColor: 'blue' }}
      initOptions={{ width: 300, height: 200 }}
      option={{ title: { text: 'data' } }}
    />
  )
  expect(echarts.init).toHaveBeenCalledTimes(2)
  expect(chart.dispose).toHaveBeenCalledTimes(1)
  expect(chart.setOption).toHaveBeenLastCalledWith({ title: { text: 'data' } }, expect.anything())
})
test('sanitizers strip executable and external SVG/HTML while retaining text', () => {
  const svg = sanitizeDiagramSvg(
    '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><foreignObject><div onclick="evil()">unsafe</div></foreignObject><style>@import "https://evil";</style><image href="https://evil"/><text onclick="evil()">safe</text></svg>'
  )
  expect(svg).toContain('safe')
  expect(svg).not.toMatch(/script|foreignObject|onclick|https:|<style|<image/)
  const html = sanitizeMarkmapHtml(
    '<a href="javascript:alert(1)" onclick="evil()">safe</a><img src=x onerror=evil()><iframe src="https://evil"/>'
  )
  expect(html).toContain('safe')
  expect(html).not.toMatch(/javascript|onclick|onerror|iframe|<img/)
})
test('organization root id zero renders and native button collapses children', () => {
  render(<OrgChart data={{ id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }] }} />)
  fireEvent.click(screen.getByRole('button', { name: /Root/ }))
  expect(screen.queryByRole('button', { name: 'Child' })).toBeNull()
})
test('pie and pH render caller text alternatives', () => {
  render(
    <>
      <PieNestCharts data={[{ name: 'Caller', value: 8 }]} ariaLabel="Caller distribution" />
      <PHBarChart ranges={[{ name: 'Sample', values: [7] }]} ariaLabel="Sample pH" />
    </>
  )
  expect(screen.getByRole('img', { name: 'Caller distribution' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Sample pH' })).toBeInTheDocument()
})
test('caller map registration precedes initialization, and option inputs are not mutated', () => {
  const option = { series: [{ type: 'pie' as const, data: [{ name: 'Caller', value: 8 }] }] }
  chart.setOption.mockImplementationOnce((copy) => {
    copy.series[0].data[0].value = 99
  })
  render(
    <EChart
      maps={[{ name: 'caller-map', data: { type: 'FeatureCollection', features: [] } }]}
      option={option}
      initOptions={{ width: 300, height: 200 }}
    />
  )
  expect(echarts.registerMap).toHaveBeenCalledWith('caller-map', expect.anything(), undefined)
  expect(echarts.registerMap.mock.invocationCallOrder[0]).toBeLessThan(echarts.init.mock.invocationCallOrder[0])
  expect(option.series[0].data[0].value).toBe(8)
})
test('canvas source replacement detaches image callbacks and unmount cancels animation', () => {
  const IconCloud = require('./IconCloud').default
  const context = new Proxy({}, { get: () => jest.fn() }) as CanvasRenderingContext2D
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context)
  const request = jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(42)
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  const loaded: HTMLImageElement[] = []
  jest.spyOn(window, 'Image').mockImplementation(() => {
    const img = document.createElement('img')
    loaded.push(img)
    return img
  })
  const view = render(<IconCloud images={['/first.png']} ariaLabel="Technologies" />)
  const oldLoad = loaded[0].onload!
  view.rerender(<IconCloud images={['/second.png']} ariaLabel="Technologies" />)
  expect(loaded[0].onload).toBeNull()
  expect(loaded[0].hasAttribute('src')).toBe(false)
  expect(() => oldLoad.call(loaded[0], new Event('load'))).not.toThrow()
  expect(screen.getByRole('img', { name: 'Technologies' })).toHaveAttribute('tabindex', '0')
  view.unmount()
  expect(loaded[1].onload).toBeNull()
  expect(request).toHaveBeenCalled()
  expect(cancel).toHaveBeenCalledWith(42)
  jest.restoreAllMocks()
})

test('SVG presentation is flattened without retaining CSS or remote paint resources', () => {
  const result = sanitizeDiagramSvg(
    '<svg xmlns="http://www.w3.org/2000/svg"><style>.node { fill: white; stroke: black; } .bad { fill: url(https://evil); }</style><rect class="node"/><text style="fill: red">Visible</text><rect class="bad"/></svg>'
  )
  expect(result).toContain('fill="white"')
  expect(result).toContain('fill="red"')
  expect(result).not.toMatch(/https:|<style|style=/)
})
test('nested pie uses caller numeric data and reacts to data replacement', () => {
  const view = render(<PieNestCharts data={[3, 8]} />)
  const host = screen.getByRole('img')
  Object.defineProperties(host, { clientWidth: { value: 300 }, clientHeight: { value: 200 } })
  act(() => callbacks.forEach((cb) => cb([], {} as ResizeObserver)))
  expect(chart.setOption.mock.calls.at(-1)?.[0].series[0].data.map((item: { value: number }) => item.value)).toEqual([
    3, 8,
  ])
  view.rerender(<PieNestCharts data={[5]} />)
  expect(chart.setOption.mock.calls.at(-1)?.[0].series[0].data.map((item: { value: number }) => item.value)).toEqual([
    5,
  ])
})
