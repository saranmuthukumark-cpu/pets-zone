import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PetsProvider from './components/context/PetsContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PetsProvider>
    <App />
    </PetsProvider>
  </React.StrictMode>,
)
