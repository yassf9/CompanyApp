import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import compstore from './Redux/Store.ts'
import reportWebVitals from './reportWebVitals' ;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={compstore}>
      <App />
    </Provider>
  </React.StrictMode>,
)

reportWebVitals();
