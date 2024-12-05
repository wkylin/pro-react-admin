import { useState } from 'react'
import useMasonry from '@hooks/useMasonry'

const Masonry = () => {
  const masonryContainer = useMasonry()
  return (
    <div
      className='mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3'
      ref={masonryContainer}
    >
      <div className='relative rounded-xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
        <div style={{ height: 140 }}>我的中国心</div>
      </div>
      <div className='relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
        <div style={{ height: 80 }}>我的中国心</div>
      </div>
      <div className='relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
        <div style={{ height: 150 }}>我的中国心</div>
      </div>
      <div className='relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
        <div style={{ height: 120 }}>我的中国心</div>
      </div>
      <div className='relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
        <div style={{ height: 130 }}>我的中国心</div>
      </div>
      <div className='relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
        <div style={{ height: 50 }}>我的中国心</div>
      </div>
    </div>
  )
}

export default Masonry
