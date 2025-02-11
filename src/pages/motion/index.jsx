import React, { useState, useRef, useEffect } from 'react'
import {
  motion,
  useAnimationControls,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
} from 'motion/react'
import clsx from 'clsx'
import FixTabPanel from '@stateless/FixTabPanel'
import HorizontalScrollParallax from '@stateless/HorizontalScroll'
import ScrollVelocity from '@stateless/ScrollVelocity'
import TextReveal from '@stateless/TextReveal'
import styles from './index.module.less'

const animations = {
  show: {
    opacity: 1,
    filter: 'blur(0)',
  },
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
}

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

const variantsText = {
  visible: (i) => ({
    opacity: i * 0.3,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0 },
}

const btnStyle = {
  color: 'white',
  fontFamily: 'system-ui',
  backgroundColor: 'black',
  padding: 10,
  paddingLeft: 32,
  paddingRight: 32,
  letterSpacing: 1,
  borderRadius: 20,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}
const easeNames = [
  'linear',
  'easeIn',
  'easeOut',
  'easeInOut',
  'circIn',
  'circOut',
  'circInOut',
  'backIn',
  'backOut',
  'backInOut',
  'anticipate',
]

const randomSort = (arr) => {
  let newArr = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const random = Math.floor(Math.random() * arr.length)
    newArr.push(arr[random])
    arr.splice(random, 1)
  }
  return newArr
}

