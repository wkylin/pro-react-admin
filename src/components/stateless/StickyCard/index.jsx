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
                'bg-[#0a192f] w-[50vw] flex justify-center rounded-2xl overflow-hidden z-0 after:z-10 after:absolute after:inset-0 after:outline after:-outline-offset-2 after:rounded-2xl after:outline-white/20 px-8 pt-4 after:pointer-events-none sticky m-auto',
                animateSlide
              )}
            >
              <div className="sticky top-9 h-[30vh] animate-wiggle">
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
