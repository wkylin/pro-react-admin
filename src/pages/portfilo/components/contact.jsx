import React from 'react'

const Contact = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center px-4 py-5 text-center tracking-widest md:px-8 lg:px-16">
      <h1 className="mb-8 text-4xl font-bold">Contact Me</h1>
      <div className="space-y-4 text-lg text-gray-400">
        <p>Email: wkylin.w@gmail.com</p>
        <p>GitHub: github.com/wkylin</p>
        <button className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700">
          Send Message
        </button>
      </div>
    </div>
  )
}

export default Contact
