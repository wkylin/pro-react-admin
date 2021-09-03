import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import reportWebVitals from './reportWebVitals'
import store from './store'
import './styles/reset.css'
import App from './App'

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
)

// web vitals
reportWebVitals(console.log)
