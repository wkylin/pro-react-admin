import React from 'react'
import { Tooltip } from 'antd'
import { BookOpen, Wallet, TrendingUp, HelpCircle, LucideIcon } from 'lucide-react'
import { useProThemeContext } from '@src/theme/hooks'
import styles from './index.module.less'

const iconMap = {
  book: BookOpen,
  wallet: Wallet,
  rate: TrendingUp,
}

const StatisticCard = ({ items = [] }) => {
  const { themeSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName] || BookOpen
    return <Icon size={24} />
  }

  return (
    <div className={`${styles.statisticCard} ${isDark ? styles.dark : ''}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.statisticCardItem}>
          <div className={styles.flexRoundSpace}>
            <div className={styles.flexRoundLeft}>
              <div className={styles.iconWrapper}>{getIcon(item.icon)}</div>
              <span>{item.title}</span>
              {item.showTooltip && (
                <Tooltip placement={item.tooltipPlacement || 'top'} title={item.tooltipContent}>
                  <HelpCircle size={16} className={styles.helpIcon} />
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
