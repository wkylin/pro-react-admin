import { combineReducers } from 'redux'
import inReducer from './increment'
import deReducer from './decrement'

const reducers = {
  inReducer,
  deReducer,
}

const baseReducers = combineReducers(reducers)

const rootReducer = window.__POWERED_BY_QIANKUN__
  ? (state, action) => {
      if (action.type === 'RESET_DATA') {
        state = undefined
      }
      return baseReducers(state, action)
    }
  : baseReducers

export default rootReducer
