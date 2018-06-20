import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './Style.css'
import App from './containers/App'
import chatStore from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(chatStore)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
