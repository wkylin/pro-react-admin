import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StickyCard from './index'

describe('StickyCard Component', () => {
  const mockCards = [{ id: 1 }, { id: 2 }, { id: 3 }]

  test('正确渲染卡片数量', () => {
    const { container } = render(<StickyCard cards={mockCards} />)
    const cards = container.querySelectorAll('.animate-wiggle')
    expect(cards.length).toBeGreaterThan(0)
    expect(cards.length).toBe(mockCards.length)
  })

  test('应用正确的粘性定位样式', () => {
    const { container } = render(<StickyCard cards={mockCards} />)
    const firstCard = container.querySelectorAll('.animate-wiggle')[0]

    // 验证 sticky 定位
    expect(firstCard).toHaveClass('sticky')

    // 验证动态计算的 top 值
    expect(firstCard).toHaveStyle({
      top: 'calc(50px + 30px)',
    })
  })
})
