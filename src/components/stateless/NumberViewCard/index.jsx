import React, { useEffect, useState } from 'react'

const NumberViewCard = () => {
  return (
    <div className='flex items-center justify-start'>
      <div
        className='relative h-[150px] w-[360px] rounded-lg p-1'
        style={{
          backgroundImage: 'radial-gradient(circle 320px at 0% 0%, #ffffff, #0c0d0d)'
        }}
      >
        <div className='animate-move-dot absolute top-[10%] right-[10%] z-20 h-2 w-2 rounded-full bg-white shadow-md' />

        <div className='bg-gradient-radial relative z-10 flex h-full w-full flex-col items-center justify-center rounded-lg from-gray-600 to-gray-900'>
          <div className='absolute top-0 left-0 h-[45px] w-[220px] origin-left rotate-[40deg] transform rounded-full bg-neutral-300 opacity-40 shadow-[0_0_50px_#ffffff] blur-md' />

          <div className='bg-gradient-to-r from-black via-white to-black bg-clip-text text-6xl font-extrabold text-transparent'>
            750k
          </div>
          <div className='text-lg text-white'>浏览量</div>

          <div className='absolute top-[10%] h-[1px] w-full bg-gradient-to-r from-neutral-400 to-neutral-700' />
          <div className='absolute bottom-[10%] h-[1px] w-full bg-neutral-700' />
          <div className='absolute left-[10%] h-full w-[1px] bg-gradient-to-b from-neutral-400 to-neutral-700' />
          <div className='absolute right-[10%] h-full w-[1px] bg-neutral-700' />
        </div>
      </div>
    </div>
  )
}

export default NumberViewCard
