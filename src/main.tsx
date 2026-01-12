import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SquadProvider } from './context/SquadContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SquadProvider>
      <App />
    </SquadProvider>
  </StrictMode>,
)
