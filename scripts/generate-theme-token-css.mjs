import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'prettier'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, '..')
const tokenPath = path.join(projectRoot, 'src/theme/tokens.json')
const outputPath = path.join(projectRoot, 'src/styles/theme-tokens.generated.css')
const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))
const prettierOptions = (await prettier.resolveConfig(outputPath)) ?? {}

const scrollbarNames = {
  thumbStart: '--wui-scrollbar-thumb-start',
  thumbEnd: '--wui-scrollbar-thumb-end',
  thumbHoverStart: '--wui-scrollbar-thumb-hover-start',
  thumbHoverEnd: '--wui-scrollbar-thumb-hover-end',
  thumbActiveStart: '--wui-scrollbar-thumb-active-start',
  thumbActiveEnd: '--wui-scrollbar-thumb-active-end',
  thumbSolid: '--wui-scrollbar-thumb-solid',
}

const paletteVariables = (mode) => {
  const palette = tokens[mode]
  const cssOnly = tokens.cssOnly[mode]
  const scrollbar = tokens.scrollbar[mode]

  return {
    '--wui-bg-page': palette.canvas,
    '--wui-bg-base': palette.canvas,
    '--wui-bg-surface': palette.surface,
    '--wui-bg-elevated': palette.elevated,
    '--wui-bg-subtle': palette.hover,
    '--wui-bg-navigation': palette.navigation,
    '--wui-bg-navigation-hover': palette.navigationHover,
    '--wui-border-navigation': palette.borderStrong,
    '--wui-border-navigation-dark': tokens.dark.borderStrong,
    '--wui-text-primary': palette.text,
    '--wui-text-secondary': palette.secondary,
    '--wui-text-muted': palette.muted,
    '--wui-border': palette.border,
    '--wui-border-strong': palette.borderStrong,
    '--wui-shadow': palette.shadow,
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
    '--wui-flow-mask': palette.flowMask,
    '--background': palette.canvas,
    '--foreground': palette.text,
    '--color-gray-200': palette.border,
    '--color-red-pers': cssOnly.colorRedPers,
    '--color-yellow-saff': cssOnly.colorYellowSaff,
    '--wui-scrollbar-size': tokens.scrollbar.size,
    '--wui-scrollbar-radius': tokens.scrollbar.radius,
    '--wui-scrollbar-track': tokens.scrollbar.track,
    ...Object.fromEntries(Object.entries(scrollbarNames).map(([key, cssName]) => [cssName, scrollbar[key]])),
  }
}

const declarationBlock = (selector, values) => {
  const declarations = Object.entries(values)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
  return `${selector} {\n${declarations}\n}`
}

const toLegacyRgb = (color) => {
  const match = color.match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)%\s*\)$/)
  if (match) {
    const [, red, green, blue, alpha] = match
    return `rgba(${red}, ${green}, ${blue}, ${Number(alpha) / 100})`
  }

  const solidMatch = color.match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\)$/)
  if (!solidMatch) return color
  const [, red, green, blue] = solidMatch
  return `rgb(${red}, ${green}, ${blue})`
}

const legacyScrollbarVariables = (mode) => {
  const values = paletteVariables(mode)
  return Object.fromEntries(
    Object.entries(scrollbarNames).map(([key, cssName]) => [cssName, toLegacyRgb(values[cssName])])
  )
}

const generatedCss = await prettier.format(
  [
    '/* Generated from src/theme/tokens.json by scripts/generate-theme-token-css.mjs. Do not edit. */',
    '/* stylelint-disable custom-property-empty-line-before */',
    declarationBlock(':root', { 'color-scheme': 'light', ...paletteVariables('light') }),
    declarationBlock(":root[data-theme='dark']", { 'color-scheme': 'dark', ...paletteVariables('dark') }),
    '/* Legacy fallback for engines without space-separated rgb() with alpha. */',
    '/* stylelint-disable color-function-notation, color-function-alias-notation, alpha-value-notation */',
    `@supports not (color: rgb(0 0 0)) {\n  ${declarationBlock(':root', legacyScrollbarVariables('light')).replaceAll('\n', '\n  ')}\n\n  ${declarationBlock(":root[data-theme='dark']", legacyScrollbarVariables('dark')).replaceAll('\n', '\n  ')}\n}`,
    '/* stylelint-enable color-function-notation, color-function-alias-notation, alpha-value-notation */',
    '/* stylelint-enable custom-property-empty-line-before */',
    '',
  ].join('\n\n'),
  { ...prettierOptions, filepath: outputPath }
)

if (process.argv.includes('--check')) {
  const currentCss = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : ''
  if (currentCss !== generatedCss) {
    console.error('[theme-tokens] generated CSS is stale; run pnpm run generate:theme-tokens')
    process.exitCode = 1
  } else {
    console.log('[theme-tokens] generated CSS matches src/theme/tokens.json')
  }
} else {
  fs.writeFileSync(outputPath, generatedCss)
  console.log('[theme-tokens] generated src/styles/theme-tokens.generated.css')
}
