import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

const MagicTrail = ({
  className,
  colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'],
  particleCount = 50,
  trailLength = 35,
  decay = 0.03,
  smoothing = 0.65,
  containerRef
}) => {
  const canvasRef = useRef(null)
  const points = useRef([])
  const particles = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef(null)
  const colorIndex = useRef(0)
  const lastAddTime = useRef(0)
  const isPointerInBounds = useRef(true)

  const createParticle = (x, y, color) => {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 2 + 1
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color,
      size: Math.random() * 3 + 1
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef?.current || canvas?.parentElement
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      isPointerInBounds.current = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

      if (isPointerInBounds.current) {
        targetPos.current = { x, y }
      }
    }

    const handleMouseLeave = () => {
      isPointerInBounds.current = false
    }

    const addPoint = () => {
      if (!isPointerInBounds.current) {
        return
      }

      const now = performance.now()
      const timeDiff = now - lastAddTime.current

      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * smoothing
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * smoothing

      const lastPoint = points.current[points.current.length - 1]
      const distance = lastPoint
        ? Math.hypot(mousePos.current.x - lastPoint.x, mousePos.current.y - lastPoint.y)
        : Infinity

      if (distance > 2 || timeDiff > 16) {
        const currentColor = colors[colorIndex.current]

        points.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          age: 0,
          color: currentColor
        })

        for (let i = 0; i < 3; i++) {
          particles.current.push(createParticle(mousePos.current.x, mousePos.current.y, currentColor))
        }

        if (distance > 10) {
          colorIndex.current = (colorIndex.current + 1) % colors.length
        }

        lastAddTime.current = now

        if (points.current.length > trailLength) {
          points.current.shift()
        }

        if (particles.current.length > particleCount) {
          particles.current = particles.current.slice(-particleCount)
        }
      }
    }

    const drawSparkle = (x, y, size, color) => {
      const opacity = Math.random() * 0.5 + 0.5
      ctx.strokeStyle = `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`
      ctx.lineWidth = size * 0.5

      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i
        ctx.beginPath()
        ctx.moveTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size)
        ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size)
        ctx.stroke()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      addPoint()

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 15

      for (let i = 1; i < points.current.length; i++) {
        const point = points.current[i]
        const prevPoint = points.current[i - 1]
        const opacity = Math.max(1 - point.age, 0)
        const size = Math.max(4 * (1 - point.age), 0)

        ctx.shadowColor = point.color
        const gradient = ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y)

        const prevOpacity = Math.max(1 - prevPoint.age, 0)
        gradient.addColorStop(
          0,
          `${prevPoint.color}${Math.floor(prevOpacity * 255)
            .toString(16)
            .padStart(2, '0')}`
        )
        gradient.addColorStop(
          1,
          `${point.color}${Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, '0')}`
        )

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = size
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }

      ctx.shadowBlur = 0
      particles.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.05
        particle.life -= 0.02

        // if (particle.life > 0) {
        //   const opacity = particle.life;
        //   drawSparkle(
        //     particle.x,
        //     particle.y,
        //     particle.size * opacity,
        //     particle.color,
        //   );
        // }
      })

      particles.current = particles.current.filter((p) => p.life > 0)

      points.current.forEach((point) => {
        point.age += decay
      })
      points.current = points.current.filter((point) => point.age < 1)

      animationFrameId.current = requestAnimationFrame(animate)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [colors, trailLength, decay, smoothing, particleCount, containerRef])

  return (
    <div
      className={clsx('pointer-events-none absolute inset-0', className)}
      style={{ width: '100%', height: '100%', zIndex: 100 }}
    >
      <canvas ref={canvasRef} className='pointer-events-none absolute inset-0 h-full w-full' />
    </div>
  )
}

export default MagicTrail
