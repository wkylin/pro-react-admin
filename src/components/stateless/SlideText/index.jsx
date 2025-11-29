import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'

const SlideText = ({ text = [] }) => {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => text, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <span className="relative overflow-hidden pl-4 text-center">
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className="absolute font-semibold"
          initial={{ opacity: 0, y: -100 }}
          transition={{ type: 'spring', stiffness: 50 }}
          animate={
            titleNumber === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: titleNumber > index ? -150 : 150,
                  opacity: 0,
                }
          }
        >
          {title}
        </motion.span>
      ))}
    </span>
  )
}

export default SlideText
