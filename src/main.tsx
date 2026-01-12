import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SquadProvider } from './context/SquadContext'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SquadProvider>
        <Router>
          <App />
        </Router>
      </SquadProvider>
    </ThemeProvider>
  </StrictMode>,
)
