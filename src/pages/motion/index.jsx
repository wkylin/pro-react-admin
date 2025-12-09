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
import styles from './index.module.less'

const ParallaxVert = ({ props }) => {
  const controller = useAnimationControls()

  const constraintsRef = useRef(null)

  const [listLabel, setListLabel] = useState(['JavaScript', 'html', 'css', 'webAssembly'])

  const scrollRef = useRef(null)

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

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

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
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <FixTabPanel ref={scrollRef}>
      <h2>Hi, Motion</h2>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 3,
          backgroundImage: 'linear-gradient(108deg,#0894ff,#ff2e54 70%,#ff9004)',
          borderRadius: '3px',
          transformOrigin: 'left',
          scaleX: scaleX,
        }}
      ></motion.div>

      <motion.nav
        layout
        className={styles.nav}
        style={{
          position: activeScrollY > sectionPositions[sectionPositions.length - 1] ? 'relative' : 'sticky',
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: activeScrollY > sectionPositions[sectionPositions.length - 1] ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
      >
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={styles.navItem}
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
      <div className="content">
        {navItems.map((item) => (
          <div
            key={item}
            id={`${item.toLowerCase()}-section`}
            className={styles.section}
            ref={(el) => (sectionRefs.current[`${item.toLowerCase()}-section`] = el)}
          >
            <h2>{item} Section</h2>
            <p>这里是 {item} 部分的详细内容......</p>
          </div>
        ))}
      </div>

      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 52,
          width: 800,
          height: 400,
          border: '1px solid #cac1c1ff',
          margin: '20px auto',
        }}
        ref={constraintsRef}
      >
        <motion.div
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#333',
            borderRadius: '20px',
          }}
          animate={controller}
          whileDrag={{
            backgroundColor: '#aaa',
            scale: 1.2,
          }}
          // drag="x"
          drag
          onDragStart={(event, info) => console.log(info.point.x, info.point.y)}
          onDragEnd={(event, info) => console.log(info.point.x, info.point.y)}
          onDirectionLock={(axis) => console.log('axis', axis)}
          dragSnapToOrigin={true}
          // dragConstraints={{ left: 0, right: 300 }}
          dragConstraints={constraintsRef}
          // dragElastic={false}
          // dragElastic={0.8}
          // dragPropagation={false}
        ></motion.div>
        <div className="flex gap-5">
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-8 py-2.5 tracking-wider whitespace-nowrap text-white dark:bg-white dark:text-black"
            onTap={() => {
              controller.start({ scale: 1.2 })
            }}
          >
            大
          </motion.div>
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-8 py-2.5 tracking-wider whitespace-nowrap text-white dark:bg-white dark:text-black"
            onTap={() => {
              controller.start({ rotate: 45 })
            }}
          >
            旋转
          </motion.div>
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-8 py-2.5 tracking-wider whitespace-nowrap text-white dark:bg-white dark:text-black"
            onClick={() => {
              controller.start({ opacity: 0.2 })
            }}
          >
            透明度
          </motion.div>
          <motion.div
            className="font-system cursor-pointer rounded-[20px] bg-black px-8 py-2.5 tracking-wider whitespace-nowrap text-white dark:bg-white dark:text-black"
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

      <div ref={wordTargetRef} className={clsx('relative z-0 h-[200vh]')}>
        <div className={'sticky top-0 mx-auto flex max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]'}>
          <p className={'flex flex-wrap p-5 text-2xl font-bold md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl'}>
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
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity: opacity }} className={'text-black dark:text-white'}>
        {children}
      </motion.span>
    </span>
  )
}

export default ParallaxVert
