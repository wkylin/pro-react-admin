import React, { useState, useEffect } from 'react'
import { theme } from 'antd'
import styles from './index.module.less'

const TrapezoidTabs = ({ tabs = [{ name: 'tab', code: 'tab' }], onTabChange, defaultActiveTab, className, style }) => {
  const { token } = theme.useToken()
  const [activeTab, setActiveTab] = useState(() => defaultActiveTab || (tabs.length > 0 ? tabs[0].code : ''))

  const handleTabClick = (code) => {
    setActiveTab(code)
    onTabChange?.(code)
  }

  const cssVars = {
    '--trapezoid-bg': token.colorFillQuaternary,
    '--trapezoid-text': token.colorText,
    '--trapezoid-active-bg': token.colorPrimary,
    '--trapezoid-active-text': token.colorTextLightSolid,
    '--trapezoid-hover-bg': token.colorFillTertiary,
    '--trapezoid-line-color': token.colorSplit,
    '--trapezoid-shadow-color': token.colorTextTertiary,
  }

  return (
    <div className={`${styles.trapezoidTabs} ${className || ''}`} style={{ ...cssVars, ...style }}>
      <div className={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <div
            key={tab.code}
            className={`${styles.tabItem} ${activeTab === tab.code ? styles.active : ''}`}
            style={{
              zIndex: activeTab === tab.code ? 100 : tabs.length - index,
            }}
            onClick={() => handleTabClick(tab.code)}
          >
            <span data-text={tab.name} className={styles.tabContent}>
              {tab.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrapezoidTabs
