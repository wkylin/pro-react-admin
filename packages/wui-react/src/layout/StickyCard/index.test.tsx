import { render, screen } from '@testing-library/react'
import StickyCard from './index'

test('sticky cards render caller content and offsets without demo text', () => {
  const cards = [
    { id: 1, content: 'First' },
    { id: 2, content: 'Second' },
  ]
  const { rerender } = render(<StickyCard cards={cards} topOffset={20} step={10} />)
  expect(screen.getByText('First')).toHaveStyle({ top: '30px' })
  expect(screen.getByText('Second')).toHaveStyle({ top: '40px' })
  expect(screen.queryByText('Card Item')).not.toBeInTheDocument()
  rerender(<StickyCard cards={cards} renderCard={(_, index) => `Custom ${index}`} />)
  expect(screen.getByText('Custom 0')).toHaveStyle({ top: '80px' })
})
