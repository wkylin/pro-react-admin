import React from 'react'
import { Tooltip } from 'antd'
import styles from './index.module.less'

import iconQuestion from './icons/icon-question.png'
import iconBook from './icons/book.png'
import iconWallet from './icons/wallet.png'

const defaultIcons = {
  book: iconBook,
  wallet: iconWallet,
  question: iconQuestion,
}

const StatisticCard = ({
  items = [
    {
      title: '参与项目数量',
      value: 10,
      unit: '宗',
      icon: 'book',
      showTooltip: true,
      tooltipContent: '参与项目：缴纳保证金即为参与',
      tooltipPlacement: 'top',
    },
    {
      title: '同比增长',
      value: 20,
      unit: '%',
      icon: 'wallet',
      showTooltip: false,
    },
  ],
}) => {
  const getIconPath = (iconName) => {
    return defaultIcons[iconName]
  }

  return (
    <div className={styles.statisticCard}>
      {items.map((item, index) => (
        <div key={index} className={styles.statisticCardItem}>
          <div className={styles.flexRoundSpace}>
            <div className={styles.flexRoundLeft}>
              <img src={getIconPath(item.icon)} width="50" alt={`${item.title} icon`} />
              <span>{item.title}</span>
              {item.showTooltip && (
                <Tooltip placement={item.tooltipPlacement || 'leftTop'} title={item.tooltipContent}>
                  <img src={iconQuestion} width="15" alt="question" />
                </Tooltip>
              )}
            </div>
            <div className={styles.flexRoundRight}>
              <span className={styles.num}>{item.value}</span>
              {item.unit}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatisticCard
