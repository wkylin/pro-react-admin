import React from 'react'
import clsx from 'clsx'
import { theme } from 'antd'

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
  centerTextStyle?: React.CSSProperties
  centerTextClassName?: string
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
 * @param {React.CSSProperties} centerTextStyle - Custom style for the center text
 * @param {string} centerTextClassName - Custom class name for the center text
 */
const OrbitingCircles = ({
  className,
  items = [],
  showPath = true,
  centerText = 'Orbit',
  centerTextStyle,
  centerTextClassName,
  ...props
}: OrbitingCirclesProps) => {
  const { token } = theme.useToken()

  const calculatedItems = React.useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        radius: item.radius || 100 + index * 40,
        duration: item.duration || 20,
        reverse: item.reverse !== undefined ? item.reverse : index % 2 === 0,
        iconSize: item.iconSize || 30,
        delay: item.delay || 0,
      })),
    [items]
  )

  return (
    <div
      className={clsx(
        'relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg',
        className
      )}
      style={{ backgroundColor: token.colorBgLayout, ...props.style }}
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
      <span
        className={clsx(
          'pointer-events-none bg-clip-text text-center text-4xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent md:text-6xl',
          centerTextClassName
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${token.colorText}, ${token.colorTextQuaternary})`,
          zIndex: 1,
          ...centerTextStyle,
        }}
      >
        {centerText}
      </span>

      {/* Render Orbital Paths (Single SVG for performance) */}
      {showPath && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ zIndex: 0 }}
        >
          {calculatedItems.map((item, index) => (
            <circle
              key={index}
              className="stroke-1"
              cx="50%"
              cy="50%"
              r={item.radius}
              fill="none"
              stroke={token.colorBorder}
              style={{ opacity: 0.5 }}
            />
          ))}
        </svg>
      )}

      {/* Render Orbiting Items */}
      <div className="absolute inset-0 flex items-center justify-center">
        {calculatedItems.map((item, index) => (
          <div
            key={index}
            style={
              {
                '--radius': item.radius,
                '--duration': item.duration,
                '--icon-size': `${item.iconSize}px`,
                width: item.iconSize,
                height: item.iconSize,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -item.iconSize / 2,
                marginLeft: -item.iconSize / 2,
                animation: `orbit ${item.duration}s linear infinite`,
                animationDirection: item.reverse ? 'reverse' : 'normal',
                animationDelay: `${item.delay}s`,
                zIndex: 10,
                backgroundColor: token.colorBgContainer,
                // Set initial transform to prevent items from bunching in center before animation starts
                transform: `rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)`,
                willChange: 'transform',
              } as React.CSSProperties
            }
            className="flex items-center justify-center rounded-full shadow-sm backdrop-blur-sm"
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}
export default OrbitingCircles
