import React, { type ComponentPropsWithoutRef, type ReactNode, useEffect, useMemo, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

const AnimatedListItem = ({ children }: { children: ReactNode }) => {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring' as const, stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

type AnimatedListProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  delay?: number
}

const AnimatedList = React.memo(({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  useEffect(() => {
    if (index < childrenArray.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [index, delay, childrenArray.length])

  const itemsToShow = useMemo(() => {
    const result = childrenArray.slice(0, index + 1).reverse()
    return result
  }, [index, childrenArray])

  return (
    <div className={clsx(`flex flex-col items-center gap-4`, className)} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item, itemIndex) => (
          <AnimatedListItem key={React.isValidElement(item) ? (item.key ?? itemIndex) : itemIndex}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
})

export default AnimatedList
