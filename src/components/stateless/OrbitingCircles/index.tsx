import React from 'react'
import clsx from 'clsx'

export interface OrbitingItem {
  content: React.ReactNode
  radius?: number
  duration?: number
  reverse?: boolean
  iconSize?: number
  delay?: number
}

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  items?: OrbitingItem[]
  showPath?: boolean
  centerText?: string
}

/**
 * OrbitingCircles Component
 *
 * @param {string} className - Class name for the container
 * @param {Array} items - Array of items to orbit. Each item can have:
 *   - content: ReactNode (icon, text, etc.)
 *   - radius: number (orbit radius)
 *   - duration: number (seconds for one full orbit)
 *   - reverse: boolean (direction)
 *   - iconSize: number (size of the item)
 * @param {boolean} showPath - Whether to show the orbital path
 * @param {string} centerText - Text to display in the center
 */
const OrbitingCircles = ({
  className,
  items = [],
  showPath = true,
  centerText = 'Orbit',
  ...props
}: OrbitingCirclesProps) => {
  return (
    <div
      className={clsx(
        'bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg',
        className
      )}
      {...props}
    >
      {/* Inject Keyframes locally to ensure they exist */}
      <style>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg);
          }
        }
      `}</style>

      {/* Center Point (Optional, for visual reference) */}
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        {centerText}
      </span>

      {/* Render Orbits and Items */}
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((item, index) => {
          const radius = item.radius || 100 + index * 40 // Default radius increment if not provided
          const duration = item.duration || 20
          const reverse = item.reverse || index % 2 === 0 // Alternate direction by default
          const iconSize = item.iconSize || 30
          const delay = item.delay || 0

          return (
            <React.Fragment key={index}>
              {/* Orbital Path */}
              {showPath && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  style={{
                    zIndex: 0,
                  }}
                >
                  <circle
                    className="stroke-black/10 stroke-1 dark:stroke-white/10"
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="none"
                  />
                </svg>
              )}

              {/* Orbiting Item */}
              <div
                style={
                  {
                    '--radius': radius,
                    '--duration': duration,
                    '--icon-size': `${iconSize}px`,
                    width: iconSize,
                    height: iconSize,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: -iconSize / 2,
                    marginLeft: -iconSize / 2,
                    animation: `orbit ${duration}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                    animationDelay: `${delay}s`,
                    zIndex: 10,
                  } as React.CSSProperties
                }
                className="flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
              >
                {item.content}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
export default OrbitingCircles
