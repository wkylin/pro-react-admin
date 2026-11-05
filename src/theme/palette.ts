import { getAccessiblePrimaryColor, getContrastRatio, mixThemeColors } from './contrast'

export type ThemeAppearance = 'light' | 'dark'

export interface ThemePalette {
  canvas: string
  surface: string
  elevated: string
  hover: string
  border: string
  borderStrong: string
  text: string
  secondary: string
  muted: string
  info: string
  infoBg: string
  success: string
  successBg: string
  warning: string
  warningBg: string
  danger: string
  dangerBg: string
  purple: string
  purpleBg: string
  shadow: string
}

export const ADMIN_FONT_FAMILY =
  '"Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'

const palettes: Record<ThemeAppearance, ThemePalette> = {
  light: {
    canvas: '#f5f6f8',
    surface: '#ffffff',
    elevated: '#ffffff',
    hover: '#f0f1f3',
    border: '#e5e7eb',
    borderStrong: '#c9cdd4',
    text: '#171717',
    secondary: '#525f70',
    muted: '#626d7e',
    info: '#175cb7',
    infoBg: '#eaf2ff',
    success: '#216e43',
    successBg: '#edf7f0',
    warning: '#8e5d13',
    warningBg: '#fff6e6',
    danger: '#b33948',
    dangerBg: '#fff0f1',
    purple: '#6941b0',
    purpleBg: '#f3efff',
    shadow: '0 8px 32px rgb(24 24 24 / 8%)',
  },
  dark: {
    canvas: '#181818',
    surface: '#1f1f1f',
    elevated: '#272727',
    hover: '#313131',
    border: '#313131',
    borderStrong: '#525252',
    text: '#f5f5f5',
    secondary: '#c2c2c2',
    muted: '#a3a3a3',
    info: '#9cc7ff',
    infoBg: '#202b3a',
    success: '#8bd5ad',
    successBg: '#1c3026',
    warning: '#f3cb7b',
    warningBg: '#352b1b',
    danger: '#f5a6ad',
    dangerBg: '#3a2224',
    purple: '#c7aff2',
    purpleBg: '#30283d',
    shadow: '0 12px 40px rgb(0 0 0 / 28%)',
  },
}

export const getThemePalette = (mode: ThemeAppearance): ThemePalette => palettes[mode]

export const getThemeAccents = (mode: ThemeAppearance, source: string) => {
  const primary = getAccessiblePrimaryColor(source, mode)
  const preferredTarget = mode === 'dark' ? '#ffffff' : '#000000'
  // Near black or white, move the other way so interactive states remain visible.
  const target =
    getContrastRatio(primary, preferredTarget) < 1.5 ? (mode === 'dark' ? '#000000' : '#ffffff') : preferredTarget
  return {
    primary,
    hover: mixThemeColors(primary, target, 0.12),
    active: mixThemeColors(primary, target, 0.24),
  }
}

/** Page styles and AntD use the same resolved colors, including legacy aliases. */
export const getThemeVariables = (mode: ThemeAppearance, primary: string): Record<string, string> => {
  const palette = getThemePalette(mode)
  const accents = getThemeAccents(mode, primary)
  return {
    '--wui-bg-page': palette.canvas,
    '--wui-bg-base': palette.canvas,
    '--wui-bg-surface': palette.surface,
    '--wui-bg-elevated': palette.elevated,
    '--wui-bg-subtle': palette.hover,
    '--wui-text-primary': palette.text,
    '--wui-text-secondary': palette.secondary,
    '--wui-text-muted': palette.muted,
    '--wui-border': palette.border,
    '--wui-border-strong': palette.borderStrong,
    '--wui-shadow': palette.shadow,
    '--wui-color-primary': accents.primary,
    '--wui-color-primary-hover': accents.hover,
    '--wui-color-primary-active': accents.active,
    '--wui-bg-info-subtle': palette.infoBg,
    '--wui-bg-success-subtle': palette.successBg,
    '--wui-bg-warning-subtle': palette.warningBg,
    '--wui-bg-danger-subtle': palette.dangerBg,
    '--wui-bg-purple-subtle': palette.purpleBg,
    '--wui-text-info': palette.info,
    '--wui-text-success': palette.success,
    '--wui-text-warning': palette.warning,
    '--wui-text-danger': palette.danger,
    '--wui-text-purple': palette.purple,
    '--wui-indicator-active': palette.secondary,
    '--wui-indicator-inactive': palette.borderStrong,
    '--wui-flow-mask': mode === 'dark' ? 'rgb(24 24 24 / 20%)' : 'rgb(245 246 248 / 70%)',
    '--background': palette.canvas,
    '--foreground': palette.text,
    '--color-gray-200': palette.border,
  }
}
