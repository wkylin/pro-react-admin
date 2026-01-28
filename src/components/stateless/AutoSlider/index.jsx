import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react'
import styles from './index.module.less'

import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'

const data = [
  {
    id: 1,
    name: '《咏柳》',
    title: '贺知章',
    quote: '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。',
    image: SpringPng,
  },
  {
    id: 2,
    name: '《小池》',
    title: '杨万里',
    quote: '泉眼无声惜细流，树阴照水爱晴柔。小荷才露尖尖角，早有蜻蜓立上头。',
    image: HePng,
  },
  {
    id: 3,
    name: '《山居秋暝》',
    title: '王维',
    quote: '空山新雨后，天气晚来秋。明月松间照，清泉石上流。',
    image: SongPng,
  },
  {
    id: 4,
    name: '《逢雪宿芙蓉山主人》',
    title: '刘长卿',
    quote: '日暮苍山远，天寒白屋贫。柴门闻犬吠，风雪夜归人。',
    image: XuePng,
  },
]

const AutoSlider = () => {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = React.useState(0)

  useEffect(() => {
    const lastIndex = people.length - 1
    if (index < 0) {
      const id = setTimeout(() => setIndex(lastIndex), 0)
      return () => clearTimeout(id)
    }
    if (index > lastIndex) {
      const id = setTimeout(() => setIndex(0), 0)
      return () => clearTimeout(id)
    }
    return undefined
  }, [index, people])

  const sliderRef = useRef(null)
  useEffect(() => {
    sliderRef.current = setInterval(() => {
      setIndex(index + 1)
    }, 5000)
    return () => {
      clearInterval(sliderRef.current)
    }
  }, [index])

  const handleIndexChange = (newIndex) => {
    clearInterval(sliderRef.current)
    setIndex(newIndex)
    sliderRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % people.length)
    }, 5000)
  }

  return (
    <section className={styles['section']}>
      <div className={styles['section-center']}>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person

          let position = styles['nextSlide']
          if (personIndex === index) {
            position = styles['activeSlide']
          }
          if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = styles['lastSlide']
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className={styles['person-img']} />
              <h4>{name}</h4>
              <p className={styles['title']}>{title}</p>
              <p className={styles['text']}>{quote}</p>
              <AnimatedIcon variant="spin" mode="hover">
                <Quote className={styles['icon']} />
              </AnimatedIcon>
            </article>
          )
        })}
        <button className={styles['prev']} onClick={() => handleIndexChange(index - 1)}>
          <AnimatedIcon variant="spin" mode="hover">
            <ArrowLeft />
          </AnimatedIcon>
        </button>
        <button className={styles['next']} onClick={() => handleIndexChange(index + 1)}>
          <AnimatedIcon variant="spin" mode="hover">
            <ArrowRight />
          </AnimatedIcon>
        </button>
      </div>
    </section>
  )
}

export default AutoSlider
