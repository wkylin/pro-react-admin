'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'

const AnimationTabs = ({ tabs: propTabs, containerClassName, activeTabClassName, tabClassName, contentClassName }) => {
  const [active, setActive] = useState(propTabs[0])
  const [tabs, setTabs] = useState(propTabs)

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  const [hovering, setHovering] = useState(false)

  return (
    <>
      <div
        className={clsx(
          'no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible',
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={clsx('relative rounded-full px-4 py-2', tabClassName)}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedButton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={clsx('absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800', activeTabClassName)}
              />
            )}

            <span className="relative block text-black dark:text-white">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={clsx('mt-32', contentClassName)}
      />
    </>
  )
}

export const FadeInDiv = ({ className, tabs, hovering }) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value
  }
  return (
    <div className="relative h-full w-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={clsx('absolute top-0 left-0 h-full w-full', className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  )
}

export default AnimationTabs
