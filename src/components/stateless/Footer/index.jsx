import React from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import SongPng from '@assets/images/song.png'

const FixFooter = () => {
  return (
    <footer className='sticky bottom-0 left-0 z-0 w-full bg-[#0a192f] py-12 text-white'>
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-6'>
            <motion.h2
              className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={SongPng} width='40' height='40' alt='Logo' />
            </motion.h2>
            <p className='text-sm leading-relaxed sm:text-base'>Shaping the future of web development</p>
            <div className='relative'>
              <input
                type='email'
                placeholder='Your email'
                className='w-full rounded-full border-2 px-4 py-2 pr-12 text-sm transition-all duration-300 outline-none sm:text-base'
              />
              <button className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 transition-colors duration-300'>
                <ArrowUpRight className='h-4 w-4' />
              </button>
            </div>
          </div>

          <div>
            <h3 className='mb-4 text-xl font-semibold'>Navigation</h3>
            <ul className='space-y-2'>
              {['Home', 'About', 'Services', 'Projects', 'Blog', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className='text-sm text-black transition-colors duration-300 sm:text-base dark:text-white'
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-xl font-semibold'>Connect</h3>
            <ul className='space-y-2'>
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com' },
                { name: 'Twitter', url: 'https://www.twitter.com' },
                { name: 'Instagram', url: 'https://www.instagram.com' },
                { name: 'GitHub', url: 'https://www.github.com' }
              ].map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center text-sm text-black transition-colors duration-300 sm:text-base dark:text-white'
                  >
                    {item.name}
                    <ArrowUpRight className='ml-1 h-4 w-4' />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-semibold'>Our Vision</h3>
            <p className='text-sm leading-relaxed sm:text-base'>
              Pioneering the next generation of web experiences through innovative code and cutting-edge design.
            </p>
            <div className='flex space-x-4'>
              <motion.div
                className='h-2 w-2 rounded-full bg-blue-500'
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className='h-2 w-2 rounded-full bg-purple-500'
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
              <motion.div
                className='h-2 w-2 rounded-full bg-pink-500'
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              />
            </div>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row'>
          <p className='text-center text-xs sm:text-sm'>&copy; {new Date().getFullYear()}. All rights reserved.</p>
          <div className='flex flex-wrap justify-center gap-3 text-xs sm:text-sm'>
            <a className='transition-colors duration-300 hover:text-white'>Privacy Policy</a>
            <a className='transition-colors duration-300 hover:text-white'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FixFooter
