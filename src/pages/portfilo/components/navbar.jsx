import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = document.querySelectorAll('section')

    const handleScroll = () => {
      let current = ''
      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        if (window.scrollY >= top - height / 3) {
          current = section.getAttribute('id')
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (id) =>
    `text-white/90    ${
      activeSection === id
        ? ' font-bold border font-mono p-2 scale-[1.05] bg-animated-g rounded-full transition-all duration-200 ease-in-out'
        : ''
    }`

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    const navHeight = document.querySelector('nav').offsetHeight
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }

  return (
    <nav className="sticky top-0 z-[9999] flex justify-center p-4 py-6 font-mono text-xl backdrop-blur-md">
      <ul className="mb-0 flex list-none space-x-11 rounded-full border border-gray-500 bg-gray-900 px-8 py-4 tracking-widest opacity-80 backdrop-blur-md">
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <a href="#about" onClick={(e) => handleClick(e, 'about')} className={linkClass('about')}>
            Home
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <a href="#info" onClick={(e) => handleClick(e, 'info')} className={linkClass('info')}>
            About
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <a href="#stack" onClick={(e) => handleClick(e, 'stack')} className={linkClass('stack')}>
            Stack
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <a href="#project" onClick={(e) => handleClick(e, 'project')} className={linkClass('project')}>
            Project
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')} className={linkClass('contact')}>
            Contact
          </a>
        </motion.li>
      </ul>
    </nav>
  )
}

export default Navbar
