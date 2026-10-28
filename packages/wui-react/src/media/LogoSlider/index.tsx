import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

export interface LogoCompany {
  src: string
  alt: string
}

export type SlideDirection = 'right' | 'left'

export interface LogoSliderProps {
  companies: LogoCompany[]
  autorotateTiming?: number
  direction?: SlideDirection
  radius?: number
}

const LogoSlider = ({ companies, autorotateTiming = 3000, direction = 'right', radius = 180 }: LogoSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const slide = React.useCallback(
    (dir: SlideDirection) => {
      const step = dir === 'right' ? 1 : -1
      setActiveIndex((prevIndex) => (prevIndex + step + companies.length) % companies.length)
    },
    [companies]
  )

  useEffect(() => {
    if (!companies || companies.length < 2 || autorotateTiming <= 0) return

    const interval = setInterval(() => {
      slide(direction)
    }, autorotateTiming)

    return () => clearInterval(interval)
  }, [companies, autorotateTiming, direction, slide])

  const calculatePosition = React.useCallback(
    (offset: number) => {
      const angle = offset * (Math.PI / 3)
      return {
        x: Math.sin(angle) * radius,
        y: -Math.cos(angle) * radius + radius / 2,
      }
    },
    [radius]
  )

  const logoVariants = useMemo<Variants>(
    () => ({
      enter: () => {
        const { x, y } = calculatePosition(direction === 'right' ? -2 : 2)
        return { x, y, opacity: 0, scale: 0.5 }
      },
      center: (offset: number) => {
        const { x, y } = calculatePosition(offset)
        return {
          x,
          y,
          opacity: 1,
          scale: offset === 0 ? 1 : 0.8,
          transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
        }
      },
      exit: () => {
        const { x, y } = calculatePosition(direction === 'right' ? 2 : -2)
        return {
          x,
          y,
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
        }
      },
    }),
    [direction, calculatePosition]
  )

  const visibleLogos = useMemo(() => {
    if (!companies || companies.length === 0) return []
    return [-1, 0, 1].map((offset) => {
      const index = (activeIndex + offset + companies.length) % companies.length
      return { offset, logo: companies[index], index }
    })
  }, [activeIndex, companies])

  return (
    <div>
      <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          <div
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', minHeight: 500, minWidth: 500 }}>
              <AnimatePresence initial={false} mode="popLayout">
                {visibleLogos.map(({ offset, logo, index }) => (
                  <motion.div
                    key={`${index}-${offset}`}
                    custom={offset}
                    variants={logoVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -40, marginTop: -27 }}
                  >
                    <img src={logo.src} width={80} height={80} alt={logo.alt} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoSlider
