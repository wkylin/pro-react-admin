import React from 'react'
import { motion } from 'motion/react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center border-b border-gray-800/50 px-4 pb-16 text-center md:px-8 lg:px-16'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500 shadow-lg shadow-blue-500/50'
      >
        <img src='https://github.com/wkylin.png' alt='Avatar' className='h-full w-full object-cover' />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-6 text-5xl font-bold tracking-tight md:text-7xl'
      >
        Hi, I'm <span className='text-blue-500'>Wkylin</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mb-8 max-w-2xl text-xl text-gray-400'
      >
        A passionate Full Stack Developer building amazing web experiences with React, Node.js, and modern web
        technologies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='flex gap-4'
      >
        <button className='rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700'>
          Download CV
        </button>
        <button className='rounded-full border border-gray-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-800'>
          Contact Me
        </button>
      </motion.div>
    </div>
  )
}

export default Home
