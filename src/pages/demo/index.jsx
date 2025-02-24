import React from 'react'
import { Table } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import AnimationTabs from '@stateless/AnimationTabs'
import LogoSlider from '@stateless/LogoSlider'
import FloatingIcon, { SocialIcon } from '@stateless/FloatingIcon'
import Footer from '@stateless/Footer'
import StarBack from '@stateless/StarBackground'

import StickyCard from '@stateless/StickyCard'
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
    width: 150,
  },
  {
    title: 'Age',
    align: 'center',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    align: 'center',
    dataIndex: 'address',
  },
]

const tabs = [
  {
    title: 'Product',
    value: 'product',
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
        <p>Product Tab</p>
      </div>
    ),
  },
  {
    title: 'Services',
    value: 'services',
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
        <p>Services tab</p>
      </div>
    ),
  },
  {
    title: 'Playground',
    value: 'playground',
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
        <p>Playground tab</p>
      </div>
    ),
  },
  {
    title: 'Content',
    value: 'content',
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
        <p>Content tab</p>
      </div>
    ),
  },
  {
    title: 'Random',
    value: 'random',
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
        <p>Random tab</p>
      </div>
    ),
  },
]
const ProDemo = () => {
  return (
    <FixTabPanel>
      <StarBack />
      <StickyCard cards={[...Array.from({ length: 4 }, () => ({ id: Math.random() }))]} />
      <div className="relative w-full overflow-hidden bg-[#0a192f]">
        <div className="absolute top-0 right-0 h-full w-1/2">
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)',
            }}
          />
        </div>
        <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white/20" />
        <div className="absolute right-0 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full border-8 border-white/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Influencer And Affiliate Marketing Plans and Pricing
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, in? Nemo, quas esse a id at quae sunt!
              Temporibus, consectetur optio. Beatae, culpa nam quas eaque ipsa blanditiis adipisci rem.
            </p>
          </div>
        </div>
        <div className="relative mt-8 flex h-16 justify-center gap-8">
          <FloatingIcon initialX={-150}>
            <SocialIcon icon={Command} color="bg-blue-500" />
          </FloatingIcon>
          <FloatingIcon initialX={-50}>
            <SocialIcon icon={Cannabis} color="bg-blue-400" />
          </FloatingIcon>
          <FloatingIcon initialX={50}>
            <SocialIcon icon={Beer} color="bg-pink-500" />
          </FloatingIcon>
          <FloatingIcon initialX={150}>
            <SocialIcon icon={Mail} color="bg-red-500" />
          </FloatingIcon>
        </div>
      </div>

      <LogoSlider companies={companies} />
      <div className="b relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]">
        <AnimationTabs tabs={tabs} />
      </div>
      <Table columns={columns} dataSource={[]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />

      <Footer />
    </FixTabPanel>
  )
}

export default ProDemo
