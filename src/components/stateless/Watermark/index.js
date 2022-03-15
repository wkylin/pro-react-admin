const Watermark = (props) => {
  const {
    container = document.body,
    width = '300px',
    height = '240px',
    textAlign = 'center',
    verticalAlign = 'middle',
    font = '18px Microsoft Yahei',
    fillStyle = 'rgba(100, 100, 100, 0.2)',
    content = 'water mark',
    rotate = -20,
  } = props

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)

  ctx.textAlign = textAlign
  ctx.verticalAlign = verticalAlign
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2)

  const base64Url = canvas.toDataURL('image/png', 0.92)
  const _wm = document.querySelector('._wm')
  const watermarkDiv = _wm || document.createElement('div')

  const styleStr = `
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url('${base64Url}');
      pointer-events: none;`

  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('_wm')

  if (!_wm) {
    container.style.position = 'relative'
    container.insertBefore(watermarkDiv, container.firstChild)
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver

  if (MutationObserver) {
    let observer = new MutationObserver(() => {
      const _wm = document.querySelector('._wm')
      if ((_wm && _wm.getAttribute('style') !== styleStr) || !_wm) {
        observer.disconnect()
        observer = null
        Watermark(props)
      }
    })
    observer.observe(container, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    })
  }
}
export default Watermark
