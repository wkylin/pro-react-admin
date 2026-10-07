import React from 'react'

/**
 * @param {{ items?: string[] }} props
 */
const GradientStats = ({ items = [] }) => {
  return (
    <section className="m-10 flex flex-wrap items-center justify-center gap-5">
      {items.map((item, index) => (
        <div
          key={index}
          className="mb-5 inline-block rounded-xl bg-gradient-to-tl from-blue-600 via-transparent to-purple-400 p-px"
        >
          <div className="min-w-20 rounded-xl bg-white px-3 py-1.5 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900">
            <span className="bg-gradient-to-tl from-blue-600 to-purple-400 bg-clip-text text-transparent">{item}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default GradientStats
