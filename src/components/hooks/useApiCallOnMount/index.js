import { useReducer, useEffect } from 'react'

const initialState = {
  loading: false,
  data: null,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...initialState, loading: true }
    case 'success':
      return { ...initialState, data: action.data }
    case 'error':
      return { ...initialState, error: action.error }
    default:
      throw new Error()
  }
}

const useApiCallOnMount = (service) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'loading' })
    service()
      .then((data) => {
        dispatch({ type: 'success', data })
      })
      .catch((error) => {
        dispatch({ type: 'success', error })
      })
  }, [service])

  return [state.loading, state.data, state.error]
}

export default useApiCallOnMount
