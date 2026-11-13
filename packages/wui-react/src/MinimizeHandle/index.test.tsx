import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MinimizeHandle from './index'

describe('MinimizeHandle', () => {
  test('uses independent, stable gradients that always reference the owning handle', () => {
    const handles = (
      <>
        <MinimizeHandle label="第一个提手" />
        <MinimizeHandle label="第二个提手" />
      </>
    )
    const { container, rerender } = render(handles)
    const ids = Array.from(container.querySelectorAll('linearGradient'), (gradient) => gradient.id)
    expect(ids).toHaveLength(4)
    expect(new Set(ids).size).toBe(4)
    for (const button of screen.getAllByRole('button')) {
      const ownIds = Array.from(button.querySelectorAll('linearGradient'), (gradient) => gradient.id)
      const referencedIds = Array.from(button.querySelectorAll('path')).flatMap((path) =>
        ['fill', 'stroke'].flatMap((attribute) => {
          const value = path.getAttribute(attribute)
          return value?.startsWith('url(#') ? [value.slice(5, -1)] : []
        })
      )
      expect(referencedIds).toHaveLength(3)
      referencedIds.forEach((id) => expect(ownIds).toContain(id))
    }
    rerender(
      <>
        <MinimizeHandle label="第一个提手" flashing />
        <MinimizeHandle label="第二个提手" flashing />
      </>
    )
    expect(Array.from(container.querySelectorAll('linearGradient'), (gradient) => gradient.id)).toEqual(ids)
  })

  test('never submits the containing form when activated', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    const onSubmit = jest.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <MinimizeHandle label="收起表单" onClick={onClick} />
      </form>
    )
    await user.click(screen.getByRole('button', { name: '收起表单' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('supports a native button ref and disabled behavior', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    const ref = createRef<HTMLButtonElement>()
    render(<MinimizeHandle ref={ref} label="收起面板" disabled onClick={onClick} />)
    const button = screen.getByRole('button', { name: '收起面板' })
    expect(ref.current).toBe(button)
    expect(button).toHaveAttribute('title', '收起面板')
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
