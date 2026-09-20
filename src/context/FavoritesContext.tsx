import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface FavoritesContextValue {
  savedIds: string[]
  isSaved: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const STORAGE_KEY = 'farhati-dz:favorites'

function readInitialSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/**
 * Minimal cross-screen "saved services" store — Section 5.A's Favorites
 * screen and Service Details' save toggle both need the same state, and a
 * React Context is enough for that; no external state library needed.
 * Persisted to localStorage purely as a nicety so it survives a reload —
 * still entirely client-side, no backend.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(readInitialSavedIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds))
    } catch {
      // Ignore write failures (e.g. private browsing storage limits) —
      // favorites just won't persist across reloads in that case.
    }
  }, [savedIds])

  const value = useMemo<FavoritesContextValue>(
    () => ({
      savedIds,
      isSaved: (id) => savedIds.includes(id),
      toggleFavorite: (id) =>
        setSavedIds((current) =>
          current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
        ),
    }),
    [savedIds],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return ctx
}
