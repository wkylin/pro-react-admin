import React, { useEffect, useState, useRef, useId } from 'react'
import clsx from 'clsx'

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  distance: number
}

interface ShootingStarsProps {
  minSpeed?: number
  maxSpeed?: number
  minDelay?: number
  maxDelay?: number
  starColor?: string
  trailColor?: string
  starWidth?: number
  starHeight?: number
  className?: string
}

const getRandomStartPoint = (width: number, height: number) => {
  const side = Math.floor(Math.random() * 4)
  const offset = Math.random()

  switch (side) {
    case 0:
      return { x: offset * width, y: 0, angle: 45 }
    case 1:
      return { x: width, y: offset * height, angle: 135 }
    case 2:
      return { x: offset * width, y: height, angle: 225 }
    case 3:
      return { x: 0, y: offset * height, angle: 315 }
    default:
      return { x: 0, y: 0, angle: 45 }
  }
}
const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = '#9E00FF',
  trailColor = '#2EB9DF',
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const gradientId = `shooting-star-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    let width = 0
    let height = 0
    let currentStar: ShootingStar | null = null
    let frame: number | null = null
    let spawnTimer: ReturnType<typeof setTimeout> | null = null
    let lastTime: number | null = null
    let sequence = 0
    const slowest = Math.max(0.1, Math.min(minSpeed, maxSpeed))
    const fastest = Math.max(slowest, minSpeed, maxSpeed)
    const shortestDelay = Math.max(16, Math.min(minDelay, maxDelay))
    const longestDelay = Math.max(shortestDelay, minDelay, maxDelay)

    const moveStar = (time: number) => {
      frame = null
      if (!currentStar) return
      // Speeds retain their pixels-per-60Hz-frame meaning on other refresh rates.
      const elapsed = lastTime === null ? 1 : Math.min(3, Math.max(0, (time - lastTime) / (1000 / 60)))
      lastTime = time
      const distance = currentStar.speed * elapsed
      const x = currentStar.x + distance * Math.cos((currentStar.angle * Math.PI) / 180)
      const y = currentStar.y + distance * Math.sin((currentStar.angle * Math.PI) / 180)
      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
        currentStar = null
        setStar(null)
        return
      }
      currentStar = {
        ...currentStar,
        x,
        y,
        distance: currentStar.distance + distance,
        scale: 1 + (currentStar.distance + distance) / 100,
      }
      setStar(currentStar)
      frame = requestAnimationFrame(moveStar)
    }

    const createStar = () => {
      spawnTimer = null
      if (width <= 0 || height <= 0) return
      const { x, y, angle } = getRandomStartPoint(width, height)
      currentStar = {
        id: ++sequence,
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (fastest - slowest) + slowest,
        distance: 0,
      }
      setStar(currentStar)
      lastTime = null
      if (frame !== null) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(moveStar)
      spawnTimer = setTimeout(createStar, Math.random() * (longestDelay - shortestDelay) + shortestDelay)
    }

    const updateSize = () => {
      // Storybook and nested layouts can be much smaller than the window.
      const rect = svg.getBoundingClientRect()
      if (width === rect.width && height === rect.height) return
      width = rect.width
      height = rect.height
      if (spawnTimer !== null) clearTimeout(spawnTimer)
      if (frame !== null) cancelAnimationFrame(frame)
      spawnTimer = null
      frame = null
      currentStar = null
      setStar(null)
      createStar()
    }

    updateSize()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateSize)
    observer?.observe(svg)
    window.addEventListener('resize', updateSize)
    return () => {
      if (spawnTimer !== null) clearTimeout(spawnTimer)
      if (frame !== null) cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', updateSize)
    }
  }, [minSpeed, maxSpeed, minDelay, maxDelay])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#${gradientId})`}
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ShootingStars
