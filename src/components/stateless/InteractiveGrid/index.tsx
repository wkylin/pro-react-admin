import React, { useState } from 'react'
import clsx from 'clsx'

const InteractiveGrid = ({ width = 40, height = 40, squares = [24, 24], className, squaresClassName, ...props }) => {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState(null)

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={clsx('absolute inset-0 h-full w-full border border-gray-400/30', className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={clsx(
              'stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000',
              hoveredSquare === index ? 'fill-gray-300/30' : 'fill-transparent',
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}

export default InteractiveGrid
