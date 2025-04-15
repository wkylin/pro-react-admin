import React, { useEffect, useState } from 'react'

const ClockFace = () => {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [amPm, setAmPm] = useState('AM')

  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date()
      const hrs = currentTime.getHours()
      const mins = currentTime.getMinutes()
      const secs = currentTime.getSeconds()

      setHours(`${hrs < 10 ? '0' : ''}${hrs > 12 ? hrs - 12 : hrs}`)
      setMinutes(`${mins < 10 ? '0' : ''}${mins}`)
      setSeconds(`${secs < 10 ? '0' : ''}${secs}`)
      setAmPm(hrs < 12 ? 'AM' : 'PM')
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center pr-[10px]">
        <span className="text-center text-4xl font-bold">
          {hours}
          <span className="font-mono text-4xl font-bold">:</span>
        </span>
        <span className="text-center text-4xl font-bold">
          {minutes}
          <span className="font-mono text-4xl font-bold">:</span>
        </span>
        <span className="text-center text-4xl font-bold">{seconds}</span>
        <span className="mt-5 ml-3 font-sans text-xl font-bold">{amPm}</span>
      </div>
    </div>
  )
}

export default ClockFace
