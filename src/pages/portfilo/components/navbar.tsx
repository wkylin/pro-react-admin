import { useEffect, useState, type MouseEvent } from 'react'
import { motion } from 'motion/react'

const sectionIds = ['home', 'about', 'info', 'stack', 'project', 'contact'] as const
type SectionId = (typeof sectionIds)[number]

const isSectionId = (id: string | null): id is SectionId => sectionIds.some((sectionId) => sectionId === id)

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<SectionId | ''>('')

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const scrollContainer: HTMLElement | Window =
      document.getElementById('portfolio-container') ||
      document.querySelector<HTMLElement>('.ant-layout-content') ||
      window

    const handleScroll = () => {
      let current: SectionId | '' = ''
      const scrollY = scrollContainer instanceof HTMLElement ? scrollContainer.scrollTop : window.scrollY

      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        if (scrollY >= top - height / 3) {
          const id = section.getAttribute('id')
          current = isSectionId(id) ? id : ''
        }
      })
      setActiveSection(current)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (id: SectionId): string =>
    `text-white/90 px-4 py-2 rounded-full transition-all duration-200 ease-in-out ${
      activeSection === id
        ? ' font-bold border border-white/20 font-mono scale-[1.05] bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-sm'
        : ''
    }`

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: SectionId): void => {
    e.preventDefault()
    const element = document.getElementById(id)
    const nav = document.querySelector('nav')
    if (!element || !nav) return
    const navHeight = nav.offsetHeight
    const scrollContainer =
      document.getElementById('portfolio-container') || document.querySelector<HTMLElement>('.ant-layout-content')

    if (!scrollContainer) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    } else {
      const containerRect = scrollContainer.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const scrollTop = scrollContainer.scrollTop
      const offsetPosition = scrollTop + (elementRect.top - containerRect.top) - navHeight

      scrollContainer.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="sticky top-0 z-9999 flex justify-center p-4 py-6 font-mono text-xl backdrop-blur-md">
      <ul className="mb-0 flex list-none space-x-11 rounded-full border border-gray-500 bg-gray-900 px-8 py-4 tracking-widest opacity-80 backdrop-blur-md">
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <a href="#home" onClick={(e) => handleClick(e, 'home')} className={linkClass('home')}>
            Home
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <a href="#about" onClick={(e) => handleClick(e, 'about')} className={linkClass('about')}>
            About
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <a href="#info" onClick={(e) => handleClick(e, 'info')} className={linkClass('info')}>
            Info
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <a href="#stack" onClick={(e) => handleClick(e, 'stack')} className={linkClass('stack')}>
            Stack
          </a>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, y: -90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <a href="#project" onClick={(e) => handleClick(e, 'project')} className={linkClass('project')}>
            Project
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -100 }}
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
