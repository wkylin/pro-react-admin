import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'

const COLORS = [
  'rgb(125 211 252)',
  'rgb(249 168 212)',
  'rgb(134 239 172)',
  'rgb(253 224 71)',
  'rgb(252 165 165)',
  'rgb(216 180 254)',
  'rgb(147 197 253)',
  'rgb(165 180 252)',
  'rgb(196 181 253)',
]

export const BoxesCore = ({ className, ...rest }) => {
  const rowsCount = 50
  const colsCount = 30

  // 随机颜色矩阵：在挂载后生成以避免在 render 中调用 Math.random（保持纯净）
  const [randomColors, setRandomColors] = useState(() => [])

  useEffect(() => {
    const matrix = []
    for (let i = 0; i < rowsCount; i++) {
      const row = []
      for (let j = 0; j < colsCount; j++) {
        row.push(COLORS[Math.floor(Math.random() * COLORS.length)])
      }
      matrix.push(row)
    }
    // defer to next frame to avoid layout thrash
    const id = requestAnimationFrame(() => setRandomColors(matrix))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={clsx(
        'absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4',
        className
      )}
      {...rest}
    >
      {Array.from({ length: rowsCount }).map((_, i) => (
        <motion.div key={`row` + i} className="relative h-8 w-16 border-l border-slate-700">
          {Array.from({ length: colsCount }).map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: randomColors?.[i]?.[j] || COLORS[(i + j) % COLORS.length] || 'transparent',
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 1 },
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-700"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

const BackgroundBoxes = React.memo(BoxesCore)
export default BackgroundBoxes
