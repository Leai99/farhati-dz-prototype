import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { EVENT_TYPES, type AppEvent, type EventType } from '../lib/events'

interface NewEventInput {
  name: string
  eventType: EventType
  date: string
}

interface EventsContextValue {
  /** Soonest event first. */
  events: AppEvent[]
  getEvent: (id: string) => AppEvent | undefined
  createEvent: (input: NewEventInput, initialServiceIds?: string[]) => AppEvent
  deleteEvent: (id: string) => void
  addServiceToEvent: (eventId: string, serviceId: string) => void
  removeServiceFromEvent: (eventId: string, serviceId: string) => void
}

const EventsContext = createContext<EventsContextValue | null>(null)

const STORAGE_KEY = 'farhati-dz:events'

function isEvent(value: unknown): value is AppEvent {
  const e = value as AppEvent
  return (
    !!e &&
    typeof e.id === 'string' &&
    typeof e.name === 'string' &&
    EVENT_TYPES.includes(e.eventType) &&
    typeof e.date === 'string' &&
    Array.isArray(e.linkedServiceIds)
  )
}

function readInitialEvents(): AppEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter(isEvent) : []
  } catch {
    return []
  }
}

function newId() {
  return `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/**
 * The customer's events ("مناسباتي") — same pattern as FavoritesContext:
 * React Context + localStorage persistence, entirely client-side.
 */
export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<AppEvent[]>(readInitialEvents)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    } catch {
      // Ignore write failures (e.g. private browsing) — events just won't persist.
    }
  }, [events])

  const value = useMemo<EventsContextValue>(() => {
    const updateLinks = (eventId: string, fn: (ids: string[]) => string[]) =>
      setEvents((current) =>
        current.map((e) => (e.id === eventId ? { ...e, linkedServiceIds: fn(e.linkedServiceIds) } : e)),
      )

    return {
      events: [...events].sort((a, b) => a.date.localeCompare(b.date)),
      getEvent: (id) => events.find((e) => e.id === id),
      createEvent: (input, initialServiceIds = []) => {
        const event: AppEvent = {
          id: newId(),
          name: input.name.trim(),
          eventType: input.eventType,
          date: input.date,
          createdAt: new Date().toISOString(),
          linkedServiceIds: [...new Set(initialServiceIds)],
        }
        setEvents((current) => [...current, event])
        return event
      },
      deleteEvent: (id) => setEvents((current) => current.filter((e) => e.id !== id)),
      addServiceToEvent: (eventId, serviceId) =>
        updateLinks(eventId, (ids) => (ids.includes(serviceId) ? ids : [...ids, serviceId])),
      removeServiceFromEvent: (eventId, serviceId) =>
        updateLinks(eventId, (ids) => ids.filter((id) => id !== serviceId)),
    }
  }, [events])

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) {
    throw new Error('useEvents must be used within an EventsProvider')
  }
  return ctx
}
