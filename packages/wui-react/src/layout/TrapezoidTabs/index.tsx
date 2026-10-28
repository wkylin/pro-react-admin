import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { theme } from 'antd'
import { useTabs } from '../useTabs'
import styles from './index.module.less'
export interface TrapezoidTab {
  name: string
  code: string
  content?: ReactNode
}
export interface TrapezoidTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs?: TrapezoidTab[]
  defaultActiveTab?: string
  activeTab?: string
  onTabChange?: (code: string) => void
  tabListLabel?: string
}
export default function TrapezoidTabs({
  tabs = [],
  defaultActiveTab,
  activeTab,
  onTabChange,
  tabListLabel = 'Tabs',
  className = '',
  style,
  ...props
}: TrapezoidTabsProps) {
  const { token } = theme.useToken()
  const { id, selected, select, keyDown } = useTabs(
    tabs.map((t) => t.code),
    activeTab,
    defaultActiveTab,
    onTabChange
  )
  const vars = {
    '--trapezoid-bg': token.colorFillQuaternary,
    '--trapezoid-text': token.colorText,
    '--trapezoid-active-bg': token.colorPrimary,
    '--trapezoid-active-text': token.colorTextLightSolid,
    '--trapezoid-hover-bg': token.colorFillTertiary,
    '--trapezoid-line-color': token.colorSplit,
    '--trapezoid-shadow-color': token.colorTextTertiary,
  } as CSSProperties
  return (
    <div className={`${styles.trapezoidTabs} ${className}`} style={{ ...vars, ...style }} {...props}>
      <div role="tablist" aria-label={tabListLabel} className={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            key={tab.code}
            id={`${id}-tab-${index}`}
            aria-controls={tab.content != null ? `${id}-panel-${index}` : undefined}
            aria-selected={selected === tab.code}
            tabIndex={selected === tab.code ? 0 : -1}
            className={`${styles.tabItem} ${selected === tab.code ? styles.active : ''}`}
            style={{ zIndex: selected === tab.code ? 100 : tabs.length - index }}
            onClick={() => select(tab.code)}
            onKeyDown={(event) => keyDown(event, index)}
          >
            <span data-text={tab.name} className={styles.tabContent}>
              {tab.name}
            </span>
          </button>
        ))}
      </div>
      {tabs.map(
        (tab, index) =>
          tab.content != null && (
            <div
              key={tab.code}
              role="tabpanel"
              id={`${id}-panel-${index}`}
              aria-labelledby={`${id}-tab-${index}`}
              tabIndex={0}
              hidden={selected !== tab.code}
            >
              {tab.content}
            </div>
          )
      )}
    </div>
  )
}
