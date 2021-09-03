import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from '@src/reducers'

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(rootReducer, applyMiddleware(logger))

export default store
