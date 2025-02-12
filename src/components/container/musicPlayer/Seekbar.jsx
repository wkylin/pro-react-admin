import React from 'react'
import { FastForward, Rewind } from 'lucide-react'
const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`

  return (
    <div className="hidden sm:flex flex-row items-center">
      <Rewind
        size={16}
        color="#FFF"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-1 lg:block text-white"
      />
      <span className="text-white mr-1">{value === 0 ? '0:00' : getTime(value)}</span>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <span className="text-white mb-0">{max === 0 ? '0:00' : getTime(max)}</span>
      <FastForward
        size={16}
        color="#FFF"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-1 lg:block text-white"
      />
    </div>
  )
}

export default Seekbar
