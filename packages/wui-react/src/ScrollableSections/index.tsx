import { useState, useRef, useEffect, type ReactNode, type RefObject } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import styles from './index.module.less'

/**
 * ScrollableSections - 可复用的导航和内容滚动组件
 *
 * @param {Array} sections - 页面sections配置数组
 * @param {Object} sections[].title - section标题
 * @param {string} sections[].content - section内容文本
 * @param {React.Component} sections[].component - 可选的自定义组件
 * @param {React.RefObject} scrollContainerRef - 外部滚动容器的ref
 * @param {string} className - 额外的CSS类名
 * @param {string} navUlClassName - 导航ul的自定义CSS类名
 * @param {string} navLiClassName - 导航li的自定义CSS类名
 * @param {string} titleClassName - 标题的自定义CSS类名
 * @param {string} contentClassName - 内容的自定义CSS类名
 * @param {string} componentClassName - 组件容器的自定义CSS类名
 */
export interface ScrollableSection {
  title: string
  content?: ReactNode
  component?: ReactNode
}

export interface ScrollableSectionsProps {
  sections?: ScrollableSection[]
  scrollContainerRef?: RefObject<HTMLElement | null>
  className?: string
  navUlClassName?: string
  navLiClassName?: string
  titleClassName?: string
  contentClassName?: string
  componentClassName?: string
}

const EMPTY_SECTIONS: ScrollableSection[] = []

const findSectionIndex = (positions: readonly number[], scrollTop: number) => {
  if (positions.length === 0 || scrollTop <= positions[0]) return 0
  for (let index = 0; index < positions.length - 1; index++) {
    if (scrollTop > positions[index] && scrollTop <= positions[index + 1]) return index + 1
  }
  return positions.length - 1
}

