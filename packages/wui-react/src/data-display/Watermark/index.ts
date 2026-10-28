export interface WatermarkOptions {
  container?: HTMLElement
  width?: string
  height?: string
  textAlign?: CanvasTextAlign
  font?: string
  fillStyle?: string
  content?: string
  rotate?: number
}
export type WatermarkDisposer = () => void
/** Install a watermark in one container; return a disposer for effect cleanup. */
const Watermark = ({
  container,
  width = '300px',
  height = '240px',
  textAlign = 'center',
  font = '18px Microsoft Yahei',
  fillStyle = 'rgba(100, 100, 100, 0.2)',
  content = 'water mark',
  rotate = -20,
}: WatermarkOptions = {}): WatermarkDisposer => {
  if (typeof document === 'undefined') return () => {}
  container ??= document.body
  const canvas = document.createElement('canvas')
  canvas.width = parseFloat(width)
  canvas.height = parseFloat(height)
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  ctx.textAlign = textAlign
  ctx.textBaseline = 'middle'
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.fillText(content, 0, 0)

  const watermarkDiv = document.createElement('div')
  watermarkDiv.className = 'wm'
  watermarkDiv.setAttribute('aria-hidden', 'true')
  const style = `width:100%;height:100%;position:absolute;inset:0;z-index:99999;background:url('${canvas.toDataURL()}');pointer-events:none;`
  watermarkDiv.setAttribute('style', style)
  const previousPosition = container.style.position
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative'
  container.insertBefore(watermarkDiv, container.firstChild)

  let disposed = false
  const observer = new MutationObserver(() => {
    if (disposed) return
    if (watermarkDiv.parentElement !== container) container.prepend(watermarkDiv)
    if (watermarkDiv.getAttribute('style') !== style) watermarkDiv.setAttribute('style', style)
  })
  observer.observe(container, { attributes: true, childList: true, subtree: true })
  return () => {
    disposed = true
    observer.disconnect()
    watermarkDiv.remove()
    if (container.style.position === 'relative') container.style.position = previousPosition
  }
}
export default Watermark
