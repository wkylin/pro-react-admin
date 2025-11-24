import React from 'react'

const About = () => {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center border-b border-gray-800/50 px-4 py-5 text-center tracking-widest md:px-8 lg:px-16'>
      <h1 className='mb-8 text-4xl font-bold'>About Me</h1>
      <div className='max-w-2xl text-lg text-gray-400'>
        <p>
          Welcome to my portfolio. This section will contain information about my background, experience, and
          professional journey.
        </p>
      </div>
    </div>
  )
}

export default About
