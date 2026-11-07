import { getAccessiblePrimaryColor, getContrastRatio, getContrastingTextColor, mixThemeColors } from './contrast'
import tokens from './tokens.json'

export type ThemeAppearance = 'light' | 'dark'

export interface ThemePalette {
  canvas: string
  surface: string
  elevated: string
  hover: string
  navigation: string
  navigationHover: string
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
  flowMask: string
}

export const ADMIN_FONT_FAMILY =
  '"Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'

const palettes: Record<ThemeAppearance, ThemePalette> = {
  light: tokens.light,
  dark: tokens.dark,
}

export const getThemePalette = (mode: ThemeAppearance): ThemePalette => palettes[mode]

export const getThemeStatusColors = (mode: ThemeAppearance) => {
  const palette = getThemePalette(mode)

  return {
    info: {
      color: palette.info,
      background: palette.infoBg,
      border: mixThemeColors(palette.infoBg, palette.info, 0.2),
    },
    success: {
      color: palette.success,
      background: palette.successBg,
      border: mixThemeColors(palette.successBg, palette.success, 0.2),
    },
    warning: {
      color: palette.warning,
      background: palette.warningBg,
      border: mixThemeColors(palette.warningBg, palette.warning, 0.2),
    },
    danger: {
      color: palette.danger,
      background: palette.dangerBg,
      border: mixThemeColors(palette.dangerBg, palette.danger, 0.2),
    },
  }
}

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

export const getThemeSelectionBackground = (mode: ThemeAppearance, primary: string): string => {
  const palette = getThemePalette(mode)
  const accent = getThemeAccents(mode, primary).primary
  return mixThemeColors(palette.surface, accent, mode === 'dark' ? 0.12 : 0.06)
}

/** Page styles and AntD use the same resolved colors, including legacy aliases. */
export const getThemeVariables = (mode: ThemeAppearance, primary: string): Record<string, string> => {
  const palette = getThemePalette(mode)
  const accents = getThemeAccents(mode, primary)
  const brandAction = getThemeAccents(mode, tokens.brandAction)
  const statusColors = getThemeStatusColors(mode)
  const selectedBackground = getThemeSelectionBackground(mode, primary)
  return {
    '--wui-bg-page': palette.canvas,
    '--wui-bg-base': palette.canvas,
    '--wui-bg-surface': palette.surface,
    '--wui-bg-elevated': palette.elevated,
    '--wui-bg-subtle': palette.hover,
    '--wui-bg-navigation': palette.navigation,
    '--wui-bg-navigation-hover': palette.navigationHover,
    '--wui-border-navigation': palette.border,
    '--wui-border-navigation-dark': palettes.dark.border,
    '--wui-text-primary': palette.text,
    '--wui-text-secondary': palette.secondary,
    '--wui-text-muted': palette.muted,
    '--wui-border': palette.border,
    '--wui-border-strong': palette.borderStrong,
    '--wui-shadow': palette.shadow,
    '--wui-color-primary': accents.primary,
    '--wui-color-primary-contrast': getContrastingTextColor(accents.primary),
    '--wui-color-primary-hover': accents.hover,
    '--wui-color-primary-hover-contrast': getContrastingTextColor(accents.hover),
    '--wui-color-primary-active': accents.active,
    '--wui-color-primary-active-contrast': getContrastingTextColor(accents.active),
    '--wui-bg-primary-subtle': selectedBackground,
    '--wui-color-brand-action': brandAction.primary,
    '--wui-color-brand-action-contrast': getContrastingTextColor(brandAction.primary),
    '--wui-color-brand-action-hover': brandAction.hover,
    '--wui-color-brand-action-hover-contrast': getContrastingTextColor(brandAction.hover),
    '--wui-color-brand-action-active': brandAction.active,
    '--wui-color-brand-action-active-contrast': getContrastingTextColor(brandAction.active),
    '--wui-color-brand-action-focus': brandAction.primary,
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
    '--wui-border-info': statusColors.info.border,
    '--wui-border-success': statusColors.success.border,
    '--wui-border-warning': statusColors.warning.border,
    '--wui-border-danger': statusColors.danger.border,
    '--wui-color-info-contrast': getContrastingTextColor(statusColors.info.color),
    '--wui-color-success-contrast': getContrastingTextColor(statusColors.success.color),
    '--wui-color-warning-contrast': getContrastingTextColor(statusColors.warning.color),
    '--wui-color-danger-contrast': getContrastingTextColor(statusColors.danger.color),
    '--wui-indicator-active': palette.secondary,
    '--wui-indicator-inactive': palette.borderStrong,
    '--wui-flow-mask': palette.flowMask,
    '--background': palette.canvas,
    '--foreground': palette.text,
    '--color-gray-200': palette.border,
  }
}
