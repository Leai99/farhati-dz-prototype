import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { ProviderDataProvider } from './context/ProviderDataContext'
import './i18n' // Side-effect import: initializes i18next and sets <html dir/lang> before the first render.
import './index.css'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <ProviderDataProvider>
        <RouterProvider router={router} />
      </ProviderDataProvider>
    </FavoritesProvider>
  </StrictMode>,
)
