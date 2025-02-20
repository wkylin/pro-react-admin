import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const testimonials = [
  {
    text: '北风吹雪四更初，嘉瑞天教及岁除。',
    author: '除夜雪'
  },
  {
    text: '不求见面惟通谒，名纸朝来满敝庐。',
    author: '守岁'
  },
  {
    text: '半盏屠苏犹未举，灯前小草写桃符。',
    author: '除夜雪'
  },
  {
    text: '我亦随人投数纸，世情嫌简不嫌虚。',
    author: '守岁'
  }
]

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length)
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const { text, author, image } = testimonials[currentTestimonial]

  const variants = {
    initial: { opacity: 0, y: '100%', scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: '100%', scale: 0.1 }
  }
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: '#3f3f46' },
    inactive: { scale: 1, backgroundColor: '#D1D5DB' }
  }

  return (
    <section className='py-12'>
      <div className='w-full max-w-2xl'>
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={currentTestimonial}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            className='flex w-full flex-col items-center justify-center'
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.5
            }}
          >
            <p className='text m-0 text-center font-medium tracking-tight'>&quot;{text}&quot;</p>
            <div className='mx-auto mt-5'>
              <div className='flex flex-col items-center justify-center space-x-3'>
                <div className='font-regular text-sm text-gray-900/80'>{author}</div>
              </div>
            </div>
          </motion.div>
          <div className='mt-8 flex justify-center'>
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className='mx-1 h-1 w-1 cursor-pointer rounded-full'
                variants={dotVariants}
                animate={index === currentTestimonial ? 'active' : 'inactive'}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TestimonialCarousel
