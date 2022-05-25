import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from '@src/reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: process.env.NODE_ENV !== 'production' ? [logger] : [],
})

export default store
