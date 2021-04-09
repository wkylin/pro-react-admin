import React, { useState } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { Alert, Empty } from 'antd'
import styles from './style.module.less'

import { increment } from '@/actions/index'

function Home() {
  const [state, setState] = useState('CLICK ME')
  const counter = useSelector((state) => state.counter)

  const dispatch = useDispatch()

  const store = useStore()

  return (
    <>
      <Empty />
      <Alert message="Success Text" type="success" />
      {/* <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>Increment</button> */}
      <button onClick={() => dispatch(increment(1))}>Increment</button> -- {counter.number}
      <div>Store: {JSON.stringify(store, null, 2)}</div>
      <div className={styles.button} onClick={() => setState('CLICKED')}>
        {state}
      </div>
      <div className={styles.flex}>
        <div className={styles.flexItem}>flex item</div>
        <div className={styles.flexItem}>flex item</div>
      </div>
      <div style={{ height: 1000 }}>placeholder</div>
    </>
  )
}

export default Home
