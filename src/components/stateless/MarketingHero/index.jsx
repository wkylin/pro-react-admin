import React from 'react'
import FloatingIcon, { SocialIcon } from '@stateless/FloatingIcon'
import { Command, Cannabis, Beer, Mail } from 'lucide-react'

const MarketingHero = ({
  title = 'Influencer And Affiliate Marketing Plans and Pricing',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt! Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem.'
}) => {
  return (
    <div className='relative w-full overflow-hidden bg-[#0a192f]'>
      <div className='absolute top-0 right-0 h-full w-1/2'>
        <div
          className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20'
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)'
          }}
        />
      </div>
      <div className='absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white/20' />
      <div className='absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full border-8 border-white/20' />

      <div className='relative mx-auto max-w-7xl px-4 py-16'>
        <div className='mb-16 text-center'>
          <h1 className='mb-6 text-4xl font-bold text-white md:text-5xl'>{title}</h1>
          <p className='mx-auto max-w-3xl text-lg text-gray-300'>{description}</p>
        </div>
      </div>
      <div className='relative mt-8 flex h-16 justify-center gap-8'>
        <FloatingIcon initialX={-150}>
          <SocialIcon icon={Command} color='bg-blue-500' />
        </FloatingIcon>
        <FloatingIcon initialX={-50}>
          <SocialIcon icon={Cannabis} color='bg-blue-400' />
        </FloatingIcon>
        <FloatingIcon initialX={50}>
          <SocialIcon icon={Beer} color='bg-pink-500' />
        </FloatingIcon>
        <FloatingIcon initialX={150}>
          <SocialIcon icon={Mail} color='bg-red-500' />
        </FloatingIcon>
      </div>
    </div>
  )
}

export default MarketingHero
