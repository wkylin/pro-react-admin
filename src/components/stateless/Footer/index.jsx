import React from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import SongPng from '@assets/images/song.png'

const Footer = () => {
  return (
    <footer className="bg-[#0a192f] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <motion.h2
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={SongPng} width="40" height="40" alt="Logo" />
            </motion.h2>
            <p className="">Shaping the future of web development</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-full border-2 px-4 py-2 transition-all duration-300 outline-none"
              />
              <button className="absolute top-2 right-1 rounded-full p-1 transition-colors duration-300">
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Blog', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-black transition-colors duration-300 dark:text-white"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Connect</h3>
            <ul className="space-y-2">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com' },
                { name: 'Twitter', url: 'https://www.twitter.com' },
                { name: 'Instagram', url: 'https://www.instagram.com' },
                { name: 'GitHub', url: 'https://www.github.com' },
              ].map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-black transition-colors duration-300 dark:text-white"
                  >
                    {item.name}
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="">
              Pioneering the next generation of web experiences through innovative code and cutting-edge design.
            </p>
            <div className="flex space-x-4">
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-purple-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-pink-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm">&copy; {new Date().getFullYear()}. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <a className="text-sm transition-colors duration-300 hover:text-white">Privacy Policy</a>
            <a className="text-sm transition-colors duration-300 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
