import React from 'react'
import { FastForward, Rewind } from 'lucide-react'
const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`

  return (
    <div className='hidden flex-row items-center sm:flex'>
      <Rewind
        size={16}
        color='#FFF'
        onClick={() => setSeekTime(appTime - 5)}
        className='hidden text-white lg:mr-1 lg:block'
      />
      <span className='mr-1 text-white'>{value === 0 ? '0:00' : getTime(value)}</span>
      <input
        type='range'
        step='any'
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className='mx-4 h-1 w-24 rounded-lg md:block md:w-56 2xl:mx-6 2xl:w-96'
      />
      <span className='mb-0 text-white'>{max === 0 ? '0:00' : getTime(max)}</span>
      <FastForward
        size={16}
        color='#FFF'
        onClick={() => setSeekTime(appTime + 5)}
        className='hidden text-white lg:ml-1 lg:block'
      />
    </div>
  )
}

export default Seekbar
