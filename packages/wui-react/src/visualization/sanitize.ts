import DOMPurify from 'dompurify'
import { sanitizeSvg } from '../data-display/SvgPreview/sanitize'
const presentation = new Set([
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-dasharray',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'text-anchor',
  'dominant-baseline',
  'visibility',
])
/** Flatten safe presentation rules before stripping styles, so Mermaid nodes retain contrast.
 * CSS is parsed in an inert document and never installed in the consumer document. */
export function sanitizeDiagramSvg(source: string): string {
  if (typeof DOMParser === 'undefined') return ''
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml')
  const svg = doc.documentElement
  if (svg.localName !== 'svg' || doc.querySelector('parsererror')) return ''
  const apply = (element: Element, declaration: CSSStyleDeclaration) => {
    for (const property of presentation) {
      const value = declaration.getPropertyValue(property).trim()
      if (!value || /[\\<>]|(?:expression|javascript|@import)/i.test(value)) continue
      if (/url\s*\(/i.test(value) && !/^url\(\s*['"]?#[\w-]+['"]?\s*\)$/i.test(value)) continue
      element.setAttribute(property, value)
    }
  }
  const inert = document.implementation.createHTMLDocument('')
  for (const sourceStyle of svg.querySelectorAll('style')) {
    const sourceCss = (sourceStyle.textContent ?? '').replace(/\/\*[\s\S]*?\*\//g, '')
    // Extract local selector/declaration blocks; at-rule headers never become selectors.
    for (const match of sourceCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = match[1].trim()
      if (selector.includes('@')) continue
      const declaration = inert.createElement('span').style
      declaration.cssText = match[2]
      try {
        if (svg.matches(selector)) apply(svg, declaration)
        for (const element of svg.querySelectorAll(selector)) apply(element, declaration)
      } catch {
        /* Unsupported selectors have no presentation effect. */
      }
    }
  }
  for (const element of [svg, ...svg.querySelectorAll('[style]')]) {
    const style = inert.createElement('span').style
    style.cssText = element.getAttribute('style') ?? ''
    apply(element, style)
  }
  return sanitizeSvg(new XMLSerializer().serializeToString(svg))
}
export function sanitizeMarkmapHtml(source: string): string {
  return DOMPurify.sanitize(source, {
    ALLOWED_TAGS: ['a', 'b', 'strong', 'i', 'em', 'code', 'pre', 'span', 'br', 'p', 's', 'del', 'sub', 'sup'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
  })
}
