import Watermark from './index'

describe('imperative watermark disposal', () => {
  let context, dataUrl
  beforeEach(() => {
    context = jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      translate: jest.fn(),
      rotate: jest.fn(),
      fillText: jest.fn(),
    })
    dataUrl = jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,test')
  })
  afterEach(() => {
    context.mockRestore()
    dataUrl.mockRestore()
    document.body.replaceChildren()
  })

  it('keeps independent containers isolated and removes overlays on disposal', async () => {
    const first = document.createElement('div'),
      second = document.createElement('div')
    document.body.append(first, second)
    const disposeFirst = Watermark({ container: first, content: 'First' })
    const disposeSecond = Watermark({ container: second, content: 'Second' })
    expect(first.querySelectorAll('.wm')).toHaveLength(1)
    expect(second.querySelectorAll('.wm')).toHaveLength(1)
    disposeFirst()
    await Promise.resolve()
    expect(first.querySelector('.wm')).toBeNull()
    expect(second.querySelectorAll('.wm')).toHaveLength(1)
    disposeSecond()
    await Promise.resolve()
    expect(document.querySelector('.wm')).toBeNull()
  })

  it('restores an attached overlay after removal but never after effect cleanup', async () => {
    const container = document.createElement('div')
    document.body.append(container)
    const dispose = Watermark({ container })
    container.querySelector('.wm').remove()
    await Promise.resolve()
    expect(container.querySelectorAll('.wm')).toHaveLength(1)
    dispose()
    await Promise.resolve()
    await Promise.resolve()
    expect(container.querySelector('.wm')).toBeNull()
  })
})
