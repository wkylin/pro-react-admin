import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Button } from 'antd'
import styles from './index.module.less'

/**
 * 转让历史组件
 * @param {Object} props - 组件属性
 * @param {number} [props.defaultDisplayCount=3] - 默认显示的子项数量
 */
const TransferHistory = ({ defaultDisplayCount = 3 }) => {
  const [expanded, setExpanded] = useState(false)
  const [leftLineHeight, setLeftLineHeight] = useState('100%')
  const leftLineRef = useRef(null)
  const itemRefs = useRef([])
  const contentWrapperRef = useRef(null)

  // 初始化引用数组
  useEffect(() => {
    itemRefs.current = []
  }, [])

  // 模拟数据
  const transferData = [
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
            { name: '科技股份有限公司第一公司', value: '2022年8月8号', id: '1-1-1', level: 3 },
            { name: '科技股份有限公司第二公司', value: '2023年6月6号', id: '1-1-2', level: 3 },
            { name: '科技股份有限公司第三公司', value: '2024年9月9号', id: '1-1-3', level: 3 },
          ],
          ratio: '85%',
        },
        {
          name: '广东发展有限公司',
          id: '1-2',
          level: 2,
          children: [{ name: '广东发展有限公司分公司', value: '2024年5月1号', id: '1-2-1', level: 3 }],
          ratio: '55%',
        },
        {
          name: '科技发展股份有限公司',
          id: '1-3',
          level: 2,
          children: [
            { name: '科技股份有限公司一', value: '2022年7月31号', id: '1-3-1', level: 3 },
            { name: '科技股份有限公司二', value: '2023年8月1号', id: '1-3-2', level: 3 },
          ],
          ratio: '35%',
        },
        {
          name: '第四家公司',
          id: '1-4',
          level: 2,
          children: [{ name: '受让方第四分公司', value: '2021年8月20号', id: '1-4-1', level: 3 }],
          ratio: '25%',
        },
        {
          name: '第五家公司',
          id: '1-5',
          level: 2,
          children: [{ name: '受让方第五分公司', value: '2020年6月6号', id: '1-5-1', level: 3 }],
          ratio: '15%',
        },
      ],
    },
  ]

  /**
   * 计算左侧线条高度（不包含按钮高度）
   */
  const calculateLineHeight = () => {
    if (!transferData || !transferData[0] || !transferData[0].children || transferData[0].children.length === 0) {
      setLeftLineHeight('0px')
      return
    }

    // 根据展开状态计算显示的子项数量
    const displayCount = expanded
      ? transferData[0].children.length
      : Math.min(defaultDisplayCount, transferData[0].children.length)
    const lastIndex = displayCount - 1

    // 确保元素已渲染
    if (!itemRefs.current[0] || !itemRefs.current[lastIndex] || !leftLineRef.current) {
      return
    }

    // 获取第一个和最后一个子项的高度
    const firstItemHeight = itemRefs.current[0].offsetHeight
    const lastItemHeight = itemRefs.current[lastIndex].offsetHeight

    // 计算实际内容高度（仅包含子项容器，不包含按钮）
    // 使用getBoundingClientRect获取精确高度
    const firstItemRect = itemRefs.current[0].getBoundingClientRect()
    const lastItemRect = itemRefs.current[lastIndex].getBoundingClientRect()

    // 计算线条高度：从第一个子项的中心到最后一个子项的中心
    const lineHeight = lastItemRect.top + lastItemRect.height / 2 - (firstItemRect.top + firstItemRect.height / 2)

    setLeftLineHeight(`${lineHeight}px`)
  }

  /**
   * 切换展开/折叠状态
   */
  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  // 使用useLayoutEffect确保在DOM更新后立即计算
  useLayoutEffect(() => {
    calculateLineHeight()
  }, [expanded])

  // 组件挂载后计算线条高度
  useLayoutEffect(() => {
    calculateLineHeight()

    // 添加窗口大小变化时的重新计算
    const handleResize = () => {
      calculateLineHeight()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [expanded])

  return (
    <div className={styles.transferHistoryContainer}>
      {transferData.map((item, index) => (
        <div key={index} className={styles.historyItem}>
          {item.level === 1 && (
            <div className={styles.levelOne}>
              <div className={styles.levelName}>{item.name}</div>
            </div>
          )}

          {/* 主体内容区域 */}
          <div className={styles.contentWrapper} ref={contentWrapperRef}>
            <div className={styles.leftContent}>
              <div className={styles.levelTwo}>
                <div className={styles.verticalConnector} style={{ height: leftLineHeight }} />
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
                          ref={(el) => (itemRefs.current[cIndex] = el)}
                        >
                          {/* 第二级菜单 */}
                          <div className={styles.subItem}>{cItem.name}</div>

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
                                      <div className={styles.transferInfo}>
                                        <div>
                                          转让<span style={{ color: '#EF4A10' }}>20%</span>股权
                                        </div>
                                        <div>受让方：{tItem.name}</div>
                                      </div>
                                      <div className={styles.infoConnector} />
                                      <div
                                        className={
                                          cItem.children.length - 2 === tIndex
                                            ? styles.horizontalConnector
                                            : `${styles.horizontalConnector} ${styles.lastConnector}`
                                        }
                                      />
                                      <div className={styles.transferYear}>{tItem.value}</div>
                                    </>
                                  )}
                                </div>
                              ))}
                              <div className={styles.currentHolding}>
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
                  <Button type="link" onClick={toggleExpand} className={styles.expandButton}>
                    {expanded ? '收起部分公司' : '展开全部公司'}
                    <i className={expanded ? 'anticon anticon-up' : 'anticon anticon-down'} />
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
