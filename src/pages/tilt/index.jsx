import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import Tilt from 'react-parallax-tilt'
import ThreeDCard from '@stateless/ThreeDCard'

import wkylinPng from '@assets/images/wkylin.png'
import SpringPng from '@assets/images/spring.png'
import HePng from '@assets/images/he.png'
import SongPng from '@assets/images/song.png'
import XuePng from '@assets/images/xue.png'
import MacPng from '@assets/images/3dchihiro.png'

const ReactTilt = () => (
  <FixTabPanel>
    <h3>Welcome to react tilt!</h3>
    <section className='flex flex-wrap items-center justify-start gap-8 p-8'>
      <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={1000} scale={1.05} glareEnable>
        <section className='h-[150px] w-[300px] overflow-hidden'>
          <img src={SpringPng} alt='wkylin.w' />
        </section>
      </Tilt>
      <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={1000} scale={1.05} glareEnable>
        <section className='h-[150px] w-[300px] overflow-hidden'>
          <img src={HePng} alt='wkylin.w' />
        </section>
      </Tilt>
      <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={1000} scale={1.05} glareEnable>
        <section className='h-[150px] w-[300px] overflow-hidden'>
          <img src={SongPng} alt='wkylin.w' />
        </section>
      </Tilt>
      <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={1000} scale={1.05} glareEnable>
        <section className='h-[150px] w-[300px] overflow-hidden'>
          <img src={XuePng} alt='wkylin.w' />
        </section>
      </Tilt>
    </section>

    <h3 style={{ margin: '30px 0', fontSize: 18 }}>3D Card</h3>
    <section className='flex flex-wrap items-center justify-start gap-8 p-8'>
      <ThreeDCard title='小荷才露尖尖角，早有蜻蜓立上头' backgroundUrl={HePng} imageUrl={MacPng} variant='shine' />
      <ThreeDCard title='不知细叶谁裁出，二月春风似剪刀' backgroundUrl={SpringPng} variant='border' />
      <ThreeDCard title='明月松间照，清泉石上流' backgroundUrl={SongPng} />
      <ThreeDCard title='柴门闻犬吠，风雪夜归人' backgroundUrl={XuePng} disabled />
    </section>
  </FixTabPanel>
)

export default ReactTilt
