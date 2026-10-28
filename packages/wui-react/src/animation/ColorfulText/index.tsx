import React from 'react'
import { motion } from 'motion/react'

const defaultColors = [
  'rgb(131, 179, 32)',
  'rgb(47, 195, 106)',
  'rgb(42, 169, 210)',
  'rgb(4, 112, 202)',
  'rgb(107, 10, 255)',
  'rgb(183, 0, 218)',
  'rgb(218, 0, 171)',
  'rgb(230, 64, 92)',
  'rgb(232, 98, 63)',
  'rgb(249, 129, 47)',
]

export interface ColorfulTextProps {
  text: string
  colors?: readonly string[]
  interval?: number
}
const ColorfulText = ({ text, colors: palette = defaultColors, interval: intervalMs = 5000 }: ColorfulTextProps) => {
  const colors = palette.length ? palette : defaultColors
  const [currentColors, setCurrentColors] = React.useState(colors)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(
      () => {
        const shuffled = [...colors].sort(() => Math.random() - 0.5)
        setCurrentColors(shuffled)
        setCount((prev) => prev + 1)
      },
      Math.max(1, intervalMs)
    )

    return () => clearInterval(interval)
  }, [palette, intervalMs])

  return (
    <span>
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clipPath: 'inset(50%)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {text}
      </span>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{
            y: 0,
          }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ['blur(0px)', `blur(5px)`, 'blur(0px)'],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre', fontFamily: 'sans-serif', letterSpacing: '-.025em' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default ColorfulText
