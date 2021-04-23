import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import rootAction from '@/actions'

import { baseUrl, useFetch } from '@/service'

const Home = () => {
  const inReducer = useSelector((state) => state.inReducer)
  const deReducer = useSelector((state) => state.deReducer)

  const dispatch = useDispatch()

  const [response, loading] = useFetch(`${baseUrl}/todos/1`, {
    method: 'GET',
  })

  return (
    <>
      <div>useFetch: {loading ? 'Loading...' : JSON.stringify(response, null, 2)}</div>
      <button onClick={() => dispatch(rootAction.inAction.increment(1))}>Increment</button> -- {inReducer.inNumber}
      <button onClick={() => dispatch(rootAction.deAction.decrement(2))}>Decrement</button> -- {deReducer.deNumber}
    </>
  )
}

export default Home
