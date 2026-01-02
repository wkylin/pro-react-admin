import React from 'react'
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
import MarketingHero from '@stateless/MarketingHero'
import ScriptView from '@stateless/ScriptView'
import ScrollLayout from '@stateless/ScrollLayout'
import AnimatedList from '@stateless/AnimatedList'
// import AnimationTabs from '@stateless/AnimationTabs'
import StickyCard from '@stateless/StickyCard'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'
import OneTimePasscode from '@stateless/OneTimePasscode'

const companies = [SpringPng, HePng, SongPng, XuePng]

const fixTabsData = [
  {
    id: 1,
    label: '首页',
    content: (
      <div>
        <h2 className="mb-4 text-xl font-bold">首页</h2>
        <p>这是首页的内容区域。您可以在这里添加任何相关内容。</p>
      </div>
    ),
  },
  {
    id: 2,
    label: '产品',
    content: (
      <div>
        <h2 className="mb-4 text-xl font-bold">产品</h2>
        <p>这是产品的内容区域。您可以在这里添加任何相关内容。</p>
      </div>
    ),
  },
  {
    id: 3,
    label: '服务',
    content: (
      <div>
        <h2 className="mb-4 text-xl font-bold">服务</h2>
        <p>这是服务的内容区域。您可以在这里添加任何相关内容。</p>
      </div>
    ),
  },
  {
    id: 4,
    label: '关于我们',
    content: (
      <div>
        <h2 className="mb-4 text-xl font-bold">关于我们</h2>
        <p>这是关于我们的内容区域。您可以在这里添加任何相关内容。</p>
      </div>
    ),
  },
  {
    id: 5,
    label: '联系我们',
    content: (
      <div>
        <h2 className="mb-4 text-xl font-bold">联系我们</h2>
        <p>这是联系我们的内容区域。您可以在这里添加任何相关内容。</p>
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

const animatedListItems = Array.from({ length: 10 }, (_, index) => ({
  id: `animated-${index + 1}`,
}))

const stickyCardItems = Array.from({ length: 4 }, (_, index) => ({
  id: `sticky-${index + 1}`,
}))

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

const statisticItems = [
  {
    title: '参与项目数量',
    value: 10,
    unit: '宗',
    icon: 'book',
    showTooltip: true,
    tooltipContent: '参与项目：缴纳保证金即为参与',
    tooltipPlacement: 'top',
  },
  {
    title: '同比增长',
    value: 20,
    unit: '%',
    icon: 'rate',
    showTooltip: false,
  },
]

const ProDemo = () => {
  return (
    <FixTabPanel>
      <PageContainer>
        <OneTimePasscode length={6} variant="compact" onComplete={() => {}} />
        <div style={{ height: '400px' }}>
          <ScrollLayout
            headerHeight={60}
            footerHeight={60}
            header={
              <div className="flex h-full items-center justify-between px-6">
                <h1 className="text-xl font-bold">ScrollLayout 组件示例</h1>
              </div>
            }
            footer={
              <div className="flex h-full items-center justify-center text-sm">
                <p>© 2025 ScrollLayout - 支持自定义样式</p>
              </div>
            }
          >
            <div className="space-y-4 p-6">
              <h2 className="text-lg font-semibold">中间内容区域（可滚动）</h2>
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium">内容块 {i + 1}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    这是一个灵活的布局组件，支持可选的 header/footer，自定义高度和样式
                  </p>
                </div>
              ))}
            </div>
          </ScrollLayout>
        </div>
        <MusicPlayer />
        <TransferHistory />
        <FixCarousel />
        <ScriptView codeLanguage="shell" commandMap={customCommandMap} />
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
        <FixTabs tabs={fixTabsData} />
        <StatisticCard items={statisticItems} />
        <LogoSlider companies={companies} />
        <section style={{ height: 240, overflow: 'hidden', margin: 20 }}>
          <AnimatedList>
            {animatedListItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-16 w-100 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                </div>
              </div>
            ))}
          </AnimatedList>
        </section>

        <GradientStats items={['200+', '400+', '120+', '300+']} />
        <DescBox />
        <TagCard tagCardList={tagCardList} showMax={6} />
        <StickyCard cards={stickyCardItems} />
        <section style={{ marginBottom: '15px' }}>
          <OrgChart />
        </section>
        {/* <AnimationTabs tabs={tabs} /> */}
      </PageContainer>
    </FixTabPanel>
  )
}

export default ProDemo
