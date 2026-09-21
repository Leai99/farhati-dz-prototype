import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { RouterProvider } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { ProviderDataProvider } from './context/ProviderDataContext'
import './i18n' // Side-effect import: initializes i18next and sets <html dir/lang> before the first render.
import './index.css'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* LazyMotion + `m` components: only the DOM animation features we use
        are bundled. reducedMotion="user": honors prefers-reduced-motion
        app-wide (see lib/motion.ts). */}
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <FavoritesProvider>
          <ProviderDataProvider>
            <RouterProvider router={router} />
          </ProviderDataProvider>
        </FavoritesProvider>
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
