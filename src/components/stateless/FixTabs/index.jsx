'use client'

import React, { useState, useEffect } from 'react'
import { useProThemeContext } from '@src/theme/hooks'
import styles from './index.module.less'

const FixTabs = ({ tabs = [], defaultActiveId }) => {
  const { themeSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'

  const [activeTab, setActiveTab] = useState(defaultActiveId || (tabs[0] && tabs[0].id))

  useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs, activeTab])

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  if (!tabs || tabs.length === 0) {
    return null
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <div className={styles.tabsHeader}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className={styles.tabLabel}>{tab.label}</div>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {tabs.map((tab) => (
          <div key={tab.id} className={`${styles.tabContent} ${activeTab === tab.id ? styles.active : ''}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FixTabs
