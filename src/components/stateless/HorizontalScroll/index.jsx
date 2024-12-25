import React, { useRef } from 'react'
import { motion, useTransform, useScroll } from 'motion/react'

const cards = [
  {
    url: 'https://picsum.photos/id/28/400/267',
    title: 'Title 1',
    id: 1,
  },
  {
    url: 'https://picsum.photos/id/29/400/267',
    title: 'Title 2',
    id: 2,
  },
  {
    url: 'https://picsum.photos/id/30/400/267',
    title: 'Title 3',
    id: 3,
  },
  {
    url: 'https://picsum.photos/id/31/400/267',
    title: 'Title 4',
    id: 4,
  },
  {
    url: 'https://picsum.photos/id/32/400/267',
    title: 'Title 5',
    id: 5,
  },
]
const HorizontalScrollParallax = () => {
  return (
    <>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </>
  )
}

const Card = ({ card }) => {
  return (
    <div key={card.id} className="group relative h-[267px] w-[400px] overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="p-8 text-6xl font-black text-white uppercase bg-gradient-to-br from-white/20 to-white/0 backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  )
}

export default HorizontalScrollParallax
