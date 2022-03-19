import { useState, useCallback } from 'react'
const useForceUpdate = () => {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
    console.log('updated')
  }, [])
  return update
}

// import store from '../../../store'
// import { useReducer, useEffect } from 'react'

// const useForceUpdate = () => {
//   const [, forceUpdateDispatch] = useReducer((v) => v + 1, 0)
//   useEffect(() => {
//     const unSubscribeFn = store.subscribe(() => {
//       forceUpdateDispatch()
//     })
//     return unSubscribeFn
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [store])
//   return store
// }

// function useForceUpdate() {
//   const [, forceUpdate] = React.useState()

//   return React.useCallback(() => {
//     forceUpdate((s) => !s)
//   }, [])
// }
// const forceUpdate = useForceUpdate()
// const onClick = React.useCallback(() => {
//   forceUpdate()
// }, [forceUpdate])

export default useForceUpdate
