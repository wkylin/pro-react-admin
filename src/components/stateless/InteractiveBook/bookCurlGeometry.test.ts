import { calculateBookCurl } from './bookCurlGeometry'

function matrixNumbers(transform: string): number[] {
  return transform.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
}

describe('calculateBookCurl', () => {
  const pageWidth = 400
  const pageHeight = 600

  test('starts flat and finishes with the entire page reflected to the left', () => {
    const start = calculateBookCurl({ pageWidth, pageHeight, corner: 'top', pointer: { x: 400, y: 0 } })
    expect(start.progress).toBe(0)
    expect(start.shadow).toBeNull()
    expect(start.flapClipPath).toBe(start.revealClipPath)
    expect(start.flapClipPath).toBe('polygon(0px 0px, 0px 0px, 0px 0px)')

    const finish = calculateBookCurl({ pageWidth, pageHeight, corner: 'top', pointer: { x: -400, y: 0 } })
    expect(finish.progress).toBe(1)
    expect(finish.flapTransform).toBe('matrix(-1, 0, 0, 1, 0, 0)')
    expect(finish.frontClipPath).toBe(start.flapClipPath)
    expect(finish.revealClipPath).toContain('400px 600px')
    expect(finish.shadow?.start).toEqual({ x: 0, y: 0 })
    expect(finish.shadow?.end).toEqual({ x: 0, y: 600 })
  })

  test('a half turn exposes exactly the half beneath the fold', () => {
    const result = calculateBookCurl({ pageWidth, pageHeight, corner: 'top', pointer: { x: 0, y: 0 } })
    expect(result.progress).toBe(0.5)
    expect(result.flapTransform).toBe('matrix(-1, 0, 0, 1, 400, 0)')
    expect(result.flapClipPath).toBe('polygon(200px 0px, 400px 0px, 400px 600px, 200px 600px)')
    expect(result.frontClipPath).toBe('polygon(0px 0px, 200px 0px, 200px 600px, 0px 600px)')
    expect(result.revealClipPath).toBe(result.flapClipPath)
    expect(result.shadow?.center).toEqual({ x: 200, y: 300 })
    expect(result.shadow?.angleDeg).toBe(90)
  })

  test('top and bottom corner folds reflect into each other', () => {
    const top = calculateBookCurl({ pageWidth, pageHeight, corner: 'top', pointer: { x: 300, y: 100 } })
    const bottom = calculateBookCurl({ pageWidth, pageHeight, corner: 'bottom', pointer: { x: 300, y: 500 } })
    expect(top.progress).toBe(bottom.progress)
    expect(top.shadow?.length).toBeCloseTo(bottom.shadow!.length)
    expect(top.shadow?.start.y).toBeCloseTo(pageHeight - bottom.shadow!.end.y)
    expect(top.shadow?.end.y).toBeCloseTo(pageHeight - bottom.shadow!.start.y)

    const [a, b, c, d, e, f] = matrixNumbers(top.flapTransform)
    expect(a * d - b * c).toBeCloseTo(-1)
    expect(a * pageWidth + c * 0 + e).toBeCloseTo(top.pointer.x, 4)
    expect(b * pageWidth + d * 0 + f).toBeCloseTo(top.pointer.y, 4)
  })

  test('mirrors a back turn into left-page coordinates without changing its progress', () => {
    const forward = calculateBookCurl({ pageWidth, pageHeight, corner: 'top', pointer: { x: 0, y: 0 } })
    const back = calculateBookCurl({
      pageWidth,
      pageHeight,
      corner: 'top',
      pointer: { x: 0, y: 0 },
      direction: 'back',
    })
    expect(back.progress).toBe(forward.progress)
    expect(back.pointer).toEqual({ x: 400, y: 0 })
    expect(back.flapTransform).toBe('matrix(-1, 0, 0, 1, 400, 0)')
    expect(back.flapClipPath).toContain('0px 0px')
    expect(back.flapClipPath).not.toContain('400px 600px')
    expect(back.shadow?.center).toEqual({ x: 200, y: 300 })

    const finish = calculateBookCurl({
      pageWidth,
      pageHeight,
      corner: 'top',
      pointer: { x: -400, y: 0 },
      direction: 'back',
    })
    expect(finish.pointer).toEqual({ x: 800, y: 0 })
    expect(finish.flapTransform).toBe('matrix(-1, 0, 0, 1, 800, 0)')
  })

  test('constrains the dragged corner to its spine radius and returns finite CSS', () => {
    const result = calculateBookCurl({ pageWidth, pageHeight, corner: 'top', pointer: { x: -400, y: 600 } })
    expect(Math.hypot(result.pointer.x, result.pointer.y)).toBeCloseTo(pageWidth)
    expect(result.pointer.y).toBeGreaterThanOrEqual(0)
    expect(result.pointer.y).toBeLessThanOrEqual(pageHeight)
    expect(result.progress).toBeGreaterThan(0)
    expect(result.progress).toBeLessThan(1)
    expect(result.flapTransform).not.toMatch(/NaN|Infinity/)
    expect(result.flapClipPath).not.toMatch(/NaN|Infinity/)

    const invalidPointer = calculateBookCurl({
      pageWidth,
      pageHeight,
      corner: 'bottom',
      pointer: { x: Number.NaN, y: Number.POSITIVE_INFINITY },
    })
    expect(invalidPointer.progress).toBe(0)
    expect(invalidPointer.shadow).toBeNull()
    expect(() => calculateBookCurl({ pageWidth: 0, pageHeight, corner: 'top', pointer: { x: 0, y: 0 } })).toThrow(
      RangeError
    )
  })
})
