import React from 'react'

const Error = () => {
  const error = { error: 'error' }
  return (
    <>
      <h3>Cool! Hi, React && Ant Design</h3>
      {error.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </>
  )
}

export default Error
