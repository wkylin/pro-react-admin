export function exportSvg(svgElement, fileName = 'mySvg.svg') {
  if (!svgElement) return false

  const clone = svgElement.cloneNode(true)

  if (!clone.hasAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }

  const inlineImportantStyles = (el) => {
    try {
      const cs = window.getComputedStyle(el)
      const props = [
        'stroke',
        'stroke-width',
        'stroke-linecap',
        'stroke-linejoin',
        'fill',
        'opacity',
        'stroke-dasharray',
        'stroke-dashoffset',
        'color',
        'font-size',
      ]
      props.forEach((p) => {
        const v = cs.getPropertyValue(p)
        if (v) el.setAttribute(p, v)
      })
    } catch (e) {
      // ignore
      console.log('e', e)
    }
  }

  ;[clone, ...Array.from(clone.querySelectorAll('*'))].forEach(inlineImportantStyles)

  const rect = svgElement.getBoundingClientRect()
  const width = clone.getAttribute('width') || rect.width || 300
  const height = clone.getAttribute('height') || rect.height || 150
  clone.setAttribute('width', width)
  clone.setAttribute('height', height)

  if (!clone.hasAttribute('viewBox')) {
    try {
      const bbox = clone.getBBox()
      if (bbox && bbox.width && bbox.height) {
        clone.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
      } else {
        clone.setAttribute('viewBox', `0 0 ${width} ${height}`)
      }
    } catch (e) {
      console.log('e', e)
      clone.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }
  }

  const svgContent = new XMLSerializer().serializeToString(clone)
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || 'mySvg.svg'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  return true
}

export default exportSvg
