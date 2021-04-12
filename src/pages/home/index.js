import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Empty } from 'antd'
import styles from './index.module.less'

import rootAction from '@/actions'

const Home = () => {
  const [state, setState] = useState('CLICK ME')
  const inReducer = useSelector((state) => state.inReducer)
  const deReducer = useSelector((state) => state.deReducer)

  const dispatch = useDispatch()

  return (
    <>
      <Empty />
      <button onClick={() => dispatch(rootAction.inAction.increment(1))}>Increment</button> -- {inReducer.inNumber}
      <button onClick={() => dispatch(rootAction.deAction.decrement(2))}>Decrement</button> -- {deReducer.deNumber}
      <div className={styles.button} onClick={() => setState('CLICKED')}>
        {state}
      </div>
    </>
  )
}

export default Home
