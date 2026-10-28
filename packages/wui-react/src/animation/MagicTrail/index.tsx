import batchBStyles from '../batch-b.module.less'
import { useEffect, useRef, type RefObject } from 'react'
import clsx from 'clsx'

// Keep package CSS in runtime builds without leaking a style import into declarations.
void batchBStyles

export interface MagicTrailProps {
  className?: string
  colors?: string[]
  particleCount?: number
  trailLength?: number
  decay?: number
  smoothing?: number
  containerRef?: RefObject<HTMLElement | null>
}

interface TrailPoint {
  x: number
  y: number
  age: number
  color: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

const DEFAULT_COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981']

const createParticle = (x: number, y: number, color: string): Particle => {
  const angle = Math.random() * Math.PI * 2
  const speed = Math.random() * 2 + 1
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    color,
    size: Math.random() * 3 + 1,
  }
}

const MagicTrail = ({
  className,
  colors = DEFAULT_COLORS,
  particleCount = 50,
  trailLength = 35,
  decay = 0.03,
  smoothing = 0.65,
  containerRef,
}: MagicTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    // The overlay ignores pointer events; listen on its host instead.
    const container = containerRef?.current ?? canvas?.parentElement?.parentElement
    if (!canvas || !container) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return
    const ctx: CanvasRenderingContext2D = context

    const palette = colors.length ? colors : DEFAULT_COLORS
    const maxPoints = Math.max(0, Math.floor(trailLength))
    const maxParticles = Math.max(0, Math.floor(particleCount))
    const fade = Math.min(1, Math.max(0.001, decay))
    const follow = Math.min(1, Math.max(0.01, smoothing))
    let points: TrailPoint[] = []
    let particles: Particle[] = []
    let mousePos = { x: 0, y: 0 }
    let targetPos = { x: 0, y: 0 }
    let lastEmittedPosition: { x: number; y: number } | null = null
    let isPointerInBounds = false
    let animationFrameId: number | null = null
    let colorIndex = 0
    let width = 0
    let height = 0
    let pixelRatio = 0

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      if (width === rect.width && height === rect.height && pixelRatio === dpr) return
      width = rect.width
      height = rect.height
      pixelRatio = dpr
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      points = []
      particles = []
      lastEmittedPosition = null
      isPointerInBounds = false
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // A supplied event owner may be an ancestor of the positioned canvas.
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (rect.width <= 0 || rect.height <= 0 || x < 0 || x > rect.width || y < 0 || y > rect.height) {
        isPointerInBounds = false
        return
      }
      if (!isPointerInBounds) {
        mousePos = { x, y }
        lastEmittedPosition = null
        points = []
      }
      isPointerInBounds = true
      targetPos = { x, y }
      if (animationFrameId === null) animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseLeave = () => {
      isPointerInBounds = false
    }

    const addPoint = () => {
      if (!isPointerInBounds) return

      mousePos.x += (targetPos.x - mousePos.x) * follow
      mousePos.y += (targetPos.y - mousePos.y) * follow

      const distance = lastEmittedPosition
        ? Math.hypot(mousePos.x - lastEmittedPosition.x, mousePos.y - lastEmittedPosition.y)
        : Infinity
      if (distance <= 2) return
      const color = palette[colorIndex]
      lastEmittedPosition = { ...mousePos }
      if (maxPoints > 0) {
        points.push({ ...mousePos, age: 0, color })
        if (points.length > maxPoints) points.shift()
      }
      for (let i = 0; i < Math.min(3, maxParticles); i++) {
        particles.push(createParticle(mousePos.x, mousePos.y, color))
      }
      if (particles.length > maxParticles) particles = particles.slice(-maxParticles)
      if (distance > 10) colorIndex = (colorIndex + 1) % palette.length
    }

    function animate() {
      animationFrameId = null
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      addPoint()

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 15

      for (let i = 1; i < points.length; i++) {
        const point = points[i]
        const prevPoint = points[i - 1]
        const opacity = Math.max(1 - point.age, 0)
        const size = Math.max(4 * (1 - point.age), 0)

        ctx.shadowColor = point.color
        const gradient = ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y)
        gradient.addColorStop(0, prevPoint.color)
        gradient.addColorStop(1, point.color)

        ctx.beginPath()
        ctx.globalAlpha = opacity
        ctx.strokeStyle = gradient
        ctx.lineWidth = size
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }

      ctx.shadowBlur = 6
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.05
        particle.life -= 0.02

        if (particle.life > 0) {
          ctx.beginPath()
          ctx.globalAlpha = particle.life
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      particles = particles.filter((particle) => particle.life > 0)
      points.forEach((point) => {
        point.age += fade
      })
      points = points.filter((point) => point.age < 1)
      if (points.length || particles.length) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }

    updateCanvasSize()
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateCanvasSize)
    resizeObserver?.observe(canvas)
    window.addEventListener('resize', updateCanvasSize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', updateCanvasSize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      ctx.clearRect(0, 0, width, height)
    }
  }, [colors, trailLength, decay, smoothing, particleCount, containerRef])

  return (
    <div
      aria-hidden="true"
      className={clsx('wui-magic-trail', className)}
      style={{ width: '100%', height: '100%', zIndex: 100 }}
    >
      <canvas ref={canvasRef} className="wui-magic-trail-canvas" />
    </div>
  )
}

export default MagicTrail
