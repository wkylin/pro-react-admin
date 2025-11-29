import React, { useEffect } from 'react'

type Props = {
  content: string
  children: React.ReactNode
  containerId?: string
  opacity?: number
  rotate?: number
}

export const WatermarkProvider: React.FC<Props> = ({
  content,
  children,
  containerId = 'root',
  opacity = 0.06,
  rotate = -22,
}) => {
  useEffect(() => {
    const container = document.getElementById(containerId) ?? document.body
    const wm = document.createElement('div')
    wm.setAttribute('data-watermark', 'true')
    Object.assign(wm.style, {
      pointerEvents: 'none',
      position: 'fixed',
      inset: '0',
      zIndex: '2147483647',
      backgroundImage: `url("${genWatermarkDataUrl(content, opacity, rotate)}")`,
      backgroundRepeat: 'repeat',
    } as CSSStyleDeclaration)

    container.appendChild(wm)
    return () => {
      wm.remove()
    }
  }, [content, containerId, opacity, rotate])

  return <>{children}</>
}

function genWatermarkDataUrl(text: string, opacity: number, rotate: number) {
  const canvas = document.createElement('canvas')
  const size = 220
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)
  ctx.globalAlpha = opacity
  ctx.translate(size / 2, size / 2)
  ctx.rotate((rotate * Math.PI) / 180)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#000'
  ctx.font = '16px sans-serif'
  ctx.fillText(text, 0, 0)
  return canvas.toDataURL()
}

export default WatermarkProvider
