import React, { useState, useMemo } from 'react'
import styles from './index.module.less'

export interface TabItem {
  label: string
  key?: string | number
  content?: React.ReactNode
  children?: TabItem[]
}

export interface NavigationTabsProps {
  items?: TabItem[]
  className?: string
  style?: React.CSSProperties
}

// 默认模拟数据，用于演示组件功能
const defaultItems: TabItem[] = [
  {
    label: '首页',
    content: <div className={styles.mockContent}>首页内容</div>,
  },
  {
    label: '产品',
    content: <div className={styles.mockContent}>产品介绍内容</div>,
  },
  {
    label: '关于',
    content: <div className={styles.mockContent}>关于我们内容</div>,
  },
  {
    label: '服务',
    children: [
      {
        label: '概览',
        content: <div className={styles.mockContent}>服务概览内容</div>,
      },
      {
        label: '技术支持',
        content: <div className={styles.mockContent}>技术支持内容</div>,
      },
      {
        label: '售后',
        content: <div className={styles.mockContent}>售后服务内容</div>,
      },
    ],
  },
  {
    label: '联系',
    content: <div className={styles.mockContent}>联系我们内容</div>,
  },
]

const NavigationTabs: React.FC<NavigationTabsProps> = ({ items = defaultItems, className, style }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [subActiveIndex, setSubActiveIndex] = useState<number>(0)

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    setSubActiveIndex(0) // 切换一级导航时，重置二级导航选中项
  }

  const handleSubTabClick = (index: number) => {
    setSubActiveIndex(index)
  }

  const activeItem = items[activeIndex]
  const subItems = activeItem?.children || []
  const hasChildren = subItems.length > 0

  // 获取当前显示的内容
  const currentContent = useMemo(() => {
    if (hasChildren) {
      return subItems[subActiveIndex]?.content || null
    }
    return activeItem?.content || null
  }, [activeItem, hasChildren, subItems, subActiveIndex])

  return (
    <div className={`${styles.container} ${className || ''}`} style={style}>
      {/* 一级导航 */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {items.map((item, index) => {
            const isActive = activeIndex === index
            const itemHasChildren = item.children && item.children.length > 0

            return (
              <div
                key={index}
                className={`${styles.tabItem} ${
                  itemHasChildren && isActive ? styles.hasArrow : isActive ? styles.actived : ''
                }`}
                onClick={() => handleTabClick(index)}
              >
                <span>{item.label}</span>
                {itemHasChildren && <span className={`${styles.arrow} ${isActive ? styles.arrowDown : ''}`}>▼</span>}
              </div>
            )
          })}
        </div>

        {/* 二级导航 */}
        {hasChildren && (
          <div className={styles.subTabsList}>
            {subItems.map((subItem, index) => {
              const isSubActive = subActiveIndex === index
              return (
                <div
                  key={index}
                  className={`${styles.subTabItem} ${isSubActive ? styles.presented : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSubTabClick(index)
                  }}
                >
                  {subItem.label}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className={styles.contentArea}>{currentContent || <div className={styles.mockContent}>暂无内容</div>}</div>
    </div>
  )
}

export default NavigationTabs
