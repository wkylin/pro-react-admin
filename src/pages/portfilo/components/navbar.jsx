import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    // 适配 FixLayout，滚动容器可能是 .ant-layout-content
    const scrollContainer = document.querySelector('.ant-layout-content') || window

    const handleScroll = () => {
      let current = ''
      const scrollY = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop

      sections.forEach((section) => {
        // 如果是 window，使用 offsetTop；如果是容器，需要计算相对位置
        // 简单起见，这里假设 section 在容器内，offsetTop 是相对于 offsetParent 的
        // 如果 offsetParent 是容器，则 offsetTop 就是滚动距离
        const top = section.offsetTop
        const height = section.offsetHeight
        if (scrollY >= top - height / 3) {
          current = section.getAttribute('id')
        }
      })
      setActiveSection(current)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (id) =>
    `text-white/90 ${
      activeSection === id
        ? ' font-bold border font-mono p-2 scale-[1.05] bg-animated-g rounded-full transition-all duration-200 ease-in-out'
        : ''
    }`

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    const navHeight = document.querySelector('nav').offsetHeight
    const scrollContainer = document.querySelector('.ant-layout-content') || window

    if (scrollContainer === window) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else {
      // 容器内滚动
      const containerRect = scrollContainer.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      // 目标位置 = 当前滚动位置 + (元素相对视口位置 - 容器相对视口位置) - 导航高度
      // 或者直接使用 element.offsetTop (如果父级定位正确)
      // 这里使用相对视口的计算更稳健
      const offsetPosition = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - navHeight

      scrollContainer.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className='sticky top-0 z-[9999] flex justify-center p-4 py-6 font-mono text-xl backdrop-blur-md'>
      <ul className='mb-0 flex list-none space-x-11 rounded-full border border-gray-500 bg-gray-900 px-8 py-4 tracking-widest opacity-80 backdrop-blur-md'>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <a href='#home' onClick={(e) => handleClick(e, 'home')} className={linkClass('about')}>
            Home
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <a href='#about' onClick={(e) => handleClick(e, 'about')} className={linkClass('info')}>
            About
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <a href='#stack' onClick={(e) => handleClick(e, 'stack')} className={linkClass('stack')}>
            Stack
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <a href='#project' onClick={(e) => handleClick(e, 'project')} className={linkClass('project')}>
            Project
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <a href='#contact' onClick={(e) => handleClick(e, 'contact')} className={linkClass('contact')}>
            Contact
          </a>
        </motion.li>
      </ul>
    </nav>
  )
}

export default Navbar
