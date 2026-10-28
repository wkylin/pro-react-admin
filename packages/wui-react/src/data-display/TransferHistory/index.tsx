import { useState, useRef, useLayoutEffect } from 'react'
import type { MouseEventHandler, ReactNode } from 'react'
import { Button } from 'antd'
import { ChevronDown as DownOutlined, ChevronUp as UpOutlined } from 'lucide-react'
import styles from './index.module.less'

export interface TransferHistoryProps {
  defaultDisplayCount?: number
  groups?: readonly TransferHistoryGroup[]
  theme?: 'light' | 'dark'
  expandLabel?: string
  collapseLabel?: string
  renderTitle?: (group: TransferHistoryGroup) => ReactNode
  renderLabel?: (record: TransferRecord | TransferCompany) => ReactNode
  renderRatio?: (company: TransferCompany) => ReactNode
}

export interface TransferRecord {
  name: string
  value: string
  id: string
  level?: 3
}

export interface TransferCompany {
  name: string
  id: string
  level?: 2
  children: TransferRecord[]
  ratio: string
}

export interface TransferHistoryGroup {
  name: string
  id: string
  level?: 1
  children: TransferCompany[]
}

type ScheduledFrame = () => void

const scheduleFrame = (callback: FrameRequestCallback): ScheduledFrame => {
  if (typeof requestAnimationFrame !== 'undefined') {
    const frame = requestAnimationFrame(callback)
    return () => cancelAnimationFrame(frame)
  }
  const timeout = setTimeout(callback, 0)
  return () => clearTimeout(timeout)
}

/**
 * 转让历史组件
 * @param {Object} props - 组件属性
 * @param {number} [props.defaultDisplayCount=3] - 默认显示的子项数量
 */