const ScrollableSections = ({
  sections = EMPTY_SECTIONS,
  scrollContainerRef,
  className = '',
  navUlClassName = '',
  navLiClassName = '',
  titleClassName = '',
  contentClassName = '',
  componentClassName = '',
}: ScrollableSectionsProps) => {
  const [containerHeight, setContainerHeight] = useState('80vh')
  const [navHeight, setNavHeight] = useState(80)
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const [activeScrollY, setActiveScrollY] = useState(0)
  const [scrollHighlightIndex, setScrollHighlightIndex] = useState(-1)

  const navRef = useRef<HTMLElement | null>(null)
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([])

  const navItems = sections.map((section) => section.title)

  // 获取样式类名，支持自定义样式
  const getClassName = (baseClass: string, customClass: string, additionalClasses: Record<string, boolean> = {}) => {
    let classes = [styles[baseClass]]

    if (customClass && styles[customClass]) {
      classes.push(styles[customClass])
    } else if (customClass) {
      classes.push(customClass)
    }

    // 添加额外的类，优先尝试从 CSS Modules 导出中取值
    Object.entries(additionalClasses).forEach(([key, value]) => {
      if (!value) return
      // 如果 styles 中存在对应类名（支持带连字符的类名），优先使用模块化类名
      if (styles && styles[key]) {
        classes.push(styles[key])
      } else {
        classes.push(key)
      }
    })

    return clsx(...classes)
  }

  // 使用传统的事件监听来跟踪滚动状态
  useEffect(() => {
    const container = scrollContainerRef?.current
    if (!container) return

    let frameId: number | null = null

    const handleScroll = () => {
      if (frameId !== null) return

      frameId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop
        setActiveScrollY(scrollTop)

        const containerRect = container.getBoundingClientRect()
        const currentPositions = sections.map((_, index) => {
          const sectionElement = sectionRefs.current[index]
          if (!sectionElement) return 0
          const rect = sectionElement.getBoundingClientRect()
          return rect.top - containerRect.top + scrollTop
        })

        const index = findSectionIndex(currentPositions, scrollTop)
        const validIndex = Math.max(0, Math.min(index, sections.length - 1))
        setActiveNavItemIndex(validIndex)
        setScrollHighlightIndex(validIndex)
        frameId = null
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始化调用

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [scrollContainerRef, sections])

  // 动态计算各 section 的位置信息并存入 state，避免在渲染时读取 ref.current
  const [sectionPositions, setSectionPositions] = useState<number[]>([])

  useEffect(() => {
    const container = scrollContainerRef?.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const positions = sections.map((_, index) => {
      const sectionElement = sectionRefs.current[index]
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect()
        return rect.top - containerRect.top + container.scrollTop
      }
      return 0
    })

    setSectionPositions(positions)
  }, [activeScrollY, scrollContainerRef, sections])

  // 动态计算section高度（基于容器高度的100%）
  useEffect(() => {
    const container = scrollContainerRef?.current
    if (!container) return

    const updateSectionHeight = () => {
      const containerHeight = container.offsetHeight
      const sectionHeight = Math.round(containerHeight * 1)
      setContainerHeight(`${sectionHeight}px`)
    }

    // 计算导航高度
    const updateNavHeight = () => {
      const navElement = navRef.current
      if (navElement) {
        const height = navElement.offsetHeight
        setNavHeight(height)
      }
    }

    // 初始计算
    updateSectionHeight()
    updateNavHeight()

    const updateSizes = () => {
      updateSectionHeight()
      updateNavHeight()
    }

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateSizes)
      resizeObserver.observe(container)
      if (navRef.current) resizeObserver.observe(navRef.current)
      return () => resizeObserver.disconnect()
    }

    window.addEventListener('resize', updateSizes)
    return () => window.removeEventListener('resize', updateSizes)
  }, [scrollContainerRef])

  // 处理点击 navItem 滚动到对应 section 的逻辑
  const handleNavItemClick = (index: number) => {
    const container = scrollContainerRef?.current
    if (!container) return

    // 立即设置激活状态，提供即时视觉反馈
    setActiveNavItemIndex(index)

    const sectionElement = sectionRefs.current[index]
    if (sectionElement) {
      // 使用scrollTo，减去导航高度以避免遮挡
      const elementPosition = sectionElement.offsetTop - navHeight - 20 // 多减去一些间距

      container.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={className}>
      <motion.nav
        ref={navRef}
        className={styles.nav}
        aria-label="Section navigation"
        style={{
          position:
            sectionPositions.length > 0 && activeScrollY > sectionPositions[sectionPositions.length - 1]
              ? 'relative'
              : 'sticky',
          top: 0,
          zIndex: 10,
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: sectionPositions.length > 0 && activeScrollY > sectionPositions[sectionPositions.length - 1] ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
      >
        <ul className={getClassName('navUl', navUlClassName)}>
          {navItems.map((item, index) => (
            <li key={`${item}-${index}`}>
              <button
                type="button"
                className={getClassName('navItem', navLiClassName, {
                  active: index === activeNavItemIndex,
                  'scroll-highlight': index === scrollHighlightIndex,
                })}
                onClick={() => handleNavItemClick(index)}
                aria-current={index === activeNavItemIndex ? 'location' : undefined}
              >
                {item}
                <span className={styles.activeIndicator} aria-hidden />
                <span className={styles.scrollIndicator} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      <div className={styles.sectionsContent} style={{ paddingTop: `${navHeight + 20}px` }}>
        {sections.map((section, index) => (
          <div
            key={`${section.title}-${index}`}
            className={styles.section}
            style={{ minHeight: containerHeight }}
            ref={(element) => {
              sectionRefs.current[index] = element
            }}
          >
            <div>
              <h2 className={getClassName('title', titleClassName)}>{section.title} Section</h2>
              <div className={getClassName('content', contentClassName)}>
                {section.content ?? `这里是 ${section.title} 部分的详细内容......这里展示了各种动画效果和交互功能。`}
              </div>
              {section.component && (
                <div className={getClassName('component', componentClassName)}>{section.component}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollableSections
