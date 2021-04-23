import { combineReducers } from 'redux'
import inReducer from './increment'
import deReducer from './decrement'
const rootReducers = {
  inReducer,
  deReducer,
}

const rootReducer = combineReducers(rootReducers)

export default rootReducer