const ParallaxVert = ({ props }) => {
  const controller = useAnimationControls()
  const controller2 = useAnimationControls()

  const controls = useAnimationControls()

  const constraintsRef = useRef(null)

  const template = ({ rotate, x }) => {
    return `rotate(${rotate}) translateX(${x})`
  }

  const [isRotated, setRotate] = useState(false)

  const [isAnimation, setIsAnimation] = useState(false)

  const [buttonRight, setButtonState] = useState(false)

  const [listLabel, setListLabel] = useState(['JavaScript', 'html', 'css', 'webAssembly'])
  const [isBig, setBigState] = useState(false)
  const [leftState, setLeftState] = useState(false)

  const scrollRef = useRef(null)

  const { scrollYProgress, scrollY } = useScroll({
    container: scrollRef,
  })

  const { scrollYProgress: scrYPro, scrollY: scrY } = useScroll({
    target: constraintsRef,
    container: scrollRef,
    offset: ['start end', 'end start'],
  })

  const targetRef = useRef(null)
  const { scrollYProgress: scrYProCard } = useScroll({
    target: targetRef,
    container: scrollRef,
    // offset: ['start end', 'end start']
  })
  const scrYProCardX = useTransform(scrYProCard, [0, 1], ['1%', '-50%'])

  const scaleSec = useTransform(scrYPro, (value) => value * 3)
  useMotionValueEvent(scrYPro, 'change', (current) => {})

  const x = useTransform(scrollY, (value) => {
    return (value * 1) / 10
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [scrollDirection, setScrollDirection] = useState('down')

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - scrollY.getPrevious()
    setScrollDirection(diff > 0 ? 'down' : 'up')
  })

  const rotate = useTransform(scrollY, [0, 100], [0, 360], { clamp: false })

  const count = useMotionValue(10)
  const rounded = useTransform(count, (value) => Math.round(value))

  useEffect(() => {
    const animation = animate(count, 1000, { duration: 10 })
    return animation.stop
  }, [])

  const navItemsRef = useRef([])
  const sectionRefs = useRef({})
  const followScrollRef = useRef({})

  const navItems = ['Home', 'About', 'Contact']
  const [activeNavItemIndex, setActiveNavItemIndex] = useState(0)
  const [activeScrollY, setActiveScrollY] = useState(0)

  const { scrollY: followScrollY } = useScroll({
    container: scrollRef,
    target: followScrollRef,
    offset: ['start end', 'end start'],
  })
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
  useMotionValueEvent(followScrollY, 'change', (current) => {
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
  const handleNavItemClick = (index) => {
    const sectionId = `${navItems[index].toLowerCase()}-section`
    const section = sectionRefs.current[sectionId]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const wordTargetRef = useRef(null)
  const words =
    '新的一年，愿你的生活充满阳光，每一天都被幸福环绕。工作上顺顺利利，所有的努力都能得到丰厚的回报，每一个目标都能成功实现。'.split(
      ''
    )
  const { scrollYProgress: wordScrYPro } = useScroll({
    target: wordTargetRef,
    container: scrollRef,
  })

  return (
    <FixTabPanel ref={scrollRef}>
      <h2>Hi, Motion</h2>
      <motion.h2>{rounded}</motion.h2>
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
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#aaa',
          borderRadius: '20px',
        }}
        // initial={{
        //   width:100,
        //   height:100,
        //   backgroundColor:'#aaa',
        //   borderRadius:'20px',
        //   rotate:45,
        //   border:'6px solid black'
        // }}
        initial={false}
        animate={{
          x: 50, // 向右移动50px
          y: 20, // 向下移动20px
          scale: 0.5, // 缩放至0.5倍
          rotate: 45, // 旋转45度
          opacity: 0.5, // 不透明度设置为0.5
        }}
      ></motion.div>
      <motion.nav
        layout
        className={styles.nav}
        style={{ position: activeScrollY > sectionPositions[sectionPositions.length - 1] ? 'relative' : 'sticky' }}
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
              ref={(el) => (navItemsRef.current[index] = el)}
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
                  className={clsx('absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full')}
                  style={{ zIndex: -1 }}
                />
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
      <div className="content" ref={followScrollRef}>
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
        transformTemplate={template}
        animate={{ rotate: 360 }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#aaa',
          borderRadius: '10px',
          rotate: 0,
          x: '200px',
        }}
      ></motion.div>
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#aaa',
          borderRadius: '20px',
        }}
        transition={{
          duration: 2,
        }}
        variants={animations}
        initial={'hidden'}
        animate={'show'}
      ></motion.div>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={list}
        transition={{
          duration: 2,
          staggerChildren: 0.5,
          delayChildren: 0.5,
        }}
        style={{ fontSize: 20 }}
      >
        <motion.li variants={item}>item1</motion.li>
        <motion.li variants={item}>item2</motion.li>
        <motion.li variants={item}>item3</motion.li>
      </motion.ul>
      {['vue', 'react', 'angular'].map((item, i) => (
        <motion.p style={{ fontSize: 20 }} key={i} custom={i + 0.3} animate="visible" variants={variantsText}>
          {item}
        </motion.p>
      ))}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <motion.div
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#aaa',
            borderRadius: '20px',
          }}
          animate={{
            rotate: isRotated ? 45 : 0,
          }}
          // 实现鼠标悬浮的效果
          whileHover={{
            rotate: 45,
          }}
          // 实现按住的效果
          whileTap={{
            backgroundColor: '#000',
            scale: 1.2,
          }}
          onClick={() => {
            setRotate(!isRotated)
          }}
        ></motion.div>
      </div>

      {/* <div
        style={{
          margin: 20
        }}
      >
        <motion.div
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#333',
            borderRadius: '20px',
          }}
          animate={{
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        ></motion.div>
      </div> */}

      <div
        style={{
          margin: '200px 0 0 150px',
        }}
      >
        <motion.div
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#aaa',
            borderRadius: '20px',
          }}
          transition={{
            duration: 2,
            ease: 'linear',
          }}
          initial={{
            x: -100,
          }}
          animate={controller2}
          onUpdate={(latest) => {
            console.log(latest.x, latest.y)
          }}
          onAnimationStart={() => {
            console.log('Animation started')
            setIsAnimation(true)
          }}
          onAnimationComplete={(definition) => {
            setIsAnimation(false)
            console.log('Completed animating', definition)
          }}
        ></motion.div>
        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          <motion.div
            style={{
              ...btnStyle,
              pointerEvents: isAnimation ? 'none' : 'auto',
            }}
            onTap={async () => {
              await controller2.start({ x: 100 })
              await controller2.start({ y: -200 })
              await controller2.start({ x: -100 })
              controller2.start({ y: 0 })
            }}
          >
            开始
          </motion.div>
        </div>
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
          border: '1px solid #aaa',
          margin: '20px auto',
        }}
        ref={constraintsRef}
      >
        <motion.section
          style={{
            width: 100,
            height: 50,
            backgroundColor: '#aaa',
            borderRadius: '10px',
            color: 'white',
            textAlign: 'center',
            lineHeight: '50px',
            scale: scaleSec,
            position: 'sticky',
            top: '40px',
            left: 0,
            zIndex: 3,
          }}
        >
          拖动元素
        </motion.section>
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
        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          <motion.div
            style={btnStyle}
            onTap={() => {
              controller.start({ scale: 1.2 })
            }}
          >
            大
          </motion.div>
          <motion.div
            style={btnStyle}
            onTap={() => {
              controller.start({ rotate: 45 })
            }}
          >
            旋转
          </motion.div>
          <motion.div
            style={btnStyle}
            onClick={() => {
              controller.start({ opacity: 0.2 })
            }}
          >
            透明度
          </motion.div>
          <motion.div
            style={btnStyle}
            onTap={() => {
              controller.start({ opacity: 1, rotate: 0, scale: 1.0 })
            }}
          >
            还原
          </motion.div>
        </div>
      </motion.div>

      <section ref={targetRef} className="relative h-[300vh] pt-4 bg-neutral-300">
        <div className="sticky top-0 flex items-center overflow-hidden">
          <motion.div style={{ x: scrYProCardX }} className="flex gap-4">
            <HorizontalScrollParallax />
          </motion.div>
        </div>
      </section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 52,
        }}
      >
        <div
          style={{
            display: 'flex',
            // flexDirection:'column',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 32,
            marginTop: 230,
          }}
        >
          {easeNames.map((item, i) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'system-ui',
                  gap: 12,
                  color: 'white',
                }}
                key={i}
              >
                <motion.div
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#333',
                    borderRadius: '20px',
                    textAlign: 'center',
                    lineHeight: '100px',
                  }}
                  transition={{
                    duration: 2,
                    ease: item,
                  }}
                  animate={controls}
                >
                  {item}
                </motion.div>
                <span style={{ opacity: 0.5, letterSpacing: 2 }}>{item}</span>
              </div>
            )
          })}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 100,
          }}
        >
          <div
            style={btnStyle}
            animate={controls}
            onClick={() => {
              controls.start({ y: -200 })
            }}
          >
            开始
          </div>
          <div
            style={btnStyle}
            animate={controls}
            onClick={() => {
              controls.set({ y: 0 })
            }}
          >
            还原
          </div>
        </div>
      </div>

      <motion.div
        style={{
          width: 180,
          backgroundColor: '#333',
          borderRadius: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: buttonRight ? 'flex-end' : 'flex-start',
          padding: 10,
        }}
        onTap={() => {
          setButtonState(!buttonRight)
        }}
      >
        <motion.div
          layout // 设置在白色圆球元素上，即子元素上 <-
          style={{
            width: 60,
            height: 60,
            backgroundColor: 'white',
            borderRadius: 60,
          }}
        ></motion.div>
      </motion.div>

      <section style={{ fontSize: 30 }}>scrollDirection: {scrollDirection}</section>
      <section style={{ margin: 20 }}>
        <ScrollVelocity {...props} text="Pro React Admin" ref={scrollRef} className="text-4xl" />
      </section>
      <div ref={wordTargetRef} className={clsx('relative z-0 h-[200vh]')}>
        <div className={'sticky top-0 mx-auto flex max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]'}>
          <p
            className={
              'flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl'
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
      <motion.div
        style={{
          width: 200,
          height: 100,
          backgroundColor: '#aaa',
          textAlign: 'center',
          lineHeight: '100px',
          borderRadius: '20px',
          // scaleX: scrollYProgress,
          x,
          rotate,
        }}
      >
        Rotate
      </motion.div>
      <motion.div
        style={{
          width: 200,
          height: 100,
          backgroundColor: '#aaa',
          borderRadius: '20px',
          textAlign: 'center',
          lineHeight: '100px',
          scaleX,
        }}
      >
        scaleX
      </motion.div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'system-ui',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {listLabel.map((item) => {
            return (
              <motion.div
                layout
                style={{
                  width: 200,
                  height: 30,
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                }}
                key={item}
              >
                {item}
              </motion.div>
            )
          })}
          <motion.div
            style={{
              width: 160,
              height: 30,
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              fontSize: 14,
              backgroundColor: 'black',
              color: 'white',
              letterSpacing: 2,
              cursor: 'pointer',
            }}
            onTap={() => {
              setListLabel(randomSort(listLabel))
            }}
          >
            点击改变顺序
          </motion.div>
        </motion.div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.div
          style={{
            backgroundColor: '#333',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            gap: 10,
          }}
          layout
        >
          <LayoutGroup>
            <motion.div
              layout
              style={{
                width: isBig ? 200 : 60,
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'system-ui',
                color: '#000',
              }}
              onTap={() => {
                setBigState(!isBig)
              }}
            >
              <motion.span layout>click</motion.span>
            </motion.div>
            <motion.div
              layout
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
            ></motion.div>
            <motion.div
              layout
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
            ></motion.div>
          </LayoutGroup>
        </motion.div>
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
