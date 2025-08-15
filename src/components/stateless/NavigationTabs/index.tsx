'use client'

import React, { useState } from 'react'
import styles from './index.module.less'

// 模拟组件数据
const mockComponents = {
  '0': () => <div className={styles.mockContent}>首页内容</div>,
  '1': () => <div className={styles.mockContent}>产品介绍内容</div>,
  '2': () => <div className={styles.mockContent}>关于我们内容</div>,
  '3-0': () => <div className={styles.mockContent}>服务概览内容</div>,
  '3-1': () => <div className={styles.mockContent}>技术支持内容</div>,
  '3-2': () => <div className={styles.mockContent}>售后服务内容</div>,
  '4': () => <div className={styles.mockContent}>联系我们内容</div>,
}

const NavigationTabs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [subActiveIndex, setSubActiveIndex] = useState<string>('')

  // 导航数据
  const navItems = [
    { label: '首页' },
    { label: '产品' },
    { label: '关于' },
    {
      label: '服务',
      children: [{ label: '概览' }, { label: '技术支持' }, { label: '售后' }],
    },
    { label: '联系' },
  ]

  // 处理一级导航点击
  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    const item = navItems[index]

    // 如果有子项，默认选中第一个子项
    if (item.children && item.children.length > 0) {
      setSubActiveIndex(`${index}-0`)
    } else {
      setSubActiveIndex('')
    }
  }

  // 处理二级导航点击
  const handleSubTabClick = (parentIndex: number, subIndex: number) => {
    setSubActiveIndex(`${parentIndex}-${subIndex}`)
  }

  // 获取当前要渲染的组件
  const getCurrentComponent = () => {
    const key = subActiveIndex || activeIndex.toString()
    const Component = mockComponents[key as keyof typeof mockComponents]
    return Component ? <Component /> : <div className={styles.mockContent}>默认内容</div>
  }

  return (
    <div className={styles.container}>
      {/* 一级导航 */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {navItems.map((item, index) => {
            const isActive = activeIndex === index
            const hasChildren = item.children && item.children.length > 0
            const isActiveWithChildren = isActive && hasChildren

            return (
              <div
                key={index}
                className={`${styles.tabItem} ${
                  isActiveWithChildren ? styles.hasArrow : isActive ? styles.actived : ''
                }`}
                onClick={() => handleTabClick(index)}
              >
                <span>{item.label}</span>
                {hasChildren && <span className={`${styles.arrow} ${isActive ? styles.arrowDown : ''}`}>▼</span>}
              </div>
            )
          })}
        </div>

        {/* 二级导航 */}
        {navItems[activeIndex]?.children && (
          <div className={styles.subTabsList}>
            {navItems[activeIndex].children!.map((subItem, subIndex) => {
              const isSubActive = subActiveIndex === `${activeIndex}-${subIndex}`

              return (
                <div
                  key={subIndex}
                  className={`${styles.subTabItem} ${isSubActive ? styles.presented : ''}`}
                  onClick={() => handleSubTabClick(activeIndex, subIndex)}
                >
                  {subItem.label}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className={styles.contentArea}>{getCurrentComponent()}</div>
    </div>
  )
}

export default NavigationTabs
