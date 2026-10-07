import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { type ReactNode } from 'react'
import { Tooltip, type TooltipProps } from 'antd'
import { BookOpen, Wallet, TrendingUp, HelpCircle } from 'lucide-react'
import { useProThemeContext } from '@src/theme/hooks'
import styles from './index.module.less'

const iconMap = {
  book: BookOpen,
  wallet: Wallet,
  rate: TrendingUp,
}

type StatisticCardItem = {
  title: ReactNode
  value: ReactNode
  unit?: ReactNode
  icon?: keyof typeof iconMap
  showTooltip?: boolean
  tooltipPlacement?: TooltipProps['placement']
  tooltipContent?: ReactNode
}

type StatisticCardProps = {
  items?: StatisticCardItem[]
}

const StatisticCard = ({ items = [] }: StatisticCardProps) => {
  const { themeSettings } = useProThemeContext()
  const isDark = themeSettings.themeMode === 'dark'

  const getIcon = (iconName: StatisticCardItem['icon']) => {
    const Icon = (iconName && iconMap[iconName]) || BookOpen
    return (
      <AnimatedIcon variant="spin" mode="hover">
        <Icon size={24} />
      </AnimatedIcon>
    )
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
                  <AnimatedIcon variant="spin" mode="hover">
                    <HelpCircle size={16} className={styles.helpIcon} />
                  </AnimatedIcon>
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
