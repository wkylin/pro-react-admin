import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import OneTimePasscode from './index'

describe('OneTimePasscode', () => {
  test('allows typing into inputs and moves focus', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<OneTimePasscode length={4} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(4)

    await user.type(inputs[0], '1')
    expect(onChange).toHaveBeenLastCalledWith('1')
    // focus moved to next
    expect(document.activeElement).toBe(inputs[1])

    await user.type(inputs[1], '2')
    expect(onChange).toHaveBeenLastCalledWith('12')
  })

  test('supports paste', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<OneTimePasscode length={6} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    // paste 4 digits into second input
    inputs[1].focus()
    await user.paste('3456')
    // last onChange should contain pasted content placed starting at index 1
    expect(onChange).toHaveBeenCalled()
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(last).toMatch(/3456/)
  })

  test('controlled mode calls onChange but shows value from prop', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { rerender } = render(<OneTimePasscode length={3} value={''} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '7')
    expect(onChange).toHaveBeenCalled()

    // provide updated value via prop and verify it renders
    rerender(<OneTimePasscode length={3} value={'7'} onChange={onChange} />)
    expect(inputs[0]).toHaveValue('7')
  })
})
