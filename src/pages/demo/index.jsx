import React from 'react'
import { Table } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import AnimationTabs from '@stateless/AnimationTabs'
import LogoSlider from '@stateless/LogoSlider'
import FloatingIcon, { SocialIcon } from '@stateless/FloatingIcon'

import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'

import { Command, Cannabis, Beer, Mail } from 'lucide-react'

const companies = [SpringPng, HePng, SongPng, XuePng]
const columns = [
  {
    title: 'Name',
    align: 'center',
    dataIndex: 'name',
    width: 150
  },
  {
    title: 'Age',
    align: 'center',
    dataIndex: 'age',
    width: 150
  },
  {
    title: 'Address',
    align: 'center',
    dataIndex: 'address'
  }
]

const tabs = [
  {
    title: 'Product',
    value: 'product',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Product Tab</p>
      </div>
    )
  },
  {
    title: 'Services',
    value: 'services',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Services tab</p>
      </div>
    )
  },
  {
    title: 'Playground',
    value: 'playground',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Playground tab</p>
      </div>
    )
  },
  {
    title: 'Content',
    value: 'content',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Content tab</p>
      </div>
    )
  },
  {
    title: 'Random',
    value: 'random',
    content: (
      <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-linear-to-br from-purple-700 to-violet-900'>
        <p>Random tab</p>
      </div>
    )
  }
]
const ProDemo = () => {
  return (
    <FixTabPanel>
      <div className='relative w-full bg-[#0a192f] overflow-hidden'>
        <div className='absolute top-0 right-0 w-1/2 h-full'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20'
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)'
            }}
          />
        </div>
        <div className='absolute top-0 left-0 w-64 h-64 border-8 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2' />
        <div className='absolute bottom-0 right-0 w-64 h-64 border-8 border-white/20 rounded-full translate-x-1/2 translate-y-1/2' />

        <div className='relative max-w-7xl mx-auto px-4 py-16'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              Influencer And Affiliate Marketing Plans and Pricing
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt!
              Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem.
            </p>
          </div>
        </div>
        <div className='flex justify-center gap-8 mt-8 relative h-16'>
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

      <LogoSlider companies={companies} />
      <div className='h-[20rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start'>
        <AnimationTabs tabs={tabs} />
      </div>
      <Table columns={columns} dataSource={[]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    </FixTabPanel>
  )
}

export default ProDemo
