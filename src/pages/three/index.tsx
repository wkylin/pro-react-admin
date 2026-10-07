import { useRef, useState, type ComponentProps } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Points as ThreePoints } from 'three'
import { random } from 'maath'

import styles from './index.module.less'

type StarsProps = Partial<ComponentProps<typeof Points>>

export default function ReactThree() {
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 232px)',
        background: '#12071f',
      }}
    >
      <h2 className={styles.liner}>React Three Fiber</h2>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  )
}

function Stars(props: StarsProps) {
  const ref = useRef<ThreePoints>(null)
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000)
    random.inSphere(positions, { radius: 1.5 })
    return positions
  })
  useFrame((_state, delta) => {
    if (!ref.current) return

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
