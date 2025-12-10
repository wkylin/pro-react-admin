import React, { useState, useRef, useEffect } from 'react'
import {
  motion,
  useAnimationControls,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useMotionValue,
} from 'motion/react'
import clsx from 'clsx'
import FixTabPanel from '@stateless/FixTabPanel'
import HorizontalScrollParallax from '@stateless/HorizontalScroll'
import ScrollProgressBar from '@stateless/ScrollProgressBar'
import styles from './index.module.less'

const ParallaxVert = ({ props }) => {
  const controller = useAnimationControls()

  const constraintsRef = useRef(null)

  const [listLabel, setListLabel] = useState(['JavaScript', 'html', 'css', 'webAssembly'])

  const scrollRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState('80vh')
  const [navHeight, setNavHeight] = useState(80)

  const [scrollDirection, setScrollDirection] = useState('up')

  const { scrollYProgress, scrollY } = useScroll({
    container: scrollRef,
  })

  const targetRef = useRef(null)
  const { scrollYProgress: scrYProCard } = useScroll({
    target: targetRef,
    container: scrollRef,
    // offset: ['start end', 'end start']
  })
  const scrYProCardX = useTransform(scrYProCard, [0, 1], ['1%', '-50%'])

  const navItemsRef = useRef([])
  const sectionRefs = useRef({})

  const navItems = ['Home', 'About', 'Contact']
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const [activeScrollY, setActiveScrollY] = useState(0)

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

  // 使用主 scrollY 来跟踪导航状态
  useMotionValueEvent(scrollY, 'change', (current) => {
    const index = findIndex(sectionPositions, current)
    setActiveNavItemIndex(index === -1 ? 0 : index)
    setActiveScrollY(current)
  })

  // 获取 navItem 和 section 的 DOM 元素引用并存储
  useEffect(() => {
    navItemsRef.current = Array.from(document.querySelectorAll(styles.navItem))
    navItems.forEach((item) => {
      const sectionId = `${item.toLowerCase()}-section`
      sectionRefs.current[sectionId] = document.getElementById(sectionId)
    })
  }, [])

  // 动态计算各 section 的位置信息
  const sectionPositions = React.useMemo(() => {
    return Object.values(sectionRefs.current).map((section) => {
      if (section) {
        const rect = section.getBoundingClientRect()
        return rect.top + activeScrollY
      }
      return 0
    })
  }, [activeScrollY])

  // 动态计算section高度（基于容器高度的100%）
  useEffect(() => {
    const updateSectionHeight = () => {
      if (scrollRef.current) {
        const containerHeight = scrollRef.current.offsetHeight
        const sectionHeight = Math.round(containerHeight * 1)
        setContainerHeight(`${sectionHeight}px`)
      }
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

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current)
    }

    // 监听窗口resize事件
    window.addEventListener('resize', updateNavHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateNavHeight)
    }
  }, [])

  // 处理点击 navItem 滚动到对应 section 的逻辑
  const wordTargetRef = useRef(null)
  const words =
    '新的一年，愿你的生活充满阳光，每一天都被幸福环绕。工作上顺顺利利，所有的努力都能得到丰厚的回报，每一个目标都能成功实现。'.split(
      ''
    )
  const { scrollYProgress: wordScrYPro } = useScroll({
    target: wordTargetRef,
    container: scrollRef,
  })

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - scrollY.getPrevious()
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })

  // 处理点击 navItem 滚动到对应 section 的逻辑
  const handleNavItemClick = (index) => {
    const sectionId = `${navItems[index].toLowerCase()}-section`
    const section = sectionRefs.current[sectionId]
    if (section) {
      // 使用scrollTo，减去导航高度以避免遮挡
      const elementPosition = section.offsetTop - navHeight - 20 // 多减去一些间距

      scrollRef.current?.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <FixTabPanel
      ref={scrollRef}
      showScrollProgress={true}
      scrollProgressProps={{
        height: 3,
        color: 'linear-gradient(108deg,#0894ff,#ff2e54 70%,#ff9004)',
      }}
      style={{ height: '100%' }} // 使用100%继承父容器高度
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-4xl dark:text-white">Hi, Motion</h2>

      <motion.nav
        layout
        className={clsx(styles.nav, 'bg-white/80 dark:bg-black/80')}
        style={{
          position: activeScrollY > sectionPositions[sectionPositions.length - 1] ? 'relative' : 'sticky',
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: activeScrollY > sectionPositions[sectionPositions.length - 1] ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
      >
        <ul className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 sm:justify-around sm:gap-4 sm:py-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={clsx(
                styles.navItem,
                'text-sm text-black transition-colors duration-200 hover:text-gray-600 sm:text-base dark:text-white dark:hover:text-gray-300'
              )}
              onClick={() => handleNavItemClick(index)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {item}
              {index === activeNavItemIndex && (
                <motion.div
                  layoutId="clickedButton"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  className={clsx('absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800')}
                  style={{ zIndex: -1 }}
                />
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
      <div className="content" style={{ paddingTop: `${navHeight + 20}px` }}>
        {navItems.map((item) => (
          <div
            key={item}
            id={`${item.toLowerCase()}-section`}
            className={styles.section}
            style={{ height: containerHeight }}
            ref={(el) => (sectionRefs.current[`${item.toLowerCase()}-section`] = el)}
          >
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-black sm:text-4xl dark:text-white">{item} Section</h2>
              <p className="mx-auto max-w-md text-sm text-gray-600 sm:text-base dark:text-gray-300">
                这里是 {item} 部分的详细内容......这里展示了各种动画效果和交互功能。
              </p>
            </div>
          </div>
        ))}
      </div>

      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          width: 'min(800px, 90vw)',
          height: 400,
          border: '1px solid rgb(202 193 193 / 0.5)',
          borderRadius: '12px',
          margin: '20px auto',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        }}
        ref={constraintsRef}
        className="dark:border-gray-600 dark:bg-black/20"
      >
        <motion.div
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#333',
            borderRadius: '20px',
          }}
          className="dark:bg-gray-700"
          animate={controller}
          whileDrag={{
            backgroundColor: '#666',
            scale: 1.2,
          }}
          drag
          onDragStart={(event, info) => console.log(info.point.x, info.point.y)}
          onDragEnd={(event, info) => console.log(info.point.x, info.point.y)}
          onDirectionLock={(axis) => console.log('axis', axis)}
          dragSnapToOrigin={true}
          dragConstraints={constraintsRef}
        ></motion.div>
        <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-5">
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-6 py-2.5 text-sm tracking-wider whitespace-nowrap text-white transition-colors duration-200 hover:bg-gray-800 sm:text-base dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onTap={() => {
              controller.start({ scale: 1.2 })
            }}
          >
            大
          </motion.div>
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-6 py-2.5 text-sm tracking-wider whitespace-nowrap text-white transition-colors duration-200 hover:bg-gray-800 sm:text-base dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onTap={() => {
              controller.start({ rotate: 45 })
            }}
          >
            旋转
          </motion.div>
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-6 py-2.5 text-sm tracking-wider whitespace-nowrap text-white transition-colors duration-200 hover:bg-gray-800 sm:text-base dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onClick={() => {
              controller.start({ opacity: 0.2 })
            }}
          >
            透明度
          </motion.div>
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-6 py-2.5 text-sm tracking-wider whitespace-nowrap text-white transition-colors duration-200 hover:bg-gray-800 sm:text-base dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onTap={() => {
              controller.start({ opacity: 1, rotate: 0, scale: 1.0 })
            }}
          >
            还原
          </motion.div>
        </div>
      </motion.div>

      <section ref={targetRef} className="relative h-[300vh] pt-4">
        <div className="sticky top-0 flex items-center overflow-hidden">
          <motion.div style={{ x: scrYProCardX }} className="flex gap-4">
            <HorizontalScrollParallax />
          </motion.div>
        </div>
      </section>

      <div ref={wordTargetRef} className={clsx('relative z-0 h-[150vh] sm:h-[200vh]')}>
        <div className={'sticky top-0 mx-auto flex items-center bg-transparent px-[1rem] py-[2rem] sm:py-[5rem]'}>
          <p
            className={
              'flex flex-wrap justify-center p-3 text-xl font-bold text-black sm:p-5 sm:text-2xl md:p-8 lg:p-10 lg:text-3xl xl:text-4xl 2xl:text-5xl dark:text-white'
            }
          >
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word key={i} progress={wordScrYPro} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </p>
        </div>
      </div>
    </FixTabPanel>
  )
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-0.5 sm:mx-1 lg:mx-2.5">
      <span className="absolute text-black opacity-30 dark:text-white">{children}</span>
      <motion.span style={{ opacity: opacity }} className={'text-black dark:text-white'}>
        {children}
      </motion.span>
    </span>
  )
}

export default ParallaxVert
