import React from 'react'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className='items-center justify-end'>
    {value <= 1 && value > 0.5 && <Volume2 size={25} color='#FFF' onClick={() => setVolume(0)} />}
    {value <= 0.5 && value > 0 && <Volume1 size={25} color='#FFF' onClick={() => setVolume(0)} />}
    {value === 0 && <VolumeX size={25} color='#FFF' onClick={() => setVolume(1)} />}
    <input
      type='range'
      step='any'
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className='2xl:w-40 lg:w-32 md:w-32 h-1 ml-2'
    />
  </div>
)

export default VolumeBar
