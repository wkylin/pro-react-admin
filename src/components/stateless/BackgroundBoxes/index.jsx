import React from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'

export const BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(50).fill(1)
  const cols = new Array(30).fill(1)

  const colors = [
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

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div
      style={{
        transform: 'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)',
      }}
      className={clsx(
        'absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0',
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={'row' + i} className="relative w-16 h-8 border-l border-slate-700">
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 1 },
              }}
              key={'col' + j}
              className="relative w-16 h-8 border-t border-r border-slate-700"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
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
