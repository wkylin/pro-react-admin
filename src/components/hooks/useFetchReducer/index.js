import React from 'react'

// const [state, dispatch] = useFetchReducer(null);
// https://codesandbox.io/s/elastic-framework-9wqd9?file=/src/App.js:140-188

const useFetchReducer = (initialData = null) => {
  const initialState = {
    status: 'idle',
    data: initialData,
    error: null,
  }

  const fetchReducer = (currentState, action) => {
    switch (action.type) {
      case 'FETCH':
        return {
          ...currentState,
          status: 'loading',
        }
      case 'RESOLVE':
        return {
          status: 'success',
          data: action.data,
          error: null,
        }
      case 'REJECT':
        return {
          data: null,
          status: 'failure',
          error: action.error,
        }
      default:
        return currentState
    }
  }

  return React.useReducer(fetchReducer, initialState)
}

export default useFetchReducer
