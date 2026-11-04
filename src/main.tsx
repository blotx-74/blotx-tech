import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// كل جزء بيتحمّل لوحده: زائر /fahmny مش بيحمّل Three.js/Firebase بتوع الموقع الرئيسي، والعكس
const App = lazy(() => import('./App.tsx').then((m) => ({ default: m.App })))
const FahmnyApp = lazy(() => import('./fahmny/FahmnyApp.tsx'))
const isFahmny = /^\/fahmny(\/|$)/.test(window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={isFahmny ? <div style={{ minHeight: '100vh', background: '#0d101c' }} /> : null}>
      {isFahmny ? <FahmnyApp /> : <App />}
    </Suspense>
  </StrictMode>,
)
