import React, { useId } from 'react'

const StickyCard = ({ cards, children }) => {
  return (
    <>
      <section className="flex flex-col gap-4 pb-20">
        {cards.map((card, index) => (
          <div
            key={card?.id}
            style={{ top: `calc(50px + ${(index + 1) * 30}px)` }}
            className="animate-wiggle bg-[#0a192f] w-[50vw] flex justify-center rounded-2xl overflow-hidden
              z-0 after:z-10 after:content-[''] after:absolute after:inset-0 after:outline after:-outline-offset-2
              after:rounded-2xl after:outline-white/20 px-8 pt-4 after:pointer-events-none sticky m-auto"
          >
            <div className="sticky top-9 h-[40vh]"></div>
          </div>
        ))}
      </section>
    </>
  )
}

export default StickyCard
