import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { Tilt } from 'react-tilt'
import wkylinPng from '@assets/images/wkylin.png'

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)' // Easing on enter/exit.
}

const ReactTilt = () => (
  <FixTabPanel>
    <h3>Welcome to react tilt!</h3>
    <Tilt
      options={defaultOptions}
      className='bg-[#55467c] p-2 rounded-2xl w-full flex items-center justify-center'
      style={{ height: 248, width: 248 }}
    >
      <div className='text-white'>
        <img src={wkylinPng} alt='wkylin.w' />
        <h2>wkylin.w</h2>
      </div>
    </Tilt>
  </FixTabPanel>
)

export default ReactTilt
