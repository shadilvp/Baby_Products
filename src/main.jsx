import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import './index.css';
import {Provider} from 'react-redux'
import store from './redux/store.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </HashRouter>
  </StrictMode>,
)
