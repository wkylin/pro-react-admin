import { combineReducers } from 'redux'
import inReducer from './increment'
import deReducer from './decrement'

const reducers = {
  inReducer,
  deReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
