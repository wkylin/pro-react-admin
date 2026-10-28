import React, { useState } from 'react'
export interface InteractiveGridProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  width?: number
  height?: number
  squares?: [number, number]
  squaresClassName?: string
  cellProps?: React.SVGProps<SVGRectElement>
}
const InteractiveGrid = ({
  width = 40,
  height = 40,
  squares = [24, 24],
  squaresClassName,
  cellProps,
  style,
  ...props
}: InteractiveGridProps) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const horizontal = Math.max(0, Math.floor(squares[0])),
    vertical = Math.max(0, Math.floor(squares[1]))
  return (
    <svg
      aria-hidden="true"
      width={width * horizontal}
      height={height * vertical}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: '1px solid #9ca3af4d', ...style }}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }, (_, index) => (
        <rect
          {...cellProps}
          key={index}
          x={(index % horizontal) * width}
          y={Math.floor(index / horizontal) * height}
          width={width}
          height={height}
          className={squaresClassName}
          style={{
            stroke: '#9ca3af4d',
            fill: hovered === index ? '#d1d5db4d' : 'transparent',
            transition: `fill ${hovered === index ? '.1' : '1'}s`,
            ...cellProps?.style,
          }}
          onMouseEnter={(e) => {
            setHovered(index)
            cellProps?.onMouseEnter?.(e)
          }}
          onMouseLeave={(e) => {
            setHovered(null)
            cellProps?.onMouseLeave?.(e)
          }}
        />
      ))}
    </svg>
  )
}
export default InteractiveGrid
