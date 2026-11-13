import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import HandlePanel from './index'

describe('HandlePanel', () => {
  test('reports keyboard activation and leaves visibility and child state with the caller', async () => {
    const user = userEvent.setup()
    const onMinimize = jest.fn()
    const { rerender } = render(
      <HandlePanel onMinimize={onMinimize}>
        <input aria-label="备注" defaultValue="保留内容" />
      </HandlePanel>
    )

    const button = screen.getByRole('button', { name: '收起面板' })
    button.focus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onMinimize).toHaveBeenCalledTimes(2)
    expect(onMinimize.mock.calls[0][0].type).toBe('click')
    expect(button).toBeVisible()

    await user.type(screen.getByRole('textbox'), '已编辑')
    const content = <input aria-label="备注" defaultValue="保留内容" />
    rerender(<HandlePanel hidden>{content}</HandlePanel>)
    rerender(<HandlePanel>{content}</HandlePanel>)
    expect(screen.getByRole('textbox')).toHaveValue('保留内容已编辑')
  })

  test('keeps callbacks independent when multiple panels share a page', async () => {
    const user = userEvent.setup()
    const first = jest.fn()
    const second = jest.fn()
    render(
      <>
        <HandlePanel label="收起第一个面板" onMinimize={first} />
        <HandlePanel label="收起第二个面板" onMinimize={second} />
      </>
    )
    await user.click(screen.getByRole('button', { name: '收起第二个面板' }))
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  test('forwards a native ref, attributes and inline theme overrides', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <HandlePanel
        ref={ref}
        aria-label="通知面板"
        role="region"
        variant="inset"
        style={{ '--minimize-tab-offset-y': '3px', '--panel-background': '#fff' }}
      >
        内容
      </HandlePanel>
    )
    const panel = screen.getByRole('region', { name: '通知面板' })
    expect(ref.current).toBe(panel)
    expect(panel.style.getPropertyValue('--minimize-tab-offset-y')).toBe('3px')
    expect(panel.style.getPropertyValue('--panel-background')).toBe('#fff')
  })
})
