import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTabs } from '../useTabs'
import styles from './index.module.less'
export interface AnimationTab {
  title: string
  value: string
  content: ReactNode
}
export interface AnimationTabsProps {
  tabs: AnimationTab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
  activeValue?: string
  defaultActiveValue?: string
  onValueChange?: (value: string) => void
  tabListLabel?: string
}
export interface FadeInDivProps {
  className?: string
  tabs: AnimationTab[]
  hovering: boolean
}
export const FadeInDiv = ({ className = '', tabs, hovering }: FadeInDivProps) => (
  <div className={styles.stack}>
    {tabs.map((tab, index) => (
      <motion.div
        key={tab.value}
        aria-hidden={index !== 0}
        style={{
          scale: Math.max(0.7, 1 - index * 0.1),
          top: hovering ? index * -50 : 0,
          zIndex: tabs.length - index,
          opacity: index < 3 ? 1 - index * 0.1 : 0,
          pointerEvents: index === 0 ? 'auto' : 'none',
        }}
        animate={{ y: index === 0 ? [0, 40, 0] : 0 }}
        className={`${styles.card} ${className}`}
      >
        {index === 0 ? tab.content : null}
      </motion.div>
    ))}
  </div>
)
export default function AnimationTabs({
  tabs,
  containerClassName = '',
  activeTabClassName = '',
  tabClassName = '',
  contentClassName,
  activeValue,
  defaultActiveValue,
  onValueChange,
  tabListLabel = 'Tabs',
}: AnimationTabsProps) {
  const { id, selected, select, keyDown } = useTabs(
    tabs.map((t) => t.value),
    activeValue,
    defaultActiveValue,
    onValueChange
  )
  const [hovering, setHovering] = useState(false)
  const index = tabs.findIndex((t) => t.value === selected)
  const ordered = index < 0 ? [] : [tabs[index], ...tabs.filter((t) => t.value !== selected)]
  return (
    <>
      <div role="tablist" aria-label={tabListLabel} className={`${styles.tabs} ${containerClassName}`}>
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-controls={`${id}-panel`}
            aria-selected={tab.value === selected}
            tabIndex={tab.value === selected ? 0 : -1}
            className={`${styles.tab} ${tabClassName}`}
            onClick={() => select(tab.value)}
            onKeyDown={(event) => keyDown(event, i)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {tab.value === selected && (
              <motion.span
                aria-hidden
                layoutId={`${id}-active`}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={`${styles.active} ${activeTabClassName}`}
              />
            )}
            <span className={styles.label}>{tab.title}</span>
          </button>
        ))}
      </div>
      {index >= 0 && (
        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={0}>
          <FadeInDiv tabs={ordered} hovering={hovering} className={contentClassName} />
        </div>
      )}
    </>
  )
}
