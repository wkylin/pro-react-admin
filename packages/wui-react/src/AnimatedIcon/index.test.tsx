import { render, screen } from '@testing-library/react'
import AnimatedIcon from './index'
import { Monitor } from 'lucide-react'

describe('AnimatedIcon', () => {
  test('renders child icon and applies className', () => {
    render(
      <AnimatedIcon variant="spin" mode="hover" className="test-icon">
        <Monitor data-testid="monitor" />
      </AnimatedIcon>
    )

    const icon = screen.getByTestId('monitor')
    expect(icon).toBeInTheDocument()
    // class should be applied to svg root
    expect(icon.getAttribute('class')).toEqual(expect.stringContaining('test-icon'))
  })
})
