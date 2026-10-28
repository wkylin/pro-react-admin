import type { HTMLAttributes, ReactNode } from 'react'
import { useTabs } from '../useTabs'
import styles from './index.module.less'
export type FixTabId = string | number
export interface FixTab {
  id: FixTabId
  label: ReactNode
  content: ReactNode
}
export interface FixTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs?: FixTab[]
  defaultActiveId?: FixTabId
  activeId?: FixTabId
  onActiveIdChange?: (id: FixTabId) => void
  theme?: 'light' | 'dark'
  tabListLabel?: string
}
export default function FixTabs({
  tabs = [],
  defaultActiveId,
  activeId,
  onActiveIdChange,
  theme = 'light',
  tabListLabel = 'Tabs',
  className = '',
  ...props
}: FixTabsProps) {
  const { id, selected, select, keyDown } = useTabs(
    tabs.map((t) => t.id),
    activeId,
    defaultActiveId,
    onActiveIdChange
  )
  if (!tabs.length) return null
  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''} ${className}`} {...props}>
      <div role="tablist" aria-label={tabListLabel} className={styles.tabsHeader}>
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={selected === tab.id}
            tabIndex={selected === tab.id ? 0 : -1}
            key={tab.id}
            className={`${styles.tabButton} ${selected === tab.id ? styles.active : ''}`}
            onClick={() => select(tab.id)}
            onKeyDown={(event) => keyDown(event, index)}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {tabs.map((tab, index) => (
          <div
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            hidden={selected !== tab.id}
            tabIndex={0}
            key={tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
