import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

import styles from './index.module.less'

export default function ReactThree() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 232px)', background: '#12071f' }}>
      <h2 className={styles.liner}>React Three Fiber</h2>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  )
}

function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}
