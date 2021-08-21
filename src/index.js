import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals'
import store from './store'
import './styles/reset.css'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// web vitals
reportWebVitals(console.log)
