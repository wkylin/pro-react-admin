import React, { useId } from 'react'
import clsx from 'clsx'

const StickyCard = ({ cards, children }) => {
  return (
    <>
      <section className="flex flex-col gap-4 pt-30 pb-20">
        {cards.map((card, index) => {
          const animateSlide = index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
          return (
            <div
              key={card?.id}
              style={{ top: `calc(50px + ${(index + 1) * 30}px)` }}
              className={clsx(
                'sticky z-0 m-auto flex w-[50vw] justify-center overflow-hidden rounded-2xl bg-[#0a192f] px-8 pt-4 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-2xl after:outline after:-outline-offset-2 after:outline-white/20',
                animateSlide
              )}
            >
              <div className="animate-wiggle h-[30vh]">
                <p className="animate-hue-rotate hue-clip text-gradient text-2xl">Card Item</p>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default StickyCard
