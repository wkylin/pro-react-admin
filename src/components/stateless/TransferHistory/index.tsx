import { useState, useRef, useLayoutEffect } from 'react'
import type { MouseEventHandler } from 'react'
import { Button } from 'antd'
import DownOutlined from '@ant-design/icons/DownOutlined'
import UpOutlined from '@ant-design/icons/UpOutlined'
import styles from './index.module.less'
import { useProThemeContext } from '@src/theme/hooks'

interface TransferHistoryProps {
  defaultDisplayCount?: number
}

interface TransferRecord {
  name: string
  value: string
  id: string
  level: 3
}

interface TransferCompany {
  name: string
  id: string
  level: 2
  children: TransferRecord[]
  ratio: string
}

interface TransferHistoryGroup {
  name: string
  id: string
  level: 1
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
const TransferHistory = ({ defaultDisplayCount = 3 }: TransferHistoryProps) => {
  const { resolvedTheme } = useProThemeContext()
  const isDark = resolvedTheme === 'dark'
  const [expanded, setExpanded] = useState<boolean>(false)
  const [leftLineHeight, setLeftLineHeight] = useState<string>('0px')
  const leftLineRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  // 模拟数据
  const transferData: TransferHistoryGroup[] = [
    {
      name: '转让历史',
      id: '1',
      level: 1,
      children: [
        {
          name: '山东AI科技股份有限公司',
          id: '1-1',
          level: 2,
          children: [
            {
              name: '科技股份有限公司第一公司',
              value: '2022年8月8号',
              id: '1-1-1',
              level: 3,
            },
            {
              name: '科技股份有限公司第二公司',
              value: '2023年6月6号',
              id: '1-1-2',
              level: 3,
            },
            {
              name: '科技股份有限公司第三公司',
              value: '2024年9月9号',
              id: '1-1-3',
              level: 3,
            },
          ],
          ratio: '85%',
        },
        {
          name: '广东发展有限公司',
          id: '1-2',
          level: 2,
          children: [
            {
              name: '广东发展有限公司分公司',
              value: '2024年5月1号',
              id: '1-2-1',
              level: 3,
            },
          ],
          ratio: '55%',
        },
        {
          name: '科技发展股份有限公司',
          id: '1-3',
          level: 2,
          children: [
            {
              name: '科技股份有限公司一',
              value: '2022年7月31号',
              id: '1-3-1',
              level: 3,
            },
            {
              name: '科技股份有限公司二',
              value: '2023年8月1号',
              id: '1-3-2',
              level: 3,
            },
          ],
          ratio: '35%',
        },
        {
          name: '第四家公司',
          id: '1-4',
          level: 2,
          children: [
            {
              name: '受让方第四分公司',
              value: '2021年8月20号',
              id: '1-4-1',
              level: 3,
            },
          ],
          ratio: '25%',
        },
        {
          name: '第五家公司',
          id: '1-5',
          level: 2,
          children: [
            {
              name: '受让方第五分公司',
              value: '2020年6月6号',
              id: '1-5-1',
              level: 3,
            },
          ],
          ratio: '15%',
        },
      ],
    },
  ]

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
  }, [expanded, defaultDisplayCount])

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
        <div key={index} className={styles.historyItem}>
          {item.level === 1 && (
            <div className={styles.levelOne}>
              <div className={styles.levelName}>{item.name}</div>
            </div>
          )}

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
                          key={cIndex}
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
                            {cItem.name}
                          </div>

                          {/* 第三级菜单 */}
                          {cItem.children && cItem.children.length > 0 && (
                            <>
                              {cItem.children.map((tItem, tIndex) => (
                                <div
                                  key={tIndex}
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
                                        <div>
                                          转让
                                          <span style={{ color: '#EF4A10' }}>20%</span>
                                          股权
                                        </div>
                                        <div>受让方：{tItem.name}</div>
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
                                <div>现持有股权：</div>
                                <div style={{ color: '#EF4A10' }}>{cItem.ratio}</div>
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
                    {expanded ? '收起部分公司' : '展开全部公司'}
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

export default TransferHistory
