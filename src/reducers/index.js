import { combineReducers } from 'redux'
import counter from './counter'
const reducers = {
  counter
}

const rootReducers = combineReducers(reducers)

export default rootReducers
