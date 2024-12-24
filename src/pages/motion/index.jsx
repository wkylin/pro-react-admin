import React, { useEffect, useState, useRef } from 'react'
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

import './index.css'

const animations = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
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

  const x = useTransform(scrollY, (value) => {
    return (value * 1) / 5
  })

  const ref = useRef(null)
  const { scrollYProgress: scrollAa } = useScroll({
    container: scrollRef,
    target: ref,
    offset: ['end end', 'start start'],
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 6,
            fontFamily: 'system-ui',
            color: 'white',
            backgroundColor: 'black',
            width: 100,
            borderRadius: 20,
            fontSize: 14,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
          onClick={() => {
            setRotate(!isRotated)
          }}
        >
          点击切换
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
          margin: '0 auto',
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
        ></motion.div>
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
      ></motion.div>
      <motion.div
        style={{
          width: 200,
          height: 100,
          backgroundColor: '#aaa',
          borderRadius: '20px',
          scaleX,
        }}
      ></motion.div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'system-ui',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {listLabel.map((item) => {
            return (
              <motion.div
                layout
                style={{
                  width: 200,
                  height: 60,
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
              height: 50,
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              fontSize: 20,
              fontWeight: 100,
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
          gap: 30,
          fontFamily: 'system-ui',
          fontSize: 16,
        }}
      >
        <motion.div
          style={{
            width: buttonRight ? 160 : 200,
            height: 40,
            backgroundColor: '#FFFFFF',
            borderRadius: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
          layout
          onTap={() => {
            setButtonState(!buttonRight)
          }}
        ></motion.div>

        <motion.div
          style={{
            width: 120,
            height: 40,
            backgroundColor: '#333',
            borderRadius: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            // 跟位置相关的参数，而不是x 即transform相关的参数
            left: buttonRight ? 100 : 0,
            position: 'relative',
          }}
          layout
          onTap={() => {
            setButtonState(!buttonRight)
          }}
        ></motion.div>
        <span
          style={{
            color: '#aaa',
            opacity: 0.6,
          }}
        >
          点击任意一个
        </span>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 22,
            fontFamily: 'system-ui',
            color: '#333',
            letterSpacing: 2,
          }}
        >
          <motion.div
            layout
            style={{
              width: leftState ? 200 : 100,
              height: leftState ? 200 : 100,
              backgroundColor: '#999',
              borderRadius: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
            onTap={() => {
              setLeftState(!leftState)
            }}
          >
            <motion.div
              layout
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'black',
                borderRadius: 60,
              }}
            ></motion.div>
          </motion.div>
          <motion.span layout>黑点和文字都设置了layout</motion.span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 22,
            fontFamily: 'system-ui',
            color: '#333',
          }}
        >
          <motion.div
            layout
            style={{
              width: leftState ? 200 : 100,
              height: leftState ? 200 : 100,
              backgroundColor: '#999',
              borderRadius: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
            onTap={() => {
              setLeftState(!leftState)
            }}
          >
            <motion.div
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'black',
                borderRadius: 60,
              }}
            ></motion.div>
          </motion.div>
          <motion.span>黑点和文字都未设置layout</motion.span>
        </div>
      </div>
      <section>
        <section>
          <div ref={ref} className="item">
            <figure className="progress">
              <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  pathLength="1"
                  className="indicator"
                  style={{ pathLength: scrollAa }}
                />
              </svg>
            </figure>
          </div>
        </section>
        <section>
          <div ref={ref} className="item">
            <figure className="progress">
              <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  pathLength="1"
                  className="indicator"
                  style={{ pathLength: scrollAa }}
                />
              </svg>
            </figure>
          </div>
        </section>
        <section>
          <div ref={ref} className="item">
            <figure className="progress">
              <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  pathLength="1"
                  className="indicator"
                  style={{ pathLength: scrollAa }}
                />
              </svg>
            </figure>
          </div>
        </section>
        <section>
          <div ref={ref} className="item">
            <figure className="progress">
              <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  pathLength="1"
                  className="indicator"
                  style={{ pathLength: scrollAa }}
                />
              </svg>
            </figure>
          </div>
        </section>
        <section>
          <div ref={ref} className="item">
            <figure className="progress">
              <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  pathLength="1"
                  className="indicator"
                  style={{ pathLength: scrollAa }}
                />
              </svg>
            </figure>
          </div>
        </section>
      </section>
    </FixTabPanel>
  )
}

export default ParallaxVert

function Item({ scrollRef }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
    container: scrollRef,
  })

  return (
    <section>
      <div ref={ref} className="item">
        <figure className="progress">
          <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="indicator"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </figure>
      </div>
    </section>
  )
}
