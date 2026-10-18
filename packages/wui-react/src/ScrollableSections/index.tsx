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
 * @param {React.RefObject} scrollContainerRef - 外部滚动容器的ref，省略时识别最近滚动祖先或窗口
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

type ScrollTarget = HTMLElement | Window
const SECTION_GAP = 20

const findScrollTarget = (element: HTMLElement): ScrollTarget => {
  let parent = element.parentElement
  while (parent && parent !== document.body && parent !== document.documentElement) {
    if (/(auto|scroll|overlay)/.test(window.getComputedStyle(parent).overflowY)) return parent
    parent = parent.parentElement
  }
  return window
}

const isWindow = (target: ScrollTarget): target is Window => target === window

const getScrollViewport = (target: ScrollTarget) => {
  if (isWindow(target)) {
    return {
      top: 0,
      scrollTop: window.scrollY,
      height: window.innerHeight,
      maxScroll: Math.max(0, (document.scrollingElement ?? document.documentElement).scrollHeight - window.innerHeight),
    }
  }
  return {
    top: target.getBoundingClientRect().top + target.clientTop,
    scrollTop: target.scrollTop,
    height: target.clientHeight,
    maxScroll: Math.max(0, target.scrollHeight - target.clientHeight),
  }
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
  const [scrollHighlightIndex, setScrollHighlightIndex] = useState(-1)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const scrollTargetRef = useRef<ScrollTarget | null>(null)
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

  // Explicit containers take precedence; standalone stories also work without a ref.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const target = scrollContainerRef?.current ?? findScrollTarget(root)
    scrollTargetRef.current = target
    sectionRefs.current.length = sections.length

    let frameId: number | null = null

    const update = () => {
      frameId = null
      const viewport = getScrollViewport(target)
      const navigationHeight = navRef.current?.getBoundingClientRect().height ?? 0
      if (viewport.height > 0) setContainerHeight(`${Math.round(viewport.height)}px`)
      setNavHeight(navigationHeight)

      // The section under the sticky navigation stays active until the next starts.
      const activationLine = viewport.top + navigationHeight + SECTION_GAP
      let index = 0
      sectionRefs.current.forEach((section, sectionIndex) => {
        if (section && section.getBoundingClientRect().top <= activationLine + 1) index = sectionIndex
      })
      const lastSection = sectionRefs.current[sections.length - 1]
      if (
        lastSection &&
        viewport.scrollTop > 0 &&
        viewport.scrollTop >= viewport.maxScroll - 1 &&
        lastSection.getBoundingClientRect().top < viewport.top + viewport.height
      ) {
        index = sections.length - 1
      }
      setActiveNavItemIndex(index)
      setScrollHighlightIndex(index)
    }

    const scheduleUpdate = () => {
      if (frameId === null) frameId = requestAnimationFrame(update)
    }
    target.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleUpdate)
      if (!isWindow(target)) resizeObserver.observe(target)
      resizeObserver.observe(root)
      if (navRef.current) resizeObserver.observe(navRef.current)
      sectionRefs.current.forEach((section) => {
        if (section) resizeObserver?.observe(section)
      })
    }

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      target.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      resizeObserver?.disconnect()
      scrollTargetRef.current = null
    }
  }, [scrollContainerRef, sections])

  // 处理点击 navItem 滚动到对应 section 的逻辑
  const handleNavItemClick = (index: number) => {
    const target = scrollTargetRef.current
    const section = sectionRefs.current[index]
    if (!target || !section) return

    // 立即设置激活状态，提供即时视觉反馈
    setActiveNavItemIndex(index)
    setScrollHighlightIndex(index)
    const viewport = getScrollViewport(target)
    const navigationHeight = navRef.current?.getBoundingClientRect().height ?? 0
    const top = section.getBoundingClientRect().top - viewport.top + viewport.scrollTop - navigationHeight - SECTION_GAP
    target.scrollTo({ top: Math.max(0, Math.min(top, viewport.maxScroll)), behavior: 'smooth' })
  }

  return (
    <div ref={rootRef} className={className}>
      <motion.nav
        ref={navRef}
        className={styles.nav}
        aria-label="Section navigation"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
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

      <div className={styles.sectionsContent} style={{ paddingTop: `${navHeight + SECTION_GAP}px` }}>
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
