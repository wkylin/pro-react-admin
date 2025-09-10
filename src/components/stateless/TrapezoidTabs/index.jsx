import React, { useState, useEffect } from 'react'
import styles from './index.module.less'

const TrapezoidTabs = ({ tabs = [{ name: 'tab', code: 'tab' }], onTabChange, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    // 如果有默认激活标签，使用它；否则使用第一个标签
    const initialTab = defaultActiveTab || (tabs.length > 0 ? tabs[0].code : '')
    setActiveTab(initialTab)
  }, [tabs, defaultActiveTab])

  const handleTabClick = (code) => {
    setActiveTab(code)
    onTabChange?.(code)
  }

  return (
    <div className={styles.trapezoidTabs}>
      <div className={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <div
            key={tab.code}
            className={`${styles.tabItem} ${activeTab === tab.code ? styles.active : ''}`}
            style={{ zIndex: tabs.length - index }}
            onClick={() => handleTabClick(tab.code)}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrapezoidTabs
