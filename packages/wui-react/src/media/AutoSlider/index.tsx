import AnimatedIcon from '../../AnimatedIcon'
import React, { useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react'
import styles from './index.module.less'

export interface AutoSlide {
  id: string | number
  name: string
  title?: string
  quote?: string
  image: string
}
export interface AutoSliderProps {
  slides: AutoSlide[]
  interval?: number
  previousLabel?: string
  nextLabel?: string
  onSelectionChange?: (index: number) => void
}
const AutoSlider = ({
  slides: people,
  interval = 5000,
  previousLabel = 'Previous slide',
  nextLabel = 'Next slide',
  onSelectionChange,
}: AutoSliderProps) => {
  const [index, setIndex] = React.useState(0)

  const selected = people.length ? index % people.length : 0
  const changeRef = useRef(onSelectionChange)
  changeRef.current = onSelectionChange
  useEffect(() => {
    if (people.length < 2 || interval <= 0) return
    const timer = setInterval(() => setIndex((previous) => (previous + 1) % people.length), interval)
    return () => clearInterval(timer)
  }, [people.length, interval])
  useEffect(() => {
    if (people.length) changeRef.current?.(selected)
  }, [selected, people.length])
  const handleIndexChange = (next: number) => {
    if (people.length) setIndex((next + people.length) % people.length)
  }

  return (
    <section className={styles['section']}>
      <div className={styles['section-center']}>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person

          let position = styles['nextSlide']
          if (personIndex === selected) {
            position = styles['activeSlide']
          }
          if (personIndex === selected - 1 || (selected === 0 && personIndex === people.length - 1)) {
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
        <button
          type="button"
          aria-label={previousLabel}
          disabled={!people.length}
          className={styles['prev']}
          onClick={() => handleIndexChange(selected - 1)}
        >
          <AnimatedIcon variant="spin" mode="hover">
            <ArrowLeft />
          </AnimatedIcon>
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          disabled={!people.length}
          className={styles['next']}
          onClick={() => handleIndexChange(selected + 1)}
        >
          <AnimatedIcon variant="spin" mode="hover">
            <ArrowRight />
          </AnimatedIcon>
        </button>
      </div>
    </section>
  )
}

export default AutoSlider
