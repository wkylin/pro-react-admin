import {
  accessibleGradientPalettes,
  getAccessiblePrimaryColor,
  getAccessibleTertiaryTextColor,
  getContrastRatio,
  getContrastingTextColor,
} from './contrast'

describe('accessible theme colors', () => {
  it.each([
    ['light', '#1677ff', '#ffffff'],
    ['dark', '#1677ff', '#141414'],
    ['light', '#ffffff', '#ffffff'],
    ['dark', '#000000', '#141414'],
  ] as const)('keeps %s primary accents readable for %s', (surface, source, background) => {
    const primary = getAccessiblePrimaryColor(source, surface)

    expect(getContrastRatio(primary, background)).toBeGreaterThanOrEqual(4.5)
    expect(getContrastRatio(primary, getContrastingTextColor(primary))).toBeGreaterThanOrEqual(4.5)
    if (surface === 'light') {
      expect(getContrastRatio(primary, '#f5f5f5')).toBeGreaterThanOrEqual(4.5)
      expect(getContrastRatio(primary, '#e6f4ff')).toBeGreaterThanOrEqual(4.5)
    } else {
      expect(getContrastRatio(primary, '#111a2c')).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('uses readable tertiary text colors on both theme surfaces', () => {
    expect(getContrastRatio(getAccessibleTertiaryTextColor('light'), '#ffffff')).toBeGreaterThanOrEqual(4.5)
    expect(getContrastRatio(getAccessibleTertiaryTextColor('dark'), '#141414')).toBeGreaterThanOrEqual(4.5)
  })

  it.each([
    ['light', '#ffffff'],
    ['light', '#f5f5f5'],
    ['light', '#e6f4ff'],
    ['dark', '#141414'],
    ['dark', '#001529'],
  ] as const)('keeps every %s brand gradient stop readable on %s', (surface, background) => {
    for (const color of accessibleGradientPalettes[surface]) {
      expect(getContrastRatio(color, background)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it.each([
    ['light', '#ffffff'],
    ['light', '#f5f5f5'],
    ['light', '#e6f4ff'],
    ['dark', '#141414'],
    ['dark', '#001529'],
  ] as const)('keeps interpolated %s brand gradient text readable on %s', (surface, background) => {
    const colors = accessibleGradientPalettes[surface]

    for (let segment = 0; segment < colors.length - 1; segment += 1) {
      const from = colors[segment].match(/[\da-f]{2}/gi)?.map((channel) => Number.parseInt(channel, 16))
      const to = colors[segment + 1].match(/[\da-f]{2}/gi)?.map((channel) => Number.parseInt(channel, 16))
      if (!from || !to) throw new Error('Gradient palettes must use six-digit hex colors')

      for (let step = 0; step <= 100; step += 1) {
        const amount = step / 100
        const sample = `rgb(${from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount)).join(', ')})`
        expect(getContrastRatio(sample, background)).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  it('leaves non-hex colors intact for CSS-supported custom values', () => {
    expect(getAccessiblePrimaryColor('rebeccapurple', 'light')).toBe('rebeccapurple')
  })
})
