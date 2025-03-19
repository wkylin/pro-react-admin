import React from 'react'
import AnimationInView from '@stateless/AnimInView'

const InViewBasicMultiple = () => {
  return (
    <>
      <div className='flex h-[350px] items-end justify-center px-4 pb-24'>
        <AnimationInView
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.95,
              filter: 'blur(4px)'
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)'
            }
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='w-full bg-zinc-100 p-4'>
            <p className='text-zinc-600'>
              <strong className='font-medium text-zinc-900'>哪吒：</strong>
              是魔是仙，我自己说了算，管他什么天劫！
            </p>
          </div>
        </AnimationInView>
      </div>
      <div className='flex h-[350px] items-end justify-center px-4 pb-24'>
        <AnimationInView
          variants={{
            hidden: {
              opacity: 0,
              x: 100
            },
            visible: {
              opacity: 1,
              x: 0
            }
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='w-full bg-zinc-900 p-4'>
            <p className='text-zinc-400'>
              <strong className='font-medium text-zinc-50'>哪吒：</strong>
              以前是我不懂事，现在，换我来守护陈塘关！
            </p>
          </div>
        </AnimationInView>
      </div>
      <div className='flex h-[350px] items-end justify-center overflow-x-hidden px-4 pb-24'>
        <AnimationInView
          variants={{
            hidden: {
              opacity: 0,
              scale: 1.5
            },
            visible: {
              opacity: 1,
              scale: 1
            }
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='w-full bg-zinc-100 p-4'>
            <p className='text-zinc-600'>
              <strong className='font-medium'>哪吒：</strong>
              你是我唯一的兄弟，我不许你死！
            </p>
          </div>
        </AnimationInView>
      </div>
    </>
  )
}

export default InViewBasicMultiple
