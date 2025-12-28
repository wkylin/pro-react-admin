import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
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
const ScrollableSections = ({
  sections = [],
  scrollContainerRef,
  className = '',
  navUlClassName = '',
  navLiClassName = '',
  titleClassName = '',
  contentClassName = '',
  componentClassName = ''
}) => {
  const [containerHeight, setContainerHeight] = useState('80vh')
  const [navHeight, setNavHeight] = useState(80)
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const [activeScrollY, setActiveScrollY] = useState(0)
  const [scrollHighlightIndex, setScrollHighlightIndex] = useState(-1)

  const navItemsRef = useRef([])
  const sectionRefs = useRef({})

  const navItems = sections.map((section) => section.title)

  // 获取样式类名，支持自定义样式
  const getClassName = (baseClass, customClass, additionalClasses = {}) => {
    const classes = [styles[baseClass]]

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

  const findIndex = (arr, x) => {
    if (x <= arr[0]) {
      return 0
    }
    for (let index = 0; index < arr.length - 1; index++) {
      if (x > arr[index] && x <= arr[index + 1]) {
        return index + 1
      }
    }
    return arr.length
  }

  // 使用传统的事件监听来跟踪滚动状态
  useEffect(() => {
    const container = scrollContainerRef?.current
    if (!container) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = container.scrollTop
          setActiveScrollY(scrollTop)

          // 计算当前激活的导航项
          const currentPositions = sections.map((section) => {
            const sectionId = `${section.title.toLowerCase().replace(/\s+/g, '-')}-section`
            const sectionElement = sectionRefs.current[sectionId]
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()
              return rect.top - containerRect.top + scrollTop
            }
            return 0
          })

          const index = findIndex(currentPositions, scrollTop)
          const validIndex = Math.max(0, Math.min(index, sections.length - 1))
          setActiveNavItemIndex(validIndex)
          setScrollHighlightIndex(validIndex)
          ticking = false
        })
        ticking = true
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始化调用

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [scrollContainerRef, sections])

  // 获取 navItem 和 section 的 DOM 元素引用并存储
  useEffect(() => {
    // 延迟执行，确保DOM完全渲染
    const timer = setTimeout(() => {
      navItemsRef.current = Array.from(document.querySelectorAll(styles.navItem))
      // 重新初始化sectionRefs
      sectionRefs.current = {}
      sections.forEach((section, index) => {
        const sectionId = `${section.title.toLowerCase().replace(/\s+/g, '-')}-section`
        const element = document.getElementById(sectionId)
        if (element) {
          sectionRefs.current[sectionId] = element
        }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [sections])

  // 动态计算各 section 的位置信息并存入 state，避免在渲染时读取 ref.current
  const [sectionPositions, setSectionPositions] = useState([])

  useEffect(() => {
    const container = scrollContainerRef?.current
    if (!container) return

    const positions = sections.map((section) => {
      const sectionId = `${section.title.toLowerCase().replace(/\s+/g, '-')}-section`
      const sectionElement = sectionRefs.current[sectionId]
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
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
      const navElement = document.querySelector(`.${styles.nav}`)
      if (navElement) {
        const height = navElement.offsetHeight
        setNavHeight(height)
      }
    }

    // 初始计算
    updateSectionHeight()
    updateNavHeight()

    // 监听窗口大小变化
    const resizeObserver = new ResizeObserver(() => {
      updateSectionHeight()
      updateNavHeight()
    })

    resizeObserver.observe(container)

    // 监听窗口resize事件
    window.addEventListener('resize', updateNavHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateNavHeight)
    }
  }, [scrollContainerRef])

  // 处理点击 navItem 滚动到对应 section 的逻辑
  const handleNavItemClick = (index) => {
    const container = scrollContainerRef?.current
    if (!container) return

    // 立即设置激活状态，提供即时视觉反馈
    setActiveNavItemIndex(index)

    const section = sections[index]
    const sectionId = `${section.title.toLowerCase().replace(/\s+/g, '-')}-section`
    const sectionElement = sectionRefs.current[sectionId]
    if (sectionElement) {
      // 使用scrollTo，减去导航高度以避免遮挡
      const elementPosition = sectionElement.offsetTop - navHeight - 20 // 多减去一些间距

      container.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={className}>
      <motion.nav
        className={styles.nav}
        style={{
          position:
            sectionPositions.length > 0 && activeScrollY > sectionPositions[sectionPositions.length - 1]
              ? 'relative'
              : 'sticky',
          top: 0,
          zIndex: 10
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: sectionPositions.length > 0 && activeScrollY > sectionPositions[sectionPositions.length - 1] ? 0 : 1
        }}
        exit={{ opacity: 0 }}
      >
        <ul className={getClassName('navUl', navUlClassName)}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={getClassName('navItem', navLiClassName, {
                active: index === activeNavItemIndex,
                'scroll-highlight': index === scrollHighlightIndex
              })}
              onClick={() => handleNavItemClick(index)}
            >
              {item}
              <div className={styles.activeIndicator} />
              <div className={styles.scrollIndicator} />
            </li>
          ))}
        </ul>
      </motion.nav>

      <div className='content' style={{ paddingTop: `${navHeight + 20}px` }}>
        {sections.map((section, index) => (
          <div
            key={section.title}
            id={`${section.title.toLowerCase().replace(/\s+/g, '-')}-section`}
            className={styles.section}
            style={{ minHeight: containerHeight }}
            ref={(el) => (sectionRefs.current[`${section.title.toLowerCase().replace(/\s+/g, '-')}-section`] = el)}
          >
            <div>
              <h2 className={getClassName('title', titleClassName)}>{section.title} Section</h2>
              <p className={getClassName('content', contentClassName)}>
                {section.content || `这里是 ${section.title} 部分的详细内容......这里展示了各种动画效果和交互功能。`}
              </p>
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
