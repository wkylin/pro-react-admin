import React, { useState, useRef } from 'react'
import {
  motion,
  useAnimationControls,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from 'motion/react'
import FixTabPanel from '@stateless/FixTabPanel'
import HorizontalScrollParallax from '@stateless/HorizontalScroll'

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
  const newArr = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const random = Math.floor(Math.random() * arr.length)
    newArr.push(arr[random])
    arr.splice(random, 1)
  }
  return newArr
}

const ParallaxVert = () => {
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
  useMotionValueEvent(scrYPro, 'change', (current) => {
    console.log('scrYPro', current)
  })

  const x = useTransform(scrollY, (value) => {
    return (value * 1) / 5
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
          backgroundColor: '#aaa',
          borderRadius: '3px',
          // scaleX: scrollYProgress,
          scaleX,
        }}
      />
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
      />
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
      />

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
        initial="hidden"
        animate="show"
      />
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
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 52,
          marginBottom: 120,
          marginTop: 30,
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
        />
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
          margin: '0 auto',
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
            zIndex: 10,
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
          dragSnapToOrigin
          // dragConstraints={{ left: 0, right: 300 }}
          dragConstraints={constraintsRef}
        />
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 52,
          marginTop: 100,
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
        />
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
        />
      </motion.div>

      <section style={{ fontSize: 30 }}>scrollDirection: {scrollDirection}</section>
      <motion.div
        style={{
          width: 200,
          height: 100,
          backgroundColor: '#aaa',
          borderRadius: '20px',
          // scaleX: scrollYProgress,
          x,
          rotate,
        }}
      />
      <motion.div
        style={{
          width: 200,
          height: 100,
          backgroundColor: '#aaa',
          borderRadius: '20px',
          scaleX,
        }}
      />

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
            />
            <motion.div
              layout
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
            />
          </LayoutGroup>
        </motion.div>
      </div>
    </FixTabPanel>
  )
}

export default ParallaxVert
