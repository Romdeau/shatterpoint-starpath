import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SquadProvider } from './context/SquadContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SquadProvider>
        <App />
      </SquadProvider>
    </ThemeProvider>
  </StrictMode>,
)
