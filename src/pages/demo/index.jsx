import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Smartphone, Monitor, Rocket } from 'lucide-react'
import PageContainer from '@stateless/PageContainer'
import FixTabPanel from '@stateless/FixTabPanel'

import LogoSlider from '@stateless/LogoSlider'
import StarBack from '@stateless/StarBackground'
import OrbitingCircles from '@stateless/OrbitingCircles'
import FixTabs from '@stateless/FixTabs'
import TagCard from '@stateless/TagCard'
import DescBox from '@stateless/DescBox'
import StatisticCard from '@stateless/StatisticCard'
import TransferHistory from '@stateless/TransferHistory'
import FixCarousel from '@stateless/FixCarouse'
import OrgChart from '@stateless/OrgChart'
import TrapezoidTabs from '@stateless/TrapezoidTabs'
import MusicPlayer from '@stateless/MusicPlayer'
import GradientStats from '@stateless/GradientStats'
import WaveBackground from '@stateless/WaveBackground'
import MarketingHero from '@stateless/MarketingHero'
import ScriptView from '@stateless/ScriptView'
import AnimatedList from '@stateless/AnimatedList'
// import AnimationTabs from '@stateless/AnimationTabs'
import StickyCard from '@stateless/StickyCard'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'
import styles from './index.module.less'

const companies = [SpringPng, HePng, SongPng, XuePng]

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

const customCommandMap = {
  npm: 'npm run shadcn add button',
  yarn: 'yarn shadcn add button',
  pnpm: 'pnpm dlx shadcn@latest add button',
  bun: 'bun x shadcn@latest add button',
}

const dateDifference = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const tagCardList = [
  {
    name: '基础属性标签',
    tags: [
      {
        name: '本地客户',
      },
      {
        name: '建筑行业',
      },
      {
        name: '教育体系客户/医疗体系客户',
      },
    ],
  },
  {
    name: '业务属性标签',
    tags: [
      {
        name: '建设工程中重点客户',
      },
      {
        name: '交易频次高',
      },
      {
        name: '业务数量多',
      },
      {
        name: '复合型客户',
      },
      {
        name: '交易频次高',
      },
      {
        name: '业务数量多',
      },
      {
        name: '复合型客户',
      },
    ],
  },
  {
    name: '价值评估标签',
    tags: [
      {
        name: '重点客户/一般客户',
      },
      {
        name: '战略合作客户',
      },
      {
        name: '高影响力客户',
      },
      {
        name: '长期委托协议客户',
      },
    ],
  },
  {
    name: '风险控制标签',
    tags: [
      {
        name: '信用等级高',
      },
      {
        name: '内控制度完善',
      },
      {
        name: '存在失信记录',
      },
      {
        name: '中风险客户',
      },
    ],
  },
  {
    name: '行为特征标签',
    tags: [
      {
        name: '偏好线上客户/电话咨询',
      },
      {
        name: '内控制度完善',
      },
      {
        name: '存在失信记录',
      },
      {
        name: '中风险客户',
      },
    ],
  },
  {
    name: '其他标签',
    tags: [
      {
        name: '紧急项目多',
      },
      {
        name: '配合度高',
      },
      {
        name: '推动效率高',
      },
      {
        name: '响应时间长',
      },
    ],
  },
  {
    name: '其他标签',
    tags: [
      {
        name: '紧急项目多',
      },
      {
        name: '配合度高',
      },
    ],
  },
]

const orbitingItems = [
  {
    content: <Monitor className="h-6 w-6 text-purple-500" />,
    radius: 80,
    duration: 20,
    reverse: true,
  },
  {
    content: <Smartphone className="h-6 w-6 text-green-500" />,
    radius: 140,
    duration: 30,
    delay: 15,
    reverse: true,
  },
  {
    content: <Rocket className="h-6 w-6 text-red-500" />,
    radius: 200,
    duration: 40,
    reverse: false,
  },
]

const ProDemo = () => {
  return (
    <FixTabPanel>
      <PageContainer>
        <MusicPlayer />
        <TransferHistory />
        <FixCarousel />
        <ScriptView showMultiplePackageOptions={true} codeLanguage="shell" commandMap={customCommandMap} />
        <TrapezoidTabs
          tabs={[
            { name: 'tab1', code: 'tab1' },
            { name: 'tab2', code: 'tab2' },
            { name: 'tab3', code: 'tab3' },
          ]}
          defaultActiveTab="tab1"
        />

        <OrbitingCircles items={orbitingItems} />
        <StarBack />

        <MarketingHero />
        <FixTabs />
        <StatisticCard />
        <LogoSlider companies={companies} />
        <section style={{ height: 240, overflow: 'hidden', margin: 20 }}>
          <AnimatedList>
            {Array.from({ length: 10 }, () => ({
              id: Math.random(),
            }))
              .flat()
              .map((item, index) => (
                <div key={item?.id} className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-16 w-100 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                  </div>
                </div>
              ))}
          </AnimatedList>
        </section>
        {/* <AnimationTabs tabs={tabs} /> */}

        <GradientStats items={['200+', '400+', '1200+', '2000+']} />
        <DescBox />
        <TagCard tagCardList={tagCardList} showMax={6} />
        <WaveBackground
          height={300}
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          waves={[
            {
              fill: 'rgba(255, 255, 255, 0.1)',
              options: { height: 20, amplitude: 20, speed: 0.15, points: 3 },
            },
            {
              fill: 'rgba(255, 255, 255, 0.3)',
              options: { height: 15, amplitude: 30, speed: 0.2, points: 4 },
            },
            {
              fill: 'rgba(255, 255, 255, 0.5)',
              options: { height: 10, amplitude: 40, speed: 0.25, points: 5 },
            },
          ]}
          className="my-4 rounded-xl"
        />
        <StickyCard cards={[...Array.from({ length: 4 }, () => ({ id: Math.random() }))]} />
        <section style={{ marginBottom: '15px' }}>
          <OrgChart />
        </section>
      </PageContainer>
    </FixTabPanel>
  )
}

export default ProDemo
