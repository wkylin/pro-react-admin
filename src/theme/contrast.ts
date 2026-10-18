type ThemeSurface = 'light' | 'dark'
type RGB = readonly [number, number, number]

// Use an extra margin because primary text also appears on tinted surfaces.
const MINIMUM_CONTRAST = 6
const LIGHT_SURFACE: RGB = [255, 255, 255]
const DARK_SURFACE: RGB = [20, 20, 20]
const BLACK: RGB = [0, 0, 0]
const WHITE: RGB = [255, 255, 255]

export const accessibleGradientPalettes = {
  light: ['#0958d9', '#531dab', '#006d75', '#a8071a', '#003eb3'],
  dark: ['#69b1ff', '#b37feb', '#95de64', '#ffadd2', '#5cdbd3'],
} as const

const parseHexColor = (value: string): RGB | null => {
  const rgbMatch = value.trim().match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)
  if (rgbMatch) return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])]

  const match = value.trim().match(/^#?([\da-f]{3}|[\da-f]{6})$/i)
  if (!match) return null

  const hex = match[1].length === 3 ? [...match[1]].map((part) => part.repeat(2)).join('') : match[1]
  return [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16)) as unknown as RGB
}

const toHexColor = (rgb: RGB): string =>
  `#${rgb
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`

const mix = (from: RGB, to: RGB, amount: number): RGB =>
  from.map((channel, index) => channel + (to[index] - channel) * amount) as unknown as RGB

const linearChannel = (channel: number): number => {
  const normalized = channel / 255
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
}

const luminance = ([red, green, blue]: RGB): number =>
  0.2126 * linearChannel(red) + 0.7152 * linearChannel(green) + 0.0722 * linearChannel(blue)

const contrastRatioForRGB = (first: RGB, second: RGB): number => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((left, right) => right - left)
  return (lighter + 0.05) / (darker + 0.05)
}

export const getContrastRatio = (foreground: string, background: string): number => {
  const foregroundRGB = parseHexColor(foreground)
  const backgroundRGB = parseHexColor(background)
  if (!foregroundRGB || !backgroundRGB) return 0
  return contrastRatioForRGB(foregroundRGB, backgroundRGB)
}

/**
 * Keep theme accents readable on the active surface while preserving the
 * configured hue as much as possible.
 */
export const getAccessiblePrimaryColor = (color: string, surface: ThemeSurface): string => {
  const source = parseHexColor(color)
  if (!source) return color

  const background = surface === 'dark' ? DARK_SURFACE : LIGHT_SURFACE
  if (contrastRatioForRGB(source, background) >= MINIMUM_CONTRAST) return toHexColor(source)

  const target = surface === 'dark' ? WHITE : BLACK
  let lower = 0
  let upper = 1

  for (let iteration = 0; iteration < 24; iteration += 1) {
    const amount = (lower + upper) / 2
    if (contrastRatioForRGB(mix(source, target, amount), background) >= MINIMUM_CONTRAST) {
      upper = amount
    } else {
      lower = amount
    }
  }

  return toHexColor(mix(source, target, upper))
}

export const getContrastingTextColor = (background: string): string => {
  const color = parseHexColor(background)
  if (!color) return '#ffffff'

  return contrastRatioForRGB(color, WHITE) >= contrastRatioForRGB(color, BLACK) ? '#ffffff' : '#000000'
}

export const getAccessibleTertiaryTextColor = (surface: ThemeSurface): string =>
  surface === 'dark' ? '#bfbfbf' : '#595959'
