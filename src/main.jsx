import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './proof-lab.css'

// dist/index.html ships with real prerendered markup inside #root (see
// scripts/prerender.mjs) so crawlers and no-JS visitors see real content.
// createRoot (not hydrateRoot) replaces it with a fresh client render —
// no hydration reconciliation cost, same runtime behavior as before.
createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