const HistoryGroup = ({
  group,
  defaultDisplayCount = 3,
  theme = 'light',
  expandLabel = 'Show all',
  collapseLabel = 'Show less',
  renderTitle,
  renderLabel,
  renderRatio,
}: Omit<TransferHistoryProps, 'groups'> & { group: TransferHistoryGroup }) => {
  const isDark = theme === 'dark'
  const transferData = [group]
  defaultDisplayCount = Number.isFinite(defaultDisplayCount) ? Math.max(1, Math.floor(defaultDisplayCount)) : 3
  const [expanded, setExpanded] = useState<boolean>(false)
  const [leftLineHeight, setLeftLineHeight] = useState<string>('0px')
  const leftLineRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  /**
   * 切换展开/折叠状态
   */
  const toggleExpand: MouseEventHandler<HTMLButtonElement> = () => {
    setExpanded((currentExpanded) => !currentExpanded)
  }

  useLayoutEffect(() => {
    let cancelMeasurement: ScheduledFrame | null = null
    const queueMeasurement = () => {
      cancelMeasurement?.()
      cancelMeasurement = scheduleFrame(() => {
        cancelMeasurement = null
        const visibleItems = itemRefs.current.filter((element) => element !== null)
        const first = visibleItems[0]?.getBoundingClientRect()
        const last = visibleItems[visibleItems.length - 1]?.getBoundingClientRect()
        // Stop at the last company center, excluding the expand button.
        const height = first && last ? last.top + last.height / 2 - (first.top + first.height / 2) : 0
        setLeftLineHeight(`${Math.max(0, height)}px`)
      })
    }

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(queueMeasurement)
    if (leftLineRef.current) observer?.observe(leftLineRef.current)
    itemRefs.current.forEach((element) => {
      if (element) observer?.observe(element)
    })
    queueMeasurement()
    window.addEventListener('resize', queueMeasurement)
    return () => {
      window.removeEventListener('resize', queueMeasurement)
      observer?.disconnect()
      cancelMeasurement?.()
    }
  }, [expanded, defaultDisplayCount, group])

  // 主题色彩
  const mainBg = isDark ? 'rgba(40,120,255,0.15)' : 'rgba(40,120,255,0.07)'
  const mainBorder = isDark ? 'rgba(40,120,255,0.5)' : 'rgba(40,120,255,0.5)'
  const mainText = isDark ? '#eee' : '#333'
  const cardBg = isDark ? '#222' : '#fff'
  const cardText = isDark ? '#eee' : '#333'

  return (
    <div
      className={styles.transferHistoryContainer}
      style={{ overflowX: 'auto', background: isDark ? '#181c24' : '#fff' }}
    >
      {transferData.map((item, index) => (
        <div key={item.id} className={styles.historyItem}>
          {
            <div className={styles.levelOne}>
              <div className={styles.levelName}>{renderTitle ? renderTitle(item) : item.name}</div>
            </div>
          }

          {/* 主体内容区域 */}
          <div className={styles.contentWrapper} style={{ minWidth: 800 }}>
            <div className={styles.leftContent}>
              <div className={styles.levelTwo}>
                <div className={styles.verticalConnector} style={{ height: leftLineHeight }}></div>
                <div className={styles.leftLine} ref={leftLineRef}>
                  {item.children && item.children.length > 0 && (
                    <>
                      {/* 控制显示的子项数量 */}
                      {(item.children.length > defaultDisplayCount && !expanded
                        ? item.children.slice(0, defaultDisplayCount)
                        : item.children
                      ).map((cItem, cIndex) => (
                        <div
                          key={cItem.id}
                          className={`${styles.subItemContainer} ${styles.subItemLine}`}
                          ref={(el) => {
                            itemRefs.current[cIndex] = el
                          }}
                        >
                          {/* 第二级菜单 */}
                          <div
                            className={styles.subItem}
                            style={{
                              background: mainBg,
                              border: `1px solid ${mainBorder}`,
                              color: mainText,
                            }}
                          >
                            {renderLabel ? renderLabel(cItem) : cItem.name}
                          </div>

                          {/* 第三级菜单 */}
                          {cItem.children && cItem.children.length > 0 && (
                            <>
                              {cItem.children.map((tItem, tIndex) => (
                                <div
                                  key={tItem.id}
                                  className={
                                    tIndex === cItem.children.length - 1
                                      ? `${styles.tertiaryItem} ${styles.lastTertiaryItem}`
                                      : styles.tertiaryItem
                                  }
                                >
                                  {tIndex < cItem.children.length && (
                                    <>
                                      <div
                                        className={styles.transferInfo}
                                        style={{
                                          background: cardBg,
                                          color: cardText,
                                          border: isDark ? '1px solid #444' : '1px solid #d2d2d2',
                                        }}
                                      >
                                        <div>{renderLabel ? renderLabel(tItem) : tItem.name}</div>
                                      </div>
                                      <div className={styles.infoConnector}></div>
                                      <div
                                        className={
                                          cItem.children.length - 2 === tIndex
                                            ? styles.horizontalConnector
                                            : `${styles.horizontalConnector} ${styles.lastConnector}`
                                        }
                                      ></div>
                                      <div className={styles.transferYear} style={{ color: cardText }}>
                                        {tItem.value}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                              <div
                                className={styles.currentHolding}
                                style={{
                                  background: mainBg,
                                  border: `1px solid ${mainBorder}`,
                                  color: mainText,
                                }}
                              >
                                <div style={{ color: '#EF4A10' }}>{renderRatio ? renderRatio(cItem) : cItem.ratio}</div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {item.children && item.children.length > defaultDisplayCount && (
                <div className={styles.expandButtonContainer}>
                  <Button
                    type="link"
                    onClick={toggleExpand}
                    className={styles.expandButton}
                    icon={expanded ? <UpOutlined /> : <DownOutlined />}
                    iconPlacement="end"
                    aria-expanded={expanded}
                  >
                    {expanded ? collapseLabel : expandLabel}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TransferHistory({ groups = [], ...props }: TransferHistoryProps) {
  return (
    <>
      {groups.map((group) => (
        <HistoryGroup key={group.id} group={group} {...props} />
      ))}
    </>
  )
}
