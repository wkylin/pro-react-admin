import React from 'react'
const Stack = () => {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center border-b border-gray-800/50 px-4 tracking-wide md:px-8 lg:px-16'>
      <h1 className='mb-8 text-4xl font-bold'>Tech Stack</h1>
      <div className='grid grid-cols-2 gap-8 text-gray-400 md:grid-cols-4'>
        <div className='rounded-lg border border-gray-700 p-4'>React</div>
        <div className='rounded-lg border border-gray-700 p-4'>Vue</div>
        <div className='rounded-lg border border-gray-700 p-4'>Node.js</div>
        <div className='rounded-lg border border-gray-700 p-4'>TypeScript</div>
      </div>
    </div>
  )
}

export default Stack
