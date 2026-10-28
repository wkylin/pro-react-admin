import DOMPurify from 'dompurify'
/** Only static SVG primitives; links, embedded HTML, animation and external resources are removed. */
export function sanitizeSvg(source: string): string {
  if (typeof DOMParser === 'undefined') return ''
  const clean = DOMPurify.sanitize(source, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: [
      'foreignObject',
      'style',
      'script',
      'a',
      'image',
      'use',
      'animate',
      'animateMotion',
      'animateTransform',
      'set',
    ],
    FORBID_ATTR: ['style', 'href', 'xlink:href', 'src'],
  })
  const document = new DOMParser().parseFromString(clean, 'image/svg+xml')
  const svg = document.documentElement
  if (svg.localName !== 'svg' || document.querySelector('parsererror')) return ''
  for (const node of [svg, ...svg.querySelectorAll('*')]) {
    for (const attribute of [...node.attributes]) {
      if (attribute.value.includes('\\')) {
        node.removeAttribute(attribute.name)
        continue
      }
      if (/url\s*\(/i.test(attribute.value) && !/^url\(\s*['"]?#[\w-]+['"]?\s*\)$/i.test(attribute.value))
        node.removeAttribute(attribute.name)
    }
  }
  return new XMLSerializer().serializeToString(svg)
}
