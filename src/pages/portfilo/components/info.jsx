import React from 'react'
const Info = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center border-b border-gray-800/50 p-4 md:p-8">
      <h1 className="mb-8 text-4xl font-bold">My Info</h1>
      <div className="max-w-2xl text-center text-lg text-gray-400">
        <p>Personal details, education, and other relevant information will be displayed here.</p>
      </div>
    </div>
  )
}

export default Info
