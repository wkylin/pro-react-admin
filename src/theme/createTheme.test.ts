import { theme } from 'antd'
import { createAdminTheme } from './createTheme'
import { getThemePalette, getThemeVariables } from './palette'
import { getContrastRatio, mixThemeColors } from './contrast'

describe.each(['light', 'dark'] as const)('%s admin theme', (mode) => {
  it('shares palette roles with CSS variables and AntD surfaces', () => {
    const primary = '#1677ff'
    const config = createAdminTheme({ colorPrimary: primary, compactAlgorithm: false }, mode)
    const tokens = theme.getDesignToken(config)
    const variables = getThemeVariables(mode, primary)

    expect(variables['--wui-bg-base']).toBe(tokens.colorBgLayout)
    expect(variables['--wui-bg-surface']).toBe(tokens.colorBgContainer)
    expect(variables['--wui-bg-elevated']).toBe(tokens.colorBgElevated)
    expect(variables['--wui-color-primary']).toBe(tokens.colorPrimary)
    expect(getContrastRatio(tokens.colorText, tokens.colorBgContainer)).toBeGreaterThanOrEqual(4.5)
    if (mode === 'dark') {
      expect(tokens.colorBgLayout).toBe('#181818')
      expect(tokens.colorBgElevated).toBe('#272727')
    }
  })

  it.each(['#1677ff', '#16a34a', '#ffffff', '#000000'])(
    'keeps custom accents readable on real surfaces for %s',
    (primary) => {
      const tokens = theme.getDesignToken(createAdminTheme({ colorPrimary: primary, compactAlgorithm: false }, mode))
      const palette = getThemePalette(mode)
      for (const foreground of [
        tokens.colorLink,
        tokens.colorLinkHover,
        tokens.colorLinkActive,
        tokens.colorTextSecondary,
        tokens.colorTextTertiary,
      ]) {
        for (const background of [palette.canvas, palette.surface, palette.elevated, palette.hover]) {
          const ratio = getContrastRatio(foreground, background)
          if (ratio < 4.5) throw new Error(`${foreground} on ${background} is ${ratio.toFixed(2)}:1 for ${primary}`)
        }
      }
    }
  )

  it.each(['#1677ff', '#16a34a', '#ffffff', '#000000'])('distinguishes hover and active states for %s', (primary) => {
    const config = createAdminTheme({ colorPrimary: primary, compactAlgorithm: false }, mode)
    const tokens = theme.getDesignToken(config)
    expect(new Set([tokens.colorLink, tokens.colorLinkHover, tokens.colorLinkActive]).size).toBe(3)
    const foreground = String(config.components?.Button?.primaryColor)
    for (const background of [tokens.colorPrimary, tokens.colorPrimaryHover, tokens.colorPrimaryActive]) {
      expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it.each(['#1677ff', '#16a34a', '#ffffff', '#000000'])('keeps solid selection labels readable for %s', (primary) => {
    const tokens = theme.getDesignToken(createAdminTheme({ colorPrimary: primary, compactAlgorithm: false }, mode))
    for (const background of [tokens.colorPrimary, tokens.colorPrimaryHover, tokens.colorPrimaryActive]) {
      expect(getContrastRatio(tokens.colorTextLightSolid, background)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it.each(['#1677ff', '#16a34a', '#ffffff', '#000000'])(
    'keeps both switch labels and thumbs readable for %s',
    (primary) => {
      const config = createAdminTheme({ colorPrimary: primary, compactAlgorithm: false }, mode)
      const tokens = theme.getDesignToken(config)
      const control = config.components?.Switch
      const foreground = String(control?.colorTextLightSolid ?? tokens.colorTextLightSolid)
      const thumb = String(control?.handleBg ?? tokens.colorWhite)
      const unchecked = String(control?.colorTextQuaternary ?? tokens.colorTextQuaternary)
      const rgba = unchecked.startsWith('rgba') ? unchecked.match(/[\d.]+/g)?.map(Number) : null
      const offBackground = rgba
        ? mixThemeColors(getThemePalette(mode).elevated, `rgb(${rgba.slice(0, 3).join(', ')})`, rgba[3])
        : unchecked
      for (const background of [
        offBackground,
        String(control?.colorPrimary ?? tokens.colorPrimary),
        String(control?.colorPrimaryHover ?? tokens.colorPrimaryHover),
      ]) {
        expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5)
        expect(getContrastRatio(thumb, background)).toBeGreaterThanOrEqual(3)
      }
    }
  )

  it('keeps destructive action text and filled states readable', () => {
    const config = createAdminTheme({ colorPrimary: '#1677ff', compactAlgorithm: false }, mode)
    const tokens = theme.getDesignToken(config)
    const palette = getThemePalette(mode)
    for (const foreground of [tokens.colorErrorText, tokens.colorErrorTextHover, tokens.colorErrorTextActive]) {
      for (const background of [palette.canvas, palette.surface, palette.elevated, palette.hover]) {
        expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5)
      }
    }
    for (const background of [tokens.colorError, tokens.colorErrorHover, tokens.colorErrorActive]) {
      expect(getContrastRatio(String(config.components?.Button?.dangerColor), background)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('keeps compact density and dark navigation independent', () => {
    const settings = { colorPrimary: '#1677ff', compactAlgorithm: false }
    const standard = createAdminTheme(settings, mode)
    const compact = createAdminTheme({ ...settings, compactAlgorithm: true }, mode)
    expect(theme.getDesignToken(standard).controlHeight).toBe(36)
    expect(theme.getDesignToken(compact).controlHeight).toBe(28)
    expect(standard.components?.Layout?.headerHeight).toBe(56)
    expect(standard.components?.Layout?.siderBg).toBe('#181818')
    expect(standard.components?.Menu?.darkItemBg).toBe('#181818')
    expect(standard.components?.Menu?.darkItemSelectedBg).toBe('#313131')
    expect(
      getContrastRatio(String(standard.components?.Menu?.darkItemSelectedColor), '#313131')
    ).toBeGreaterThanOrEqual(4.5)
    expect(theme.getDesignToken(standard).colorBgContainer).toBe(getThemePalette(mode).surface)
  })
})
