import React, { useRef } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import FixTabPanel from '@stateless/FixTabPanel'
import ScrollableSections from '@stateless/ScrollableSections'
import AboutSection from '@stateless/AboutSection'
import ContactSection from '@stateless/ContactSection'

const ParallaxVert = ({ props }) => {
  const controller = useAnimationControls()
  const constraintsRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // 定义sections配置，包含动画组件
  const sections = [
    {
      title: 'Home',
      content: '欢迎来到Motion页面，这里展示了各种动画效果和交互功能。',
      component: (
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
      ),
    },
    {
      title: 'About',
      content: '关于我们：我们致力于创造优秀的用户体验，通过现代化的技术栈和设计理念。',
      component: <AboutSection scrollContainerRef={scrollContainerRef} />,
    },
    {
      title: 'Contact',
      content: '联系我们：如果您有任何问题或建议，请随时与我们取得联系。',
      component: <ContactSection scrollContainerRef={scrollContainerRef} />,
    },
  ]

  return (
    <FixTabPanel
      ref={scrollContainerRef}
      showScrollProgress={true}
      scrollProgressProps={{
        height: 3,
        color: 'linear-gradient(108deg,#0894ff,#ff2e54 70%,#ff9004)',
      }}
      style={{ height: '100%' }}
    >
      <h2>Hi, Motion</h2>
      <ScrollableSections
        sections={sections}
        scrollContainerRef={scrollContainerRef}
        navUlClassName="custom-nav-ul"
        navLiClassName="custom-nav-li"
        titleClassName="custom-title"
        contentClassName="custom-content"
        componentClassName="custom-component"
      />
    </FixTabPanel>
  )
}

export default ParallaxVert
