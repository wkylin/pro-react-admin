import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import TextComponent from './TextComponent'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'
const data = [
  {
    title: '《咏柳》—— 贺知章',
    content: '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。',
    srcImage: SpringPng
  },
  {
    title: '《小池》—— 杨万里',
    content: '泉眼无声惜细流，树阴照水爱晴柔。小荷才露尖尖角，早有蜻蜓立上头。',
    srcImage: HePng
  },
  {
    title: '《山居秋暝》—— 王维',
    content: '空山新雨后，天气晚来秋。明月松间照，清泉石上流。',
    srcImage: SongPng
  },
  {
    title: '《逢雪宿芙蓉山主人》—— 刘长卿',
    content: '日暮苍山远，天寒白屋贫。柴门闻犬吠，风雪夜归人。',
    srcImage: XuePng
  }
]

const FeatureFourImages = () => {
  const [featureOpen, setFeatureOpen] = useState(0)
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10)
    }, 10)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => (prev + 1) % data.length)
      setTimer(0)
    }
  }, [timer])

  return (
    <div className='grid grid-cols-1 gap-4 rounded-sm border p-4 md:grid-cols-2'>
      <div className='space-y-6'>
        {data.map((item, index) => (
          <button
            className='w-full'
            key={item.title}
            onClick={() => {
              setFeatureOpen(index)
              setTimer(0)
            }}
            type='button'
          >
            <TextComponent
              content={item.content}
              isOpen={featureOpen === index}
              loadingWidthPercent={featureOpen === index ? timer / 100 : 0}
              number={index + 1}
              title={item.title}
            />
          </button>
        ))}
      </div>
      <div className='h-full'>
        <div className={clsx('relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]')}>
          {data.map((item, index) => (
            <img
              alt={item.title}
              className={clsx(
                'absolute h-[500px] w-full transform-gpu rounded-lg object-cover transition-all duration-300',
                featureOpen === index ? 'scale-100' : 'scale-70',
                featureOpen > index ? 'translate-y-full' : ''
              )}
              key={item.title}
              src={item.srcImage}
              style={{ zIndex: data.length - index }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureFourImages
