import React from 'react'

const Project = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center space-y-12 border-b border-gray-800/50 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold">My Projects</h1>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-64 cursor-pointer items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50 transition-colors hover:bg-gray-800"
          >
            <span className="text-xl text-gray-400">Project {i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project
